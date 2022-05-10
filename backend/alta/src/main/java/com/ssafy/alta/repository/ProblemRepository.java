package com.ssafy.alta.repository;

import com.ssafy.alta.entity.Problem;
import com.ssafy.alta.entity.Schedule;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

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
    @Modifying
    @Query("update Problem p set p.name=:name, p.link=:link where p.id=:id and p.isCancel=false")
    void updateProblemById(@Param("id")Long id, @Param("name")String name, @Param("link")String link);

    @Query("SELECT p From Problem p WHERE p.name like :name AND p.schedule = :schedule AND p.id != :id")
    Problem findByDuplicateProblem(@Param("schedule") Schedule schedule, @Param("name") String name, @Param("id") Long id);

    @Query("SELECT p From Problem p WHERE p.name like :name AND p.schedule = :schedule")
    Problem findByDuplicateProblemInSchedule(@Param("schedule") Schedule schedule, @Param("name") String name);

    List<Problem> findByScheduleIdOrderById(Long scheduleId);
}
