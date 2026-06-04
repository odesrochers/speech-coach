package com.speechcoach;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.speechcoach.domain.Skill;
import com.speechcoach.repository.SkillRepository;

@SpringBootApplication
public class SpeechcoachApplication {

	public static void main(String[] args) {
		SpringApplication.run(SpeechcoachApplication.class, args);
	}

	@Bean
	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping("/api/**")
						.allowedOrigins("http://localhost:5173")
						.allowedMethods("GET", "POST", "PUT", "DELETE");
			}
		};
	}

	@Bean
	public CommandLineRunner seedSkills(SkillRepository skillRepository) {
		return args -> {
			if (skillRepository.count() == 0) {
				skillRepository.save(new Skill("Conciseness", "Saying what needs to be said without excess"));
				skillRepository.save(new Skill("Active Listening", "Fully focusing on the speaker before responding"));
				skillRepository.save(new Skill("Clarity", "Expressing ideas so they land without confusion"));
				skillRepository.save(new Skill("Confidence", "Speaking with assurance without dominating"));
				skillRepository
						.save(new Skill("Empathy", "Acknowledging others' perspectives before asserting your own"));
				skillRepository.save(new Skill("Humility", "Staying open to being wrong or incomplete"));
				skillRepository
						.save(new Skill("Structure", "Organizing thoughts before speaking so others can follow"));
			}
		};
	}
}