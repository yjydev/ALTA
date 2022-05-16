package com.ssafy.alta.exception;

/**
 * packageName 	: com.ssafy.alta.exception
 * fileName 	: DuplicateProroblemException
 * author 	    : jisoon Lee
 * date		    : 2022-05-16
 * description	:
 * ===========================================================
 * DATE             AUTHOR              NOTE
 * -----------------------------------------------------------
 * 2022-05-16       jisoon Lee         최초 생성
 */
public class DuplicateProroblemException extends BusinessException{
    public DuplicateProroblemException() { super(ErrorCode.DUPLICATED_PROBLEM);}
}
