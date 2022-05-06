package com.ssafy.alta.repository;

import com.ssafy.alta.entity.StudyJoinInfo;
import org.springframework.data.jpa.repository.JpaRepository;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;

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
    List<StudyJoinInfo> findByStudyStudyIdAndState(Long studyId, String state);
    Optional<StudyJoinInfo> findByStudyStudyIdAndUserId(Long studyId, String userId);
    List<StudyJoinInfo> findByUserId(String userId);
    Long countStudyJoinInfoByUserIdAndStudyStudyId(String userId, Long studyId);
}
