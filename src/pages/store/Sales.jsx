import { useState } from 'react'
import { Plus, ShoppingCart } from 'lucide-react'
import { useCollection } from '../../hooks/useCollection'
import { useTenant } from '../../context/TenantContext'
import { updateItem } from '../../lib/db'
import { Card } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { Badge } from '../../components/ui/Badge'
import { EmptyState } from '../../components/ui/EmptyState'
import { Table, Thead, Tbody, Th, Td } from '../../components/ui/Table'
import { formatCurrency, formatDate } from '../../lib/format'
import { PAYMENT_METHODS } from '../../constants'
import { SaleFormModal } from './SaleFormModal'

export function Sales() {
  const { store } = useTenant()
  const storeId = store.id
  const { items: sales, create, reload: reloadSales } = useCollection('sales', (i) => i.storeId === storeId)
  const { items: stock, reload: reloadStock } = useCollection('stock', (i) => i.storeId === storeId)
  const { items: clients } = useCollection('clients', (i) => i.storeId === storeId)
  const [modalOpen, setModalOpen] = useState(false)

  const clientName = (id) => clients.find((c) => c.id === id)?.name || 'Cliente ocasional'
  const paymentLabel = (value) => PAYMENT_METHODS.find((p) => p.value === value)?.label || value

  const handleSubmit = (sale) => {
    create({ ...sale, storeId, date: new Date().toISOString() })
    sale.items.forEach((item) => {
      const product = stock.find((p) => p.id === item.productId)
      if (product) updateItem('stock', product.id, { quantity: Math.max(0, product.quantity - item.qty) })
    })
    reloadStock()
    reloadSales()
    setModalOpen(false)
  }

  const sortedSales = [...sales].sort((a, b) => new Date(b.date) - new Date(a.date))

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-slate-800">Ventas</h1>
          <p className="text-sm text-slate-500">Registrá ventas y consultá el historial.</p>
        </div>
        <Button onClick={() => setModalOpen(true)}>
          <Plus size={16} />
          Nueva venta
        </Button>
      </div>

      <Card title="Historial de ventas">
        {sortedSales.length === 0 ? (
          <EmptyState
            icon={ShoppingCart}
            title="Todavía no hay ventas"
            description="Registrá tu primera venta para verla acá."
            action={
              <Button size="sm" onClick={() => setModalOpen(true)}>
                <Plus size={16} />
                Nueva venta
              </Button>
            }
          />
        ) : (
          <Table>
            <Thead>
              <tr>
                <Th>Fecha</Th>
                <Th>Cliente</Th>
                <Th>Productos</Th>
                <Th>Pago</Th>
                <Th className="text-right">Total</Th>
              </tr>
            </Thead>
            <Tbody>
              {sortedSales.map((sale) => (
                <tr key={sale.id}>
                  <Td>{formatDate(sale.date)}</Td>
                  <Td>{clientName(sale.clientId)}</Td>
                  <Td className="max-w-xs">{sale.items.map((i) => `${i.qty}x ${i.name}`).join(', ')}</Td>
                  <Td>
                    <Badge>{paymentLabel(sale.paymentMethod)}</Badge>
                  </Td>
                  <Td className="text-right font-medium">{formatCurrency(sale.total)}</Td>
                </tr>
              ))}
            </Tbody>
          </Table>
        )}
      </Card>

      <SaleFormModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
        products={stock}
        clients={clients}
      />
    </div>
  )
}
