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
