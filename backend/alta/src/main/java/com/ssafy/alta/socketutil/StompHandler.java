package com.ssafy.alta.socketutil;

import com.ssafy.alta.dto.request.ChatRequest;
import com.ssafy.alta.jwt.ExceptionHandlerFilter;
import com.ssafy.alta.jwt.JwtFilter;
import com.ssafy.alta.jwt.TokenProvider;
import com.ssafy.alta.service.UserService;
import io.jsonwebtoken.JwtException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.messaging.support.ChannelInterceptorAdapter;
import org.springframework.messaging.support.MessageBuilder;
import org.springframework.messaging.support.MessageHeaderAccessor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

/**
 * packageName 	: com.ssafy.alta.socketutil
 * fileName 	: StompHandler
 * author 	    : jisoon Lee
 * date		    : 2022-05-13
 * description	:
 * ===========================================================
 * DATE             AUTHOR              NOTE
 * -----------------------------------------------------------
 * 2022-05-13       jisoon Lee         최초 생성
 */
@Component
public class StompHandler implements ChannelInterceptor {
    @Autowired
    private TokenProvider tokenProvider;
    public static final String AT_HEADER = "ACCESS_TOKEN";
    public static final String RT_HEADER = "REFRESH_TOKEN";
    @Autowired
    private UserService userService;

    @Override
    public Message preSend(Message message, MessageChannel channel) {
        StompHeaderAccessor accessor = MessageHeaderAccessor.getAccessor(message, StompHeaderAccessor.class);
        if(StompCommand.CONNECT == accessor.getCommand()){
            String at = accessor.getFirstNativeHeader(AT_HEADER);
            String rt = accessor.getFirstNativeHeader(RT_HEADER);
            if (StringUtils.hasText(at) && at.startsWith("Bearer")) {
                at = at.substring(7);
            }

            if (StringUtils.hasText(rt) && rt.startsWith("Bearer")) {
                rt = rt.substring(7);
            }

            Authentication authentication = null;

            if(at != null && rt == null){
                if (StringUtils.hasText(at) && tokenProvider.validateToken(at)) { // JWT ACCESS TOKEN이 정상이면
                    authentication = tokenProvider.getAuthentication(at); // 토큰안에 authentication 객체를 받는다.
                    SecurityContextHolder.getContext().setAuthentication(authentication); // authentication 객체를 securitycontext에 set한다.
                }
            }
            else if(at != null && rt != null){
                if (StringUtils.hasText(rt) && tokenProvider.validateToken(rt)) { // JWT Refresh TOKEN이 정상이면
                    authentication = tokenProvider.getAuthentication(rt); // 토큰안에 authentication 객체를 받는다.
                    SecurityContextHolder.getContext().setAuthentication(authentication); // authentication 객체를 securitycontext에 set한다.

                    if(!tokenProvider.compareWithRedisData(rt)) // Redis에 저장한 RT와 비교 후, 틀리다면 JWT ERROR반환
                        throw new JwtException("JWT error");
                }
            }
            accessor.setUser(authentication);
        }

        return message;
    }
}
