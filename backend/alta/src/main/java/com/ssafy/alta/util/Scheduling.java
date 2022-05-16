package com.ssafy.alta.util;

import com.ssafy.alta.service.AlertService;
import com.ssafy.alta.service.CodeService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import javax.mail.MessagingException;
import java.text.ParseException;

/**
 * packageName 	: com.ssafy.alta.util
 * fileName 	: Schedule
 * author 	    : 우정연
 * date		    : 2022-05-15
 * description	: 스케줄링
 * ===========================================================
 * DATE 		AUTHOR 		      NOTE
 * -----------------------------------------------------------
 * 2022-05-15	    우정연  		    최초 생성
 */
@Slf4j
@Component
@RequiredArgsConstructor
public class Scheduling {
    private final AlertService alertService;
    private final CodeService codeService;
    private final Integer ALERT_SAVE_PERIOD = 30;  // 알림 30일 저장

    @Scheduled(cron = "0 0 2 * * *") // Cron 표현법 - 매일 2시 실행
    public void scheduleDeleteAlertTask() {
        alertService.deleteAlertByPeriod(ALERT_SAVE_PERIOD);
    }

    @Scheduled(cron = "0 0 12 * * *") // 매일 12시 실행 - 마감일이 오늘까지인 스터디에 대해 메일 보냄
    public void scheduleSendAlertMailCodeDeadline() throws ParseException, MessagingException {
        codeService.sendAlertMailCodeDeadline();;
    }
}
