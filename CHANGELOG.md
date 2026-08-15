# Changelog

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
