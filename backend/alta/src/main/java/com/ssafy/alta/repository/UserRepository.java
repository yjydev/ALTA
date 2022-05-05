package com.ssafy.alta.repository;

import com.ssafy.alta.dto.response.UserSearchResponse;
import com.ssafy.alta.entity.User;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import javax.swing.text.html.Option;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, String> {
    User findByName(String name);

    // JPQL로 작성(sql도 된대)
    // 특정 스터디의 그룹장 username 반환
    @Query("select u.name " +
            "from User u " +
            "where u.id = :userId ")
    String findStudyLeaderUserNameByUserId(@Param(("id")) String userId);

    @Query("select u.id as id, u.nickname as nickname, u.email as email from User u where u.nickname like concat('%', :nickname, '%') order by u.nickname")
    List<UserSearchResponse> findByNickNameOrderByNickName(@Param("nickname") String nickname);
}
