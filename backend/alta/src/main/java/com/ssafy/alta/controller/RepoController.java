package com.ssafy.alta.controller;


import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.alta.config.GithubConfig;
import com.ssafy.alta.dto.GithubIssueRequest;
import com.ssafy.alta.dto.GithubRepoRequest;
import com.ssafy.alta.dto.GithupFileUploadRequest;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Base64;

/**
 * packageName 	: com.ssafy.alta.gitutil
 * fileName 	: RepoController
 * author 	    : 김유진
 * date		    : 2022-04-26
 * description	:
 * ===========================================================
 * DATE 		    AUTHOR 		        NOTE
 * -----------------------------------------------------------
 * 2022-04-26	    김유진  		        최초 생성
 */
@RestController
@RequestMapping("/api/github")
public class RepoController {

    @Autowired
    GithubConfig config;

    @Autowired
    RestTemplate restTemplate;

    private static final String AUTH = "Authorization";

    @PostMapping("/issue")
    @ApiOperation(value = "issue 테스트", notes = "이슈 테스트")
    public ResponseEntity createIssue(@ModelAttribute GithubIssueRequest issue) throws JsonProcessingException {
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.set(AUTH, "token " + config.getOauthkey());

        String jsonString = new ObjectMapper().writeValueAsString(issue);
        HttpEntity<String> httpEntity = new HttpEntity<>(jsonString, httpHeaders);

        return restTemplate
                .exchange(
                        "https://api.github.com/repos/ssafytest001/test/issues",
                        HttpMethod.POST,
                        httpEntity,
                        String.class
                );
    }

    @PostMapping("/repo")
    @ApiOperation(value = "repo 생성 테스트", notes = "레포지토리 생성 테스트")
    public ResponseEntity createRepo(GithubRepoRequest repo) throws JsonProcessingException {
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.set(AUTH, "token " + config.getOauthkey());
        httpHeaders.set("accept", "application/vnd.github.v3+json");
        for (String key : httpHeaders.keySet())
            System.out.println(key + " : " + httpHeaders.get(key));
        String jsonString = new ObjectMapper().writeValueAsString(repo);
        HttpEntity<String> httpEntity = new HttpEntity<>(jsonString, httpHeaders);

        return restTemplate
                .exchange(
                        "https://api.github.com/user/repos",
                        HttpMethod.POST,
                        httpEntity,
                        String.class
                );
    }

    @PutMapping("/file")
    @ApiOperation(value = "file 업로드 하기", notes = "Oauth 주인 레포지토리에 파일 업로드하기")
    public ResponseEntity putFile(@RequestPart("codingFile") MultipartFile file, GithupFileUploadRequest githupFileUploadRequest) throws IOException, NoSuchAlgorithmException {
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.set(AUTH, "token " + config.getOauthkey());
        httpHeaders.set("accept", "application/vnd.github.v3+json");

        String fileContent = new String(Base64.getEncoder().encode(file.getBytes()));
        MessageDigest md = MessageDigest.getInstance("SHA-256");
        md.update(fileContent.getBytes(StandardCharsets.UTF_8));

        githupFileUploadRequest.setContent(fileContent);
        githupFileUploadRequest.setSha(new String(md.digest(),StandardCharsets.UTF_8));

        System.out.println(githupFileUploadRequest.getBranch());
        System.out.println(githupFileUploadRequest.getContent());
        System.out.println(githupFileUploadRequest.getSha());
        System.out.println(githupFileUploadRequest.getMessage());


        String jsonString = new ObjectMapper().writeValueAsString(githupFileUploadRequest);
        System.out.println(jsonString);
        HttpEntity<String> httpEntity = new HttpEntity<>(jsonString, httpHeaders);
        String path = "/" + file.getOriginalFilename();
        return restTemplate
                .exchange(
                        "https://api.github.com/repos/" + config.getUsername() + "/" + config.getReponame() + "/contents/" + path,
                        HttpMethod.PUT,
                        httpEntity,
                        String.class
                );

    }


    @GetMapping("/file")
    @ApiOperation(value = "repo 경로의 file 리스트 가져오기", notes = "repo 경로의 file 리스트 가져오기")
    public ResponseEntity getFile() {
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.set(AUTH, "token " + config.getOauthkey());
        httpHeaders.set("accept", "application/vnd.github.v3+json");


        HttpEntity<String> httpEntity = new HttpEntity<>("", httpHeaders);
        String path = "/";
        return restTemplate
                .exchange(
                        "https://api.github.com/repos/" + config.getUsername() + "/" + config.getReponame() + "/contents/" + path,
                        HttpMethod.GET,
                        httpEntity,
                        String.class
                );

    }

    @GetMapping("/repo")
    @ApiOperation(value = "repo 리스트 가져오기", notes = "레포지토리 리스트 가져오기 테스트 테스트")
    public ResponseEntity getRepo() throws JsonProcessingException {
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.set(AUTH, "token " + config.getOauthkey());
        httpHeaders.set("Accept", "application/vnd.github.v3+json");


        HttpEntity<String> httpEntity = new HttpEntity<>("", httpHeaders);

        return restTemplate
                .exchange(
                        "https://api.github.com/users/" + config.getUsername() + "/repos",
                        HttpMethod.GET,
                        httpEntity,
                        String.class
                );
    }

    @GetMapping("/commit")
    @ApiOperation(value = "commit 가져오기 테스트", notes = "commit 가져오기 테스트")
    public ResponseEntity getCommit() throws JsonProcessingException {
        HttpHeaders httpHeaders = new HttpHeaders();
//        httpHeaders.set(AUTH, "token " + config.getOauthkey());
        httpHeaders.set("Accept", "application/vnd.github.v3+json");


        HttpEntity<String> httpEntity = new HttpEntity<>("", httpHeaders);

        return restTemplate
                .exchange(
                        "https://api.github.com/repos/" + config.getUsername() + "/test/commits",
                        HttpMethod.GET,
                        httpEntity,
                        String.class
                );
    }


}