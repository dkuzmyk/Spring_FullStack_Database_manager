package com.dkuzmy.FullStackSpring;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan("com.dkuzmy")
public class FullStackSpringApplication {

	public static void main(String[] args) {
		SpringApplication.run(FullStackSpringApplication.class, args);
	}

}
