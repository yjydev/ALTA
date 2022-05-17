package com.ssafy.alta.service;

import com.ssafy.alta.dto.request.ChatRequest;
import com.ssafy.alta.dto.response.ChatResponse;
import com.ssafy.alta.entity.Chat;
import com.ssafy.alta.entity.StudyJoinInfo;
import com.ssafy.alta.entity.User;
import com.ssafy.alta.exception.BadRequestMessage;
import com.ssafy.alta.exception.DataNotFoundException;
import com.ssafy.alta.repository.ChatRepository;
import com.ssafy.alta.repository.StudyJoinInfoRepository;
import com.ssafy.alta.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.Principal;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

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
    private final UserService userService;
    private final UserRepository userRepository;
    private final StudyJoinInfoRepository sjiRepository;

    @Transactional(rollbackFor = Exception.class)
    public ChatResponse insertMessage(Long studyId, ChatRequest chatRequest, Principal user) {
        String userId = user.getName();

        if (chatRequest.getContent().length() == 0) {
            throw new BadRequestMessage();
        }

        Optional<User> optUser = Optional.ofNullable(userRepository.findById(userId)
                .orElseThrow(DataNotFoundException::new));
        Optional<StudyJoinInfo> optSJI = Optional.ofNullable(sjiRepository.findByStudyStudyIdAndUserId(studyId, userId)
                .orElseThrow(DataNotFoundException::new));

        Chat chat = chatRequest.toChat(optUser.get(), optSJI.get().getStudy(), new Date());
        Chat chatResponse = chatRepository.save(chat);

        return chatResponse.toChatSubResponse();
    }

    @Transactional(rollbackFor = Exception.class)
    public List<ChatResponse> selectChatList(Long studyId) {
        String userId = userService.getCurrentUserId();

        Optional<User> optUser = Optional.ofNullable(userRepository.findById(userId)
                .orElseThrow(DataNotFoundException::new));
        Optional<StudyJoinInfo> optSJI = Optional.ofNullable(sjiRepository.findByStudyStudyIdAndUserId(studyId, userId)
                .orElseThrow(DataNotFoundException::new));

        List<Chat> chatList = chatRepository.findByStudyStudyIdOrderByWriteDate(studyId);
        List<ChatResponse> chatResponses = new ArrayList<>();

        if (chatList.size() == 0) {
            chatResponses = null;
        } else {
            for (Chat c : chatList) {
                chatResponses.add(c.toChatSubResponse());
            }
        }
        return chatResponses;
    }
}
