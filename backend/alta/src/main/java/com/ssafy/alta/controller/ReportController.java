package com.ssafy.alta.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.ssafy.alta.dto.request.MailRequest;
import com.ssafy.alta.dto.request.StudyRequest;
import com.ssafy.alta.service.MailService;
import com.ssafy.alta.service.StudyService;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.mail.MessagingException;

/**
 * packageName 	: com.ssafy.alta.controller
 * fileName 	: ReportController
 * author 	    : jisoon Lee
 * date		    : 2022-05-23
 * description	:
 * ===========================================================
 * DATE             AUTHOR              NOTE
 * -----------------------------------------------------------
 * 2022-05-23       jisoon Lee         최초 생성
 */
@RestController
@RequestMapping("/api/report")
@RequiredArgsConstructor
public class ReportController {
    private final MailService mailService;

    @PostMapping
    @ApiOperation(value = "버그 리포트 메일링", notes = "사용자에게 버그 리포트를 받는다.")
    public ResponseEntity insertStudy(@RequestBody MailRequest mailRequest) throws MessagingException {
        mailService.sendMail(mailRequest);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
