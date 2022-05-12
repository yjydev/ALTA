package com.ssafy.alta.controller;

import com.ssafy.alta.entity.Chat;
import com.ssafy.alta.service.ChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.Message;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.RestController;

/**
 * packageName 	: com.ssafy.alta.controller
 * fileName 	: ChatController
 * author 	    : jisoon Lee
 * date		    : 2022-05-12
 * description	:
 * ===========================================================
 * DATE             AUTHOR              NOTE
 * -----------------------------------------------------------
 * 2022-05-12       jisoon Lee         최초 생성
 */
@RequiredArgsConstructor
@RestController
public class ChatController {
    private final ChatService chatService;
    private final SimpMessagingTemplate template;

    @MessageMapping("/api/message")
    public void message(@Payload Chat chatMessage) {
        chatService.insertMessage(chatMessage);
        template.convertAndSend("/sub/"+chatMessage.getStudy().getStudyId(), chatMessage);
    }
}
