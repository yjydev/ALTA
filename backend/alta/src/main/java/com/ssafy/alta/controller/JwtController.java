package com.ssafy.alta.controller;

import com.ssafy.alta.jwt.TokenProvider;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

/**
 * packageName 	: com.ssafy.alta.controller
 * fileName 	: JwtController
 * author 	    : 오서하
 * date		    : 2022-05-03
 * description	: JWT accesstoken과 refreshtoken 갱신 여부 판단하는 클래스
 * ===========================================================
 * DATE 		AUTHOR 		      NOTE
 * -----------------------------------------------------------
 * 2022-05-03	    오서하  		    최초 생성
 */

@Api("JWT accessToken, refreshToken 갱신")
@RestController
@RequestMapping("/api/jwt")
public class JwtController {

    private final TokenProvider tokenProvider;

    public JwtController(TokenProvider tokenProvider) {
        this.tokenProvider = tokenProvider;
    }

    @PostMapping("/issueAT")
    @ApiOperation(value = "jwt access token 갱신", notes = "rf이 유효하다면 새로운 at를 반환합니다. ")
    public ResponseEntity issueAccessToken(@RequestHeader String ACCESS_TOKEN, @RequestHeader String REFRESH_TOKEN) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        String newAT = tokenProvider.createAccessToken(authentication);
        return new ResponseEntity<>(newAT, HttpStatus.OK);
    }
}
