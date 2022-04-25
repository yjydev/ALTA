package com.ssafy.alta.entity;

import com.sun.istack.NotNull;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "code")
@Getter
@DynamicInsert
@DynamicUpdate
@NoArgsConstructor
public class Code {
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
    public Code(String path, String sha, User user, Problem problem) {
        this.path = path;
        this.sha = sha;
        this.user = user;
        this.problem = problem;
    }
}
