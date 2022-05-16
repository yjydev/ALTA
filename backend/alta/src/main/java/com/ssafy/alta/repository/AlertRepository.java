package com.ssafy.alta.repository;

import com.ssafy.alta.entity.Alert;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;

/**
 * packageName 	: com.ssafy.alta.repository
 * fileName 	: AlertRepository
 * author 	    : 김유진
 * date		    : 2022-05-03
 * description	:
 * ===========================================================
 * DATE 		    AUTHOR 		        NOTE
 * -----------------------------------------------------------
 * 2022-05-03	        김유진  		        최초 생성
 */
public interface AlertRepository extends JpaRepository<Alert, Long> {
    List<Alert> findByReceiver_IdOrderByIdAsc(String userId);

    // 아직 읽음처리 안된 애들 다 읽음으로 변경
    @Modifying
    @Query("update Alert a set a.isChecked=true where a.receiver.id = :userId and a.isChecked=false")
    void updateAlertStatusChecked(@Param("userId") String userId);

    @Modifying
    @Query("delete from Alert a where a.transTime <= :date")
    void deleteAlertByPreviousDate(@Param("date") Date date);
}
