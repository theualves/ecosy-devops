package com.ecosy.backend.repository;

import com.ecosy.backend.model.Entrega;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EntregaRepository extends JpaRepository<Entrega, Long> {

    List<Entrega> findByLote_IdLote(Long idLote);

    List<Entrega> findByBeneficiarioId(Long beneficiarioId);
}