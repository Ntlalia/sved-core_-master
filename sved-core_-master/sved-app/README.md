# SVED - Sistema de Votación Electrónica Descentralizado

Sistema institucional de votación electrónica para la República de El Salvador, construido con tecnología blockchain para garantizar transparencia, seguridad y privacidad en los procesos electorales.

## Características Principales

### 🔒 Seguridad
- **Blockchain**: Registro inmutable de votos en Hyperledger Fabric
- **Biometría**: Verificación de identidad con lector de huellas dactilares
- **Cifrado**: AES-256 para datos sensibles, TLS 1.3 para conexiones
- **Zero-Knowledge Proofs**: Protección del secreto del voto

### 🗳️ Proceso de Votación
1. **Identificación**: Verificación de DUI del ciudadano
2. **Biometría**: Captura y validación de huella dactilar con Liveness Detection
3. **Selección**: Interfaz intuitiva para elegir candidato o voto en blanco
4. **Confirmación**: Recibo con TxID blockchain para auditoría posterior

### 📊 Transparencia
- **Portal Público**: Verificación de voto individual sin revelar contenido
- **Resultados en Tiempo Real**: Actualización continua de conteo
- **Auditoría Blockchain**: Cada voto verificable por cualquier ciudadano
- **Dashboard Administrativo**: Monitoreo en tiempo real para el TSE

## Arquitectura del Sistema

### Frontend
- **Framework**: React 18.3 con TypeScript
- **Routing**: React Router v7
- **Styling**: Tailwind CSS v4
- **UI Components**: Sistema de diseño institucional custom
- **Charts**: Recharts para visualizaciones
- **Icons**: Lucide React

### Backend (Conceptual)
- **Blockchain**: Hyperledger Fabric
- **Smart Contracts**: Chaincode para registro de votos
- **Consensus**: PBFT (Practical Byzantine Fault Tolerance)
- **Peers**: 3 nodos distribuidos geográficamente

## Paleta de Colores

```css
/* Azules Institucionales */
--blue-institutional: #0A2F5A;  /* Primario */
--blue-medium: #1A5FA8;          /* Interactivos */
--blue-light: #E8F1FA;           /* Fondos */

/* Estados */
--green-verified: #1A7A4A;       /* Éxito */
--red-alert: #C53030;            /* Error */
--gold-accent: #B7860C;          /* Confianza */

/* Grises */
--gray-dark: #2D3748;            /* Texto primario */
--gray-medium: #718096;          /* Texto secundario */
--gray-light: #E2E8F0;           /* Bordes */
```

## Tipografía

- **Display/Headings**: DM Sans (600, 700)
- **Body**: Inter (400, 500, 600)
- **Monospace**: JetBrains Mono (hashes blockchain)

## Componentes del Design System

### Componentes Base
- **Button**: 4 variantes (primary, secondary, destructive, ghost)
- **Badge**: Indicadores de estado con colores semánticos
- **Card**: Contenedores con 3 variantes
- **Input**: Campos con validación y estados
- **Alert**: Notificaciones (success, error, warning, info)

### Componentes Especializados
- **ProgressStepper**: Indicador de progreso de 4 pasos
- **Header**: Encabezado institucional con logo SVED
- **AdminSidebar**: Navegación del panel administrativo

## Pantallas del Sistema

### Flujo Ciudadano
1. **Home**: Portal de acceso principal
2. **Identificación**: Input de DUI con validación
3. **Biométrica**: Captura de huella con progreso visual
4. **Votación**: Selección de candidato con privacidad garantizada
5. **Confirmación**: Recibo con TxID y timestamp

### Panel Administrativo
- Métricas en tiempo real (votos, participación, peers, latencia)
- Gráfico de participación por hora
- Mapa de calor departamental
- Tabla de transacciones blockchain
- Alertas de seguridad

### Portal Público
- Verificación de voto individual por TxID
- Resultados electorales en tiempo real
- Descarga de reportes en JSON
- Footer institucional con contacto

## Estructura del Proyecto

```
/src
  /app
    /components        # Componentes del design system
      Button.tsx
      Badge.tsx
      Card.tsx
      Input.tsx
      Alert.tsx
      ProgressStepper.tsx
      Header.tsx
    /pages            # Pantallas principales
      HomeScreen.tsx
      IdentificationScreen.tsx
      BiometricScreen.tsx
      VoteScreen.tsx
      ConfirmationScreen.tsx
      AdminDashboard.tsx
      AuditPortal.tsx
    App.tsx           # Router principal
  /styles
    fonts.css         # Importación de Google Fonts
    theme.css         # Variables CSS y tokens de diseño
/guidelines
  Guidelines.md       # Documentación del design system
```

## Instalación y Desarrollo

```bash
# Instalar dependencias
pnpm install

# El servidor de desarrollo ya está corriendo
# La aplicación está disponible en el preview de Make
```

## Rutas de Navegación

- `/` - Pantalla de inicio
- `/vote-flow` - Inicio del proceso de votación
- `/biometric` - Verificación biométrica
- `/vote` - Selección de voto
- `/confirmation` - Confirmación y recibo
- `/admin` - Dashboard administrativo
- `/audit` - Portal de auditoría pública

## Características de Seguridad

### Protección de Datos
- Cifrado end-to-end de datos sensibles
- Tokens de sesión con expiración
- Rate limiting en endpoints críticos
- Logs de auditoría inmutables

### Privacidad del Voto
- ZKP para verificación sin revelación
- Separación de identidad y voto en blockchain
- No se almacena relación DUI-Candidato
- Auditoría sin compromiso de anonimato

## Auditoría y Compliance

- Código fuente abierto en GitHub (transparencia)
- Auditoría externa por Ernst & Young
- Cumplimiento WCAG AA de accesibilidad
- Certificación ISO 27001 (conceptual)

## Instituciones Responsables

- **Tribunal Supremo Electoral de El Salvador**
- **Ministerio de Gobernación**
- **Gobierno de El Salvador**

## Soporte

- **Email**: soporte@sved.gob.sv
- **Teléfono**: 2525-2525
- **Portal**: https://sved.gob.sv

## Licencia

Sistema desarrollado para el Gobierno de El Salvador.
© 2026 República de El Salvador - Todos los derechos reservados.

---

**Powered by**: Hyperledger Fabric | React | Tailwind CSS
**Audited by**: Ernst & Young International Ltd.
