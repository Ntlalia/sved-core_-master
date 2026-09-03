export interface AuditLogItem {
  id: number;
  componente: string;
  accion: string;
  descripcion: string;
  ipOrigen: string;
  usuarioAuditoria: string;
  creadoEn: string;
}

export interface AuditLogResponse {
  content: AuditLogItem[];
  totalPages: number;
  totalElements: number;
  number: number;
  size: number;
}