package com.ssafy.alta.dto.request;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.io.Serializable;

/**
 * packageName 	: com.ssafy.alta.dto.response
 * fileName 	: GithupFileUploadRequest
 * author 	    : 김유진
 * date		    : 2022-04-29
 * description	:
 * ===========================================================
 * DATE 		    AUTHOR 		        NOTE
 * -----------------------------------------------------------
 * 2022-04-29	        김유진  		        최초 생성
 */
@Getter
@Setter
@ToString
public class GithupFileUploadRequest   implements Serializable {
    private String message;
    private String content;
    private String sha;
    private String branch;


}