package com.ssafy.alta.dto.request;

import com.ssafy.alta.entity.Study;
import com.ssafy.alta.entity.StudyJoinInfo;
import com.ssafy.alta.entity.User;
import lombok.*;

import java.time.LocalDateTime;
import java.util.Date;

/**
 * packageName 	: com.ssafy.alta.dto
 * fileName 	: StudyJoinInfoRequest
 * author 	    : jisoon Lee
 * date		    : 2022-04-27
 * description	:
 * ===========================================================
 * DATE             AUTHOR              NOTE
 * -----------------------------------------------------------
 * 2022-04-27       jisoon Lee         최초 생성
 */

@Getter
@Setter
@Builder
@AllArgsConstructor
@ToString
public class StudyJoinInfoRequest {
    private User user;
    private Study study;
    private String state;
    private String position;
    private Boolean isReceivable;
    private Date registrationDate;

    public StudyJoinInfo toEntity() {
        return StudyJoinInfo.builder()
                .user(user)
                .study(study)
                .state(state)
                .position(position)
                .isReceivable(isReceivable)
                .registrationDate(registrationDate)
                .build();
    }
}
