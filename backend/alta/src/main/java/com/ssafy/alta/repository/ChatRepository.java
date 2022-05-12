package com.ssafy.alta.repository;

import com.ssafy.alta.entity.Chat;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * packageName 	: com.ssafy.alta.repository
 * fileName 	: ChatRepository
 * author 	    : jisoon Lee
 * date		    : 2022-05-12
 * description	:
 * ===========================================================
 * DATE             AUTHOR              NOTE
 * -----------------------------------------------------------
 * 2022-05-12       jisoon Lee         최초 생성
 */
public interface ChatRepository extends JpaRepository<Chat, Long> {
    List<Chat> findByStudyStudyId(Long studyId);
}
