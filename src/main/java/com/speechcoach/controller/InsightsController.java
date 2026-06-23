package com.speechcoach.controller;

import com.speechcoach.dto.SkillRankingDTO;
import com.speechcoach.service.InsightsService;
import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/insights")
public class InsightsController {

    private final InsightsService insightsService;

    public InsightsController(InsightsService insightsService) {
        this.insightsService = insightsService;
    }

    @GetMapping("/skill-ranking")
    public List<SkillRankingDTO> getSkillRanking() {
        return insightsService.getSkillRanking();
    }
}