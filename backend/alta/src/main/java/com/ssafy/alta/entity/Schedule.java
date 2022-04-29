package com.ssafy.alta.entity;

import com.sun.istack.NotNull;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.util.Date;

/**
 * 일정 엔티티
 *
 * @author 우정연
 * created on 2022-04-26
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
    private long id;


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

    @Builder
    public Schedule(Date startDate, Date endDate, int round, Boolean isCancel, Study study) {
        this.startDate = startDate;
        this.endDate = endDate;
        this.round = round;
        this.isCancel = isCancel;
        this.study = study;
    }
}
