package com.ssafy.alta.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

/**
 * packageName 	: com.ssafy.alta.dto
 * fileName 	: CodeResponse1
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
public class CodeResponse1 {
    private long id;
    private String nickname;
    private String path;
}
