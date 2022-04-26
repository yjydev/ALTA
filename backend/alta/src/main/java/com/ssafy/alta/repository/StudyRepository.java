package com.ssafy.alta.repository;

import com.ssafy.alta.entity.Study;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudyRepository extends JpaRepository<Study, Long> {
}
