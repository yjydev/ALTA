package com.ssafy.alta.service;

import com.ssafy.alta.entity.UserRedis;
import com.ssafy.alta.repository.UserRedisRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Service;

import java.util.Optional;

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
@AllArgsConstructor
public class RedisService {
    private final UserRedisRepository userRedisRepository;

    public String getAccessToken(String id){
        Optional<UserRedis> user = userRedisRepository.findById(id);
        return user.get().getGithub_access_token();
    }

    public String getJWTRefreshToken(String id){
        Optional<UserRedis> user = userRedisRepository.findById(id);
        return user.get().getJwt_refresh_token();
    }

    public void setJWTRefreshToken(String id, String jwt_ref){

        Optional<UserRedis> user = userRedisRepository.findById(id);
        user.get().setJwt_refresh_token(jwt_ref);
        userRedisRepository.save(user.get());
    }

    public void insertUser(String id, String github_acc){
        UserRedis userRedis = new UserRedis(id, github_acc);

        userRedisRepository.save(userRedis);
    }
}
