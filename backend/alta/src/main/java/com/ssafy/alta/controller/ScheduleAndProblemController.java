package com.ssafy.alta.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.ssafy.alta.dto.request.ProblemCreateRequest;
import com.ssafy.alta.dto.request.ProblemUpdateRequest;
import com.ssafy.alta.dto.request.ScheduleAndProblemRequest;
import com.ssafy.alta.dto.request.ScheduleRequest;
import com.ssafy.alta.service.ScheduleAndProblemService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * packageName 	: com.ssafy.alta.controller
 * fileName 	: ScheduleAndProblemController
 * author 	    : jisoon Lee
 * date		    : 2022-04-28
 * description	:
 * ===========================================================
 * DATE             AUTHOR              NOTE
 * -----------------------------------------------------------
 * 2022-04-28       jisoon Lee         최초 생성
 */
@Api("회차, 문제 관련 기능 (상세조회, 회차, 문제)")
@RestController
@RequestMapping("/api/study/{study_id}")
public class ScheduleAndProblemController {
    @Autowired
    ScheduleAndProblemService scheduleAndProblemService;

    @GetMapping
    @ApiOperation(value = "스터디 상세 조회", notes = "스터디 상세를 조회합니다. 회차, 문제, 코드")
    public ResponseEntity selectScheduleList(@PathVariable("study_id") Long studyId) {
        return new ResponseEntity<>(scheduleAndProblemService.selectScheduleList(studyId), HttpStatus.OK);
    }

    @PostMapping("/schedule-problem")
    @ApiOperation(value = "스터디 회차, 문제 입력", notes = "스터디 회차, 문제 등록을 합니다. 회차와 문제를 모두 입력받습니다.")
    public ResponseEntity saveScheduleAndProblem(@PathVariable("study_id") Long studyId, @RequestBody ScheduleAndProblemRequest scheduleAndProblemRequest) {
        scheduleAndProblemService.saveScheduleAndProblem(studyId, scheduleAndProblemRequest);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/schedule")
    @ApiOperation(value = "스케줄 입력", notes = "스터디 회차 정보를 등록합니다.")
    public ResponseEntity insertSchedule(@PathVariable("study_id") Long studyId, @RequestBody ScheduleRequest scheduleRequest) {
        scheduleAndProblemService.insertSchedule(studyId, scheduleRequest);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/problem")
    @ApiOperation(value = "문제 입력", notes = "회차별 문제리스트를 등록합니다.")
    public ResponseEntity insertProblem(@PathVariable("study_id") Long studyId, @RequestBody ProblemCreateRequest problemCreateRequest) {
        scheduleAndProblemService.insertProblem(studyId, problemCreateRequest);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping("/problem")
    @ApiOperation(value = "문제 수정", notes = "문제를 수정한다.")
    public ResponseEntity updateProblem(@PathVariable("study_id") Long studyId, @RequestBody ProblemUpdateRequest problemUpdateRequest) throws JsonProcessingException {
        scheduleAndProblemService.updateProblem(studyId, problemUpdateRequest);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
