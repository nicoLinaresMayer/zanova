// app/components/ProductsSection.tsx
import ProductsClient from "../products/ProductsClient";
import { getProducts } from "../../CMS/lib/getProducts";

export default async function ProductsSection() {
  const prods = await getProducts();

  return <ProductsClient products={prods} />;
}
