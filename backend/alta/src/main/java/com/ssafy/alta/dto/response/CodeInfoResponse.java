package com.ssafy.alta.dto.response;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.List;

/**
 * packageName 	: com.ssafy.alta.dto.response
 * fileName 	: CodeAndCommentResponse
 * author 	    : 우정연
 * date		    : 2022-04-26
 * description	: 코드 응답 정보
 * ===========================================================
 * DATE 		AUTHOR 		      NOTE
 * -----------------------------------------------------------
 * 2022-04-26	    우정연  		    최초 생성
 * 2022-05-03       우정연           코드만 조회로 변경
 */

@ApiModel(value = "코드 요청 정보")
@Getter
@Setter
@Builder
public class CodeInfoResponse {
    @ApiModelProperty(value = "디코딩된 코드")
    private String code;
    
    @ApiModelProperty(value = "코드 업로드 날짜")
    private Date createDate;

    @ApiModelProperty(value = "파일 이름")
    private String fileName;
    
    @ApiModelProperty(value = "코드 사용 언어")
    private String language;

    @ApiModelProperty(value = "코드 작성자 닉네임")
    private String writer;
}
