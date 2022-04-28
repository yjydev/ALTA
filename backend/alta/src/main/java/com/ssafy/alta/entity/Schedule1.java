package com.ssafy.alta.entity;

import com.ssafy.alta.dto.ScheduleAndProblemResponse;
import com.sun.istack.NotNull;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * packageName 	: com.ssafy.alta.entity
 * fileName 	: Schedule1
 * author 	    : jisoon Lee
 * date		    : 2022-04-28
 * description	:
 * ===========================================================
 * DATE             AUTHOR              NOTE
 * -----------------------------------------------------------
 * 2022-04-28       jisoon Lee         최초 생성
 */
@Entity
@Table(name = "schedule")
@Getter
@DynamicInsert
@DynamicUpdate
@NoArgsConstructor
public class Schedule1 {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "schedule_id")
    private long id;


    @Temporal(TemporalType.DATE)
    @Column(name = "schedule_start_date")
    private Date startDate;

    @Temporal(TemporalType.DATE)
    @Column(name = "schedule_end_date")
    private Date endDate;

    @NotNull
    @Column(name = "schedule_round")
    private int round;

    @NotNull
    @Column(name = "schedule_is_cancel")
    private Boolean isCancel;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "fk_study_id")
    private Study study;

    @OneToMany
    @JoinColumn(name = "fk_schedule_id")
    private List<Problem1> problems = new ArrayList<>();

    @Builder
    public Schedule1(Date startDate, Date endDate, int round, boolean isCancel, Study study) {
        this.startDate = startDate;
        this.endDate = endDate;
        this.round = round;
        this.isCancel = isCancel;
        this.study = study;
    }

    public ScheduleAndProblemResponse toDto() {
        return ScheduleAndProblemResponse.builder()
                .id(id)
                .startDate(startDate)
                .endDate(endDate)
                .round(round)
                .build();
    }
}
