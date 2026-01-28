import ProductsClient from "../components/ProductsClient";
import { getProducts } from "@/CMS/lib/getProducts";

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <section className="bg-white text-black">
      <ProductsClient products={products} />
    </section>
  );
}