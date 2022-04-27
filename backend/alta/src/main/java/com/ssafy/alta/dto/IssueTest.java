package com.ssafy.alta.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.io.Serializable;

/**
 * packageName 	: com.ssafy.alta.dto
 * fileName 	: IssueTest
 * author 	    : 김유진
 * date		    : 2022-04-26
 * description	:
 * ===========================================================
 * DATE 		    AUTHOR 		        NOTE
 * -----------------------------------------------------------
 * 2022-04-26	        김유진  		        최초 생성
 */
@Getter
@Setter
@ToString
public class IssueTest implements Serializable {
    private String title;
    private String body;
}