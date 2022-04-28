package com.ssafy.alta.service;

import com.nimbusds.jose.shaded.json.JSONObject;
import com.ssafy.alta.dto.request.CodeRequest;
import com.ssafy.alta.entity.Code;
import com.ssafy.alta.entity.Problem;
import com.ssafy.alta.entity.User;
import com.ssafy.alta.exception.DataNotFoundException;
import com.ssafy.alta.repository.CodeRepository;
import com.ssafy.alta.repository.ProblemRepository;
import com.ssafy.alta.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.Optional;

/**
 * packageName 	: com.ssafy.alta.service
 * fileName 	: CodeService
 * author 	    : 우정연
 * date		    : 2022-04-26
 * description	: 코드 Service
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
    private final UserRepository userRepository;
    private final ProblemRepository problemRepository;

    @Transactional(rollbackFor = Exception.class)
    public void insertCode(String userId, String token, CodeRequest codeRequest) {
        Optional<Problem> optProblem = Optional.ofNullable(problemRepository.findById(codeRequest.getProblemId())
                .orElseThrow(DataNotFoundException::new));
        Optional<User> optUser = Optional.ofNullable(userRepository.findById(userId)
                .orElseThrow(DataNotFoundException::new));
        String studyLeaderUserName = userRepository.findStudyLeaderUserNameByStudyId(codeRequest.getStudyId());
        Code code = codeRequest.toCode(optUser.get(), optProblem.get());
        codeRepository.save(code);

        String path = codeRequest.getPath();
        String base64Content = Base64.getEncoder().encodeToString(codeRequest.getContent().getBytes(StandardCharsets.UTF_8));
        JSONObject json = new JSONObject();
        json.put("message", codeRequest.getMessage());
        json.put("content", base64Content);
        // json.put("branch", develop);


        String sha = "";
        code.changeSha(sha);
        codeRepository.save(code);

    }
}
