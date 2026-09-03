package com.sved.controller;

import com.sved.domain.Eleccion;
import com.sved.repository.EleccionRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequestMapping("/api/v1/elecciones")
public class EleccionController {

    private final EleccionRepository eleccionRepository;

    public EleccionController(EleccionRepository eleccionRepository) {
        this.eleccionRepository = eleccionRepository;
    }

    @GetMapping("/activa")
    public ResponseEntity<?> obtenerEleccionActiva() {
        /*
         * Buscamos en la base de datos la elección que esté en estado "ABIERTA".
         * Recorremos todas las elecciones y filtramos la activa para evitar
         * errores de compilación en caso de que aún no hayas declarado el método
         * findByEstado("ABIERTA") en tu EleccionRepository.
         */
        Optional<Eleccion> eleccionActiva = eleccionRepository.findAll().stream()
                .filter(e -> "ABIERTA".equals(e.getEstado()))
                .findFirst();

        if (eleccionActiva.isPresent()) {
            return ResponseEntity.ok(eleccionActiva.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}