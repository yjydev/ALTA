package com.ssafy.alta.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

/**
 * packageName 	: com.ssafy.alta.exception
 * fileName 	: ErrorCode
 * author 	    : 우정연
 * date		    : 2022-04-26
 * description	: Exception 발생 시의 에러 코드
 * ===========================================================
 * DATE 		AUTHOR 		      NOTE
 * -----------------------------------------------------------
 * 2022-04-26	    우정연  		    최초 생성
 */

// 여기에 처리할 에러 추가하기!
@Getter
public enum ErrorCode {

    /* 401 UNAUTHORIZED : 인증되지 않은 사용자 */
    HANDLE_ACCESS_DENIED("U001", HttpStatus.UNAUTHORIZED, "접근이 제한됩니다."),  // 유저
    ACCESS_DENIED_STUDY("U002", HttpStatus.UNAUTHORIZED, "스터디에 가입된 그룹원이 아닙니다."),  // 유저
    USER_EXIST_STATE("U003", HttpStatus.BAD_REQUEST, "스터디에 존재하는 상태값입니다.(가입, 초대대기, 참가대기, 거절, 탈퇴)"),
    USER_EXIST_STUDY("U004", HttpStatus.BAD_REQUEST, "이미 스터디에 가입되어 있습니다."),
    DB_NOT_FOUND_ERROR("G001", HttpStatus.NOT_FOUND, "일치하는 데이터가 없습니다."), // 글로벌

    /* JWT REFRESH TOKEN 기간 만료 에러 */
    EXPIRED_REFRESH_TOKEN("JWT001", HttpStatus.FORBIDDEN, "리프레시 토큰 기한이 만료되어 재로그인이 필요합니다."),

    /* 500 INTERNAL_SERVER_ERROR : 서버 내부 오류 */
    INTERNAL_SERVER_ERROR("G002", HttpStatus.INTERNAL_SERVER_ERROR, "서버에 에러가 발생했습니다."),

    HTTP_CLIENT_ERROR_EXCEPTION("A001", HttpStatus.BAD_REQUEST, "Git과 통신 중 에러가 발생했습니다."),
    GIT_DUPLICATE_FILE_ERROR("A002", HttpStatus.BAD_REQUEST, "이미 같은 이름의 코드가 Github에 업로드 되어 있습니다."),
    GIT_DUPLICATE_REPO_ERROR("A003", HttpStatus.NOT_FOUND, "Git 레포지토리 이름이 중복됩니다."),
    GIT_DUPLICATE_FOLDER_ERROR("A004", HttpStatus.BAD_REQUEST, "Git 폴더 이름이 중복됩니다."),

    WRITER_NOT_MATCH("C001", HttpStatus.UNAUTHORIZED, "작성자만 수정/삭제할 수 있습니다."),
    DUPLICATE_FILE_ERROR("A002", HttpStatus.BAD_REQUEST, "파일 이름이 중복됩니다.");

    private final String code;         // 에러 키(관리하기 위함)
    private final HttpStatus status;  // 상태 코드
    private final String message;     // 에러 메시지

    ErrorCode(String code, final HttpStatus status, final String message){
        this.code = code;
        this.status = status;
        this.message = message;
    }
}
