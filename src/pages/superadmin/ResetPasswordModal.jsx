import { useState } from 'react'
import { Modal } from '../../components/ui/Modal'
import { Input } from '../../components/ui/Input'
import { Button } from '../../components/ui/Button'

export function ResetPasswordModal({ open, onClose, onSubmit, targetLabel }) {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')

  const handleClose = () => {
    setPassword('')
    setConfirmPassword('')
    setError('')
    onClose()
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (password.length < 4) {
      setError('La contraseña tiene que tener al menos 4 caracteres.')
      return
    }
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden.')
      return
    }
    onSubmit(password)
    handleClose()
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title="Restablecer contraseña"
      footer={
        <>
          <Button variant="secondary" type="button" onClick={handleClose}>
            Cancelar
          </Button>
          <Button form="reset-password-form" type="submit">
            Guardar nueva contraseña
          </Button>
        </>
      }
    >
      <form id="reset-password-form" onSubmit={handleSubmit} className="space-y-3">
        {targetLabel && <p className="text-sm text-slate-500">Usuario: {targetLabel}</p>}
        <Input label="Contraseña nueva" type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoFocus required />
        <Input label="Confirmar contraseña" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
        {error && <p className="text-xs text-red-600">{error}</p>}
      </form>
    </Modal>
  )
}
