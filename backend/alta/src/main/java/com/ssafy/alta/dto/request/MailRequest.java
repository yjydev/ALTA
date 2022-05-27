package com.ssafy.alta.dto.request;

import lombok.Getter;
import lombok.ToString;

/**
 * packageName 	: com.ssafy.alta.dto.request
 * fileName 	: MailRequest
 * author 	    : jisoon Lee
 * date		    : 2022-05-23
 * description	:
 * ===========================================================
 * DATE             AUTHOR              NOTE
 * -----------------------------------------------------------
 * 2022-05-23       jisoon Lee         최초 생성
 */
@Getter
@ToString
public class MailRequest {
    private String type;
    private String content;
}
