package com.ssafy.alta.dto.response;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

/**
 * packageName 	: com.ssafy.alta.dto.response
 * fileName 	: CodeAndCommentResponse
 * author 	    : 우정연
 * date		    : 2022-04-26
 * description	: 코드와 코드 댓글 응답 정보
 * ===========================================================
 * DATE 		AUTHOR 		      NOTE
 * -----------------------------------------------------------
 * 2022-04-26	    우정연  		    최초 생성
 */

@ApiModel(value = "코드 추가 요청 정보")
@Getter
@Setter
@Builder
public class CodeAndCommentResponse {
    @ApiModelProperty(value = "디코딩된 코드")
    private String code;
    
    @ApiModelProperty(value = "댓글 목록 정보")
    private List<CommentResponse> reviews;
    
    @ApiModelProperty(value = "코드 사용 언어")
    private String language;
}
