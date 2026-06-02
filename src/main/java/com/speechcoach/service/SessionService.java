package com.speechcoach.service;

import com.speechcoach.client.ClaudeClient;
import com.speechcoach.domain.*;
import com.speechcoach.dto.SessionRequest;
import com.speechcoach.dto.SessionResponse;
import com.speechcoach.repository.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class SessionService {

    private final SessionRepository sessionRepository;
    private final SkillRepository skillRepository;
    private final SessionSkillRepository sessionSkillRepository;
    private final SkillScoreRepository skillScoreRepository;
    private final ClaudeClient claudeClient;

    public SessionService(SessionRepository sessionRepository,
            SkillRepository skillRepository,
            SessionSkillRepository sessionSkillRepository,
            SkillScoreRepository skillScoreRepository,
            ClaudeClient claudeClient) {
        this.sessionRepository = sessionRepository;
        this.skillRepository = skillRepository;
        this.sessionSkillRepository = sessionSkillRepository;
        this.skillScoreRepository = skillScoreRepository;
        this.claudeClient = claudeClient;
    }

    public SessionResponse logSession(SessionRequest request) {
        // 1. Build prompt and call Claude
        String prompt = buildPrompt(request);
        String rawResponse = claudeClient.call(prompt);

        // 2. Parse Claude response
        String[] parts = rawResponse.split("---");
        String aiFeedback = parts.length > 0 ? parts[0].trim() : "";
        String aiPattern = parts.length > 1 ? parts[1].trim() : "";
        String aiSummary = parts.length > 2 ? parts[2].trim() : "";

        // 3. Save session
        Session session = new Session(
                request.getType(),
                request.getDate(),
                request.getSuccessRating(),
                request.getNotes());
        session.setAiFeedback(aiFeedback);
        session.setAiPattern(aiPattern);
        session.setAiSummary(aiSummary);
        sessionRepository.save(session);

        // 4. Save session skills and update scores
        List<SessionResponse.SkillResultEntry> skillResultEntries = new ArrayList<>();

        for (SessionRequest.SkillResultEntry entry : request.getSkillResults()) {
            Skill skill = skillRepository.findById(entry.getSkillId())
                    .orElseThrow(() -> new RuntimeException("Skill not found"));

            SessionSkill sessionSkill = new SessionSkill(session, skill, entry.getResult());
            sessionSkillRepository.save(sessionSkill);

            updateSkillScore(skill, entry.getResult());

            SessionResponse.SkillResultEntry responseEntry = new SessionResponse.SkillResultEntry();
            responseEntry.setSkillId(skill.getId());
            responseEntry.setSkillName(skill.getName());
            responseEntry.setResult(entry.getResult());
            skillResultEntries.add(responseEntry);
        }

        // 5. Build and return response
        SessionResponse response = new SessionResponse();
        response.setId(session.getId());
        response.setType(session.getType());
        response.setDate(session.getDate());
        response.setSuccessRating(session.getSuccessRating());
        response.setNotes(session.getNotes());
        response.setAiFeedback(aiFeedback);
        response.setAiPattern(aiPattern);
        response.setAiSummary(aiSummary);
        response.setSkillResults(skillResultEntries);

        return response;
    }

    private void updateSkillScore(Skill skill, SkillResult result) {
        SkillScore score = skillScoreRepository.findBySkill(skill)
                .orElse(new SkillScore(skill, 50.0, LocalDate.now()));

        double delta = result == SkillResult.USED_WELL ? 5.0 : -5.0;
        double newScore = Math.max(0, Math.min(100, score.getScore() + delta));
        score.setScore(newScore);
        score.setLastUpdated(LocalDate.now());
        skillScoreRepository.save(score);
    }

    private String buildPrompt(SessionRequest request) {
        StringBuilder skillsText = new StringBuilder();
        for (SessionRequest.SkillResultEntry entry : request.getSkillResults()) {
            Skill skill = skillRepository.findById(entry.getSkillId())
                    .orElseThrow(() -> new RuntimeException("Skill not found"));
            skillsText.append("- ").append(skill.getName())
                    .append(": ").append(entry.getResult()).append("\n");
        }

        return """
                You are a communication coach. Analyze this session and respond in exactly this format:
                [Brief feedback on this session]
                ---
                [One pattern you identified in this session that could be improved, and how to improve it]
                ---
                [A self-contained conversation opener I can paste into a new AI chat with no prior context. Write it in first person, describing what happened in this session, the skill I practiced and how it went, and asking for specific coaching advice on that. Do not infer patterns beyond what this single session shows.]

                Session type: %s
                Date: %s
                Success rating: %s/5
                Notes: %s
                Skills practiced:
                %s
                """
                .formatted(
                        request.getType(),
                        request.getDate(),
                        request.getSuccessRating(),
                        request.getNotes(),
                        skillsText.toString());
    }
}