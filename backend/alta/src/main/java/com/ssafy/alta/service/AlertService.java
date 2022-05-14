package com.ssafy.alta.service;

import com.ssafy.alta.dto.response.AlertResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * packageName 	: com.ssafy.alta.service
 * fileName 	: AlertService
 * author 	    : 우정연
 * date		    : 2022-05-13
 * description	: 알림 관련 service
 * ===========================================================
 * DATE 		AUTHOR 		      NOTE
 * -----------------------------------------------------------
 * 2022-05-13	    우정연  		    최초 생성
 */
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class AlertService {

    public List<AlertResponse> selectAlertUnChecked() {
        return null;
    }

    @Transactional(rollbackFor = Exception.class)
    public void updateAlertListChecked() {
    }

    @Transactional(rollbackFor = Exception.class)
    public void updateAlertChecked() {
    }

    @Transactional(rollbackFor = Exception.class)
    public void insertAlert() {

    }
}
