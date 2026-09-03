package com.sved.controller;

import com.sved.repository.VotanteRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Random;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/votos")
public class VotoController {

    private final VotanteRepository votanteRepository;

    public VotoController(VotanteRepository votanteRepository) {
        this.votanteRepository = votanteRepository;
    }

    @PostMapping("/emitir")
    public ResponseEntity<?> emitirVoto(@RequestBody VotoRequestDTO request) {

        // 1. Validamos que el request traiga el ID del votante
        if (request.getVotanteId() != null) {
            // Actualizamos la base de datos a YA_VOTADO
            votanteRepository.marcarComoVotado(request.getVotanteId());
        }

        // 2. Simulamos la respuesta de la blockchain
        String mockTransactionHash = "0x" + UUID.randomUUID().toString().replace("-", "") + "a7c3e2";
        int mockBloque = new Random().nextInt(5000) + 40000;

        return ResponseEntity.ok(Map.of(
                "transactionId", mockTransactionHash,
                "bloque", mockBloque
        ));
    }

    @GetMapping("/verificar/{hash}")
    public ResponseEntity<?> verificarVoto(@PathVariable String hash) {
        if (hash == null || hash.trim().isEmpty() || !hash.startsWith("0x") || hash.length() < 15) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(Map.of(
                "txId", hash,
                "timestamp", java.time.OffsetDateTime.now().toString(),
                "bloque", new Random().nextInt(5000) + 40000,
                "status", "CONFIRMADO",
                "zkpHash", "zkp_" + UUID.randomUUID().toString().replace("-", ""),
                "signature", "sig_" + UUID.randomUUID().toString().replace("-", "")
        ));
    }
}

class VotoRequestDTO {
    private String voteToken;
    private Integer candidatoId;
    private UUID votanteId; // Agregamos este campo para saber a quién bloquear

    public String getVoteToken() { return voteToken; }
    public void setVoteToken(String voteToken) { this.voteToken = voteToken; }

    public Integer getCandidatoId() { return candidatoId; }
    public void setCandidatoId(Integer candidatoId) { this.candidatoId = candidatoId; }

    public UUID getVotanteId() { return votanteId; }
    public void setVotanteId(UUID votanteId) { this.votanteId = votanteId; }
}