package com.ssafy.alta.exception;

/**
 * packageName 	: com.ssafy.alta.exception
 * fileName 	: StudyMaxPeopleZeroException
 * author 	    : jisoon Lee
 * date		    : 2022-05-09
 * description	:
 * ===========================================================
 * DATE             AUTHOR              NOTE
 * -----------------------------------------------------------
 * 2022-05-09       jisoon Lee         최초 생성
 */
public class StudyMaxPeopleZeroException extends BusinessException{
    public StudyMaxPeopleZeroException() { super(ErrorCode.STUDY_MAX_PEOPLE_ZERO);}
}
