package com.ssafy.alta.exception;

/**
 * packageName 	: com.ssafy.alta.exception
 * fileName 	: ImpossibleDeleteProblemException
 * author 	    : jisoon Lee
 * date		    : 2022-05-08
 * description	:
 * ===========================================================
 * DATE             AUTHOR              NOTE
 * -----------------------------------------------------------
 * 2022-05-08       jisoon Lee         최초 생성
 */
public class ImpossibleDeleteProblemException  extends BusinessException {
    public ImpossibleDeleteProblemException() { super(ErrorCode.IMPOSSIBLE_DELETE_PROBLEM);}
}
