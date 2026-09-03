package com.sved.domain;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "tokens_consumidos")
public class TokenConsumido {

    @Id
    @Column(name = "jti")
    private UUID jti;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "votante_id")
    private Votante votante;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "eleccion_id")
    private Eleccion eleccion;

    @Column(name = "consumido_en")
    private LocalDateTime consumidoEn;

    // Constructores
    public TokenConsumido() {}

    public TokenConsumido(UUID jti, Votante votante, Eleccion eleccion, LocalDateTime consumidoEn) {
        this.jti = jti;
        this.votante = votante;
        this.eleccion = eleccion;
        this.consumidoEn = consumidoEn;
    }

    // Getters y Setters
    public UUID getJti() {
        return jti;
    }

    public void setJti(UUID jti) {
        this.jti = jti;
    }

    public Votante getVotante() {
        return votante;
    }

    public void setVotante(Votante votante) {
        this.votante = votante;
    }

    public Eleccion getEleccion() {
        return eleccion;
    }

    public void setEleccion(Eleccion eleccion) {
        this.eleccion = eleccion;
    }

    public LocalDateTime getConsumidoEn() {
        return consumidoEn;
    }

    public void setConsumidoEn(LocalDateTime consumidoEn) {
        this.consumidoEn = consumidoEn;
    }
}