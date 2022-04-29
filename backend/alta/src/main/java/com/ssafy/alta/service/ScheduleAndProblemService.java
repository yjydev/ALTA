package com.ssafy.alta.service;

import com.ssafy.alta.dto.request.ProblemRequest;
import com.ssafy.alta.dto.request.ScheduleRequest;
import com.ssafy.alta.dto.response.CodeResponse;
import com.ssafy.alta.dto.response.ProblemResponse;
import com.ssafy.alta.dto.request.ScheduleAndProblemRequest;
import com.ssafy.alta.dto.response.ScheduleAndProblemResponse;
import com.ssafy.alta.entity.*;
import com.ssafy.alta.exception.BusinessException;
import com.ssafy.alta.exception.DataNotFoundException;
import com.ssafy.alta.exception.ErrorCode;
import com.ssafy.alta.exception.UnAuthorizedException;
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
    ProblemRepository problemRepository;
    @Autowired
    StudyJoinInfoRepository sjiRepository;

    @Transactional
    public void saveScheduleAndProblem(String user_id, Long study_id, ScheduleAndProblemRequest scheduleAndProblemRequest) {
        Optional<StudyJoinInfo> optSJI = Optional.ofNullable(sjiRepository.findByStudyStudyIdAndUserId(study_id, user_id)
                .orElseThrow(DataNotFoundException::new));

        if(!optSJI.get().getState().equals("가입"))
            throw new UnAuthorizedException();

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

    public void insertSchedule(String user_id, Long study_id, ScheduleRequest scheduleRequest) {
        Optional<StudyJoinInfo> optSJI = Optional.ofNullable(sjiRepository.findByStudyStudyIdAndUserId(study_id, user_id)
                .orElseThrow(DataNotFoundException::new));
        if(!optSJI.get().getState().equals("가입"))
            throw new UnAuthorizedException();

        Study study = optSJI.get().getStudy();
        int round = 1;

        Optional<Schedule> optSchedule = scheduleRepository.findTop1ByStudyStudyIdOrderByRoundDesc(study_id);
        if(optSchedule.isPresent()) {
            round = optSchedule.get().getRound() + 1;
        }
        scheduleRepository.save(scheduleRequest.toSchedule(round, false, study));
    }

    public void insertProblem(String user_id, Long study_id, ProblemRequest problemRequest) {
        Optional<Schedule> optSchedule = Optional.ofNullable(scheduleRepository.findByStudyStudyIdAndId(study_id, problemRequest.getScheduleId())
                .orElseThrow(DataNotFoundException::new));
        Optional<StudyJoinInfo> optSJI = Optional.ofNullable(sjiRepository.findByStudyStudyIdAndUserId(study_id, user_id)
                .orElseThrow(DataNotFoundException::new));
        if(!optSJI.get().getState().equals("가입"))
            throw new UnAuthorizedException();

        List<Problem> preProblems = problemRequest.getProblems();
        List<Problem> problems = new ArrayList<>();
        for(Problem problem : preProblems) {
            problems.add(new Problem(problem.getName(),problem.getLink(), false, optSchedule.get()));
        }
        problemRepository.saveAll(problems);
    }

    public HashMap<String, Object> selectScheduleList(String user_id, Long study_id){
        Optional<StudyJoinInfo> optSJI = Optional.ofNullable(sjiRepository.findByStudyStudyIdAndUserId(study_id, user_id)
                .orElseThrow(DataNotFoundException::new));

        if(!optSJI.get().getState().equals("가입"))
            throw new BusinessException(ErrorCode.HANDLE_ACCESS_DENIED);

        HashMap<String, Object> map = new HashMap<>();
        List<Schedule> schedulesList = scheduleRepository.findByStudyStudyIdOrderByRound(study_id);
        List<ScheduleAndProblemResponse> schedules = new ArrayList<>();
        for (Schedule schedule : schedulesList) {
            List<Problem> problem1List = schedule.getProblems();
            List<ProblemResponse> problems = new ArrayList<>();
            for(Problem problem : problem1List) {
                List<Code> code1List = problem.getCode();
                List<CodeResponse> codes = new ArrayList<>();
                for(Code code : code1List) {
                    codes.add(code.toCodeResponse());
                }
                ProblemResponse problemResponse = problem.toProblemResponse();
                problemResponse.setCodes(codes);
                problems.add(problemResponse);
            }
            ScheduleAndProblemResponse scheduleAndProblemResponse = schedule.toScheduleAndProblemResponse();
            scheduleAndProblemResponse.setProblems(problems);
            schedules.add(scheduleAndProblemResponse);
        }
        map.put("readme", schedules);
        return map;
    }
}
