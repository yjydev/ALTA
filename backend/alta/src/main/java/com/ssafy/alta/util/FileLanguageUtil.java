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
    private Map<String, String> languageToFile;
    private static FileLanguageUtil instanse = null;
    private FileLanguageUtil() {
        languageToFile = new HashMap<>();
        languageToFile.put(Language.Java.getLanguage(), Language.Java.getExtension());
        languageToFile.put(Language.Python.getLanguage(), Language.Python.getExtension());
        languageToFile.put(Language.C.getLanguage(), Language.C.getExtension());
        languageToFile.put(Language.CPlus.getLanguage(), Language.CPlus.getExtension());
        languageToFile.put(Language.CSharp.getLanguage(), Language.CSharp.getExtension());
        languageToFile.put(Language.JS.getLanguage(), Language.JS.getExtension());
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

    // 파일 이름에 스터디 언어에 따른 확장자 붙여서 반환
    public String getFullFileName(String fileName, String language) {
        String extention = "";
        if(!languageToFile.containsKey(language)) {     // 스터디 언어가 잘못 설정되 있으면 git에 txt로 저장
            extention = "txt";
        } else {
            extention = languageToFile.get(language);
        }
        return fileName + "." + extention;
    }
}
