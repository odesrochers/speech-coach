package com.speechcoach.domain;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
public class Session {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private SessionType type;

    @Column(nullable = false)
    private LocalDate date;

    @Column(nullable = false)
    private Integer successRating;

    @Lob
    private String notes;

    @Lob
    private String aiFeedback;

    @Lob
    private String aiPattern;

    @Lob
    private String aiSummary;

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

    public Session() {
    }

    public Session(SessionType type, LocalDate date, Integer successRating, String notes) {
        this.type = type;
        this.date = date;
        this.successRating = successRating;
        this.notes = notes;
    }
}