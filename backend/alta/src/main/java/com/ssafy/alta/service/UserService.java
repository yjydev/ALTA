package com.ssafy.alta.service;

import org.springframework.beans.factory.annotation.Value;

public class UserService {

    @Value("${security.oauth2.client.registration.github.client-id}")
    private  String client_id;

}
