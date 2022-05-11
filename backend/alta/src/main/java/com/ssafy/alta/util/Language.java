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
    Java("Java", "java", "java"),
    C("C", "c", "c"),
    CPlus("C++", "cpp", "cpp"),
    CSharp("C#", "cs", "csharp"),
    Python("Python", "py", "python"),
    JS("Java Script", "js", "javascript");
    private String language;
    private String extension;
    private String editerFormat;
    static private Language[] list = Language.values();
    Language(String language, String extension, String editerFormat) {
        this.language = language;
        this.extension = extension;
        this.editerFormat = editerFormat;
    }
    static public Language[] getList() {
        return list;
    }
}
