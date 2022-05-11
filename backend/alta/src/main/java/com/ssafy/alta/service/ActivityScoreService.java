package com.ssafy.alta.service;

import com.ssafy.alta.dto.request.ActivityScoreRequest;
import com.ssafy.alta.entity.ActivityScore;
import com.ssafy.alta.entity.Code;
import com.ssafy.alta.entity.Problem;
import com.ssafy.alta.entity.Study;
import com.ssafy.alta.repository.ActivityScoreRepository;
import com.ssafy.alta.repository.CodeRepository;
import com.ssafy.alta.repository.ProblemRepository;
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
    
    @Autowired
    private ProblemRepository problemRepository;

    public void addScoreForCommentOrCode(String user_id, Long study_id, Long code_id, int activityType){

        Optional<Study> study = studyRepository.findById(study_id);
        Optional<Code> code = codeRepository.findById(code_id);
        if (!study.isPresent() || !code.isPresent())
            throw new RuntimeException(); // 에러 만들어 반환하자.

        String study_name = study.get().getName();
        String code_file_name = code.get().getFileName();
        String history = "";

        if(activityType == 1){
            history = study_name +"  스터디의 " + code_file_name + " 에 댓글을 남겼습니다.";
        }
        else if(activityType == 2){
            history = study_name + " 스터디에 " + code_file_name + " 파일을 업로드 했습니다.";
        }

        ActivityScoreRequest activityScoreRequest = new ActivityScoreRequest(user_id, study_id,history, activityType);
        activityScoreRepository.save(activityScoreRequest.toEntity());
    }

    public void addScoreProblem(String user_id, Long study_id, Long problem_id, int activityType){

        Optional<Study> study = studyRepository.findById(study_id);
        Optional<Problem> problem = problemRepository.findById(problem_id);

        if (!study.isPresent() || !problem.isPresent())
            throw new RuntimeException(); // 에러 만들어 반환하자.

        String study_name = study.get().getName();
        String problem_name = problem.get().getName();

        String history = study_name + " 스터디에 " + problem_name + " 문제를 업로드 했습니다.";


        ActivityScoreRequest activityScoreRequest = new ActivityScoreRequest(user_id, study_id,history, activityType);
        activityScoreRepository.save(activityScoreRequest.toEntity());
    }

}
