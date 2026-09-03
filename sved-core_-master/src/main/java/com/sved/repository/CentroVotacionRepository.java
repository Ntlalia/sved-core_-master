package com.sved.repository;

import com.sved.domain.CentroVotacion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface CentroVotacionRepository extends JpaRepository<CentroVotacion, UUID> {

    @Query("""
        SELECT cv.departamento AS departamento, 
               COUNT(v.id) AS votos 
        FROM Votante v 
        JOIN v.centroVotacion cv 
        WHERE v.estadoVoto = 'YA_VOTADO' 
        GROUP BY cv.departamento
    """)
    List<Object[]> obtenerVotosPorDepartamento();
}