package com.ssafy.alta.dto.request;

import com.ssafy.alta.entity.Schedule;
import com.ssafy.alta.entity.Study;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

/**
 * packageName 	: com.ssafy.alta.dto.request
 * fileName 	: ScheduleRequest
 * author 	    : jisoon Lee
 * date		    : 2022-04-29
 * description	:
 * ===========================================================
 * DATE             AUTHOR              NOTE
 * -----------------------------------------------------------
 * 2022-04-29       jisoon Lee         최초 생성
 */
@ApiModel(value = "회차 정보")
@Getter
@Setter
@ToString
public class ScheduleRequest {
    @ApiModelProperty(value = "시작일", required = true)
    private Date startDate;

    @ApiModelProperty(value = "종료일", required = true)
    private Date endDate;

    public Schedule toSchedule(Integer round, Boolean isCancel, Study study) {
        return Schedule.builder()
                .startDate(startDate)
                .endDate(endDate)
                .round(round)
                .isCancel(isCancel)
                .study(study)
                .build();
    }
}
