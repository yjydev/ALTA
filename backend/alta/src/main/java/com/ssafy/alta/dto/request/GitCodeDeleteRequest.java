package com.ssafy.alta.dto.request;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

/**
 * packageName 	: com.ssafy.alta.dto.request
 * fileName 	: GitCodeRequest
 * author 	    : 우정연
 * date		    : 2022-05-02
 * description	: git code 삭제 요청 정보
 * ===========================================================
 * DATE 		AUTHOR 		      NOTE
 * -----------------------------------------------------------
 * 2022-04-28	    우정연  		    최초 생성
 */
@Getter
@Builder
@ToString
public class GitCodeDeleteRequest {
    private String message;
    private String sha;
    private String branch;
}
