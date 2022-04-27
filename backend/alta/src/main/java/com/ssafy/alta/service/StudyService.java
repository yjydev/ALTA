package com.ssafy.alta.service;

import com.ssafy.alta.dto.StudyJoinInfoResponse;
import com.ssafy.alta.dto.StudyRequest;
import com.ssafy.alta.entity.Study;
import com.ssafy.alta.entity.StudyJoinInfo;
import com.ssafy.alta.repository.StudyJoinInfoRepository;
import com.ssafy.alta.repository.StudyRepository;
import com.ssafy.alta.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
public class StudyService {
    @Autowired
    private StudyRepository studyRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private StudyJoinInfoRepository sjiRepository;

    public Long insertStudy(StudyRequest studyRequest) {
        studyRequest.setUser(userRepository.getById("46081043"));
        studyRequest.setCode(UUID.randomUUID().toString().substring(0, 8));
        Study study = studyRequest.toEntity();
        return studyRepository.save(study).getStudyId();
    }

    public HashMap<String, Object> selectStudyMemberList(String user_id, Long study_id) throws Exception {
        Optional<StudyJoinInfo> optSJI = Optional.ofNullable(sjiRepository.findByStudyStudyIdAndUserId(study_id, user_id)
                .orElseThrow(() -> new IllegalArgumentException("잘못된 접근입니다.")));

        if(!optSJI.get().getState().equals("가입")) {
            throw new IllegalArgumentException("가입이 필요합니다.");
        }

        HashMap<String, Object> map = new HashMap<>();
        List<StudyJoinInfo> sjiList = null;
        List<StudyJoinInfoResponse> sjiResponse = new ArrayList<>();
        String study_code = null;

        if(optSJI.get().getPosition().equals("그룹장")) {
            sjiList = sjiRepository.findByStudyStudyId(study_id);
            study_code = sjiList.get(0).getStudy().getCode();
        } else {
            sjiList = sjiRepository.findByStudyStudyIdAndStateContains(study_id, "가입");
        }

        for(StudyJoinInfo sji : sjiList) {
            sjiResponse.add(sji.toDto());
        }

        map.put("members", sjiResponse);
        map.put("study_code", study_code);

        return map;
    }

}