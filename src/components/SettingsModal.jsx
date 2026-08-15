import { useRef, useState } from 'react'
import { Image as ImageIcon, Trash2 } from 'lucide-react'
import { Modal } from './ui/Modal'
import { Input } from './ui/Input'
import { Button } from './ui/Button'

const MAX_IMAGE_BYTES = 2 * 1024 * 1024 // 2MB: las imágenes se guardan en localStorage, no hay servidor detrás.

function ImageUploadRow({ label, hint, shape, dataUrl, onChange }) {
  const fileInputRef = useRef(null)
  const [error, setError] = useState('')

  const handleFileChange = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (!file.type.startsWith('image/')) {
      setError('El archivo tiene que ser una imagen.')
      return
    }
    if (file.size > MAX_IMAGE_BYTES) {
      setError('La imagen es muy pesada (máximo 2 MB). Probá con una más liviana.')
      return
    }
    setError('')
    const reader = new FileReader()
    reader.onload = () => onChange(reader.result)
    reader.readAsDataURL(file)
  }

  const handleRemove = () => {
    onChange(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const previewClass = shape === 'wide' ? 'h-14 w-24' : 'h-14 w-14'

  return (
    <div>
      <p className="mb-2 text-sm font-semibold text-slate-800">{label}</p>
      <div className="flex items-center gap-3">
        <div className={`flex ${previewClass} items-center justify-center overflow-hidden rounded-lg border border-slate-200 bg-slate-50`}>
          {dataUrl ? (
            <img src={dataUrl} alt={label} className="h-full w-full object-cover" />
          ) : (
            <ImageIcon size={20} className="text-slate-300" />
          )}
        </div>
        <div className="flex gap-2">
          <Button type="button" size="sm" variant="secondary" onClick={() => fileInputRef.current?.click()}>
            {dataUrl ? 'Cambiar' : 'Subir imagen'}
          </Button>
          {dataUrl && (
            <Button type="button" size="sm" variant="ghost" onClick={handleRemove}>
              <Trash2 size={14} />
              Quitar
            </Button>
          )}
        </div>
        <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
      </div>
      {error && <p className="mt-2 text-xs text-red-600">{error}</p>}
      {hint && <p className="mt-2 text-xs text-slate-400">{hint}</p>}
    </div>
  )
}

export function SettingsModal({ open, onClose, logoDataUrl, bannerDataUrl, onLogoChange, onBannerChange, onChangePassword }) {
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [passwordMessage, setPasswordMessage] = useState('')

  const handleClose = () => {
    setNewPassword('')
    setConfirmPassword('')
    setPasswordError('')
    setPasswordMessage('')
    onClose()
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
        <ImageUploadRow
          label="Logo"
          hint="Se muestra chico, junto al nombre. Se guarda en este navegador (no hay servidor todavía)."
          shape="square"
          dataUrl={logoDataUrl}
          onChange={onLogoChange}
        />

        <ImageUploadRow
          label="Banner"
          hint="Imagen ancha de fondo para el encabezado. Se guarda en este navegador (no hay servidor todavía)."
          shape="wide"
          dataUrl={bannerDataUrl}
          onChange={onBannerChange}
        />

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
