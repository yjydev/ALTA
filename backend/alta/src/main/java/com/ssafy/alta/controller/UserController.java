package com.ssafy.alta.controller;

import com.ssafy.alta.config.oauth.PrincipalDetails;
import com.ssafy.alta.entity.User;
import com.ssafy.alta.repository.UserRepository;
import com.ssafy.alta.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/gitLogin/loginSucess")
    public ResponseEntity authorize(@RequestParam ("jwt") String jwt)
    {
        return new ResponseEntity<>("", HttpStatus.OK);
    }


    @GetMapping("/test")
    public void getUserInfo() {
        System.out.println("enter?!!??!?");
    }

}
