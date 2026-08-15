import { useRef, useState } from 'react'
import { Image as ImageIcon, Trash2 } from 'lucide-react'
import { Modal } from '../../components/ui/Modal'
import { Input } from '../../components/ui/Input'
import { Button } from '../../components/ui/Button'

const MAX_LOGO_BYTES = 1.5 * 1024 * 1024 // 1.5MB: el logo se guarda en localStorage, no hay servidor detrás.

export function SettingsModal({ open, onClose, logoDataUrl, onLogoChange, onChangePassword }) {
  const fileInputRef = useRef(null)
  const [logoError, setLogoError] = useState('')

  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [passwordMessage, setPasswordMessage] = useState('')

  const handleClose = () => {
    setLogoError('')
    setNewPassword('')
    setConfirmPassword('')
    setPasswordError('')
    setPasswordMessage('')
    onClose()
  }

  const handleFileChange = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (!file.type.startsWith('image/')) {
      setLogoError('El archivo tiene que ser una imagen.')
      return
    }
    if (file.size > MAX_LOGO_BYTES) {
      setLogoError('La imagen es muy pesada (máximo 1.5 MB). Probá con una más liviana.')
      return
    }
    setLogoError('')
    const reader = new FileReader()
    reader.onload = () => onLogoChange(reader.result)
    reader.readAsDataURL(file)
  }

  const handleRemoveLogo = () => {
    onLogoChange(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const handlePasswordSubmit = (e) => {
    e.preventDefault()
    if (newPassword.length < 4) {
      setPasswordError('La contraseña tiene que tener al menos 4 caracteres.')
      return
    }
    if (newPassword !== confirmPassword) {
      setPasswordError('Las contraseñas no coinciden.')
      return
    }
    onChangePassword(newPassword)
    setPasswordError('')
    setNewPassword('')
    setConfirmPassword('')
    setPasswordMessage('Contraseña actualizada.')
    setTimeout(() => setPasswordMessage(''), 2500)
  }

  return (
    <Modal open={open} onClose={handleClose} title="Configuración">
      <div className="space-y-6">
        <div>
          <p className="mb-2 text-sm font-semibold text-slate-800">Logo del sistema</p>
          <div className="flex items-center gap-3">
            <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-lg border border-slate-200 bg-slate-50">
              {logoDataUrl ? (
                <img src={logoDataUrl} alt="Logo" className="h-full w-full object-contain" />
              ) : (
                <ImageIcon size={20} className="text-slate-300" />
              )}
            </div>
            <div className="flex gap-2">
              <Button type="button" size="sm" variant="secondary" onClick={() => fileInputRef.current?.click()}>
                {logoDataUrl ? 'Cambiar' : 'Subir imagen'}
              </Button>
              {logoDataUrl && (
                <Button type="button" size="sm" variant="ghost" onClick={handleRemoveLogo}>
                  <Trash2 size={14} />
                  Quitar
                </Button>
              )}
            </div>
            <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
          </div>
          {logoError && <p className="mt-2 text-xs text-red-600">{logoError}</p>}
          <p className="mt-2 text-xs text-slate-400">Se guarda en este navegador (no hay servidor todavía).</p>
        </div>

        <form onSubmit={handlePasswordSubmit} className="space-y-3 border-t border-slate-100 pt-4">
          <p className="text-sm font-semibold text-slate-800">Cambiar mi contraseña</p>
          <Input label="Contraseña nueva" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
          <Input label="Confirmar contraseña" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          {passwordError && <p className="text-xs text-red-600">{passwordError}</p>}
          {passwordMessage && <p className="text-xs text-emerald-600">{passwordMessage}</p>}
          <Button type="submit" size="sm">
            Guardar contraseña
          </Button>
        </form>
      </div>
    </Modal>
  )
}
