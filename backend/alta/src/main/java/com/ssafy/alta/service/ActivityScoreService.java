package com.ssafy.alta.service;

import com.ssafy.alta.dto.request.ActivityScoreRequest;
import com.ssafy.alta.entity.ActivityScore;
import com.ssafy.alta.entity.Code;
import com.ssafy.alta.entity.Study;
import com.ssafy.alta.repository.ActivityScoreRepository;
import com.ssafy.alta.repository.CodeRepository;
import com.ssafy.alta.repository.StudyRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Optional;

/**
 * packageName 	: com.ssafy.alta.service
 * fileName 	: ActivityScoreService
 * author 	    : 오서하
 * date		    : 2022-05-10
 * description	: 성실점수
 * ===========================================================
 * DATE 		AUTHOR 		      NOTE
 * -----------------------------------------------------------
 * 2022-05-10	    오서하  		    최초 생성
 */
public class ActivityScoreService {

    @Autowired
    private ActivityScoreRepository activityScoreRepository;

    @Autowired
    private StudyRepository studyRepository;

    @Autowired
    private CodeRepository codeRepository;

    public void addScoreForComment(String user_id, Long study_id, Long code_id){

        Optional<Study> study = studyRepository.findById(study_id);
        Optional<Code> code = codeRepository.findById(study_id);
        if (!study.isPresent() || !code.isPresent())
            throw new RuntimeException(); // 에러 만들어 반환하자.

        String study_name = study.get().getName();
        String code_file_name = code.get().getFileName();
        String history = study_name +"  스터디의 " + code_file_name + " 에 댓글을 남겼습니다.";

        ActivityScoreRequest activityScoreRequest = new ActivityScoreRequest(user_id, study_id,history,1);

        activityScoreRepository.save(activityScoreRequest.toEntity());
    }

}
