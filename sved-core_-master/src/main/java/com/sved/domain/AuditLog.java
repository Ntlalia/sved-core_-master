package com.sved.domain;

import jakarta.persistence.*;
import java.time.OffsetDateTime;

@Entity
@Table(name = "audit_log", schema = "public")
public class AuditLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "componente", length = 50)
    private String componente;

    @Column(name = "accion", length = 100)
    private String accion;

    @Column(name = "descripcion", columnDefinition = "TEXT")
    private String descripcion;

    @Column(name = "ip_origen", length = 45)
    private String ipOrigen;

    @Column(name = "usuario_auditoria", length = 100)
    private String usuarioAuditoria;

    @Column(name = "creado_en")
    private OffsetDateTime creadoEn;

    public AuditLog() {}

    public AuditLog(Long id, String componente, String accion, String descripcion, String ipOrigen, String usuarioAuditoria, OffsetDateTime creadoEn) {
        this.id = id;
        this.componente = componente;
        this.accion = accion;
        this.descripcion = descripcion;
        this.ipOrigen = ipOrigen;
        this.usuarioAuditoria = usuarioAuditoria;
        this.creadoEn = creadoEn;
    }

    // Getters y Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getComponente() { return componente; }
    public void setComponente(String componente) { this.componente = componente; }

    public String getAccion() { return accion; }
    public void setAccion(String accion) { this.accion = accion; }

    public String getDescripcion() { return descripcion; }
    public void setDescripcion(String descripcion) { this.descripcion = descripcion; }

    public String getIpOrigen() { return ipOrigen; }
    public void setIpOrigen(String ipOrigen) { this.ipOrigen = ipOrigen; }

    public String getUsuarioAuditoria() { return usuarioAuditoria; }
    public void setUsuarioAuditoria(String usuarioAuditoria) { this.usuarioAuditoria = usuarioAuditoria; }

    public OffsetDateTime getCreadoEn() { return creadoEn; }
    public void setCreadoEn(OffsetDateTime creadoEn) { this.creadoEn = creadoEn; }
}