package com.ssafy.alta.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

/**
 * packageName 	: com.ssafy.alta.service
 * fileName 	: NotificationService
 * author 	    : 우정연
 * date		    : 2022-05-14
 * description	: Server-Sent Events 관련한 service
 * ===========================================================
 * DATE 		AUTHOR 		      NOTE
 * -----------------------------------------------------------
 * 2022-05-14	    우정연  		    최초 생성
 */
@Service
@RequiredArgsConstructor
public class NotificationService {
    private final UserService userService;

    private static final Long DEFAULT_TIMEOUT = 60L * 60 * 1000;  // 타임아웃 시간 - 1시간(ms)

    public SseEmitter subscribe() {
        String userId = userService.getCurrentUserId();

        return null;
    }
}
