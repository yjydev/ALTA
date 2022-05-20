package com.ssafy.alta.service;

import com.ssafy.alta.dto.request.CommentCreateRequest;
import com.ssafy.alta.dto.request.CommentUpdateRequest;
import com.ssafy.alta.dto.response.CommentResponse;
import com.ssafy.alta.entity.*;
import com.ssafy.alta.exception.DataNotFoundException;
import com.ssafy.alta.exception.WriterNotMatchException;
import com.ssafy.alta.repository.CodeRepository;
import com.ssafy.alta.repository.CommentRepository;
import com.ssafy.alta.repository.UserRepository;
import com.ssafy.alta.util.ActivityType;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.mail.MessagingException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

/**
 * packageName 	: com.ssafy.alta.service
 * fileName 	: CommentService
 * author 	    : 우정연
 * date		    : 2022-04-26
 * description	: 코드 댓글 Service
 * ===========================================================
 * DATE 		AUTHOR 		      NOTE
 * -----------------------------------------------------------
 * 2022-04-26	    우정연  		    최초 생성
 */
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class CommentService {
    private final CommentRepository commentRepository;
    private final UserRepository userRepository;
    private final CodeRepository codeRepository;
    private final UserService userService;
    private final ActivityScoreService activityScoreService;
    private final AlertService alertService;
    private final NotificationService notificationService;
    private final MailService mailService;

    public List<CommentResponse> selectCommentList(Long codeId) {
        Optional<Code> optCode = Optional.ofNullable(codeRepository.findById(codeId)
                .orElseThrow(DataNotFoundException::new));
        Code code = optCode.get();
        List<Comment> commentList = commentRepository.findCommentsByCodeOrderByCreateDateDesc(code);
        List<CommentResponse> commentResponseList = new ArrayList<>();
        for(Comment comment : commentList) {
            commentResponseList.add(comment.toDto());
        }
        return commentResponseList;
    }

    @Transactional(rollbackFor = Exception.class)
    public void insertComment(CommentCreateRequest commentRequest) throws MessagingException {
        String userId = userService.getCurrentUserId();

        Optional<Code> optCode = Optional.ofNullable(codeRepository.findById(commentRequest.getCodeId())
                .orElseThrow(DataNotFoundException::new));
        Optional<User> optUser = Optional.ofNullable(userRepository.findById(userId)).orElseThrow(DataNotFoundException::new);
        Code code = optCode.get();
        User user = optUser.get();

        Comment comment = commentRequest.toEntity(user, code);
        commentRepository.save(comment);


        // 성실점수 추가
        activityScoreService.addScoreForCommentOrCode(userId, code.getProblem().getSchedule().getStudy().getStudyId(), code.getId(), ActivityType.COMMNET.getActivityIdx());

        // 알림 발생 + 프론트로 알림 발생시키기
        // 피드백 등록 메일 보내기
        if(!code.getUser().getId().equals(comment.getUser().getId())) {       // 본인이 코드 작성자이면서 댓글 작성자이면 알림 발생 X
            int alertStatus = userRepository.findAlertStatusByUserId(code.getUser().getId());

            Alert alert = alertService.makeAlert(code.getUser(), comment.getUser(), AlertType.SITE_COMMENT, code);
            if(AlertType.isAlertTrue(alertStatus, AlertType.SITE_COMMENT)) {
                // 유저가 사이트 댓글 알림 수신을 체크했다면
                alertService.insertAlert(alert);
                notificationService.sendAlertEvent(alert);
            }

            // 유저가 메일 댓글 알림 수신을 체크했다면 + 메일 보냄
            if(AlertType.isAlertTrue(alertStatus, AlertType.MAIL_COMMENT)) {
                mailService.sendAlertMail(code.getUser().getEmail(), alert.getContent());
            }
        }
    }

    @Transactional
    public void updateCommentListSolved(Code code) {
        commentRepository.updateCodeSolvedByCodeId(code, true);
    }

    @Transactional
    public void deleteComment(Long commentId) {
        String userId = userService.getCurrentUserId();

        Optional<Comment> optComment = Optional.ofNullable(commentRepository.findById(commentId)).orElseThrow(DataNotFoundException::new);
        Comment comment = optComment.get();
        if(!userId.equals(comment.getUser().getId())) // 댓글 작성자가 맞는지를 확인 -> 아니라면 exception 발생
            throw new WriterNotMatchException();

        commentRepository.deleteById(commentId);
    }

    @Transactional
    public void updateComment(Long commentId, CommentUpdateRequest commentUpdateRequestment) {
        String userId = userService.getCurrentUserId();

        Optional<Comment> optComment = Optional.ofNullable(commentRepository.findById(commentId)).orElseThrow(DataNotFoundException::new);
        Comment comment = optComment.get();
        if(!userId.equals(comment.getUser().getId()))
            throw new WriterNotMatchException();
        comment.updateComment(commentUpdateRequestment);
    }

    @Transactional
    public void updateCommentSolved(Long commentId, boolean isSolved) {
        String userId = userService.getCurrentUserId();

        Optional<Comment> optComment = Optional.ofNullable(commentRepository.findById(commentId)).orElseThrow(DataNotFoundException::new);
        Comment comment = optComment.get();
        // 코드 작성자와 댓글 작성자만 가능하도록
        if(!userId.equals(comment.getUser().getId()) && !userId.equals(comment.getCode().getUser().getId()))
            throw new WriterNotMatchException();
        comment.changeState(isSolved);
    }
}
