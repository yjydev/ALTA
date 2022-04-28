package com.ssafy.alta.config;

import org.apache.http.client.HttpClient;
import org.apache.http.impl.client.HttpClientBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.web.client.RestTemplate;

/**
 * packageName 	: com.ssafy.alta.config
 * fileName 	: GithubConfig
 * author 	    : 김유진
 * date		    : 2022-04-26
 * description	:
 * ===========================================================
 * DATE 		    AUTHOR 		        NOTE
 * -----------------------------------------------------------
 * 2022-04-26	        김유진  		        최초 생성
 */
@Configuration
public class GithubConfig {
    @Autowired
    private Environment environment;

    public String getUsername(){return environment.getProperty("github.username");}

    public String getSecret(){return environment.getProperty("github.secret");}
    public String getReponame(){return environment.getProperty("github.reponame");}
    public String getOauthkey(){return environment.getProperty("github.oauth-key");}


    @Bean
    public RestTemplate githubRestTemplate(){
        HttpComponentsClientHttpRequestFactory factory = new HttpComponentsClientHttpRequestFactory();
        factory.setReadTimeout(5000);
        factory.setConnectTimeout(3000);

        HttpClient httpClient = HttpClientBuilder.create().setMaxConnTotal(100).setMaxConnPerRoute(5).build();

        factory.setHttpClient(httpClient);
        RestTemplate restTemplate = new RestTemplate(factory);

        return restTemplate;
    }


}