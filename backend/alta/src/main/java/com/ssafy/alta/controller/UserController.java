package com.ssafy.alta.controller;

import com.ssafy.alta.dto.request.UserUpdateRequest;
import com.ssafy.alta.repository.UserRepository;
import com.ssafy.alta.service.ActivityScoreService;
import com.ssafy.alta.service.RedisService;
import com.ssafy.alta.service.UserService;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;


@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private RedisService redisService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ActivityScoreService activityScoreService;

    @GetMapping("/gitLogin/loginSuccess")
    public ResponseEntity<String> authorize(@RequestParam("jwt") String jwt) {
        return new ResponseEntity<>(jwt, HttpStatus.OK);
    }

    @GetMapping("/search")
    @ApiOperation(value = "user 검색 결과", notes = "user 검색 결과 가져오기, id, nickname, email")
    public ResponseEntity selectUserName(@RequestParam("q") String word) {
        return new ResponseEntity<>(userService.selectUserName(word), HttpStatus.OK);
    }

    @GetMapping("/info")
    @ApiOperation(value = "user 정보 가져오기", notes = "user 정보 가져고익")
    public ResponseEntity selectUserInfo() {
        return new ResponseEntity<>(userService.selectUser(), HttpStatus.OK);
    }

    @PostMapping(path = "/info")
    @ApiOperation(value = "user 개인정보 수정", notes = "user 개인 정보 수정")
    public ResponseEntity updateUserInfo(@RequestBody UserUpdateRequest userUpdateRequest) {
        return new ResponseEntity<>(userService.updateUser(userUpdateRequest), HttpStatus.OK);
    }

    @PostMapping(consumes = {"multipart/form-data"}, path = "/image")
    @ApiOperation(value = "user 개인정보 사진 추가", notes = "user 개인 프로필 사진 추가")
    public ResponseEntity updateUserImage(@RequestPart("profileImage") MultipartFile file) {

        return new ResponseEntity(userService.updateUserImage(file), HttpStatus.OK);
    }

    @PatchMapping("/alert")
    @ApiOperation(value = "알람 수신 여부 수정", notes = "user 알람 수신 여부 수정")
    public ResponseEntity patchUserAlert(@RequestBody int alertSetting) {
        return new ResponseEntity<>(userService.updateAlert(alertSetting), HttpStatus.OK);
    }
}
