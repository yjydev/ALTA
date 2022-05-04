package com.ssafy.alta.gitutil;

import com.ssafy.alta.config.GithubConfig;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

import java.util.List;

/**
 * packageName 	: com.ssafy.alta.gitutil
 * fileName 	: GitEmailAPI
 * author 	    : 김유진
 * date		    : 2022-05-04
 * description	:
 * ===========================================================
 * DATE 		    AUTHOR 		        NOTE
 * -----------------------------------------------------------
 * 2022-05-04	        김유진  		        최초 생성
 */
public class GitEmailAPI {
    private RestTemplate restTemplate = new RestTemplate();

    public String selectGithubEmail(String token) {
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.set(GithubConfig.AUTH, "token " + token);
        httpHeaders.set("Accept", "application/vnd.github.v3+json");

        HttpEntity<String> httpEntity = new HttpEntity<>(httpHeaders);
        String url = "https://api.github.com/user/emails";

        ResponseEntity<List> response = restTemplate.exchange(url, HttpMethod.GET, httpEntity, List.class);

        String email = response.getBody().get(0).toString();
        return email.split(",")[0].split("=")[1];
    }
}