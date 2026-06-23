package com.speechcoach.repository;

import com.speechcoach.domain.Skill;
import com.speechcoach.domain.SkillScore;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SkillScoreRepository extends JpaRepository<SkillScore, Long> {
    Optional<SkillScore> findBySkill(Skill skill);

    List<SkillScore> findAllByOrderByScoreDesc();
}