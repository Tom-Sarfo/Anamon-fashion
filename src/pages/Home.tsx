import { ProductGrid } from "@/components/ProductGrid";
import { HeroSection } from "@/components/HeroSection";
import { StoriesSection } from "@/components/StoriesSection";

export const Home = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="px-4">
        <HeroSection />
      </div>

      <StoriesSection />

      <ProductGrid />
    </div>
  );
};
