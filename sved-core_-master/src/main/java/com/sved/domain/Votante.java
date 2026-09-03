package com.sved.domain;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.OffsetDateTime;
import java.util.UUID;

@Entity
@Table(name = "votantes")
@Data
@NoArgsConstructor
public class Votante {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id", updatable = false, nullable = false)
    private UUID id;

    @Column(name = "dui", nullable = false,
            unique = true, length = 10)
    private String dui;

    @Column(name = "nombre", nullable = false, length = 100)
    private String nombre;

    @Column(name = "apellidos", nullable = false, length = 100)
    private String apellidos;

    @Column(name = "email", nullable = false,
            unique = true, length = 150)
    private String email;

    @Column(name = "biometrix_external_id", unique = true)
    private UUID biometrixExternalId;

    @Column(name = "estado_voto", nullable = false, length = 20)
    private String estadoVoto;

    @Column(name = "habilitado", nullable = false)
    private Boolean habilitado;

    @Column(name = "creado_en")
    private OffsetDateTime creadoEn;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "centro_votacion_id")
    private CentroVotacion centroVotacion;
}