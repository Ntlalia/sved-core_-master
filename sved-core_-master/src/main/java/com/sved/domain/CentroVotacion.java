package com.sved.domain;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.OffsetDateTime;
import java.util.UUID;

@Entity
@Table(name = "centros_votacion")
@Data
@NoArgsConstructor
public class CentroVotacion {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id", updatable = false, nullable = false)
    private UUID id;

    @Column(name = "nombre", nullable = false, length = 150)
    private String nombre;

    @Column(name = "municipio", nullable = false, length = 100)
    private String municipio;

    @Column(name = "departamento", nullable = false, length = 50)
    private String departamento;

    @Column(name = "direccion", nullable = false)
    private String direccion;

    @Column(name = "creado_en")
    private OffsetDateTime creadoEn;
}