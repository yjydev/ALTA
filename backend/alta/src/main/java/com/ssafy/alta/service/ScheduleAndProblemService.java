package com.ssafy.alta.service;

import com.ssafy.alta.dto.request.ProblemRequest;
import com.ssafy.alta.dto.request.ScheduleRequest;
import com.ssafy.alta.dto.response.CodeResponse;
import com.ssafy.alta.dto.response.ProblemResponse;
import com.ssafy.alta.dto.request.ScheduleAndProblemRequest;
import com.ssafy.alta.dto.response.ScheduleAndProblemResponse;
import com.ssafy.alta.entity.*;
import com.ssafy.alta.exception.DataNotFoundException;
import com.ssafy.alta.exception.UnAuthorizedException;
import com.ssafy.alta.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
@RequiredArgsConstructor
public class ScheduleAndProblemService {
    private final ScheduleRepository scheduleRepository;
    private final ProblemRepository problemRepository;
    private final StudyJoinInfoRepository sjiRepository;
    private final UserService userService;
    private final RedisService redisService;

    public HashMap<String, Object> selectScheduleList(Long studyId){
        String userId = userService.getCurrentUserId();
        String token = redisService.getAccessToken();

        Optional<StudyJoinInfo> optSJI = Optional.ofNullable(sjiRepository.findByStudyStudyIdAndUserId(studyId, userId)
                .orElseThrow(DataNotFoundException::new));

        if(!optSJI.get().getState().equals("가입"))
            throw new UnAuthorizedException();

        HashMap<String, Object> map = new HashMap<>();
        List<Schedule> schedulesList = scheduleRepository.findByStudyStudyIdOrderByRound(studyId);
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

    @Transactional
    public void saveScheduleAndProblem(Long studyId, ScheduleAndProblemRequest scheduleAndProblemRequest) {
        String userId = userService.getCurrentUserId();
        String token = redisService.getAccessToken();

        Optional<StudyJoinInfo> optSJI = Optional.ofNullable(sjiRepository.findByStudyStudyIdAndUserId(studyId, userId)
                .orElseThrow(DataNotFoundException::new));

        if(!optSJI.get().getState().equals("가입"))
            throw new UnAuthorizedException();

        Study study = optSJI.get().getStudy();
        int round = 1;

        Optional<Schedule> optSchedule = scheduleRepository.findTop1ByStudyStudyIdOrderByRoundDesc(studyId);
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

    public void insertSchedule(Long studyId, ScheduleRequest scheduleRequest) {
        String userId = userService.getCurrentUserId();
        String token = redisService.getAccessToken();

        Optional<StudyJoinInfo> optSJI = Optional.ofNullable(sjiRepository.findByStudyStudyIdAndUserId(studyId, userId)
                .orElseThrow(DataNotFoundException::new));
        if(!optSJI.get().getState().equals("가입"))
            throw new UnAuthorizedException();

        Study study = optSJI.get().getStudy();
        int round = 1;

        Optional<Schedule> optSchedule = scheduleRepository.findTop1ByStudyStudyIdOrderByRoundDesc(studyId);
        if(optSchedule.isPresent()) {
            round = optSchedule.get().getRound() + 1;
        }
        scheduleRepository.save(scheduleRequest.toSchedule(round, false, study));
    }

    public void insertProblem(Long study_id, ProblemRequest problemRequest) {
        String userId = userService.getCurrentUserId();
        String token = redisService.getAccessToken();

        Optional<Schedule> optSchedule = Optional.ofNullable(scheduleRepository.findByStudyStudyIdAndId(study_id, problemRequest.getScheduleId())
                .orElseThrow(DataNotFoundException::new));
        Optional<StudyJoinInfo> optSJI = Optional.ofNullable(sjiRepository.findByStudyStudyIdAndUserId(study_id, userId)
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
}
