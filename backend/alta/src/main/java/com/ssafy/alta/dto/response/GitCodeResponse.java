package com.ssafy.alta.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

/**
 * packageName 	: com.ssafy.alta.dto.response
 * fileName 	: GitCodeResponse
 * author 	    : 우정연
 * date		    : 2022-04-28
 * description	:
 * ===========================================================
 * DATE 		AUTHOR 		      NOTE
 * -----------------------------------------------------------
 * 2022-04-28	    우정연  		    최초 생성
 */

@Getter
@ToString
@Builder
public class GitCodeResponse {
    private String sha;
    private String content;
}
