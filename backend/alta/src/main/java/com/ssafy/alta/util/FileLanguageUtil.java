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
    private Map<String, String> languageToEditerFormat;
    private static FileLanguageUtil instanse = null;
    private FileLanguageUtil() {
        languageToFile = new HashMap<>();
        languageToEditerFormat = new HashMap<>();
        for(int i = 0 ; i < Language.getList().length ; i++) {
            languageToFile.put(Language.getList()[i].getLanguage(), Language.getList()[i].getExtension());
            languageToEditerFormat.put(Language.getList()[i].getLanguage(), Language.getList()[i].getEditerFormat());
        }
    }
    public static FileLanguageUtil getInstanse() {
        if(instanse == null) {
            instanse = new FileLanguageUtil();
        }
        return instanse;
    }

//    // 파일 이름 추출
//    public String getFileName(String file) {
//        int index = file.lastIndexOf('.');
//        if(index == -1) {   // 확장자가 없음
//            return file;
//        }
//        String fileName = file.substring(0, index);
//        return fileName;
//    }

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

    public String getExtention(String language) {
        return languageToFile.get(language);
    }

    public String getEditorFormat(String language) {
        return languageToEditerFormat.get(language);
    }
}
