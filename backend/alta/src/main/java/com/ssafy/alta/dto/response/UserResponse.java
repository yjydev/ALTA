package com.ssafy.alta.dto.response;

import lombok.*;

import java.util.HashMap;

/**
 * packageName 	: com.ssafy.alta.dto
 * fileName 	: UserResponse
 * author 	    : 김유진
 * date		    : 2022-04-28
 * description	:
 * ===========================================================
 * DATE 		    AUTHOR 		        NOTE
 * -----------------------------------------------------------
 * 2022-04-28	        김유진  		        최초 생성
 */
@Getter
@Setter
@Builder
@AllArgsConstructor
@ToString
public class UserResponse {

    private HashMap<String, Object> userData;

    public UserResponse() {
        this.userData = null;
    }

}