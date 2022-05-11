package com.ssafy.alta.dto.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
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
@ApiModel(value = "댓글 업데이트 요정 정보")
@Getter
@Setter
@ToString
public class CommentUpdateRequest {
    @ApiModelProperty(value = "댓글 내용")
    private String content;
    @ApiModelProperty(value = "코드 줄")
    private Integer line;

}
