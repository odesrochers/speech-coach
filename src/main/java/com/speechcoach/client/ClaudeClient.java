package com.speechcoach.client;

import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;

@Component
public class ClaudeClient {

    private final RestClient restClient;

    public ClaudeClient(@Value("${anthropic.api-key}") String apiKey) {
        this.restClient = RestClient.builder()
                .baseUrl("https://api.anthropic.com")
                .defaultHeader("x-api-key", apiKey)
                .defaultHeader("anthropic-version", "2023-06-01")
                .defaultHeader("content-type", "application/json")
                .build();
    }

    public String call(String prompt) {
        String escapedPrompt = prompt
                .replace("\\", "\\\\")
                .replace("\"", "\\\"")
                .replace("\n", "\\n")
                .replace("\r", "\\r")
                .replace("\t", "\\t");

        String body = """
                {
                    "model": "claude-sonnet-4-5",
                    "max_tokens": 1024,
                    "messages": [
                        {"role": "user", "content": "%s"}
                    ]
                }
                """.formatted(escapedPrompt);

        ClaudeResponse response = restClient.post()
                .uri("/v1/messages")
                .body(body)
                .retrieve()
                .body(ClaudeResponse.class);

        return response.getContent().get(0).getText();
    }

    private static class ClaudeResponse {
        private List<ContentBlock> content;

        public List<ContentBlock> getContent() {
            return content;
        }

        public void setContent(List<ContentBlock> content) {
            this.content = content;
        }
    }

    private static class ContentBlock {
        private String type;
        private String text;

        public String getType() {
            return type;
        }

        public void setType(String type) {
            this.type = type;
        }

        public String getText() {
            return text;
        }

        public void setText(String text) {
            this.text = text;
        }
    }
}