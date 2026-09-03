package com.sved.dto;

public class AdminLoginResponseDTO {

    private String token;
    private String usuario;
    private String nombre;
    private String rol;

    public AdminLoginResponseDTO() {
    }

    public AdminLoginResponseDTO(String token, String usuario, String nombre, String rol) {
        this.token = token;
        this.usuario = usuario;
        this.nombre = nombre;
        this.rol = rol;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getUsuario() {
        return usuario;
    }

    public void setUsuario(String usuario) {
        this.usuario = usuario;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getRol() {
        return rol;
    }

    public void setRol(String rol) {
        this.rol = rol;
    }
}