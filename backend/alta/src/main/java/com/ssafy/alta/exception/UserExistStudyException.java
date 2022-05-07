package com.ssafy.alta.exception;

/**
 * packageName 	: com.ssafy.alta.exception
 * fileName 	: UserExistStudyException
 * author 	    : jisoon Lee
 * date		    : 2022-05-06
 * description	:
 * ===========================================================
 * DATE             AUTHOR              NOTE
 * -----------------------------------------------------------
 * 2022-05-06       jisoon Lee         최초 생성
 */
public class UserExistStudyException extends BusinessException{
    public UserExistStudyException() {
        super(ErrorCode.USER_EXIST_STUDY);
    }
}
