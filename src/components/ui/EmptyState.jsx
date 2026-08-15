export function EmptyState({ icon: Icon, title, description, action }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 py-12 text-center">
      {Icon && <Icon size={32} className="text-slate-300" />}
      <p className="text-sm font-medium text-slate-600">{title}</p>
      {description && <p className="max-w-xs text-xs text-slate-400">{description}</p>}
      {action && <div className="mt-2">{action}</div>}
    </div>
  )
}
