package com.project.tripAdvisor;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing
@SpringBootApplication
public class TripAdvisorApplication {

	public static void main(String[] args) {
		SpringApplication.run(TripAdvisorApplication.class, args);
	}

}