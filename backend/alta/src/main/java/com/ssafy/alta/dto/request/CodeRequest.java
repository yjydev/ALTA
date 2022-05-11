package com.ssafy.alta.dto.request;

import com.ssafy.alta.entity.Code;
import com.ssafy.alta.entity.Problem;
import com.ssafy.alta.entity.User;
import com.ssafy.alta.util.FileLanguageUtil;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

/**
 * packageName 	: com.ssafy.alta.dto.request
 * fileName 	: CodeRequest
 * author 	    : 우정연
 * date		    : 2022-04-26
 * description	: 코드 추가 요청 정보
 * ===========================================================
 * DATE 		AUTHOR 		      NOTE
 * -----------------------------------------------------------
 * 2022-04-26	    우정연  		    최초 생성
 */
@ApiModel(value = "코드 추가 요청 정보")
@Getter
@Setter
@AllArgsConstructor
public class CodeRequest {
    @ApiModelProperty(value = "커밋 메시지")
    private String commitMessage;

    @ApiModelProperty(value = "생성, 재업로드 시 - 파일이름.확장자 / 수정 시 - 파일이름", required = true)
    private String fileName;

    @ApiModelProperty(value = "문제 키", required = true)
    private Long problemId;

    @ApiModelProperty(value = "코드 내용", required = true)
    private String content;

    // 생성, 재업로드 시에만 사용(수정 X)
    public Code toCode(User user, Problem problem) {
        Code code = Code.builder()
                .content(content)
                .fileName(fileName)
                .user(user)
                .problem(problem)
                .build();
        return code;
    }
}
