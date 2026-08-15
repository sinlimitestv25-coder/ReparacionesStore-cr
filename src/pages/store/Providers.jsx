import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Plus, Pencil, Trash2, Truck, Search } from 'lucide-react'
import { useCollection } from '../../hooks/useCollection'
import { Card } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { EmptyState } from '../../components/ui/EmptyState'
import { Table, Thead, Tbody, Th, Td } from '../../components/ui/Table'
import { ProviderFormModal } from './ProviderFormModal'

export function Providers() {
  const { storeId } = useParams()
  const { items: providers, create, update, remove } = useCollection('providers', (i) => i.storeId === storeId)
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [search, setSearch] = useState('')

  const filtered = providers.filter((p) => `${p.name} ${p.contactName}`.toLowerCase().includes(search.toLowerCase()))

  const handleSubmit = (form) => {
    if (editing) {
      update(editing.id, form)
    } else {
      create({ ...form, storeId, createdAt: new Date().toISOString() })
    }
    setModalOpen(false)
    setEditing(null)
  }

  const handleEdit = (provider) => {
    setEditing(provider)
    setModalOpen(true)
  }

  const handleDelete = (provider) => {
    if (window.confirm(`¿Eliminar a "${provider.name}" de los proveedores?`)) remove(provider.id)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-slate-800">Proveedores</h1>
          <p className="text-sm text-slate-500">Contactos de los proveedores del local.</p>
        </div>
        <Button
          onClick={() => {
            setEditing(null)
            setModalOpen(true)
          }}
        >
          <Plus size={16} />
          Nuevo proveedor
        </Button>
      </div>

      <Card>
        <div className="relative mb-4 max-w-sm">
          <Search size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <Input className="pl-8" placeholder="Buscar proveedor..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>

        {filtered.length === 0 ? (
          <EmptyState icon={Truck} title="No hay proveedores cargados" description="Agregá tu primer proveedor para empezar." />
        ) : (
          <Table>
            <Thead>
              <tr>
                <Th>Proveedor</Th>
                <Th>Contacto</Th>
                <Th>Productos</Th>
                <Th className="text-right">Acciones</Th>
              </tr>
            </Thead>
            <Tbody>
              {filtered.map((provider) => (
                <tr key={provider.id}>
                  <Td className="font-medium text-slate-800">{provider.name}</Td>
                  <Td>
                    <p>{provider.contactName || '-'}</p>
                    <p className="text-xs text-slate-400">{provider.phone || provider.email || '-'}</p>
                  </Td>
                  <Td className="max-w-[220px] truncate">{provider.products || '-'}</Td>
                  <Td className="text-right">
                    <div className="flex justify-end gap-1">
                      <button onClick={() => handleEdit(provider)} className="rounded-md p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600">
                        <Pencil size={15} />
                      </button>
                      <button onClick={() => handleDelete(provider)} className="rounded-md p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-600">
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

      <ProviderFormModal
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
