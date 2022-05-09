package com.ssafy.alta.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.ssafy.alta.dto.request.CodeRequest;
import com.ssafy.alta.dto.request.GitCodeDeleteRequest;
import com.ssafy.alta.dto.request.GitCodeUpdateRequest;
import com.ssafy.alta.dto.response.CodeInfoResponse;
import com.ssafy.alta.dto.response.GitCodeResponse;
import com.ssafy.alta.entity.*;
import com.ssafy.alta.exception.*;
import com.ssafy.alta.gitutil.GitCodeAPI;
import com.ssafy.alta.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.HttpClientErrorException;

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
@Transactional
@RequiredArgsConstructor
public class CodeService {
    private final CodeRepository codeRepository;
    private final UserRepository userRepository;
    private final ProblemRepository problemRepository;
    private final StudyRepository studyRepository;
    private final StudyJoinInfoRepository studyJoinInfoRepository;
    private final CommentService commentService;
    private final UserService userService;
    private final RedisService redisService;
    private final GitCodeAPI gitCodeAPI = new GitCodeAPI();
    private static final String DELETE_MESSAGE = "파일 삭제";
    private static final String CREATE_MESSAGE = "파일 생성";
    private static final String BRANCH = "main";

    @Transactional(rollbackFor = Exception.class)
    public void insertCode(Long studyId, CodeRequest codeRequest) throws JsonProcessingException {
//         변수값들 가져옴
        String userId = userService.getCurrentUserId();
        String token = redisService.getAccessToken();

        Optional<Study> optStudy = Optional.ofNullable(studyRepository.findById(studyId)
                .orElseThrow(DataNotFoundException::new));
        Optional<User> optUser = Optional.ofNullable(userRepository.findById(userId)
                .orElseThrow(DataNotFoundException::new));
        Optional<Problem> optProblem = Optional.ofNullable(problemRepository.findById(codeRequest.getProblemId())
                .orElseThrow(DataNotFoundException::new));
        Optional<StudyJoinInfo> optSJI = Optional.ofNullable(studyJoinInfoRepository.findByStudyStudyIdAndUserId(studyId, userId)
                .orElseThrow(AccessDeniedStudyException::new));

        // 검증
        // 해당 스터디의 가입한 스터디원이 맞는지
        checkStudyJoinInfoState(optSJI.get().getState());
        // 해당 유저가 해당 문제에서 그 파일을 이미 만들었는지(파일 이름 겹치는지)
        checkFileName(codeRequest.getFileName(), userId, codeRequest.getProblemId());

        Study study = optStudy.get();
        Code code = codeRequest.toCode(optUser.get(), optProblem.get());
//        DB에 저장
        codeRepository.save(code);


//        중복 부분 호출 - 코드 github에 업로드
        this.createCodeInGithub(token, study, code, codeRequest);
    }


    @Transactional(rollbackFor = Exception.class)
    public CodeInfoResponse selectCode(Long studyId, Long codeId) throws JsonProcessingException {
        String userId = userService.getCurrentUserId();
        String token = redisService.getAccessToken();

        Optional<Study> optStudy = Optional.ofNullable(studyRepository.findById(studyId)
                .orElseThrow(DataNotFoundException::new));
        Optional<Code> optCode = Optional.ofNullable(codeRepository.findById(codeId)
                .orElseThrow(DataNotFoundException::new));
        Optional<StudyJoinInfo> optSJI = Optional.ofNullable(studyJoinInfoRepository.findByStudyStudyIdAndUserId(studyId, userId)
                .orElseThrow(AccessDeniedStudyException::new));

        // 검증 - 해당 스터디의 가입한 스터디원이 맞는지
        checkStudyJoinInfoState(optSJI.get().getState());

        Study study = optStudy.get();
        Code code = optCode.get();


        GitCodeResponse gitCodeResponse = selectCodeInGithub(token, study, code, false);

        if(gitCodeResponse != null && !gitCodeResponse.getSha().equals(code.getSha())) {   // 서버에서 변경이 발생하면
            code.changeShaAndContent(gitCodeResponse.getSha(), gitCodeResponse.getContent());  // sha값과 내용 바꿔주고 저장
            commentService.updateCommentListSolved(code);       // 해당 코드의 해결안된 이전 댓글들 다 해결로 변환
        }

        return code.toCodeInfoResponse();
    }


