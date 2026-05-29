package com.speechcoach.dto;

import com.speechcoach.domain.SessionType;
import com.speechcoach.domain.SkillResult;
import java.time.LocalDate;
import java.util.List;

public class SessionResponse {

    private Long id;
    private SessionType type;
    private LocalDate date;
    private Integer successRating;
    private String notes;
    private String aiFeedback;
    private String aiPattern;
    private String aiSummary;
    private List<SkillResultEntry> skillResults;

    public static class SkillResultEntry {
        private Long skillId;
        private String skillName;
        private SkillResult result;

        public Long getSkillId() {
            return skillId;
        }

        public void setSkillId(Long skillId) {
            this.skillId = skillId;
        }

        public String getSkillName() {
            return skillName;
        }

        public void setSkillName(String skillName) {
            this.skillName = skillName;
        }

        public SkillResult getResult() {
            return result;
        }

        public void setResult(SkillResult result) {
            this.result = result;
        }
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public SessionType getType() {
        return type;
    }

    public void setType(SessionType type) {
        this.type = type;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public Integer getSuccessRating() {
        return successRating;
    }

    public void setSuccessRating(Integer successRating) {
        this.successRating = successRating;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public String getAiFeedback() {
        return aiFeedback;
    }

    public void setAiFeedback(String aiFeedback) {
        this.aiFeedback = aiFeedback;
    }

    public String getAiPattern() {
        return aiPattern;
    }

    public void setAiPattern(String aiPattern) {
        this.aiPattern = aiPattern;
    }

    public String getAiSummary() {
        return aiSummary;
    }

    public void setAiSummary(String aiSummary) {
        this.aiSummary = aiSummary;
    }

    public List<SkillResultEntry> getSkillResults() {
        return skillResults;
    }

    public void setSkillResults(List<SkillResultEntry> skillResults) {
        this.skillResults = skillResults;
    }
}