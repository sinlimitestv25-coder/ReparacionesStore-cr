export function Card({ title, action, children, className = '' }) {
  return (
    <div className={`rounded-xl border border-slate-300 bg-white shadow-sm ${className}`}>
      {(title || action) && (
        <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
          {title && <h3 className="text-sm font-semibold text-slate-800">{title}</h3>}
          {action}
        </div>
      )}
      <div className="p-4">{children}</div>
    </div>
  )
}
