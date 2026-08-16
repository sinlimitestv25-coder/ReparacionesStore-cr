import { Modal } from './ui/Modal'

export function LegalModal({ open, onClose, title, content }) {
  return (
    <Modal open={open} onClose={onClose} title={title}>
      <p className="mb-3 rounded-md bg-amber-50 px-3 py-2 text-xs text-amber-700">
        Texto de referencia genérico, todavía no revisado por un abogado. Reemplazalo antes de usar el sistema en
        producción con datos reales.
      </p>
      <p className="whitespace-pre-line text-xs leading-relaxed text-slate-600">{content}</p>
    </Modal>
  )
}
