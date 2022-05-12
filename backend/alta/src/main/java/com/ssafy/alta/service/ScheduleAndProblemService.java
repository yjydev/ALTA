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
import com.ssafy.alta.exception.*;
import com.ssafy.alta.gitutil.GitDirectoryAPI;
import com.ssafy.alta.repository.*;
import com.ssafy.alta.util.ActivityType;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.swing.text.html.Option;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
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
    private final ReadmeService readmeService;
    private final ActivityScoreService activityScoreService;

    @Transactional
    public HashMap<String, Object> selectScheduleList(Long studyId){
        String userId = userService.getCurrentUserId();
        String token = redisService.getAccessToken(userId);

        Optional<StudyJoinInfo> optSJI = Optional.ofNullable(sjiRepository.findByStudyStudyIdAndUserId(studyId, userId)
                .orElseThrow(DataNotFoundException::new));

        Study study = optSJI.get().getStudy();
        if(!optSJI.get().getState().equals("가입"))
            throw new AccessDeniedStudyException();

        HashMap<String, Object> map = new HashMap<>();
        List<Schedule> schedulesList = scheduleRepository.findByStudyStudyIdOrderByStartDateAsc(studyId);
        List<ScheduleAndProblemResponse> schedules = new ArrayList<>();
        int idx = 1;
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
            ScheduleAndProblemResponse scheduleAndProblemResponse = schedule.toScheduleAndProblemResponse(idx++);
            scheduleAndProblemResponse.setProblems(problems);
            schedules.add(scheduleAndProblemResponse);
        }
        map.put("readme", schedules);
        map.put("studyName", study.getName());
        return map;
    }

    @Transactional
    public void saveScheduleAndProblem(Long studyId, ScheduleAndProblemRequest scheduleAndProblemRequest) {
        String userId = userService.getCurrentUserId();
        String token = redisService.getAccessToken(userId);

        Optional<StudyJoinInfo> optSJI = Optional.ofNullable(sjiRepository.findByStudyStudyIdAndUserId(studyId, userId)
                .orElseThrow(DataNotFoundException::new));

        if(!optSJI.get().getState().equals("가입"))
            throw new AccessDeniedStudyException();

        Study study = optSJI.get().getStudy();
        int round = 1;

        Optional<Schedule> optSchedule = scheduleRepository.findTop1ByStudyStudyIdOrderByStartDateDesc(studyId);
        if(optSchedule.isPresent()) {
            round = optSchedule.get().getRound() + 1;
        }

        scheduleAndProblemRequest.setStudy(study);
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
    public void insertSchedule(Long studyId, ScheduleRequest scheduleRequest) throws ParseException {
        String userId = userService.getCurrentUserId();

        Optional<StudyJoinInfo> optSJI = Optional.ofNullable(sjiRepository.findByStudyStudyIdAndUserId(studyId, userId)
                .orElseThrow(DataNotFoundException::new));
        if(!optSJI.get().getState().equals("가입"))
            throw new AccessDeniedStudyException();

        Study study = optSJI.get().getStudy();

        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
        Date startDate = formatter.parse(formatter.format(scheduleRequest.getStartDate()));
        Date endDate = formatter.parse(formatter.format(scheduleRequest.getEndDate()));
        Date nowDate = new Date();
        long startTime = startDate.getTime();
        long endTime = endDate.getTime();
        long nowTime = nowDate.getTime();

        if(startTime >= endTime || nowTime > endTime) {
            throw new InvalidCreateScheduleException();
        }

        Optional<Schedule> schedule = scheduleRepository.findByStudyStudyIdSameStartDate(studyId, startDate);
        if (schedule.isPresent()) {
            throw new DuplicatedScheduleException();
        }

        List<Schedule> schedules = scheduleRepository.findByStudyStudyIdOrderByStartDate(studyId, nowDate);
        for(Schedule temp : schedules) {
            long tempStartTime = temp.getStartDate().getTime();
            long tempEndTime = temp.getEndDate().getTime();
            if(endTime >= tempStartTime && startTime <= tempEndTime) {
                throw new InvalidScheduleException();
            }
        }

        scheduleRepository.save(scheduleRequest.toSchedule(false, study));
        readmeService.updateReadme(studyId);
    }

    @Transactional
    public void insertProblem(Long studyId, ProblemCreateRequest problemCreateRequest) {
        String userId = userService.getCurrentUserId();
        String token = redisService.getAccessToken(userId);

        Optional<Schedule> optSchedule = Optional.ofNullable(scheduleRepository.findByStudyStudyIdAndId(studyId, problemCreateRequest.getScheduleId())
                .orElseThrow(DataNotFoundException::new));
        Optional<StudyJoinInfo> optSJI = Optional.ofNullable(sjiRepository.findByStudyStudyIdAndUserId(studyId, userId)
                .orElseThrow(DataNotFoundException::new));
        if(!optSJI.get().getState().equals("가입"))
            throw new AccessDeniedStudyException();

        Schedule schedule = optSchedule.get();
        List<Problem> preProblems = problemCreateRequest.getProblems();
        List<Problem> problems = new ArrayList<>();
        for(Problem problem : preProblems) {
            if( problemRepository.findByDuplicateProblemInSchedule(optSchedule.get(), problem.getName()) != null ) {
                throw new DuplicateFolderException();
            }
            problems.add(new Problem(problem.getName(),problem.getLink(), false, optSchedule.get()));
        }
        Long problemId = problemRepository.saveAll(problems).get(0).getId();
        activityScoreService.addScoreProblem(userId, studyId, problemId, ActivityType.PROBLEM.getActivityIdx());
        readmeService.updateReadme(studyId);
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
        String token = redisService.getAccessToken(userId);

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
        readmeService.updateReadme(studyId);
    }

    @Transactional
    public void updateSchedule(Long studyId, Long scheduleId, ScheduleRequest scheduleRequest) throws ParseException {
        String userId = userService.getCurrentUserId();

        Optional<StudyJoinInfo> optSJI = Optional.ofNullable(sjiRepository.findByStudyStudyIdAndUserId(studyId, userId)
                .orElseThrow(DataNotFoundException::new));
        Optional<Schedule> optSchedule = Optional.ofNullable(scheduleRepository.findById(scheduleId)
                .orElseThrow(DataNotFoundException::new));

        if(!optSJI.get().getState().equals("가입"))
            throw new AccessDeniedStudyException();
        Schedule schedule = optSchedule.get();


        // 계속 9시로 넘어와서 시간 없애려고 -> DB 날짜는 0시라서 시간 맞추기 위함
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
        Date startDate = formatter.parse(formatter.format(scheduleRequest.getStartDate()));
        Date endDate = formatter.parse(formatter.format(scheduleRequest.getEndDate()));
        Date nowDate = new Date();
        long startTime = startDate.getTime();
        long endTime = endDate.getTime();
        long nowTime = nowDate.getTime();

        /* 검증
         - 시작일이 끝나는일보다 이전인지
         - 마감일이 끝나지 않았는지
         - 다른 날짜와 겹치는지
         */
        if(startTime >= endTime || nowTime > endTime) {
            throw new InvalidScheduleException();
        }
        // 시작 날짜가 오늘 이후이면서 해당 스터디 내의 지금 변경하려는 일정이 아닌 일정들을 가져옴
        List<Schedule> schedules = scheduleRepository.findByStudyStudyIExceptOneOrderByStartDate(studyId, nowDate, scheduleId);
        for(Schedule temp : schedules) {
            long tempStartTime = temp.getStartDate().getTime();
            long tempEndTime = temp.getEndDate().getTime();
            System.out.println(temp.getStartDate());
            System.out.println(temp.getEndDate());
            if(endTime >= tempStartTime && startTime <= tempEndTime) {
                throw new InvalidScheduleException();
            }
        }
        
        schedule.changeDate(startDate, endDate);
        readmeService.updateReadme(studyId);
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

        // 코드가 있으면 일정 삭제 불가능
        for(Problem problem : schedule.getProblems()) {
            if(problem.getCode().size() > 0)
                throw new ImpossibleDeleteScheduleException();
        }

        scheduleRepository.deleteById(scheduleId);
        readmeService.updateReadme(studyId);
    }

    @Transactional
    public void deleteProblem(Long studyId, Long problemId) {
        String userId = userService.getCurrentUserId();

        Optional<StudyJoinInfo> optSJI = Optional.ofNullable(sjiRepository.findByStudyStudyIdAndUserId(studyId, userId)
                .orElseThrow(DataNotFoundException::new));
        Optional<Problem> optProblem = Optional.ofNullable(problemRepository.findById(problemId)
                .orElseThrow(DataNotFoundException::new));

        if(!optSJI.get().getState().equals("가입"))
            throw new AccessDeniedStudyException();

        Problem problem = optProblem.get();

        if(problem.getCode().size() > 0)
            throw new ImpossibleDeleteProblemException();

        problemRepository.deleteById(problemId);
        readmeService.updateReadme(studyId);
    }
}
