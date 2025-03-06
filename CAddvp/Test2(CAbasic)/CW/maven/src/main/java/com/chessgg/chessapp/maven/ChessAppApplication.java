package com.chessgg.chessapp.maven;

import io.github.cdimascio.dotenv.Dotenv;
import jakarta.annotation.PostConstruct;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.io.File;

@SpringBootApplication
public class ChessAppApplication {

    static {
        // Dotenv looks in <current working dir>/Test2(CAbasic) for .env
        Dotenv dotenv = Dotenv.configure()
            .directory("Test2(CAbasic)")  // specify the subfolder where .env resides
            .filename(".env")            // name of the file is .env
            // remove .ignoreIfMissing() to fail if not found
            .load();

        // Optionally fail if .env wasn't found or is empty
        if (dotenv.entries().isEmpty()) {
            throw new RuntimeException("FATAL: .env file not found or empty in 'Test2(CAbasic)'!");
        }

        dotenv.entries().forEach(entry -> {
            System.setProperty(entry.getKey(), entry.getValue());
            System.out.println("Loaded ENV: " + entry.getKey() + " = " + entry.getValue());
        });
    }

    public static void main(String[] args) {
        System.out.println("Current Directory: " + new File(".").getAbsolutePath());
        SpringApplication.run(ChessAppApplication.class, args);
    }

    @PostConstruct
    public void init() {
        System.out.println("✅ Checking loaded properties in @PostConstruct...");
        System.out.println("DB_URL = " + System.getProperty("DB_URL"));
        System.out.println("DB_USERNAME = " + System.getProperty("DB_USERNAME"));
        System.out.println("DB_PASSWORD = " + System.getProperty("DB_PASSWORD"));
        System.out.println("GOOGLE_CLIENT_ID = " + System.getProperty("GOOGLE_CLIENT_ID"));
        System.out.println("GOOGLE_CLIENT_SECRET = " + System.getProperty("GOOGLE_CLIENT_SECRET"));
        System.out.println("GOOGLE_REDIRECT_URI = " + System.getProperty("GOOGLE_REDIRECT_URI"));
    }
}
