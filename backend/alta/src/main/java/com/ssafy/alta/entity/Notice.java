package com.ssafy.alta.entity;

import com.ssafy.alta.dto.response.NoticeResponse;
import com.sun.istack.NotNull;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * packageName 	: com.ssafy.alta.entity
 * fileName 	: Notice
 * author 	    : jisoon Lee
 * date		    : 2022-05-10
 * description	:
 * ===========================================================
 * DATE             AUTHOR              NOTE
 * -----------------------------------------------------------
 * 2022-05-10       jisoon Lee         최초 생성
 */
@Entity
@Table(name = "notice")
@Getter
@ToString
@DynamicInsert
@NoArgsConstructor
public class Notice {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "notice_id")
    private Long id;

    @NotNull
    @Column(name = "notice_content")
    private String content;

    @NotNull
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "notice_write_date")
    private Date writeDate;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "fk_study_id")
    private Study study;

    @Builder
    public Notice(String content, Date writeDate, Study study) {
        this.content = content;
        this.writeDate = writeDate;
        this.study = study;
    }

    public NoticeResponse toNoticeResponse() {
        String date;
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy년 MM월 dd일 HH시 mm분 ss초");
        date = formatter.format(this.writeDate);

        return NoticeResponse.builder()
                .content(content)
                .writeDate(date)
                .build();
    }
}
