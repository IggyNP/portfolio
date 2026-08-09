# Intro hero→About: transición atómica "trigger-by-time"

Fecha: 2026-08-09
Estado: aprobado (pendiente de implementación)

## Objetivo

Que la transición hero→"Sobre Mí" (y su inversa) se reproduzca **entera y
bloqueada** con un solo gesto/clic, sin estados intermedios, aterrizando clavada
en la vista de About. Adoptar el patrón ya pulido de `hafner-studio`
(`src/features/home/Hero.tsx`, `HeroScroll`).

## Modelo (portado de Hafner)

- El progreso `p` (0→1) se **anima por tiempo** (~1.6s), NO por posición de scroll.
- Un gesto/tecla/clic **dispara** la transición; el scroll queda **pineado**
  (lock real por rAF que clampa `window.scrollY` cada frame).
- Al completar hacia adelante se suelta el pin y el usuario continúa a `Work`.
- En la vista de About (arriba del todo), un gesto hacia arriba la reproduce en
  **reversa** (`p` 1→0).
- **Anti-trap**: un scroll normal reproduce los ~1.6s; un flick agresivo (mucho
  delta en una ventana corta) salta directo al final.
- **Absorción de cola**: tras completar hacia adelante, se traga el resto del
  mismo gesto hasta que va idle, para no pasarse por inercia del trackpad.
- **Watchdog** + liberar en `blur`/`visibilitychange`: el pin nunca se queda
  pegado.
- Listeners no-pasivos (`wheel`/`touchmove`) solo activos cerca del top (perf).

## Diferencia con Hafner

El hero del portfolio usa `<video autoPlay loop>` normal (no seek por
`currentTime`). No hace falta reproducir el vídeo en reversa: en la transición
solo se escala/desenfoca el vídeo que ya está en loop. Se elimina toda la
lógica de `prime`/seek/`SMOOTH` de Hafner.

## Reutilización de la animación actual

Se conservan **verbatim** los `useTransform` de `DesktopScene` (zoom+blur del
vídeo, fundido del texto, `heroLayerOpacity`, `aboutOpacity`, `aboutScale`,
`revealProgress`). Único cambio: su **fuente** pasa de `scrollYProgress`
(`useScroll`) a un `useMotionValue` `progress` que mueve el controlador por
tiempo (con `animate(progress, target, { duration, ease: "easeInOut" })`).

## Cambios estructurales

- `DesktopScene`: la `<section id="home">` pasa de `h-[260vh]` + `sticky` a
  **`h-screen`** (100vh) con capas `absolute inset-0`. About es el estado de
  reposo `p=1` de esa escena; tras ella siguen `Work` y `Contact` en flujo
  normal.
- Se elimina `useScroll`/`sectionRef` como fuente de progreso.

## Disparadores

- **Adelante (p→1):** wheel/trackpad abajo, `↓`/`PageDown`/`Espacio`, **clic en
  el indicador "Scroll"/flechita** del hero (pasa a `<button>` accesible).
- **Atrás (p→0):** wheel/trackpad arriba o `↑`/`PageUp` estando arriba del todo,
  y **clic en una flechita "arriba"** que aparece en la vista de About.

## Navegación (anclajes)

"INICIO" e "INFO" dejan de ser posiciones de scroll y pasan a ser **estados**
(`p=0` / `p=1`). En desktop interactivo se interceptan esos dos enlaces:
`scrollTo(0,0)` + `CustomEvent("intro:goto", { detail: { target } })` que el
controlador escucha. "TRABAJO"/"CONTACTO" siguen con su navegación actual, sin
tocar. La intercepción se activa solo cuando el hero interactivo está montado
(flag `window.__introInteractive`), de modo que en móvil/reduced-motion el nav
sigue con anclajes normales.

## Sin tocar

Móvil y `prefers-reduced-motion`: apilado estático (`#home` + `#about` como
secciones reales), scroll normal, sin hijacking ni listeners. Es el fallback y
la base de SSR/primer render (sin mismatch de hidratación).

## Contrato del controlador (API expuesta por ref)

- `startForward()` / `startReverse()` — inician el tween con lock.
- `snapTo(0|1)` — salto instantáneo (anti-trap / teclado).
- Escucha `intro:goto` para el nav.
- `window.__introInteractive` = true mientras está montado.
