package com.ssafy.alta.controller;

import com.ssafy.alta.dto.response.ErrorResponse;
import com.ssafy.alta.exception.BusinessException;
import com.ssafy.alta.exception.ErrorCode;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.nio.file.AccessDeniedException;
import java.sql.SQLException;

/**
 * packageName 	: com.ssafy.alta.controller
 * fileName 	: ExceptionController
 * author 	    : 우정연
 * date		    : 2022-04-26
 * description	: 전역 예외 처리 Controller
 * ===========================================================
 * DATE 		AUTHOR 		      NOTE
 * -----------------------------------------------------------
 * 2022-04-26	    우정연  		    최초 생성
 */

@RestControllerAdvice
public class ExceptionController {

    // 필요한 권한을 가지고 있지 않은 경우 발생
    @ExceptionHandler(AccessDeniedException.class)
    protected ResponseEntity<ErrorResponse> handleAccessDeniedException(final AccessDeniedException e) {
        final ErrorResponse response = new ErrorResponse(ErrorCode.HANDLE_ACCESS_DENIED);
        return new ResponseEntity<>(response, HttpStatus.valueOf(response.getStatus()));
    }

    // 비즈니스 로직 관련 처리
    @ExceptionHandler(BusinessException.class)
    public ResponseEntity<ErrorResponse> handleBusinessException(final BusinessException e) {
        final ErrorCode errorCode = e.getErrorCode();
        final ErrorResponse response = new ErrorResponse(errorCode);
        return new ResponseEntity<>(response, errorCode.getStatus());
    }

    // 그 외의 Exception들 처리
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleException(final Exception e) {
        final ErrorResponse response = new ErrorResponse(ErrorCode.INTERNAL_SERVER_ERROR);
        return new ResponseEntity<>(response, HttpStatus.valueOf(response.getStatus()));
    }
}
