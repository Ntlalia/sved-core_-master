package com.sved.service;

import com.sved.domain.Votante;
import com.sved.dto.VotanteDTO;
import com.sved.repository.VotanteRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
public class PadronService {

    @Autowired
    private VotanteRepository votanteRepository;

    public VotanteDTO verificarElegibilidad(String dui)
            throws Exception {

        Votante votante = votanteRepository
                .findHabilitadoParaVotar(dui)
                .orElseThrow(() ->
                        new Exception(
                                "Votante no habilitado o ya votó"));

        VotanteDTO dto = new VotanteDTO();

        dto.setId(votante.getId());
        dto.setDui(votante.getDui());

        dto.setNombre(
                votante.getNombre()
                        + " " +
                        votante.getApellidos());

        dto.setHabilitado(
                votante.getHabilitado());

        dto.setEstadoVoto(
                votante.getEstadoVoto());

        return dto;
    }

    @Transactional
    public void marcarComoVotado(UUID id) {

        votanteRepository.marcarComoVotado(id);
    }
}