package com.ecosy.backend.repository;

import com.ecosy.backend.model.Beneficiario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BeneficiarioRepository extends JpaRepository<Beneficiario, Long> {
    //Aqui podemos criar as nossas buscas personalizados no futuro
}
