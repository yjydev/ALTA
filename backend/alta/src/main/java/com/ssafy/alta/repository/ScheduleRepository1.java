package com.ssafy.alta.repository;

import com.ssafy.alta.entity.Schedule1;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * packageName 	: com.ssafy.alta.repository
 * fileName 	: ScheduleRepository1
 * author 	    : jisoon Lee
 * date		    : 2022-04-28
 * description	:
 * ===========================================================
 * DATE             AUTHOR              NOTE
 * -----------------------------------------------------------
 * 2022-04-28       jisoon Lee         최초 생성
 */
public interface ScheduleRepository1 extends JpaRepository<Schedule1, Long> {
    List<Schedule1> findByStudyStudyId(Long study_id);
}
