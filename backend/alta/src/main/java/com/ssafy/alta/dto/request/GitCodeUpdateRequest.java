package com.ssafy.alta.dto.request;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

/**
 * packageName 	: com.ssafy.alta.dto.request
 * fileName 	: GitCodeRequest
 * author 	    : 우정연
 * date		    : 2022-04-28
 * description	: github에 code 수정할 때 호출할 api
 * ===========================================================
 * DATE 		AUTHOR 		      NOTE
 * -----------------------------------------------------------
 * 2022-04-28	    우정연  		    최초 생성
 */
@Getter
@Builder
@ToString
public class GitCodeUpdateRequest {
    private String message;
    private String content;
    private String sha;
    private String branch = "master";
}
