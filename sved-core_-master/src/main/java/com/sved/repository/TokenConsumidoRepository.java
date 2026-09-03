package com.sved.repository;

import com.sved.domain.TokenConsumido;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface TokenConsumidoRepository extends JpaRepository<TokenConsumido, UUID> {

    @Query(value = """
        SELECT 
            CAST(tc.id AS VARCHAR) AS txId,
            TO_CHAR(tc.fecha_consumo, 'HH24:MI:SS') AS timestamp,
            cv.nombre AS centroVotacion,
            CASE 
                WHEN tc.estado = 'EXITOSO' THEN 'confirmed'
                WHEN tc.estado = 'PENDIENTE' THEN 'pending'
                ELSE 'rejected'
            END AS estado
        FROM tokens_consumidos tc
        INNER JOIN votantes v ON tc.votante_id = v.id
        INNER JOIN centros_votacion cv ON v.centro_votacion_id = cv.id
        ORDER BY tc.fecha_consumo DESC
        LIMIT 10
        """, nativeQuery = true)
    List<Object[]> obtenerUltimosEventosBlockchain();
}