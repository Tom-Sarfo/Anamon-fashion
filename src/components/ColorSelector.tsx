import { cn } from "@/lib/utils";
import { ProductColor } from "@/constants/products";

interface ColorSelectorProps {
  colors: ProductColor[];
  selectedColor: ProductColor | null;
  onColorSelect: (color: ProductColor) => void;
  className?: string;
}

export const ColorSelector = ({
  colors,
  selectedColor,
  onColorSelect,
  className,
}: ColorSelectorProps) => {
  return (
    <div className={cn("space-y-3", className)}>
      <h3 className="text-left text-sm font-semibold text-gray-900 dark:text-gray-100">
        Color
      </h3>
      <div className="flex flex-wrap gap-3">
        {colors.map((color) => (
          <button
            key={color.name}
            onClick={() => onColorSelect(color)}
            className={cn(
              "group relative flex h-12 w-12 items-center justify-center rounded-full border-2 transition-all hover:scale-110",
              selectedColor?.name === color.name
                ? "border-primary ring-2 ring-primary/20"
                : "border-gray-300 hover:border-gray-400 dark:border-gray-600 dark:hover:border-gray-500"
            )}
            aria-label={`Select color ${color.name}`}
          >
            <div
              className="h-8 w-8 rounded-full"
              style={{ backgroundColor: color.value }}
            />
            {selectedColor?.name === color.name && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-2 w-2 rounded-full bg-white shadow-sm" />
              </div>
            )}
            <span className="sr-only">{color.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
