import { Plus, Settings, Smartphone } from 'lucide-react'

const itemClass = 'flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50'

export function AdminSidebar({ logoDataUrl, onNewStore, onOpenSettings }) {
  return (
    <aside className="hidden w-56 shrink-0 flex-col border-r border-slate-200 bg-white sm:flex">
      <div className="p-3">
        <div className="flex aspect-square w-full items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
          {logoDataUrl ? (
            <img src={logoDataUrl} alt="Logo" className="h-full w-full object-contain p-3" />
          ) : (
            <Smartphone size={40} className="text-slate-300" />
          )}
        </div>
      </div>
      <nav className="flex-1 space-y-0.5 px-2 pt-4">
        <button type="button" onClick={onNewStore} className={itemClass}>
          <Plus size={17} />
          Nuevo local
        </button>
        <button type="button" onClick={onOpenSettings} className={itemClass}>
          <Settings size={17} />
          Configuración
        </button>
      </nav>
    </aside>
  )
}
