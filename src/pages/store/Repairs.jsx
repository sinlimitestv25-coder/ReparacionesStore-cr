import { useState } from 'react'
import { Plus, Pencil, Trash2, Wrench } from 'lucide-react'
import { useCollection } from '../../hooks/useCollection'
import { useTenant } from '../../context/TenantContext'
import { Card } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { Select } from '../../components/ui/Select'
import { EmptyState } from '../../components/ui/EmptyState'
import { Table, Thead, Tbody, Th, Td } from '../../components/ui/Table'
import { formatCurrency, formatDate } from '../../lib/format'
import { REPAIR_STATUSES } from '../../constants'
import { RepairFormModal } from './RepairFormModal'

const STATUS_FILTER_OPTIONS = [{ value: '', label: 'Todos los estados' }, ...REPAIR_STATUSES]

export function Repairs() {
  const { store } = useTenant()
  const storeId = store.id
  const { items: repairs, create, update, remove } = useCollection('repairs', (i) => i.storeId === storeId)
  const { items: clients } = useCollection('clients', (i) => i.storeId === storeId)
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [statusFilter, setStatusFilter] = useState('')

  const clientName = (id) => clients.find((c) => c.id === id)?.name || 'Cliente eliminado'

  const filtered = statusFilter ? repairs.filter((r) => r.status === statusFilter) : repairs
  const sorted = [...filtered].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))

  const handleSubmit = (form) => {
    const now = new Date().toISOString()
    if (editing) {
      update(editing.id, { ...form, updatedAt: now })
    } else {
      create({ ...form, storeId, date: now, createdAt: now, updatedAt: now })
    }
    setModalOpen(false)
    setEditing(null)
  }

  const handleEdit = (repair) => {
    setEditing(repair)
    setModalOpen(true)
  }

  const handleDelete = (repair) => {
    if (window.confirm('¿Eliminar esta orden de reparación?')) remove(repair.id)
  }

  const handleQuickStatus = (repair, status) => {
    update(repair.id, { status, updatedAt: new Date().toISOString() })
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-slate-800">Reparaciones</h1>
          <p className="text-sm text-slate-500">Seguimiento de equipos ingresados al taller.</p>
        </div>
        <Button
          onClick={() => {
            setEditing(null)
            setModalOpen(true)
          }}
        >
          <Plus size={16} />
          Nuevo ingreso
        </Button>
      </div>

      <Card
        action={
          <div className="w-48">
            <Select options={STATUS_FILTER_OPTIONS} value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} />
          </div>
        }
      >
        {sorted.length === 0 ? (
          <EmptyState icon={Wrench} title="No hay reparaciones" description="Registrá el ingreso de un equipo para empezar." />
        ) : (
          <Table>
            <Thead>
              <tr>
                <Th>Equipo</Th>
                <Th>Cliente</Th>
                <Th>Problema</Th>
                <Th>Técnico</Th>
                <Th>Estado</Th>
                <Th className="text-right">Costo</Th>
                <Th className="text-right">Acciones</Th>
              </tr>
            </Thead>
            <Tbody>
              {sorted.map((repair) => (
                <tr key={repair.id}>
                  <Td>
                    <p className="font-medium text-slate-800">
                      {repair.deviceBrand} {repair.deviceModel}
                    </p>
                    <p className="text-xs text-slate-400">{formatDate(repair.date)}</p>
                  </Td>
                  <Td>{clientName(repair.clientId)}</Td>
                  <Td className="max-w-[220px] truncate">{repair.issueDescription}</Td>
                  <Td>{repair.technician || '-'}</Td>
                  <Td>
                    <select
                      value={repair.status}
                      onChange={(e) => handleQuickStatus(repair, e.target.value)}
                      className="rounded-md border border-slate-200 bg-white px-2 py-1 text-xs"
                    >
                      {REPAIR_STATUSES.map((s) => (
                        <option key={s.value} value={s.value}>
                          {s.label}
                        </option>
                      ))}
                    </select>
                  </Td>
                  <Td className="text-right">{formatCurrency(repair.finalCost ?? repair.estimatedCost)}</Td>
                  <Td className="text-right">
                    <div className="flex justify-end gap-1">
                      <button onClick={() => handleEdit(repair)} className="rounded-md p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600">
                        <Pencil size={15} />
                      </button>
                      <button onClick={() => handleDelete(repair)} className="rounded-md p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-600">
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </Td>
                </tr>
              ))}
            </Tbody>
          </Table>
        )}
      </Card>

      <RepairFormModal
        open={modalOpen}
        initialData={editing}
        clients={clients}
        onClose={() => {
          setModalOpen(false)
          setEditing(null)
        }}
        onSubmit={handleSubmit}
      />
    </div>
  )
}
