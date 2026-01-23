import products from "@/app/data/products.json";
import ProductGallery from "./components/ProductGallery";
import ProductInfo from "./components/ProductInfo";
import AddToCartBar from "./components/AddToCartBar";

export async function generateStaticParams() {
  return products.map(p => ({ slug: p.slug }));
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const product = products.find(p => p.slug === slug);

  if (!product) {
    return <div className="p-8">Producto no encontrado</div>;
  }

  return (
    <div className="pb-24"> {/* espacio para CTA fijo */}
      <ProductGallery images={product.images} />
      <ProductInfo product={product} />
      <AddToCartBar />
    </div>
  );
}
