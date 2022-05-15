package com.ssafy.alta.dto.request;

import com.ssafy.alta.entity.Chat;
import com.ssafy.alta.entity.Study;
import com.ssafy.alta.entity.User;
import lombok.*;

import java.util.Date;

/**
 * packageName 	: com.ssafy.alta.dto.request
 * fileName 	: ChatRequest
 * author 	    : jisoon Lee
 * date		    : 2022-05-13
 * description	:
 * ===========================================================
 * DATE             AUTHOR              NOTE
 * -----------------------------------------------------------
 * 2022-05-13       jisoon Lee         최초 생성
 */
@Getter
@Setter
@ToString
@NoArgsConstructor
public class ChatRequest {
    private String userid;
    private String content;

    public Chat toChat(User user, Study study, Date date) {
        return Chat.builder()
                .message(content)
                .user(user)
                .study(study)
                .writeDate(date)
                .build();
    }
}
