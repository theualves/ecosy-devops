package com.ecosy.backend.controller;

import com.ecosy.backend.exception.ResourceNotFoundException;
import com.ecosy.backend.model.ObservacaoCampo;
import com.ecosy.backend.repository.ObservacaoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/observacoes")
@CrossOrigin(origins = "*")
public class ObservacaoController {

    @Autowired
    private ObservacaoRepository repository;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ObservacaoCampo criar(@RequestBody ObservacaoCampo observacao) {
        return repository.save(observacao);
    }

    @GetMapping("/beneficiario/{beneficiarioId}")
    public List<ObservacaoCampo> listarPorBeneficiario(@PathVariable Long beneficiarioId) {
        return repository.findByBeneficiarioIdOrderByDataCriacaoDesc(beneficiarioId);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ObservacaoCampo> atualizar(@PathVariable Long id, @RequestBody ObservacaoCampo dados) {
        ObservacaoCampo obs = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Observação não encontrada: " + id));

        obs.setDescricao(dados.getDescricao());

        return ResponseEntity.ok(repository.save(obs));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        if (!repository.existsById(id)) {
            throw new ResourceNotFoundException("Observação não encontrada: " + id);
        }
        repository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}