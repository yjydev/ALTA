package com.ssafy.alta.dto.response;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

/**
 * packageName 	: com.ssafy.alta.dto.response
 * fileName 	: StudyJoinInfoMemberResponse
 * author 	    : jisoon Lee
 * date		    : 2022-05-10
 * description	:
 * ===========================================================
 * DATE             AUTHOR              NOTE
 * -----------------------------------------------------------
 * 2022-05-10       jisoon Lee         최초 생성
 */
@Getter
@Setter
@Builder
@ToString
public class StudyJoinInfoMemberResponse {
    private String nickname;
    private String position;
    private String profileImg;
}
