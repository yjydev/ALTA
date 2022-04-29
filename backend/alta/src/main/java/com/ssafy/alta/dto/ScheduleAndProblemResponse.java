package com.ssafy.alta.dto;

import com.ssafy.alta.entity.Problem;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.Date;
import java.util.List;

/**
 * packageName 	: com.ssafy.alta.dto
 * fileName 	: ScheduleAndProblemResponse
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
public class ScheduleAndProblemResponse {
    private Long id;
    private Date startDate;
    private Date endDate;
    private int round;
    private List<ProblemResponse> problems;
}