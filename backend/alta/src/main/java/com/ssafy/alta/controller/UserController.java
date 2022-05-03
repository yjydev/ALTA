package com.ssafy.alta.controller;

import com.ssafy.alta.repository.UserRepository;
import com.ssafy.alta.service.RedisService;
import com.ssafy.alta.service.UserService;
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


//    @GetMapping("/test")
//    public ResponseEntity getUserInfo( @RequestHeader String Authorization) {
//        return new ResponseEntity<>(userService.getCurrentUsername(), HttpStatus.OK);
//    }

    @GetMapping("/test")
    public void getUserInfo2( @RequestHeader String ACCESS_TOKEN) {
        redisService.getAccessToken();
    }

}
