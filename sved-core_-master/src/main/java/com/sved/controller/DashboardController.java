package com.sved.controller;

import com.sved.domain.Eleccion;
import com.sved.dto.DashboardMetricsDTO;
import com.sved.repository.CentroVotacionRepository;
import com.sved.repository.EleccionRepository;
import com.sved.repository.TokenConsumidoRepository;
import com.sved.repository.VotanteRepository;
import com.sved.service.AuditLogService;
import com.sved.service.BlockchainMonitoringService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/dashboard")
public class DashboardController {

    private final VotanteRepository votanteRepository;
    private final EleccionRepository eleccionRepository;
    private final CentroVotacionRepository centroVotacionRepository;
    private final TokenConsumidoRepository tokenConsumidoRepository;
    private final BlockchainMonitoringService blockchainMonitoringService;
    private final AuditLogService auditLogService;

    public DashboardController(
            VotanteRepository votanteRepository,
            EleccionRepository eleccionRepository,
            CentroVotacionRepository centroVotacionRepository,
            TokenConsumidoRepository tokenConsumidoRepository,
            BlockchainMonitoringService blockchainMonitoringService,
            AuditLogService auditLogService) {
        this.votanteRepository = votanteRepository;
        this.eleccionRepository = eleccionRepository;
        this.centroVotacionRepository = centroVotacionRepository;
        this.tokenConsumidoRepository = tokenConsumidoRepository;
        this.blockchainMonitoringService = blockchainMonitoringService;
        this.auditLogService = auditLogService;
    }

    @GetMapping("/metricas")
    public ResponseEntity<DashboardMetricsDTO> obtenerMetricas() {
        // 1. Totales de padrón y votación
        long totalPadron = votanteRepository.count();
        long votosRegistrados = votanteRepository.countByEstadoVoto("YA_VOTADO");

        double participacion = 0.0;
        if (totalPadron > 0) {
            participacion = ((double) votosRegistrados / totalPadron) * 100;
        }

        // 2. Elección Activa
        Optional<Eleccion> eleccionActiva = eleccionRepository.findAll().stream()
                .filter(e -> "ABIERTA".equals(e.getEstado()))
                .findFirst();
        String nombreEleccion = eleccionActiva.map(Eleccion::getNombre).orElse("Sin elección activa");

        // 3. Métricas de Red Blockchain (Monitoreo)
        int peersActivos = blockchainMonitoringService.obtenerPeersActivos();
        long latencia = blockchainMonitoringService.obtenerLatenciaPromedioMs();

        // 4. Participación por Departamento
        List<DashboardMetricsDTO.DepartamentoParticipacionDTO> deptoList = new ArrayList<>();
        List<Object[]> resultadosDepto = centroVotacionRepository.obtenerVotosPorDepartamento();

        for (Object[] row : resultadosDepto) {
            String depto = (String) row[0];
            long votos = (Long) row[1];
            deptoList.add(new DashboardMetricsDTO.DepartamentoParticipacionDTO(depto, votos));
        }

        // 5. Eventos Blockchain desde la tabla tokens_consumidos
        List<DashboardMetricsDTO.EventoBlockchainDTO> eventos = tokenConsumidoRepository
                .obtenerUltimosEventosBlockchain()
                .stream()
                .map(row -> new DashboardMetricsDTO.EventoBlockchainDTO(
                        (String) row[0],
                        (String) row[1],
                        (String) row[2],
                        (String) row[3]
                ))
                .toList();

        // 6. Alertas de Seguridad desde audit_log
        List<DashboardMetricsDTO.AlertaSeguridadDTO> alertas = auditLogService.obtenerAlertasParaDashboard();

        DashboardMetricsDTO response = new DashboardMetricsDTO(
                totalPadron,
                votosRegistrados,
                Math.round(participacion * 100.0) / 100.0,
                nombreEleccion,
                peersActivos,
                3,
                latencia,
                deptoList,
                eventos,
                alertas
        );

        return ResponseEntity.ok(response);
    }
}