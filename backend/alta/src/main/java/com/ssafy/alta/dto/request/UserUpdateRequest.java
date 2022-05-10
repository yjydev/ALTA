package com.ssafy.alta.dto.request;

import lombok.*;

/**
 * packageName 	: com.ssafy.alta.dto.request
 * fileName 	: UserUpdateRequest
 * author 	    : 김유진
 * date		    : 2022-05-05
 * description	:
 * ===========================================================
 * DATE 		    AUTHOR 		        NOTE
 * -----------------------------------------------------------
 * 2022-05-05	        김유진  		        최초 생성
 */
@Getter
@Setter
@Builder
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class UserUpdateRequest {

    private String nickname;
    private String email;
    private String introduction;
    private String[] languageList;
    private int emailAlert;
    private int siteAlert;

}