package com.ssafy.alta.service;

import com.ssafy.alta.entity.Chat;
import com.ssafy.alta.repository.ChatRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.Message;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * packageName 	: com.ssafy.alta.service
 * fileName 	: ChatService
 * author 	    : jisoon Lee
 * date		    : 2022-05-12
 * description	:
 * ===========================================================
 * DATE             AUTHOR              NOTE
 * -----------------------------------------------------------
 * 2022-05-12       jisoon Lee         최초 생성
 */
@Service
@RequiredArgsConstructor
public class ChatService {
    private final ChatRepository chatRepository;

    public void insertMessage(Chat chat) {
        chatRepository.save(chat);
    }

    public List<Chat> selectChatList(Long studyId) {
        return chatRepository.findByStudyStudyId(studyId);
    }
}
