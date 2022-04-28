package com.ssafy.alta.service;

import com.ssafy.alta.dto.response.CommentResponse;
import com.ssafy.alta.entity.Code;
import com.ssafy.alta.entity.Comment;
import com.ssafy.alta.repository.CommentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

/**
 * packageName 	: com.ssafy.alta.service
 * fileName 	: CommentService
 * author 	    : 우정연
 * date		    : 2022-04-26
 * description	: 코드 댓글 Service
 * ===========================================================
 * DATE 		AUTHOR 		      NOTE
 * -----------------------------------------------------------
 * 2022-04-26	    우정연  		    최초 생성
 */
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class CommentService {
    private final CommentRepository commentRepository;

    public List<CommentResponse> selectCommentList(Code code) {
        List<Comment> commentList = commentRepository.findCommentsByCodeOrderByLineAsc(code);
        List<CommentResponse> commentResponseList = new ArrayList<>();
        for(Comment comment : commentList) {
            commentResponseList.add(comment.toDto());
        }
        return commentResponseList;
    }
}
