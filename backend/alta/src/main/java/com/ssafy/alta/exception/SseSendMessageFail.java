package com.ssafy.alta.exception;

/**
 * packageName 	: com.ssafy.alta.exception
 * fileName 	: DuplicateFileException
 * author 	    : 우정연
 * date		    : 2022-05-04
 * description	: sse 통신 중, 서버에서 알림 송신이 실패한 경우 발생
 * ===========================================================
 * DATE 		AUTHOR 		      NOTE
 * -----------------------------------------------------------
 * 2022-05-04	    우정연  		    최초 생성
 */
public class SseSendMessageFail extends BusinessException{
    public SseSendMessageFail() { super(ErrorCode.SSE_SEND_MESSAGE_FAIL);}
}
