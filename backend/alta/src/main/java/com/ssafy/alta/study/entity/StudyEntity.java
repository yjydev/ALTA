package com.ssafy.alta.study.entity;

import com.ssafy.alta.user.entity.UserEntity;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;

import javax.persistence.*;

@Getter
@NoArgsConstructor
@Entity
@Table(name = "study")
public class StudyEntity {
    @Id
    @Column(name = "study_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long studyId;

    @Column(name = "study_name")
    private String name;

    @Column(name = "study_introduction")
    private String introduction;

    @Column(name = "study_is_public", columnDefinition = "TINYINT(1) default 1")
    private boolean isPublic;

    @Column(name = "study_language")
    private String language;

    @Column(name = "study_max_people")
    private Integer maxPeople;

    @Column(name = "study_repository_name")
    private String repositoryName;

    @Column(name = "study_code")
    private String code;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserEntity user;
}
