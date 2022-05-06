package com.ssafy.alta.jwt;

import org.springframework.security.config.annotation.SecurityConfigurerAdapter;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.DefaultSecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

/**
 * packageName 	: com.ssafy.alta.jwt
 * fileName 	: JwtSecurityConfig
 * author 	    : 오서하
 * date		    : 2022-04-28
 * description	: JwtFilter와 TokenProvider를 SecurityConfig에 설정하기 위한 클래스
 * ===========================================================
 * DATE 		AUTHOR 		      NOTE
 * -----------------------------------------------------------
 * 2022-04-28	    오서하  		    최초 생성
 */
public class JwtSecurityConfig extends SecurityConfigurerAdapter<DefaultSecurityFilterChain, HttpSecurity> {

    private TokenProvider tokenProvider;

    public JwtSecurityConfig(TokenProvider tokenProvider) {
        this.tokenProvider = tokenProvider;
    }

    @Override
    public void configure(HttpSecurity http) {
        JwtFilter customFilter = new JwtFilter(tokenProvider); // 생성한 filter를 security 로직에 포함한다.

        // customFilter를 UsernamePasswordAuthenticationFilter 전에 넣는다
        http.addFilterBefore(customFilter, UsernamePasswordAuthenticationFilter.class);
    }
}
