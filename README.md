# reparacioneStore

Sistema de gestión para venta y reparación de celulares. Pensado para escalar a
multi-local (multi-tenant): un Super Admin crea y administra locales, y cada
local tiene su propia gestión (stock, ventas, reparaciones, clientes,
proveedores).

**Versión actual: v0.0.0** — todo funciona con datos de demostración
guardados en el `localStorage` del navegador. Todavía no hay conexión a una
base de datos real (Supabase se va a integrar en una versión posterior).

## Requisitos

- Node.js 18 o superior
- npm

## Instalación y uso local

```bash
npm install
npm run dev
```

Esto levanta un servidor de desarrollo (por defecto en `http://localhost:5173`).

## Build de producción

```bash
npm run build
```

Genera la carpeta `dist/` lista para deployar en Netlify, Vercel o cualquier
hosting de archivos estáticos. Configuración sugerida en Netlify:

- Build command: `npm run build`
- Publish directory: `dist`

## Usuarios de demostración

En la pantalla de login se elige con qué usuario ingresar (no hay
contraseñas todavía, es solo para probar el flujo):

- **Administrador General** — Super Admin, ve y administra todos los locales.
- **Juan Pérez** — dueño de "Local Centro".
- **María Gómez** — dueño de "Local Norte".

Los datos se guardan en el navegador. Si querés volver todo al estado
inicial, usá el botón "Restablecer datos de demostración" en el login.

## Estructura del proyecto

```
src/
  components/    Componentes reutilizables (UI base, layout, dashboard)
  constants/     Listas fijas (roles, estados, tipos de producto, etc.)
  context/       Contexto de autenticación (sesión demo)
  hooks/         Hooks reutilizables (acceso a colecciones de datos)
  lib/           Capa de datos demo (localStorage) y helpers de formato
  pages/         Páginas por módulo (super admin, y por local: dashboard,
                 stock, ventas, reparaciones, clientes, proveedores)
  router/        Protección de rutas
```

## Próximos pasos (no incluidos en esta versión)

- Conexión real a Supabase (auth + base de datos).
- Permisos y contraseñas reales por usuario.
- Reportes / exportación de datos.
