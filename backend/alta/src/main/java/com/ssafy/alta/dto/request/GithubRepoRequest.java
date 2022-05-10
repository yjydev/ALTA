package com.ssafy.alta.dto.request;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.io.Serializable;

/**
 * packageName 	: com.ssafy.alta.dto
 * fileName 	: GihubRepoRequest
 * author 	    : 김유진
 * date		    : 2022-04-28
 * description	:
 * ===========================================================
 * DATE 		    AUTHOR 		        NOTE
 * -----------------------------------------------------------
 * 2022-04-28	        김유진  		        최초 생성
 */
@Getter
@Setter
@Builder
@ToString
public class GithubRepoRequest  implements Serializable {
    private String name;
    private String description;
    private boolean auto_init;
}