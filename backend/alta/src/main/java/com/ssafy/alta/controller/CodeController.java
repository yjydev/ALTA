package com.ssafy.alta.controller;

import com.ssafy.alta.service.CodeService;
import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Api("코드 관련 기능")
@RestController
@RequestMapping("/api/study/{study_id}/code")
@RequiredArgsConstructor
public class CodeController {
    //private final CodeService;


}
