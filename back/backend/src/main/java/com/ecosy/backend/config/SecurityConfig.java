package com.ecosy.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration; // <--- Importe isto
import org.springframework.web.cors.CorsConfigurationSource; // <--- Importe isto
import org.springframework.web.cors.UrlBasedCorsConfigurationSource; // <--- Importe isto

import java.util.Arrays;
import java.util.List;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                // 1. Desativa CSRF (necessário para POST/PUT/DELETE funcionarem sem token de sessão)
                .csrf(csrf -> csrf.disable())

                // 2. Ativa a configuração de CORS que definimos abaixo
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))

                // 3. Libera tudo (por enquanto)
                .authorizeHttpRequests(auth -> auth
                        .anyRequest().permitAll()
                );

        return http.build();
    }

    // --- A CONFIGURAÇÃO MÁGICA DE CORS ---
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();

        // Permite o Front-end (pode usar "*" para liberar tudo ou ser específico)
        configuration.setAllowedOrigins(List.of("http://localhost:3000"));

        // OBRIGATÓRIO: Listar explicitamente os verbos permitidos
        // O erro aconteceu porque o DELETE não estava liberado por padrão
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));

        // Permite headers (Authorization, Content-Type, etc)
        configuration.setAllowedHeaders(List.of("*"));

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration); // Aplica para todas as rotas
        return source;
    }
}