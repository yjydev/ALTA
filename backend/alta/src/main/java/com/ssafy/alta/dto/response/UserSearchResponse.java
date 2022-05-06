package com.ssafy.alta.dto.response;

import lombok.Builder;
import lombok.Getter;

/**
 * packageName 	: com.ssafy.alta.dto.response
 * fileName 	: UserSearchResponse
 * author 	    : jisoon Lee
 * date		    : 2022-05-06
 * description	:
 * ===========================================================
 * DATE             AUTHOR              NOTE
 * -----------------------------------------------------------
 * 2022-05-06       jisoon Lee         최초 생성
 */

public interface UserSearchResponse {
    String getId();
    String getNickname();
    String getEmail();
}
