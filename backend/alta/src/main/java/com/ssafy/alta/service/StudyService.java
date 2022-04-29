package com.ssafy.alta.service;

import com.ssafy.alta.dto.request.StudyJoinInfoRequest;
import com.ssafy.alta.dto.response.StudyJoinInfoResponse;
import com.ssafy.alta.dto.request.StudyRequest;
import com.ssafy.alta.entity.Study;
import com.ssafy.alta.entity.StudyJoinInfo;
import com.ssafy.alta.entity.User;
import com.ssafy.alta.repository.StudyJoinInfoRepository;
import com.ssafy.alta.repository.StudyRepository;
import com.ssafy.alta.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
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

    @Transactional
    public void insertStudy(String user_id, StudyRequest studyRequest) {
        User user = userRepository.getById(user_id);
        studyRequest.setUser(user);
        studyRequest.setCode(UUID.randomUUID().toString().substring(0, 8));

        Study study = studyRepository.save(studyRequest.toEntity());

        sjiRepository.save(new StudyJoinInfoRequest(user, study, "가입", "그룹장", true, new Date()).toEntity());
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
        int study_max_people = optSJI.get().getStudy().getMaxPeople();

        if(optSJI.get().getPosition().equals("그룹장")) {
            sjiList = sjiRepository.findByStudyStudyId(study_id);
            study_code = sjiList.get(0).getStudy().getCode();
        } else {
            sjiList = sjiRepository.findByStudyStudyIdAndStateContains(study_id, "가입");
        }

        for(StudyJoinInfo sji : sjiList) {
            sjiResponse.add(sji.toStudyJoinInfoResponse());
        }

        map.put("members", sjiResponse);
        map.put("study_code", study_code);
        map.put("study_max_people", study_max_people);

        return map;
    }

}