package com.ssafy.alta.repository;

import com.ssafy.alta.entity.ActivityScore;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * packageName 	: com.ssafy.alta.repository
 * fileName 	: ActivityScoreRepository
 * author 	    : 오서하
 * date		    : 2022-05-10
 * description	:
 * ===========================================================
 * DATE 		AUTHOR 		      NOTE
 * -----------------------------------------------------------
 * 2022-05-10	    오서하  		    최초 생성
 */
public interface ActivityScoreRepository extends JpaRepository<ActivityScore, Long> {

}
