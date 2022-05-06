package com.ssafy.alta.jwt;

import com.google.gson.Gson;
import com.ssafy.alta.exception.JwtExpiredExaception;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * packageName 	: com.ssafy.alta.jwt
 * fileName 	: ExceptionHandlerFilter
 * author 	    : 오서하
 * date		    : 2022-05-06
 * description	:
 * ===========================================================
 * DATE 		AUTHOR 		      NOTE
 * -----------------------------------------------------------
 * 2022-05-06	    오서하  		    최초 생성
 */
@Slf4j
public class ExceptionHandlerFilter extends OncePerRequestFilter {
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        try{
            filterChain.doFilter(request,response);
        } catch (JwtExpiredExaception ex){
            log.error("jwt refresh expired! exception catch");
            setErrorResponse(HttpStatus.FORBIDDEN,response,ex);
        }catch (RuntimeException ex){
            log.error("runtime exception exception handler filter");
            setErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR,response,ex);
        }
    }

    public void setErrorResponse(HttpStatus status, HttpServletResponse response, Throwable ex) {
        response.setStatus(status.value());
        response.setContentType("application/json");

        Gson gson = new Gson();
        JwtExpiredExaception jwtExpiredExaception = new JwtExpiredExaception();
        try {
            String jsonString = gson.toJson(jwtExpiredExaception);
            System.out.println(jwtExpiredExaception);
            response.getWriter().write(jsonString);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
