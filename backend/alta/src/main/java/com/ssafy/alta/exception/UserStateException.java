package com.ssafy.alta.exception;

/**
 * packageName 	: com.ssafy.alta.exception
 * fileName 	: UserStateException
 * author 	    : jisoon Lee
 * date		    : 2022-05-06
 * description	:
 * ===========================================================
 * DATE             AUTHOR              NOTE
 * -----------------------------------------------------------
 * 2022-05-06       jisoon Lee         최초 생성
 */
public class UserStateException extends BusinessException{
    public UserStateException() {
        super(ErrorCode.USER_EXIST_STATE);
    }
}
