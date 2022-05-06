package com.ssafy.alta.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.ssafy.alta.dto.request.StudyRequest;
import com.ssafy.alta.service.StudyService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;

import javax.mail.MessagingException;

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
    public ResponseEntity insertStudy(@RequestBody StudyRequest studyRequest) throws JsonProcessingException {
        studyService.insertStudy(studyRequest);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/{study_id}/members")
    @ApiOperation(value = "스터디 멤버 조회", notes = "스터디 멤버를 조회합니다. 그룹장이라면 모든 정보를, 그룹원이라면 가입된 멤버 정보를 볼 수 있습니다.")
    public ResponseEntity selectStudyMemberList(@PathVariable("study_id") Long studyId) {
        return new ResponseEntity<>(studyService.selectStudyMemberList(studyId), HttpStatus.OK);
    }

    @PostMapping("/{study_id}/invitation")
    @ApiOperation(value = "스터디 멤버 초대", notes = "User email을 기반으로 메일을 보낸다.")
    public ResponseEntity inviteUser(@PathVariable("study_id") Long studyId, @RequestBody String userId) throws MessagingException {
        studyService.inviteUser(studyId, userId);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PutMapping("/invitation")
    @ApiOperation(value = "스터디 가입 검증")
    public ResponseEntity updateStudyMember(@RequestBody String code) {
        studyService.updateStudyMember(code);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}