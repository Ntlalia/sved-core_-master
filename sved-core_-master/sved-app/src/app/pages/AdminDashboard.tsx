import { useState, useEffect } from "react";
import { Card } from "../components/Card";
import { Badge } from "../components/Badge";
import { Alert } from "../components/Alert";
import { Button } from "../components/Button";
import { api } from "../lib/api";
import { AuditLogTable } from '../components/AuditLogTable';

import {
  LayoutDashboard,
  Vote,
  Users,
  Network,
  FileText,
  Settings,
  TrendingUp,
  Activity,
  MapPin,
  ArrowRight,
  Shield
} from "lucide-react";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

// Interfaces adaptadas al DTO de Spring Boot
interface DepartamentoParticipacion {
  departamento: string;
  votos: number;
}

interface EventoBlockchain {
  txId: string;
  timestamp: string;
  centroVotacion: string;
  estado: string;
}

interface AlertaSeguridad {
  id: string;
  tipo: "error" | "warning" | "info";
  titulo: string;
  detalle: string;
  haceTiempo: string;
}

interface DashboardMetrics {
  totalPadron: number;
  votosRegistrados: number;
  participacion: number;
  eleccionActiva: string;
  peersActivos: number;
  totalPeers: number;
  latenciaPromedioMs: number;
  participacionPorDepartamento: DepartamentoParticipacion[];
  ultimosEventos: EventoBlockchain[];
  alertasSeguridad: AlertaSeguridad[];
}

interface Administrador {
  id: number;
  usuario: string;
  nombre: string;
  rol: string;
}

const participationDataMock = [
  { hour: "07:00", votes: 12340 },
  { hour: "08:00", votes: 45620 },
  { hour: "09:00", votes: 89450 },
  { hour: "10:00", votes: 156780 },
  { hour: "11:00", votes: 214560 },
  { hour: "12:00", votes: 284731 }
];

