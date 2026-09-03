import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import { HomeScreen } from "./pages/HomeScreen";
import { IdentificationScreen } from "./pages/IdentificationScreen";
import { BiometricScreen } from "./pages/BiometricScreen";
import { VoteScreen } from "./pages/VoteScreen";
import { ConfirmationScreen } from "./pages/ConfirmationScreen";
import { AdminDashboard } from "./pages/AdminDashboard";
import { AuditPortal } from "./pages/AuditPortal";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/vote-flow" element={<IdentificationScreen />} />
        <Route path="/biometric" element={<BiometricScreen />} />
        <Route path="/vote" element={<VoteScreen />} />
        <Route path="/confirmation" element={<ConfirmationScreen />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/audit" element={<AuditPortal />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
