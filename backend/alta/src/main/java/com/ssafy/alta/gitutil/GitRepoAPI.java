package com.ssafy.alta.gitutil;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.alta.config.GithubConfig;
import com.ssafy.alta.dto.request.GithubRepoRequest;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;

/**
 * packageName 	: com.ssafy.alta.gitutil
 * fileName 	: GitRepoAPI
 * author 	    : 김유진
 * date		    : 2022-04-29
 * description	:
 * ===========================================================
 * DATE 		    AUTHOR 		        NOTE
 * -----------------------------------------------------------
 * 2022-04-29	        김유진  		        최초 생성
 */
public class GitRepoAPI {
    private RestTemplate restTemplate = new RestTemplate();

    public String insertRepo(String token, GithubRepoRequest githubRepoRequest) throws JsonProcessingException {
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.set(GithubConfig.AUTH, "token " + token);
        httpHeaders.set("Accept", "application/vnd.github.v3+json");
        httpHeaders.set("Content-Type", "application/json");

        String jsonBody = new ObjectMapper().writeValueAsString(githubRepoRequest);

        HttpEntity<String> httpEntity = new HttpEntity<>(jsonBody, httpHeaders);
        String url = "https://api.github.com/user/repos";

        ResponseEntity<HashMap> response = restTemplate.exchange(url, HttpMethod.POST, httpEntity, HashMap.class);

        return  response.getStatusCode().toString();
    }
}