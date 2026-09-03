import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Header } from "../components/Header";
import { ProgressStepper } from "../components/ProgressStepper";
import { Card } from "../components/Card";
import { Badge } from "../components/Badge";
import { Fingerprint, Check } from "lucide-react";
import { api } from "../lib/api"; // <-- Importamos nuestro cliente Axios

const steps = [
  { number: 1, label: "Identidad" },
  { number: 2, label: "Biometría" },
  { number: 3, label: "Tu voto" },
  { number: 4, label: "Confirmación" }
];

export function BiometricScreen() {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [attempt] = useState(1);
  const [status, setStatus] = useState<"reading" | "verified">("reading");
  const [votante, setVotante] = useState<any>(null);

  // 1. Cargar el votante desde sessionStorage al montar el componente
  useEffect(() => {
    const storedVotante = sessionStorage.getItem("votanteActivo");
    if (storedVotante) {
      setVotante(JSON.parse(storedVotante));
    } else {
      // Si entra aquí sin haberse identificado, lo regresamos al inicio
      navigate("/vote-flow");
    }
  }, [navigate]);

  // 2. Ejecutar la autenticación contra el backend
  useEffect(() => {
    if (!votante) return;

    let isMounted = true;

    // Animación visual de progreso (sube hasta 90% esperando a la API)
    const interval = setInterval(() => {
      setProgress(prev => (prev >= 90 ? 90 : prev + 5));
    }, 100);

    const authenticate = async () => {
      try {
        // Paso A: Iniciar verificación (mock biométrico)
        const resIniciar = await api.get('/auth/iniciar', {
          params: { dui: votante.dui }
        });
        const sessionToken = resIniciar.data;

        // Paso B: Solicitar la emisión del JWT de Voto al backend
        const eleccionIdActiva = "080e816e-a4f3-493f-b896-17953a0adb8d"; // ID desde sved_db.sql

        const resVerificar = await api.post('/auth/verificar', null, {
          params: {
            token: sessionToken,
            muestra: "mock-huella-base64",
            eleccionId: eleccionIdActiva
          }
        });

        if (isMounted) {
          // Guardamos el JWT real en la sesión del navegador
          sessionStorage.setItem("voteToken", resVerificar.data);

          setProgress(100); // Llenamos la barra
          setStatus("verified");
          clearInterval(interval);

          // Navegamos a la papeleta electoral después de 2 segundos
          setTimeout(() => navigate("/vote"), 2000);
        }
      } catch (error) {
        console.error("Error en autenticación biométrica:", error);
        clearInterval(interval);
        // Aquí podrías agregar un estado para mostrar "Intento fallido"
      }
    };

    authenticate();

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [votante, navigate]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header userName={votante?.nombre} showUserInfo={!!votante} />

      <div className="max-w-4xl mx-auto px-8 py-12">
        <ProgressStepper steps={steps} currentStep={2} className="mb-12" />

        <Card className="max-w-md mx-auto">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-dark mb-8">
              {status === "reading" ? "Coloca tu dedo en el lector" : "Identidad verificada"}
            </h2>

            <div className="relative mb-8">
              <div className={`w-32 h-32 mx-auto rounded-full flex items-center justify-center transition-all duration-500
                ${status === "reading" ? "bg-blue-light" : "bg-green-verified/10"}
              `}>
                {status === "reading" ? (
                  <Fingerprint className="w-16 h-16 text-blue-medium" />
                ) : (
                  <Check className="w-16 h-16 text-green-verified" />
                )}
              </div>

              {status === "reading" && (
                <>
                  <div className="absolute inset-0 w-32 h-32 mx-auto rounded-full border-4 border-blue-medium/30 animate-ping" />
                  <div className="absolute inset-0 w-32 h-32 mx-auto rounded-full border-4 border-blue-medium/50" />
                </>
              )}
            </div>

            {status === "reading" ? (
              <>
                <div className="space-y-4 mb-8">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-medium">Intento {attempt} de 3</span>
                    <Badge status="active">Liveness Detection activo</Badge>
                  </div>

                  <div className="w-full bg-gray-light rounded-full h-2">
                    <div
                      className="bg-blue-medium h-2 rounded-full transition-all duration-200"
                      style={{ width: `${progress}%` }}
                    />
                  </div>

                  <p className="text-sm text-gray-medium flex items-center justify-center gap-2">
                    <span className="w-2 h-2 bg-blue-medium rounded-full animate-pulse" />
                    Obteniendo Token de Autorización Segura...
                  </p>
                </div>
              </>
            ) : (
              <div className="space-y-4 animate-in fade-in zoom-in duration-500">
                <div className="bg-green-verified/10 border border-green-verified rounded-lg p-4">
                  <p className="font-semibold text-green-verified mb-1">{votante?.nombre}</p>
                  <p className="text-sm text-gray-medium">DUI: {votante?.dui}</p>
                </div>
                <p className="text-sm text-gray-medium">Redirigiendo a la papeleta cifrada...</p>
              </div>
            )}
          </div>
        </Card>

        <footer className="mt-12 text-center text-sm text-gray-medium">
          <p>Tribunal Supremo Electoral · Portal Oficial · Línea de soporte: 2525-2525</p>
        </footer>
      </div>
    </div>
  );
}