import { jsPDF } from 'jspdf'
import { formatCurrency, formatDate } from './format'
import { DEFAULT_REPAIR_TERMS } from '../constants'

const MARGIN = 15
const PAGE_WIDTH = 210
const PAGE_HEIGHT = 297
const CONTENT_WIDTH = PAGE_WIDTH - MARGIN * 2

export function ticketNumber(repair) {
  return repair.id.slice(-6).toUpperCase()
}

function ensureSpace(doc, y, needed) {
  if (y + needed > PAGE_HEIGHT - MARGIN) {
    doc.addPage()
    return MARGIN
  }
  return y
}

export function buildReceiptDoc({ store, repair, client }) {
  const doc = new jsPDF({ unit: 'mm', format: 'a4' })
  let y = MARGIN

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(16)
  doc.text(store.name || 'Local', MARGIN, y)
  y += 6

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.setTextColor(100)
  const contactLine = [store.address, store.phone].filter(Boolean).join(' · ')
  if (contactLine) {
    doc.text(contactLine, MARGIN, y)
    y += 5
  }
  doc.setTextColor(0)

  y += 3
  doc.setDrawColor(200)
  doc.line(MARGIN, y, PAGE_WIDTH - MARGIN, y)
  y += 8

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(13)
  doc.text('RECIBO DE INGRESO · REPARACIÓN', MARGIN, y)
  doc.setFontSize(10)
  doc.text(`N.º ${ticketNumber(repair)}`, PAGE_WIDTH - MARGIN, y, { align: 'right' })
  y += 6
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.setTextColor(100)
  doc.text(`Fecha: ${formatDate(repair.date)}`, PAGE_WIDTH - MARGIN, y, { align: 'right' })
  doc.setTextColor(0)
  y += 10

  const row = (label, value) => {
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(10)
    doc.text(label, MARGIN, y)
    doc.setFont('helvetica', 'normal')
    doc.text(String(value || '-'), MARGIN + 45, y)
    y += 6
  }

  row('Cliente', client?.name)
  row('Teléfono', client?.phone)
  y += 2
  row('Equipo', `${repair.deviceBrand || ''} ${repair.deviceModel || ''}`.trim())
  row('Técnico asignado', repair.technician)
  row('Costo estimado', formatCurrency(repair.estimatedCost))
  y += 2

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(10)
  doc.text('Problema reportado', MARGIN, y)
  y += 6
  doc.setFont('helvetica', 'normal')
  const issueLines = doc.splitTextToSize(repair.issueDescription || '-', CONTENT_WIDTH)
  doc.text(issueLines, MARGIN, y)
  y += issueLines.length * 5 + 6

  y = ensureSpace(doc, y, 20)
  doc.setDrawColor(200)
  doc.line(MARGIN, y, PAGE_WIDTH - MARGIN, y)
  y += 8

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(11)
  doc.text('Política y garantía', MARGIN, y)
  y += 6

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(8.5)
  doc.setTextColor(60)
  const terms = store.repairTerms || DEFAULT_REPAIR_TERMS
  const paragraphs = terms.split('\n').filter((p) => p.trim() !== '')
  paragraphs.forEach((paragraph) => {
    const lines = doc.splitTextToSize(paragraph, CONTENT_WIDTH)
    y = ensureSpace(doc, y, lines.length * 4.2 + 4)
    doc.text(lines, MARGIN, y)
    y += lines.length * 4.2 + 3
  })
  doc.setTextColor(0)

  y = ensureSpace(doc, y, 30)
  y += 14
  doc.setDrawColor(120)
  doc.line(MARGIN, y, MARGIN + 70, y)
  doc.line(PAGE_WIDTH - MARGIN - 70, y, PAGE_WIDTH - MARGIN, y)
  y += 5
  doc.setFontSize(8)
  doc.setTextColor(100)
  doc.text('Firma del cliente', MARGIN, y)
  doc.text('Firma / sello del local', PAGE_WIDTH - MARGIN - 70, y)

  return doc
}

export function downloadReceiptPdf(params) {
  const doc = buildReceiptDoc(params)
  doc.save(`recibo-${ticketNumber(params.repair)}.pdf`)
}

export function getReceiptPdfBlob(params) {
  const doc = buildReceiptDoc(params)
  return doc.output('blob')
}
