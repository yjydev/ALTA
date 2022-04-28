package com.ssafy.alta.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.alta.service.UserService1;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * packageName 	: com.ssafy.alta.controller
 * fileName 	: UserController1
 * author 	    : 김유진
 * date		    : 2022-04-28
 * description	:
 * ===========================================================
 * DATE 		    AUTHOR 		        NOTE
 * -----------------------------------------------------------
 * 2022-04-28	        김유진  		        최초 생성
 */

@RestController
@RequestMapping("/api/user1")
public class UserController1 {

    @Autowired
    private UserService1 userService1;

    @GetMapping("/userinfo")
    @ApiOperation(value = "user 정보 가져오기", notes = "user 정보 가져고익")
    public ResponseEntity<?> getUserinfo(String user_id) {


        return new ResponseEntity<>(userService1.selectUser(user_id), HttpStatus.OK);


    }
}