package com.speechcoach.domain;

import jakarta.persistence.*;

@Entity
public class SessionSkill {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "session_id", nullable = false)
    private Session session;

    @ManyToOne
    @JoinColumn(name = "skill_id", nullable = false)
    private Skill skill;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private SkillResult result;

    public SessionSkill() {
    }

    public SessionSkill(Session session, Skill skill, SkillResult result) {
        this.session = session;
        this.skill = skill;
        this.result = result;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Session getSession() {
        return session;
    }

    public void setSession(Session session) {
        this.session = session;
    }

    public Skill getSkill() {
        return skill;
    }

    public void setSkill(Skill skill) {
        this.skill = skill;
    }

    public SkillResult getResult() {
        return result;
    }

    public void setResult(SkillResult result) {
        this.result = result;
    }
}