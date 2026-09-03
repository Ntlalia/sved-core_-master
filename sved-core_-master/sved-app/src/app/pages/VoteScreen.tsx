import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Header } from "../components/Header";
import { ProgressStepper } from "../components/ProgressStepper";
import { Shield, Check, User } from "lucide-react";
import { api } from "../lib/api";

import logoArena from "../../assets/imagenes/partidos/arena.png";
import logoNuevasIdeas from "../../assets/imagenes/partidos/nuevas-ideas.png";
import logoFmln from "../../assets/imagenes/partidos/fmln.png";

import fotoNayib from "../../assets/imagenes/candidatos/nayib-bukele.jpg";
import fotoAnaCristina from "../../assets/imagenes/candidatos/ana-cristina.jpg";
import fotoMiguelAngel from "../../assets/imagenes/candidatos/miguel-angel.jpg";

const steps = [
  { number: 1, label: "Identidad" },
  { number: 2, label: "Biometría" },
  { number: 3, label: "Tu voto" },
  { number: 4, label: "Confirmación" }
];

const logosPartidos: Record<string, string> = {
  "ARENA": logoArena,
  "Alianza Republicana Nacionalista": logoArena,
  "Nuevas Ideas": logoNuevasIdeas,
  "FMLN": logoFmln,
  "Frente Farabundo Martí para la Liberación Nacional": logoFmln,
};

const coloresPartidos: Record<string, { border: string; ring: string }> = {
  "ARENA": { border: "#1d4ed8", ring: "rgba(29, 78, 216, 0.15)" },
  "Alianza Republicana Nacionalista": { border: "#1d4ed8", ring: "rgba(29, 78, 216, 0.15)" },
  "Nuevas Ideas": { border: "#06b6d4", ring: "rgba(6, 182, 212, 0.15)" },
  "FMLN": { border: "#dc2626", ring: "rgba(220, 38, 38, 0.15)" },
  "Frente Farabundo Martí para la Liberación Nacional": { border: "#dc2626", ring: "rgba(220, 38, 38, 0.15)" },
};

const fotosCandidatos: Record<string, string> = {
  "Nayib Bukele": fotoNayib,
  "Ana Cristina Solano": fotoAnaCristina,
  "Miguel Ángel Reyes": fotoMiguelAngel,
};

function obtenerLogoPartido(partido: string): string | null {
  return logosPartidos[partido] || null;
}

function obtenerColorPartido(partido: string) {
  return coloresPartidos[partido] || { border: "#1d2845", ring: "rgba(29, 40, 69, 0.15)" };
}

function obtenerFotoCandidato(nombre: string): string | null {
  return fotosCandidatos[nombre] || null;
}

