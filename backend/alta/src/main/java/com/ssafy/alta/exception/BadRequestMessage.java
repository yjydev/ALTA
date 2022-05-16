package com.ssafy.alta.exception;

/**
 * packageName 	: com.ssafy.alta.exception
 * fileName 	: BadRequestMessage
 * author 	    : jisoon Lee
 * date		    : 2022-05-16
 * description	:
 * ===========================================================
 * DATE             AUTHOR              NOTE
 * -----------------------------------------------------------
 * 2022-05-16       jisoon Lee         최초 생성
 */
public class BadRequestMessage extends BusinessException{
    public BadRequestMessage() { super(ErrorCode.BAD_REQUEST_MESSAGE); }
}
