package com.ssafy.alta.exception;

/**
 * packageName 	: com.ssafy.alta.exception
 * fileName 	: InvalidScheduleException
 * author 	    : 우정연
 * date		    : 2022-05-06
 * description	: 일정의 날짜가 타당하지 않을 때 나는 예외
 * ===========================================================
 * DATE 		AUTHOR 		      NOTE
 * -----------------------------------------------------------
 * 2022-05-06	    우정연  		    최초 생성
 */
public class InvalidScheduleException extends BusinessException  {
    public InvalidScheduleException() { super(ErrorCode.INVALID_SCHEDULE);}
}
