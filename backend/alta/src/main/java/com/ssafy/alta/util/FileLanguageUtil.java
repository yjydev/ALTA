package com.ssafy.alta.util;

import java.util.HashMap;
import java.util.Map;

/**
 * packageName 	: com.ssafy.alta.util
 * fileName 	: LanguageFileEnum
 * author 	    : 우정연
 * date		    : 2022-04-29
 * description	: 파일을 언어로 바꿔주는 클래스
 * ===========================================================
 * DATE 		AUTHOR 		      NOTE
 * -----------------------------------------------------------
 * 2022-04-29	    우정연  		    최초 생성
 */
public class FileLanguageUtil {
    private Map<String, String> LanguageToFile;
    private static FileLanguageUtil instanse = null;
    private FileLanguageUtil() {
        LanguageToFile = new HashMap<>();
        LanguageToFile.put(Language.Java.getLanguage(), Language.Java.getExtension());
        LanguageToFile.put(Language.Python.getLanguage(), Language.Python.getExtension());
        LanguageToFile.put(Language.C.getLanguage(), Language.C.getExtension());
        LanguageToFile.put(Language.CPlus.getLanguage(), Language.CPlus.getExtension());
        LanguageToFile.put(Language.CSharp.getLanguage(), Language.CSharp.getExtension());
        LanguageToFile.put(Language.JS.getLanguage(), Language.JS.getExtension());
    }
    public static FileLanguageUtil getInstanse() {
        if(instanse == null) {
            instanse = new FileLanguageUtil();
        }
        return instanse;
    }

    // 파일 이름 추출
    public String getFileName(String file) {
        int index = file.lastIndexOf('.');
        if(index == -1) {   // 확장자가 없음
            return file;
        }
        String fileName = file.substring(index + 1, file.length());
        return fileName;
    }
}
