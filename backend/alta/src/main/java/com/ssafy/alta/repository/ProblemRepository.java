package com.ssafy.alta.repository;

import com.ssafy.alta.entity.Problem;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * 문제 repository
 *
 * @author 우정연
 * created on 2022-04-26
 */


public interface ProblemRepository extends JpaRepository<Problem, Long> {
}
