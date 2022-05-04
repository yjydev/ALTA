package com.ssafy.alta.repository;

import com.ssafy.alta.entity.Alert;
import org.springframework.data.jpa.repository.JpaRepository;

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
    public List<Alert> findByReceiver_IdOrderByIdAsc(String userId);
}
