package com.ssafy.alta.controller;

import com.ssafy.alta.dto.request.CommentCreateRequest;
import com.ssafy.alta.dto.request.CommentUpdateRequest;
import com.ssafy.alta.dto.request.CommentUpdateSolvedRequest;
import com.ssafy.alta.service.CommentService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * packageName 	: com.ssafy.alta.controller
 * fileName 	: CommentController
 * author 	    : 우정연
 * date		    : 2022-04-29
 * description	: 코드 댓글 관련 기능 제공
 * ===========================================================
 * DATE 		AUTHOR 		      NOTE
 * -----------------------------------------------------------
 * 2022-04-29	    우정연  		    최초 생성
 */
@Api("코드 댓글 관련 기능")
@RestController
@RequestMapping("/api/code/review")
@RequiredArgsConstructor
public class CommentController {
    private final CommentService commentService;

    @PostMapping
    @ApiOperation(value = "코드 댓글 추가", notes = "새 댓글을 생성합니다.")
    public ResponseEntity insertComment(@ApiParam(value = "댓글 정보", required = true) @RequestBody CommentCreateRequest commentRequest) {
        String userId = "11";
        commentService.insertComment(commentRequest);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/{review_id}")
    @ApiOperation(value = "코드 댓글 삭제", notes = "댓글을 삭제합니다.")
    public ResponseEntity deleteComment(@ApiParam(value = "댓글 키", required = true) @PathVariable("review_id") Long reviewId) {
        commentService.deleteComment(reviewId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping("/{review_id}")
    @ApiOperation(value = "코드 댓글 업데이터", notes = "댓글의 내용, 줄, 상태를 변경합니다.(변경 안할 값은 값을 그대로 보냄)")
    public ResponseEntity updateComment(@ApiParam(value = "댓글 키", required = true) @PathVariable("review_id")Long reviewId, @ApiParam(value = "변경할 댓글 정보", required = true) @RequestBody CommentUpdateRequest commentUpdateRequest) {
        String userId = "11";
        commentService.updateComment(reviewId, commentUpdateRequest);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    @PutMapping("/{review_id}/solved")
    @ApiOperation(value = "코드 댓글 상태 변경", notes = "댓글 해결 여부를 변경합니다.")
    public ResponseEntity updateCommentSolved(@ApiParam(value = "댓글 키", required = true) @PathVariable("review_id") Long reviewId, @ApiParam(value = "댓글 상태", required = true) @RequestBody CommentUpdateSolvedRequest request) {
        String userId = "11";
        commentService.updateCommentSolved(reviewId, request.getIs_solved());
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
