import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Header } from "../components/Header";
import { ProgressStepper } from "../components/ProgressStepper";
import { Card } from "../components/Card";
import { Button } from "../components/Button";
import { Check, Copy, ExternalLink, Award, AlertTriangle } from "lucide-react";
import { api } from "../lib/api";

const steps = [
  { number: 1, label: "Identidad" },
  { number: 2, label: "Biometría" },
  { number: 3, label: "Tu voto" },
  { number: 4, label: "Confirmación" }
];

export function ConfirmationScreen() {
  const navigate = useNavigate();
  // Estado para controlar si estamos preguntando o si ya mostramos el recibo
  const [isConfirming, setIsConfirming] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [txData, setTxData] = useState<{ id: string; timestamp: string; bloque: number } | null>(null);
  const [votanteName, setVotanteName] = useState("");

  useEffect(() => {
    const token = sessionStorage.getItem("voteToken");
    const candidato = sessionStorage.getItem("candidatoSeleccionado");
    const storedVotante = sessionStorage.getItem("votanteActivo");

    // Si alguien intenta entrar a esta URL sin haber pasado por el flujo, lo expulsamos
    if (!token || !candidato || !storedVotante) {
      navigate("/vote-flow");
      return;
    }

    setVotanteName(JSON.parse(storedVotante).nombre);
  }, [navigate]);

  const handleConfirmVote = async () => {
      setIsLoading(true);
      try {
        const token = sessionStorage.getItem("voteToken");
        const candidatoId = Number(sessionStorage.getItem("candidatoSeleccionado"));

        // Recuperamos el ID del votante desde la sesión
        const storedVotante = sessionStorage.getItem("votanteActivo");
        const votanteId = storedVotante ? JSON.parse(storedVotante).id : null;

        // Enviamos el voto y el ID al backend
        const response = await api.post('/votos/emitir', {
          voteToken: token,
          candidatoId: candidatoId,
          votanteId: votanteId // Nuevo campo
        });



      // Guardamos la respuesta (Transaction ID y Bloque)
      setTxData({
        id: response.data.transactionId,
        bloque: response.data.bloque,
        timestamp: new Date().toLocaleString("es-SV") // Fecha local
      });

      // Seguridad: Destruimos el token para que no pueda volver a votar retrocediendo la página
      sessionStorage.removeItem("voteToken");
      sessionStorage.removeItem("candidatoSeleccionado");

      // Cambiamos a la vista del recibo
      setIsConfirming(false);
    } catch (error) {
      console.error("Error al emitir el voto:", error);
      alert("Hubo un error al registrar su voto. Por favor, solicite asistencia.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    sessionStorage.removeItem("candidatoSeleccionado");
    navigate("/vote");
  };

  const handleCopy = () => {
    if (txData?.id) {
      navigator.clipboard.writeText(txData.id);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header userName={votanteName} showUserInfo={true} />

      <div className="max-w-4xl mx-auto px-8 py-12">
        <ProgressStepper steps={steps} currentStep={4} className="mb-12" />

        {isConfirming ? (
          /* FASE 1: PREGUNTA DE CONFIRMACIÓN */
          <Card className="max-w-xl mx-auto text-center border-blue-medium">
            <div className="w-20 h-20 bg-gold-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertTriangle className="w-10 h-10 text-gold-accent" />
            </div>

            <h2 className="text-3xl font-semibold text-gray-dark mb-4">¿Confirma su selección?</h2>
            <p className="text-gray-medium mb-8">
              Una vez confirmado, su voto será cifrado y registrado de manera inmutable en la blockchain. Esta acción no se puede deshacer.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                  onClick={handleCancel}
                  disabled={isLoading}
                  className="px-6 py-3 rounded-lg font-semibold border-2 border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                Volver a la papeleta
              </button>
              <button
                  onClick={handleConfirmVote}
                  disabled={isLoading}
                  className="px-6 py-3 rounded-lg font-semibold text-white transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
                  style={{ backgroundColor: "#1d2845" }}
              >
                {isLoading ? "Confirmando..." : "Sí, confirmar mi voto"}
              </button>
            </div>
          </Card>

        ) : (
          /* FASE 2: RECIBO DE ÉXITO (Tu diseño original) */
          <Card className="max-w-2xl mx-auto text-center">
            <div className="w-20 h-20 bg-green-verified/10 rounded-full flex items-center justify-center mx-auto mb-6 animate-scale-in">
              <Check className="w-12 h-12 text-green-verified" />
            </div>

            <h2 className="text-3xl font-semibold text-gray-dark mb-2">¡Tu voto fue registrado!</h2>
            <p className="text-gray-medium mb-8">Tu voto ha sido contabilizado de forma segura en la blockchain</p>

            <div className="bg-blue-institutional rounded-xl p-6 text-white relative overflow-hidden mb-6">
              <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
                <Award className="w-full h-full text-gold-accent" />
              </div>

              <div className="relative">
                <p className="text-sm text-blue-light mb-2">ID de Transacción Blockchain</p>

                <div className="bg-white/10 rounded-lg p-4 mb-4">
                  <div className="flex items-center justify-between gap-3">
                    <code className="font-mono text-sm flex-1 truncate">{txData?.id}</code>
                    <button
                      onClick={handleCopy}
                      className="flex-shrink-0 p-2 hover:bg-white/10 rounded transition-colors"
                    >
                      {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex justify-between items-center text-sm text-blue-light mb-4">
                  <p>{txData?.timestamp}</p>
                  <p>Bloque: #{txData?.bloque}</p>
                </div>

                <div className="inline-flex items-center gap-2 bg-gold-accent/20 border border-gold-accent px-3 py-1 rounded-full">
                  <Award className="w-4 h-4 text-gold-accent" />
                  <span className="text-xs font-medium text-gold-accent">Registrado en Blockchain</span>
                </div>
              </div>
            </div>

            <p className="text-sm text-gray-medium mb-6">
              Guarda este código para verificar tu voto en el portal de auditoría pública
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button variant="secondary" onClick={() => navigate("/audit")} className="flex items-center justify-center gap-2">
                Verificar en portal público
                <ExternalLink className="w-4 h-4" />
              </Button>

              <Button variant="ghost" onClick={handleLogout}>
                Finalizar y cerrar sesión
              </Button>
            </div>
          </Card>
        )}

        <footer className="mt-12 text-center text-sm text-gray-medium">
          <p>Tribunal Supremo Electoral · Portal Oficial · Línea de soporte: 2525-2525</p>
        </footer>
      </div>

      <style>{`
        @keyframes scale-in {
          from { transform: scale(0); }
          to { transform: scale(1); }
        }
        .animate-scale-in {
          animation: scale-in 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}