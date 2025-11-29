import { ProductGrid } from "@/components/ProductGrid";

export const Products = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Page Header */}
      <div className="p-4 md:p-8 pb-6">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
          Our Products
        </h1>
        <p className="text-lg text-muted-foreground">
          Discover our latest collection of premium footwear
        </p>
      </div>

      {/* Products Grid */}
      <ProductGrid />
    </div>
  );
};
