package com.ssafy.alta.dto.response;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.LinkedList;

/**
 * packageName 	: com.ssafy.alta.dto.request
 * fileName 	: StudyTreeResponse
 * author 	    : 우정연
 * date		    : 2022-05-10
 * description	: 스터디의 트리 구조 응답 정보
 * ===========================================================
 * DATE 		AUTHOR 		      NOTE
 * -----------------------------------------------------------
 * 2022-05-10	    우정연  		    최초 생성
 */

@ApiModel(value = "트리 정보")
@Getter
@Setter
@Builder
@ToString
public class TreeResponse {
    @ApiModelProperty(value = "경로 정보 리스트")
    LinkedList<TreeResponse> list;
}
