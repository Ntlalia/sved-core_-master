package com.sved.repository;

import com.sved.domain.Eleccion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface EleccionRepository
        extends JpaRepository<Eleccion, UUID> {

    Optional<Eleccion> findByEstado(String estado);
}