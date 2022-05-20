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
    SITE_CODE(1, 3, "%s님이 %s문제에 풀이를 등록했습니다.", "/study/%s/%s/code/%s/%s"),
    SITE_COMMENT(2, 2, "%s님이 %s문제의 코드에 댓글을 달았습니다.", "/study/%s/%s/code/%s/%s"),
    MAIL_COMMENT(3, 1, "%s님이 %s문제의 코드에 댓글을 달았습니다.", "/study/%s/%s/code/%s/%s"),
    MAIL_SCHEDULE(4, 0, "%s스터디의 문제 마감시간이 12시간 남았습니다!", "/study/%s/detail");

    private Integer code;
    private Integer bitPos;
    private String message;
    private String urlFormat;

    AlertType(Integer code, Integer bitPos, String message, String urlFormat) {
        this.code = code;
        this.bitPos = bitPos;
        this.message = message;
        this.urlFormat = urlFormat;
    }

    // 해당 code에 해당하는 AlertType를 가져옴
    public static AlertType codeToAlertType(Integer code) {
        return Arrays.stream(AlertType.values())
                .filter(v -> v.getCode() == code)
                .findAny()
                .orElse(null);  // 없으면 null 반환
    }

    public static boolean isAlertTrue(int alertStatus, AlertType alertType) {
        return ((alertStatus >> alertType.getBitPos()) & 1) == 1;
    }
}
