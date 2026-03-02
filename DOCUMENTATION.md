# Timeline Bíblico Interactivo - NAAS v2.1

Este proyecto es un timeline bíblico interactivo construido con **Next.js**, siguiendo la arquitectura **Screaming Architecture** y el sistema de diseño **NAAS v2.1** (Neo-AIDA Accessible System).

## 🚀 Tecnologías

- **Framework:** Next.js 14 (App Router)
- **Lenguaje:** TypeScript
- **Estilos:** Tailwind CSS (Neobrutalismo)
- **Base de Datos:** SQLite con Prisma ORM
- **Animaciones:** Framer Motion
- **Iconos:** Lucide React
- **Testing:** Vitest + React Testing Library
- **Runtime:** Bun

## 🏗️ Arquitectura: Screaming Architecture

La estructura de carpetas refleja la intención del sistema:

- `src/features`: Contiene la lógica de negocio y componentes específicos de cada funcionalidad (ej. `timeline`).
- `src/components`: Componentes UI genéricos y reutilizables.
- `src/lib`: Configuraciones de librerías (Prisma, utils).
- `src/app`: Definición de rutas y layouts de Next.js.

## 🎨 Sistema de Diseño: NAAS v2.1

Implementa una jerarquía cognitiva estricta basada en el modelo AIDA:

1.  **Attention (Atención):** Ganchos visuales masivos (Fase 1).
2.  **Interest (Interés):** Bloques de información clara (Fase 2).
3.  **Desire (Deseo):** Elementos de confianza y empatía (Fase 3).
4.  **Action (Acción):** CTA primario con feedback táctil (Fase 4).

### Tokens Cognitivos
- `--intent-action`: #FFDE59 (Amarillo) - Reservado exclusivamente para conversiones.
- `--intent-attention`: #8850FF (Violeta) - Ganchos visuales.

## 🛠️ Instalación y Ejecución

1.  **Instalar dependencias:**
    ```bash
    bun install
    ```

2.  **Configurar base de datos:**
    ```bash
    bunx prisma db push
    bun prisma/seed.ts
    ```

3.  **Ejecutar en desarrollo:**
    ```bash
    bun dev
    ```

4.  **Ejecutar tests:**
    ```bash
    bun test
    ```

## ♿ Accesibilidad

- Cumple con los estándares **WCAG 2.2 AA**.
- Navegación por teclado optimizada.
- Atributos `data-aida` para auditoría de jerarquía visual.
- Contraste elevado y tipografía legible.
