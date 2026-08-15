import { useEffect, useRef, useState } from 'react'
import { Image as ImageIcon, Trash2, Loader2 } from 'lucide-react'
import { Modal } from './ui/Modal'
import { Input, Textarea } from './ui/Input'
import { Button } from './ui/Button'
import { compressImage } from '../lib/image'
import { DEFAULT_REPAIR_TERMS } from '../constants'

const MAX_UPLOAD_BYTES = 4 * 1024 * 1024 // archivo que aceptamos del selector, antes de comprimir

function ImageUploadRow({ label, hint, shape, maxDimension, dataUrl, onChange }) {
  const fileInputRef = useRef(null)
  const [error, setError] = useState('')
  const [processing, setProcessing] = useState(false)

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (!file.type.startsWith('image/')) {
      setError('El archivo tiene que ser una imagen.')
      return
    }
    if (file.size > MAX_UPLOAD_BYTES) {
      setError('La imagen es muy pesada (máximo 4 MB). Probá con una más liviana.')
      return
    }
    setError('')
    setProcessing(true)
    try {
      const compressed = await compressImage(file, { maxDimension })
      onChange(compressed)
    } catch {
      setError('No se pudo procesar la imagen. Probá con otro archivo.')
    } finally {
      setProcessing(false)
    }
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
          <Button type="button" size="sm" variant="secondary" onClick={() => fileInputRef.current?.click()} disabled={processing}>
            {processing && <Loader2 size={14} className="animate-spin" />}
            {processing ? 'Optimizando...' : dataUrl ? 'Cambiar' : 'Subir imagen'}
          </Button>
          {dataUrl && !processing && (
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

export function SettingsModal({
  open,
  onClose,
  logoDataUrl,
  bannerDataUrl,
  onLogoChange,
  onBannerChange,
  repairTerms,
  onRepairTermsChange,
  onChangePassword,
}) {
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [passwordMessage, setPasswordMessage] = useState('')

  const [termsDraft, setTermsDraft] = useState('')
  const [termsMessage, setTermsMessage] = useState('')

  useEffect(() => {
    if (open) setTermsDraft(repairTerms || DEFAULT_REPAIR_TERMS)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  const handleClose = () => {
    setNewPassword('')
    setConfirmPassword('')
    setPasswordError('')
    setPasswordMessage('')
    setTermsMessage('')
    onClose()
  }

  const handleTermsSubmit = (e) => {
    e.preventDefault()
    onRepairTermsChange(termsDraft)
    setTermsMessage('Política guardada.')
    setTimeout(() => setTermsMessage(''), 2500)
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
          hint="Se muestra chico, junto al nombre, y grande en el menú lateral. Se guarda en este navegador (no hay servidor todavía). Aceptamos hasta 4 MB y la achicamos nosotros."
          shape="square"
          maxDimension={1000}
          dataUrl={logoDataUrl}
          onChange={onLogoChange}
        />

        <ImageUploadRow
          label="Banner"
          hint="Imagen ancha de fondo para el encabezado. Se guarda en este navegador (no hay servidor todavía). Aceptamos hasta 4 MB y la achicamos nosotros."
          shape="wide"
          maxDimension={2200}
          dataUrl={bannerDataUrl}
          onChange={onBannerChange}
        />

        {onRepairTermsChange && (
          <form onSubmit={handleTermsSubmit} className="space-y-2 border-t border-slate-100 pt-4">
            <p className="text-sm font-semibold text-slate-800">Política de reparaciones</p>
            <p className="text-xs text-slate-400">
              Este texto aparece en el recibo que le das al cliente cuando dejás su equipo (plazos, garantía, daños
              preexistentes, etc.). Editalo como te sirva a vos.
            </p>
            <Textarea value={termsDraft} onChange={(e) => setTermsDraft(e.target.value)} rows={7} className="text-xs" />
            {termsMessage && <p className="text-xs text-emerald-600">{termsMessage}</p>}
            <Button type="submit" size="sm">
              Guardar política
            </Button>
          </form>
        )}

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
