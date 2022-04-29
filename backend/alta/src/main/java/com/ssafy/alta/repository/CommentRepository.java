package com.ssafy.alta.repository;

import com.ssafy.alta.entity.Code;
import com.ssafy.alta.entity.Comment;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

/**
 * packageName 	: com.ssafy.alta.repository
 * fileName 	: CommentRepository
 * author 	    : 우정연
 * date		    : 2022-04-26
 * description	: 코드 댓글 레포지토리
 * ===========================================================
 * DATE 		AUTHOR 		      NOTE
 * -----------------------------------------------------------
 * 2022-04-26	    우정연  		    최초 생성
 */
public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findCommentsByCodeOrderByCreateDateDesc(Code code);

    @Modifying
    @Query("update Comment c set c.isSolved=:value where c.code = :code and c.isSolved=false")
    void updateCodeSolvedByCodeId(@Param("code") Code code, @Param("value") Boolean value);
}
