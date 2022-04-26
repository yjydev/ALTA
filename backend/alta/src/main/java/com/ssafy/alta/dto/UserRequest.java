package com.ssafy.alta.dto;

import com.ssafy.alta.entity.User;
import lombok.*;

/**
 * packageName 	: com.ssafy.alta.dto
 * fileName 	: UserRequest
 * author 	    : 오서하
 * date		    : 2022-04-26
 * description	:
 * ===========================================================
 * DATE 		AUTHOR 		      NOTE
 * -----------------------------------------------------------
 * 2022-04-26	    오서하  		    최초 생성
 */

@Getter
@Setter
@Builder
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class UserRequest {

    String id;
    String name;
    String nickname;
    String role;

    public User toEntity(){
        User user = User.builder()
                .id(id)
                .name(name)
                .nickname(nickname)
                .role(role)
                .build();
        return user;
    }
}
