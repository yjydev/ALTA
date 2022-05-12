package com.ssafy.alta.entity;

import com.ssafy.alta.dto.response.StudyJoinInfoMemberResponse;
import com.ssafy.alta.dto.response.StudyJoinInfoResponse;
import com.sun.istack.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.util.Date;

/**
 * packageName 	: com.ssafy.alta.entity
 * fileName 	: StudyJoinInfo
 * author 	    : jisoon Lee
 * date		    : 2022-04-26
 * description	:
 * ===========================================================
 * DATE             AUTHOR              NOTE
 * -----------------------------------------------------------
 * 2022-04-26       jisoon Lee         최초 생성
 */

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@DynamicInsert
@DynamicUpdate
@Table(name = "study_join_info")
public class StudyJoinInfo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "sji_id")
    private Long id;

    @JoinColumn(name = "fk_user_id")
    @ManyToOne(fetch = FetchType.LAZY)
    private User user;

    @JoinColumn(name = "fk_study_id")
    @ManyToOne(fetch = FetchType.LAZY)
    private Study study;

    @NotNull
    @Column(name = "sji_state")
    private String state;

    @NotNull
    @Column(name = "sji_position")
    private String position;

    @NotNull
    @Column(name = "sji_is_receivable")
    private Boolean isReceivable;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "sji_registration_date")
    private Date registrationDate;

    public StudyJoinInfoResponse toStudyJoinInfoResponse(String date) {
        return StudyJoinInfoResponse.builder()
                .id(id)
                .nickname(user.getNickname())
                .email(user.getEmail())
                .position(position)
                .state(state)
                .registrationDate(date)
                .build();
    }

    public StudyJoinInfoMemberResponse toStudyJoinInfoMemberResponse() {
        return StudyJoinInfoMemberResponse.builder()
                .nickname(user.getNickname())
                .position(position)
                .build();
    }
}
