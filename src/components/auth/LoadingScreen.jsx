import { Smartphone, Sparkles } from 'lucide-react'

const ORBIT_ICONS = [
  { angle: 0, radius: 118, delay: 0 },
  { angle: 60, radius: 132, delay: 90 },
  { angle: 120, radius: 108, delay: 180 },
  { angle: 180, radius: 128, delay: 60 },
  { angle: 240, radius: 116, delay: 220 },
  { angle: 300, radius: 124, delay: 140 },
]

const SPARKLES = [
  { top: '10%', left: '78%', delay: 1350 },
  { top: '72%', left: '82%', delay: 1450 },
  { top: '78%', left: '20%', delay: 1400 },
]

// Pantalla de transición entre el login y el panel: celulares "rotos" son
// succionados por un remolino y sale un celular reparado. Puramente visual,
// no espera ningún dato real — la duración la controla quien la usa.
export function LoadingScreen({ label = 'Preparando tu panel...' }) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-50">
      <div className="relative h-72 w-72">
        {/* remolino de fondo */}
        <div className="absolute inset-6 animate-spin rounded-full border-4 border-dashed border-brand-300" style={{ animationDuration: '3s' }} />
        <div
          className="absolute inset-14 animate-spin rounded-full border-4 border-dotted border-brand-500"
          style={{ animationDuration: '1.8s', animationDirection: 'reverse' }}
        />

        {/* celulares "rotos" cayendo hacia el centro */}
        {ORBIT_ICONS.map(({ angle, radius, delay }) => (
          <div key={angle} className="absolute left-1/2 top-1/2" style={{ transform: `rotate(${angle}deg)` }}>
            <div
              className="animate-orbit-in text-red-400"
              style={{ '--orbit-radius': `${radius}px`, animationDelay: `${delay}ms` }}
            >
              <Smartphone size={26} />
            </div>
          </div>
        ))}

        {/* celular nuevo, sale del centro */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div
            className="animate-new-phone-pop flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-600 text-white opacity-0 shadow-lg"
            style={{ animationDelay: '1250ms' }}
          >
            <Smartphone size={32} />
          </div>
        </div>

        {SPARKLES.map(({ top, left, delay }) => (
          <div
            key={`${top}-${left}`}
            className="animate-sparkle absolute text-amber-400 opacity-0"
            style={{ top, left, animationDelay: `${delay}ms` }}
          >
            <Sparkles size={20} />
          </div>
        ))}
      </div>

      <p className="mt-2 animate-pulse text-sm font-medium text-slate-500">{label}</p>
    </div>
  )
}
