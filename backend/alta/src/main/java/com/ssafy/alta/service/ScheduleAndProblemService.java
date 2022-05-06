package com.ssafy.alta.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.ssafy.alta.dto.request.ProblemCreateRequest;
import com.ssafy.alta.dto.request.ProblemUpdateRequest;
import com.ssafy.alta.dto.request.ScheduleRequest;
import com.ssafy.alta.dto.response.CodeResponse;
import com.ssafy.alta.dto.response.ProblemResponse;
import com.ssafy.alta.dto.request.ScheduleAndProblemRequest;
import com.ssafy.alta.dto.response.ScheduleAndProblemResponse;
import com.ssafy.alta.entity.*;
import com.ssafy.alta.exception.AccessDeniedStudyException;
import com.ssafy.alta.exception.DataNotFoundException;
import com.ssafy.alta.exception.DuplicateFolderException;
import com.ssafy.alta.exception.UnAuthorizedException;
import com.ssafy.alta.gitutil.GitDirectoryAPI;
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
 * 2022-05-06       우정연             스케쥴 수정
 */

@Service
@RequiredArgsConstructor
public class ScheduleAndProblemService {
    private final ScheduleRepository scheduleRepository;
    private final ProblemRepository problemRepository;
    private final StudyJoinInfoRepository sjiRepository;
    private final UserService userService;
    private final RedisService redisService;
    private final GitDirectoryAPI gitDirectoryAPI = new GitDirectoryAPI();
    private final UserRepository userRepository;

    @Transactional
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

    @Transactional
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

    @Transactional
    public void insertProblem(Long studyId, ProblemCreateRequest problemCreateRequest) {
        String userId = userService.getCurrentUserId();
        String token = redisService.getAccessToken();

        Optional<Schedule> optSchedule = Optional.ofNullable(scheduleRepository.findByStudyStudyIdAndId(studyId, problemCreateRequest.getScheduleId())
                .orElseThrow(DataNotFoundException::new));
        Optional<StudyJoinInfo> optSJI = Optional.ofNullable(sjiRepository.findByStudyStudyIdAndUserId(studyId, userId)
                .orElseThrow(DataNotFoundException::new));
        if(!optSJI.get().getState().equals("가입"))
            throw new UnAuthorizedException();

        List<Problem> preProblems = problemCreateRequest.getProblems();
        List<Problem> problems = new ArrayList<>();
        for(Problem problem : preProblems) {
            if( problemRepository.findByDuplicateProblemInSchedule(optSchedule.get(), problem.getName()) != null ) {
                throw new DuplicateFolderException();
            }
            problems.add(new Problem(problem.getName(),problem.getLink(), false, optSchedule.get()));
        }
        problemRepository.saveAll(problems);
    }

    @Transactional(rollbackFor = Exception.class)
    public void updateProblem(Long studyId, ProblemUpdateRequest problemUpdateRequest) throws JsonProcessingException {
        // 1차, 우선 update 하는 사람이 스터디 유저인지 확인
        // 2차, 문제가 있는지 확인
        // 3차, 동일 회차에 동일한 문제 있는지 확인
        // 4차, DB 업데이트 먼저 -> Transactional 처리
        // 5차, git에 동일한 문제 폴더가 있는지 확인 -> 동일 폴더 존재 시
        // 6차, git 변경

        String userId = userService.getCurrentUserId();
        String token = redisService.getAccessToken();

        Optional<StudyJoinInfo> optSJI = Optional.ofNullable(sjiRepository.findByStudyStudyIdAndUserId(studyId, userId)
                .orElseThrow(DataNotFoundException::new));
        if(!optSJI.get().getState().equals("가입"))
            throw new UnAuthorizedException();

        Optional<Problem> optProblem = Optional.ofNullable(problemRepository.findById(problemUpdateRequest.getId())
                .orElseThrow(DataNotFoundException::new));

        Study study = optSJI.get().getStudy();
        Problem problem = optProblem.get();
        String studyLeaderUserName = userRepository.findStudyLeaderUserNameByUserId(study.getUser().getId());

        if(problemRepository.findByDuplicateProblem(optProblem.get().getSchedule(), problemUpdateRequest.getName(), problemUpdateRequest.getId()) != null)
            throw new DuplicateFolderException();

        problemRepository.updateProblemById(problemUpdateRequest.getId(), problemUpdateRequest.getName(), problemUpdateRequest.getLink());

        if(!problem.getName().equals(problemUpdateRequest.getName()))
            gitDirectoryAPI.updateDirectory(token, studyLeaderUserName, study.getRepositoryName(), problem.getName(), problemUpdateRequest.getName());
    }

    @Transactional
    public void updateSchedule(Long studyId, Long scheduleId, ScheduleRequest scheduleRequest) {
        String userId = userService.getCurrentUserId();

        Optional<StudyJoinInfo> optSJI = Optional.ofNullable(sjiRepository.findByStudyStudyIdAndUserId(studyId, userId)
                .orElseThrow(DataNotFoundException::new));
        Optional<Schedule> optSchedule = Optional.ofNullable(scheduleRepository.findById(scheduleId)
                .orElseThrow(DataNotFoundException::new));

        if(!optSJI.get().getState().equals("가입"))
            throw new AccessDeniedStudyException();

        Schedule schedule = optSchedule.get();
        Date startDate = scheduleRequest.getStartDate();
        Date endDate = scheduleRequest.getEndDate();

        // 검증
        
        schedule.changeDate(startDate, endDate);
    }

    @Transactional
    public void deleteSchedule(Long studyId, Long scheduleId) {
        String userId = userService.getCurrentUserId();

        Optional<StudyJoinInfo> optSJI = Optional.ofNullable(sjiRepository.findByStudyStudyIdAndUserId(studyId, userId)
                .orElseThrow(DataNotFoundException::new));
        Optional<Schedule> optSchedule = Optional.ofNullable(scheduleRepository.findById(scheduleId)
                .orElseThrow(DataNotFoundException::new));

        if(!optSJI.get().getState().equals("가입"))
            throw new AccessDeniedStudyException();

        Schedule schedule = optSchedule.get();

        scheduleRepository.deleteById(scheduleId);

    }
}
