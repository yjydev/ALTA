package com.ssafy.alta.exception;

/**
 * packageName 	: com.ssafy.alta.exception
 * fileName 	: UnAuthorizedException
 * author 	    : jisoon Lee
 * date		    : 2022-04-29
 * description	:
 * ===========================================================
 * DATE             AUTHOR              NOTE
 * -----------------------------------------------------------
 * 2022-04-29       jisoon Lee         최초 생성
 */
public class UnAuthorizedException extends BusinessException{
    public UnAuthorizedException() {
        super(ErrorCode.HANDLE_ACCESS_DENIED);
    }
}
