package com.ssafy.alta.dto.request;

import com.ssafy.alta.entity.Problem;
import com.ssafy.alta.entity.Schedule;
import com.ssafy.alta.entity.Study;
import com.sun.istack.NotNull;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

/**
 * packageName 	: com.ssafy.alta.dto
 * fileName 	: ScheduleAndProblemRequest
 * author 	    : jisoon Lee
 * date		    : 2022-04-28
 * description	:
 * ===========================================================
 * DATE             AUTHOR              NOTE
 * -----------------------------------------------------------
 * 2022-04-28       jisoon Lee         최초 생성
 */

@Getter
@Setter
@Builder
@ToString
public class ScheduleAndProblemRequest {
    private Date startDate;
    private Date endDate;
    private int round;
    private Boolean isCancel;
    private Study study;
    private List<Problem> problems;

    public Schedule toEntity() {
        return Schedule.builder()
                .startDate(startDate)
                .endDate(endDate)
                .round(round)
                .isCancel(isCancel)
                .study(study)
                .build();
    }
}
