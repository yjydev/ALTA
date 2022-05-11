package com.ssafy.alta.util;

/**
 * packageName 	: com.ssafy.alta.util
 * fileName 	: ActivityType
 * author 	    : 오서하
 * date		    : 2022-05-10
 * description	: 성실점수를 매기기 위한 활동들 (댓글, 코드 업로드, 문제 업로드)
 * ===========================================================
 * DATE 		AUTHOR 		      NOTE
 * -----------------------------------------------------------
 * 2022-05-10	    오서하  		    최초 생성
 */
public enum ActivityType {

    COMMNET("Comment", 1),
    CODE("Code", 2),
    PROBLEM("Problem", 3);
    private String activityString;
    private int activityIdx;

    ActivityType(String activityString, int activityIdx) {
        this.activityString = activityString;
        this.activityIdx = activityIdx;
    }

    public String getActivityString() {
        return activityString;
    }

    public int getActivityIdx() {
        return activityIdx;
    }
}
