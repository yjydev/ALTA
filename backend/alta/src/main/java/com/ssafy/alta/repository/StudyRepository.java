package com.ssafy.alta.repository;

import com.ssafy.alta.entity.Study;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

/**
 * packageName 	: com.ssafy.alta.repository
 * fileName 	: StudyRepository
 * author 	    : jisoon Lee
 * date		    : 2022-04-26
 * description	:
 * ===========================================================
 * DATE             AUTHOR              NOTE
 * -----------------------------------------------------------
 * 2022-04-26       jisoon Lee         최초 생성
 */

public interface StudyRepository extends JpaRepository<Study, Long> {
    Optional<Study> findByStudyIdAndUserId(Long studyId, String userId);
    Optional<Study> findByCode(String code);
}