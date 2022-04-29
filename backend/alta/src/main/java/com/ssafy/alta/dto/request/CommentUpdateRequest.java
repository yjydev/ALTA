package com.ssafy.alta.dto.request;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

/**
 * packageName 	: com.ssafy.alta.dto.request
 * fileName 	: CommentUpdateRequest
 * author 	    : 우정연
 * date		    : 2022-04-29
 * description	:댓글 업데이트 요청 정보
 * ===========================================================
 * DATE 		AUTHOR 		      NOTE
 * -----------------------------------------------------------
 * 2022-04-29	    우정연  		    최초 생성
 */
@Getter
@Setter
@ToString
public class CommentUpdateRequest {
    private String content;
    private String line;
    private Boolean isSolved;

}
