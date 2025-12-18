package com.ecosy.backend.controller;

import com.ecosy.backend.dto.LoginRequest;
import com.ecosy.backend.dto.LoginResponse;
import com.ecosy.backend.enums.StatusUsuario;
import com.ecosy.backend.exception.ResourceNotFoundException;
import com.ecosy.backend.model.Usuario;
import com.ecosy.backend.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/usuarios")
@CrossOrigin(origins = "*")
public class UsuarioController {

    @Autowired
    private UsuarioRepository repository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @GetMapping
    public List<Usuario> listar(){
        return repository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Usuario> buscarPorId(@PathVariable Long id) {
        Usuario usuario = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Usuário não encontrado com ID: " + id));

        return ResponseEntity.ok(usuario);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Usuario criar(@RequestBody Usuario usuario) {
        String senhaPlana = usuario.getSenha();
        String senhaCriptografada = passwordEncoder.encode(senhaPlana);
        usuario.setSenha(senhaCriptografada);

        return repository.save(usuario);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginData) {

        Usuario usuario = repository.findByEmail(loginData.email);

        if (usuario != null && passwordEncoder.matches(loginData.senha, usuario.getSenha())) {

            String roleFormatada = usuario.getNivelAcesso().name().toLowerCase();

            LoginResponse response = new LoginResponse(
                    usuario.getId(),
                    usuario.getNome(),
                    usuario.getEmail(),
                    roleFormatada,
                    "token-simulado-backend-" + usuario.getId() // Token provisório
            );

            return ResponseEntity.ok(response);
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Email ou senha inválidos");
    }

    @PutMapping("/{id}")
    public ResponseEntity<Usuario> atualizar(@PathVariable Long id, @RequestBody Usuario dadosAtualizados) {
        Usuario usuario = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Usuário não encontrado com ID: " + id));

        usuario.setNome(dadosAtualizados.getNome());
        usuario.setSobrenome(dadosAtualizados.getSobrenome());
        usuario.setEmail(dadosAtualizados.getEmail());
        usuario.setNivelAcesso(dadosAtualizados.getNivelAcesso()); // GESTOR ou TECNICO

        return ResponseEntity.ok(repository.save(usuario));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> inativar(@PathVariable Long id) {
        Usuario usuario = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Usuário não encontrado com ID: " + id));

        usuario.setStatusUsuario(StatusUsuario.INATIVO);

        repository.save(usuario);
        return ResponseEntity.noContent().build();
    }

}
