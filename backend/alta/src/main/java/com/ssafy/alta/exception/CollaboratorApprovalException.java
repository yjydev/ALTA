package com.ssafy.alta.exception;

/**
 * packageName 	: com.ssafy.alta.exception
 * fileName 	: CollaboratorApprovalException
 * author 	    : jisoon Lee
 * date		    : 2022-05-06
 * description	:
 * ===========================================================
 * DATE             AUTHOR              NOTE
 * -----------------------------------------------------------
 * 2022-05-06       jisoon Lee         최초 생성
 */
public class CollaboratorApprovalException extends BusinessException{
    public CollaboratorApprovalException() {
        super(ErrorCode.GIT_COLLABORATOR_APPROVEL_ERROR);
    }
}
