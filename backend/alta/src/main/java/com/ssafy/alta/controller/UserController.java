package com.ssafy.alta.controller;

import com.ssafy.alta.repository.UserRepository;
import com.ssafy.alta.service.RedisService;
import com.ssafy.alta.service.UserService;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private RedisService redisService;

    @Autowired
    private UserRepository userRepository;


    @GetMapping("/gitLogin/loginSuccess")
    public ResponseEntity<String> authorize(@RequestParam ("jwt") String jwt)
    {
        return new ResponseEntity<>(jwt, HttpStatus.OK);
    }


    @GetMapping("/test")
    public void getUserInfo2( @RequestHeader String ACCESS_TOKEN) {

        System.out.println("ref = " + redisService.getJWTRefreshToken());
        System.out.println("acc = " + redisService.getAccessToken());

    }

    @GetMapping("/search")
    @ApiOperation(value = "user 검색 결과", notes = "user 검색 결과 가져오기, id, nickname, email")
    public ResponseEntity selectUserName(@RequestParam("q") String word) {
        return new ResponseEntity<>(userService.selectUserName(word), HttpStatus.OK);
    }
}
