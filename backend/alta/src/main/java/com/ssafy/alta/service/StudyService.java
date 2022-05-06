package com.ssafy.alta.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.ssafy.alta.dto.request.GithubRepoRequest;
import com.ssafy.alta.dto.request.StudyJoinInfoRequest;
import com.ssafy.alta.dto.response.StudyJoinInfoResponse;
import com.ssafy.alta.dto.request.StudyRequest;
import com.ssafy.alta.entity.Study;
import com.ssafy.alta.entity.StudyJoinInfo;
import com.ssafy.alta.entity.User;
import com.ssafy.alta.exception.*;
import com.ssafy.alta.gitutil.GitRepoAPI;
import com.ssafy.alta.mailutil.MailHandler;
import com.ssafy.alta.repository.StudyJoinInfoRepository;
import com.ssafy.alta.repository.StudyRepository;
import com.ssafy.alta.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring5.SpringTemplateEngine;

import javax.mail.MessagingException;
import javax.swing.text.html.Option;
import java.util.*;

/**
 * packageName 	: com.ssafy.alta.service
 * fileName 	: StudyService
 * author 	    : jisoon Lee
 * date		    : 2022-04-26
 * description	:
 * ===========================================================
 * DATE             AUTHOR              NOTE
 * -----------------------------------------------------------
 * 2022-04-26       jisoon Lee         최초 생성
 */

@Service
@RequiredArgsConstructor
public class StudyService {
    private final StudyRepository studyRepository;
    private final UserRepository userRepository;
    private final StudyJoinInfoRepository sjiRepository;
    private final UserService userService;
    private final RedisService redisService;
    private final GitRepoAPI gitRepoAPI = new GitRepoAPI();
    private final JavaMailSender mailSender;
    private final SpringTemplateEngine templateEngine;

    @Transactional(rollbackFor = Exception.class)
    public void insertStudy(StudyRequest studyRequest) throws JsonProcessingException {
        String userId = userService.getCurrentUserId();
        String token = redisService.getAccessToken();

        Optional<User> optUser = Optional.ofNullable(userRepository.findById(userId)
                .orElseThrow(DataNotFoundException::new));

        User user = optUser.get();
        studyRequest.setUser(user);
        studyRequest.setCode(UUID.randomUUID().toString().substring(0, 8));

        String repoName = studyRequest.getRepositoryName().toString();
        repoName = repoName.replaceAll("\\p{Z}", "-");
        studyRequest.setRepositoryName(repoName);

        if (!gitRepoAPI.selectRepo(token, user.getName(), repoName)) {
            throw new DuplicateRepoException();
        }

        Study study = studyRepository.save(studyRequest.toEntity());
        sjiRepository.save(new StudyJoinInfoRequest(user, study, "가입", "그룹장", true, new Date()).toEntity());

        GithubRepoRequest githubRepoRequest = GithubRepoRequest.builder()
                .name(study.getRepositoryName())
                .description(study.getIntroduction())
                .auto_init(true)
                .build();

        gitRepoAPI.insertRepo(token, githubRepoRequest);
    }

    @Transactional(rollbackFor = Exception.class)
    public HashMap<String, Object> selectStudyMemberList(Long studyId){
        String userId = userService.getCurrentUserId();
        String token = redisService.getAccessToken();

        Optional<StudyJoinInfo> optSJI = Optional.ofNullable(sjiRepository.findByStudyStudyIdAndUserId(studyId, userId)
                .orElseThrow(DataNotFoundException::new));

        if(!optSJI.get().getState().equals("가입")) {
            throw new AccessDeniedStudyException();
        }

        HashMap<String, Object> map = new HashMap<>();
        List<StudyJoinInfo> sjiList = null;
        List<StudyJoinInfoResponse> sjiResponse = new ArrayList<>();
        String study_code = null;
        int study_max_people = optSJI.get().getStudy().getMaxPeople();

        if(optSJI.get().getPosition().equals("그룹장")) {
            sjiList = sjiRepository.findByStudyStudyId(studyId);
            study_code = sjiList.get(0).getStudy().getCode();
        } else {
            sjiList = sjiRepository.findByStudyStudyIdAndStateContains(studyId, "가입");
        }

        for(StudyJoinInfo sji : sjiList) {
            sjiResponse.add(sji.toStudyJoinInfoResponse());
        }

        map.put("members", sjiResponse);
        map.put("study_code", study_code);
        map.put("study_max_people", study_max_people);

        return map;
    }

//    @Async // 비동기 처리 -> Exception 처리 전에 201번이 날아간다는 점에서는 안좋지만 보낼때까지의 시간이 너무 걸림, 사용자가 그 시간을 감수해야할까?
    @Transactional(rollbackFor = Exception.class)
    public void inviteUser(Long studyId, String toUser) throws MessagingException {
        String userId = userService.getCurrentUserId();

        Optional<Study> optStudy = Optional.of(studyRepository.findByStudyIdAndUserId(studyId, userId)
                .orElseThrow(DataNotFoundException::new));
        Optional<StudyJoinInfo> optSJI = sjiRepository.findByStudyStudyIdAndUserId(studyId, toUser);
        if (optSJI.isPresent())
            throw new UserStateException();
        Optional<User> optUser = Optional.of(userRepository.findById(toUser)
                .orElseThrow(DataNotFoundException::new));
        if(optUser.get().getEmail() == null)
            throw new DataNotFoundException();

        User user = optUser.get();
        String userName = userRepository.findStudyLeaderUserNameByUserId(userId);

        StudyJoinInfo studyJoinInfo = StudyJoinInfo.builder()
                .user(user)
                .study(optStudy.get())
                .state("초대대기")
                .position("그룹원")
                .isReceivable(false)
                .build();

        MailHandler mailHandler = new MailHandler(mailSender);
        mailHandler.setTo(user.getEmail());
        mailHandler.setFrom("alta.invitation@gmail.com");
        mailHandler.setSubject("ALTA에서 전송한 초대메일 입니다.");

        Context context = new Context();
        context.setVariable("name", userName);
        context.setVariable("code", optStudy.get().getCode());
        String html = templateEngine.process("invitation", context);
        mailHandler.setText(html, true);

        sjiRepository.save(studyJoinInfo);
        mailHandler.send();
    }

    @Transactional(rollbackFor = Exception.class)
    public void updateStudyMember(String code) {
        String userId = userService.getCurrentUserId();
        String token = redisService.getAccessToken();

        Optional<Study> studyOpt = Optional.of(studyRepository.findByCode(code)
                .orElseThrow(DataNotFoundException::new));
        Optional<StudyJoinInfo> sjiOpt = Optional.of(sjiRepository.findByStudyStudyIdAndUserId(studyOpt.get().getStudyId(), userId)
                .orElseThrow(UnAuthorizedException::new));

        Study study = studyOpt.get();
        StudyJoinInfo sji = sjiOpt.get();
        checkStudyJoinInfoState(sji.getState());

        sjiRepository.updateSJIState(sji.getId(), study, "대기");
    }

    private void checkStudyJoinInfoState(String state) {
        if(state.equals("가입") || state.equals("대기")) {
            throw new UserExistStudyException();
        }
    }
}