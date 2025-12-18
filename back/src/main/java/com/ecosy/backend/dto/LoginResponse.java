package com.ecosy.backend.dto;

public class LoginResponse {
    public Long id;
    public String nome;
    public String email;
    public String role;
    public String token;

    public LoginResponse(Long id, String nome, String email, String role, String token) {
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.role = role;
        this.token = token;
    }
}
