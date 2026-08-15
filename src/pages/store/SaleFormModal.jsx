import { useMemo, useState } from 'react'
import { Plus, Minus, Trash2, Search } from 'lucide-react'
import { Modal } from '../../components/ui/Modal'
import { Input } from '../../components/ui/Input'
import { Select } from '../../components/ui/Select'
import { Button } from '../../components/ui/Button'
import { formatCurrency } from '../../lib/format'
import { PAYMENT_METHODS } from '../../constants'

export function SaleFormModal({ open, onClose, onSubmit, products, clients }) {
  const [search, setSearch] = useState('')
  const [cart, setCart] = useState([])
  const [clientId, setClientId] = useState('')
  const [paymentMethod, setPaymentMethod] = useState(PAYMENT_METHODS[0].value)

  const clientOptions = [{ value: '', label: 'Cliente ocasional (sin registrar)' }, ...clients.map((c) => ({ value: c.id, label: c.name }))]

  const filteredProducts = useMemo(
    () => products.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()) && p.quantity > 0),
    [products, search]
  )

  const total = cart.reduce((sum, i) => sum + i.unitPrice * i.qty, 0)

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.productId === product.id)
      if (existing) {
        if (existing.qty >= product.quantity) return prev
        return prev.map((i) => (i.productId === product.id ? { ...i, qty: i.qty + 1 } : i))
      }
      return [...prev, { productId: product.id, name: product.name, unitPrice: product.price, unitCost: product.cost, qty: 1, maxQty: product.quantity }]
    })
  }

  const changeQty = (productId, delta) => {
    setCart((prev) =>
      prev
        .map((i) => (i.productId === productId ? { ...i, qty: Math.min(i.maxQty, Math.max(1, i.qty + delta)) } : i))
        .filter((i) => i.qty > 0)
    )
  }

  const removeFromCart = (productId) => setCart((prev) => prev.filter((i) => i.productId !== productId))

  const resetState = () => {
    setCart([])
    setSearch('')
    setClientId('')
    setPaymentMethod(PAYMENT_METHODS[0].value)
  }

  const handleClose = () => {
    resetState()
    onClose()
  }

  const handleSubmit = () => {
    if (cart.length === 0) return
    onSubmit({
      clientId: clientId || null,
      paymentMethod,
      items: cart.map(({ maxQty, ...item }) => item),
      total,
    })
    resetState()
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title="Nueva venta"
      size="lg"
      footer={
        <>
          <Button variant="secondary" type="button" onClick={handleClose}>
            Cancelar
          </Button>
          <Button type="button" onClick={handleSubmit} disabled={cart.length === 0}>
            Registrar venta · {formatCurrency(total)}
          </Button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <div className="relative mb-2">
            <Search size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <Input className="pl-8" placeholder="Buscar producto..." value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <div className="max-h-72 space-y-1.5 overflow-y-auto">
            {filteredProducts.length === 0 && <p className="py-4 text-center text-xs text-slate-400">Sin productos disponibles.</p>}
            {filteredProducts.map((product) => (
              <button
                key={product.id}
                type="button"
                onClick={() => addToCart(product)}
                className="flex w-full items-center justify-between rounded-lg border border-slate-200 px-3 py-2 text-left text-sm hover:border-brand-300 hover:bg-brand-50"
              >
                <span className="min-w-0 truncate">{product.name}</span>
                <span className="shrink-0 text-xs text-slate-500">{formatCurrency(product.price)} · stock {product.quantity}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <div>
            <p className="mb-1.5 text-xs font-medium text-slate-600">Carrito</p>
            <div className="max-h-56 space-y-1.5 overflow-y-auto rounded-lg border border-slate-200 p-2">
              {cart.length === 0 && <p className="py-4 text-center text-xs text-slate-400">Agregá productos desde la izquierda.</p>}
              {cart.map((item) => (
                <div key={item.productId} className="flex items-center gap-2 rounded-md bg-slate-50 px-2 py-1.5 text-xs">
                  <span className="min-w-0 flex-1 truncate">{item.name}</span>
                  <button type="button" onClick={() => changeQty(item.productId, -1)} className="rounded p-0.5 hover:bg-slate-200">
                    <Minus size={12} />
                  </button>
                  <span className="w-5 text-center">{item.qty}</span>
                  <button type="button" onClick={() => changeQty(item.productId, 1)} className="rounded p-0.5 hover:bg-slate-200">
                    <Plus size={12} />
                  </button>
                  <span className="w-16 shrink-0 text-right font-medium">{formatCurrency(item.unitPrice * item.qty)}</span>
                  <button type="button" onClick={() => removeFromCart(item.productId)} className="rounded p-0.5 text-red-500 hover:bg-red-50">
                    <Trash2 size={12} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <Select label="Cliente" options={clientOptions} value={clientId} onChange={(e) => setClientId(e.target.value)} />
          <Select label="Método de pago" options={PAYMENT_METHODS} value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} />

          <div className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2 text-sm">
            <span className="font-medium text-slate-600">Total</span>
            <span className="text-base font-semibold text-slate-800">{formatCurrency(total)}</span>
          </div>
        </div>
      </div>
    </Modal>
  )
}
