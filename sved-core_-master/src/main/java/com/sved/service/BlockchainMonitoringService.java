package com.sved.service;

import org.springframework.stereotype.Service;
import java.util.Random;

@Service
public class BlockchainMonitoringService {

    private final Random random = new Random();

    public int obtenerPeersActivos() {
        // Simula la disponibilidad de los 3 nodos de la red (TSE, Universidad, Junta)
        // En condiciones normales mantiene 3 nodos activos
        return random.nextDouble() > 0.95 ? 2 : 3;
    }

    public long obtenerLatenciaPromedioMs() {
        // Simula latencia de respuesta de la red entre 45ms y 120ms
        return 45 + random.nextInt(75);
    }
}