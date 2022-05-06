package com.ssafy.alta.jwt;

import com.ssafy.alta.exception.ErrorCode;
import com.ssafy.alta.exception.JwtExpiredExaception;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.UnsupportedJwtException;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.GenericFilterBean;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * packageName 	: com.ssafy.alta.jwt
 * fileName 	: JwtFilter
 * author 	    : 오서하
 * date		    : 2022-04-28
 * description	: JwtFilter를 통해 front가 보낸 jwt가 유효한지를 필터링하는 클래스
 *
 * extends OncePerRequestFilter를 적용하여 한 번의 요청 당 한번만 실행을 보장한다.
 * ===========================================================
 * DATE 		AUTHOR 		      NOTE
 * -----------------------------------------------------------
 * 2022-04-28	    오서하  		    최초 생성
 */
@RequiredArgsConstructor
public class JwtFilter extends OncePerRequestFilter {

    private static final Logger logger = LoggerFactory.getLogger(JwtFilter.class);

    public static final String AUTHORIZATION_HEADER = "Authorization";
    public static final String AT_HEADER = "ACCESS_TOKEN";
    public static final String RT_HEADER = "REFRESH_TOKEN";

    private TokenProvider tokenProvider;

    public JwtFilter(TokenProvider tokenProvider) {
        this.tokenProvider = tokenProvider;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        // resolveToken함수를 실행하여, request header에서 토큰을 꺼내온다.
        String at = resolveAccessToken(request);
        String rt = resolveRefreshToken(request);

        System.out.println("at = " + at);
        System.out.println("rt = " + rt);

        // 일반 요청에 대한 건 => 일반 요청에는 rt는 들어오지 않는다.
        if(at != null && rt == null){
            if (StringUtils.hasText(at) && tokenProvider.validateToken(at)) { // JWT ACCESS TOKEN이 정상이면
                Authentication authentication = tokenProvider.getAuthentication(at); // 토큰안에 authentication 객체를 받는다.
                SecurityContextHolder.getContext().setAuthentication(authentication); // authentication 객체를 securitycontext에 set한다.
                logger.debug("Security Context에 '{}' 인증 정보를 저장했습니다, uri: {}", authentication.getName(), request.getRequestURI());
            } else {
                logger.debug("Invalid JWT, uri: {}", request.getRequestURI());
            }
        }
        // af가 만료되었을 때
        else if(at != null && rt != null){
            if (StringUtils.hasText(rt) && tokenProvider.validateToken(rt)) { // JWT ACCESS TOKEN이 정상이면
                Authentication authentication = tokenProvider.getAuthentication(rt); // 토큰안에 authentication 객체를 받는다.
                SecurityContextHolder.getContext().setAuthentication(authentication); // authentication 객체를 securitycontext에 set한다.
                logger.debug("Security Context에 '{}' 인증 정보를 저장했습니다, uri: {}", authentication.getName(), request.getRequestURI());
            } else {
                response.setStatus(HttpStatus.UNAUTHORIZED.value());
                System.out.println("enter");
                logger.debug("Invalid JWT, uri: {}", request.getRequestURI());
            }

//            try {
//                tokenProvider.validateToken(rt);
//                Authentication authentication = tokenProvider.getAuthentication(rt);
//                SecurityContextHolder.getContext().setAuthentication(authentication);
//            }
//            catch (JwtExpiredExaception e){
//
//            }
        }

        filterChain.doFilter(request, response);
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
