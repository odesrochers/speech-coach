package com.speechcoach.controller;

import com.speechcoach.domain.Skill;
import com.speechcoach.service.SkillService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/skills")
public class SkillController {

    private final SkillService skillService;

    public SkillController(SkillService skillService) {
        this.skillService = skillService;
    }

    @PostMapping
    public ResponseEntity<Skill> create(@RequestBody Skill skill) {
        return ResponseEntity.ok(skillService.save(skill));
    }

    @GetMapping
    public ResponseEntity<List<Skill>> findAll() {
        return ResponseEntity.ok(skillService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Skill> findById(@PathVariable Long id) {
        return ResponseEntity.ok(skillService.findById(id));
    }
}