package com.ssafy.alta.gitutil;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.alta.config.GithubConfig;
import com.ssafy.alta.dto.response.GitCodeResponse;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

import java.util.Base64;
import java.util.HashMap;

/**
 * packageName 	: com.ssafy.alta.gitutil
 * fileName 	: GitCodeAPI
 * author 	    : 우정연
 * date		    : 2022-04-28
 * description	: code관련 Github API
 * ===========================================================
 * DATE 		AUTHOR 		      NOTE
 * -----------------------------------------------------------
 * 2022-04-28	    우정연  		    최초 생성
 */

public class GitCodeAPI {
    private RestTemplate restTemplate = new RestTemplate();

    public String manipulate(String token, String url, HttpMethod method, Object request) throws JsonProcessingException {
        HttpHeaders httpHeaders = this.setHttpHeaders(token);

        String jsonBody = new ObjectMapper().writeValueAsString(request);  // 이거 Object로 바로 된다!

        HttpEntity<String> httpEntity = new HttpEntity<>(jsonBody, httpHeaders);

        ResponseEntity<HashMap> response = restTemplate.exchange(url, method, httpEntity, HashMap.class);
        String sha = "";
        if(method != HttpMethod.DELETE)
            sha = (((HashMap)(response.getBody().get("content"))).get("sha")).toString();

        return sha;
    }

    public GitCodeResponse selectFile(String token, String url) {
        HttpHeaders httpHeaders = this.setHttpHeaders(token);

        HttpEntity<String> httpEntity = new HttpEntity<>(httpHeaders);

        ResponseEntity<HashMap> response = restTemplate.exchange(url, HttpMethod.GET, httpEntity, HashMap.class);
        String sha = response.getBody().get("sha").toString();
        String base64Content = response.getBody().get("content").toString().replaceAll("\\r\\n|\\r|\\n", ""); // 개행문자 빼줌 - base64 에러 때문..(들어가있으면 디코딩할 때 에러남)
        String content = new String(Base64.getDecoder().decode(base64Content));  // 디코딩

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
