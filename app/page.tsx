import HeroSection from "./components/HeroSection";
import ProductsSection from "./components/ProductsSection";
import { getProducts } from "@/CMS/lib/getProducts";

export default async function HomePage() {
  const products = await getProducts();

  return (
    <>
      <HeroSection />
      <section>
      <ProductsSection products={products} />
      </section>
    </>
  );
}