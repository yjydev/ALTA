package com.ssafy.alta.dto.request;

import lombok.Getter;
import lombok.ToString;

/**
 * packageName 	: com.ssafy.alta.dto.request
 * fileName 	: UserAlertRequest
 * author 	    : 김유진
 * date		    : 2022-05-17
 * description	:
 * ===========================================================
 * DATE 		    AUTHOR 		        NOTE
 * -----------------------------------------------------------
 * 2022-05-17	        김유진  		        최초 생성
 */
@Getter
@ToString
public class UserAlertRequest {
    private String alertSetting;
}