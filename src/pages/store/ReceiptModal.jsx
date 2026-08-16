import { useEffect, useState } from 'react'
import { Download, Printer, Share2, Send } from 'lucide-react'
import { Modal } from '../../components/ui/Modal'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { formatCurrency, formatDate } from '../../lib/format'
import { downloadReceiptPdf, getReceiptPdfBlob, ticketNumber } from '../../lib/receiptPdf'
import { DEFAULT_REPAIR_TERMS, DEFAULT_INTAKE_TERMS } from '../../constants'

const canNativeShareFiles = typeof navigator !== 'undefined' && !!navigator.share

export function ReceiptModal({ open, onClose, repair, client, store }) {
  const [mode, setMode] = useState('ingreso')
  const [phone, setPhone] = useState('')
  const [shareError, setShareError] = useState('')
  const [sharing, setSharing] = useState(false)

  useEffect(() => {
    if (open) {
      setMode('ingreso')
      setPhone(client?.phone || '')
      setShareError('')
    }
  }, [open, client])

  if (!repair) return null

  const isIngreso = mode === 'ingreso'
  const modeLabel = isIngreso ? 'Recibo de ingreso' : 'Recibo de egreso · Garantía'
  const terms = (isIngreso ? store.intakeTerms : store.repairTerms) || (isIngreso ? DEFAULT_INTAKE_TERMS : DEFAULT_REPAIR_TERMS)
  const costLabel = isIngreso ? 'Costo estimado' : 'Costo final'
  const costValue = isIngreso ? repair.estimatedCost : repair.finalCost ?? repair.estimatedCost

  const handleDownload = () => downloadReceiptPdf({ store, repair, client, mode })

  const handlePrint = () => window.print()

  const handleWhatsApp = () => {
    const digits = phone.replace(/\D/g, '')
    if (!digits) {
      setShareError('Cargá un número de teléfono.')
      return
    }
    setShareError('')
    const message = `Hola! Te paso el ${modeLabel.toLowerCase()} N.º ${ticketNumber(repair)} de tu equipo (${repair.deviceBrand} ${repair.deviceModel}) en ${store.name}. Te adjunto el PDF con los detalles.`
    window.open(`https://wa.me/${digits}?text=${encodeURIComponent(message)}`, '_blank', 'noopener')
  }

  const handleNativeShare = async () => {
    setShareError('')
    setSharing(true)
    try {
      const blob = getReceiptPdfBlob({ store, repair, client, mode })
      const file = new File([blob], `recibo-${mode}-${ticketNumber(repair)}.pdf`, { type: 'application/pdf' })
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({ files: [file], title: `${modeLabel} ${ticketNumber(repair)}`, text: `${modeLabel} - ${store.name}` })
      } else {
        setShareError('Este navegador no permite adjuntar el archivo directo. Descargá el PDF y compartilo manualmente.')
      }
    } catch (err) {
      if (err?.name !== 'AbortError') setShareError('No se pudo compartir el archivo.')
    } finally {
      setSharing(false)
    }
  }

  return (
    <Modal open={open} onClose={onClose} title="Recibo" size="lg">
      <div className="mb-4 flex rounded-lg border border-slate-200 bg-slate-50 p-1 text-sm">
        <button
          type="button"
          onClick={() => setMode('ingreso')}
          className={`flex-1 rounded-md py-1.5 font-medium transition-colors ${
            isIngreso ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          Ingreso
        </button>
        <button
          type="button"
          onClick={() => setMode('egreso')}
          className={`flex-1 rounded-md py-1.5 font-medium transition-colors ${
            !isIngreso ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'
          }`}
        >
          Egreso · Garantía
        </button>
      </div>

      <div id="receipt-print" className="rounded-lg border border-slate-200 bg-white p-6 text-sm text-slate-800">
        <div className="flex items-start justify-between border-b border-slate-200 pb-3">
          <div>
            <p className="text-base font-bold">{store.name}</p>
            <p className="text-xs text-slate-500">{[store.address, store.phone].filter(Boolean).join(' · ')}</p>
          </div>
          <div className="text-right text-xs text-slate-500">
            <p className="font-semibold text-slate-700">N.º {ticketNumber(repair)}</p>
            <p>{formatDate(repair.date)}</p>
          </div>
        </div>

        <p className="mt-4 text-sm font-bold uppercase tracking-wide">{modeLabel}</p>

        <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
          <div>
            <dt className="text-slate-400">Cliente</dt>
            <dd className="font-medium">{client?.name || '-'}</dd>
          </div>
          <div>
            <dt className="text-slate-400">Teléfono</dt>
            <dd className="font-medium">{client?.phone || '-'}</dd>
          </div>
          <div>
            <dt className="text-slate-400">Equipo</dt>
            <dd className="font-medium">
              {repair.deviceBrand} {repair.deviceModel}
            </dd>
          </div>
          <div>
            <dt className="text-slate-400">Técnico</dt>
            <dd className="font-medium">{repair.technician || '-'}</dd>
          </div>
          <div>
            <dt className="text-slate-400">{costLabel}</dt>
            <dd className="font-medium">{formatCurrency(costValue)}</dd>
          </div>
        </dl>

        <div className="mt-3">
          <p className="text-xs font-semibold text-slate-500">Problema reportado</p>
          <p className="mt-1 text-xs">{repair.issueDescription}</p>
        </div>

        <div className="mt-4 border-t border-slate-200 pt-3">
          <p className="text-xs font-semibold text-slate-700">
            {isIngreso ? 'Declaración de estado y política de ingreso' : 'Política y garantía'}
          </p>
          <p className="mt-1 whitespace-pre-line text-[11px] leading-relaxed text-slate-500">{terms}</p>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-8 text-center text-[10px] text-slate-400">
          <div className="border-t border-slate-300 pt-1">Firma del cliente</div>
          <div className="border-t border-slate-300 pt-1">Firma / sello del local</div>
        </div>
      </div>

      <div className="mt-4 space-y-3 border-t border-slate-100 pt-4">
        <div className="flex flex-wrap gap-2">
          <Button size="sm" onClick={handleDownload}>
            <Download size={15} />
            Descargar PDF
          </Button>
          <Button size="sm" variant="secondary" onClick={handlePrint}>
            <Printer size={15} />
            Imprimir
          </Button>
          {canNativeShareFiles && (
            <Button size="sm" variant="secondary" onClick={handleNativeShare} disabled={sharing}>
              <Share2 size={15} />
              {sharing ? 'Abriendo...' : 'Compartir'}
            </Button>
          )}
        </div>

        <div className="flex items-end gap-2">
          <div className="flex-1">
            <Input label="Enviar por WhatsApp a" placeholder="011 5555 5555" value={phone} onChange={(e) => setPhone(e.target.value)} />
          </div>
          <Button size="md" variant="secondary" onClick={handleWhatsApp}>
            <Send size={15} />
            Abrir WhatsApp
          </Button>
        </div>
        <p className="text-xs text-slate-400">
          WhatsApp Web no permite adjuntar el PDF automáticamente: se abre con un mensaje ya escrito y adjuntás el
          archivo descargado a mano. Si entrás desde el celular, probá "Compartir" para mandarlo directo.
        </p>
        {shareError && <p className="text-xs text-red-600">{shareError}</p>}
      </div>
    </Modal>
  )
}
