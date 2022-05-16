package com.ssafy.alta.service;

import com.ssafy.alta.mailutil.MailHandler;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring5.SpringTemplateEngine;

import javax.mail.MessagingException;

/**
 * packageName 	: com.ssafy.alta.service
 * fileName 	: MailService
 * author 	    : 우정연
 * date		    : 2022-05-16
 * description	: 메일 서비스
 * ===========================================================
 * DATE 		AUTHOR 		      NOTE
 * -----------------------------------------------------------
 * 2022-05-16	    우정연  		    최초 생성
 */

@Component
@RequiredArgsConstructor
public class MailService {
    private final JavaMailSender mailSender;
    private final SpringTemplateEngine templateEngine;
    private final String SERVICE_URL = "https://algorithmtime.com";

    @Async("mailExecutor")
    public void sendAlertMail(String email, String message) throws MessagingException {
        MailHandler mailHandler = new MailHandler(mailSender);
        mailHandler.setTo(email);
        mailHandler.setFrom("alta.invitation@gmail.com");
        mailHandler.setSubject("ALTA에서 알림이 도착했습니다.");

        Context context = new Context();
        context.setVariable("message", message);
        // context.setVariable("url", SERVICE_URL + url);
        String html = templateEngine.process("alertTemplate", context);
        mailHandler.setText(html, true);

        mailHandler.send();
    }
}
