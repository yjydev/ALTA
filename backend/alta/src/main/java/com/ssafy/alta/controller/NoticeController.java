package com.ssafy.alta.controller;

import com.ssafy.alta.service.NoticeService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
    private NoticeService noticeService;
}
