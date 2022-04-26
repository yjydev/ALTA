package com.ssafy.alta.repository;

import com.ssafy.alta.entity.Problem;
import com.ssafy.alta.entity.Schedule;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * packageName 	: com.ssafy.alta.repository
 * fileName 	: ScheduleRepository
 * author 	    : 우정연
 * date		    : 2022-04-26
 * description	: 일정 레포지토리
 * ===========================================================
 * DATE 		AUTHOR 		      NOTE
 * -----------------------------------------------------------
 * 2022-04-26	    우정연  		    최초 생성
 */

public interface ScheduleRepository extends JpaRepository<Schedule, Long> {
}
