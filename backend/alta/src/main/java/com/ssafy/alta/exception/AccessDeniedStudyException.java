package com.ssafy.alta.exception;

/**
 * packageName 	: com.ssafy.alta.exception
 * fileName 	: AccessDeniedStudyException
 * author 	    : 우정연
 * date		    : 2022-05-06
 * description	: 스터디원이 아닐 경우 발생하는 예외
 * ===========================================================
 * DATE 		AUTHOR 		      NOTE
 * -----------------------------------------------------------
 * 2022-05-06	    우정연  		    최초 생성
 */
public class AccessDeniedStudyException extends BusinessException{
    public AccessDeniedStudyException() {
        super(ErrorCode.ACCESS_DENIED_STUDY);
    }
}