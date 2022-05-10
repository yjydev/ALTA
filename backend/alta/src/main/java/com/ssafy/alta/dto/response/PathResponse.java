package com.ssafy.alta.dto.response;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.LinkedList;
import java.util.List;

/**
 * packageName 	: com.ssafy.alta.dto.response
 * fileName 	: PathResponse
 * author 	    : 우정연
 * date		    : 2022-05-10
 * description	: 트리의 경로 정보
 * ===========================================================
 * DATE 		AUTHOR 		      NOTE
 * -----------------------------------------------------------
 * 2022-05-10	    우정연  		    최초 생성
 */

@ApiModel(value = "경로 정보")
@Getter
@Setter
@Builder
@ToString
public class PathResponse {
    @ApiModelProperty(value = "키")
    Long id;

    @ApiModelProperty(value = "코드 키")
    Long codeId;

    @ApiModelProperty(value = "경로 리스트")
    private List<String> path;
}
