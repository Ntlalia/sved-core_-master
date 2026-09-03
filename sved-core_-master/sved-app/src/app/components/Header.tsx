import { Shield, User } from "lucide-react";

interface HeaderProps {
  userName?: string;
  showUserInfo?: boolean;
}

export function Header({ userName, showUserInfo = false }: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-light px-8 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Shield className="w-10 h-10 text-blue-institutional" />
          <div>
            <h1 className="text-xl font-bold text-blue-institutional">SVED</h1>
            <p className="text-xs text-gray-medium">Sistema de Votación Electrónica Descentralizado</p>
          </div>
        </div>

        {showUserInfo && userName && (
          <div className="flex items-center gap-3 bg-blue-light px-4 py-2 rounded-lg">
            <User className="w-5 h-5 text-blue-medium" />
            <span className="text-sm font-medium text-gray-dark">{userName}</span>
          </div>
        )}

        <div className="flex items-center gap-2">
          <img
            src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 60 60'%3E%3Crect fill='%230A2F5A' width='60' height='60'/%3E%3Cpath fill='%23FFFFFF' d='M30 15l-5 10h10l-5 10 8-12h-6l3-8z'/%3E%3C/svg%3E"
            alt="Escudo El Salvador"
            className="w-10 h-10"
          />
        </div>
      </div>
    </header>
  );
}
