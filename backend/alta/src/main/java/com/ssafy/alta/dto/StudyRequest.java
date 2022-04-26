package com.ssafy.alta.dto;

import com.ssafy.alta.entity.Study;
import com.ssafy.alta.entity.User;
import lombok.*;

import javax.persistence.Column;

@Getter
@Setter
@ToString
public class StudyRequest {
    private User user;
    private String name;
    private boolean isPublic;
    private String language;
    private Integer maxPeople;
    private String code;

    public Study toEntity() {
        Study study = Study.builder()
                .user(user)
                .name(name)
                .isPublic(isPublic)
                .language(language)
                .maxPeople(maxPeople)
                .code(code)
                .build();
        return study;
    }
}
