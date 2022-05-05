package com.ssafy.alta.config.oauth;

import com.ssafy.alta.jwt.TokenProvider;
import com.ssafy.alta.service.RedisService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
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
public class Oauth2AuthenticationSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final TokenProvider tokenProvider;

    private final String address;

    @Autowired
    private RedisService redisService;

    //로컬로 테스트하는 경우 다음 addr로 반환하세요.
    private final String addr = "http://localhost:3000/auth";

    public Oauth2AuthenticationSuccessHandler(TokenProvider tokenProvider, @Value("${jwt.url}") String address) {
        this.tokenProvider = tokenProvider;
        this.address = address;
    }

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {

        String jwtAt = tokenProvider.createAccessToken(authentication);
        String jwtRt = tokenProvider.createRefreshToken(authentication);
        System.out.println("jwtAt = " + jwtAt);
        System.out.println("jwtRt = " + jwtRt);

        redisService.setJWTRefreshToken(authentication.getName(), jwtRt);
        getRedirectStrategy().sendRedirect(request, response, addr+"?jwtAT="+jwtAt+"&jwtRT="+jwtRt);
    }
}
