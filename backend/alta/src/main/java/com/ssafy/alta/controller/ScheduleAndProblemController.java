package com.ssafy.alta.controller;

import com.ssafy.alta.dto.request.ProblemRequest;
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
    public ResponseEntity selectScheduleList(@PathVariable Long study_id, @RequestHeader("user_id") String user_id) {
        return new ResponseEntity<>(scheduleAndProblemService.selectScheduleList(user_id, study_id), HttpStatus.OK);
    }

    @PostMapping("/schedule-problem")
    @ApiOperation(value = "스터디 회차, 문제 입력", notes = "스터디 회차, 문제 등록을 합니다. 회차와 문제를 모두 입력받습니다.")
    public ResponseEntity saveScheduleAndProblem(@PathVariable Long study_id, @RequestHeader("user_id") String user_id, @RequestBody ScheduleAndProblemRequest scheduleAndProblemRequest) {
        scheduleAndProblemService.saveScheduleAndProblem(user_id, study_id, scheduleAndProblemRequest);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/schedule")
    @ApiOperation(value = "스케줄 입력", notes = "스터디 회차 정보를 등록합니다.")
    public ResponseEntity insertSchedule(@PathVariable Long study_id, @RequestHeader("user_id") String user_id, @RequestBody ScheduleRequest scheduleRequest) {
        scheduleAndProblemService.insertSchedule(user_id, study_id, scheduleRequest);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/problem")
    @ApiOperation(value = "문제 입력", notes = "회차별 문제리스트를 등록합니다.")
    public ResponseEntity insertProblem(@PathVariable Long study_id, @RequestHeader("user_id") String user_id, @RequestBody ProblemRequest problemRequest) {
        scheduleAndProblemService.insertProblem(user_id, study_id, problemRequest);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
