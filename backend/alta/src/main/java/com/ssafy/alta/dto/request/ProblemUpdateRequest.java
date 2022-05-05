package com.ssafy.alta.dto.request;

import com.sun.istack.NotNull;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

import javax.persistence.Column;

/**
 * packageName 	: com.ssafy.alta.dto.request
 * fileName 	: ProblemUpdateRequest
 * author 	    : jisoon Lee
 * date		    : 2022-05-04
 * description	:
 * ===========================================================
 * DATE             AUTHOR              NOTE
 * -----------------------------------------------------------
 * 2022-05-04       jisoon Lee         최초 생성
 */
@Getter
@Builder
@ToString
public class ProblemUpdateRequest {
    private Long id;
    private String name;
    private String link;
}
