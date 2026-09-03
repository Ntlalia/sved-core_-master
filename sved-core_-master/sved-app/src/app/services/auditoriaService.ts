import type { AuditLogResponse } from '../types/auditoria';

const API_BASE_URL = 'http://localhost:8080/api/v1/auditoria';

export const fetchAuditLogs = async (page: number = 0, size: number = 10): Promise<AuditLogResponse> => {
  const response = await fetch(`${API_BASE_URL}?page=${page}&size=${size}`);

  if (!response.ok) {
    throw new Error('Error al obtener la bitácora de auditoría');
  }

  return response.json();
};