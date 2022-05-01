package com.ssafy.alta.dto.request;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

/**
 * packageName 	: com.ssafy.alta.dto.request
 * fileName 	: CommentUpdateSolvedRequest
 * author 	    : 우정연
 * date		    : 2022-05-02
 * description	: 코드 댓글 isSolved 요청 정보
 * ===========================================================
 * DATE 		AUTHOR 		      NOTE
 * -----------------------------------------------------------
 * 2022-05-02	    우정연  		    최초 생성
 */
@Getter
@Setter
@ToString
public class CommentUpdateSolvedRequest {
    private boolean isSolved;
}
