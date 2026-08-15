import { useEffect, useState } from 'react'
import { Modal } from '../../components/ui/Modal'
import { Input } from '../../components/ui/Input'
import { Select } from '../../components/ui/Select'
import { Button } from '../../components/ui/Button'
import { PRODUCT_TYPES } from '../../constants'

const EMPTY_FORM = { type: 'celular', name: '', brand: '', model: '', sku: '', cost: '', price: '', quantity: '', minStock: '' }

export function StockFormModal({ open, onClose, onSubmit, initialData }) {
  const [form, setForm] = useState(EMPTY_FORM)

  useEffect(() => {
    if (open) setForm(initialData ? { ...EMPTY_FORM, ...initialData } : EMPTY_FORM)
  }, [open, initialData])

  const handleChange = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit({
      ...form,
      cost: Number(form.cost) || 0,
      price: Number(form.price) || 0,
      quantity: Number(form.quantity) || 0,
      minStock: Number(form.minStock) || 0,
    })
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={initialData ? 'Editar producto' : 'Nuevo producto'}
      footer={
        <>
          <Button variant="secondary" type="button" onClick={onClose}>
            Cancelar
          </Button>
          <Button form="stock-form" type="submit">
            {initialData ? 'Guardar cambios' : 'Agregar producto'}
          </Button>
        </>
      }
    >
      <form id="stock-form" onSubmit={handleSubmit} className="space-y-3">
        <Select label="Tipo" options={PRODUCT_TYPES} value={form.type} onChange={handleChange('type')} />
        <Input label="Nombre" value={form.name} onChange={handleChange('name')} required placeholder="Ej: Samsung Galaxy A54" />
        <div className="grid grid-cols-2 gap-3">
          <Input label="Marca" value={form.brand} onChange={handleChange('brand')} />
          <Input label="Modelo" value={form.model} onChange={handleChange('model')} />
        </div>
        <Input label="SKU / Código" value={form.sku} onChange={handleChange('sku')} />
        <div className="grid grid-cols-2 gap-3">
          <Input label="Costo" type="number" min="0" step="0.01" value={form.cost} onChange={handleChange('cost')} required />
          <Input label="Precio de venta" type="number" min="0" step="0.01" value={form.price} onChange={handleChange('price')} required />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Input label="Cantidad" type="number" min="0" value={form.quantity} onChange={handleChange('quantity')} required />
          <Input label="Stock mínimo" type="number" min="0" value={form.minStock} onChange={handleChange('minStock')} />
        </div>
      </form>
    </Modal>
  )
}
