package com.ssafy.alta.exception;

/**
 * packageName 	: com.ssafy.alta.exception
 * fileName 	: StudyOverMaxPeople
 * author 	    : jisoon Lee
 * date		    : 2022-05-09
 * description	:
 * ===========================================================
 * DATE             AUTHOR              NOTE
 * -----------------------------------------------------------
 * 2022-05-09       jisoon Lee         최초 생성
 */
public class StudyOverMaxPeopleException extends BusinessException{

    public StudyOverMaxPeopleException() { super(ErrorCode.STUDY_OVER_MAX_PEOPLE);}
}
