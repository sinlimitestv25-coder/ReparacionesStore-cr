// Datos de demostración: todo vive en localStorage, no hay backend todavía.
// Cuando se conecte Supabase, este archivo deja de usarse.
//
// OJO: las contraseñas de acá (y las que se creen desde la app) se guardan
// en texto plano en el localStorage del navegador. Sirve para esta etapa de
// demostración, pero no es seguridad real.

const daysAgo = (n) => {
  const d = new Date()
  d.setDate(d.getDate() - n)
  return d.toISOString()
}

export function buildSeedDB() {
  return {
    settings: {
      logoDataUrl: null,
    },

    users: [
      { id: 'u-admin', username: 'admin', password: 'admin123', name: 'Administrador General', role: 'super_admin', storeId: null },
      { id: 'u-owner-centro', username: 'juan', password: 'centro123', name: 'Juan Pérez', role: 'owner', storeId: 'store-centro' },
      { id: 'u-owner-norte', username: 'maria', password: 'norte123', name: 'María Gómez', role: 'owner', storeId: 'store-norte' },
    ],

    stores: [
      {
        id: 'store-centro',
        slug: 'centro',
        name: 'Local Centro',
        address: 'Av. Siempre Viva 123, CABA',
        phone: '011-1234-5678',
        ownerName: 'Juan Pérez',
        active: true,
        createdAt: daysAgo(120),
      },
      {
        id: 'store-norte',
        slug: 'norte',
        name: 'Local Norte',
        address: 'Ruta 8 km 45, Pilar',
        phone: '011-9876-5432',
        ownerName: 'María Gómez',
        active: true,
        createdAt: daysAgo(60),
      },
    ],

    stock: [
      { id: 's1', storeId: 'store-centro', type: 'celular', name: 'Samsung Galaxy A54', brand: 'Samsung', model: 'A54', sku: 'CEL-A54', cost: 280000, price: 380000, quantity: 5, minStock: 2, createdAt: daysAgo(40) },
      { id: 's2', storeId: 'store-centro', type: 'celular', name: 'iPhone 12 128GB', brand: 'Apple', model: 'iPhone 12', sku: 'CEL-IP12', cost: 450000, price: 590000, quantity: 1, minStock: 2, createdAt: daysAgo(35) },
      { id: 's3', storeId: 'store-centro', type: 'repuesto', name: 'Pantalla iPhone 11', brand: 'Apple', model: 'iPhone 11', sku: 'REP-PANT-IP11', cost: 45000, price: 80000, quantity: 8, minStock: 3, createdAt: daysAgo(30) },
      { id: 's4', storeId: 'store-centro', type: 'repuesto', name: 'Batería Samsung A10', brand: 'Samsung', model: 'A10', sku: 'REP-BAT-A10', cost: 12000, price: 25000, quantity: 2, minStock: 3, createdAt: daysAgo(28) },
      { id: 's5', storeId: 'store-centro', type: 'accesorio', name: 'Funda silicona universal', brand: 'Genérico', model: '-', sku: 'ACC-FUNDA-U', cost: 2000, price: 6000, quantity: 30, minStock: 10, createdAt: daysAgo(20) },
      { id: 's6', storeId: 'store-centro', type: 'accesorio', name: 'Cargador tipo C 20W', brand: 'Genérico', model: '-', sku: 'ACC-CARG-C20', cost: 4500, price: 12000, quantity: 15, minStock: 5, createdAt: daysAgo(15) },

      { id: 's7', storeId: 'store-norte', type: 'celular', name: 'Motorola Edge 40', brand: 'Motorola', model: 'Edge 40', sku: 'CEL-EDGE40', cost: 260000, price: 349000, quantity: 4, minStock: 2, createdAt: daysAgo(25) },
      { id: 's8', storeId: 'store-norte', type: 'repuesto', name: 'Módulo Motorola G22', brand: 'Motorola', model: 'G22', sku: 'REP-MOD-G22', cost: 30000, price: 60000, quantity: 1, minStock: 2, createdAt: daysAgo(18) },
      { id: 's9', storeId: 'store-norte', type: 'accesorio', name: 'Vidrio templado universal', brand: 'Genérico', model: '-', sku: 'ACC-VID-U', cost: 800, price: 3000, quantity: 40, minStock: 15, createdAt: daysAgo(10) },
    ],

    clients: [
      { id: 'c1', storeId: 'store-centro', name: 'Carla Fernández', phone: '011-5555-0001', email: 'carla.f@mail.com', notes: '', createdAt: daysAgo(50) },
      { id: 'c2', storeId: 'store-centro', name: 'Diego Sosa', phone: '011-5555-0002', email: 'diego.sosa@mail.com', notes: 'Cliente frecuente', createdAt: daysAgo(45) },
      { id: 'c3', storeId: 'store-norte', name: 'Lucía Romero', phone: '02322-555-003', email: 'lucia.romero@mail.com', notes: '', createdAt: daysAgo(22) },
    ],

    providers: [
      { id: 'p1', storeId: 'store-centro', name: 'DistriCel Mayorista', contactName: 'Roberto Díaz', phone: '011-4444-1111', email: 'ventas@dristricel.com', products: 'Celulares, repuestos', createdAt: daysAgo(100) },
      { id: 'p2', storeId: 'store-centro', name: 'Accesorios YA', contactName: 'Norma Villalba', phone: '011-4444-2222', email: 'contacto@accesoriosya.com', products: 'Accesorios, fundas, cargadores', createdAt: daysAgo(80) },
      { id: 'p3', storeId: 'store-norte', name: 'Repuestos del Norte SA', contactName: 'Hugo Cabrera', phone: '02322-444-333', email: 'hugo@repuestosnorte.com', products: 'Repuestos, módulos', createdAt: daysAgo(40) },
    ],

    sales: [
      { id: 'v1', storeId: 'store-centro', date: daysAgo(6), clientId: 'c1', items: [{ productId: 's5', name: 'Funda silicona universal', qty: 2, unitPrice: 6000, unitCost: 2000 }], total: 12000, paymentMethod: 'efectivo' },
      { id: 'v2', storeId: 'store-centro', date: daysAgo(4), clientId: 'c2', items: [{ productId: 's1', name: 'Samsung Galaxy A54', qty: 1, unitPrice: 380000, unitCost: 280000 }], total: 380000, paymentMethod: 'tarjeta' },
      { id: 'v3', storeId: 'store-centro', date: daysAgo(1), clientId: null, items: [{ productId: 's6', name: 'Cargador tipo C 20W', qty: 1, unitPrice: 12000, unitCost: 4500 }], total: 12000, paymentMethod: 'efectivo' },
      { id: 'v4', storeId: 'store-norte', date: daysAgo(3), clientId: 'c3', items: [{ productId: 's9', name: 'Vidrio templado universal', qty: 3, unitPrice: 3000, unitCost: 800 }], total: 9000, paymentMethod: 'transferencia' },
    ],

    repairs: [
      { id: 'r1', storeId: 'store-centro', date: daysAgo(5), clientId: 'c1', deviceBrand: 'Apple', deviceModel: 'iPhone 11', issueDescription: 'Pantalla rota', status: 'reparacion', technician: 'Martín Ríos', estimatedCost: 80000, finalCost: null, notes: '', createdAt: daysAgo(5), updatedAt: daysAgo(2) },
      { id: 'r2', storeId: 'store-centro', date: daysAgo(2), clientId: 'c2', deviceBrand: 'Samsung', deviceModel: 'A10', issueDescription: 'No carga, posible batería', status: 'diagnostico', technician: 'Martín Ríos', estimatedCost: 25000, finalCost: null, notes: '', createdAt: daysAgo(2), updatedAt: daysAgo(2) },
      { id: 'r3', storeId: 'store-centro', date: daysAgo(10), clientId: 'c1', deviceBrand: 'Motorola', deviceModel: 'G8', issueDescription: 'Cambio de módulo', status: 'entregado', technician: 'Martín Ríos', estimatedCost: 55000, finalCost: 55000, notes: 'Entregado conforme', createdAt: daysAgo(10), updatedAt: daysAgo(7) },
      { id: 'r4', storeId: 'store-norte', date: daysAgo(1), clientId: 'c3', deviceBrand: 'Motorola', deviceModel: 'Edge 40', issueDescription: 'Botón de volumen no responde', status: 'listo', technician: 'Sofía Acosta', estimatedCost: 18000, finalCost: 18000, notes: '', createdAt: daysAgo(1), updatedAt: daysAgo(0) },
    ],
  }
}
