package com.ssafy.alta.service;

import com.ssafy.alta.dto.UserResponse;
import com.ssafy.alta.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService1 {

    @Autowired
    private UserRepository userRepository;

    public UserResponse selectUser(String user_id) {
        return userRepository.getById(user_id).toDto();
    }

}
