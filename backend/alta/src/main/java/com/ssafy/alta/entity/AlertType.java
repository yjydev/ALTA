package com.ssafy.alta.entity;

import lombok.Getter;

import java.util.Arrays;

/**
 * packageName 	: com.ssafy.alta.entity
 * fileName 	: AlertType
 * author 	    : 우정연
 * date		    : 2022-05-13
 * description	: 알림 타입 enum
 * ===========================================================
 * DATE 		AUTHOR 		      NOTE
 * -----------------------------------------------------------
 * 2022-05-13	    우정연  		    최초 생성
 */

@Getter
public enum AlertType {
    CODE(1, "%s님이 %s문제에 풀이를 등록했습니다."),
    COMMENT(2, "%s님이 %s문제의 코드에 댓글을 달았습니다.");

    private Integer code;
    private String message;

    AlertType(Integer code, String message) {
        this.code = code;
        this.message = message;
    }

    // 해당 code에 해당하는 AlertType를 가져옴
    public static AlertType codeToAlertType(Integer code) {
        return Arrays.stream(AlertType.values())
                .filter(v -> v.getCode() == code)
                .findAny()
                .orElse(null);  // 없으면 null 반환
    }
}
