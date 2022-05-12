package com.ssafy.alta.service;

import com.ssafy.alta.entity.*;
import com.ssafy.alta.exception.DataNotFoundException;
import com.ssafy.alta.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

@Service
public class ActivityScoreService {

    @Autowired
    private ActivityScoreRepository activityScoreRepository;

    @Autowired
    private StudyRepository studyRepository;

    @Autowired
    private CodeRepository codeRepository;
    
    @Autowired
    private ProblemRepository problemRepository;

    @Autowired
    private UserRepository userRepository;

    public void addScoreForCommentOrCode(String user_id, Long study_id, Long code_id, int activityType){

        Optional<Study> study = Optional.ofNullable(studyRepository.findById(study_id)
                .orElseThrow(DataNotFoundException::new));

        Optional<Code> code =  Optional.ofNullable(codeRepository.findById(code_id)
                .orElseThrow(DataNotFoundException::new));

        Optional<User> optUser = Optional.ofNullable(userRepository.findById(user_id)
                .orElseThrow(DataNotFoundException::new));

        String study_name = study.get().getName();
        String code_file_name = code.get().getFileName();
        String history = "";

        if(activityType == 1){
            history = study_name +" 스터디의 " + code_file_name + " 에 댓글을 남겼습니다.";
        }
        else if(activityType == 2){
            history = study_name + " 스터디에 " + code_file_name + " 파일을 업로드 했습니다.";
        }

        ActivityScore activityScore = ActivityScore.builder()
                .user(optUser.get())
                .study(study.get())
                .history(history)
                .activityType(activityType)
                .build();
        activityScoreRepository.save(activityScore);
    }

    public void addScoreProblem(String user_id, Long study_id, Long problem_id, int activityType){

        Optional<Study> study = Optional.ofNullable(studyRepository.findById(study_id)
                .orElseThrow(DataNotFoundException::new));
        Optional<User> optUser = Optional.ofNullable(userRepository.findById(user_id)
                .orElseThrow(DataNotFoundException::new));
        Optional<Problem> problem = Optional.ofNullable(problemRepository.findById(problem_id)
                .orElseThrow(DataNotFoundException::new));

        String study_name = study.get().getName();
        String problem_name = problem.get().getName();

        String history = study_name + " 스터디에 " + problem_name + " 문제를 업로드 했습니다.";

        ActivityScore activityScore = ActivityScore.builder()
                .user(optUser.get())
                .study(study.get())
                .history(history)
                .activityType(activityType)
                .build();
        activityScoreRepository.save(activityScore);
    }

//    public int getScore(String user_id, Long study_id){
//        //해당 스터디에 속한 유저의 score를 계산하고 반환하자.
//
//        List<ActivityScore> list = activityScoreRepository.findByUserIdAndStudyId(user_id,study_id);
//        int sum = 0;
//        for (ActivityScore activity : list){
//            if(activity.getActivityType() == 1){
//                sum
//            }
//        }
//    }

//    public Map<String, Integer> getScores(Long study_id){
//        //해당 스터디에 포함된 모든 유저들을 데려와
//        //모든 유저의 score를 가져와서  map에 넣어주자.
//    }

}
