package com.ssafy.alta.repository;

import com.ssafy.alta.entity.User;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface UserRepository extends JpaRepository<User, String> {
    User findByName(String name);

    // JPQL로 작성(sql도 된대)
    // 특정 스터디의 그룹장 username 반환
    @Query("select u.name " +
            "from User u " +
            "where u.id = " +
            "(select s.user.id " +
            "from Study s " +
            "where s.studyId = :id)")
    String findStudyLeaderUserNameByStudyId(@Param(("id")) Long id);
}
