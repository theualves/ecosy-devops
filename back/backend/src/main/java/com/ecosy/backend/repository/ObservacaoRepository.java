package com.ecosy.backend.repository;

import com.ecosy.backend.model.ObservacaoCampo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ObservacaoRepository extends JpaRepository<ObservacaoCampo, Long> {
    List<ObservacaoCampo> findByBeneficiarioIdOrderByDataCriacaoDesc(Long beneficiarioId);
}
