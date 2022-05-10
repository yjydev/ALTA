package com.ssafy.alta.controller;

import com.ssafy.alta.dto.request.NoticeRequest;
import com.ssafy.alta.service.NoticeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;

/**
 * packageName 	: com.ssafy.alta.controller
 * fileName 	: NoticeController
 * author 	    : jisoon Lee
 * date		    : 2022-05-10
 * description	:
 * ===========================================================
 * DATE             AUTHOR              NOTE
 * -----------------------------------------------------------
 * 2022-05-10       jisoon Lee         최초 생성
 */
@RestController
@RequestMapping("/api/study/{studyId}/notice")
@RequiredArgsConstructor
public class NoticeController {
    private final NoticeService noticeService;

    @PostMapping
    public ResponseEntity insertNotice(@PathVariable("studyId") Long studyId, @RequestBody NoticeRequest noticeRequest) {
        noticeService.insertNotice(studyId, noticeRequest);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity selectNotice(@PathVariable("studyId") Long studyId) throws ParseException {
        return new ResponseEntity<>(noticeService.selectNotice(studyId), HttpStatus.OK);
    }
}
