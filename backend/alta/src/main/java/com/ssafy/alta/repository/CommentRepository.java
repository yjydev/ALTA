package com.ssafy.alta.repository;

import com.ssafy.alta.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * 코드의 댓글 repository
 *
 * @author 우정연
 * created on 2022-04-26
 */


public interface CommentRepository extends JpaRepository<Comment, Long> {
}
