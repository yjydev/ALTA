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
    HANDLE_ACCESS_DENIED("U001", HttpStatus.UNAUTHORIZED, "접근이 제한됩니다."),  // 유저

    /* 500 INTERNAL_SERVER_ERROR : 서버 내부 오류 */
    DB_NOT_FOUND_ERROR("G001", HttpStatus.INTERNAL_SERVER_ERROR, "일치하는 데이터가 없습니다."), // 글로벌
    INTERNAL_SERVER_ERROR("G002", HttpStatus.INTERNAL_SERVER_ERROR, "서버에 에러가 발생했습니다."),

    HTTP_CLIENT_ERROR_EXCEPTION("A001", HttpStatus.BAD_REQUEST, "Git과 통신 중 에러가 발생했습니다."),

    COMMENT_WRITER_NOT_MATCH("C001", HttpStatus.UNAUTHORIZED, "댓글 작성자만 삭제할 수 있습니다.");

    private final String code;         // 에러 키(관리하기 위함)
    private final HttpStatus status;  // 상태 코드
    private final String message;     // 에러 메시지

    ErrorCode(String code, final HttpStatus status, final String message){
        this.code = code;
        this.status = status;
        this.message = message;
    }
}
