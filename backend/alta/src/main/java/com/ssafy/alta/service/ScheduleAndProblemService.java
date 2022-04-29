package com.ssafy.alta.service;

import com.ssafy.alta.dto.CodeResponse1;
import com.ssafy.alta.dto.ProblemResponse;
import com.ssafy.alta.dto.ScheduleAndProblemRequest;
import com.ssafy.alta.dto.ScheduleAndProblemResponse;
import com.ssafy.alta.entity.*;
import com.ssafy.alta.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.*;

/**
 * packageName 	: com.ssafy.alta.service
 * fileName 	: ScheduleAndProblemService
 * author 	    : jisoon Lee
 * date		    : 2022-04-28
 * description	:
 * ===========================================================
 * DATE             AUTHOR              NOTE
 * -----------------------------------------------------------
 * 2022-04-28       jisoon Lee         최초 생성
 */

@Service
public class ScheduleAndProblemService {
    @Autowired
    ScheduleRepository scheduleRepository;
    @Autowired
    ScheduleRepository1 scheduleRepository1;
    @Autowired
    ProblemRepository problemRepository;
    @Autowired
    StudyJoinInfoRepository sjiRepository;

    @Transactional
    public void saveScheduleAndProblem(String user_id, Long study_id, ScheduleAndProblemRequest scheduleAndProblemRequest) {
        Optional<StudyJoinInfo> optSJI = Optional.ofNullable(sjiRepository.findByStudyStudyIdAndUserId(study_id, user_id)
                .orElseThrow(() -> new IllegalArgumentException("잘못된 접근입니다.")));

        if(!optSJI.get().getState().equals("가입")) {
            throw new IllegalArgumentException("가입이 필요합니다.");
        }

        Study study = optSJI.get().getStudy();
        int round = 1;

        Optional<Schedule> optSchedule = scheduleRepository.findTop1ByStudyStudyIdOrderByRoundDesc(study_id);
        if(optSchedule.isPresent()) {
            round = optSchedule.get().getRound() + 1;
        }

        scheduleAndProblemRequest.setStudy(study);
        scheduleAndProblemRequest.setRound(round);
        scheduleAndProblemRequest.setIsCancel(false);
        Schedule schedule = scheduleRepository.save(scheduleAndProblemRequest.toEntity());

        List<Problem> preProblems = scheduleAndProblemRequest.getProblems();
        List<Problem> problems = new ArrayList<>();
        for(Problem problem : preProblems) {
            problems.add(new Problem(problem.getName(),problem.getLink(), false, schedule));
        }
        problemRepository.saveAll(problems);
    }

    public HashMap<String, Object> selectScheduleList(String user_id, Long study_id){
        Optional<StudyJoinInfo> optSJI = Optional.ofNullable(sjiRepository.findByStudyStudyIdAndUserId(study_id, user_id)
                .orElseThrow(() -> new IllegalArgumentException("잘못된 접근입니다.")));

        if(!optSJI.get().getState().equals("가입")) {
            throw new IllegalArgumentException("가입이 필요합니다.");
        }

        HashMap<String, Object> map = new HashMap<>();
        List<Schedule1> schedulesList = scheduleRepository1.findByStudyStudyId(study_id);
        List<ScheduleAndProblemResponse> schedules = new ArrayList<>();
        for (Schedule1 schedule : schedulesList) {
            List<Problem1> problem1List = schedule.getProblems();
            List<ProblemResponse> problems = new ArrayList<>();
            for(Problem1 problem : problem1List) {
                List<Code1> code1List = problem.getCode();
                List<CodeResponse1> codes = new ArrayList<>();
                for(Code1 code : code1List) {
                    codes.add(code.toDto());
                }
                ProblemResponse problemResponse = problem.toDto();
                problemResponse.setCodes(codes);
                problems.add(problemResponse);
            }
            ScheduleAndProblemResponse scheduleAndProblemResponse = schedule.toDto();
            scheduleAndProblemResponse.setProblems(problems);
            schedules.add(scheduleAndProblemResponse);
        }
        map.put("readme", schedules);
        return map;
    }
}
