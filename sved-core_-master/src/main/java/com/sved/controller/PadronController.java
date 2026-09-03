package com.sved.controller;

import com.sved.domain.Votante;
import com.sved.repository.VotanteRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/v1")
public class PadronController {

    private final VotanteRepository votanteRepository;

    public PadronController(VotanteRepository votanteRepository) {
        this.votanteRepository = votanteRepository;
    }

    // Endpoint de salud - verifica que el servidor corre
    @GetMapping("/health")
    public ResponseEntity<Map<String, String>> health() {
        return ResponseEntity.ok(Map.of(
                "status", "OK",
                "sistema", "SVED Core",
                "version", "1.0"
        ));
    }

    // Endpoint del operador de mesa - busca votante por DUI
    @GetMapping("/padron/{dui}")
    public ResponseEntity<?> buscarVotante(
            @PathVariable String dui) {

        return votanteRepository.findByDui(dui)
                .map(v -> ResponseEntity.ok(Map.of(
                        "id",          v.getId(),
                        "dui",         v.getDui(),
                        "nombre",      v.getNombre() + " " + v.getApellidos(),
                        "estadoVoto",  v.getEstadoVoto(),
                        "habilitado",  v.getHabilitado(),
                        "centro",      v.getCentroVotacion() != null
                                ? v.getCentroVotacion().getNombre()
                                : "Sin centro",
                        "resultado",   obtenerResultado(v)
                )))
                .orElse(ResponseEntity.notFound().build());
    }

    private String obtenerResultado(Votante v) {
        if (!v.getHabilitado())
            return " Votante bloqueado";
        if ("YA_VOTADO".equals(v.getEstadoVoto()))
            return "Este votante ya votó";
        if ("NO_VOTADO".equals(v.getEstadoVoto()))
            return "✅ Habilitado para votar";
        return " Estado desconocido";
    }
}