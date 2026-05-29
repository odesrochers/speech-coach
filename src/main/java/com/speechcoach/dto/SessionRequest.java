package com.speechcoach.dto;

import com.speechcoach.domain.SessionType;
import com.speechcoach.domain.SkillResult;
import java.time.LocalDate;
import java.util.List;

public class SessionRequest {

    private SessionType type;
    private LocalDate date;
    private Integer successRating;
    private String notes;
    private List<SkillResultEntry> skillResults;

    public static class SkillResultEntry {
        private Long skillId;
        private SkillResult result;

        public Long getSkillId() {
            return skillId;
        }

        public void setSkillId(Long skillId) {
            this.skillId = skillId;
        }

        public SkillResult getResult() {
            return result;
        }

        public void setResult(SkillResult result) {
            this.result = result;
        }
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

    public List<SkillResultEntry> getSkillResults() {
        return skillResults;
    }

    public void setSkillResults(List<SkillResultEntry> skillResults) {
        this.skillResults = skillResults;
    }
}