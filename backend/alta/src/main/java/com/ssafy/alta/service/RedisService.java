package com.ssafy.alta.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Service;

/**
 * packageName 	: com.ssafy.alta.service
 * fileName 	: RedisService
 * author 	    : 오서하
 * date		    : 2022-05-01
 * description	: redis 캐시서버에 저장해둔 데이터 crud를 하기 위한 서비스
 * ===========================================================
 * DATE 		AUTHOR 		      NOTE
 * -----------------------------------------------------------
 * 2022-05-01	    오서하  		    최초 생성
 */

@Service
public class RedisService {

    @Autowired
    private StringRedisTemplate stringRedisTemplate;

    @Autowired
    private UserService userService;

    public String getAccessToken(){

        String key = userService.getCurrentUserId();

        ValueOperations<String, String> valueOperations = stringRedisTemplate.opsForValue();
        String accesstoken = valueOperations.get(key);
//        System.out.println("userid= " + key);
//        System.out.println("access_token = " + valueOperations.get(key));
        return accesstoken;
    }

    public void setAccessToken(String key, String value){
        ValueOperations<String, String> valueOperations = stringRedisTemplate.opsForValue();
        valueOperations.set(key, value);
    }
}
