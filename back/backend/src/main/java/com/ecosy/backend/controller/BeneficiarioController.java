package com.ecosy.backend.controller;

import com.ecosy.backend.enums.StatusUsuario;
import com.ecosy.backend.exception.ResourceNotFoundException;
import com.ecosy.backend.model.Beneficiario;
import com.ecosy.backend.repository.BeneficiarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/beneficiarios")
@CrossOrigin(origins = "*") // permite acesso em qaulquer lugar
public class BeneficiarioController {

    @Autowired
    private BeneficiarioRepository repository;

    @GetMapping
    public List<Beneficiario> listar() {
        return repository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Beneficiario> buscarPorId(@PathVariable Long id) {
        Beneficiario obj = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Beneficiário não encontrado com ID: " + id));

        return ResponseEntity.ok(obj);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Beneficiario criar(@RequestBody Beneficiario beneficiario) {

        System.out.println("NOME CHEGOU? " + beneficiario.getNome());
        System.out.println("CPF CHEGOU? " + beneficiario.getCpf());

        return repository.save(beneficiario);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Beneficiario> atualizar(@PathVariable Long id, @RequestBody Beneficiario dadosAtualizados) {

        Beneficiario beneficiarioExistente = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Beneficiário não encontrado com ID: " + id));

        beneficiarioExistente.setNome(dadosAtualizados.getNome());
        beneficiarioExistente.setCpf(dadosAtualizados.getCpf());
        beneficiarioExistente.setTelefone(dadosAtualizados.getTelefone());
        beneficiarioExistente.setAssociacao(dadosAtualizados.getAssociacao());
        beneficiarioExistente.setStatus(dadosAtualizados.getStatus());

        if (dadosAtualizados.getTecnicoResponsavel() != null) {
            beneficiarioExistente.setTecnicoResponsavel(dadosAtualizados.getTecnicoResponsavel());
        }

        if (dadosAtualizados.getEndereco() != null) {
            beneficiarioExistente.getEndereco().setRua(dadosAtualizados.getEndereco().getRua());
            beneficiarioExistente.getEndereco().setCidade(dadosAtualizados.getEndereco().getCidade());
            beneficiarioExistente.getEndereco().setEstado(dadosAtualizados.getEndereco().getEstado());
            beneficiarioExistente.getEndereco().setCep(dadosAtualizados.getEndereco().getCep());
        }

        Beneficiario atualizado = repository.save(beneficiarioExistente);

        return ResponseEntity.ok(atualizado);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluirLogicamente(@PathVariable Long id) {

        Beneficiario beneficiario = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Beneficiário não encontrado com ID: " + id));

        beneficiario.setStatus(StatusUsuario.INATIVO.name());

        // 3. Salva a alteração no banco
        repository.save(beneficiario);

        // 4. Retorna 204 No Content (Padrão de sucesso para delete)
        return ResponseEntity.noContent().build();
    }

}
