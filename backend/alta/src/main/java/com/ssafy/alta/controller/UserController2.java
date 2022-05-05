package com.ssafy.alta.controller;

import com.ssafy.alta.service.UserService2;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 * packageName 	: com.ssafy.alta.controller
 * fileName 	: UserController2
 * author 	    : jisoon Lee
 * date		    : 2022-05-06
 * description	:
 * ===========================================================
 * DATE             AUTHOR              NOTE
 * -----------------------------------------------------------
 * 2022-05-06       jisoon Lee         최초 생성
 */
@RestController
@RequestMapping("/api/user")
public class UserController2 {
    @Autowired
    private UserService2 userService;

    @GetMapping("/search")
    @ApiOperation(value = "user 검색 결과", notes = "user 검색 결과 가져오기, id, nickname, email")
    public ResponseEntity selectUserName(@RequestParam("q") String word) {
        return new ResponseEntity<>(userService.selectUserName(word), HttpStatus.OK);
    }

}
