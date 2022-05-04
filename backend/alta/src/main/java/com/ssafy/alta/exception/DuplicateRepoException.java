package com.ssafy.alta.exception;

/**
 * packageName 	: com.ssafy.alta.exception
 * fileName 	: DuplicateRepoException
 * author 	    : jisoon Lee
 * date		    : 2022-05-04
 * description	:
 * ===========================================================
 * DATE             AUTHOR              NOTE
 * -----------------------------------------------------------
 * 2022-05-04       jisoon Lee         최초 생성
 */
public class DuplicateRepoException extends BusinessException {
    public DuplicateRepoException() { super(ErrorCode.GIT_DUPLICATE_REPO_ERROR);}
}
