package com.ssafy.alta.service;

import com.ssafy.alta.repository.CodeRepository;
import com.ssafy.alta.repository.CommentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * packageName 	: com.ssafy.alta.service
 * fileName 	: CodeService
 * author 	    : 우정연
 * date		    : 2022-04-26
 * description	: 코드 SErvice
 * ===========================================================
 * DATE 		AUTHOR 		      NOTE
 * -----------------------------------------------------------
 * 2022-04-26	    우정연  		    최초 생성
 */

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class CodeService {
    private final CodeRepository codeRepository;
    private final CommentRepository commentRepository;
}
