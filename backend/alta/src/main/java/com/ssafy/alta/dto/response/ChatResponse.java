package com.ssafy.alta.dto.response;

import lombok.*;

import java.util.Date;

/**
 * packageName 	: com.ssafy.alta.dto.response
 * fileName 	: ChatSubResponse
 * author 	    : jisoon Lee
 * date		    : 2022-05-13
 * description	:
 * ===========================================================
 * DATE             AUTHOR              NOTE
 * -----------------------------------------------------------
 * 2022-05-13       jisoon Lee         최초 생성
 */
@Getter
@Setter
@ToString
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ChatResponse {
    private String nickname;
    private String image;
    private String message;
    private Date writeDate;
}
