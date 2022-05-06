package com.ssafy.alta.exception;

import org.springframework.http.HttpStatus;

/**
 * packageName 	: com.ssafy.alta.exception
 * fileName 	: JwtExpiredExaception
 * author 	    : 오서하
 * date		    : 2022-05-06
 * description	:
 * ===========================================================
 * DATE 		AUTHOR 		      NOTE
 * -----------------------------------------------------------
 * 2022-05-06	    오서하  		    최초 생성
 */
public class JwtExpiredExaception extends BusinessException {

    public JwtExpiredExaception() {
        super(ErrorCode.EXPIRED_REFRESH_TOKEN);
    }
}
