import { useEffect, useState } from 'react'
import { Modal } from '../../components/ui/Modal'
import { Input, Textarea } from '../../components/ui/Input'
import { Button } from '../../components/ui/Button'

const EMPTY_FORM = { name: '', contactName: '', phone: '', email: '', products: '' }

export function ProviderFormModal({ open, onClose, onSubmit, initialData }) {
  const [form, setForm] = useState(EMPTY_FORM)

  useEffect(() => {
    if (open) setForm(initialData ? { ...EMPTY_FORM, ...initialData } : EMPTY_FORM)
  }, [open, initialData])

  const handleChange = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(form)
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={initialData ? 'Editar proveedor' : 'Nuevo proveedor'}
      footer={
        <>
          <Button variant="secondary" type="button" onClick={onClose}>
            Cancelar
          </Button>
          <Button form="provider-form" type="submit">
            {initialData ? 'Guardar cambios' : 'Agregar proveedor'}
          </Button>
        </>
      }
    >
      <form id="provider-form" onSubmit={handleSubmit} className="space-y-3">
        <Input label="Nombre del proveedor" value={form.name} onChange={handleChange('name')} required />
        <Input label="Persona de contacto" value={form.contactName} onChange={handleChange('contactName')} />
        <div className="grid grid-cols-2 gap-3">
          <Input label="Teléfono" value={form.phone} onChange={handleChange('phone')} />
          <Input label="Email" type="email" value={form.email} onChange={handleChange('email')} />
        </div>
        <Textarea label="Productos que provee" value={form.products} onChange={handleChange('products')} rows={2} placeholder="Ej: Celulares, repuestos, accesorios" />
      </form>
    </Modal>
  )
}
