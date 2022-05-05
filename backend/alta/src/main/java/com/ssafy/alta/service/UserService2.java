package com.ssafy.alta.service;

import com.ssafy.alta.dto.response.UserSearchResponse;
import com.ssafy.alta.exception.DataNotFoundException;
import com.ssafy.alta.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

/**
 * packageName 	: com.ssafy.alta.service
 * fileName 	: UserService2
 * author 	    : jisoon Lee
 * date		    : 2022-05-06
 * description	:
 * ===========================================================
 * DATE             AUTHOR              NOTE
 * -----------------------------------------------------------
 * 2022-05-06       jisoon Lee         최초 생성
 */
@Service
@RequiredArgsConstructor
public class UserService2 {
    private final UserRepository userRepository;

    public List<UserSearchResponse> selectUserName(String word) {
        List<UserSearchResponse> userInfo = userRepository.findByNickNameOrderByNickName(word);

        if(userInfo.size() == 0)
            throw new DataNotFoundException();

        return userInfo;
    }
}
