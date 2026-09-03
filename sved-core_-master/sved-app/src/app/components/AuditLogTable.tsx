import React, { useEffect, useState } from 'react';
import type { AuditLogItem, AuditLogResponse } from '../types/auditoria';
import { fetchAuditLogs } from '../services/auditoriaService';

export const AuditLogTable: React.FC = () => {
  const [logs, setLogs] = useState<AuditLogItem[]>([]);
  const [page, setPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = async (currentPage: number) => {
    setLoading(true);
    setError(null);
    try {
      const data: AuditLogResponse = await fetchAuditLogs(currentPage, 10);
      setLogs(data.content);
      setTotalPages(data.totalPages);
    } catch (err: any) {
      setError(err.message || 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData(page);
  }, [page]);

  if (loading) return <div className="p-4 text-gray-500">Cargando bitácora de auditoría...</div>;
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Bitácora de Auditoría del Sistema</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 text-left text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 font-medium text-gray-500">ID</th>
              <th className="px-4 py-2 font-medium text-gray-500">Componente</th>
              <th className="px-4 py-2 font-medium text-gray-500">Acción</th>
              <th className="px-4 py-2 font-medium text-gray-500">Descripción</th>
              <th className="px-4 py-2 font-medium text-gray-500">IP Origen</th>
              <th className="px-4 py-2 font-medium text-gray-500">Usuario</th>
              <th className="px-4 py-2 font-medium text-gray-500">Fecha</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {logs.map((log) => (
              <tr key={log.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 font-mono text-xs">{log.id}</td>
                <td className="px-4 py-2 font-semibold text-gray-700">{log.componente}</td>
                <td className="px-4 py-2 text-indigo-600">{log.accion}</td>
                <td className="px-4 py-2 text-gray-600">{log.descripcion || '-'}</td>
                <td className="px-4 py-2 font-mono text-xs text-gray-500">{log.ipOrigen}</td>
                <td className="px-4 py-2 text-gray-700">{log.usuarioAuditoria}</td>
                <td className="px-4 py-2 text-xs text-gray-500">
                  {new Date(log.creadoEn).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200">
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 0))}
          disabled={page === 0}
          className="px-3 py-1 bg-gray-200 rounded text-sm disabled:opacity-50"
        >
          Anterior
        </button>
        <span className="text-sm text-gray-600">
          Página {page + 1} de {totalPages}
        </span>
        <button
          onClick={() => setPage((p) => Math.min(p + 1, totalPages - 1))}
          disabled={page >= totalPages - 1}
          className="px-3 py-1 bg-gray-200 rounded text-sm disabled:opacity-50"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};