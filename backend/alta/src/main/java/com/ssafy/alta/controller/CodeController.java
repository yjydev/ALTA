package com.ssafy.alta.controller;

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
    public ResponseEntity insertCode(@PathVariable("study_id") Long studyId, CodeRequest codeRequest) {
        String userId = "aa";
        String token = "5ab3b5457f06377a194be6c731e2723f2fe9bf8a";
        codeService.insertCode(userId, token, codeRequest);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
