package com.ssafy.alta.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

/**
 * packageName 	: com.ssafy.alta.dto
 * fileName 	: ProblemResponse
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
public class ProblemResponse {
    private Long id;
    private String name;
    private String link;
    private List<CodeResponse> codes;
}
