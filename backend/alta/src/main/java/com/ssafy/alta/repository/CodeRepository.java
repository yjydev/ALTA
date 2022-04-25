package com.ssafy.alta.repository;

import com.ssafy.alta.entity.Code;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * 코드 repository
 *
 * @author 우정연
 * created on 2022-04-26
 */

public interface CodeRepository extends JpaRepository<Code, Long> {
}
