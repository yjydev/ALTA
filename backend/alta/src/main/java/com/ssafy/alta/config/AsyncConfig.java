package com.ssafy.alta.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.AsyncConfigurerSupport;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;

import java.util.concurrent.Executor;

/**
 * packageName 	: com.alta.mail.Config
 * fileName 	: AsyncConfig
 * author 	    : jisoon Lee
 * date		    : 2022-05-06
 * description	:
 * ===========================================================
 * DATE             AUTHOR              NOTE
 * -----------------------------------------------------------
 * 2022-05-06       jisoon Lee         최초 생성
 */

@Configuration
@EnableAsync
public class AsyncConfig extends AsyncConfigurerSupport {
    public Executor getAsyncExecutor() {
        ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
        executor.setCorePoolSize(2);
        executor.setMaxPoolSize(5);
        executor.setQueueCapacity(10);
        executor.setThreadNamePrefix("async-");
        executor.initialize();
        return executor;
    }
}
