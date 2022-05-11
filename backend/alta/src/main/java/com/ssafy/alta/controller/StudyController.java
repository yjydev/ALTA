package com.ssafy.alta.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.ssafy.alta.dto.request.StudyCodeRequest;
import com.ssafy.alta.dto.request.StudyRequest;
import com.ssafy.alta.dto.request.StudyUserIdRequest;
import com.ssafy.alta.service.StudyService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;

import javax.mail.MessagingException;
import javax.servlet.http.HttpServletResponse;
import java.net.http.HttpResponse;

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
    @ApiOperation(value = "스터디 멤버 조회", notes = "스터디에 가입된 멤버를 조회합니다.")
    public ResponseEntity selectStudyMemberList(@PathVariable("study_id") Long studyId) {
        return new ResponseEntity<>(studyService.selectStudyMemberList(studyId), HttpStatus.OK);
    }

    @GetMapping("/{study_id}/members/management")
    @ApiOperation(value = "스터디 멤버 관리 - 그룹장", notes = "스터디 멤버 관리 정보를 조회합니다.")
    public ResponseEntity selectStudyLeaderMemberList(@PathVariable("study_id") Long studyId) {
        return new ResponseEntity<>(studyService.selectStudyLeaderMemberList(studyId), HttpStatus.OK);
    }

    @PostMapping("/{study_id}/invitation")
    @ApiOperation(value = "스터디 멤버 초대", notes = "User email을 기반으로 메일을 보낸다.")
    public ResponseEntity inviteUser(@PathVariable("study_id") Long studyId, @RequestBody StudyUserIdRequest studyUserIdRequest) throws MessagingException, JsonProcessingException {
        studyService.inviteUser(studyId, studyUserIdRequest);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @DeleteMapping("/{studyId}/invitation/{sjiId}")
    public ResponseEntity deleteMember(@PathVariable("studyId") Long studyId, @PathVariable("sjiId") Long sjiId){
        studyService.deleteMember(studyId, sjiId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping("/invitation")
    @ApiOperation(value = "스터디 가입 검증")
    public ResponseEntity updateStudyMember(@RequestBody StudyCodeRequest studyCodeRequest) {
        return new ResponseEntity<>(studyService.updateStudyMember(studyCodeRequest), HttpStatus.OK);
    }

    @PutMapping("/{study_id}/tree")
    @ApiOperation(value = "트리 구조 조회", notes = "스터디의 트리 구조를 조회한다.")
    public ResponseEntity updateStudyMember(@ApiParam(value = "스터디 키", required = true) @PathVariable("study_id") Long studyId) {
        return new ResponseEntity<>(studyService.selectTree(studyId), HttpStatus.OK);
    }
}