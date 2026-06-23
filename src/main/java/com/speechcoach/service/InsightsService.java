package com.speechcoach.service;

import com.speechcoach.dto.SkillRankingDTO;
import com.speechcoach.repository.SkillScoreRepository;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class InsightsService {

    private final SkillScoreRepository skillScoreRepository;

    public InsightsService(SkillScoreRepository skillScoreRepository) {
        this.skillScoreRepository = skillScoreRepository;
    }

    public List<SkillRankingDTO> getSkillRanking() {
        return skillScoreRepository.findAllByOrderByScoreDesc()
                .stream()
                .map(ss -> new SkillRankingDTO(ss.getSkill().getName(), ss.getSkill().getDescription(), ss.getScore()))
                .toList();
    }
}