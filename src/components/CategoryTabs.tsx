import { useState } from "react";
import { Button } from "@/components/ui/button";

const categories = ["All", "Half shoes", "Two straps", "Sandals"];

export const CategoryTabs = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  return (
    <section className="px-4 mb-6">
      <h3 className="text-xl font-semibold text-foreground mb-4">Category</h3>
      <div className="flex gap-2 overflow-x-auto pb-2">
        {categories.map((category) => (
          <Button
            key={category}
            variant={activeCategory === category ? "default" : "secondary"}
            className={`rounded-full px-6 py-2 whitespace-nowrap ${
              activeCategory === category 
                ? "bg-primary text-primary-foreground" 
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </Button>
        ))}
      </div>
    </section>
  );
};