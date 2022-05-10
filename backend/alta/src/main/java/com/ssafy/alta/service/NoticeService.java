package com.ssafy.alta.service;

import com.ssafy.alta.dto.request.NoticeRequest;
import com.ssafy.alta.entity.*;
import com.ssafy.alta.exception.AccessDeniedStudyException;
import com.ssafy.alta.exception.DataNotFoundException;
import com.ssafy.alta.exception.UnAuthorizedException;
import com.ssafy.alta.repository.NoticeRepository;
import com.ssafy.alta.repository.StudyJoinInfoRepository;
import com.ssafy.alta.repository.StudyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.Optional;

/**
 * packageName 	: com.ssafy.alta.service
 * fileName 	: NoticeService
 * author 	    : jisoon Lee
 * date		    : 2022-05-10
 * description	:
 * ===========================================================
 * DATE             AUTHOR              NOTE
 * -----------------------------------------------------------
 * 2022-05-10       jisoon Lee         최초 생성
 */
@Service
@Transactional
@RequiredArgsConstructor
public class NoticeService {
    private final NoticeRepository noticeRepository;
    private final StudyRepository studyRepository;
    private final StudyJoinInfoRepository studyJoinInfoRepository;
    private final UserService userService;
    private final RedisService redisService;

    @Transactional(rollbackFor = Exception.class)
    public void insertNotice(Long studyId, NoticeRequest noticeRequest) {
        System.out.println("service: "+studyId);
        String userId = userService.getCurrentUserId();
        String token = redisService.getAccessToken();

        Optional<Study> optStudy = Optional.ofNullable(studyRepository.findById(studyId)
                .orElseThrow(DataNotFoundException::new));
        Optional<StudyJoinInfo> optSJI = Optional.ofNullable(studyJoinInfoRepository.findByStudyStudyIdAndUserId(studyId, userId)
                .orElseThrow(AccessDeniedStudyException::new));
        checkStudyJoinInfoPosition(optSJI.get().getPosition());

        Notice notice = new Notice(noticeRequest.getContent(), new Date(), optStudy.get());
        noticeRepository.save(notice);
    }

    private void checkStudyJoinInfoPosition(String position) {
        if(!position.equals("그룹장")) {
            throw new UnAuthorizedException();
        }
    }
}
