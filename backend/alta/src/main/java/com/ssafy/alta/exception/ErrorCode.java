package com.ssafy.alta.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

/**
 * packageName 	: com.ssafy.alta.exception
 * fileName 	: ErrorCode
 * author 	    : 우정연
 * date		    : 2022-04-26
 * description	: Exception 발생 시의 에러 코드
 * ===========================================================
 * DATE 		AUTHOR 		      NOTE
 * -----------------------------------------------------------
 * 2022-04-26	    우정연  		    최초 생성
 */

// 여기에 처리할 에러 추가하기!
@Getter
public enum ErrorCode {

    /* 401 UNAUTHORIZED : 인증되지 않은 사용자 */
    HANDLE_ACCESS_DENIED(HttpStatus.UNAUTHORIZED, "접근이 제한됩니다."),

    /* 500 INTERNAL_SERVER_ERROR : 서버 내부 오류 */
    DB_NOT_FOUND_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "일치하는 데이터가 없습니다."),
    INTERNAL_SERVER_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "서버에 에러가 발생했습니다.");

    private final HttpStatus status;  // 상태 코드
    private final String message;     // 에러 메시지

    ErrorCode(final HttpStatus status, final String message){
        this.status = status;
        this.message = message;
    }
}
