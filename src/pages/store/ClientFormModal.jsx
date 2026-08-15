import { useEffect, useState } from 'react'
import { Modal } from '../../components/ui/Modal'
import { Input, Textarea } from '../../components/ui/Input'
import { Button } from '../../components/ui/Button'

const EMPTY_FORM = { name: '', phone: '', email: '', notes: '' }

export function ClientFormModal({ open, onClose, onSubmit, initialData }) {
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
      title={initialData ? 'Editar cliente' : 'Nuevo cliente'}
      footer={
        <>
          <Button variant="secondary" type="button" onClick={onClose}>
            Cancelar
          </Button>
          <Button form="client-form" type="submit">
            {initialData ? 'Guardar cambios' : 'Agregar cliente'}
          </Button>
        </>
      }
    >
      <form id="client-form" onSubmit={handleSubmit} className="space-y-3">
        <Input label="Nombre completo" value={form.name} onChange={handleChange('name')} required />
        <Input label="Teléfono" value={form.phone} onChange={handleChange('phone')} />
        <Input label="Email" type="email" value={form.email} onChange={handleChange('email')} />
        <Textarea label="Notas" value={form.notes} onChange={handleChange('notes')} rows={2} />
      </form>
    </Modal>
  )
}
