package com.ssafy.alta.repository;

import com.ssafy.alta.entity.Problem;
import com.ssafy.alta.entity.Schedule;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ScheduleRepository extends JpaRepository<Schedule, Long> {
}
