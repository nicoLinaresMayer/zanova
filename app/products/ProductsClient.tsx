"use client";
import ProductCard from "./ProductCard"


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


export default function ProductsClient({
  products,
}: {
  products: Product[];
}) {

  const fakeProducts = Array.from({ length: 10 }).flatMap(() => products);

  return (
    <div className = 'grid grid-cols-2 '>
      {fakeProducts.map((p, i) => (
  <ProductCard key={`${p._id}-${i}`} product={p} />
))}
    </div>
  );
}
