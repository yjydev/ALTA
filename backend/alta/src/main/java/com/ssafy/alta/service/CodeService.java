package com.ssafy.alta.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.ssafy.alta.dto.request.CodeRequest;
import com.ssafy.alta.dto.request.GitCodeCreateRequest;
import com.ssafy.alta.dto.request.GitCodeDeleteRequest;
import com.ssafy.alta.dto.response.CodeInfoResponse;
import com.ssafy.alta.dto.response.GitCodeResponse;
import com.ssafy.alta.entity.Code;
import com.ssafy.alta.entity.Problem;
import com.ssafy.alta.entity.Study;
import com.ssafy.alta.entity.User;
import com.ssafy.alta.exception.DataNotFoundException;
import com.ssafy.alta.gitutil.GitCodeAPI;
import com.ssafy.alta.repository.CodeRepository;
import com.ssafy.alta.repository.ProblemRepository;
import com.ssafy.alta.repository.StudyRepository;
import com.ssafy.alta.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.HttpClientErrorException;

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
    private final StudyRepository studyRepository;
    private final CommentService commentService;
    private final UserService userService;
    private final RedisService redisService;
    private final GitCodeAPI gitCodeAPI = new GitCodeAPI();
    private static final String DELETE_MESSAGE = "파일 삭제";
    private static final String CREATE_MESSAGE = "파일 생성";

    @Transactional(rollbackFor = Exception.class)
    public void insertCode(Long studyId, CodeRequest codeRequest) throws JsonProcessingException {
        String userId = userService.getCurrentUserId();
        String token = redisService.getAccessToken();

        Optional<Study> optStudy = Optional.ofNullable(studyRepository.findById(studyId)
                .orElseThrow(DataNotFoundException::new));
        Optional<Problem> optProblem = Optional.ofNullable(problemRepository.findById(codeRequest.getProblem_id())
                .orElseThrow(DataNotFoundException::new));
        Optional<User> optUser = Optional.ofNullable(userRepository.findById(userId)
                .orElseThrow(DataNotFoundException::new));

        Study study = optStudy.get();
        Code code = codeRequest.toCode(optUser.get(), optProblem.get());
        User user = optUser.get();

        String studyLeaderUserName = userRepository.findStudyLeaderUserNameByUserId(study.getUser().getId());
        codeRepository.save(code);

        String commit_message = codeRequest.getCommit_message();

        // 커밋 메시지 빈 경우 default값 달아주기
        if(commit_message == null || commit_message.equals("")) {
            commit_message = CREATE_MESSAGE;
        }
        String path = this.getPath(code.getProblem().getName(), user.getName(), codeRequest.getFile_name());
        System.out.println(path);
        String base64Content = Base64.getEncoder().encodeToString(codeRequest.getContent().getBytes(StandardCharsets.UTF_8));
        GitCodeCreateRequest request = GitCodeCreateRequest.builder()
                .content(base64Content)
                .message(commit_message)
                .branch("main")
                .build();

        String sha = gitCodeAPI.manipulate(token, studyLeaderUserName, study.getRepositoryName(), path, HttpMethod.PUT, request);

        code.changeSha(sha);
        codeRepository.save(code);

    }

    @Transactional(rollbackFor = Exception.class)
    public CodeInfoResponse selectCode(Long studyId, Long codeId) {
        String userId = userService.getCurrentUserId();
        String token = redisService.getAccessToken();

        Optional<Study> optStudy = Optional.ofNullable(studyRepository.findById(studyId)
                .orElseThrow(DataNotFoundException::new));
        Optional<Code> optCode = Optional.ofNullable(codeRepository.findById(codeId)
                .orElseThrow(DataNotFoundException::new));
        Optional<User> optUser = Optional.ofNullable(userRepository.findById(userId)
                .orElseThrow(DataNotFoundException::new));

        Study study = optStudy.get();
        Code code = optCode.get();
        User user = optUser.get();

        String studyLeaderUserName = userRepository.findStudyLeaderUserNameByUserId(study.getUser().getId());
        String repo = study.getRepositoryName();

        String path = this.getPath(code.getProblem().getName(), user.getName(), code.getFileName());

        GitCodeResponse gitCodeResponse = null;
        // 조회의 경우, git에서 찾았는데 없으면 새로 생성해줌
        try {
            gitCodeResponse = gitCodeAPI.selectFile(token, studyLeaderUserName, repo, path);
        } catch(HttpClientErrorException e) {
            System.out.println("조회할 파일이 github에 없음");
            e.printStackTrace();
        }

        // if(gitCodeResponse == null) {}

        if(gitCodeResponse != null && !gitCodeResponse.getSha().equals(code.getSha())) {   // 서버에서 변경이 발생하면
            code.changeShaAndContent(gitCodeResponse.getSha(), gitCodeResponse.getContent());  // sha값과 내용 바꿔주고 저장
            commentService.updateCommentListSolved(code);       // 해당 코드의 해결안된 이전 댓글들 다 해결로 변환
        }

        return code.toCodeAndCommentResponse();
    }

    @Transactional(rollbackFor = Exception.class)
    public void deleteCode(Long studyId, Long codeId) throws JsonProcessingException {
        String userId = userService.getCurrentUserId();
        String token = redisService.getAccessToken();

        Optional<Study> optStudy = Optional.ofNullable(studyRepository.findById(studyId)
                .orElseThrow(DataNotFoundException::new));
        Optional<Code> optCode = Optional.ofNullable(codeRepository.findById(codeId)
                .orElseThrow(DataNotFoundException::new));
        Optional<User> optUser = Optional.ofNullable(userRepository.findById(userId)
                .orElseThrow(DataNotFoundException::new));

        Study study = optStudy.get();
        Code code = optCode.get();
        User user = optUser.get();

        String studyLeaderUserName = userRepository.findStudyLeaderUserNameByUserId(study.getUser().getId());
        String repo = study.getRepositoryName();

        String path = this.getPath(code.getProblem().getName(), user.getName(), code.getFileName());

        GitCodeResponse gitCodeResponse = null;
        // 삭제의 경우, git에서 찾았는데 없으면 걸러서 DB것도 삭제되게 해야 함
        try {
            gitCodeResponse = gitCodeAPI.selectFile(token, studyLeaderUserName, repo, path);
        } catch(HttpClientErrorException e) {
            e.printStackTrace();
            System.out.println("삭제할 파일이 github에 없음");
        }

        // git에 해당 코드가 있다면 - 그 코드도 삭제
        if(gitCodeResponse != null) {   // 해당 코드가 있고
            if(!gitCodeResponse.getSha().equals(code.getSha()))   // 서버에서 변경이 발생하면
                code.changeShaAndContent(gitCodeResponse.getSha(), gitCodeResponse.getContent());  // sha값과 내용 바꿔주고 저장

            GitCodeDeleteRequest request = GitCodeDeleteRequest.builder()
                    .message(DELETE_MESSAGE)
                    .branch("main")
                    .sha(code.getSha())
                    .build();

            gitCodeAPI.manipulate(token, studyLeaderUserName, study.getRepositoryName(), path, HttpMethod.DELETE, request);

        }
        
        // DB에서 삭제
        codeRepository.deleteById(codeId);

    }

    public String getPath(String problemName, String userName, String fileName) {
        return "/" + problemName + "/" + problemName + "_" + userName + "/" + fileName;
    }
}
