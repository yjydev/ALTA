package com.ssafy.alta.exception;

/**
 * packageName 	: com.ssafy.alta.exception
 * fileName 	: DuplicateFolderException
 * author 	    : jisoon Lee
 * date		    : 2022-05-05
 * description	:
 * ===========================================================
 * DATE             AUTHOR              NOTE
 * -----------------------------------------------------------
 * 2022-05-05       jisoon Lee         최초 생성
 */
public class DuplicateFolderException extends BusinessException {
    public DuplicateFolderException() { super(ErrorCode.GIT_DUPLICATE_FOLDER_ERROR);}
}
