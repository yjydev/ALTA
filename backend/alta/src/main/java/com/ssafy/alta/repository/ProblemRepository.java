package com.ssafy.alta.repository;

import com.ssafy.alta.entity.Problem;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * packageName 	: com.ssafy.alta.repository
 * fileName 	: ProblemRepository
 * author 	    : 우정연
 * date		    : 2022-04-26
 * description	: 문제 레포지토리
 * ===========================================================
 * DATE 		AUTHOR 		      NOTE
 * -----------------------------------------------------------
 * 2022-04-26	    우정연  		    최초 생성
 */

public interface ProblemRepository extends JpaRepository<Problem, Long> {
}
