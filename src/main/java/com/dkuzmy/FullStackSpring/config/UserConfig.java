package com.dkuzmy.FullStackSpring.config;

import com.dkuzmy.FullStackSpring.model.User;
import com.dkuzmy.FullStackSpring.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class UserConfig {
    @Bean
    CommandLineRunner clr (UserRepository userRepository){
        return args -> {
          User admin = new User(
                  "Admin",
                  "Admin",
                  "admin@dkuzmyk.com",
                  true
          );
          userRepository.save(admin);
        };
    }
}
