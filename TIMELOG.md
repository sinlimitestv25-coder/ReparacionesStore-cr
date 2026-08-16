# Registro de tiempos

Tiempo real de trabajo por versión (hora de inicio y fin de cada tanda de
cambios), para poder armar una estimación de duración del proyecto.

No hay datos confiables de v0.0.0 a v0.6.0 (no se registraron en su
momento) — el registro arranca en v0.7.0.

| Versión | Inicio              | Fin                  | Duración |
|---------|----------------------|-----------------------|----------|
| v0.7.0  | 2026-08-15 20:57:25 | 2026-08-15 21:05:18  | 7m 53s   |
| v0.8.0  | 2026-08-15 22:20:46 | 2026-08-15 22:36:43  | 15m 57s  |
| v0.9.0  | 2026-08-15 22:56:50 | 2026-08-15 23:08:00  | 11m 10s  |
| v0.9.1  | 2026-08-15 23:17:05 | 2026-08-15 23:22:07  | 5m 2s    |
| v0.10.0 | 2026-08-15 23:46:50 | 2026-08-15 23:53:36  | 6m 46s   |
| v1.0.0  | 2026-08-16 00:59:37 | 2026-08-16 01:05:43  | 6m 6s    |
| v1.1.0  | 2026-08-16 01:20:50 | 2026-08-16 01:28:16  | 7m 26s   |
| v1.1.1  | 2026-08-16 01:51:22 | 2026-08-16 01:53:09  | 1m 47s   |
| v1.2.0  | 2026-08-16 02:35:00 | 2026-08-16 02:46:25  | 11m 25s  |
| v1.2.1  | 2026-08-16 03:00:36 | 2026-08-16 03:04:20  | 3m 44s   |

**Total registrado (v0.7.0 a v1.2.1): 1h 17m 16s**

## Estimación v0.0.0 a v0.6.0 (no medido, aproximado)

No hay hora de inicio/fin real para estas versiones. La estimación de abajo
sale de comparar el alcance de cada una (cantidad de archivos y
complejidad) contra las versiones que sí están medidas — no es un dato
duro, es una aproximación para tener una referencia.

| Versión | Qué incluyó (resumen) | Estimado |
|---------|------------------------|----------|
| v0.0.0  | Base completa: arquitectura, 8 componentes UI, layout, login, panel Super Admin y los 6 módulos del local (44 archivos) — la versión más grande de todo el proyecto | ~50 min |
| v0.1.0  | Arquitectura de subdominios multi-tenant (~15 archivos) | ~18 min |
| v0.1.1  | Fix del loop infinito de login + configuración de Vercel | ~4 min |
| v0.2.0  | Usuarios reales con usuario/contraseña + varias mejoras de UI | ~17 min |
| v0.3.0  | Logo y banner propios por local | ~11 min |
| v0.4.0  | Login con ilustración propia (SVG) + compresión de imágenes | ~14 min |
| v0.5.0  | Sidebar del Super Admin + banner simétrico | ~12 min |
| v0.6.0  | Recibo en PDF (jsPDF) + política configurable | ~14 min |

**Estimado v0.0.0 a v0.6.0: ~2h 20m** (rango probable 2h–2h40m)

## Total combinado (medido + estimado)

**~3h 37m** (1h 17m medido + ~2h 20m estimado)

(Sigue sin incluir el tiempo que vos tardás en probar y responder entre
versiones — eso es aparte.)
