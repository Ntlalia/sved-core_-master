# SVED Design System Guidelines

Sistema de Votación Electrónica Descentralizado - Gobierno de El Salvador

## Identidad Visual

### Estética
Institucional moderno. Inspirado en gob.sv, Chivo Wallet y portales gubernamentales latinoamericanos de nueva generación. Moderno, accesible, confiable. No genérico. No Material Design puro.

## Paleta de Colores

### Colores Primarios
- **Azul institucional profundo**: `#0A2F5A` - Usado en headers, botones CTA, elementos primarios
- **Azul medio**: `#1A5FA8` - Interactivos, links, acentos
- **Azul claro**: `#E8F1FA` - Fondos de sección, cards secundarias

### Colores Base
- **Blanco**: `#FFFFFF` - Superficie principal
- **Gris oscuro**: `#2D3748` - Texto primario
- **Gris medio**: `#718096` - Texto secundario, subtítulos
- **Gris claro**: `#E2E8F0` - Bordes, separadores

### Colores de Estado
- **Verde verificación**: `#1A7A4A` - Estados exitosos, biometría confirmada
- **Rojo alerta**: `#C53030` - Errores, intentos fallidos
- **Dorado acento**: `#B7860C` - Elementos decorativos de confianza, sellos

## Tipografía

### Familias tipográficas
- **Display/Headings**: "DM Sans" - Pesos 600 y 700
- **Body**: "Inter" - Pesos 400, 500, 600
- **Monospace**: "JetBrains Mono" - Para hashes blockchain y TxID

### Jerarquía
- **H1**: 2rem (32px), font-weight 600, line-height 1.2
- **H2**: 1.5rem (24px), font-weight 600, line-height 1.3
- **H3**: 1.25rem (20px), font-weight 600, line-height 1.4
- **H4**: 1.125rem (18px), font-weight 600, line-height 1.5
- **Body**: 1rem (16px), font-weight 400, line-height 1.5
- **Small**: 0.875rem (14px), font-weight 400, line-height 1.5

## Componentes

### Button
El componente Button es el elemento de acción principal en el sistema.

**Variantes:**
- **Primary**: Fondo azul institucional, texto blanco. Para acciones principales.
- **Secondary**: Fondo azul medio, texto blanco. Para acciones alternativas.
- **Destructive**: Fondo rojo alerta, texto blanco. Para acciones destructivas o de advertencia.
- **Ghost**: Fondo transparente, texto gris oscuro. Para acciones terciarias.

**Estados:**
- Default: Con sombra sutil (--shadow-card)
- Hover: Sombra elevada (--shadow-hover)
- Active: Scale 0.98
- Disabled: Opacidad 50%, cursor not-allowed
- Loading: Spinner animado

**Implementación:**
```tsx
<Button variant="primary">Acción Principal</Button>
<Button variant="secondary">Acción Secundaria</Button>
<Button variant="destructive">Eliminar</Button>
<Button variant="ghost">Cancelar</Button>
```

### Badge
Indicadores de estado compactos.

**Estados:**
- **pending**: Fondo azul claro, texto y borde azul medio
- **voted/confirmed/success**: Fondo verde suave, texto y borde verde verificación
- **disabled/rejected**: Fondo rojo suave, texto y borde rojo alerta
- **active**: Verde con animación de pulso

**Implementación:**
```tsx
<Badge status="pending">PENDIENTE</Badge>
<Badge status="voted">VOTADO</Badge>
<Badge status="disabled">INHABILITADO</Badge>
```

### Card
Contenedor principal para agrupar información relacionada.

**Variantes:**
- **default**: Fondo blanco, borde gris claro
- **primary**: Fondo azul claro, borde azul medio suave
- **dark**: Fondo azul institucional, texto blanco

**Propiedades:**
- `selected`: Añade borde azul medio de 2px y fondo azul claro
- `hoverable`: Añade efecto hover con sombra elevada
- `onClick`: Hace la card interactiva con cursor pointer

**Bordes redondeados:** 12px (--radius-card)

**Implementación:**
```tsx
<Card>Contenido básico</Card>
<Card variant="primary">Contenido destacado</Card>
<Card selected hoverable onClick={handleClick}>Card seleccionable</Card>
```

### Input
Campo de entrada de texto con estados y validación.

**Estados:**
- Default: Borde gris claro
- Focus: Borde azul medio con ring azul suave
- Error: Borde rojo alerta con ring rojo suave
- Disabled: Fondo gris claro, cursor not-allowed

**Propiedades:**
- `label`: Etiqueta superior del campo
- `error`: Mensaje de error (aparece en rojo debajo del input)
- `helperText`: Texto de ayuda (aparece en gris debajo del input)

**Implementación:**
```tsx
<Input 
  label="Número de DUI"
  placeholder="00000000-0"
  helperText="Tu información está protegida"
/>
```

### Alert
Mensajes de estado y notificaciones.

**Tipos:**
- **success**: Verde, icono CheckCircle
- **error**: Rojo, icono XCircle
- **warning**: Dorado, icono AlertCircle
- **info**: Azul, icono Info

**Implementación:**
```tsx
<Alert type="success">Operación exitosa</Alert>
<Alert type="error">Error en la operación</Alert>
<Alert type="warning">Advertencia importante</Alert>
```

