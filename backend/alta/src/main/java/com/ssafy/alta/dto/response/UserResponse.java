package com.ssafy.alta.dto.response;

import lombok.*;

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
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class UserResponse {

    private String userId;
    private String userName;
    private String userNickname;
    private String userEmail;
    private int userEmailAlert;
    private int userSiteAlert;
    private String userIntroduction;
    private String userActivityTime;
    private int userLanguage;
    private String userImage;
    private String userRole;


}