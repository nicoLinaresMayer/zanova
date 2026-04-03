'use client'
import { useState, useEffect } from 'react'

type Variant = {
  id: string
  color: string
  size: string
  stock: number
  stock_amoremio: number
  price: number | null
  color_position: number
}

type Image = {
  id: string
  url: string
  color: string | null
  position: number
}

type Product = {
  id: string
  name: string
  slug: string
  description: string | null
  position: number
  product_variants: Variant[]
  product_images: Image[]
}

export default function AdminPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [tab, setTab] = useState<'productos' | 'imagenes' | 'stock' | 'nuevo'>('productos')
  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState<string | null>(null)

  const [newName, setNewName] = useState('')
  const [newSlug, setNewSlug] = useState('')
  const [newDesc, setNewDesc] = useState('')
  const [newPos, setNewPos] = useState(0)

  const [imgUrl, setImgUrl] = useState('')
  const [imgColor, setImgColor] = useState('')
  const [imgPos, setImgPos] = useState(1)

  const [varColor, setVarColor] = useState('')
  const [varSize, setVarSize] = useState('')
  const [varStock, setVarStock] = useState(0)
  const [varStockA, setVarStockA] = useState(0)
  const [varPrice, setVarPrice] = useState('')
  const [varColorPos, setVarColorPos] = useState(0)

  const [productEdits, setProductEdits] = useState<Record<string, Partial<Product>>>({})
  const [variantEdits, setVariantEdits] = useState<Record<string, Partial<Variant>>>({})
  const [imageEdits, setImageEdits] = useState<Record<string, Partial<Image>>>({})
  const [expandedProduct, setExpandedProduct] = useState<string | null>(null)
  const [expandedVariant, setExpandedVariant] = useState<string | null>(null)
  const [globalPrice, setGlobalPrice] = useState<string>('')

  const [variantBatchEdits, setVariantBatchEdits] = useState<Record<string, Partial<Variant>>>({})

  useEffect(() => { fetchProducts() }, [])

  async function fetchProducts() {
    const res = await fetch('/api/admin/products')
    const data = await res.json()
    setProducts(data)
  }

  const selected = products.find(p => p.id === selectedId) ?? null

  function notify(text: string) {
    setMsg(text)
    setTimeout(() => setMsg(null), 3000)
  }

  function editProduct(id: string, field: string, value: any) {
    setProductEdits(prev => ({ ...prev, [id]: { ...prev[id], [field]: value } }))
  }

  async function saveProduct(id: string) {
    const changes = productEdits[id]
    if (!changes) return
    setLoading(true)
    await fetch('/api/admin/products', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, ...changes })
    })
    setProductEdits(prev => { const n = { ...prev }; delete n[id]; return n })
    await fetchProducts()
    setLoading(false)
    notify('Producto guardado')
  }

  function editVariant(id: string, field: string, value: any) {
    setVariantEdits(prev => ({ ...prev, [id]: { ...prev[id], [field]: value } }))
  }

  async function saveVariant(id: string) {
    const changes = variantEdits[id]
    if (!changes) return
    setLoading(true)
    await fetch('/api/admin/variants', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, ...changes })
    })
    setVariantEdits(prev => { const n = { ...prev }; delete n[id]; return n })
    await fetchProducts()
    setLoading(false)
    notify('Variante guardada')
  }

  function editImage(id: string, field: string, value: any) {
    setImageEdits(prev => ({ ...prev, [id]: { ...prev[id], [field]: value } }))
  }

  async function saveAllImages() {
    setLoading(true)
    await Promise.all(
      Object.entries(imageEdits).map(([id, changes]) =>
        fetch('/api/admin/images', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id, ...changes })
        })
      )
    )
    setImageEdits({})
    await fetchProducts()
    setLoading(false)
    notify('Imágenes guardadas')
  }

  async function addImage() {
    if (!selectedId || !imgUrl) return
    setLoading(true)
    await fetch('/api/admin/images', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ product_id: selectedId, url: imgUrl, color: imgColor || null, position: imgPos })
    })
    setImgUrl(''); setImgColor(''); setImgPos(1)
    await fetchProducts()
    setLoading(false)
    notify('Imagen agregada')
  }

  async function deleteImage(id: string) {
    if (!confirm('¿Eliminar imagen?')) return
    await fetch('/api/admin/images', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id })
    })
    await fetchProducts()
    notify('Imagen eliminada')
  }

  async function addVariant() {
    if (!selectedId || !varColor || !varSize) return
    setLoading(true)
    const sizes = varSize.split(',').filter(Boolean)
    await Promise.all(sizes.map(size =>
      fetch('/api/admin/variants', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          product_id: selectedId, color: varColor, size,
          stock: varStock, stock_amoremio: varStockA,
          price: varPrice ? Number(varPrice) : null,
          color_position: varColorPos,
        })
      })
    ))
    setVarColor(''); setVarSize(''); setVarStock(0); setVarStockA(0); setVarPrice(''); setVarColorPos(0)
    await fetchProducts()
    setLoading(false)
    notify(`${sizes.length} variante${sizes.length > 1 ? 's' : ''} agregada${sizes.length > 1 ? 's' : ''}`)
  }

  async function deleteVariant(id: string) {
    if (!confirm('¿Eliminar variante?')) return
    await fetch('/api/admin/variants', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id })
    })
    await fetchProducts()
    notify('Variante eliminada')
  }

  async function addProduct() {
    if (!newName || !newSlug) return
    setLoading(true)
    await fetch('/api/admin/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: newName, slug: newSlug, description: newDesc || null, position: newPos })
    })
    setNewName(''); setNewSlug(''); setNewDesc(''); setNewPos(0)
    await fetchProducts()
    setLoading(false)
    notify('Producto creado')
  }

  async function applyGlobalPrice(productId: string) {
    if (!globalPrice || !selected) return
    setLoading(true)
    await Promise.all(
      selected.product_variants.map(v =>
        fetch('/api/admin/variants', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: v.id, price: Number(globalPrice) })
        })
      )
    )
    setGlobalPrice('')
    await fetchProducts()
    setLoading(false)
    notify('Precio aplicado a todas las variantes')
  }

  function editVariantBatch(id: string, field: string, value: any) {
  setVariantBatchEdits(prev => ({ ...prev, [id]: { ...prev[id], [field]: value } }))
}

  async function saveAllVariants() {
    setLoading(true)
    await Promise.all(
      Object.entries(variantBatchEdits).map(([id, changes]) =>
        fetch('/api/admin/variants', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id, ...changes })
        })
      )
    )
    setVariantBatchEdits({})
    await fetchProducts()
    setLoading(false)
    notify('Variantes guardadas')
  }



  const inputClass = "border border-gray-300 rounded px-3 py-1.5 text-sm w-full focus:outline-none focus:border-black"
  const btnClass = "bg-black text-white px-4 py-1.5 text-sm rounded hover:bg-gray-800 transition disabled:opacity-50"
  const tabClass = (t: string) => `px-4 py-2 text-sm border-b-2 transition ${tab === t ? 'border-black font-medium' : 'border-transparent text-gray-400 hover:text-black'}`
  const SIZE_ORDER = ['S', 'M', 'L', 'XL', 'XXL']

  const sortedVariants = (variants: Variant[]) => variants.slice().sort((a, b) => {
    const colorDiff = (a.color_position ?? 0) - (b.color_position ?? 0)
    if (colorDiff !== 0) return colorDiff
    return SIZE_ORDER.indexOf(a.size) - SIZE_ORDER.indexOf(b.size)
  })

  return (
    <div className="max-w-5xl mx-auto px-6 py-10 text-black">
      <h1 className="font-zanova text-xl uppercase mb-8">Administracion</h1>

      {msg && (
        <div className="mb-4 bg-green-50 border border-green-200 text-green-800 px-4 py-2 rounded text-sm">
          {msg}
        </div>
      )}

      <div className="flex border-b border-gray-200 mb-6">
        <button className={tabClass('productos')} onClick={() => setTab('productos')}>Productos</button>
        <button className={tabClass('imagenes')} onClick={() => setTab('imagenes')}>Imágenes</button>
        <button className={tabClass('stock')} onClick={() => setTab('stock')}>Stock & Variantes</button>
        <button className={tabClass('nuevo')} onClick={() => setTab('nuevo')}>Nuevo Producto</button>
      </div>

      {/* ── PRODUCTOS ── */}
      {tab === 'productos' && (
        <div className="space-y-4">
          <p className="text-xs text-gray-400 uppercase tracking-wider">
            Editá los campos directamente — guardá cuando termines
          </p>


          {/* MOBILE */}
          <div className="md:hidden space-y-2">
            {products.map(p => (
              <div key={p.id} className="border border-gray-200 rounded overflow-hidden">
                <button
                  className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-gray-50 transition"
                  onClick={() => setExpandedProduct(expandedProduct === p.id ? null : p.id)}
                >
                  <div>
                    <span className="font-medium text-sm">{productEdits[p.id]?.name ?? p.name}</span>
                    <span className="ml-3 text-xs text-gray-400 font-mono">{p.slug}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    {productEdits[p.id] && <span className="text-xs text-orange-400 font-medium">Sin guardar</span>}
                    <span className="text-gray-400 text-sm">{expandedProduct === p.id ? '▲' : '▶'}</span>
                  </div>
                </button>
                {expandedProduct === p.id && (
                  <div className="px-4 pb-4 pt-2 border-t border-gray-100 space-y-3">
                    <div className="space-y-1">
                      <label className="text-xs text-gray-500 uppercase tracking-wider">Nombre</label>
                      <input defaultValue={p.name} className={inputClass} onChange={e => editProduct(p.id, 'name', e.target.value)} />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs text-gray-500 uppercase tracking-wider">Slug</label>
                      <input defaultValue={p.slug} className={`${inputClass} font-mono text-xs`} onChange={e => editProduct(p.id, 'slug', e.target.value)} />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs text-gray-500 uppercase tracking-wider">Descripción</label>
                      <input defaultValue={p.description ?? ''} className={inputClass} onChange={e => editProduct(p.id, 'description', e.target.value)} />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs text-gray-500 uppercase tracking-wider">Posición</label>
                      <input type="number" defaultValue={p.position} className={inputClass} onChange={e => editProduct(p.id, 'position', Number(e.target.value))} />
                    </div>
                    <div className="text-xs text-gray-400 space-y-0.5">
                      {[...new Set(p.product_variants.map(v => v.color))].map(color => {
                        const sizes = p.product_variants.filter(v => v.color === color)
                          .sort((a, b) => SIZE_ORDER.indexOf(a.size) - SIZE_ORDER.indexOf(b.size))
                          .map(v => v.size).join(' · ')
                        return <div key={color}>{color}: {sizes}</div>
                      })}
                    </div>
                    {productEdits[p.id] && (
                      <button onClick={() => saveProduct(p.id)} disabled={loading} className={btnClass}>Guardar</button>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* DESKTOP */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs uppercase tracking-widest text-gray-400 border-b">
                  <th className="pb-2 pr-4">Nombre</th>
                  <th className="pb-2 pr-4">Slug</th>
                  <th className="pb-2 pr-4">Descripción</th>
                  <th className="pb-2 pr-4">Posición</th>
                  <th className="pb-2">Variantes</th>
                  <th className="pb-2"></th>
                </tr>
              </thead>
              <tbody>
                {products.map(p => (
                  <tr key={p.id} className="border-b border-gray-100 align-top">
                    <td className="py-3 pr-4">
                      <input defaultValue={p.name} className="border border-gray-200 rounded px-2 py-1 text-sm w-40" onChange={e => editProduct(p.id, 'name', e.target.value)} />
                    </td>
                    <td className="py-3 pr-4">
                      <input defaultValue={p.slug} className="border border-gray-200 rounded px-2 py-1 text-sm w-40 font-mono text-xs" onChange={e => editProduct(p.id, 'slug', e.target.value)} />
                    </td>
                    <td className="py-3 pr-4">
                      <input defaultValue={p.description ?? ''} className="border border-gray-200 rounded px-2 py-1 text-sm w-52" onChange={e => editProduct(p.id, 'description', e.target.value)} />
                    </td>
                    <td className="py-3 pr-4">
                      <input type="number" defaultValue={p.position} className="border border-gray-200 rounded px-2 py-1 text-sm w-16" onChange={e => editProduct(p.id, 'position', Number(e.target.value))} />
                    </td>
                    <td className="py-3 text-xs text-gray-400 space-y-0.5">
                      {[...new Set(p.product_variants.map(v => v.color))].map(color => {
                        const sizes = p.product_variants.filter(v => v.color === color)
                          .sort((a, b) => SIZE_ORDER.indexOf(a.size) - SIZE_ORDER.indexOf(b.size))
                          .map(v => v.size).join(' · ')
                        return <div key={color}>{color}: {sizes}</div>
                      })}
                    </td>
                    <td className="py-3 pl-3">
                      {productEdits[p.id] && (
                        <button onClick={() => saveProduct(p.id)} disabled={loading} className={`${btnClass} whitespace-nowrap`}>Guardar</button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── IMÁGENES ── */}
      {tab === 'imagenes' && (
        <div className="space-y-6">
          <select className={inputClass} value={selectedId ?? ''} onChange={e => { setSelectedId(e.target.value || null); setImageEdits({}) }}>
            <option value="">— Elegí un producto —</option>
            {products.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
          </select>

          {selected && (
            <>

              {/* Imágenes agrupadas por color */}
              {(() => {
                const byColor: Record<string, Image[]> = {}
                for (const img of selected.product_images.sort((a, b) => a.position - b.position)) {
                  const key = img.color ?? 'Sin color'
                  if (!byColor[key]) byColor[key] = []
                  byColor[key].push(img)
                }
                return Object.entries(byColor).map(([color, imgs]) => (
                  <div key={color}>
                    <p className="text-xs uppercase tracking-widest text-gray-400 mb-2">{color}</p>
                    <div className="space-y-2">
                      {imgs.map(img => (
                        <div key={img.id} className="flex items-center gap-3 bg-gray-50 rounded px-3 py-2">
                          <img
                            src={imageEdits[img.id]?.url ?? img.url}
                            className="w-12 h-12 object-cover rounded flex-shrink-0"
                          />

                          <input
                            className="text-xs text-gray-500 flex-1 border border-transparent hover:border-gray-300 focus:border-black rounded px-2 py-1 transition bg-transparent"
                            defaultValue={img.url}
                            onChange={e => editImage(img.id, 'url', e.target.value)}
                            placeholder="URL"
                          />

                          <input
                            type="number"
                            className={`text-xs border rounded px-2 py-1 w-16 transition ${imageEdits[img.id]?.position !== undefined ? 'border-orange-300 bg-orange-50' : 'border-transparent hover:border-gray-300 focus:border-black bg-transparent'}`}
                            defaultValue={img.position}
                            onChange={e => editImage(img.id, 'position', Number(e.target.value))}
                          />

                          {imageEdits[img.id] && (
                            <span className="text-orange-400 text-xs flex-shrink-0">•</span>
                          )}

                          <button onClick={() => deleteImage(img.id)} className="text-red-400 hover:text-red-600 text-xs flex-shrink-0">✕</button>
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              })()}

              {/* Colores sin imágenes */}
              {(() => {
                const coloresConImagenes = new Set(selected.product_images.filter(img => img.color).map(img => img.color))
                const coloresSinImagenes = [...new Set(selected.product_variants.map(v => v.color))].filter(color => !coloresConImagenes.has(color))
                if (coloresSinImagenes.length === 0) return null
                return (
                  <div className="bg-yellow-50 border border-yellow-200 rounded p-3 space-y-2">
                    <p className="text-xs font-medium uppercase tracking-wider text-yellow-700">Colores sin imágenes</p>
                    <div className="flex gap-2 flex-wrap">
                      {coloresSinImagenes.map(color => (
                        <button key={color} onClick={() => setImgColor(color)} className="text-xs bg-yellow-100 border border-yellow-300 text-yellow-800 px-3 py-1 rounded hover:bg-yellow-200 transition">
                          + {color}
                        </button>
                      ))}
                    </div>
                    <p className="text-xs text-yellow-600">Tocá un color para precompletarlo en el form de abajo</p>
                  </div>
                )
              })()}

              {/* Form agregar imagen */}
              <div className="border border-gray-200 rounded p-4 space-y-3">
                <p className="text-sm font-medium">Agregar imagen</p>
                <div className="space-y-1">
                  <label className="text-xs text-gray-500 uppercase tracking-wider">URL de Cloudinary</label>
                  <input className={inputClass} placeholder="https://res.cloudinary.com/..." value={imgUrl} onChange={e => setImgUrl(e.target.value)} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs text-gray-500 uppercase tracking-wider">Color (o vacío para todos)</label>
                    <input className={inputClass} placeholder="ej: Negro" value={imgColor} onChange={e => setImgColor(e.target.value)} />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-gray-500 uppercase tracking-wider">Posición (1 = primera)</label>
                    <input className={inputClass} type="number" value={imgPos} onChange={e => setImgPos(Number(e.target.value))} />
                  </div>
                </div>
                <button className={btnClass} onClick={addImage} disabled={loading}>Agregar</button>
              </div>
            </>
          )}
        </div>
      )}

      {/* ── STOCK & VARIANTES ── */}
      {tab === 'stock' && (
        <div className="space-y-6">
          <select className={inputClass} value={selectedId ?? ''} onChange={e => { setSelectedId(e.target.value || null); setVariantBatchEdits({}) }}>
            <option value="">— Elegí un producto —</option>
            {products.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
          </select>

          {selected && (
            <div className="flex items-end gap-3 bg-gray-50 border border-gray-200 rounded p-3">
              <div className="space-y-1 flex-1">
                <label className="text-xs text-gray-500 uppercase tracking-wider">
                  Precio global para todas las variantes
                </label>
                <input
                  className={inputClass}
                  type="number"
                  placeholder="ej: 35000"
                  value={globalPrice}
                  onChange={e => setGlobalPrice(e.target.value)}
                />
              </div>
              <button
                className={btnClass}
                onClick={() => applyGlobalPrice(selected.id)}
                disabled={loading || !globalPrice}
              >
                Aplicar a todas
              </button>
            </div>
          )}


            {Object.keys(variantBatchEdits).length > 0 && (
              <div className="flex items-center justify-between bg-orange-50 border border-orange-200 rounded px-4 py-2">
                <span className="text-xs text-orange-600">
                  {Object.keys(variantBatchEdits).length} variante{Object.keys(variantBatchEdits).length > 1 ? 's' : ''} con cambios sin guardar
                </span>
                <div className="flex gap-2">
                  <button onClick={() => setVariantBatchEdits({})} className="text-xs text-gray-500 hover:text-gray-800 border border-gray-300 px-3 py-1.5 rounded transition">
                    Cancelar
                  </button>
                  <button onClick={saveAllVariants} disabled={loading} className={btnClass}>
                    Guardar todo
                  </button>
                </div>
              </div>
            )}


          {selected && (
            <>
              {/* MOBILE */}
              <div className="md:hidden space-y-2">
                {sortedVariants(selected.product_variants).map(v => (
                  <div key={v.id} className="border border-gray-200 rounded overflow-hidden">
                    <button
                      className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-gray-50 transition"
                      onClick={() => setExpandedVariant(expandedVariant === v.id ? null : v.id)}
                    >
                      <div className="flex items-center gap-3">
                        <span className="font-medium text-sm">{v.color}</span>
                        <span className="text-xs bg-gray-100 px-2 py-0.5 rounded">{v.size}</span>
                        <span className="text-xs text-gray-400">Stock: {v.stock + v.stock_amoremio}</span>
                        {v.price && (
                          <span className="text-xs text-gray-400">· $ {Number(v.price).toLocaleString('es-AR')}</span>
                        )}
                      </div>
                      <div className="flex items-center gap-3">
                        {variantEdits[v.id] && <span className="text-xs text-orange-400 font-medium">Sin guardar</span>}
                        <span className="text-gray-400 text-sm">{expandedVariant === v.id ? '▲' : '▶'}</span>
                      </div>
                    </button>
                    {expandedVariant === v.id && (
                        <div className="px-4 pb-4 pt-2 border-t border-gray-100 space-y-3">
                          <div className="grid grid-cols-2 gap-3">
                            <div className="space-y-1">
                              <label className="text-xs text-gray-500 uppercase tracking-wider">Stock local</label>
                              <input type="number" defaultValue={v.stock} className={inputClass} onChange={e => editVariantBatch(v.id, 'stock', Number(e.target.value))} />
                            </div>
                            <div className="space-y-1">
                              <label className="text-xs text-gray-500 uppercase tracking-wider">Stock Amoremio</label>
                              <input type="number" defaultValue={v.stock_amoremio} className={inputClass} onChange={e => editVariantBatch(v.id, 'stock_amoremio', Number(e.target.value))} />
                            </div>
                            <div className="space-y-1">
                              <label className="text-xs text-gray-500 uppercase tracking-wider">Precio (ARS)</label>
                              <input type="number" defaultValue={v.price ?? ''} className={inputClass} onChange={e => editVariantBatch(v.id, 'price', Number(e.target.value))} />
                            </div>
                            <div className="space-y-1">
                              <label className="text-xs text-gray-500 uppercase tracking-wider">Orden del color</label>
                              <input type="number" defaultValue={v.color_position ?? 0} className={inputClass} onChange={e => editVariantBatch(v.id, 'color_position', Number(e.target.value))} />
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            {variantBatchEdits[v.id] && (
                              <span className="text-orange-400 text-xs">Sin guardar</span>
                            )}
                            <button onClick={() => deleteVariant(v.id)} className="text-red-400 hover:text-red-600 text-xs ml-auto">Eliminar variante</button>
                          </div>
                        </div>
                      )}
                  </div>
                ))}
              </div>

              {/* DESKTOP */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-xs uppercase tracking-widest text-gray-400 border-b">
                      <th className="pb-2">Color</th>
                      <th className="pb-2">Talle</th>
                      <th className="pb-2">Stock</th>
                      <th className="pb-2">Stock Amoremio</th>
                      <th className="pb-2">Precio</th>
                      <th className="pb-2">Color pos.</th>
                      <th className="pb-2"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedVariants(selected.product_variants).map(v => (
                      <tr key={v.id} className="border-b border-gray-100">
                        <td className="py-2 pr-3">{v.color}</td>
                        <td className="py-2 pr-3">{v.size}</td>
                        <td className="py-2 pr-3">
                          <input type="number" defaultValue={v.stock} className={`border rounded px-2 py-1 w-16 text-sm ${variantBatchEdits[v.id]?.stock !== undefined ? 'border-orange-300 bg-orange-50' : 'border-gray-200'}`} onChange={e => editVariantBatch(v.id, 'stock', Number(e.target.value))} />
                        </td>
                        <td className="py-2 pr-3">
                          <input type="number" defaultValue={v.stock_amoremio} className={`border rounded px-2 py-1 w-16 text-sm ${variantBatchEdits[v.id]?.stock_amoremio !== undefined ? 'border-orange-300 bg-orange-50' : 'border-gray-200'}`} onChange={e => editVariantBatch(v.id, 'stock_amoremio', Number(e.target.value))} />
                        </td>
                        <td className="py-2 pr-3">
                          <input type="number" defaultValue={v.price ?? ''} className={`border rounded px-2 py-1 w-24 text-sm ${variantBatchEdits[v.id]?.price !== undefined ? 'border-orange-300 bg-orange-50' : 'border-gray-200'}`} onChange={e => editVariantBatch(v.id, 'price', Number(e.target.value))} />
                        </td>
                        <td className="py-2 pr-3">
                          <input type="number" defaultValue={v.color_position ?? 0} className={`border rounded px-2 py-1 w-16 text-sm ${variantBatchEdits[v.id]?.color_position !== undefined ? 'border-orange-300 bg-orange-50' : 'border-gray-200'}`} onChange={e => editVariantBatch(v.id, 'color_position', Number(e.target.value))} />
                        </td>
                        <td className="py-2 flex items-center gap-2">
                          {variantBatchEdits[v.id] && (
                            <span className="text-orange-400 text-xs">•</span>
                          )}
                          <button onClick={() => deleteVariant(v.id)} className="text-red-400 hover:text-red-600 text-xs">✕</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Form agregar variante */}
              <div className="border border-gray-200 rounded p-4 space-y-4">
                <p className="text-sm font-medium">Agregar variante</p>
                <div className="space-y-1">
                  <label className="text-xs text-gray-500 uppercase tracking-wider">Color</label>
                  <input className={inputClass} placeholder="ej: Negro" value={varColor} onChange={e => setVarColor(e.target.value)} />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-gray-500 uppercase tracking-wider">Talles (seleccioná uno o más)</label>
                  <div className="flex gap-2 flex-wrap">
                    {['S', 'M', 'L', 'XL'].map(size => (
                      <button
                        key={size}
                        type="button"
                        onClick={() => {
                          const current = varSize.split(',').filter(Boolean)
                          const updated = current.includes(size) ? current.filter(s => s !== size) : [...current, size]
                          setVarSize(updated.join(','))
                        }}
                        className={`px-3 py-1.5 border rounded text-sm transition ${varSize.split(',').includes(size) ? 'bg-black text-white border-black' : 'bg-white text-black border-gray-300 hover:border-black'}`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs text-gray-500 uppercase tracking-wider">Stock local principal</label>
                    <input className={inputClass} type="number" value={varStock} onChange={e => setVarStock(Number(e.target.value))} />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-gray-500 uppercase tracking-wider">Stock Amoremio</label>
                    <input className={inputClass} type="number" value={varStockA} onChange={e => setVarStockA(Number(e.target.value))} />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-gray-500 uppercase tracking-wider">Precio (ARS)</label>
                    <input className={inputClass} placeholder="ej: 35000" value={varPrice} onChange={e => setVarPrice(e.target.value)} />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-gray-500 uppercase tracking-wider">Orden del color</label>
                    <input className={inputClass} type="number" placeholder="1 = primero" value={varColorPos} onChange={e => setVarColorPos(Number(e.target.value))} />
                  </div>
                </div>
                <button className={btnClass} onClick={addVariant} disabled={loading || !varColor || !varSize}>
                  {loading ? 'Guardando...' : `Agregar ${varSize.split(',').filter(Boolean).length > 1 ? `${varSize.split(',').filter(Boolean).length} variantes` : 'variante'}`}
                </button>
              </div>
            </>
          )}
        </div>
      )}

      {/* ── NUEVO PRODUCTO ── */}
      {tab === 'nuevo' && (
        <div className="border border-gray-200 rounded p-4 space-y-3 max-w-md">
          <p className="text-sm font-medium">Nuevo producto</p>
          <div className="space-y-1">
            <label className="text-xs text-gray-500 uppercase tracking-wider">Nombre *</label>
            <input className={inputClass} placeholder="ej: Pantalón Cargo" value={newName} onChange={e => setNewName(e.target.value)} />
          </div>
          <div className="space-y-1">
            <label className="text-xs text-gray-500 uppercase tracking-wider">Slug * (URL del producto)</label>
            <input className={inputClass} placeholder="ej: pantalon-cargo" value={newSlug} onChange={e => setNewSlug(e.target.value)} />
          </div>
          <div className="space-y-1">
            <label className="text-xs text-gray-500 uppercase tracking-wider">Descripción</label>
            <input className={inputClass} placeholder="ej: Pantalón oversize con bolsillos" value={newDesc} onChange={e => setNewDesc(e.target.value)} />
          </div>
          <div className="space-y-1">
            <label className="text-xs text-gray-500 uppercase tracking-wider">Posición (1 = primero en la tienda)</label>
            <input className={inputClass} type="number" value={newPos} onChange={e => setNewPos(Number(e.target.value))} />
          </div>
          <button className={btnClass} onClick={addProduct} disabled={loading}>Crear producto</button>
        </div>
      )}
    </div>
  )
}