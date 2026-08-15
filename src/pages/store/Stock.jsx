import { useState } from 'react'
import { Plus, Pencil, Trash2, Boxes, Search } from 'lucide-react'
import { useCollection } from '../../hooks/useCollection'
import { useTenant } from '../../context/TenantContext'
import { Card } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { Badge } from '../../components/ui/Badge'
import { Input } from '../../components/ui/Input'
import { Select } from '../../components/ui/Select'
import { EmptyState } from '../../components/ui/EmptyState'
import { Table, Thead, Tbody, Th, Td } from '../../components/ui/Table'
import { formatCurrency } from '../../lib/format'
import { PRODUCT_TYPES } from '../../constants'
import { StockFormModal } from './StockFormModal'

const TYPE_FILTER_OPTIONS = [{ value: '', label: 'Todos los tipos' }, ...PRODUCT_TYPES]

export function Stock() {
  const { store } = useTenant()
  const storeId = store.id
  const { items: stock, create, update, remove } = useCollection('stock', (i) => i.storeId === storeId)
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState('')

  const filtered = stock.filter((item) => {
    const matchesSearch = `${item.name} ${item.brand} ${item.model} ${item.sku}`.toLowerCase().includes(search.toLowerCase())
    const matchesType = !typeFilter || item.type === typeFilter
    return matchesSearch && matchesType
  })

  const handleSubmit = (form) => {
    if (editing) {
      update(editing.id, form)
    } else {
      create({ ...form, storeId, createdAt: new Date().toISOString() })
    }
    setModalOpen(false)
    setEditing(null)
  }

  const handleEdit = (item) => {
    setEditing(item)
    setModalOpen(true)
  }

  const handleDelete = (item) => {
    if (window.confirm(`¿Eliminar "${item.name}" del stock?`)) remove(item.id)
  }

  const typeLabel = (value) => PRODUCT_TYPES.find((t) => t.value === value)?.label || value

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-slate-800">Stock</h1>
          <p className="text-sm text-slate-500">Celulares, repuestos y accesorios.</p>
        </div>
        <Button
          onClick={() => {
            setEditing(null)
            setModalOpen(true)
          }}
        >
          <Plus size={16} />
          Nuevo producto
        </Button>
      </div>

      <Card>
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <Input
              className="pl-8"
              placeholder="Buscar por nombre, marca, modelo o SKU..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="sm:w-48">
            <Select options={TYPE_FILTER_OPTIONS} value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} />
          </div>
        </div>

        {filtered.length === 0 ? (
          <EmptyState
            icon={Boxes}
            title="No hay productos que coincidan"
            description="Probá cambiar los filtros o agregá un producto nuevo."
          />
        ) : (
          <Table>
            <Thead>
              <tr>
                <Th>Producto</Th>
                <Th>Tipo</Th>
                <Th>SKU</Th>
                <Th className="text-right">Costo</Th>
                <Th className="text-right">Precio</Th>
                <Th className="text-right">Cantidad</Th>
                <Th className="text-right">Acciones</Th>
              </tr>
            </Thead>
            <Tbody>
              {filtered.map((item) => (
                <tr key={item.id}>
                  <Td>
                    <p className="font-medium text-slate-800">{item.name}</p>
                    <p className="text-xs text-slate-400">
                      {item.brand} {item.model}
                    </p>
                  </Td>
                  <Td>{typeLabel(item.type)}</Td>
                  <Td className="text-slate-400">{item.sku || '-'}</Td>
                  <Td className="text-right">{formatCurrency(item.cost)}</Td>
                  <Td className="text-right">{formatCurrency(item.price)}</Td>
                  <Td className="text-right">
                    {item.quantity <= item.minStock ? (
                      <Badge color="red">{item.quantity}</Badge>
                    ) : (
                      <span>{item.quantity}</span>
                    )}
                  </Td>
                  <Td className="text-right">
                    <div className="flex justify-end gap-1">
                      <button onClick={() => handleEdit(item)} className="rounded-md p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600">
                        <Pencil size={15} />
                      </button>
                      <button onClick={() => handleDelete(item)} className="rounded-md p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-600">
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

      <StockFormModal
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
