package com.ssafy.alta.service;

import com.ssafy.alta.dto.response.AlertResponse;
import com.ssafy.alta.entity.*;
import com.ssafy.alta.exception.DataNotFoundException;
import com.ssafy.alta.repository.AlertRepository;
import com.ssafy.alta.util.FileLanguageUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.SimpleDateFormat;
import java.util.*;

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
    private final UserService userService;
    private final AlertRepository alertRepository;

    public List<AlertResponse> selectAlertUnChecked() {
        String userId = userService.getCurrentUserId();
        List<Alert> alertList = alertRepository.findByReceiver_IdOrderByIdDesc(userId);
        List<AlertResponse> alertResponseList = new LinkedList<>();

        for(Alert alert : alertList) {
            alertResponseList.add(alert.toDto());
        }

        return alertResponseList;
    }

    @Transactional(rollbackFor = Exception.class)
    public void updateAlertListChecked() {
        String userId = userService.getCurrentUserId();
        alertRepository.updateAlertStatusChecked(userId);
    }

    @Transactional(rollbackFor = Exception.class)
    public void updateAlertChecked(Long alertId) {
        Optional<Alert> optAlert = Optional.ofNullable(alertRepository.findById(alertId)
                .orElseThrow(DataNotFoundException::new));
        Alert alert = optAlert.get();
        alert.changeChecked();
    }

    // 알림을 처리하는 메서드
    @Transactional(rollbackFor = Exception.class)
    public Alert processAlert(User receiver, User sender, AlertType type, Code code) {
        Alert alert = makeAlert(receiver, sender, type, code);
        insertAlert(alert);
        return alert;
    }

    // 알림 entity 만들기
    @Transactional(rollbackFor = Exception.class)
    public Alert makeAlert(User receiver, User sender, AlertType type, Code code) {
        Problem problem = code.getProblem();
        Study study = problem.getSchedule().getStudy();

        String content = String.format(type.getMessage(), sender.getNickname(), problem.getName());
        Date nowTime = new Date();
        String url = String.format(type.getUrlFormat(), study.getStudyId(), problem.getName(), code.getId(), study.getLanguage());
        return Alert.builder()
                .receiver(receiver)
                .sender(sender)
                .type(type)
                .content(content)
                .transTime(nowTime)
                .redirect_url(url)
                .build();
    }

    // 알림 entity DB에 넣기
    @Transactional(rollbackFor = Exception.class)
    public void insertAlert(Alert alert) {
        alertRepository.save(alert);
    }

    // 스케줄링으로 알림 삭제
    @Transactional
    public void deleteAlertByPeriod(Integer period) {
        Calendar cal = Calendar.getInstance();
        cal.add(Calendar.DATE, -period);  // 주어진 기간(일) 전의 날짜를 구함
        Date date = new Date(cal.getTimeInMillis());
        
        alertRepository.deleteAlertByPreviousDate(date); // 이 날짜 이전의 알림들을 삭제
    }
}
