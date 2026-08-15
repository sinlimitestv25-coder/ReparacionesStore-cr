# reparacioneStore

Sistema de gestión para venta y reparación de celulares. Multi-local
(multi-tenant): un Super Admin crea y administra locales, y cada local entra
por su propio subdominio a su propia gestión (stock, ventas, reparaciones,
clientes, proveedores) sin ver los demás locales.

**Versión actual: v0.1.0** — todo funciona con datos de demostración
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
En local no hay subdominios reales, así que para probar un local específico
agregá `?tienda=centro` o `?tienda=norte` a la URL (ver sección de
subdominios más abajo).

## Build de producción

```bash
npm run build
```

Genera la carpeta `dist/` lista para deployar en Netlify, Vercel o cualquier
hosting de archivos estáticos. Configuración sugerida en Netlify:

- Build command: `npm run build`
- Publish directory: `dist`

## Cómo funciona el acceso por subdominio

- **Dominio raíz** (ej: `reparacionestore.com`) → panel del Super Admin.
- **Subdominio de un local** (ej: `centro.reparacionestore.com`) → login y
  gestión de ese local únicamente. Nadie que entra a un subdominio ve que
  existen otros locales.

Para que esto funcione con un dominio propio hacen falta dos pasos que son
tuyos, fuera del código:

1. En tu proveedor de DNS, agregar un registro wildcard `*` (o
   `*.reparacionestore.com`) apuntando al mismo destino que usás para el
   dominio raíz (en Netlify, normalmente un `CNAME` a tu-sitio.netlify.app).
2. En la configuración de dominios de Netlify/Vercel, agregar el dominio
   wildcard (`*.reparacionestore.com`) como dominio del sitio, además del
   dominio raíz.

Cada local define su subdominio (campo "Subdominio" al crearlo desde el
panel Super Admin) — por defecto se genera solo a partir del nombre, pero se
puede editar.

### Probar los subdominios sin tener el DNS configurado todavía

Mientras no tengas el dominio propio armado, cualquier URL del sitio acepta
`?tienda=<subdominio>` para simular estar en ese local, por ejemplo:

```
https://tu-sitio.netlify.app/?tienda=centro
https://tu-sitio.netlify.app/?tienda=norte
```

Y sin ese parámetro, `https://tu-sitio.netlify.app` se comporta como el
dominio raíz (panel Super Admin). El botón "Ingresar" del panel Super Admin
ya arma el link correcto automáticamente, sea con subdominio real o con este
atajo, según lo que detecte disponible.

### Importante: los datos demo no viajan entre subdominios

Mientras no esté conectado Supabase, los datos se guardan en el
`localStorage` del navegador, que el navegador aísla **por dominio
completo** (no se comparte entre `reparacionestore.com` y
`centro.reparacionestore.com`, por ejemplo). Esto significa que, por ahora,
cada subdominio va a arrancar con su propia copia de los datos de
demostración (la misma semilla), no la que hayas modificado desde otro
subdominio. Se soluciona solo en cuanto conectemos una base de datos real.

## Usuarios de demostración

En la pantalla de login no hace falta contraseña todavía, se elige
directamente con qué usuario entrar. Qué usuarios se ven depende del
dominio:

- **Dominio raíz** → Administrador General (Super Admin).
- **Subdominio de "Local Centro"** → Juan Pérez (dueño).
- **Subdominio de "Local Norte"** → María Gómez (dueño).

Los datos se guardan en el navegador. Si querés volver todo al estado
inicial (en el dominio/subdominio que estés viendo), usá el botón
"Restablecer datos de demostración" en el login.

## Estructura del proyecto

```
src/
  components/    Componentes reutilizables (UI base, layout, dashboard)
  constants/     Listas fijas (roles, estados, tipos de producto, etc.)
  context/       Autenticación (sesión demo) y resolución de tenant/subdominio
  hooks/         Hooks reutilizables (acceso a colecciones de datos)
  lib/           Capa de datos demo (localStorage), subdominios y formato
  pages/         Páginas por módulo (super admin, y por local: dashboard,
                 stock, ventas, reparaciones, clientes, proveedores)
  router/        Protección de rutas
```

## Próximos pasos (no incluidos en esta versión)

- Conexión real a Supabase (auth + base de datos), que además resuelve que
  los datos no se compartan entre subdominios.
- Permisos y contraseñas reales por usuario.
- Reportes / exportación de datos.
