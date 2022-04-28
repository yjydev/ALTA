package com.ssafy.alta.gitutil;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.alta.config.GithubConfig;
import com.ssafy.alta.dto.request.GitCodeCreateRequest;
import com.ssafy.alta.dto.response.GitCodeResponse;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

import java.util.Base64;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;

/**
 * packageName 	: com.ssafy.alta.gitutil
 * fileName 	: GitCodeAPI
 * author 	    : 우정연
 * date		    : 2022-04-28
 * description	:
 * ===========================================================
 * DATE 		AUTHOR 		      NOTE
 * -----------------------------------------------------------
 * 2022-04-28	    우정연  		    최초 생성
 */

public class GitCodeAPI {
    private RestTemplate restTemplate = new RestTemplate();

    public String insertFile(String token, String owner, String repo, String path, GitCodeCreateRequest request) throws JsonProcessingException {
        HttpHeaders httpHeaders = setHttpHeaders(token);

        String jsonBody = new ObjectMapper().writeValueAsString(request);

        HttpEntity<String> httpEntity = new HttpEntity<>(jsonBody, httpHeaders);
        String url = "https://api.github.com/repos/" + owner + "/" + repo + "/contents" + path;

        ResponseEntity<HashMap> response = restTemplate.exchange(url, HttpMethod.PUT, httpEntity, HashMap.class);
        String sha = (((HashMap)(response.getBody().get("content"))).get("sha")).toString();

        return sha;
    }

    public GitCodeResponse selectFile(String token, String owner, String repo, String path) throws JsonProcessingException {
        HttpHeaders httpHeaders = setHttpHeaders(token);

        HttpEntity<String> httpEntity = new HttpEntity<>(httpHeaders);
        String url = "https://api.github.com/repos/" + owner + "/" + repo + "/contents" + path;

        ResponseEntity<HashMap> response = restTemplate.exchange(url, HttpMethod.GET, httpEntity, HashMap.class);
        String sha = response.getBody().get("sha").toString();
        String content = new String(Base64.getDecoder().decode(response.getBody().get("content").toString()));  // 디코딩

        GitCodeResponse gitCodeResponse = GitCodeResponse.builder()
                                            .sha(sha)
                                            .content(content)
                                            .build();

        return gitCodeResponse;
    }

    private HttpHeaders setHttpHeaders(String token) {
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.set(GithubConfig.AUTH, "token " + token);
        httpHeaders.set("Accept", "application/vnd.github.v3+json");
        httpHeaders.set("Content-Type", "application/json");

        return httpHeaders;
    }
}
