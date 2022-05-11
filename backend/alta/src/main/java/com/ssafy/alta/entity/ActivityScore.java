package com.ssafy.alta.entity;

import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.util.Date;

/**
 * packageName 	: com.ssafy.alta.entity
 * fileName 	: ActivityScore
 * author 	    : 오서하
 * date		    : 2022-05-10
 * description	: 성실점수 클래스
 * ===========================================================
 * DATE 		AUTHOR 		      NOTE
 * -----------------------------------------------------------
 * 2022-05-10	    오서하  		    최초 생성
 */


@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Builder
@DynamicInsert
@DynamicUpdate
@Table(name = "activity_score")
@ToString
public class ActivityScore {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "activity_score_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "fk_user_id")
    private String userId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "fk_study_id")
    private Long studyId;

    @Column(name = "history")
    private String history;

    @Column(name = "activity_type")
    private int activityType;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "activity_date")
    private Date activityDate;
}