    @Transactional(rollbackFor = Exception.class)
    public void deleteCode(Long studyId, Long codeId) throws JsonProcessingException {
        String userId = userService.getCurrentUserId();
        String token = redisService.getAccessToken();

        Optional<Study> optStudy = Optional.ofNullable(studyRepository.findById(studyId)
                .orElseThrow(DataNotFoundException::new));
        Optional<Code> optCode = Optional.ofNullable(codeRepository.findById(codeId)
                .orElseThrow(DataNotFoundException::new));
        Optional<StudyJoinInfo> optSJI = Optional.ofNullable(studyJoinInfoRepository.findByStudyStudyIdAndUserId(studyId, userId)
                .orElseThrow(AccessDeniedStudyException::new));

        Study study = optStudy.get();
        Code code = optCode.get();

        // 검증
        // 작성자가 수정하는 건지 체크
        checkUserId(userId, code.getUser().getId());
        // 해당 스터디의 가입한 스터디원이 맞는지
        checkStudyJoinInfoState(optSJI.get().getState());

        // DB에서 삭제
        codeRepository.deleteById(code.getId());

        this.deleteCodeInGithub(token, study, code, false, "");
    }

    @Transactional(rollbackFor = Exception.class)
    public void updateCode(Long studyId, Long codeId, CodeRequest codeRequest, boolean isUpdate) throws JsonProcessingException {
        String userId = userService.getCurrentUserId();
        String token = redisService.getAccessToken();

        Optional<Study> optStudy = Optional.ofNullable(studyRepository.findById(studyId)
                .orElseThrow(DataNotFoundException::new));
        Optional<User> optUser = Optional.ofNullable(userRepository.findById(userId)
                .orElseThrow(DataNotFoundException::new));
        Optional<Code> optCode = Optional.ofNullable(codeRepository.findById(codeId)
                .orElseThrow(DataNotFoundException::new));
        Optional<StudyJoinInfo> optSJI = Optional.ofNullable(studyJoinInfoRepository.findByStudyStudyIdAndUserId(studyId, userId)
                .orElseThrow(AccessDeniedStudyException::new));

        Study study = optStudy.get();
        Code code = optCode.get();
        User user = optUser.get();
        String lastFileName = code.getFileName();

        // 검증
        // 작성자가 수정하는 건지 체크
        checkUserId(userId, code.getUser().getId());
        // 해당 스터디의 가입한 스터디원이 맞는지
        checkStudyJoinInfoState(optSJI.get().getState());
        if(!code.getFileName().equals(codeRequest.getFileName())) {
            // 파일 이름이 변경되었고 새로운 파일 이름에 대해 해당 유저가 해당 문제에서 그 파일을 이미 만들었는지(파일 이름 겹치는지)
            checkFileName(codeRequest.getFileName(), code.getUser().getId(), code.getProblem().getId());
        }

        // 코드 수정일 경우, -> 파일 이름, 내용 변경 -> DB에 적용
        if(isUpdate) {
            code.changeFile(codeRequest.getFileName(), codeRequest.getContent());
            commentService.updateCommentListSolved(code);       // 해당 코드의 해결안된 이전 댓글들 다 해결로 변환
        }
        // 코드 재업로드일 경우, -> 파일 삭제, 파일 생성
        else {
            codeRepository.deleteById(codeId);
            code = codeRequest.toCode(user, code.getProblem());
            codeRepository.save(code);
        }

        this.updateCodeInGithub(token, study, code, codeRequest, lastFileName);
    }

    @Transactional(rollbackFor = Exception.class)
    public void createCodeInGithub(String token, Study study, Code code, CodeRequest codeRequest) throws JsonProcessingException {
        String studyLeaderUserName = userRepository.findStudyLeaderUserNameByUserId(study.getUser().getId());
        String path = this.getPath(code.getProblem().getName(), code.getUser().getName(), codeRequest.getFileName());
        String url = getUrl(studyLeaderUserName, study.getRepositoryName(), path);
        String commitMessage = this.getCommitMessage(codeRequest.getCommitMessage());


        //        Git 조회 - Github에 이미 같은 이름의 파일이 업로드 되어있다면
        GitCodeResponse gitCodeResponse = null;
        try {
            gitCodeResponse = gitCodeAPI.selectFile(token, url);
        } catch(HttpClientErrorException e) {
            System.out.println("조회할 파일이 github에 없음");
            e.printStackTrace();
        }
//        같은 파일이 이미 Git에 업로도 되어 있으면 -> Exception 발생
        if(gitCodeResponse != null) {
            throw new DuplicateFileInGithubException();
        }

        String base64Content = Base64.getEncoder().encodeToString(code.getContent().getBytes(StandardCharsets.UTF_8));
        GitCodeUpdateRequest request = GitCodeUpdateRequest.builder()
                .content(base64Content)
                .message(commitMessage)
                .branch(BRANCH)
                .build();

//        Git 생성
        String sha = gitCodeAPI.manipulate(token, url, HttpMethod.PUT, request);

        code.changeSha(sha);
    }


