package com.ssafy.alta.config.oauth;

import com.ssafy.alta.dto.request.UserRequest;
import com.ssafy.alta.entity.User;
import com.ssafy.alta.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

@Service
public class PrincipalOauth2UserService extends DefaultOAuth2UserService {

    @Autowired
    private UserRepository userRepository;


    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        System.out.println("getClientRegistration :" + userRequest.getClientRegistration());
        System.out.println("getAccessToken :" + userRequest.getAccessToken().getTokenValue());

        OAuth2User oAuth2User = super.loadUser(userRequest);
        //구글 로그인 버튼 클릭 -> 구글로그인창 -> 로그인완료 -> code를 리턴하나 oauth-client가 받음 -> 엑세스 토큰 요청
        //userRequest 정보 -> loaduser 함수 호출 -> 구글로 부터 회원프로필 획득
        System.out.println("getAttributes : " + oAuth2User.getAttributes());

        // 강제로 회원가입을 진행해볼 예정
        String name = oAuth2User.getAttribute("login");
        String nickname = name;
        String id =  oAuth2User.getAttribute("id") +"";
        String role = "ROLE_USER";

        User user = userRepository.findByName(name);
        UserRequest userRequest1 = new UserRequest(id, name, nickname, role, userRequest.getAccessToken().getTokenValue(),3 , 3);
        User newUser = userRequest1.toEntity();

        userRepository.save(newUser);
//        if (user == null){
//            System.out.println("fist login .");
//            userRepository.save(newUser);
//        }else {
//            System.out.println("already! access_token change ");
//            userRepository.save(newUser);
//        }
        return new PrincipalDetails(oAuth2User.getAttributes());
    }


}
