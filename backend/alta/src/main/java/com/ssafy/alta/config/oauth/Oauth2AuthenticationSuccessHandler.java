package com.ssafy.alta.config.oauth;

import com.ssafy.alta.jwt.TokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;


import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * packageName 	: com.ssafy.alta.config.oauth
 * fileName 	: Oauth2AuthenticationSuccessHandler
 * author 	    : 오서하
 * date		    : 2022-04-28
 * description	: oauth로그인 성공 후, redicet를 통해 Usercontroller로 이동 (해당 컨트롤러를 통해 jwt 발급)
 * ===========================================================
 * DATE 		AUTHOR 		      NOTE
 * -----------------------------------------------------------
 * 2022-04-28	    오서하  		    최초 생성
 */

@Component
//@RequiredArgsConstructor
public class Oauth2AuthenticationSuccessHandler implements AuthenticationSuccessHandler {

    private final TokenProvider tokenProvider;

    public Oauth2AuthenticationSuccessHandler(TokenProvider tokenProvider) {
        this.tokenProvider = tokenProvider;
    }

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {

        String jwt = tokenProvider.createToken(authentication);
        System.out.println("JWT = " + jwt);
        response.sendRedirect("/api/user/gitLogin/d?jwt="+jwt);
    }
}
