package com.ssafy.alta.gitutil;

import com.ssafy.alta.config.GithubConfig;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

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

        Pattern p = Pattern.compile("(@users.noreply)");

        for(Object tmp : response.getBody()){
            String idxEmail = tmp.toString().split(",")[0].split("=")[1];
            Matcher matcher = p.matcher(idxEmail);
            if(matcher.find())
                continue;
            System.out.println(idxEmail);
            return idxEmail;
        }

        return response.getBody().get(0).toString().split(",")[0].split("=")[1];
    }
}