package com.ssafy.alta.controller;

import com.ssafy.alta.dto.StudyRequest;
import com.ssafy.alta.entity.StudyJoinInfo;
import com.ssafy.alta.repository.StudyJoinInfoRepository;
import com.ssafy.alta.service.StudyService;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

/**
 * packageName 	: com.ssafy.alta.controller
 * fileName 	: StudyController
 * author 	    : jisoon Lee
 * date		    : 2022-04-26
 * description	:
 * ===========================================================
 * DATE             AUTHOR              NOTE
 * -----------------------------------------------------------
 * 2022-04-26       jisoon Lee         최초 생성
 */

@RestController
@RequestMapping("/api/study")
public class StudyController {
    @Autowired
    StudyService studyService;
    @Autowired
    StudyJoinInfoRepository sjiRepository;

    @PostMapping
    @ApiOperation(value = "스터디 그룹 생성", notes = "신규 스터디 그룹을 생성합니다.")
    public ResponseEntity insertStudy(@RequestBody StudyRequest studyRequest) {
        try {
            return new ResponseEntity<>(studyService.insertStudy(studyRequest), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/{study_id}/members")
    public ResponseEntity selectStudyMemberList(@PathVariable Long study_id, @RequestHeader("user_id") String user_id) {
        try {
            return new ResponseEntity<>(studyService.selectStudyMemberList(user_id, study_id), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}