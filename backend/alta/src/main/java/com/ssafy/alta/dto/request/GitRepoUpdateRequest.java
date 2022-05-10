package com.ssafy.alta.dto.request;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

import java.util.HashMap;
import java.util.List;

/**
 * packageName 	: com.ssafy.alta.dto.request
 * fileName 	: GitRepoUpdateRequest
 * author 	    : jisoon Lee
 * date		    : 2022-05-04
 * description	:
 * ===========================================================
 * DATE             AUTHOR              NOTE
 * -----------------------------------------------------------
 * 2022-05-04       jisoon Lee         최초 생성
 */
@Getter
@Builder
@ToString
public class GitRepoUpdateRequest {
    private String base_sha;
    private List<HashMap> tree;
}
