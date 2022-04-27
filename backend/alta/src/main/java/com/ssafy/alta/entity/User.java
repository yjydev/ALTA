package com.ssafy.alta.entity;

import com.sun.istack.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * packageName 	: com.ssafy.alta.entity
 * fileName 	: User
 * author 	    : jisoon Lee
 * date		    : 2022-04-26
 * description	:
 * ===========================================================
 * DATE             AUTHOR              NOTE
 * -----------------------------------------------------------
 * 2022-04-26       jisoon Lee         최초 생성
 */

@Getter
@NoArgsConstructor
@Entity
@DynamicInsert
@DynamicUpdate
@Table(name = "user")
public class User {
    @Id
    @Column(name = "user_id")
    private String id;

    @NotNull
    @Column(name = "user_name")
    private String name;

    @NotNull
    @Column(name = "user_nickname")
    private String nickname;

    @NotNull
    @Column(name = "user_email")
    private String email;

    @NotNull
    @Column(name = "user_email_alert")
    private Integer emailAlert;

    @NotNull
    @Column(name = "user_site_alert")
    private Integer siteAlert;

    @Column(name = "user_introduction")
    private String introduction;

    @Column(name = "user_activity_time")
    private String activityTime;

    @Column(name = "user_language")
    private Integer language;

    @Column(name = "user_image")
    private String image;

    @Column(name = "user_role")
    private String role;
}