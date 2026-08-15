import { useState } from 'react'
import { Modal } from '../../components/ui/Modal'
import { Input } from '../../components/ui/Input'
import { Button } from '../../components/ui/Button'
import { slugify, describeTenantUrl } from '../../lib/tenant'

const EMPTY_FORM = { name: '', slug: '', address: '', phone: '', ownerName: '', username: '', password: '', confirmPassword: '' }

export function StoreFormModal({ open, onClose, onSubmit, existingSlugs = [], existingUsernames = [] }) {
  const [form, setForm] = useState(EMPTY_FORM)
  const [slugEdited, setSlugEdited] = useState(false)
  const [usernameEdited, setUsernameEdited] = useState(false)
  const [error, setError] = useState('')

  const handleNameChange = (e) => {
    const name = e.target.value
    setForm((f) => ({ ...f, name, slug: slugEdited ? f.slug : slugify(name) }))
  }

  const handleSlugChange = (e) => {
    setSlugEdited(true)
    setForm((f) => ({ ...f, slug: slugify(e.target.value) }))
  }

  const handleOwnerNameChange = (e) => {
    const ownerName = e.target.value
    setForm((f) => ({ ...f, ownerName, username: usernameEdited ? f.username : slugify(ownerName) }))
  }

  const handleUsernameChange = (e) => {
    setUsernameEdited(true)
    setForm((f) => ({ ...f, username: slugify(e.target.value) }))
  }

  const handleChange = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    if (existingSlugs.includes(form.slug)) {
      setError(`Ya hay un local usando el subdominio "${form.slug}". Elegí otro.`)
      return
    }
    if (existingUsernames.includes(form.username.toLowerCase())) {
      setError(`Ya hay un usuario "${form.username}". Elegí otro nombre de usuario.`)
      return
    }
    if (form.password.length < 4) {
      setError('La contraseña tiene que tener al menos 4 caracteres.')
      return
    }
    if (form.password !== form.confirmPassword) {
      setError('Las contraseñas no coinciden.')
      return
    }
    setError('')
    const { confirmPassword, ...payload } = form
    onSubmit(payload)
    setForm(EMPTY_FORM)
    setSlugEdited(false)
    setUsernameEdited(false)
  }

  const handleClose = () => {
    setError('')
    onClose()
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title="Nuevo local"
      footer={
        <>
          <Button variant="secondary" onClick={handleClose} type="button">
            Cancelar
          </Button>
          <Button form="store-form" type="submit">
            Crear local
          </Button>
        </>
      }
    >
      <form id="store-form" onSubmit={handleSubmit} className="space-y-3">
        <Input label="Nombre del local" value={form.name} onChange={handleNameChange} required placeholder="Ej: Local Sur" />
        <div>
          <Input label="Subdominio" value={form.slug} onChange={handleSlugChange} required placeholder="Ej: sur" />
          {form.slug && <p className="mt-1 text-xs text-slate-400">Va a entrar por: {describeTenantUrl(form.slug)}</p>}
        </div>
        <Input label="Dirección" value={form.address} onChange={handleChange('address')} placeholder="Calle, número, ciudad" />
        <Input label="Teléfono" value={form.phone} onChange={handleChange('phone')} placeholder="011-0000-0000" />
        <Input label="Nombre del dueño" value={form.ownerName} onChange={handleOwnerNameChange} required />

        <div className="space-y-3 border-t border-slate-100 pt-3">
          <Input label="Usuario" value={form.username} onChange={handleUsernameChange} required placeholder="Ej: sur" />
          <div className="grid grid-cols-2 gap-3">
            <Input label="Contraseña" type="password" value={form.password} onChange={handleChange('password')} required />
            <Input label="Confirmar contraseña" type="password" value={form.confirmPassword} onChange={handleChange('confirmPassword')} required />
          </div>
        </div>
        {error && <p className="text-xs text-red-600">{error}</p>}
      </form>
    </Modal>
  )
}
