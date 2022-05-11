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
    Java("Java", "js"),
    C("C", "c"),
    CPlus("C++", "cpp"),
    CSharp("C#", "cs"),
    Python("Python", "py"),
    JS("Java Script", "js");
    private String language;
    private String extension;
    Language(String language, String extension) {
        this.language = language;
        this.extension = extension;
    }
}
