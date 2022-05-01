package com.ssafy.alta.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.nimbusds.jose.shaded.json.JSONObject;
import com.ssafy.alta.dto.request.CodeRequest;
import com.ssafy.alta.dto.request.GitCodeCreateRequest;
import com.ssafy.alta.dto.response.CodeAndCommentResponse;
import com.ssafy.alta.dto.response.CommentResponse;
import com.ssafy.alta.dto.response.GitCodeResponse;
import com.ssafy.alta.entity.*;
import com.ssafy.alta.exception.DataNotFoundException;
import com.ssafy.alta.gitutil.GitCodeAPI;
import com.ssafy.alta.repository.CodeRepository;
import com.ssafy.alta.repository.ProblemRepository;
import com.ssafy.alta.repository.StudyRepository;
import com.ssafy.alta.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.List;
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
    private final StudyRepository studyRepository;
    private final CommentService commentService;
    private final GitCodeAPI gitCodeAPI = new GitCodeAPI();

    @Transactional(rollbackFor = Exception.class)
    public void insertCode(Long studyId, String userId, String token, CodeRequest codeRequest) throws JsonProcessingException {
        Optional<Study> optStudy = Optional.ofNullable(studyRepository.findById(studyId)
                .orElseThrow(DataNotFoundException::new));
        Optional<Problem> optProblem = Optional.ofNullable(problemRepository.findById(codeRequest.getProblemId())
                .orElseThrow(DataNotFoundException::new));
        Optional<User> optUser = Optional.ofNullable(userRepository.findById(userId)
                .orElseThrow(DataNotFoundException::new));
        Study study = optStudy.get();
        String studyLeaderUserName = userRepository.findStudyLeaderUserNameByUserId(study.getUser().getId());
        Code code = codeRequest.toCode(optUser.get(), optProblem.get());
        codeRepository.save(code);

        String path = codeRequest.getPath();
        String base64Content = Base64.getEncoder().encodeToString(codeRequest.getContent().getBytes(StandardCharsets.UTF_8));
        GitCodeCreateRequest request = GitCodeCreateRequest.builder()
                .content(base64Content)
                .message(codeRequest.getMessage())
                .branch("main")
                .build();

        String sha = gitCodeAPI.insertFile(token, studyLeaderUserName, study.getRepositoryName(), path, request);

        code.changeSha(sha);
        codeRepository.save(code);

    }

    @Transactional(rollbackFor = Exception.class)
    public CodeAndCommentResponse selectCodeAndComments(Long studyId, Long codeId, String token) {
        Code code = this.updateCodeByGit(studyId, codeId, token);
        List<CommentResponse> commentList = commentService.selectCommentList(code);

        return code.toCodeAndCommentResponse(commentList);
    }

    @Transactional(rollbackFor = Exception.class)
    public void deleteCode(Long studyId, Long codeId, String token) {
        this.updateCodeByGit(studyId, codeId, token);
        codeRepository.deleteById(codeId);

    }

    @Transactional(rollbackFor = Exception.class)
    Code updateCodeByGit(Long studyId, Long codeId, String token) {
        updateCodeByGit(studyId, codeId, token);
        Optional<Study> optStudy = Optional.ofNullable(studyRepository.findById(studyId)
                .orElseThrow(DataNotFoundException::new));
        Optional<Code> optCode = Optional.ofNullable(codeRepository.findById(codeId)
                .orElseThrow(DataNotFoundException::new));

        Study study = optStudy.get();
        Code code = optCode.get();

        String studyLeaderUserName = userRepository.findStudyLeaderUserNameByUserId(study.getUser().getId());
        String repo = study.getRepositoryName();
        String path = code.getPath();

        GitCodeResponse gitCodeResponse = gitCodeAPI.selectFile(token, studyLeaderUserName, repo, path);
        if(!gitCodeResponse.getSha().equals(code.getSha())) {   // 서버에서 변경이 발생하면
            code.changeShaAndContent(gitCodeResponse.getSha(), gitCodeResponse.getContent());  // sha값과 내용 바꿔주고 저장
            commentService.updateCommentListSolved(code);       // 해당 코드의 해결안된 이전 댓글들 다 해결로 변환
        }
        return code;
    }
}
