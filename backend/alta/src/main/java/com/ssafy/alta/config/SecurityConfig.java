package com.ssafy.alta.config;

import com.ssafy.alta.config.oauth.Oauth2AuthenticationSuccessHandler;
import com.ssafy.alta.config.oauth.PrincipalOauth2UserService;
import com.ssafy.alta.jwt.JwtAuthenticationEntryPoint;
import com.ssafy.alta.jwt.JwtSecurityConfig;
import com.ssafy.alta.jwt.TokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;

@Configuration
@EnableWebSecurity // 스프링 시큐리티 필터가 스프링 필터체인에 등록된다.
@EnableGlobalMethodSecurity(securedEnabled = true, prePostEnabled = true) // secured 어노테이션 활성화, pr/posteAuthorize 어노테이션 활성
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private PrincipalOauth2UserService principalOauth2UserService;

    private final Oauth2AuthenticationSuccessHandler oauth2AuthenticationSuccessHandler;
    private final TokenProvider tokenProvider;
    private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;

    public SecurityConfig(Oauth2AuthenticationSuccessHandler oauth2AuthenticationSuccessHandler, TokenProvider tokenProvider, JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint) {
        this.oauth2AuthenticationSuccessHandler = oauth2AuthenticationSuccessHandler;
        this.tokenProvider = tokenProvider;
        this.jwtAuthenticationEntryPoint = jwtAuthenticationEntryPoint;
    }

    @Override
    public void configure(WebSecurity web) throws Exception {
        web
                .ignoring()
                // 스웨거를 사용하기 위해 security 설정을 하지 않는다. -> 무조건 접근 가능!
                .antMatchers(
                        "/v2/api-docs", "/swagger-resources/**", "/swagger-ui.html", "/webjars/**", "/swagger/**",   // swagger
                        "/favicon.ico"
                )
                .antMatchers("/githubLogin");
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {

        http.
                // token을 사용하는 방식이기 때문에 csrf를 disable합니다.
                csrf().disable()
                    .sessionManagement()
                    .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                    .formLogin().disable()
                    .httpBasic().disable()

//                    .exceptionHandling() //exception 핸들링할 때, 우리가 만든 두 클래스를 사용하겠서요.
//                    .authenticationEntryPoint(jwtAuthenticationEntryPoint)
//                .and()


                // 모든 요청은 인증이 되어야 하지만, 로그인관련하여 요청은 다 권한은 허락해주어야 한다.
                    .authorizeRequests()
                    .antMatchers("/api/user/gitLogin/**").permitAll()
                    .anyRequest().authenticated()



//                .antMatchers("/git/**").permitAll()
//                .antMatchers("/oauth2/authorization/github").permitAll()
//                .antMatchers("https://github.com/login/**").permitAll()
//                .antMatchers("/api/user/gitLogin").permitAll()
//                .antMatchers("/authorization").permitAll()
//                .antMatchers("/login/oauth2/code/github").permitAll()
//                .antMatchers("/oauth2/authorization/github").permitAll()
//                    .anyRequest().authenticated()


                // 1. 코드 받기(인증), 2.엑세스 토큰(권한) 3.사용자 프로필 정보를 가져옴
                .and()
                    .oauth2Login()
//                        .loginPage("/githubLogin")
//                    .authorizationEndpoint()
//                    .baseUri("/oauth2/authorization/github")
//                .and()
//                    .redirectionEndpoint()
//                    .baseUri("/login/oauth2/code/github")
//                .and()
                    .userInfoEndpoint()//구글 로그인이 완료된 뒤의 후처리가 필요함. Tip. 코드x , (엑세스토큰 + 사용자 정보 0)
                    .userService(principalOauth2UserService)

                // oauth 성공 후, jwt 토큰을 생성하기 위한 핸들러
                .and()
                    .successHandler(oauth2AuthenticationSuccessHandler)
                .and()
                    .apply(new JwtSecurityConfig(tokenProvider)); // jwtFilter를 addFilter로 등록했던 클래스 적용
    }
}
