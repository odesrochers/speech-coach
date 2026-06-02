package com.speechcoach.controller;

import com.speechcoach.dto.SessionRequest;
import com.speechcoach.dto.SessionResponse;
import com.speechcoach.service.SessionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/sessions")
public class SessionController {

    private final SessionService sessionService;

    public SessionController(SessionService sessionService) {
        this.sessionService = sessionService;
    }

    @PostMapping
    public ResponseEntity<SessionResponse> logSession(@RequestBody SessionRequest request) {
        return ResponseEntity.ok(sessionService.logSession(request));
    }
}