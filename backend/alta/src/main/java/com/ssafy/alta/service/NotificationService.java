package com.ssafy.alta.service;

import com.ssafy.alta.dto.response.AlertResponse;
import com.ssafy.alta.entity.Alert;
import com.ssafy.alta.exception.SseSendMessageFail;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
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

        SseEmitter emitter = new SseEmitter(DEFAULT_TIMEOUT);  // sse 연결 요청에 응답하기 위해 sseEmitter 객체 생성(유호시간)

        System.out.println("SSE 연결 성공");

        // 클라이언트로 더미 데이터 한번 보내줌! -> 프론트에서 open 열기 위함!
        AlertResponse alertResponse = AlertResponse.builder()
                .alertId(-1L)
                .content("sse연결 성공!")
                .build();
        this.sendToClient(emitter, userId, alertResponse);
        emitters.put(userId, emitter);  // 생성된 emitters를 저장해둠

        emitter.onCompletion(() -> emitters.remove(userId));  // 네트워크 에러
        emitter.onTimeout(() -> emitters.remove(userId));  // 타임아웃

        return emitter;
    }

    public void sendAlertEvent(Alert alert) {  // 이벤트 발생
        AlertResponse alertResponse = alert.toDto();
        String userId = alert.getReceiver().getId();  // 받을 사람에게 알림 발생할거라

        if (emitters.containsKey(userId)) {   // sse가 연결된 유저이면
            SseEmitter emitter = emitters.get(userId);
            this.sendToClient(emitter, userId, alertResponse);  // 알림 객체 보내줌
        }

    }
    public void sendDummyData() {
        for(String userId : emitters.keySet()) {
            AlertResponse alertResponse = AlertResponse.builder()
                    .alertId(-1L)
                    .content("주기적으로 보내는 더미 데이터")
                    .build();
            this.sendToClient(emitters.get(userId), userId, alertResponse);
        }
    }

    public void deleteAlertEvent() {
        String userId = userService.getCurrentUserId();
        if(emitters.containsKey(userId)) {
            emitters.remove(userId);
        }
    }

    // 알림 전송
    private void sendToClient(SseEmitter emitter, String userId, Object data) {
        try {
            System.out.println("SSE 보내는 중 : " + userId + " " + data.toString());
            emitter.send(SseEmitter.event()
                    .id(userId)
                    .data(data));
        } catch (IOException e) {
            emitters.remove(userId);
            throw new SseSendMessageFail();
        }
    }
}
