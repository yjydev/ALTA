package com.ssafy.alta.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.Date;

/**
 * packageName 	: com.ssafy.alta.dto
 * fileName 	: StudyJoinInfoResponse
 * author 	    : jisoon Lee
 * date		    : 2022-04-27
 * description	:
 * ===========================================================
 * DATE             AUTHOR              NOTE
 * -----------------------------------------------------------
 * 2022-04-27       jisoon Lee         최초 생성
 */

@Getter
@Setter
@Builder
@ToString
public class StudyJoinInfoResponse {
    private String nickname;
    private String email;
    private String state;
    private String position;
    private Date registrationDate;
}
