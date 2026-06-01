package com.quiz;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.Scanner;

@SpringBootApplication
public class Main {
    public static void main(String[] args) {
        SpringApplication.run(Main.class, args);
    }

    @Bean
    public CommandLineRunner runQuiz() {
        return args -> {
            Scanner scanner = new Scanner(System.in);
            try {
                new QuizEngine(scanner).run();
            } finally {
                scanner.close();
            }
        };
    }
}

