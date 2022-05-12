package com.ssafy.alta.repository;

import com.ssafy.alta.entity.Study;
import com.ssafy.alta.entity.StudyJoinInfo;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.security.core.parameters.P;

import javax.swing.text.html.Option;
import java.util.Date;
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
    @Query("select s from StudyJoinInfo s where s.study = :study order by s.registrationDate nulls last")
    List<StudyJoinInfo> findByStudyStudyIdOrderByRegistrationDate(@Param("study") Study study);
    @Query("select s from StudyJoinInfo s where s.study = :study and s.state = :state order by s.registrationDate nulls last")
    List<StudyJoinInfo> findByStudyStudyIdAndStateOrderByRegistrationDate(@Param("study") Study study, @Param("state") String state);
    Optional<StudyJoinInfo> findByStudyStudyIdAndUserId(Long studyId, String userId);
    List<StudyJoinInfo> findByUserId(String userId);
    Long countStudyJoinInfoByStateAndStudyStudyId(String state, Long studyId);
    List<StudyJoinInfo> findByStudyStudyIdOrderByUserId(Long studyId);

    @Query("select s from StudyJoinInfo s where s.study.studyId = :studyId and s.state = :state")
    List<StudyJoinInfo> findByStudyStudyIdWhereState(@Param("studyId") Long studyId, @Param("state") String state);
    @Modifying
    @Query("update StudyJoinInfo s set  s.state = :state, s.isReceivable = 1, s.registrationDate = :date where s.id = :id and s.study = :study")
    void updateSJIState(@Param("id") Long id, @Param("study") Study study, @Param("state") String state, @Param("date") Date date);

    @Query("select count(*) from StudyJoinInfo s where s.state = :state and s.study = :study")
    int findByJoinUser(@Param("study") Study study, @Param("state") String state);

    List<StudyJoinInfo> findByStudyStudyIdAndStateOrderByUserId(Long studyId, String state);
}
