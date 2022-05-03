package com.ssafy.alta.controller;

import com.ssafy.alta.dto.request.StudyRequest;
import com.ssafy.alta.service.StudyService;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @PostMapping
    @ApiOperation(value = "스터디 그룹 생성", notes = "신규 스터디 그룹을 생성합니다.")
    public ResponseEntity insertStudy(@RequestBody StudyRequest studyRequest) {
        studyService.insertStudy(studyRequest);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/{study_id}/members")
    @ApiOperation(value = "스터디 멤버 조회", notes = "스터디 멤버를 조회합니다. 그룹장이라면 모든 정보를, 그룹원이라면 가입된 멤버 정보를 볼 수 있습니다.")
    public ResponseEntity selectStudyMemberList(@PathVariable("study_id") Long studyId) {
        return new ResponseEntity<>(studyService.selectStudyMemberList(studyId), HttpStatus.OK);
    }
}