package com.sved.sved_core;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication(scanBasePackages = "com.sved")
@EntityScan(basePackages = "com.sved.domain")
@EnableJpaRepositories(basePackages = "com.sved.repository")
public class SvedCoreApplication {

	public static void main(String[] args) {
		SpringApplication.run(SvedCoreApplication.class, args);
	}
}