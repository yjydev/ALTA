package com.ssafy.alta.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.ssafy.alta.dto.request.CodeRequest;
import com.ssafy.alta.dto.response.CodeAndCommentResponse;
import com.ssafy.alta.service.CodeService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.models.Response;
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
    //@ApiOperation(value = "코드 추가", notes = "새 코드를 DB에 생성하고 Github에 commit합니다.")
    public ResponseEntity insertCode(@ApiParam(value = "스터디 키", required = true) @PathVariable("study_id") Long studyId, @ApiParam(value = "코드 추가 요청 정보", required = true)  @RequestBody CodeRequest codeRequest) throws JsonProcessingException {
        String userId = "11";
        String token = "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";
        codeService.insertCode(studyId, userId, token, codeRequest);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/{code_id}")
    //@ApiOperation(value = "코드와 댓글 조회", notes = "Github에서 일어난 코드 변경을 반영하고 코드와 관련 댓글들을 조회합니다.")
    public ResponseEntity selectCodeAndComments(@ApiParam(value = "스터디 키", required = true) @PathVariable("study_id") Long studyId, @ApiParam(value = "코드 키", required = true) @PathVariable("code_id") Long codeId) throws JsonProcessingException {
        String token = "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";
        CodeAndCommentResponse codeAndCommentResponse = codeService.selectCodeAndComments(studyId, codeId, token);
        return new ResponseEntity<>(codeAndCommentResponse, HttpStatus.OK);
    }

    @DeleteMapping("/{code_id}")
    //@ApiOperation(value = "코드 삭제", notes = "Github에서 일어난 sha값 변경을 반영하고 코드를 DB에서 삭제합니다.")
    public ResponseEntity deleteCode(@ApiParam(value = "스터디 키", required = true) @PathVariable("study_id") Long studyId, @ApiParam(value = "코드 키", required = true) @PathVariable("code_id") Long codeId) throws JsonProcessingException {
        String userId = "11";
        String token = "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";
        codeService.deleteCode(studyId, codeId, token);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
