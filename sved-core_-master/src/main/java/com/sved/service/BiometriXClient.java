package com.sved.service;

import com.sved.dto.VerificacionDTO;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class BiometriXClient {

    // Método 1
    public String obtenerSessionToken(UUID externalId) {

        // MOCK
        return "TOKEN_MOCK_123";
    }

    // Método 2
    public VerificacionDTO verificarBiometria(
            String token,
            UUID externalId,
            String muestra) {

        // MOCK
        VerificacionDTO dto = new VerificacionDTO();

        dto.setDecision("match");
        dto.setConfidenceScore(0.97);
        dto.setStatus("success");

        return dto;
    }
}