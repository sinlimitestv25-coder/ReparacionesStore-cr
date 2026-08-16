const COLORS = {
  blue: 'bg-blue-50 text-blue-600',
  emerald: 'bg-emerald-50 text-emerald-600',
  amber: 'bg-amber-50 text-amber-600',
  red: 'bg-red-50 text-red-600',
  slate: 'bg-slate-100 text-slate-600',
}

export function StatCard({ icon: Icon, label, value, hint, color = 'blue' }) {
  return (
    <div className="relative rounded-xl border border-slate-300 bg-white p-4 shadow">
      {Icon && (
        <div className={`absolute right-4 top-4 flex h-14 w-14 items-center justify-center rounded-lg ${COLORS[color]}`}>
          <Icon size={30} />
        </div>
      )}
      <div className="max-w-[calc(100%-4.5rem)]">
        <p className="truncate text-xs font-medium text-slate-500">{label}</p>
        <p className="mt-1 truncate text-2xl font-semibold text-slate-800">{value}</p>
      </div>
      {hint && <p className="mt-2 text-xs text-slate-400">{hint}</p>}
    </div>
  )
}
