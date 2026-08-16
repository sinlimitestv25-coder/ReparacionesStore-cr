import { useState } from 'react'
import { LegalModal } from './LegalModal'
import { PRIVACY_POLICY_TEXT, TERMS_TEXT } from '../lib/legalContent'
import pkg from '../../package.json'

export function SiteFooter({ className = '' }) {
  const [legalModal, setLegalModal] = useState(null) // 'privacy' | 'terms' | null

  return (
    <>
      <footer className={`flex flex-wrap items-center justify-center gap-x-3 gap-y-1 py-4 text-xs text-slate-400 ${className}`}>
        <button type="button" onClick={() => setLegalModal('privacy')} className="hover:text-slate-600 hover:underline">
          Política de privacidad
        </button>
        <span>·</span>
        <button type="button" onClick={() => setLegalModal('terms')} className="hover:text-slate-600 hover:underline">
          Términos y condiciones
        </button>
        <span>·</span>
        <span>© {new Date().getFullYear()} C&R Soluciones Digitales</span>
        <span>·</span>
        <span>v{pkg.version}</span>
      </footer>

      <LegalModal
        open={legalModal === 'privacy'}
        onClose={() => setLegalModal(null)}
        title="Política de privacidad"
        content={PRIVACY_POLICY_TEXT}
      />
      <LegalModal open={legalModal === 'terms'} onClose={() => setLegalModal(null)} title="Términos y condiciones" content={TERMS_TEXT} />
    </>
  )
}
