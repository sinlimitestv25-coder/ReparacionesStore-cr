export const ROLES = {
  SUPER_ADMIN: 'super_admin',
  OWNER: 'owner',
}

export const PRODUCT_TYPES = [
  { value: 'celular', label: 'Celular' },
  { value: 'repuesto', label: 'Repuesto' },
  { value: 'accesorio', label: 'Accesorio' },
]

export const REPAIR_STATUSES = [
  { value: 'diagnostico', label: 'En diagnóstico', color: 'amber' },
  { value: 'reparacion', label: 'En reparación', color: 'blue' },
  { value: 'listo', label: 'Listo para entregar', color: 'emerald' },
  { value: 'entregado', label: 'Entregado', color: 'slate' },
]

export const PAYMENT_METHODS = [
  { value: 'efectivo', label: 'Efectivo' },
  { value: 'tarjeta', label: 'Tarjeta' },
  { value: 'transferencia', label: 'Transferencia' },
]

// PIN de acceso a la pestaña "Administrador" del login. Es una traba
// liviana contra clics por error, no seguridad real (vive en el navegador,
// como todo en esta etapa demo).
export const DEFAULT_ADMIN_PIN = '1234'

export const DEFAULT_REPAIR_TERMS = `El cliente dispone de 30 días corridos desde la fecha de este recibo para retirar el equipo. Pasado ese plazo, el local no se responsabiliza por su guarda ni conservación.

El diagnóstico inicial es una estimación; el presupuesto final puede variar una vez abierto el equipo, y se le va a informar antes de continuar con la reparación.

No nos responsabilizamos por daños preexistentes no declarados en este recibo (golpes, quiebres, humedad, pantalla trizada, etc.) ni por la pérdida de datos guardados en el equipo. Se recomienda hacer una copia de seguridad antes de dejarlo.

La garantía de la reparación cubre exclusivamente el trabajo y los repuestos provistos por este local, por 90 días desde la entrega, y no cubre golpes, humedad ni intervención de terceros posteriores a la entrega.`

export const DEFAULT_INTAKE_TERMS = `El cliente declara que el equipo se entrega en las condiciones descriptas en este recibo (ver "Problema reportado") y que no existen daños, golpes, quiebres ni humedad adicionales a los aquí mencionados.

El diagnóstico definitivo puede variar una vez abierto el equipo. En ese caso, se le va a informar el presupuesto final antes de avanzar con la reparación.

El local no se responsabiliza por datos guardados en el equipo (fotos, contactos, aplicaciones, etc.). Se recomienda hacer una copia de seguridad antes de dejarlo.

Con la firma de este recibo, el cliente confirma estar de acuerdo con lo aquí declarado y autoriza a realizar el diagnóstico del equipo.`
