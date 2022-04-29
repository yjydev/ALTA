package com.ssafy.alta.dto.request;

import com.ssafy.alta.entity.Problem;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

/**
 * packageName 	: com.ssafy.alta.dto.request
 * fileName 	: ProblemRequest
 * author 	    : jisoon Lee
 * date		    : 2022-04-29
 * description	:
 * ===========================================================
 * DATE             AUTHOR              NOTE
 * -----------------------------------------------------------
 * 2022-04-29       jisoon Lee         최초 생성
 */

@Getter
@Setter
@ToString
public class ProblemRequest {
    @ApiModelProperty(value = "회차 키", required = true)
    private Long scheduleId;
    private List<Problem> problems;
}
