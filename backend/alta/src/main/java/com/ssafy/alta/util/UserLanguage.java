package com.ssafy.alta.util;

import java.util.HashMap;

/**
 * packageName 	: com.ssafy.alta.util
 * fileName 	: userLanguage
 * author 	    : 김유진
 * date		    : 2022-05-05
 * description	:
 * ===========================================================
 * DATE 		    AUTHOR 		        NOTE
 * -----------------------------------------------------------
 * 2022-05-05	        김유진  		        최초 생성
 */
public enum UserLanguage {
    JAVA("Java", 1), Python("Python", 2), C("C", 4), CPlus("C++", 8), CSharp("C#", 16), JS("javascript", 32);
    private String langString;
    private int langIdx;
    static private UserLanguage[] list = UserLanguage.values();

    UserLanguage(String langString, int langIdx) {
        this.langIdx = langIdx;
        this.langString = langString;
    }


    public static HashMap getLangIdxMap() {
        HashMap<Integer, String> map = new HashMap<>();
        for (UserLanguage tmp : list) {
            map.put(tmp.getLangIdx(), tmp.langString);
        }
        return map;
    }

    public static HashMap getLangStringMap() {
        HashMap<String, Integer> map = new HashMap<>();
        for (UserLanguage tmp : list) {
            map.put(tmp.langString, tmp.getLangIdx());
        }
        return map;
    }

    public String getLangString() {
        return langString;
    }

    public int getLangIdx() {
        return langIdx;
    }


}
