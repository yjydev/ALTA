package com.ssafy.alta.exception;

/**
 * packageName 	: com.ssafy.alta.exception
 * fileName 	: InvalidCreateSchedule
 * author 	    : jisoon Lee
 * date		    : 2022-05-09
 * description	:
 * ===========================================================
 * DATE             AUTHOR              NOTE
 * -----------------------------------------------------------
 * 2022-05-09       jisoon Lee         최초 생성
 */
public class InvalidCreateScheduleException extends BusinessException{
    public InvalidCreateScheduleException() { super(ErrorCode.INVALID_CREATE_SCHEDULE); }
}
