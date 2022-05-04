package com.ssafy.alta.jwt;

import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.GenericFilterBean;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

/**
 * packageName 	: com.ssafy.alta.jwt
 * fileName 	: JwtFilter
 * author 	    : 오서하
 * date		    : 2022-04-28
 * description	: JwtFilter를 통해 front가 보낸 jwt가 유효한지를 필터링하는 클래스
 * ===========================================================
 * DATE 		AUTHOR 		      NOTE
 * -----------------------------------------------------------
 * 2022-04-28	    오서하  		    최초 생성
 */
@RequiredArgsConstructor
public class JwtFilter extends GenericFilterBean {

    private static final Logger logger = LoggerFactory.getLogger(JwtFilter.class);

    public static final String AUTHORIZATION_HEADER = "Authorization";
    public static final String AT_HEADER = "ACCESS_TOKEN";
    public static final String RT_HEADER = "REFRESH_TOKEN";

    private TokenProvider tokenProvider;

    public JwtFilter(TokenProvider tokenProvider) {
        this.tokenProvider = tokenProvider;
    }

    @Override
    //토큰의 인증정보를 securityContext에 저장하는 역할 수행
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain)
            throws IOException, ServletException {

        HttpServletRequest httpServletRequest = (HttpServletRequest) servletRequest;

        // resolveToken함수를 실행하여, request header에서 토큰을 꺼내온다.
        String at = resolveAccessToken(httpServletRequest);
        String rt = resolveRefreshToken(httpServletRequest);

        System.out.println("at = " + at);
        System.out.println("rt = " + rt);

        String requestURI = httpServletRequest.getRequestURI();


        if (StringUtils.hasText(at) && tokenProvider.validateToken(at)) { // JWT ACCESS TOKEN이 정상이면
            Authentication authentication = tokenProvider.getAuthentication(at); // 토큰안에 authentication 객체를 받는다.
            SecurityContextHolder.getContext().setAuthentication(authentication); // authentication 객체를 securitycontext에 set한다.
            logger.debug("Security Context에 '{}' 인증 정보를 저장했습니다, uri: {}", authentication.getName(), requestURI);
        } else {
            if(StringUtils.hasText(rt) && tokenProvider.validateToken(rt)){

            }
            tokenProvider.validateToken(at);
            logger.debug("Invalid JWT, uri: {}", requestURI);
        }


        filterChain.doFilter(servletRequest, servletResponse);
    }


    // request header에서 토큰 정보를 꺼내오기 위한 resolvToken 메소드 추가
    private String resolveAccessToken(HttpServletRequest request) {
        String bearerToken = request.getHeader(AT_HEADER);
        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }

    // request header에서 토큰 정보를 꺼내오기 위한 resolvToken 메소드 추가
    private String resolveRefreshToken(HttpServletRequest request) {
        String bearerToken = request.getHeader(RT_HEADER);
        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }

}
