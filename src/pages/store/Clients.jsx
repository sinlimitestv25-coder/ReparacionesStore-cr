import { useState } from 'react'
import { Plus, Pencil, Trash2, Users, Search } from 'lucide-react'
import { useCollection } from '../../hooks/useCollection'
import { useTenant } from '../../context/TenantContext'
import { Card } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { EmptyState } from '../../components/ui/EmptyState'
import { Table, Thead, Tbody, Th, Td } from '../../components/ui/Table'
import { ClientFormModal } from './ClientFormModal'

export function Clients() {
  const { store } = useTenant()
  const storeId = store.id
  const { items: clients, create, update, remove } = useCollection('clients', (i) => i.storeId === storeId)
  const { items: sales } = useCollection('sales', (i) => i.storeId === storeId)
  const { items: repairs } = useCollection('repairs', (i) => i.storeId === storeId)
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [search, setSearch] = useState('')

  const filtered = clients.filter((c) => `${c.name} ${c.email}`.toLowerCase().includes(search.toLowerCase()))

  const purchaseCount = (id) => sales.filter((s) => s.clientId === id).length
  const repairCount = (id) => repairs.filter((r) => r.clientId === id).length

  const handleSubmit = (form) => {
    if (editing) {
      update(editing.id, form)
    } else {
      create({ ...form, storeId, createdAt: new Date().toISOString() })
    }
    setModalOpen(false)
    setEditing(null)
  }

  const handleEdit = (client) => {
    setEditing(client)
    setModalOpen(true)
  }

  const handleDelete = (client) => {
    if (window.confirm(`¿Eliminar a "${client.name}" de los clientes?`)) remove(client.id)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-slate-800">Clientes</h1>
          <p className="text-sm text-slate-500">Base de clientes del local.</p>
        </div>
        <Button
          onClick={() => {
            setEditing(null)
            setModalOpen(true)
          }}
        >
          <Plus size={16} />
          Nuevo cliente
        </Button>
      </div>

      <Card>
        <div className="relative mb-4 max-w-sm">
          <Search size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <Input className="pl-8" placeholder="Buscar cliente..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>

        {filtered.length === 0 ? (
          <EmptyState icon={Users} title="No hay clientes cargados" description="Agregá tu primer cliente para empezar." />
        ) : (
          <Table>
            <Thead>
              <tr>
                <Th>Nombre</Th>
                <Th>Contacto</Th>
                <Th className="text-right">Compras</Th>
                <Th className="text-right">Reparaciones</Th>
                <Th className="text-right">Acciones</Th>
              </tr>
            </Thead>
            <Tbody>
              {filtered.map((client) => (
                <tr key={client.id}>
                  <Td className="font-medium text-slate-800">{client.name}</Td>
                  <Td>
                    <p>{client.phone || '-'}</p>
                    <p className="text-xs text-slate-400">{client.email || '-'}</p>
                  </Td>
                  <Td className="text-right">{purchaseCount(client.id)}</Td>
                  <Td className="text-right">{repairCount(client.id)}</Td>
                  <Td className="text-right">
                    <div className="flex justify-end gap-1">
                      <button onClick={() => handleEdit(client)} className="rounded-md p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600">
                        <Pencil size={15} />
                      </button>
                      <button onClick={() => handleDelete(client)} className="rounded-md p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-600">
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

      <ClientFormModal
        open={modalOpen}
        initialData={editing}
        onClose={() => {
          setModalOpen(false)
          setEditing(null)
        }}
        onSubmit={handleSubmit}
      />
    </div>
  )
}
