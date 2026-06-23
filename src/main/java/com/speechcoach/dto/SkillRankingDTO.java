package com.speechcoach.dto;

public class SkillRankingDTO {
    private String skillName;
    private String skillDescription;
    private double score;

    public SkillRankingDTO(String skillName, String skillDescription, double score) {
        this.skillName = skillName;
        this.skillDescription = skillDescription;
        this.score = score;
    }

    public String getSkillName() {
        return skillName;
    }

    public String getSkillDescription() {
        return skillDescription;
    }

    public double getScore() {
        return score;
    }
}