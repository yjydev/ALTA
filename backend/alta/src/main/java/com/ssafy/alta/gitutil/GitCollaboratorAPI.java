package com.ssafy.alta.gitutil;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.alta.config.GithubConfig;
import org.json.simple.JSONArray;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.List;

/**
 * packageName 	: com.ssafy.alta.gitutil
 * fileName 	: GitCollaboratorAPI
 * author 	    : jisoon Lee
 * date		    : 2022-05-06
 * description	:
 * ===========================================================
 * DATE             AUTHOR              NOTE
 * -----------------------------------------------------------
 * 2022-05-06       jisoon Lee         최초 생성
 */
public class GitCollaboratorAPI {
    private RestTemplate restTemplate = new RestTemplate();

    public void insertCollaborators(String token, String owner, String repo, String username) throws JsonProcessingException {
        HttpHeaders httpHeaders = this.setHttpHeaders(token);
        HashMap<String, String> map = new HashMap<>();
        map.put("permission", "admin");

        String jsonBody = new ObjectMapper().writeValueAsString(map);
        HttpEntity<String> httpEntity = new HttpEntity<>(jsonBody, httpHeaders);
        String url = "https://api.github.com/repos/" + owner + "/" + repo + "/collaborators/" + username;

        restTemplate.exchange(url, HttpMethod.PUT, httpEntity, HashMap.class);
    }

    public List<HashMap> selectCollaborators(String token, String owner, String repo) {
        HttpHeaders httpHeaders = this.setHttpHeaders(token);
        HttpEntity<String> httpEntity = new HttpEntity<>(httpHeaders);

        String url = "https://api.github.com/repos/" + owner + "/" + repo +"/collaborators";
        System.out.println(url);
        ResponseEntity<JSONArray> response = restTemplate.exchange(url, HttpMethod.GET, httpEntity, JSONArray.class);
        List<HashMap> list = (List<HashMap>) response.getBody();
        return list;
    }

    private HttpHeaders setHttpHeaders(String token) {
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.set(GithubConfig.AUTH, "token " + token);
        httpHeaders.set("Accept", "application/vnd.github.v3+json");
        httpHeaders.set("Content-Type", "application/json");

        return httpHeaders;
    }
}
