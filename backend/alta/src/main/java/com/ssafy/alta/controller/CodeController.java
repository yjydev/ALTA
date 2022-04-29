package com.ssafy.alta.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.ssafy.alta.dto.request.CodeRequest;
import com.ssafy.alta.service.CodeService;
import io.swagger.annotations.Api;
import io.swagger.models.Response;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Api("코드 관련 기능")
@RestController
@RequestMapping("/api/study/{study_id}/code")
@RequiredArgsConstructor
public class CodeController {
    private final CodeService codeService;
    @PostMapping
    public ResponseEntity insertCode(@PathVariable("study_id") Long studyId, CodeRequest codeRequest) throws JsonProcessingException {
        String userId = "11";
        String token = "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";
        codeService.insertCode(studyId, userId, token, codeRequest);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
