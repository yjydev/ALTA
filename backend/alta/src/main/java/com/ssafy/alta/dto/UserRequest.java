package com.ssafy.alta.dto;


import lombok.*;
import com.ssafy.alta.entity.User;
import org.springframework.security.oauth2.client.registration.ClientRegistration;
import org.springframework.security.oauth2.core.OAuth2AccessToken;

/**
 * packageName 	: com.ssafy.alta.dto
 * fileName 	: UserRequest
 * author 	    : 오서하
 * date		    : 2022-04-26
 * description	:
 * ===========================================================
 * DATE 		AUTHOR 		      NOTE
 * -----------------------------------------------------------
 * 2022-04-26	    오서하  		    최초 생성
 */

@Getter
@Setter
@Builder
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class UserRequest {

    String id;
    String name;
    String nickname;
    String role;
    String access_token;
    int email_alert;
    int site_alert;

    public User toEntity(){
        User user = User.builder()
                .id(id)
                .name(name)
                .nickname(nickname)
                .role(role)
                .access_token(access_token)
                .emailAlert(email_alert)
                .siteAlert(site_alert)
                .build();
        return user;
    }
}
