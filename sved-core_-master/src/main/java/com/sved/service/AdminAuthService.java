 package com.sved.service;

import com.sved.domain.Administrador;
import com.sved.dto.AdminLoginDTO;
import com.sved.dto.AdminLoginResponseDTO;
import com.sved.repository.AdministradorRepository;
import com.sved.security.JwtService;
import org.springframework.stereotype.Service;

@Service
public class AdminAuthService {

    private final AdministradorRepository administradorRepository;
    private final JwtService jwtService;

    public AdminAuthService(
            AdministradorRepository administradorRepository,
            JwtService jwtService) {

        this.administradorRepository = administradorRepository;
        this.jwtService = jwtService;
    }

    public AdminLoginResponseDTO login(AdminLoginDTO request) {

        Administrador admin = administradorRepository
                .findByUsuario(request.getUsuario())
                .orElseThrow(() ->
                        new RuntimeException("Usuario o contraseña incorrectos"));

        if (!admin.getContrasena().equals(request.getContrasena())) {
            throw new RuntimeException("Usuario o contraseña incorrectos");
        }

        String token = jwtService.generarTokenAdmin(
                admin.getUsuario(),
                admin.getRol()
        );

        return new AdminLoginResponseDTO(
                token,
                admin.getUsuario(),
                admin.getNombre(),
                admin.getRol()
        );
    }
}
