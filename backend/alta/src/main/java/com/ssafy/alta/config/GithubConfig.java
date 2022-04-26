package com.ssafy.alta.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;

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

    public String getSecret(){return environment.getProperty("github.username");}

}