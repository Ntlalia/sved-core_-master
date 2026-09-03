import { useNavigate } from "react-router";
import { CheckCircle } from "lucide-react";
import logoElSalvador from "../../assets/imagenes/logo-el-salvador.png";
import fondoSanSalvador from "../../assets/imagenes/fondo-san-salvador.png";

export function HomeScreen() {
  const navigate = useNavigate();

  return (
      <div
          className="min-h-screen bg-cover bg-center relative"
          style={{ backgroundImage: `url(${fondoSanSalvador})` }}
      >
        {/* Overlay oscuro para legibilidad sobre la foto */}
        <div className="absolute inset-0" style={{ backgroundColor: "#1d2845", opacity: 0.4 }} />

        {/* Header */}
        <header className="relative z-10" style={{ backgroundColor: "rgba(29, 40, 69, 0.95)" }}>
          <div className="max-w-6xl mx-auto px-8 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img src={logoElSalvador} alt="Escudo de El Salvador" className="w-20 h-20 opacity-90" />
              <div>
                <p className="text-white font-semibold leading-tight">
                  Sistema de votación electrónico
                </p>
                <p className="text-blue-light text-sm leading-tight">Descentralizado</p>
              </div>
            </div>

            <nav className="flex items-center gap-8">
              <button
                  onClick={() => navigate("/audit")}
                  className="text-white font-medium hover:text-blue-light transition-colors"
              >
                Verificación de Voto
              </button>
              <button
                  onClick={() => navigate("/admin")}
                  className="text-white font-medium hover:text-blue-light transition-colors"
              >
                Panel Electoral
              </button>
            </nav>
          </div>
        </header>

        {/* Contenido central */}
        <main className="relative z-10 max-w-6xl mx-auto px-8 pt-16 pb-24 text-center">
          <h1 className="text-5xl font-bold text-white mb-8">República de El Salvador</h1>

          <img src={logoElSalvador} alt="Escudo de El Salvador" className="w-44 h-44 mx-auto mb-12 opacity-90" />

          {/* Card de acceso principal */}
          <div className="max-w-2xl mx-auto bg-white rounded-2xl border-4 border-green-500 shadow-xl p-8">
            <div className="flex flex-row items-center justify-between gap-6">
              <div className="text-left flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle className="w-6 h-6 text-green-500" />
                  <span className="text-green-600 font-bold tracking-wide">ACCESO PRINCIPAL</span>
                </div>
                <p className="text-gray-700">
                  Ejerza su derecho al voto de forma segura y verificable.
                </p>
                <p className="text-gray-500 text-sm mt-2">
                  Con tecnología de autenticación biométrica.
                </p>
              </div>

              <button
                  onClick={() => navigate("/vote-flow")}
                  className="whitespace-nowrap px-6 py-3 rounded-lg text-white font-semibold transition-colors flex-shrink-0"
                  style={{ backgroundColor: "#1d2845" }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#2a3a5c")}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#1d2845")}
              >
                Iniciar votación
              </button>
            </div>
          </div>
        </main>
      </div>
  );
}