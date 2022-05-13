package com.ssafy.alta.entity;

import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.util.Date;

/**
 * packageName 	: com.ssafy.alta.entity
 * fileName 	: Alert
 * author 	    : 김유진
 * date		    : 2022-05-03
 * description	:
 * ===========================================================
 * DATE 		    AUTHOR 		        NOTE
 * -----------------------------------------------------------
 * 2022-05-03	        김유진  		        최초 생성
 */
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Builder
@DynamicInsert
@DynamicUpdate
@Table(name = "alert")
@ToString
public class Alert {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "alert_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "fk_receiver_id")
    private User receiver;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "fk_sender_id")
    private User sender;

    @NonNull
    @Convert(converter = AlertConverter.class)
    @Column(name = "alert_type")
    private AlertType type;

    @NonNull
    @Column(name = "alert_content")
    private String content;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "alert_transmission_time")
    private Date transTime;

    @Column(name = "alert_redirect_url")
    private String redirect_url;

    @NonNull
    @Column(name = "alert_is_checked", columnDefinition = "TINYINT", length = 1)
    @ColumnDefault("0")
    private int isChecked;
}