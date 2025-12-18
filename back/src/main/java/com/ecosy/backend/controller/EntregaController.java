package com.ecosy.backend.controller;

import com.ecosy.backend.exception.ResourceNotFoundException; // <--- Importe nossa exceção customizada
import com.ecosy.backend.model.Beneficiario;
import com.ecosy.backend.model.Entrega;
import com.ecosy.backend.model.Lote;
import com.ecosy.backend.model.Usuario;
import com.ecosy.backend.repository.BeneficiarioRepository;
import com.ecosy.backend.repository.EntregaRepository;
import com.ecosy.backend.repository.LoteRepository;
import com.ecosy.backend.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/entregas")
@CrossOrigin(origins = "*")
public class EntregaController {

    @Autowired
    private EntregaRepository repository;
    @Autowired
    private LoteRepository loteRepository;
    @Autowired
    private BeneficiarioRepository beneficiarioRepository;
    @Autowired
    private UsuarioRepository usuarioRepository;

    @GetMapping
    public List<Entrega> listar() {
        return repository.findAll();
    }

    @GetMapping("/lote/{loteId}")
    public List<Entrega> listarPorLote(@PathVariable Long loteId) {
        // Opcional: Verificar se o lote existe antes de buscar
        if(!loteRepository.existsById(loteId)) {
            throw new ResourceNotFoundException("Lote não encontrado com ID: " + loteId);
        }
        return repository.findByLote_IdLote(loteId);
    }

    @GetMapping("/beneficiario/{beneficiarioId}")
    public List<Entrega> listarPorBeneficiario(@PathVariable Long beneficiarioId) {
        if(!beneficiarioRepository.existsById(beneficiarioId)) {
            throw new ResourceNotFoundException("Beneficiário não encontrado com ID: " + beneficiarioId);
        }
        return repository.findByBeneficiarioId(beneficiarioId);
    }

    // --- ATUALIZADO: Usando ResourceNotFoundException ---
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Entrega criar(@RequestBody Entrega entregaInput) {

        Lote loteReal = loteRepository.findById(entregaInput.getLote().getIdLote())
                .orElseThrow(() -> new ResourceNotFoundException("Lote não encontrado com ID: " + entregaInput.getLote().getIdLote()));

        Beneficiario beneficiarioReal = beneficiarioRepository.findById(entregaInput.getBeneficiario().getId())
                .orElseThrow(() -> new ResourceNotFoundException("Beneficiário não encontrado com ID: " + entregaInput.getBeneficiario().getId()));

        Usuario tecnicoReal = usuarioRepository.findById(entregaInput.getUsuario().getId())
                .orElseThrow(() -> new ResourceNotFoundException("Técnico não encontrado com ID: " + entregaInput.getUsuario().getId()));

        entregaInput.setLote(loteReal);
        entregaInput.setBeneficiario(beneficiarioReal);
        entregaInput.setUsuario(tecnicoReal);

        return repository.save(entregaInput);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Entrega> atualizar(@PathVariable Long id, @RequestBody Entrega dados) {

        Entrega entregaExistente = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Entrega não encontrada com ID: " + id));

        entregaExistente.setQtdEntregue(dados.getQtdEntregue());
        entregaExistente.setStatusEntrega(dados.getStatusEntrega());

        if (dados.getDataEntrega() != null) {
            entregaExistente.setDataEntrega(dados.getDataEntrega());
        }

        Entrega entregaAtualizada = repository.save(entregaExistente);

        return ResponseEntity.ok(entregaAtualizada);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {

        if (!repository.existsById(id)) {
            throw new ResourceNotFoundException("Entrega não encontrada com ID: " + id);
        }

        repository.deleteById(id);

        // 3. Retorna 204 No Content
        return ResponseEntity.noContent().build();
    }
}