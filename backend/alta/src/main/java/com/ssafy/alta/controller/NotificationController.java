package com.ssafy.alta.controller;

import com.ssafy.alta.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * packageName 	: com.ssafy.alta.controller
 * fileName 	: NotificationController
 * author 	    : jisoon Lee
 * date		    : 2022-05-18
 * description	:
 * ===========================================================
 * DATE             AUTHOR              NOTE
 * -----------------------------------------------------------
 * 2022-05-18       jisoon Lee         최초 생성
 */
@RestController
@RequestMapping("/api/notification")
@RequiredArgsConstructor
public class NotificationController {
    private final NotificationService notificationService;

    @DeleteMapping
    public ResponseEntity deleteNotification() {
        notificationService.deleteAlertEvent();
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
