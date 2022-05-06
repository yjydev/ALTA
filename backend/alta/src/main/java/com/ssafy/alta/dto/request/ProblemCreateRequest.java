package com.ssafy.alta.dto.request;

import com.ssafy.alta.entity.Problem;
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
public class ProblemCreateRequest {
    private Long scheduleId;
    private List<Problem> problems;
}
