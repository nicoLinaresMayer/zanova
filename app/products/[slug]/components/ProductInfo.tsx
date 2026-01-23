export default function ProductInfo({ product }: any) {
  return (
    <div className="px-6 py-8 space-y-2">
      <p className="text-xs tracking-widest text-gray-500">
        {product.sku}
      </p>

      {product.isNew && (
        <p className="text-xs uppercase tracking-widest">
          New
        </p>
      )}

      <h1 className="text-2xl font-medium">
        {product.name}
      </h1>

      <p className="text-lg mt-2">
        ${product.price}
      </p>
    </div>
  );
}
