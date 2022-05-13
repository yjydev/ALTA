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
    CODE(1, "풀이 등록"),
    COMMENT(2, "코드에 피드백 등록");

    private Integer code;
    private String desc;

    AlertType(Integer code, String desc) {
        this.code = code;
        this.desc = desc;
    }

    // 해당 code에 해당하는 AlertType를 가져옴
    public static AlertType codeToAlertType(Integer code) {
        return Arrays.stream(AlertType.values())
                .filter(v -> v.getCode() == code)
                .findAny()
                .orElse(null);  // 없으면 null 반환
    }
}
