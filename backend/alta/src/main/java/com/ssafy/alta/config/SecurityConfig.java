package com.ssafy.alta.config;

import com.ssafy.alta.config.oauth.PrincipalOauth2UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@Configuration
@EnableWebSecurity // 스프링 시큐리티 필터가 스프링 필터체인에 등록된다.
@EnableGlobalMethodSecurity(securedEnabled = true, prePostEnabled = true) // secured 어노테이션 활성화, pr/posteAuthorize 어노테이션 활성
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private PrincipalOauth2UserService principalOauth2UserService;

    @Override
    protected void configure(HttpSecurity http) throws Exception {

        http.csrf().disable();
        http.authorizeRequests()
                    .anyRequest().authenticated()
                .and()
                    .oauth2Login()
                        .userInfoEndpoint()//구글 로그인이 완료된 뒤의 후처리가 필요함. Tip. 코드x , (엑세스토큰 + 사용자 정보 0)
                            .userService(principalOauth2UserService);
        // 1. 코드 받기(인증), 2.엑세스 토큰(권한) 3.사용자 프로필 정보를 가져옴 4. 그 정보를 토대로 회원가입을 자동으로 진행시킴
        // 4-2 이메일, 전화번호, 이름, 이이디 추가 작성
    }
}
