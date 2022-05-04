package com.ssafy.alta.repository;

import com.ssafy.alta.entity.UserRedis;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

/**
 * packageName 	: com.ssafy.alta.repository
 * fileName 	: UserRedisRepository
 * author 	    : 오서하
 * date		    : 2022-05-04
 * description	: redis에 저장된 userRedis객체 정보를 가져오긴 rep
 * ===========================================================
 * DATE 		AUTHOR 		      NOTE
 * -----------------------------------------------------------
 * 2022-05-04	    오서하  		    최초 생성
 */
public interface UserRedisRepository extends CrudRepository<UserRedis, String> {

}
