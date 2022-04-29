package com.ssafy.alta.entity;

import com.ssafy.alta.dto.response.CommentResponse;
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
 * fileName 	: Comment
 * author 	    : 우정연
 * date		    : 2022-04-26
 * description	: 코드 댓글 엔티티
 * ===========================================================
 * DATE 		AUTHOR 		      NOTE
 * -----------------------------------------------------------
 * 2022-04-26	    우정연  		    최초 생성
 */
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
    private Long id;

    @NotNull
    @Column(name = "comment_content")
    private String content;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "comment_create_date")
    private Date createDate;

    @NotNull
    @Column(name = "comment_line")
    private Integer line;

    @Column(name = "comment_is_solved")
    private Boolean isSolved;

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

    public CommentResponse toDto() {
        return CommentResponse.builder()
                .reviewrId(user.getId())
                .reviewerName(user.getNickname())
                .comment(content)
                .codeNumber(line)
                .completed(isSolved)
                .build();
    }

    public void changeStateToSolved() {
        this.isSolved = true;
    }

    public void changeStateToNotSolved() {
        this.isSolved = false;
    }
}
