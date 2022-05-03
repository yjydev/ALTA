package com.ssafy.alta.dto.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
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
@ApiModel(value = "댓글 상태 변경 요청 정보")
@Getter
@Setter
@ToString
public class CommentUpdateSolvedRequest {
    @ApiModelProperty(value = "해결 여부", required = true)
    private boolean is_solved;
}
