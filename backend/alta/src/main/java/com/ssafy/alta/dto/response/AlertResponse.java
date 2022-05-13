package com.ssafy.alta.dto.response;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

import java.util.Date;

/**
 * packageName 	: com.ssafy.alta.dto.response
 * fileName 	: AlertResponse
 * author 	    : 우정연
 * date		    : 2022-05-13
 * description	: 알림 응답 정보
 * ===========================================================
 * DATE 		AUTHOR 		      NOTE
 * -----------------------------------------------------------
 * 2022-05-13	    우정연  		    최초 생성
 */

@ApiModel(value = "알림 응답 정보")
@Getter
@ToString
@Builder
public class AlertResponse {
    @ApiModelProperty(value = "알림 키")
    private Long alertId;

    @ApiModelProperty(value = "보내는 사람 유저 닉네임")
    private String senderNickName;

    @ApiModelProperty(value = "알림 타입")
    private String type;

    @ApiModelProperty(value = "알림 내용")
    private String content;

    @ApiModelProperty(value = "시간")
    private Date time;

    @ApiModelProperty(value = "알림 url")
    private String redirectUrl;

}
