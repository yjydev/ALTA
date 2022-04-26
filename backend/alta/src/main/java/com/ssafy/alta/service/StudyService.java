package com.ssafy.alta.service;

import com.ssafy.alta.dto.StudyRequest;
import com.ssafy.alta.entity.Study;
import com.ssafy.alta.repository.StudyRepository;
import com.ssafy.alta.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

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

    public Long insertStudy(StudyRequest studyRequest) {
        studyRequest.setUser(userRepository.getById("46081043"));
        studyRequest.setCode(UUID.randomUUID().toString().substring(0, 8));
        Study study = studyRequest.toEntity();
        return studyRepository.save(study).getStudyId();
    }
}