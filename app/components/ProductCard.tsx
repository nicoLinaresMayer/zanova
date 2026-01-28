type SanityImage = {
  asset?: {
    url: string;
  };
};

type Product = {
  _id: string;
  title: string;
  price: number;
  images?: SanityImage[];
};

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="p-4">

      <div className="w-full aspect-[4/5] bg-neutral-100 overflow-hidden">
        {product.images?.[0]?.asset?.url && (
          <img
            src={product.images[0].asset.url}
            alt={product.title}
            className="w-full h-full object-cover"
          />
        )}
      </div>

      <div className="mt-3 space-y-1 text-sm">
        <p className="font-medium leading-tight">
          {product.title}
        </p>

        <p className="text-neutral-500">
          ${product.price}
        </p>
      </div>
    </div>
  );
}
