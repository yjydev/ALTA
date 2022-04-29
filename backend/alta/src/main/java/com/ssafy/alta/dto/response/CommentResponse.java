package com.ssafy.alta.dto.response;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;

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
    private Long reviewrId;
    
    @ApiModelProperty(value = "코드 키")
    private Long codeId;

    @ApiModelProperty(value = "댓글 작성자 이름")
    private String reviewerName;

    @ApiModelProperty(value = "댓글 내용")
    private String comment;

    @ApiModelProperty(value = "코드 번호")
    private Integer codeNumber;

    @ApiModelProperty(value = "완료 여부")
    private Boolean completed;
}
