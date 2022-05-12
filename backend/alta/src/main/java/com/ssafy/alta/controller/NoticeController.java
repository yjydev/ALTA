package com.ssafy.alta.controller;

import com.ssafy.alta.dto.request.NoticeRequest;
import com.ssafy.alta.service.NoticeService;
import io.swagger.annotations.ApiOperation;
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
    @ApiOperation(value = "공지사항 추가", notes = "공지사항을 추가합니다. 공지사항 내용만 입력받습니다.")
    public ResponseEntity insertNotice(@PathVariable("studyId") Long studyId, @RequestBody NoticeRequest noticeRequest) {
        noticeService.insertNotice(studyId, noticeRequest);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping
    @ApiOperation(value = "공지사항 조회", notes = "공지사항을 조회합니다. 최신업데이트된 내용을 가져옵니다.")
    public ResponseEntity selectNotice(@PathVariable("studyId") Long studyId) throws ParseException {
        return new ResponseEntity<>(noticeService.selectNotice(studyId), HttpStatus.OK);
    }
}
