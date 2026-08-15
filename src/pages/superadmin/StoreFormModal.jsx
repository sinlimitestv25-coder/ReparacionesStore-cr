import { useState } from 'react'
import { Modal } from '../../components/ui/Modal'
import { Input } from '../../components/ui/Input'
import { Button } from '../../components/ui/Button'

const EMPTY_FORM = { name: '', address: '', phone: '', ownerName: '', ownerEmail: '' }

export function StoreFormModal({ open, onClose, onSubmit }) {
  const [form, setForm] = useState(EMPTY_FORM)

  const handleChange = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(form)
    setForm(EMPTY_FORM)
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Nuevo local"
      footer={
        <>
          <Button variant="secondary" onClick={onClose} type="button">
            Cancelar
          </Button>
          <Button form="store-form" type="submit">
            Crear local
          </Button>
        </>
      }
    >
      <form id="store-form" onSubmit={handleSubmit} className="space-y-3">
        <Input label="Nombre del local" value={form.name} onChange={handleChange('name')} required placeholder="Ej: Local Sur" />
        <Input label="Dirección" value={form.address} onChange={handleChange('address')} placeholder="Calle, número, ciudad" />
        <Input label="Teléfono" value={form.phone} onChange={handleChange('phone')} placeholder="011-0000-0000" />
        <Input label="Nombre del dueño" value={form.ownerName} onChange={handleChange('ownerName')} required />
        <Input label="Email del dueño" type="email" value={form.ownerEmail} onChange={handleChange('ownerEmail')} required />
      </form>
    </Modal>
  )
}
