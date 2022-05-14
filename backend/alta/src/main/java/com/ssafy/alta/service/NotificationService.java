package com.ssafy.alta.service;

import com.ssafy.alta.dto.response.AlertResponse;
import com.ssafy.alta.entity.Alert;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

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
    private static Map<String, SseEmitter> emitters = new ConcurrentHashMap<>();  // multi-thread에서 동시에 작업하기 위한 map 클래스

    private static final Long DEFAULT_TIMEOUT = 60L * 60 * 1000;  // 타임아웃 시간 - 1시간(ms)

    public SseEmitter subscribe() {
        String userId = userService.getCurrentUserId();

        SseEmitter emitter = new SseEmitter(DEFAULT_TIMEOUT);

        String dummyData = "EventStream Created! userId : " + userId;
        this.sendToClient(emitter, userId, dummyData);
        emitters.put(userId, emitter);

        emitter.onCompletion(() -> emitters.remove(userId));
        emitter.onTimeout(() -> emitters.remove(userId));

        return emitter;
    }
    
    public void sendAlertEvent(Alert alert) {
        AlertResponse alertResponse = alert.toDto();
        String userId = alert.getReceiver().getId();  // 받을 사람에게 알림 발생할거라

        if (emitters.containsKey(userId)) {
            SseEmitter emitter = emitters.get(userId);
            try {
                this.sendToClient(emitter, userId, alertResponse);
            } catch (Exception e) {
                emitters.remove(userId);
            }
        }

    }

    private void sendToClient(SseEmitter emitter, String userId, Object data) {
        try {
            emitter.send(SseEmitter.event()
                    .id(userId)
                    .name("sse")
                    .data(data));
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
