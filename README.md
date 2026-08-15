# reparacioneStore

Sistema de gestión para venta y reparación de celulares. Multi-local
(multi-tenant): un Super Admin crea y administra locales, y cada local entra
por su propio subdominio a su propia gestión (stock, ventas, reparaciones,
clientes, proveedores) sin ver los demás locales.

**Versión actual: v0.5.0** — todo funciona con datos de demostración
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

Genera la carpeta `dist/` lista para deployar. Este proyecto se deploya en
**Vercel**. Configuración del proyecto en Vercel (Settings → General → Build
& Development Settings):

- Framework Preset: **Vite**
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`

El archivo `vercel.json` ya incluido en el proyecto se encarga de que las
rutas internas (`/dashboard`, `/stock`, etc.) funcionen al entrar por link
directo o al refrescar la página, en vez de tirar error 404.

## Cómo funciona el acceso por subdominio

- **Dominio raíz** (ej: `reparacionestore.com`) → panel del Super Admin.
- **Subdominio de un local** (ej: `centro.reparacionestore.com`) → login y
  gestión de ese local únicamente. Nadie que entra a un subdominio ve que
  existen otros locales.

Para que esto funcione con un dominio propio hacen falta dos pasos que son
tuyos, fuera del código:

1. En Vercel, ir al proyecto → **Settings → Domains** y agregar tu dominio
   raíz (`reparacionestore.com`) y además el dominio wildcard
   `*.reparacionestore.com`. Vercel te va a mostrar qué registros DNS tenés
   que cargar (normalmente un `A`/`ALIAS` para el dominio raíz y un `CNAME`
   apuntando a `cname.vercel-dns.com` para el wildcard).
2. Cargar esos registros en tu proveedor de DNS (donde compraste el
   dominio). Puede tardar un rato en propagarse.

Cada local define su subdominio (campo "Subdominio" al crearlo desde el
panel Super Admin) — por defecto se genera solo a partir del nombre, pero se
puede editar.

### Probar los subdominios sin tener el DNS configurado todavía

Mientras no tengas el dominio propio armado, cualquier URL del sitio acepta
`?tienda=<subdominio>` para simular estar en ese local, por ejemplo:

```
https://tu-sitio.vercel.app/?tienda=centro
https://tu-sitio.vercel.app/?tienda=norte
```

Y sin ese parámetro, `https://tu-sitio.vercel.app` se comporta como el
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

## Login y usuarios

El login pide usuario y contraseña de verdad. **Importante**: como todavía
no hay backend, esas credenciales se guardan **en texto plano** en el
`localStorage` del navegador — sirve para probar el sistema, pero no es
seguridad real. No uses ahí una contraseña que uses en otro lado. Esto se
soluciona solo en cuanto conectemos Supabase (auth real, con cifrado).

Credenciales de los usuarios de demostración (semilla inicial):

| Dominio | Usuario | Contraseña |
|---|---|---|
| Dominio raíz (Super Admin) | `admin` | `admin123` |
| Subdominio de "Local Centro" | `juan` | `centro123` |
| Subdominio de "Local Norte" | `maria` | `norte123` |

- El Super Admin define usuario y contraseña de cada local al crearlo, y
  puede restablecer la contraseña de cualquier local después (botón
  "Contraseña" en cada tarjeta, por si el dueño se la olvida o queda
  bloqueado).
- Tanto el Super Admin (en su header) como el dueño de cada local (en
  **Configuración**, dentro del menú lateral) pueden cargar un **logo**
  (chico, junto al nombre, y grande en el menú lateral del local) y un
  **banner** (imagen ancha de fondo del encabezado) propios, y cambiar su
  contraseña. La marca de un local es independiente de la del Super Admin y
  de la de los demás locales. Se aceptan imágenes de hasta 4 MB: se
  redimensionan y comprimen automáticamente en el navegador antes de
  guardarse, para no llenar el almacenamiento local.
- Los datos se guardan en el navegador. Si querés volver todo al estado
  inicial (en el dominio/subdominio que estés viendo, incluyendo estas
  credenciales seed), usá el botón "Restablecer datos de demostración" en el
  login.

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
