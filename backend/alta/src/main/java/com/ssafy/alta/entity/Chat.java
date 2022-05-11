package com.ssafy.alta.entity;

import com.sun.istack.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

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
@DynamicInsert
@NoArgsConstructor
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
    @OneToOne
    @JoinColumn(name = "fk_study_id")
    private Study study;

    @ManyToOne
    @JoinColumn(name = "fk_user_id")
    private User user;
}
