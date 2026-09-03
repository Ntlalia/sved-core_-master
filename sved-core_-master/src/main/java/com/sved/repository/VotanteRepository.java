package com.sved.repository;

import com.sved.domain.Votante;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface VotanteRepository
        extends JpaRepository<Votante, UUID> {

    Optional<Votante> findByDui(String dui);

    @Query("""
        SELECT v FROM Votante v
        JOIN FETCH v.centroVotacion cv
        WHERE v.dui = :dui
        AND v.habilitado = true
        AND v.estadoVoto = 'NO_VOTADO'
        """)
    Optional<Votante> findHabilitadoParaVotar(
            @Param("dui") String dui
    );

    @Modifying
    @Transactional // <-- ¡Esta es la anotación que falta!
    @Query("""
        UPDATE Votante v
        SET v.estadoVoto = 'YA_VOTADO'
        WHERE v.id = :id
        """)
    int marcarComoVotado(@Param("id") UUID id);

    // Método para contar cuántos votantes tienen un estado específico
    long countByEstadoVoto(String estadoVoto);
}