export function AdminDashboard() {
  const [metrics, setMetrics] = useState<DashboardMetrics>({
    totalPadron: 0,
    votosRegistrados: 0,
    participacion: 0,
    eleccionActiva: "Cargando métricas...",
    peersActivos: 3,
    totalPeers: 3,
    latenciaPromedioMs: 0,
    participacionPorDepartamento: [],
    ultimosEventos: [],
    alertasSeguridad: []
  });

  // ESTADOS PARA LOS ADMINISTRADORES (Añadidos)
  const [administradores, setAdministradores] = useState<Administrador[]>([]);
  const [adminSeleccionado, setAdminSeleccionado] = useState<Administrador | null>(null);

  // 1. Carga de métricas del Dashboard (polling cada 10 segundos)
  useEffect(() => {
    const fetchMetricas = async () => {
      try {
        const response = await api.get<DashboardMetrics>("/dashboard/metricas");
        setMetrics(response.data);
      } catch (error) {
        console.error("Error al cargar métricas del dashboard:", error);
      }
    };

    fetchMetricas();
    const interval = setInterval(fetchMetricas, 10000);
    return () => clearInterval(interval);
  }, []);

  // 2. Carga de la lista de Administradores
  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const response = await api.get<Administrador[]>("/admin/lista");
        setAdministradores(response.data);
        if (response.data.length > 0) {
          setAdminSeleccionado(response.data[0]);
        }
      } catch (error) {
        console.error("Error al obtener la lista de administradores:", error);
      }
    };

    fetchAdmins();
  }, []);

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", active: true },
    { icon: Vote, label: "Gestión de Elecciones", active: false },
    { icon: Users, label: "Padrón Electoral", active: false },
    { icon: Network, label: "Monitoreo Blockchain", active: false },
    { icon: FileText, label: "Reportes y Auditoría", active: false },
    { icon: Settings, label: "Configuración", active: false }
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* SIDEBAR */}
      <aside className="w-60 bg-blue-institutional text-white flex flex-col">
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-8 h-8" />
            <div>
              <h1 className="font-bold">SVED</h1>
              <p className="text-xs text-blue-light">Panel Electoral</p>
            </div>
          </div>

          {/* PERFIL Y SELECTOR DINÁMICO */}
          <div className="bg-white/10 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-blue-light rounded-full flex items-center justify-center text-blue-medium font-semibold text-sm">
                {adminSeleccionado?.nombre
                  ? adminSeleccionado.nombre.split(" ").map((n) => n[0]).join("").slice(0, 2)
                  : "AD"}
              </div>
              <div className="text-sm min-w-0 flex-1">
                <p className="font-medium truncate">{adminSeleccionado?.nombre || "Cargando..."}</p>
                <p className="text-xs text-blue-light truncate">{adminSeleccionado?.rol || "Rol"}</p>
              </div>
            </div>

            <select
              className="w-full bg-blue-institutional text-white text-xs border border-white/20 rounded p-1 focus:outline-none"
              value={adminSeleccionado?.id || ""}
              onChange={(e) => {
                const selected = administradores.find((a) => a.id === Number(e.target.value));
                if (selected) setAdminSeleccionado(selected);
              }}
            >
              {administradores.map((admin) => (
                <option key={admin.id} value={admin.id} className="text-gray-dark bg-white">
                  {admin.nombre} ({admin.usuario})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* MENU */}
        <nav className="flex-1 p-4">
          {menuItems.map((item) => (
            <button
              key={item.label}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition-colors ${
                item.active ? "bg-blue-medium text-white" : "text-blue-light hover:bg-white/10"
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-sm">{item.label}</span>
            </button>
          ))}
        </nav>

        {/* VERSION */}
        <div className="p-4 border-t border-white/10">
          <p className="text-xs text-blue-light mb-1">Versión 2.1.0</p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-verified rounded-full animate-pulse" />
            <p className="text-xs">
              Red activa · {metrics.peersActivos}/{metrics.totalPeers} peers
            </p>
          </div>
        </div>
      </aside>

      {/* CONTENIDO PRINCIPAL */}
      <main className="flex-1 overflow-auto">
        {/* HEADER */}
        <div className="bg-white border-b border-gray-light px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-gray-dark">Dashboard Electoral</h2>
              <p className="text-sm text-gray-medium">{metrics.eleccionActiva}</p>
            </div>
            <Badge status="active">Elección en curso</Badge>
          </div>
        </div>

        <div className="p-8">
          {/* MÉTRICAS */}
          <div className="grid grid-cols-4 gap-6 mb-8">
            <Card>
              <div className="flex items-start justify-between mb-2">
                <p className="text-sm text-gray-medium">Votos registrados</p>
                <Vote className="w-5 h-5 text-blue-medium" />
              </div>
              <p className="text-3xl font-bold text-gray-dark mb-1">
                {metrics.votosRegistrados.toLocaleString()}
              </p>
              <div className="flex items-center gap-1 text-xs text-green-verified">
                <TrendingUp className="w-3 h-3" />
                <span>En tiempo real</span>
              </div>
            </Card>

            <Card>
              <div className="flex items-start justify-between mb-2">
                <p className="text-sm text-gray-medium">Participación actual</p>
                <Users className="w-5 h-5 text-blue-medium" />
              </div>
              <p className="text-3xl font-bold text-gray-dark mb-1">{metrics.participacion}%</p>
              <p className="text-xs text-gray-medium">
                de {metrics.totalPadron.toLocaleString()} votantes
              </p>
            </Card>

            <Card>
              <div className="flex items-start justify-between mb-2">
                <p className="text-sm text-gray-medium">Peers activos</p>
                <Network className="w-5 h-5 text-green-verified" />
              </div>
              <p className="text-3xl font-bold text-gray-dark mb-1">
                {metrics.peersActivos}/{metrics.totalPeers}
              </p>
              <Badge status="success" className="text-xs">
                {metrics.peersActivos === metrics.totalPeers ? "Todos operativos" : "Degradación parcial"}
              </Badge>
            </Card>

            <Card>
              <div className="flex items-start justify-between mb-2">
                <p className="text-sm text-gray-medium">Latencia promedio</p>
                <Activity className="w-5 h-5 text-blue-medium" />
              </div>
              <p className="text-3xl font-bold text-gray-dark mb-1">
                {metrics.latenciaPromedioMs}ms
              </p>
              <p className="text-xs text-gray-medium">Tiempo de confirmación</p>
            </Card>
          </div>

          {/* GRÁFICAS */}
          <div className="grid grid-cols-2 gap-6 mb-8">
            <Card>
              <h3 className="font-semibold text-gray-dark mb-4">Participación por hora</h3>
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={participationDataMock}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                  <XAxis dataKey="hour" tick={{ fontSize: 12 }} stroke="#718096" />
                  <YAxis tick={{ fontSize: 12 }} stroke="#718096" />
                  <Tooltip />
                  <Area type="monotone" dataKey="votes" stroke="#1A5FA8" fill="#E8F1FA" />
                </AreaChart>
              </ResponsiveContainer>
            </Card>

            {/* PARTICIPACIÓN POR DEPARTAMENTO (DINÁMICO) */}
            <Card>
              <h3 className="font-semibold text-gray-dark mb-4">Participación por departamento</h3>
              <div className="grid grid-cols-2 gap-3">
                {metrics.participacionPorDepartamento.length === 0 ? (
                  <p className="text-xs text-gray-medium col-span-2">No hay votos registrados por departamento aún.</p>
                ) : (
                  metrics.participacionPorDepartamento.map((depto) => {
                    const porcentaje = metrics.votosRegistrados > 0
                      ? Math.round((depto.votos / metrics.votosRegistrados) * 100)
                      : 0;

                    return (
                      <div key={depto.departamento} className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-blue-medium flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-center">
                            <p className="text-xs text-gray-dark truncate">{depto.departamento}</p>
                            <span className="text-[10px] text-gray-medium font-mono">{depto.votos}</span>
                          </div>
                          <div className="w-full bg-gray-light rounded-full h-1.5 mt-1">
                            <div
                              className="bg-blue-medium h-1.5 rounded-full transition-all duration-500"
                              style={{ width: `${Math.max(5, porcentaje)}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </Card>
          </div>

          {/* TRANSACCIONES (DINÁMICO) */}
          <Card className="mb-8">
            <h3 className="font-semibold text-gray-dark mb-4">Últimos eventos blockchain</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-light text-left">
                    <th className="pb-3 text-sm font-medium text-gray-medium">TxID</th>
                    <th className="pb-3 text-sm font-medium text-gray-medium">Timestamp</th>
                    <th className="pb-3 text-sm font-medium text-gray-medium">Centro de Votación</th>
                    <th className="pb-3 text-sm font-medium text-gray-medium">Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {metrics.ultimosEventos.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="py-4 text-center text-sm text-gray-medium">
                        Sin transacciones recientes
                      </td>
                    </tr>
                  ) : (
                    metrics.ultimosEventos.map((tx) => (
                      <tr key={tx.txId} className="border-b border-gray-light last:border-0">
                        <td className="py-3">
                          <code className="text-sm font-mono text-gray-dark">{tx.txId}</code>
                        </td>
                        <td className="py-3 text-sm text-gray-medium">{tx.timestamp}</td>
                        <td className="py-3 text-sm text-gray-dark">{tx.centroVotacion}</td>
                        <td className="py-3">
                          <Badge
                            status={
                              tx.estado === "confirmed"
                                ? "confirmed"
                                : tx.estado === "pending"
                                ? "pending"
                                : "rejected"
                            }
                          >
                            {tx.estado === "confirmed"
                              ? "CONFIRMADO"
                              : tx.estado === "pending"
                              ? "PENDIENTE"
                              : "RECHAZADO"}
                          </Badge>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </Card>

          {/* ALERTAS (DINÁMICO) */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-dark">Alertas de seguridad</h3>
            {metrics.alertasSeguridad.length === 0 ? (
              <p className="text-sm text-gray-medium">No hay alertas de seguridad pendientes.</p>
            ) : (
              metrics.alertasSeguridad.map((alerta) => (
                <Alert key={alerta.id} type={alerta.tipo === "error" ? "error" : "warning"}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium mb-1">{alerta.titulo}</p>
                      <p className="text-xs text-gray-medium">
                        {alerta.detalle} · {alerta.haceTiempo}
                      </p>
                    </div>
                    <Button variant="ghost" className="text-sm py-2 px-4">
                      Revisar
                      <ArrowRight className="w-4 h-4 ml-1 inline" />
                    </Button>
                  </div>
                </Alert>
              ))
            )}
          </div>
        </div>
        <div className="mt-8">
          <AuditLogTable />
        </div>
      </main>
    </div>
  );
}