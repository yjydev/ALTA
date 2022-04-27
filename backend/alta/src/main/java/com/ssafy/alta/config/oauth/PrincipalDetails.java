package com.ssafy.alta.config.oauth;

// 시큐리티가 /login 주소 요청이 오면 낚아채서 로그인을 진행시킨다.
// 로그인을 진행이 완료가 되면 시큐리티 session을 만들어준다. (Securiry ContextHolder)에 시큐리티만의 세션을 만들어 저장
// 세션에 저장되는 객체는 저장되어있다. 오브젝트 =Authentication 타입객체
// Authenticaton 안에 user 정보가 있어야함.
// User 오브젝트 타입 -> UserDatauls 타입객체


//Security Session -> Authentication -> UserDetails

import lombok.Data;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.core.user.OAuth2User;

import java.util.Collection;
import java.util.Map;

@Data
public class PrincipalDetails implements OAuth2User {

    private Map<String, Object> attributes;

    //git oauth를 통해 로그인 한 유저의 정보
    public PrincipalDetails(Map<String, Object> attributes) {
        this.attributes = attributes;
    }

    @Override
    public Map<String, Object> getAttributes() {
        return attributes;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }

    @Override
    public String getName() {
        return attributes.get("id")+"";
    }
}
