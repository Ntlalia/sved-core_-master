package com.sved.controller;

import com.sved.dto.VerificacionDTO;
import com.sved.dto.VotanteDTO;
import com.sved.service.BiometriXClient;
import com.sved.service.PadronService;
import com.sved.security.JwtService;

import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    private final PadronService padronService;
    private final BiometriXClient biometriXClient;
    private final JwtService jwtService;

    public AuthController(
            PadronService padronService,
            BiometriXClient biometriXClient,
            JwtService jwtService) {

        this.padronService = padronService;
        this.biometriXClient = biometriXClient;
        this.jwtService = jwtService;
    }

    @GetMapping("/iniciar")
    public String iniciar(@RequestParam String dui) {

        try {

            VotanteDTO votante =
                    padronService.verificarElegibilidad(dui);

            return biometriXClient.obtenerSessionToken(
                    votante.getId()
            );

        } catch (Exception e) {

            return e.getMessage();
        }
    }

    @PostMapping("/verificar")
    public String verificar(
            @RequestParam String token,
            @RequestParam String muestra,
            @RequestParam String eleccionId) {

        VerificacionDTO resultado =
                biometriXClient.verificarBiometria(
                        token,
                        null,
                        muestra
                );

        if (!"match".equals(resultado.getDecision())) {
            return "Biometría inválida";
        }

        return jwtService.generarTokenDeVoto(
                UUID.fromString(eleccionId)
        );
    }

    @PostMapping("/revocar/{dui}")
    public String revocar(
            @PathVariable String dui) {

        return "Votante bloqueado: " + dui;
    }
}

