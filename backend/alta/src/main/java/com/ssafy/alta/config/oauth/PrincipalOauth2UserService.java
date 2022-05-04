package com.ssafy.alta.config.oauth;

import com.ssafy.alta.dto.request.UserRequest;
import com.ssafy.alta.entity.User;
import com.ssafy.alta.gitutil.GitEmailAPI;
import com.ssafy.alta.repository.UserRepository;
import com.ssafy.alta.service.RedisService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class PrincipalOauth2UserService extends DefaultOAuth2UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RedisService redisService;

    private GitEmailAPI gitEmailAPI;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
//        System.out.println("getClientRegistration :" + userRequest.getClientRegistration());
//        System.out.println("getAccessToken :" + userRequest.getAccessToken().getTokenValue());

        gitEmailAPI = new GitEmailAPI();
        OAuth2User oAuth2User = super.loadUser(userRequest);
        //구글 로그인 버튼 클릭 -> 구글로그인창 -> 로그인완료 -> code를 리턴하나 oauth-client가 받음 -> 엑세스 토큰 요청
        //userRequest 정보 -> loaduser 함수 호출 -> 구글로 부터 회원프로필 획득
//        System.out.println("getAttributes : " + oAuth2User.getAttributes());

        // 강제로 회원가입을 진행해볼 예정
        String name = oAuth2User.getAttribute("login");
        String nickname = name;
        String id =  oAuth2User.getAttribute("id") +"";
        String role = "ROLE_USER";
        String email = gitEmailAPI.selectGithubEmail(userRequest.getAccessToken().getTokenValue());

        Optional<User> user = userRepository.findById(id);
        UserRequest userRequest1 = new UserRequest(id, name, nickname, role, email ,3 , 3);
        User newUser = userRequest1.toEntity();

        // git 계정 정보가 바뀌었다면, 우리 사이트의 유저 정보도 업데이트 되도록 수정이 필요함!
        // git name이 변경된 경우는 변경된 name을 가져와서 업데이트 해야하지만, 기존에 저장된 nickname은 변경되선 안됨
        if (!user.isPresent()){
            userRepository.save(newUser);
        }

        redisService.insertUser(id, userRequest.getAccessToken().getTokenValue());
        return new PrincipalDetails(oAuth2User.getAttributes());
    }


}
