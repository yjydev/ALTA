package com.ssafy.alta.gitutil;


import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.alta.config.GithubConfig;
import com.ssafy.alta.dto.IssueTest;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
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
    public ResponseEntity<?> createIssue(@ModelAttribute IssueTest issue) throws JsonProcessingException {
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.set(AUTH, "token " + config.getSecret());

        String jsonString = new ObjectMapper().writeValueAsString(issue);

        HttpEntity<String> httpEntity = new HttpEntity<>(jsonString, httpHeaders);
        return restTemplate
                .exchange(
                        "https://api.github.com/repos/ssafytest001/githubapi-springboot/issues",
                        HttpMethod.POST,
                        httpEntity,
                        String.class
                );
    }

}