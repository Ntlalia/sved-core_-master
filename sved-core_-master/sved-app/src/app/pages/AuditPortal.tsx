import { useState } from "react";
import { Card } from "../components/Card";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { Badge } from "../components/Badge";
import { Shield, Check, Copy, Download, Github, FileText, Mail, XCircle } from "lucide-react";
import { api } from "../lib/api";

const mockResults = [
  { id: 1, name: "Mario Ernesto Alfaro", party: "Partido Azul", votes: 98234, percentage: 41.5 },
  { id: 2, name: "Rosa Elena Villalta", party: "Partido Verde", votes: 87456, percentage: 37.0 },
  { id: 3, name: "Carlos Humberto Rivas", party: "Partido Rojo", votes: 50800, percentage: 21.5 }
];

export function AuditPortal() {
  const [txId, setTxId] = useState("");
  const [verifiedData, setVerifiedData] = useState<any>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleVerify = async () => {
    if (txId.length < 10) return;

    setIsLoading(true);
    setError("");
    setVerifiedData(null);

    try {
      // Hacemos la consulta al nuevo endpoint de verificación en Spring Boot
      const response = await api.get(`/votos/verificar/${txId}`);

      // Formatear la fecha para que se vea legible
      const date = new Date(response.data.timestamp);
      const formattedDate = date.toLocaleString("es-SV", {
        day: 'numeric', month: 'long', year: 'numeric',
        hour: '2-digit', minute: '2-digit', second: '2-digit'
      }) + ' CST';

      setVerifiedData({
        ...response.data,
        timestampStr: formattedDate
      });
    } catch (err: any) {
      if (err.response?.status === 404) {
        setError("No se encontró ningún voto con ese código.");
      } else {
        setError("Error de conexión al consultar la red. Intente más tarde.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const totalVotes = mockResults.reduce((sum, r) => sum + r.votes, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-light px-8 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Shield className="w-10 h-10 text-blue-institutional" />
            <div>
              <h1 className="text-xl font-bold text-blue-institutional">Portal de Auditoría Pública</h1>
              <p className="text-xs text-gray-medium">auditoria.sved.gob.sv</p>
            </div>
          </div>
          <Badge status="success">Acceso libre</Badge>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-dark mb-4">Verifica que tu voto fue contado</h2>
          <p className="text-lg text-gray-medium mb-8">
            Ingresa el ID de transacción de tu recibo de votación
          </p>

          <Card className="max-w-2xl mx-auto">
            <div className="space-y-4">
              <Input
                placeholder="Ej: 0x4f8a2c1d9e7b3f5a8c2e9d1f6b4a7c3e2"
                value={txId}
                onChange={(e) => setTxId(e.target.value.trim())}
                helperText="Esta consulta no revela tu identidad ni el contenido de tu voto"
                className="font-mono"
              />

              {error && (
                <div className="flex items-center gap-2 text-red-alert bg-red-alert/10 p-3 rounded-lg text-sm text-left">
                  <XCircle className="w-5 h-5 flex-shrink-0" />
                  <p>{error}</p>
                </div>
              )}

              <Button
                variant="primary"
                onClick={handleVerify}
                className="w-full"
                disabled={txId.length < 10 || isLoading}
                isLoading={isLoading}
              >
                Verificar en blockchain →
              </Button>
            </div>
          </Card>
        </div>

        {verifiedData && (
          <Card variant="primary" className="mb-12 border-2 border-green-verified animate-in fade-in zoom-in duration-300">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-green-verified rounded-full flex items-center justify-center flex-shrink-0">
                <Check className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-green-verified mb-2">Voto verificado correctamente</h3>
                <p className="text-sm text-gray-medium">
                  Tu voto ha sido confirmado y registrado de forma permanente en la blockchain
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-xs text-gray-medium mb-1">TxID completo</p>
                  <code className="text-sm font-mono text-gray-dark break-all">
                    {verifiedData.txId}
                  </code>
                </div>
                <button
                  onClick={() => handleCopy(verifiedData.txId)}
                  className="ml-4 p-2 hover:bg-gray-light rounded transition-colors"
                >
                  {copied ? <Check className="w-4 h-4 text-green-verified" /> : <Copy className="w-4 h-4 text-gray-medium" />}
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-light">
                <div>
                  <p className="text-xs text-gray-medium mb-1">Fecha y hora de registro</p>
                  <p className="text-sm font-medium text-gray-dark">{verifiedData.timestampStr}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-medium mb-1">Bloque</p>
                  <p className="text-sm font-medium text-gray-dark">#{verifiedData.bloque.toLocaleString()}</p>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-light">
                <Badge status="success" className="mb-3">Verificado por 3/3 peers de la red</Badge>
                <div className="bg-blue-light rounded-lg p-4">
                  <p className="text-sm font-semibold text-gray-dark mb-3">Pruebas Criptográficas Generadas</p>
                  <div className="space-y-2 text-xs">
                    <div>
                      <p className="text-gray-medium mb-1">Zero-Knowledge Proof (ZKP) Hash:</p>
                      <code className="text-gray-dark font-mono break-all">{verifiedData.zkpHash}</code>
                    </div>
                    <div>
                      <p className="text-gray-medium mb-1">Firma de nodo auditor:</p>
                      <code className="text-gray-dark font-mono break-all">{verifiedData.signature}</code>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Sección de Resultados Parciales (Se mantiene igual visualmente) */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-semibold text-gray-dark">Resultados parciales</h3>
            <div className="text-sm text-gray-medium">Simulación 2026</div>
          </div>
          <Card>
            <div className="space-y-4 mb-6">
              {mockResults.map((result) => (
                <div key={result.id}>
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="font-semibold text-gray-dark">{result.name}</p>
                      <p className="text-sm text-gray-medium">{result.party}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-blue-medium">{result.percentage}%</p>
                      <p className="text-xs text-gray-medium">{result.votes.toLocaleString()} votos</p>
                    </div>
                  </div>
                  <div className="w-full bg-gray-light rounded-full h-3">
                    <div
                      className="bg-blue-medium h-3 rounded-full transition-all duration-500"
                      style={{ width: `${result.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}