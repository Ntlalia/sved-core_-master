package com.sved.dto;

public record AdminDTO(
        Long id,
        String usuario,
        String nombre,
        String rol
) {}