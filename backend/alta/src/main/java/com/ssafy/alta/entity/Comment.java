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
@Table(name = "comment")
@Getter
@DynamicInsert
@DynamicUpdate
@NoArgsConstructor
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "comment_id")
    private long id;

    @NotNull
    @Column(name = "comment_content")
    private String content;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "comment_create_date")
    private Date createDate;

    @NotNull
    @Column(name = "comment_line")
    private int line;

    @Column(name = "comment_is_solved")
    private boolean isSolved;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "fk_user_id")
    private User user;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "fk_code_id")
    private Code code;

    @Builder
    public Comment(String content, int line, boolean isSolved, User user, Code code) {
        this.content = content;
        this.line = line;
        this.isSolved = isSolved;
        this.user = user;
        this.code = code;
    }
}
