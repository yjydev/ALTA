package com.ssafy.alta.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Getter
@NoArgsConstructor
@Entity
@Table(name = "user")
public class User {
    @Id
    @Column(name = "user_id")
    private String id;

    @Column(name = "user_name")
    private String name;

    @Column(name = "user_nickname")
    private String nickname;

    @Column(name = "user_email")
    private String email;

    @Column(name = "user_email_alert")
    private Integer emailAlert;

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
