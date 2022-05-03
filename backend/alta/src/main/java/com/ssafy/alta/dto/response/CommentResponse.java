package com.ssafy.alta.dto.response;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;

import java.util.Date;

/**
 * packageName 	: com.ssafy.alta.dto.response
 * fileName 	: CommentResponse
 * author 	    : 우정연
 * date		    : 2022-04-26
 * description	: 코드 댓글 응답 정보
 * ===========================================================
 * DATE 		AUTHOR 		      NOTE
 * -----------------------------------------------------------
 * 2022-04-26	    우정연  		    최초 생성
 */

@ApiModel(value = "댓글 정보")
@Getter
@Builder
public class CommentResponse {
    @ApiModelProperty(value = "댓글 작성자 키")
    private String review_id;

    @ApiModelProperty(value = "댓글 작성자 이름")
    private String reviewer_name;

    @ApiModelProperty(value = "댓글 내용")
    private String comment;

    @ApiModelProperty(value = "댓글 작성 일자")
    private Date comment_date;

    @ApiModelProperty(value = "코드 번호")
    private Integer code_number;

    @ApiModelProperty(value = "완료 여부")
    private Boolean completed;
}
