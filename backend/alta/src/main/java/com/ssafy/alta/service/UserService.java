package com.ssafy.alta.service;

import com.ssafy.alta.entity.User;
import com.ssafy.alta.jwt.util.SecurityUtil;
import com.ssafy.alta.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Transactional(readOnly = true)
    public Optional<User> getUserWithAuthorities(String username) {
        return Optional.ofNullable(userRepository.findByName(username));
    }
}
