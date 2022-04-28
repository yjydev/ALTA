package com.ssafy.alta.controller;


import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.alta.config.GithubConfig;
import com.ssafy.alta.dto.GithubIssueRequest;
import com.ssafy.alta.dto.GithubRepoRequest;
import io.swagger.annotations.ApiOperation;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

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
@RequestMapping("/api/test")
public class RepoController {

    @Autowired
    GithubConfig config;

    @Autowired
    RestTemplate restTemplate;

    private static final String AUTH = "Authorization";

    @PostMapping("/issue")
    @ApiOperation(value = "issue 테스트", notes = "이슈 테스트")
    public ResponseEntity<?> createIssue(@ModelAttribute GithubIssueRequest issue) throws JsonProcessingException {
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
    public ResponseEntity<?> createRepo( GithubRepoRequest repo) throws JsonProcessingException {
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.set(AUTH, "token " + config.getOauthkey());
        httpHeaders.set("accept", "application/vnd.github.v3+json");
        for(String key : httpHeaders.keySet())
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

    @GetMapping("/repo")
    @ApiOperation(value = "repo 리스트 가져오기", notes = "레포지토리 리스트 가져오기 테스트 테스트")
    public ResponseEntity<?> getRepo() throws JsonProcessingException {
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.set(AUTH, "token " + config.getOauthkey());
        httpHeaders.set("Accept", "application/vnd.github.v3+json");


        HttpEntity<String> httpEntity = new HttpEntity<>("", httpHeaders);

        return restTemplate
                .exchange(
                        "https://api.github.com/users/"+config.getUsername()+"/repos",
                        HttpMethod.GET,
                        httpEntity,
                        String.class
                );
    }

    @GetMapping("/commit")
    @ApiOperation(value = "commit 가져오기 테스트", notes = "commit 가져오기 테스트")
    public ResponseEntity<?> getCommit() throws JsonProcessingException {
        HttpHeaders httpHeaders = new HttpHeaders();
//        httpHeaders.set(AUTH, "token " + config.getOauthkey());
        httpHeaders.set("Accept", "application/vnd.github.v3+json");


        HttpEntity<String> httpEntity = new HttpEntity<>("", httpHeaders);

        return restTemplate
                .exchange(
                        "https://api.github.com/repos/"+config.getUsername()+"/test/commits",
                        HttpMethod.GET,
                        httpEntity,
                        String.class
                );
    }



}