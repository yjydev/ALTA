package com.ssafy.alta.exception;

import lombok.Getter;

/**
 * packageName 	: com.ssafy.alta.exception
 * fileName 	: BusinessException
 * author 	    : 우정연
 * date		    : 2022-04-26
 * description	: 비즈니스 로직 예외 처리를 위한 최상위 Exception
 * ===========================================================
 * DATE 		AUTHOR 		      NOTE
 * -----------------------------------------------------------
 * 2022-04-26	    우정연  		    최초 생성
 */

@Getter
public class BusinessException extends RuntimeException{
    protected ErrorCode errorCode;  // 자식 클래스들에서는 얘를 설정해서 사용!
    public BusinessException(ErrorCode errorCode) {
        this.errorCode = errorCode;
    }
}
