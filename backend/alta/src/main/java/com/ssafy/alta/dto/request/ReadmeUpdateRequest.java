package com.ssafy.alta.dto.request;

import lombok.*;

import java.util.HashMap;

/**
 * packageName 	: com.ssafy.alta.dto.request
 * fileName 	: ReadmeUpdateRequest
 * author 	    : 김유진
 * date		    : 2022-05-06
 * description	:
 * ===========================================================
 * DATE 		    AUTHOR 		        NOTE
 * -----------------------------------------------------------
 * 2022-05-06	        김유진  		        최초 생성
 */

@Getter
@Setter
@Builder
@ToString
@AllArgsConstructor
public class ReadmeUpdateRequest {
    private String message;
    private HashMap<String, String> committer;
    private String content;
    private String sha;

    public ReadmeUpdateRequest() {
        this.committer = new HashMap<>();
    }
}