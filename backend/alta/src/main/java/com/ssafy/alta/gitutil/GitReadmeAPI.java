package com.ssafy.alta.gitutil;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.alta.config.GithubConfig;
import com.ssafy.alta.dto.request.ReadmeUpdateRequest;
import org.springframework.http.*;
import org.springframework.web.client.RestTemplate;

import java.beans.Encoder;
import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.HashMap;

/**
 * packageName 	: com.ssafy.alta.gitutil
 * fileName 	: GitReadmeAPI
 * author 	    : 김유진
 * date		    : 2022-05-06
 * description	:
 * ===========================================================
 * DATE 		    AUTHOR 		        NOTE
 * -----------------------------------------------------------
 * 2022-05-06	        김유진  		        최초 생성
 */
public class GitReadmeAPI {
    private RestTemplate restTemplate = new RestTemplate();

    public HttpStatus updateReadme(String token, String owner, String repoName, ReadmeUpdateRequest readmeUpdateRequest) throws JsonProcessingException {
        HttpHeaders httpHeaders = setHttpHeaders(token);

        String url = "https://api.github.com/repos/"+owner+"/"+repoName+"/contents/README.md";

//        String encodedContent = Base64.getEncoder().encodeToString(readmeUpdateRequest.getContent().replaceAll("\\r\\n|\\r|\\n", "").getBytes(StandardCharsets.UTF_8));
        String encodedContent = Base64.getEncoder().encodeToString(readmeUpdateRequest.getContent().getBytes(StandardCharsets.UTF_8));
        readmeUpdateRequest.setContent(encodedContent);

        String jsonBody = new ObjectMapper().writeValueAsString(readmeUpdateRequest);

        HttpEntity<String> httpEntity = new HttpEntity<>(jsonBody, httpHeaders);

        ResponseEntity<HashMap> response = restTemplate.exchange(url, HttpMethod.PUT, httpEntity, HashMap.class);
        return response.getStatusCode();
    }

    public String selectReadmeSHA(String token, String owner, String repoName){
        HttpHeaders httpHeaders = setHttpHeaders(token);
        HttpEntity<String> httpEntity = new HttpEntity<>(httpHeaders);
        String url = "https://api.github.com/repos/"+owner+"/"+repoName+"/contents/README.md";
        ResponseEntity<HashMap> response = restTemplate.exchange(url, HttpMethod.GET, httpEntity, HashMap.class);

        return (String) response.getBody().get("sha");
    }

    private HttpHeaders setHttpHeaders(String token) {
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.set(GithubConfig.AUTH, "token " + token);
        httpHeaders.set("Accept", "application/vnd.github.v3+json");
        httpHeaders.set("Content-Type", "application/json");

        return httpHeaders;
    }
}