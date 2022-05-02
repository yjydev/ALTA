package com.ssafy.alta.util;

import lombok.Getter;

/**
 * packageName 	: com.ssafy.alta.util
 * fileName 	: Language
 * author 	    : 우정연
 * date		    : 2022-04-29
 * description	: 언어 종류
 * ===========================================================
 * DATE 		AUTHOR 		      NOTE
 * -----------------------------------------------------------
 * 2022-04-29	    우정연  		    최초 생성
 */
@Getter
public enum Language {
    Java("java"),
    Python("python"),
    C("c"),
    CPlus("cpp"),
    CSharp("C#"),
    JS("javascript");
    private String language;
    Language(String language) {
        this.language = language;
    }
}
