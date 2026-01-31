export default function Products() {
  return (
    <section className="bg-white text-black py-24 px-6">
      
      {/* Header de sección */}
      <div className="max-w-6xl mx-auto mb-16">
        <span className="block text-xs uppercase tracking-[0.3em] text-neutral-600 mb-4">
          Colección
        </span>

        <h2 className="font-zanova text-4xl md:text-5xl">
          Drops disponibles
        </h2>
      </div>

      {/* Grid de productos */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        
        {/* Producto 1 */}
        <div className="group">
          <div className="aspect-[3/4] bg-neutral-100 overflow-hidden border border-neutral-200">
            <img
              src="/product1.png"
              alt="Hoodie Zanova Black"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>

          <div className="mt-4">
            <h3 className="text-lg font-medium">
              Hoodie Zanova Black
            </h3>
            <p className="text-sm text-neutral-600">
              Edición limitada
            </p>
          </div>
        </div>

        {/* Producto 2 */}
        <div className="group">
          <div className="aspect-[3/4] bg-neutral-100 overflow-hidden border border-neutral-200">
            <img
              src="/product2.png"
              alt="Tee Zanova Core"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>

          <div className="mt-4">
            <h3 className="text-lg font-medium">
              Tee Zanova Core
            </h3>
            <p className="text-sm text-neutral-600">
              Drop 01
            </p>
          </div>
        </div>

      </div>
    </section>
  )
}
