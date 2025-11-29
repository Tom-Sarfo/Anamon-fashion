import { ProductCard } from "./ProductCard";
import { PRODUCTS } from "@/constants/products";
import { useNavigate } from "react-router";

export const ProductGrid = () => {
  const navigate = useNavigate();

  const handleProductSelect = (productId: string) => {
    navigate(`/product/${productId}`);
  };

  return (
    <section className="pb-20 md:pb-4">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {PRODUCTS.map((product, index) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            price={product.price}
            image={product.image}
            externalUrl={product.externalUrl}
            isBestSeller={index === 0 || index === 1 || index === 2}
            onProductSelect={handleProductSelect}
          />
        ))}
      </div>
    </section>
  );
};