### ProgressStepper
Indicador de progreso horizontal para procesos de múltiples pasos.

**Características:**
- Muestra el paso actual con ring azul
- Pasos completados tienen check verde
- Pasos futuros en gris
- Conectores entre pasos cambian de color según progreso

**Uso:** Proceso de votación (4 pasos: Identidad → Biometría → Voto → Confirmación)

**Implementación:**
```tsx
const steps = [
  { number: 1, label: "Identidad" },
  { number: 2, label: "Biometría" },
  { number: 3, label: "Tu voto" },
  { number: 4, label: "Confirmación" }
];

<ProgressStepper steps={steps} currentStep={2} />
```

### Header
Encabezado institucional del sistema.

**Elementos:**
- Logo SVED (icono Shield)
- Título y subtítulo del sistema
- Información de usuario autenticado (opcional)
- Escudo de El Salvador

**Implementación:**
```tsx
<Header />
<Header userName="María Elena Rodríguez" showUserInfo />
```

## Estilo Visual

### Bordes Redondeados
- Componentes básicos: 8px (`--radius-base`)
- Cards: 12px (`--radius-card`)
- Modales: 16px (`--radius-modal`)

### Sombras
- Card: `0 2px 8px rgba(10, 47, 90, 0.10)` (`--shadow-card`)
- Hover: `0 4px 12px rgba(10, 47, 90, 0.15)` (`--shadow-hover`)
- Modal: `0 8px 24px rgba(10, 47, 90, 0.20)` (`--shadow-modal`)

### Separadores
- Líneas de 1px en color `--gray-light` (#E2E8F0)

### Iconos
- Usar Lucide React (outline style)
- Tamaños estándar: 16px (small), 20px (medium), 24px (large)
- Colores según contexto (azul institucional, gris, etc.)

## Gradientes

**Uso limitado:** Solo un gradiente sutil azul en elementos hero o headers principales.

**Ejemplo:**
```tsx
className="bg-gradient-to-br from-blue-institutional via-blue-medium to-blue-institutional"
```

## Layout y Espaciado

### Contenedores
- Max-width estándar: `max-w-4xl` (768px) para contenido centrado
- Max-width amplio: `max-w-6xl` (1152px) para dashboards
- Max-width completo: `max-w-7xl` (1280px) para headers

### Padding
- Secciones principales: `px-8 py-12`
- Cards: `p-6`
- Componentes pequeños: `p-4`

### Gaps
- Grid layouts: `gap-6` o `gap-8`
- Flex layouts: `gap-3` o `gap-4`

## Páginas del Sistema

### 1. Identificación (IdentificationScreen)
- Stepper en paso 1/4
- Card central con input de DUI
- Formato de DUI: 00000000-0
- Indicador de seguridad (candado + TLS 1.3)

### 2. Verificación Biométrica (BiometricScreen)
- Stepper en paso 2/4
- Icono de huella con animación de pulso
- Barra de progreso de captura
- Badge "Liveness Detection activo"
- Contador de intentos (1 de 3)

### 3. Selección de Voto (VoteScreen)
- Stepper en paso 3/4
- Grid de cards de candidatos (2 columnas)
- Efecto hover y selección con check
- Opción de voto en blanco (borde punteado)
- Mensaje de privacidad con icono escudo

### 4. Confirmación y Recibo (ConfirmationScreen)
- Stepper completado (todos en verde)
- Check verde grande con animación
- Card dark con TxID en monospace
- Timestamp del registro
- Sello dorado "Registrado en Blockchain"
- Botones para verificar en portal o cerrar sesión

### 5. Dashboard Administrativo (AdminDashboard)
- Sidebar azul institucional (240px)
- Métricas en tiempo real (4 cards)
- Gráfico de participación por hora (AreaChart)
- Mapa de calor por departamento
- Tabla de transacciones blockchain
- Alertas de seguridad (error/warning)

### 6. Portal de Auditoría Pública (AuditPortal)
- Header minimalista con badge "Acceso libre"
- Input grande para TxID de verificación
- Card de resultado con prueba criptográfica
- Resultados electorales en tiempo real (barras de progreso)
- Footer institucional con enlaces

## Accesibilidad

- Contraste mínimo WCAG AA para todos los textos
- Estados focus visibles en todos los elementos interactivos
- Labels descriptivos en inputs
- Mensajes de error claros y específicos
- Textos alternativos en iconos decorativos

## Convenciones de Código

### Nombres de archivos
- Componentes: PascalCase (`Button.tsx`, `ProgressStepper.tsx`)
- Páginas: PascalCase con sufijo Screen (`IdentificationScreen.tsx`)

### Imports
- Componentes propios siempre con ruta relativa: `import { Button } from "../components/Button"`
- Lucide icons: `import { Shield, Check } from "lucide-react"`

### Clases Tailwind
- Usar clases de color personalizadas: `bg-blue-institutional`, `text-gray-dark`
- Preferir utilidades Tailwind sobre CSS custom cuando sea posible
- Orden de clases: layout → spacing → visual → text → misc

## Notas Técnicas

- React Router v7 para navegación
- Recharts para gráficos y visualizaciones
- Lucide React para iconografía
- Tailwind CSS v4 para estilos
- Sin uso de Material UI o Ant Design (diseño institucional custom)
