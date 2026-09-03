import { useState } from "react";
import { useNavigate } from "react-router";
import { Header } from "../components/Header";
import { ProgressStepper } from "../components/ProgressStepper";
import { Card } from "../components/Card";
import { Input } from "../components/Input";

import { Lock, Shield } from "lucide-react";
import { api } from "../lib/api"; // <-- Importamos nuestro cliente Axios

const steps = [
  { number: 1, label: "Identidad" },
  { number: 2, label: "Biometría" },
  { number: 3, label: "Tu voto" },
  { number: 4, label: "Confirmación" }
];

export function IdentificationScreen() {
  const navigate = useNavigate();
  const [dui, setDui] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleVerify = async () => {
    if (!dui || dui.length < 10) {
      setError("Por favor ingresa un DUI válido");
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      // Hacemos la consulta real a la base de datos PostgreSQL a través de Spring Boot
      const response = await api.get(`/padron/${dui}`);
      const data = response.data;

      // Evaluamos la lógica de negocio según la respuesta del backend
      if (!data.habilitado) {
        setError("Atención: Este ciudadano se encuentra bloqueado en el padrón electoral.");
        return;
      }

      if (data.estadoVoto === "YA_VOTADO") {
        setError("Registro denegado: Este ciudadano ya emitió su voto previamente.");
        return;
      }

      // Si pasa las validaciones (NO_VOTADO), guardamos sus datos en sesión y avanzamos
      sessionStorage.setItem("votanteActivo", JSON.stringify(data));
      navigate("/biometric");

    } catch (err: any) {
      // Manejamos el error 404 si el DUI no existe en la base de datos
      if (err.response?.status === 404) {
        setError("DUI no encontrado. Verifique el número e intente nuevamente.");
      } else {
        setError("Error de conexión con el servidor. Intente más tarde.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const formatDUI = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    if (numbers.length <= 8) {
      return numbers;
    }
    return `${numbers.slice(0, 8)}-${numbers.slice(8, 9)}`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-4xl mx-auto px-8 py-12">
        <ProgressStepper steps={steps} currentStep={1} className="mb-12" />

        <Card className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-light rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-blue-medium" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-dark mb-2">Identifícate con tu DUI</h2>
            <p className="text-sm text-gray-medium">Ingresa tu número de Documento Único de Identidad</p>
          </div>

          <div className="space-y-6">
            <Input
              label="Número de DUI"
              placeholder="00000000-0"
              value={dui}
              onChange={(e) => setDui(formatDUI(e.target.value))}
              error={error}
              helperText="Tu información está protegida con cifrado AES-256"
              maxLength={10}
            />

            <button
                onClick={handleVerify}
                disabled={isLoading}
                className="w-full py-3 rounded-lg text-white font-semibold transition-colors disabled:opacity-60"
                style={{ backgroundColor: "#1d2845" }}
                onMouseEnter={(e) => !isLoading && (e.currentTarget.style.backgroundColor = "#2a3a5c")}
                onMouseLeave={(e) => !isLoading && (e.currentTarget.style.backgroundColor = "#1d2845")}
            >
              {isLoading ? "Verificando..." : "Verificar identidad"}
            </button>

            <div className="flex items-center justify-center gap-2 text-xs text-gray-medium">
              <Lock className="w-4 h-4" />
              <span>Conexión segura TLS 1.3</span>
            </div>
          </div>
        </Card>

        <footer className="mt-12 text-center text-sm text-gray-medium">
          <p>Tribunal Supremo Electoral · Portal Oficial · Línea de soporte: 2525-2525</p>
        </footer>
      </div>
    </div>
  );
}