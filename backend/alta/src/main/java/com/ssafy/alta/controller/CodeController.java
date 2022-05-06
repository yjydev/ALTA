package com.ssafy.alta.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.ssafy.alta.dto.request.CodeRequest;
import com.ssafy.alta.dto.response.CodeInfoResponse;
import com.ssafy.alta.service.CodeService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Api("코드 관련 기능")
@RestController
@RequestMapping("/api/study/{study_id}/code")
@RequiredArgsConstructor
public class CodeController {
    private final CodeService codeService;

    @PostMapping
    @ApiOperation(value = "코드 추가", notes = "새 코드를 DB에 생성하고 Github에 commit합니다.")
    public ResponseEntity insertCode(@ApiParam(value = "스터디 키", required = true) @PathVariable("study_id") Long studyId,
                                     @ApiParam(value = "코드 추가 요청 정보", required = true)  @RequestBody CodeRequest codeRequest
                                     ) throws JsonProcessingException {
        codeService.insertCode(studyId, codeRequest);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/{code_id}")
    @ApiOperation(value = "코드 조회", notes = "Github에서 일어난 코드 변경을 반영하고 코드를 조회합니다.")
    public ResponseEntity selectCodeAndComments(@ApiParam(value = "스터디 키", required = true) @PathVariable("study_id") Long studyId,
                                                @ApiParam(value = "코드 키", required = true) @PathVariable("code_id") Long codeId) throws JsonProcessingException {
        CodeInfoResponse codeInfoResponse = codeService.selectCode(studyId, codeId);
        return new ResponseEntity<>(codeInfoResponse, HttpStatus.OK);
    }

    @DeleteMapping("/{code_id}")
    @ApiOperation(value = "코드 삭제", notes = "Github에서 일어난 sha값 변경을 반영하고 코드를 DB에서 삭제합니다.")
    public ResponseEntity deleteCode(@ApiParam(value = "스터디 키", required = true) @PathVariable("study_id") Long studyId,
                                     @ApiParam(value = "코드 키", required = true) @PathVariable("code_id") Long codeId) throws JsonProcessingException {
        codeService.deleteCode(studyId, codeId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping("/{code_id}/modify")
    @ApiOperation(value = "코드 수정", notes = "코드를 수정해서 DB와 Github에 반영합니다.")
    public ResponseEntity updateCode(@ApiParam(value = "스터디 키", required = true) @PathVariable("study_id") Long studyId,
                                     @ApiParam(value = "코드 키", required = true) @PathVariable("code_id") Long codeId,
                                     @ApiParam(value = "코드 수정 요청 정보", required = true)  @RequestBody CodeRequest codeRequest) throws JsonProcessingException {
        codeService.updateCode(studyId, codeId, codeRequest, true);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping("/{code_id}/reupload")
    @ApiOperation(value = "코드 재업로드", notes = "코드를 재업로드해서 DB와 Github에 반영합니다.")
    public ResponseEntity reuploadCode(@ApiParam(value = "스터디 키", required = true) @PathVariable("study_id") Long studyId,
                                     @ApiParam(value = "코드 키", required = true) @PathVariable("code_id") Long codeId,
                                     @ApiParam(value = "코드 재업로드 요청 정보", required = true)  @RequestBody CodeRequest codeRequest) throws JsonProcessingException {
        codeService.updateCode(studyId, codeId, codeRequest, false);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
