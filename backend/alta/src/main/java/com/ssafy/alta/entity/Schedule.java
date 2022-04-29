package com.ssafy.alta.entity;

import com.ssafy.alta.dto.response.ScheduleAndProblemResponse;
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
 * fileName 	: Schedule
 * author 	    : 우정연
 * date		    : 2022-04-26
 * description	: 일정 엔티티
 * ===========================================================
 * DATE 		AUTHOR 		      NOTE
 * -----------------------------------------------------------
 * 2022-04-26	    우정연  		    최초 생성
 */

@Entity
@Table(name = "schedule")
@Getter
@DynamicInsert
@DynamicUpdate
@NoArgsConstructor
public class Schedule {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "schedule_id")
    private Long id;


    @Temporal(TemporalType.DATE)
    @Column(name = "schedule_start_date")
    private Date startDate;

    @Temporal(TemporalType.DATE)
    @Column(name = "schedule_end_date")
    private Date endDate;

    @NotNull
    @Column(name = "schedule_round")
    private Integer round;

    @NotNull
    @Column(name = "schedule_is_cancel")
    private Boolean isCancel;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "fk_study_id")
    private Study study;

    @OneToMany
    @JoinColumn(name = "fk_schedule_id")
    private List<Problem> problems = new ArrayList<>();

    @Builder
    public Schedule(Date startDate, Date endDate, int round, Boolean isCancel, Study study) {
        this.startDate = startDate;
        this.endDate = endDate;
        this.round = round;
        this.isCancel = isCancel;
        this.study = study;
    }

    public ScheduleAndProblemResponse toScheduleAndProblemResponse() {
        return ScheduleAndProblemResponse.builder()
                .id(id)
                .startDate(startDate)
                .endDate(endDate)
                .round(round)
                .build();
    }
}
