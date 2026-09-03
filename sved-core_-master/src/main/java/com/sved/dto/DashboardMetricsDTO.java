package com.sved.dto;

import java.util.List;

public record DashboardMetricsDTO(
        long totalPadron,
        long votosRegistrados,
        double participacion,
        String eleccionActiva,
        int peersActivos,
        int totalPeers,
        long latenciaPromedioMs,
        List<DepartamentoParticipacionDTO> participacionPorDepartamento,
        List<EventoBlockchainDTO> ultimosEventos,
        List<AlertaSeguridadDTO> alertasSeguridad
) {
    public record DepartamentoParticipacionDTO(String departamento, long votos) {}
    public record EventoBlockchainDTO(String txId, String timestamp, String centroVotacion, String estado) {}
    public record AlertaSeguridadDTO(String id, String tipo, String titulo, String detalle, String haceTiempo) {}
}