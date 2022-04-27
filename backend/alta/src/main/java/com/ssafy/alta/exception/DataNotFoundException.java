package com.ssafy.alta.exception;

/**
 * packageName 	: com.ssafy.alta.exception
 * fileName 	: DataNotFoundException
 * author 	    : 우정연
 * date		    : 2022-04-26
 * description	: DB에서 찾는 데이터가 없을 때 발생시킬 예외
 * ===========================================================
 * DATE 		AUTHOR 		      NOTE
 * -----------------------------------------------------------
 * 2022-04-26	    우정연  		    최초 생성
 */
public class DataNotFoundException extends BusinessException{
    public DataNotFoundException() {
        super(ErrorCode.DB_NOT_FOUND_ERROR);
    }
}
