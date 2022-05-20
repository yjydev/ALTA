package com.ssafy.alta.repository;

import com.ssafy.alta.entity.Schedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Date;
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
    List<Schedule> findByStudyStudyIdOrderByStartDateAsc(Long studyId);

    List<Schedule> findByStudyStudyIdOrderByStartDateDesc(Long studyId);

    @Query("select s from Schedule s where s.study.studyId = :studyId and s.startDate > :nowDate and s.id != :scheduleId order by s.startDate")
    List<Schedule> findByStudyStudyIExceptOneOrderByStartDate(@Param("studyId") Long studyId, @Param("nowDate") Date nowDate, @Param("scheduleId") Long scheduleId);

    @Query("select s from Schedule s where s.study.studyId = :studyId and s.startDate > :nowDate order by s.startDate")
    List<Schedule> findByStudyStudyIdOrderByStartDate(@Param("studyId") Long studyId, @Param("nowDate") Date nowDate);

    @Query("select s from Schedule s where s.study.studyId = :studyId and s.startDate = :startDate")
    Optional<Schedule> findByStudyStudyIdSameStartDate(@Param("studyId") Long studyId, @Param("startDate") Date startDate);

    @Query("select s from Schedule s where s.endDate = :endDate")
    List<Schedule> findBySameEndDate( @Param("endDate") Date endDate);

    Optional<Schedule> findByStudyStudyIdAndId(Long studyId, Long scheduleId);

    Optional<Schedule> findTop1ByStudyStudyIdOrderByStartDateDesc(Long studyId);
}
