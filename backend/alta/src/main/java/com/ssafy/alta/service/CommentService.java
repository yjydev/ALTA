package com.ssafy.alta.service;

import com.ssafy.alta.dto.request.CommentRequest;
import com.ssafy.alta.dto.response.CommentResponse;
import com.ssafy.alta.entity.Code;
import com.ssafy.alta.entity.Comment;
import com.ssafy.alta.entity.User;
import com.ssafy.alta.exception.DataNotFoundException;
import com.ssafy.alta.repository.CodeRepository;
import com.ssafy.alta.repository.CommentRepository;
import com.ssafy.alta.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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

    public List<CommentResponse> selectCommentList(Code code) {
        List<Comment> commentList = commentRepository.findCommentsByCodeOrderByCreateDateDesc(code);
        List<CommentResponse> commentResponseList = new ArrayList<>();
        for(Comment comment : commentList) {
            commentResponseList.add(comment.toDto());
        }
        return commentResponseList;
    }

    @Transactional
    public void insertComment(String userId, CommentRequest commentRequest) {
        Optional<Code> optCode = Optional.ofNullable(codeRepository.findById(commentRequest.getCodeId())
                .orElseThrow(DataNotFoundException::new));
        Optional<User> optUser = Optional.ofNullable(userRepository.findById(userId)).orElseThrow(DataNotFoundException::new);
        Code code = optCode.get();
        User user = optUser.get();

        Comment comment = commentRequest.toEntity(user, code);
        commentRepository.save(comment);

    }
}
