package com.ssafy.alta.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.alta.dto.request.UserUpdateRequest;
import com.ssafy.alta.service.UserService;
import com.ssafy.alta.service.UserService1;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

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
@RequestMapping("/api/user")
public class UserController1 {

    @Autowired
    private UserService1 userService1;

    @GetMapping("/info")
    @ApiOperation(value = "user 정보 가져오기", notes = "user 정보 가져고익")
    public ResponseEntity selectUserInfo() {
        return new ResponseEntity<>(userService1.selectUser(), HttpStatus.OK);
    }

    @PatchMapping("/info")
    @ApiOperation(value = "user 개인정보 수정", notes ="user 개인 정보 수정")
    public ResponseEntity updateUserInfo(@RequestPart("profileImage") MultipartFile profileImageFile ,@RequestBody UserUpdateRequest userUpdateRequest) {
        return new ResponseEntity<>(userService1.updateUser(userUpdateRequest, profileImageFile), HttpStatus.OK);
    }
}