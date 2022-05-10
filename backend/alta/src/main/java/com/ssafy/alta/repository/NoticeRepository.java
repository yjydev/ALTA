package com.ssafy.alta.repository;

import com.ssafy.alta.entity.Notice;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * packageName 	: com.ssafy.alta.repository
 * fileName 	: NoticeRepository
 * author 	    : jisoon Lee
 * date		    : 2022-05-10
 * description	:
 * ===========================================================
 * DATE             AUTHOR              NOTE
 * -----------------------------------------------------------
 * 2022-05-10       jisoon Lee         최초 생성
 */
public interface NoticeRepository extends JpaRepository<Notice, Long> {
}
