package com.ssafy.alta.dto.request;

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
@ToString
public class GithubRepoRequest  implements Serializable {
//    private String owner;
    private String name;
//    private String description;
//    private boolean include_all_branches;
//    private boolean private;  예약어랑 같은 경우에는 어떻게 해야하죠...?
}