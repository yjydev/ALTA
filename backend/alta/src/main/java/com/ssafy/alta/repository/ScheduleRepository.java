package com.ssafy.alta.repository;

import com.ssafy.alta.entity.Schedule;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

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
    Optional<Schedule> findTop1ByStudyStudyIdOrderByRoundDesc(Long studyId);
    List<Schedule> findByStudyStudyIdOrderByRound(Long studyId);
    Optional<Schedule> findByStudyStudyIdAndId(Long studyId, Long scheduleId);
    List<Schedule> findByStudyStudyIdOrderByStartDateAsc(Long studyId);
}
