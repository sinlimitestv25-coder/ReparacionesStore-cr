import { TrendingUp, Wallet, Wrench, AlertTriangle, ShoppingCart } from 'lucide-react'
import { useCollection } from '../../hooks/useCollection'
import { useTenant } from '../../context/TenantContext'
import { Card } from '../../components/ui/Card'
import { Badge } from '../../components/ui/Badge'
import { Table, Thead, Tbody, Th, Td } from '../../components/ui/Table'
import { StatCard } from '../../components/dashboard/StatCard'
import { formatCurrency, formatDate } from '../../lib/format'
import { REPAIR_STATUSES } from '../../constants'

function isSameMonth(isoString) {
  const d = new Date(isoString)
  const now = new Date()
  return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
}

export function Dashboard() {
  const { store } = useTenant()
  const storeId = store.id
  const { items: stock } = useCollection('stock', (i) => i.storeId === storeId)
  const { items: sales } = useCollection('sales', (i) => i.storeId === storeId)
  const { items: repairs } = useCollection('repairs', (i) => i.storeId === storeId)

  const stockCostValue = stock.reduce((sum, i) => sum + i.cost * i.quantity, 0)
  const stockSaleValue = stock.reduce((sum, i) => sum + i.price * i.quantity, 0)
  const lowStockItems = stock.filter((i) => i.quantity <= i.minStock)

  const monthSales = sales.filter((s) => isSameMonth(s.date))
  const monthRevenue = monthSales.reduce((sum, s) => sum + s.total, 0)
  const monthProfit = monthSales.reduce(
    (sum, s) => sum + s.items.reduce((itemSum, it) => itemSum + (it.unitPrice - it.unitCost) * it.qty, 0),
    0
  )

  const activeRepairs = repairs.filter((r) => r.status === 'diagnostico' || r.status === 'reparacion')

  const recentSales = [...sales].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5)

  const statusInfo = (value) => REPAIR_STATUSES.find((s) => s.value === value)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-lg font-semibold text-slate-800">Dashboard</h1>
        <p className="text-sm text-slate-500">Resumen general del local.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard icon={Wallet} label="Costo del stock" hint="Lo que invertiste en lo que tenés" value={formatCurrency(stockCostValue)} color="blue" />
        <StatCard
          icon={TrendingUp}
          label="Valor de venta del stock"
          hint="Si vendieras todo al precio de lista"
          value={formatCurrency(stockSaleValue)}
          color="emerald"
        />
        <StatCard icon={ShoppingCart} label="Ventas del mes" value={formatCurrency(monthRevenue)} hint={`${monthSales.length} ventas`} color="blue" />
        <StatCard icon={TrendingUp} label="Ganancia estimada del mes" value={formatCurrency(monthProfit)} color="emerald" />
        <StatCard icon={Wrench} label="Reparaciones en curso" value={activeRepairs.length} color="amber" />
        <StatCard icon={AlertTriangle} label="Productos con stock bajo" value={lowStockItems.length} color="red" />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card title="Últimas ventas">
          {recentSales.length === 0 ? (
            <p className="py-6 text-center text-sm text-slate-400">Todavía no hay ventas registradas.</p>
          ) : (
            <Table>
              <Thead>
                <tr>
                  <Th>Fecha</Th>
                  <Th>Detalle</Th>
                  <Th className="text-right">Total</Th>
                </tr>
              </Thead>
              <Tbody>
                {recentSales.map((sale) => (
                  <tr key={sale.id}>
                    <Td>{formatDate(sale.date)}</Td>
                    <Td>{sale.items.map((i) => `${i.qty}x ${i.name}`).join(', ')}</Td>
                    <Td className="text-right font-medium">{formatCurrency(sale.total)}</Td>
                  </tr>
                ))}
              </Tbody>
            </Table>
          )}
        </Card>

        <Card title="Stock con alerta de reposición">
          {lowStockItems.length === 0 ? (
            <p className="py-6 text-center text-sm text-slate-400">Todo el stock está en niveles normales.</p>
          ) : (
            <Table>
              <Thead>
                <tr>
                  <Th>Producto</Th>
                  <Th className="text-right">Cantidad</Th>
                  <Th className="text-right">Mínimo</Th>
                </tr>
              </Thead>
              <Tbody>
                {lowStockItems.map((item) => (
                  <tr key={item.id}>
                    <Td>{item.name}</Td>
                    <Td className="text-right">
                      <Badge color="red">{item.quantity}</Badge>
                    </Td>
                    <Td className="text-right text-slate-400">{item.minStock}</Td>
                  </tr>
                ))}
              </Tbody>
            </Table>
          )}
        </Card>
      </div>

      <Card title="Reparaciones activas">
        {activeRepairs.length === 0 ? (
          <p className="py-6 text-center text-sm text-slate-400">No hay reparaciones en curso.</p>
        ) : (
          <Table>
            <Thead>
              <tr>
                <Th>Equipo</Th>
                <Th>Problema</Th>
                <Th>Técnico</Th>
                <Th>Estado</Th>
              </tr>
            </Thead>
            <Tbody>
              {activeRepairs.map((r) => (
                <tr key={r.id}>
                  <Td>
                    {r.deviceBrand} {r.deviceModel}
                  </Td>
                  <Td>{r.issueDescription}</Td>
                  <Td>{r.technician}</Td>
                  <Td>
                    <Badge color={statusInfo(r.status)?.color}>{statusInfo(r.status)?.label}</Badge>
                  </Td>
                </tr>
              ))}
            </Tbody>
          </Table>
        )}
      </Card>
    </div>
  )
}
