package com.sved.dto;

public record AlertaSeguridadDTO(
        String id,
        String tipo,
        String titulo,
        String detalle,
        String haceTiempo
) {}