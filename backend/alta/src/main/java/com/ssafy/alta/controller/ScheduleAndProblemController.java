package com.ssafy.alta.controller;

import com.ssafy.alta.dto.request.ScheduleAndProblemRequest;
import com.ssafy.alta.service.ScheduleAndProblemService;
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
@RestController
@RequestMapping("/api/study/{study_id}")
public class ScheduleAndProblemController {
    @Autowired
    ScheduleAndProblemService scheduleAndProblemService;

    @PostMapping("/problem")
    public ResponseEntity saveScheduleAndProblem(@PathVariable Long study_id, @RequestHeader("user_id") String user_id, @RequestBody ScheduleAndProblemRequest scheduleAndProblemRequest) {
        try {
            scheduleAndProblemService.saveScheduleAndProblem(user_id, study_id, scheduleAndProblemRequest);
            return new ResponseEntity<>("success", HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping
    @ApiOperation(value = "스터디 상세 조회", notes = "스터디 상세를 조회합니다. 회차, 문제, 코드")
    public ResponseEntity selectScheduleList(@PathVariable Long study_id, @RequestHeader("user_id") String user_id) {
        try {
            return new ResponseEntity<>(scheduleAndProblemService.selectScheduleList(user_id, study_id), HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
