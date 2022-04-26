package com.ssafy.alta.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@DynamicInsert
@DynamicUpdate
@Table(name = "study")
public class Study {
    @Id
    @Column(name = "study_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long studyId;

    @Column(name = "study_name")
    private String name;

    @Column(name = "study_introduction")
    private String introduction;

    @Column(name = "study_is_public")
    private boolean isPublic;

    @Column(name = "study_language")
    private String language;

    @Column(name = "study_max_people")
    private Integer maxPeople;

    @Column(name = "study_repository_name")
    private String repositoryName;

    @Column(name = "study_code")
    private String code;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "fk_user_id")
    private User user;
}