export function VoteScreen() {
  const navigate = useNavigate();
  const [selectedCandidate, setSelectedCandidate] = useState<number | null>(null);
  const [candidates, setCandidates] = useState<any[]>([]);
  const [eleccionNombre, setEleccionNombre] = useState("Cargando elección...");
  const [votanteName, setVotanteName] = useState("");

  useEffect(() => {
    const token = sessionStorage.getItem("voteToken");
    const storedVotante = sessionStorage.getItem("votanteActivo");

    if (!token || !storedVotante) {
      navigate("/vote-flow");
      return;
    }

    setVotanteName(JSON.parse(storedVotante).nombre);

    const fetchEleccion = async () => {
      try {
        const response = await api.get('/elecciones/activa');
        setEleccionNombre(response.data.nombre);

        let candidatosArray = response.data.candidatos;
        if (typeof candidatosArray === 'string') {
          candidatosArray = JSON.parse(candidatosArray);
        }

        setCandidates(candidatosArray || []);
      } catch (error) {
        console.error("Error al cargar la papeleta:", error);
      }
    };

    fetchEleccion();
  }, [navigate]);

  const handleConfirm = () => {
    if (selectedCandidate !== null) {
      sessionStorage.setItem("candidatoSeleccionado", selectedCandidate.toString());
      navigate("/confirmation");
    }
  };

  return (
      <div className="min-h-screen bg-gray-50">
        <Header userName={votanteName} showUserInfo={true} />

        <div className="max-w-6xl mx-auto px-8 py-12">
          <ProgressStepper steps={steps} currentStep={3} className="mb-12" />

          <div className="mb-8 text-center">
            <p className="text-blue-600 font-semibold text-sm tracking-wide uppercase mb-1">
              {eleccionNombre}
            </p>
            <h2 className="text-3xl font-bold text-gray-dark mb-2">Selecciona tu opción</h2>
            <div className="flex items-center justify-center gap-2 text-sm text-gray-medium">
              <Shield className="w-4 h-4" />
              <span>Tu voto es secreto y no puede ser rastreado</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6 mb-8">
            {candidates.map((candidate: any) => {
              const logo = obtenerLogoPartido(candidate.partido);
              const foto = obtenerFotoCandidato(candidate.nombre);
              const color = obtenerColorPartido(candidate.partido);
              const isSelected = selectedCandidate === candidate.id;

              return (
                  <div
                      key={candidate.id}
                      onClick={() => setSelectedCandidate(candidate.id)}
                      className="relative bg-white rounded-xl overflow-hidden cursor-pointer transition-all"
                      style={{
                        border: isSelected ? `2px solid ${color.border}` : "2px solid #e5e7eb",
                        boxShadow: isSelected ? `0 0 0 4px ${color.ring}` : "none",
                      }}
                  >
                    <div className="h-24 w-full flex items-center justify-center bg-gray-100 p-2">
                      {logo ? (
                          <img src={logo} alt={candidate.partido} className="max-h-full max-w-full object-contain" />
                      ) : (
                          <span className="text-gray-400 text-sm">Sin logo</span>
                      )}
                    </div>

                    {/* Foto grande y rectangular del candidato */}
                    <div className="relative w-full h-56 bg-gray-200">
                      {foto ? (
                          <img src={foto} alt={candidate.nombre} className="w-full h-full object-cover" />
                      ) : (
                          <div className="w-full h-full flex flex-col items-center justify-center gap-2">
                            <User className="w-16 h-16 text-gray-400" />
                            <span className="text-xs text-gray-400">Foto del candidato</span>
                          </div>
                      )}

                      <div
                          className="absolute top-3 left-3 w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm shadow"
                          style={{ backgroundColor: "#1d2845" }}
                      >
                        {candidate.id < 10 ? `0${candidate.id}` : candidate.id}
                      </div>

                      {isSelected && (
                          <div
                              className="absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center shadow"
                              style={{ backgroundColor: color.border }}
                          >
                            <Check className="w-5 h-5 text-white" />
                          </div>
                      )}
                    </div>

                    <div className="px-6 py-4 border-t border-gray-100">
                      <h3 className="font-bold text-gray-dark">{candidate.nombre}</h3>
                      <p className="text-sm text-gray-medium">{candidate.partido}</p>
                    </div>
                  </div>
              );
            })}
          </div>

          <div
              onClick={() => setSelectedCandidate(0)}
              className={`bg-white rounded-xl border-2 p-6 flex items-center gap-4 cursor-pointer transition-all mb-8 ${
                  selectedCandidate === 0 ? "border-blue-500" : "border-gray-200 hover:border-gray-300"
              }`}
          >
            <div className={`w-6 h-6 rounded flex items-center justify-center border-2 ${
                selectedCandidate === 0 ? "bg-blue-500 border-blue-500" : "border-gray-300"
            }`}>
              {selectedCandidate === 0 && <Check className="w-4 h-4 text-white" />}
            </div>
            <div>
              <h3 className="font-semibold text-gray-dark">Voto en Blanco</h3>
              <p className="text-sm text-gray-medium">No seleccionar candidato</p>
            </div>
          </div>

          <div className="flex justify-center">
            <button
                onClick={handleConfirm}
                disabled={selectedCandidate === null}
                className="px-12 py-3 rounded-lg text-white font-semibold transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2"
                style={{ backgroundColor: "#1d2845" }}
            >
              Confirmar selección →
            </button>
          </div>
        </div>
      </div>
  );
}