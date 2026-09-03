package com.sved.controller;

import com.sved.dto.AdminDTO;
import com.sved.dto.AdminLoginDTO;
import com.sved.dto.AdminLoginResponseDTO;
import com.sved.repository.AdministradorRepository;
import com.sved.service.AdminAuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/admin")
public class AdminController {

    private final AdminAuthService adminAuthService;
    private final AdministradorRepository administradorRepository;

    public AdminController(AdminAuthService adminAuthService, AdministradorRepository administradorRepository) {
        this.adminAuthService = adminAuthService;
        this.administradorRepository = administradorRepository;
    }

    @PostMapping("/login")
    public ResponseEntity<AdminLoginResponseDTO> login(@RequestBody AdminLoginDTO request) {
        AdminLoginResponseDTO response = adminAuthService.login(request);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/lista")
    public ResponseEntity<List<AdminDTO>> listarAdministradores() {
        List<AdminDTO> admins = administradorRepository.findAll().stream()
                .map(admin -> new AdminDTO(
                        admin.getId(),
                        admin.getUsuario(),
                        admin.getNombre(),
                        admin.getRol()
                ))
                .toList();

        return ResponseEntity.ok(admins);
    }
}