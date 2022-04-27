package com.ssafy.alta.repository;

import com.ssafy.alta.entity.StudyJoinInfo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * packageName 	: com.ssafy.alta.repository
 * fileName 	: StudyJoinInfoRepository
 * author 	    : jisoon Lee
 * date		    : 2022-04-26
 * description	:
 * ===========================================================
 * DATE             AUTHOR              NOTE
 * -----------------------------------------------------------
 * 2022-04-26       jisoon Lee         최초 생성
 */

public interface StudyJoinInfoRepository extends JpaRepository<StudyJoinInfo, Long> {
    List<StudyJoinInfo> findByStudyStudyId(Long studyId);
    List<StudyJoinInfo> findByStudyStudyIdAndStateContains(Long studyId, String position);
}
