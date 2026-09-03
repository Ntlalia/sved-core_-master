package com.sved.service;

import com.sved.domain.AuditLog;
import com.sved.dto.DashboardMetricsDTO;
import com.sved.repository.AuditLogRepository;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.OffsetDateTime;
import java.util.List;

@Service
public class AuditLogService {

    private final AuditLogRepository auditLogRepository;

    public AuditLogService(AuditLogRepository auditLogRepository) {
        this.auditLogRepository = auditLogRepository;
    }

    public List<DashboardMetricsDTO.AlertaSeguridadDTO> obtenerAlertasParaDashboard() {
        List<AuditLog> logs = auditLogRepository.findUltimosRegistros(PageRequest.of(0, 5));

        return logs.stream().map(log -> {
            String tipo = determinarTipoAlerta(log.getAccion());
            String haceTiempo = calcularTiempoTranscurrido(log.getCreadoEn());

            return new DashboardMetricsDTO.AlertaSeguridadDTO(
                    "ALT-" + log.getId(),
                    tipo,
                    log.getAccion() != null ? log.getAccion() : "Alerta de Sistema",
                    log.getDescripcion() != null ? log.getDescripcion() : "Sin detalle registrado",
                    haceTiempo
            );
        }).toList();
    }

    private String determinarTipoAlerta(String accion) {
        if (accion == null) return "warning";
        String lowerAccion = accion.toLowerCase();
        if (lowerAccion.contains("fail") || lowerAccion.contains("fallo") || lowerAccion.contains("bloqueo") || lowerAccion.contains("error")) {
            return "error";
        }
        return "warning";
    }

    private String calcularTiempoTranscurrido(OffsetDateTime fecha) {
        if (fecha == null) return "Hace un momento";
        long minutos = Duration.between(fecha, OffsetDateTime.now()).toMinutes();
        if (minutos < 1) return "Hace un momento";
        if (minutos < 60) return "Hace " + minutos + " min";
        long horas = minutos / 60;
        if (horas < 24) return "Hace " + horas + " h";
        return "Hace " + (horas / 24) + " d";
    }
}