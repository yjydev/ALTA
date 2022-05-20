package com.ssafy.alta.entity;

import com.ssafy.alta.dto.response.ChatResponse;
import com.sun.istack.NotNull;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;
import java.util.Date;

/**
 * packageName 	: com.ssafy.alta.entity
 * fileName 	: Chat
 * author 	    : jisoon Lee
 * date		    : 2022-05-12
 * description	:
 * ===========================================================
 * DATE             AUTHOR              NOTE
 * -----------------------------------------------------------
 * 2022-05-12       jisoon Lee         최초 생성
 */
@Entity
@Table(name = "chat")
@Getter
@ToString
@Builder
@DynamicInsert
@NoArgsConstructor
@AllArgsConstructor
public class Chat {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "chat_id")
    private Long id;

    @NotNull
    @Column(name = "chat_message")
    private String message;

    @NotNull
    @Column(name = "chat_write_date")
    private Date writeDate;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "fk_study_id")
    private Study study;

    @ManyToOne
    @JoinColumn(name = "fk_user_id")
    private User user;

    public ChatResponse toChatSubResponse() {
        return ChatResponse.builder()
                .nickname(user.getNickname())
                .image(user.getImage())
                .message(message)
                .writeDate(writeDate)
                .build();
    }
}
