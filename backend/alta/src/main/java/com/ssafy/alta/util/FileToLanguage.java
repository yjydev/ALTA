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
public class FileToLanguage {
    private Map<String, String> map;
    private static FileToLanguage instanse = null;
    private FileToLanguage() {
        map = new HashMap<>();
        map.put("java", Language.Java.getLanguage());
        map.put("py", Language.Python.getLanguage());
        map.put("c", Language.C.getLanguage());
        map.put("cpp", Language.CPlus.getLanguage());
        map.put("cs", Language.CSharp.getLanguage());
        map.put("js", Language.JS.getLanguage());
    }
    public static FileToLanguage getInstanse() {
        if(instanse == null) {
            instanse = new FileToLanguage();
        }
        return instanse;
    }
    public String getLanguage(String fileName) {
        int index = fileName.lastIndexOf('.');
        if(index == -1) {   // 확장자가 없음
            return "None";
        }
        String fileExtension = fileName.substring(index + 1, fileName.length());
        if(!map.containsKey(fileExtension)) {  // 확장자가
            return "Incorrect File Name";
        }
        return map.get(fileExtension);
    }
}
