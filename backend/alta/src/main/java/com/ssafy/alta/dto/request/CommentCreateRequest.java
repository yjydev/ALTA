package com.ssafy.alta.dto.request;

import com.ssafy.alta.entity.Code;
import com.ssafy.alta.entity.Comment;
import com.ssafy.alta.entity.User;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

/**
 * packageName 	: com.ssafy.alta.dto.request
 * fileName 	: CommentRequest
 * author 	    : 우정연
 * date		    : 2022-04-29
 * description	: 댓글 요청 정보
 * ===========================================================
 * DATE 		AUTHOR 		      NOTE
 * -----------------------------------------------------------
 * 2022-04-29	    우정연  		    최초 생성
 */

@ApiModel(value = "댓글 추가 요청 정보")
@Getter
@Builder
@ToString
public class CommentCreateRequest {
    @ApiModelProperty(value = "코드 키", required = true)
    private Long code_id;
    @ApiModelProperty(value = "댓글 내용", required = true)
    private String content;
    @ApiModelProperty(value = "코드 줄", required = true)
    private Integer line;

    public Comment toEntity(User user, Code code) {
        return Comment.builder()
                .code(code)
                .user(user)
                .content(content)
                .line(line)
                .build();
    }
}
