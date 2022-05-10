package com.ssafy.alta.dto.request;

import com.ssafy.alta.entity.Study;
import com.ssafy.alta.entity.User;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

/**
 * packageName 	: com.ssafy.alta.dto
 * fileName 	: StudyRequest
 * author 	    : jisoon Lee
 * date		    : 2022-04-26
 * description	:
 * ===========================================================
 * DATE             AUTHOR              NOTE
 * -----------------------------------------------------------
 * 2022-04-26       jisoon Lee         최초 생성
 */

@Getter
@Setter
@Builder
@ToString
public class StudyRequest {
    private User user;
    private String name;
    private Boolean isPublic;
    private String language;
    private Integer maxPeople;
    private String code;
    private String repositoryName;
    private String introduction;

    public Study toEntity() {
        return Study.builder()
                .user(user)
                .name(name)
                .isPublic(isPublic)
                .language(language)
                .maxPeople(maxPeople)
                .code(code)
                .repositoryName(repositoryName)
                .introduction(introduction)
                .build();
    }
}