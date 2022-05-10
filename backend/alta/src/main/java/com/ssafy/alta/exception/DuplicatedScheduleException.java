package com.ssafy.alta.exception;

/**
 * packageName 	: com.ssafy.alta.exception
 * fileName 	: DuplicatedScheduleException
 * author 	    : jisoon Lee
 * date		    : 2022-05-09
 * description	:
 * ===========================================================
 * DATE             AUTHOR              NOTE
 * -----------------------------------------------------------
 * 2022-05-09       jisoon Lee         최초 생성
 */
public class DuplicatedScheduleException extends BusinessException{
    public DuplicatedScheduleException() { super(ErrorCode.DUPLICATED_SCHEDULE);}
}
