package com.speechcoach.domain;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
public class SkillScore {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "skill_id", nullable = false, unique = true)
    private Skill skill;

    @Column(nullable = false)
    private Double score;

    @Column(nullable = false)
    private LocalDate lastUpdated;

    public SkillScore() {
    }

    public SkillScore(Skill skill, Double score, LocalDate lastUpdated) {
        this.skill = skill;
        this.score = score;
        this.lastUpdated = lastUpdated;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Skill getSkill() {
        return skill;
    }

    public void setSkill(Skill skill) {
        this.skill = skill;
    }

    public Double getScore() {
        return score;
    }

    public void setScore(Double score) {
        this.score = score;
    }

    public LocalDate getLastUpdated() {
        return lastUpdated;
    }

    public void setLastUpdated(LocalDate lastUpdated) {
        this.lastUpdated = lastUpdated;
    }
}