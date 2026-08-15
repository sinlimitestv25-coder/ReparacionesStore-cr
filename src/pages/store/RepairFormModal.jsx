import { useEffect, useState } from 'react'
import { Modal } from '../../components/ui/Modal'
import { Input, Textarea } from '../../components/ui/Input'
import { Select } from '../../components/ui/Select'
import { Button } from '../../components/ui/Button'
import { REPAIR_STATUSES } from '../../constants'

const EMPTY_FORM = {
  clientId: '',
  deviceBrand: '',
  deviceModel: '',
  issueDescription: '',
  technician: '',
  estimatedCost: '',
  finalCost: '',
  status: 'diagnostico',
  notes: '',
}

export function RepairFormModal({ open, onClose, onSubmit, initialData, clients }) {
  const [form, setForm] = useState(EMPTY_FORM)

  useEffect(() => {
    if (open) setForm(initialData ? { ...EMPTY_FORM, ...initialData } : EMPTY_FORM)
  }, [open, initialData])

  const clientOptions = [{ value: '', label: 'Seleccioná un cliente...' }, ...clients.map((c) => ({ value: c.id, label: c.name }))]

  const handleChange = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit({
      ...form,
      estimatedCost: Number(form.estimatedCost) || 0,
      finalCost: form.finalCost === '' ? null : Number(form.finalCost),
    })
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={initialData ? 'Editar reparación' : 'Nuevo ingreso de equipo'}
      size="lg"
      footer={
        <>
          <Button variant="secondary" type="button" onClick={onClose}>
            Cancelar
          </Button>
          <Button form="repair-form" type="submit">
            {initialData ? 'Guardar cambios' : 'Registrar ingreso'}
          </Button>
        </>
      }
    >
      <form id="repair-form" onSubmit={handleSubmit} className="space-y-3">
        <Select label="Cliente" options={clientOptions} value={form.clientId} onChange={handleChange('clientId')} required />
        <div className="grid grid-cols-2 gap-3">
          <Input label="Marca del equipo" value={form.deviceBrand} onChange={handleChange('deviceBrand')} required />
          <Input label="Modelo" value={form.deviceModel} onChange={handleChange('deviceModel')} required />
        </div>
        <Textarea label="Descripción del problema" value={form.issueDescription} onChange={handleChange('issueDescription')} rows={2} required />
        <div className="grid grid-cols-2 gap-3">
          <Input label="Técnico asignado" value={form.technician} onChange={handleChange('technician')} />
          <Select label="Estado" options={REPAIR_STATUSES} value={form.status} onChange={handleChange('status')} />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Input label="Costo estimado" type="number" min="0" step="0.01" value={form.estimatedCost} onChange={handleChange('estimatedCost')} />
          <Input label="Costo final (si ya cerró)" type="number" min="0" step="0.01" value={form.finalCost ?? ''} onChange={handleChange('finalCost')} />
        </div>
        <Textarea label="Notas" value={form.notes} onChange={handleChange('notes')} rows={2} />
      </form>
    </Modal>
  )
}
