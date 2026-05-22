package com.speechcoach.repository;

import com.speechcoach.domain.SkillScore;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SkillScoreRepository extends JpaRepository<SkillScore, Long> {
}