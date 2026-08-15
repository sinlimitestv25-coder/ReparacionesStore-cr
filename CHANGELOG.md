# Changelog

## v0.6.0 — Recibo de ingreso en PDF, con política configurable

- **Nueva dependencia**: `jspdf`. Hace falta correr `npm install` de nuevo
  después de bajar esta versión.
- **Política de reparaciones**: cada local tiene su propio texto (plazos,
  garantía, daños preexistentes, etc.), editable desde Configuración, con un
  texto sugerido por defecto.
- **Recibo de ingreso en PDF**: botón nuevo en cada reparación (ícono de
  hoja) que arma un recibo con los datos del equipo, el cliente, el costo
  estimado y la política del local.
- Desde el recibo se puede: descargar el PDF, imprimirlo directo, abrir
  WhatsApp con el número y un mensaje ya redactado, o (en celulares)
  compartirlo directo con la app que elijas usando el botón "Compartir" del
  navegador.

## v0.5.0 — Sidebar para el Super Admin, banners más grandes, panel estirado

- **Panel Super Admin con sidebar**, igual que el de cada local: logo grande
  arriba, y abajo "Nuevo local" y "Configuración" (antes estaban sueltos en
  el encabezado).
- **Banner mucho más alto**, tanto en el panel de cada local como en el del
  Super Admin — ahora comparten el mismo componente de encabezado, así
  quedan simétricos.
- **Panel Super Admin estirado**: se sacó el límite de ancho centrado, el
  contenido ahora usa todo el espacio disponible (las tarjetas de locales se
  acomodan en más columnas en pantallas grandes).
- **Login**: el lado de los locales ya no habla de "panel" ni "local" — el
  mensaje ahora está pensado para el dueño del negocio, que es quien más lo
  va a ver.

## v0.4.0 — Login con pantalla dividida + ajustes de imágenes y layout

- **Login rediseñado**: pantalla dividida a la mitad. Un lado tiene una
  ilustración original (celular con la pantalla rota + herramientas, hecha
  en SVG, no es una foto) y el otro el nombre bien grande, un eslogan y el
  formulario de usuario/contraseña.
- **Imágenes más grandes y livianas**: ahora se aceptan archivos de hasta
  4 MB para el logo y el banner, pero se comprimen y redimensionan en el
  navegador antes de guardarse, así no llenan el almacenamiento del
  navegador.
- **Banner el doble de alto** tanto en el panel de cada local como en el del
  Super Admin, para que la imagen se aprecie mejor.
- **Configuración** se movió al menú lateral del local (debajo de
  Proveedores), en vez de estar en el encabezado.
- **Botón "Salir"** más grande y visible en ambos paneles.

## v0.3.0 — Logo y banner por local + Configuración para dueños

- **Logo y banner separados**: Configuración ahora tiene dos imágenes
  independientes (antes solo había una). El logo se muestra chico junto al
  nombre; el banner es la imagen de fondo ancha del encabezado.
- **Cada local tiene su propia marca**: el dueño de cada local ahora tiene su
  propio botón "Configuración" (en el panel de su local) para cargar su
  logo, su banner y cambiar su contraseña — independiente de la marca del
  Super Admin.
- **Sidebar del local**: logo grande (casi cuadrado, bordes redondeados,
  ancho completo del panel lateral) arriba del menú de navegación.
- **Encabezado del local**: ahora también es un banner con la imagen de
  fondo del local, igual que el del Super Admin.
- Corrección interna: el logo/banner de un local ahora se actualiza en
  pantalla apenas se sube, sin hacer falta recargar la página.

## v0.2.0 — Login real (usuario/contraseña), Configuración y ajustes

- **Login por usuario y contraseña**: los usuarios dejaron de ser una lista
  fija en el código y pasaron a ser datos reales del sistema. Al crear un
  local, el Super Admin ahora define usuario y contraseña del dueño (ya no
  un email). Recordá: por ahora se guardan sin cifrar en el navegador
  (todavía no hay backend real) — ver el aviso en el README.
- **Restablecer contraseña**: el Super Admin puede fijarle una contraseña
  nueva al dueño de cualquier local desde su panel (botón "Contraseña" en
  cada tarjeta de local).
- **Panel Super Admin**: header más ancho/alto tipo banner, con logo propio
  cargable (Configuración → Logo del sistema) y opción de cambiar la propia
  contraseña del administrador.
- **Reparaciones**: al cargar un nuevo ingreso ahora se puede crear un
  cliente nuevo sin salir del formulario ("+ Nuevo cliente").
- **Tarjetas de métricas**: ícono más grande y reubicado arriba a la derecha
  en todas las tarjetas (dashboard de local y panel Super Admin).

## v0.1.1 — Corrección: loop infinito de redirecciones + config de Vercel

- **Bug crítico corregido**: si quedaba una sesión guardada que no
  correspondía al dominio actual (ej. una sesión de dueño de local mientras
  se navega el dominio raíz), el login intentaba redirigir a una ruta que no
  existe en ese dominio, entraba en loop infinito con la ruta comodín y
  colgaba la pestaña ("Throttling navigation..." en la consola). Ahora, si
  la sesión no corresponde al dominio actual, se cierra automáticamente en
  vez de redirigir mal.
- Se agregó `vercel.json` con el rewrite necesario para que las rutas
  internas (`/dashboard`, `/stock`, etc.) no den 404 en Vercel al entrar por
  link directo o al refrescar.
- Documentación de deploy actualizada para Vercel (antes tenía pasos
  pensados para Netlify).

## v0.1.0 — Acceso por subdominio + ajustes de estética

- Cada local ahora se accede por su propio subdominio (ej: `centro.tudominio.com`),
  en vez de por una URL compartida con selector de local. El dominio raíz
  (`tudominio.com`) queda exclusivo para el panel del Super Admin.
- El login de cada subdominio muestra únicamente al dueño de ese local: nadie
  ve cuántos locales existen ni puede entrar a uno que no es el suyo.
- El Super Admin ahora define un "subdominio" al crear un local (autogenerado
  desde el nombre, editable), con validación para que no se repita.
- El botón "Ingresar" del panel Super Admin navega de verdad a la URL del
  local (con `?tienda=` como atajo de prueba mientras no haya dominio propio
  configurado — ver notas de esta entrega).
- Se sacó la "impersonación" por URL compartida: ya no tiene sentido una vez
  que cada local vive en su propio subdominio/origen.
- Bordes de las tarjetas del dashboard más marcados para que se note la
  separación entre una tarjeta y otra.

## v0.0.0 — Base del sistema (demo)

Primera versión. Toda la app funciona con datos de demostración en
`localStorage`, sin backend todavía.

- Login demo con selección de usuario (Super Admin o dueño de local).
- Panel Super Admin: alta de locales, activar/desactivar, ingresar a
  la gestión de cualquier local.
- Por local: Dashboard (valor de stock, ventas del mes, ganancia
  estimada, reparaciones en curso, alertas de stock bajo).
- Módulo Stock: alta/edición/baja de celulares, repuestos y accesorios,
  con costo, precio, cantidad y stock mínimo.
- Módulo Ventas: registro de ventas con carrito de productos, cliente
  opcional y método de pago; descuenta stock automáticamente. Historial
  de ventas.
- Módulo Reparaciones: ingreso de equipos, estado (diagnóstico, en
  reparación, listo, entregado), técnico asignado, costo estimado/final.
- Módulo Clientes: alta/edición/baja, con contador de compras y
  reparaciones por cliente.
- Módulo Proveedores: alta/edición/baja.
