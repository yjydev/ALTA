package com.ssafy.alta.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;

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

    @PrePersist
    private void prePersist() {
        this.emailAlert = this.emailAlert == null ? 3 : this.emailAlert;
        this.siteAlert = this.siteAlert == null ? 3 : this.siteAlert;
    }
}
