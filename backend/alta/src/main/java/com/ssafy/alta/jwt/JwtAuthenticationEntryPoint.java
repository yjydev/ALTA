package com.ssafy.alta.jwt;

import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * packageName 	: com.ssafy.alta.jwt
 * fileName 	: JwtAuthenticationEntryPoint
 * author 	    : 오서하
 * date		    : 2022-04-28
 * description	: 유효한 자격증명을 제공하지 않고, 접근하려 할때 401 Unauthorizaed에러를 리턴할 클래스
 * ===========================================================
 * DATE 		AUTHOR 		      NOTE
 * -----------------------------------------------------------
 * 2022-04-28	    오서하  		    최초 생성
 */
@Component
public class JwtAuthenticationEntryPoint implements AuthenticationEntryPoint {

    @Override
    public void commence(HttpServletRequest request,
                         HttpServletResponse response,
                         AuthenticationException authException) throws IOException {
        // 유효한 자격증명을 제공하지 않고 접근하려 할때 401
        response.sendError(HttpServletResponse.SC_UNAUTHORIZED);
    }
}