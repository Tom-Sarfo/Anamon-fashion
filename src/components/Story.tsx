import { ProductCard } from "./ProductCard";
import { PRODUCTS } from "@/constants/products";
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";

const Story = () => {
  const navigate = useNavigate();

  const handleShopNow = () => {
    navigate("/products");
  };

  const handleProductSelect = (productId: string) => {
    navigate(`/product/${productId}`);
  };

  // Get featured products (first 4 products)
  const featuredProducts = PRODUCTS.slice(0, 4);

  return (
    <section
      id="collection"
      className="relative pt-8 sm:pt-12 md:pt-16 pb-16 sm:pb-20 md:pb-24 bg-white overflow-hidden"
    >
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="h-px w-16 bg-black mx-auto mb-6" />
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-4">
            Anamon Collection
          </h2>
          <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto">
            Discover our curated selection of premium fashion pieces celebrating
            Ghana's vibrant colors
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mb-8 md:mb-12">
          {featuredProducts.map((product, index) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              image={product.image}
              externalUrl={product.externalUrl}
              isBestSeller={index < 2}
              onProductSelect={handleProductSelect}
            />
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Button
            onClick={handleShopNow}
            variant="outline"
            className="border-2 border-black px-8 py-3 rounded-full bg-transparent hover:bg-black hover:text-white text-black font-semibold tracking-wide transition-all duration-300"
          >
            View All Products
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Story;
