package com.sved.dto;

import java.util.UUID;

public class VotanteDTO {

    private UUID id;

    private String dui;

    private String nombre;

    private Boolean habilitado;

    private String estadoVoto;

    // ===== GETTERS Y SETTERS =====

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getDui() {
        return dui;
    }

    public void setDui(String dui) {
        this.dui = dui;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public Boolean getHabilitado() {
        return habilitado;
    }

    public void setHabilitado(Boolean habilitado) {
        this.habilitado = habilitado;
    }

    public String getEstadoVoto() {
        return estadoVoto;
    }

    public void setEstadoVoto(String estadoVoto) {
        this.estadoVoto = estadoVoto;
    }
}
