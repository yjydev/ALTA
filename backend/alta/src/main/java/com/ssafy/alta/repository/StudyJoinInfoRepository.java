package com.ssafy.alta.repository;

import com.ssafy.alta.entity.Study;
import com.ssafy.alta.entity.StudyJoinInfo;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

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
    List<StudyJoinInfo> findByStudyStudyIdAndStateContains(Long studyId, String position);
    Optional<StudyJoinInfo> findByStudyStudyIdAndUserId(Long studyId, String userId);
    List<StudyJoinInfo> findByUserId(String userId);
    Long countStudyJoinInfoByUserIdAndStudyStudyId(String userId, Long studyId);

    @Modifying
    @Query("update StudyJoinInfo s set  s.state = :state, s.isReceivable = 1, s.registrationDate = now() where s.id = :id and s.study = :study")
    void updateSJIState(@Param("id") Long id, @Param("study") Study study, @Param("state") String state);
}
