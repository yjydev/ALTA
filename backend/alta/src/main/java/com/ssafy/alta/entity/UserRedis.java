package com.ssafy.alta.entity;

import lombok.*;
import org.springframework.data.redis.core.RedisHash;

import javax.persistence.Entity;
import javax.persistence.Id;

/**
 * packageName 	: com.ssafy.alta.entity
 * fileName 	: UserRedis
 * author 	    : 오서하
 * date		    : 2022-05-04
 * description	: redis에 저장할 유저 객체 클래스 (github의 accesstoken, jwt refreshtoken)
 * ===========================================================
 * DATE 		AUTHOR 		      NOTE
 * -----------------------------------------------------------
 * 2022-05-04	    오서하  		    최초 생성
 */

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@RedisHash("user")
@ToString
public class UserRedis {

    @Id
    private String id;

    private String github_access_token;

    private String jwt_refresh_token;

    public UserRedis(String id, String github_access_token) {
        this.id = id;
        this.github_access_token = github_access_token;
    }
}
