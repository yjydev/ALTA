package com.ssafy.alta.repository;

import com.ssafy.alta.entity.Problem;
import com.ssafy.alta.entity.Schedule;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * 일정 repository
 *
 * @author 우정연
 * created on 2022-04-26
 */


public interface ScheduleRepository extends JpaRepository<Schedule, Long> {
}