    @Transactional(rollbackFor = Exception.class)
    public void deleteCodeInGithub(String token, Study study, Code code, boolean isUpdate, String lastFileName) throws JsonProcessingException {
        String studyLeaderUserName = userRepository.findStudyLeaderUserNameByUserId(study.getUser().getId());
        String fileName = isUpdate ? lastFileName : code.getFileName();
        String path = this.getPath(code.getProblem().getName(), code.getUser().getName(), fileName);
        String url = getUrl(studyLeaderUserName, study.getRepositoryName(), path);

        GitCodeResponse gitCodeResponse = null;
        // 삭제의 경우, git에서 찾았는데 없으면 걸러서 DB것도 삭제되게 해야 함
        try {
            gitCodeResponse = gitCodeAPI.selectFile(token, url);
        } catch(HttpClientErrorException e) {
            e.printStackTrace();
            System.out.println("삭제할 파일이 github에 없음");
        }

        // git에 해당 코드가 있다면 - 그 코드도 삭제
        if(gitCodeResponse != null) {   // 해당 코드가 있다면
            GitCodeDeleteRequest request = GitCodeDeleteRequest.builder()
                    .message(DELETE_MESSAGE)
                    .branch(BRANCH)
                    .sha(gitCodeResponse.getSha())  // 조회한 코드의 sha값으로 삭제
                    .build();

            gitCodeAPI.manipulate(token, url, HttpMethod.DELETE, request);

        }

    }

    public GitCodeResponse selectCodeInGithub(String token, Study study, Code code, boolean isUpdate) throws JsonProcessingException {
        String studyLeaderUserName = userRepository.findStudyLeaderUserNameByUserId(study.getUser().getId());
        String path = this.getPath(code.getProblem().getName(), code.getUser().getName(), code.getFileName());
        String url = getUrl(studyLeaderUserName, study.getRepositoryName(), path);


        GitCodeResponse gitCodeResponse = null;
        // 조회의 경우, git에서 찾았는데 없으면 새로 생성해줌
        try {
            gitCodeResponse = gitCodeAPI.selectFile(token, url);
        } catch(HttpClientErrorException e) {
            System.out.println("조회할 파일이 github에 없음");
            e.printStackTrace();
        }

        // 조회이면서 조회 결과가 없거나, 업데이트에서 조회했을 때
        if((!isUpdate && gitCodeResponse == null) || (isUpdate)) {
            String base64Content = Base64.getEncoder().encodeToString(code.getContent().getBytes(StandardCharsets.UTF_8));
            GitCodeUpdateRequest request = GitCodeUpdateRequest.builder()
                    .content(base64Content)
                    .message(CREATE_MESSAGE)
                    .branch(BRANCH)
                    .build();

            // 업데이트이면서 조회 결과가 있다면 sha값 변경
            if(isUpdate && gitCodeResponse != null) {   // 서버에서 변경이 발생하면
                request.setSha(gitCodeResponse.getSha());
            }

            String sha = gitCodeAPI.manipulate(token, url, HttpMethod.PUT, request);

            code.changeSha(sha);
        }
        return gitCodeResponse;
    }

    public void updateCodeInGithub(String token, Study study, Code code, CodeRequest codeRequest, String lastFileName) throws JsonProcessingException {
        if(!code.getFileName().equals(lastFileName)) {

            this.createCodeInGithub(token, study, code, codeRequest);
            this.deleteCodeInGithub(token, study, code, true, lastFileName);

        } else {
            this.selectCodeInGithub(token, study, code, true);
        }
    }

    private void checkUserId(String userId, String id) {
        if(userId != id)
            throw new WriterNotMatchException();
    }

    private void checkStudyJoinInfoState(String state) {
        if(!state.equals("가입")) {
            throw new AccessDeniedStudyException();
        }
    }

    private void checkFileName(String fileName, String userId, long problemId) {
        Code result = codeRepository.findCodeByFileNameAndUser_IdAndProblem_Id(fileName, userId, problemId);
        if(result != null)
            throw new DuplicateFileException();
    }

    public String getPath(String problemName, String userName, String fileName) {
        return "/풀이모음/" + problemName + "/" + userName + "/" + fileName;
    }

    private String getUrl(String owner, String repo, String path) {
        return "https://api.github.com/repos/" + owner + "/" + repo + "/contents" + path;
    }

    public String getCommitMessage(String commitMessage) {
        if(commitMessage == null || commitMessage.equals("")) {
            commitMessage = CREATE_MESSAGE;
        }
        return commitMessage;
    }

}
