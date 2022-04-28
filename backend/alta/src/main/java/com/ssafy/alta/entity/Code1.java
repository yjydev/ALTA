package com.ssafy.alta.entity;

import com.ssafy.alta.dto.CodeResponse1;
import com.sun.istack.NotNull;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.util.Date;

/**
 * packageName 	: com.ssafy.alta.entity
 * fileName 	: Code1
 * author 	    : jisoon Lee
 * date		    : 2022-04-28
 * description	:
 * ===========================================================
 * DATE             AUTHOR              NOTE
 * -----------------------------------------------------------
 * 2022-04-28       jisoon Lee         최초 생성
 */

@Entity
@Table(name = "code")
@Getter
@DynamicInsert
@DynamicUpdate
@NoArgsConstructor
public class Code1 {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "code_id")
    private long id;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "code_create_date")
    private Date createDate;

    @NotNull
    @Column(name = "code_path")
    private String path;

    @NotNull
    @Column(name = "code_sha")
    private String sha;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "fk_user_id")
    private User user;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "fk_problem_id")
    private Problem problem;

    @Builder
    public Code1(String path, String sha, User user, Problem problem) {
        this.path = path;
        this.sha = sha;
        this.user = user;
        this.problem = problem;
    }

    public CodeResponse1 toDto() {
        return CodeResponse1.builder()
                .id(id)
                .nickname(user.getNickname())
                .path(path)
                .build();
    }
}
