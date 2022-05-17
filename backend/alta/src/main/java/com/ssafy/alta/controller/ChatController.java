package com.ssafy.alta.controller;

import com.ssafy.alta.dto.request.ChatRequest;
import com.ssafy.alta.dto.response.ChatResponse;
import com.ssafy.alta.service.ChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageExceptionHandler;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.annotation.SendToUser;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

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

    @MessageMapping("/api/ws/{studyId}")
    public void message(@DestinationVariable("studyId") Long studyId, ChatRequest chatRequest, Principal user) {
        ChatResponse chat = chatService.insertMessage(studyId, chatRequest, user);
        template.convertAndSend("/api/topic/"+studyId, chat);
    }

    @PostMapping("/api/chat/{studyId}")
    public void insertMessage(@PathVariable("studyId") Long studyId, ChatRequest chatRequest) {
        ChatResponse chat = chatService.insertMessageSend(studyId, chatRequest);
        template.convertAndSend("/api/topic/" + studyId, chat);
    }

    @GetMapping("/api/chat/{studyId}")
    public ResponseEntity selectChatList(@PathVariable("studyId") Long studyId) {
        return new ResponseEntity<>(chatService.selectChatList(studyId), HttpStatus.OK);
    }
}
