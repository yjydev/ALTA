package com.ssafy.alta.dto.response;

import com.ssafy.alta.exception.ErrorCode;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;

import java.time.LocalDateTime;

/**
 * packageName 	: com.ssafy.alta.dto.response
 * fileName 	: ErrorResponse
 * author 	    : 우정연
 * date		    : 2022-04-26
 * description	: 에러 응답 정보
 * ===========================================================
 * DATE 		AUTHOR 		      NOTE
 * -----------------------------------------------------------
 * 2022-04-26	    우정연  		    최초 생성
 */

@Getter
public class ErrorResponse {
    private int status;
    private String message;
    private LocalDateTime timestamp = LocalDateTime.now();
    private String code;
    
// 그 외의 항목 추가할 때 사용하면 좋을 듯
//    public ErrorResponse(int status, String message) {
//        this.code = code;
//        this.message = message;
//    }
    
    public ErrorResponse(ErrorCode errorCode) {
        this.code = errorCode.getCode();
        this.status = errorCode.getStatus().value();
        this.message = errorCode.getMessage();
    }
}
