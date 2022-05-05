package com.ssafy.alta.gitutil;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.alta.config.GithubConfig;
import com.ssafy.alta.dto.request.GitRepoUpdateRequest;
import com.ssafy.alta.exception.DuplicateFolderException;
import org.springframework.http.*;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.List;

/**
 * packageName 	: com.ssafy.alta.gitutil
 * fileName 	: GitDirectoryAPI
 * author 	    : jisoon Lee
 * date		    : 2022-05-04
 * description	:
 * ===========================================================
 * DATE             AUTHOR              NOTE
 * -----------------------------------------------------------
 * 2022-05-04       jisoon Lee         최초 생성
 */
public class GitDirectoryAPI {
    private final RestTemplate restTemplate = new RestTemplate(new HttpComponentsClientHttpRequestFactory());

    public void updateDirectory(String token, String owner, String repo, String beforeRepoName, String afterRepoName) throws JsonProcessingException {
        HttpHeaders httpHeaders = setHttpHeaders(token);
        String url = "https://api.github.com/repos/" + owner + "/" + repo + "/git";

        Object request = selectTree(httpHeaders, url, beforeRepoName, afterRepoName);
        if (request == null) {
            throw new DuplicateFolderException();
        }

        String sha = insertTree(httpHeaders, url, request);
        String treeSHA = insertCommits(httpHeaders, url, sha, beforeRepoName, afterRepoName);
        insertRefs(httpHeaders, url, treeSHA);
    }

    private void insertRefs(HttpHeaders httpHeaders, String baseUrl, String sha) throws JsonProcessingException {
        HashMap<String, Object> map = new HashMap<>();
        map.put("force", true);
        map.put("sha", sha);

        String jsonBody = new ObjectMapper().writeValueAsString(map);
        HttpEntity<String> httpEntity = new HttpEntity<>(jsonBody, httpHeaders);
        String url = baseUrl +"/refs/heads/main";
        restTemplate.exchange(url, HttpMethod.PATCH, httpEntity, HashMap.class);
    }

    private String insertCommits(HttpHeaders httpHeaders, String baseUrl, String sha, String beforeRepoName, String afterRepoName) throws JsonProcessingException {
        HashMap<String, Object> map = new HashMap<>();
        map.put("message", "rename "+ beforeRepoName +" to "+afterRepoName);
        map.put("tree", sha);

        String jsonBody = new ObjectMapper().writeValueAsString(map);
        HttpEntity<String> httpEntity = new HttpEntity<>(jsonBody, httpHeaders);
        String url = baseUrl +"/commits";

        ResponseEntity<HashMap> response = restTemplate.exchange(url, HttpMethod.POST, httpEntity, HashMap.class);

        return response.getBody().get("sha").toString();
    }

    private String insertTree(HttpHeaders httpHeaders, String baseUrl, Object request) throws JsonProcessingException {
        String jsonBody = new ObjectMapper().writeValueAsString(request);  // 이거 Object로 바로 된다!
        HttpEntity<String> httpEntity = new HttpEntity<>(jsonBody, httpHeaders);
        String url = baseUrl + "/trees";

        ResponseEntity<HashMap> response = restTemplate.exchange(url, HttpMethod.POST, httpEntity, HashMap.class);

        return response.getBody().get("sha").toString();
    }

    private GitRepoUpdateRequest selectTree(HttpHeaders httpHeaders, String baseUrl, String beforeRepoName, String afterRepoName) {
        HttpEntity<String> httpEntity = new HttpEntity<>(httpHeaders);
        String url = baseUrl+ "/trees/main?recursive=true";

        ResponseEntity<HashMap> response = restTemplate.exchange(url, HttpMethod.GET, httpEntity, HashMap.class);
        HashMap map = response.getBody();
        List<HashMap> treeList = (List<HashMap>) map.get("tree");
        String base_sha = map.get("sha").toString();

        String comparePath = "풀이모음/"+beforeRepoName;
        String duplicationPath = "풀이모음/"+afterRepoName;
        for(int i = treeList.size()-1; i >= 0; i--) {
            HashMap<String, String> h = treeList.get(i);
            String path = h.get("path").toString();

            if(path.matches("풀이모음/"+beforeRepoName+"/"+".*")) {
                h.put("path", h.get("path").toString().replace("풀이모음/"+beforeRepoName, "풀이모음/"+afterRepoName));
            }

            if("풀이모음".equals(path) || comparePath.equals(path)) {
                treeList.remove(i);
            }

            if(duplicationPath.equals(path)) {
                return null;
            }
        }

        GitRepoUpdateRequest gitRepoUpdateRequest = GitRepoUpdateRequest.builder()
                .base_sha(base_sha)
                .tree(treeList)
                .build();

        return gitRepoUpdateRequest;
    }


    private HttpHeaders setHttpHeaders(String token) {
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.set(GithubConfig.AUTH, "token " + token);
        httpHeaders.set("Accept", "application/vnd.github.v3+json");
        httpHeaders.set("Content-Type", "application/json");

        return httpHeaders;
    }
}
