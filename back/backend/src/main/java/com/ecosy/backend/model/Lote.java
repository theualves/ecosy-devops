package com.ecosy.backend.model;

import com.ecosy.backend.enums.StatusLote;
import jakarta.persistence.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "lotes")
public class Lote {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idLote;

    @Column(nullable = false, unique = true)
    private String codigo;

    @Column(nullable = false)
    private String tipoSemente;

    @Column(nullable = false)
    private BigDecimal quantidadeTotal;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private StatusLote statusLote;

    private LocalDate dataAquisicao;
    private String origem;

    @ManyToOne
    @JoinColumn(name = "criado_por_id", nullable = false)
    private Usuario criadoPor;

    public Lote() {
    }

    public Long getIdLote() {
        return idLote;
    }

    public void setIdLote(Long idLote) {
        this.idLote = idLote;
    }

    public String getCodigo() {
        return codigo;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public String getTipoSemente() {
        return tipoSemente;
    }

    public void setTipoSemente(String tipoSemente) {
        this.tipoSemente = tipoSemente;
    }

    public BigDecimal getQuantidadeTotal() {
        return quantidadeTotal;
    }

    public void setQuantidadeTotal(BigDecimal quantidadeTotal) {
        this.quantidadeTotal = quantidadeTotal;
    }

    public StatusLote getStatusLote() {
        return statusLote;
    }

    public void setStatusLote(StatusLote statusLote) {
        this.statusLote = statusLote;
    }

    public LocalDate getDataAquisicao() {
        return dataAquisicao;
    }

    public void setDataAquisicao(LocalDate dataAquisicao) {
        this.dataAquisicao = dataAquisicao;
    }

    public String getOrigem() {
        return origem;
    }

    public void setOrigem(String origem) {
        this.origem = origem;
    }

    public Usuario getCriadoPor() {
        return criadoPor;
    }

    public void setCriadoPor(Usuario criadoPor) {
        this.criadoPor = criadoPor;
    }
}
