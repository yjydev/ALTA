package com.ssafy.alta.service;

import com.ssafy.alta.dto.request.MailRequest;
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
    private final String MAIL = "alta.invitation@gmail.com";
    private final String SUBJECT = "ALTA에서 알림이 도착했습니다.";
    private final String REVIEW = "페이지에서 피드백이 도착했습니다.";

    @Async("mailExecutor")
    public void sendAlertMail(String email, String message) throws MessagingException {
        MailHandler mailHandler = new MailHandler(mailSender);
        mailHandler.setTo(email);
        mailHandler.setFrom(MAIL);
        mailHandler.setSubject(SUBJECT);

        Context context = new Context();
        context.setVariable("message", message);
        // context.setVariable("url", SERVICE_URL + url);
        String html = templateEngine.process("alertTemplate", context);
        mailHandler.setText(html, true);

        mailHandler.send();
    }

    @Async("mailExecutor")
    public void sendMail(MailRequest mailRequest) throws MessagingException {
        MailHandler mailHandler = new MailHandler(mailSender);
        mailHandler.setTo(MAIL);
        mailHandler.setFrom(MAIL);
        mailHandler.setSubject(REVIEW);
        mailHandler.setText(mailRequest.getContent(), false);

        mailHandler.send();
    }
}
