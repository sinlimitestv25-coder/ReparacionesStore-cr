export function Table({ children }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[640px] text-left text-sm">{children}</table>
    </div>
  )
}

export function Thead({ children }) {
  return <thead className="border-b border-slate-200 text-xs uppercase tracking-wide text-slate-500">{children}</thead>
}

export function Tbody({ children }) {
  return <tbody className="divide-y divide-slate-100">{children}</tbody>
}

export function Th({ children, className = '' }) {
  return <th className={`px-3 py-2.5 font-medium ${className}`}>{children}</th>
}

export function Td({ children, className = '' }) {
  return <td className={`px-3 py-2.5 text-slate-700 ${className}`}>{children}</td>
}
