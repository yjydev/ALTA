package com.ssafy.alta.dto.request;

import com.ssafy.alta.entity.ActivityScore;
import lombok.*;

import javax.persistence.Column;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

/**
 * packageName 	: com.ssafy.alta.dto.request
 * fileName 	: ActivityScoreRequest
 * author 	    : 오서하
 * date		    : 2022-05-10
 * description	: entity로 변환하기 위한 request dto
 * ===========================================================
 * DATE 		AUTHOR 		      NOTE
 * -----------------------------------------------------------
 * 2022-05-10	    오서하  		    최초 생성
 */

@Getter
@Setter
@Builder
@ToString
@AllArgsConstructor
public class ActivityScoreRequest {

    private String userId;
    private Long studyId;
    private String history;
    private int activityType;

    public ActivityScore toEntity(){
        return ActivityScore.builder()
                .userId(userId)
                .studyId(studyId)
                .history(history)
                .activityType(activityType)
                .build();
    }
}
