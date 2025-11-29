import { cn } from "@/lib/utils";

interface SizeSelectorProps {
  sizes: string[];
  selectedSize: string | null;
  onSizeSelect: (size: string) => void;
  className?: string;
}

export const SizeSelector = ({
  sizes,
  selectedSize,
  onSizeSelect,
  className,
}: SizeSelectorProps) => {
  return (
    <div className={cn("space-y-3", className)}>
      <div className="flex flex-wrap gap-2">
        {sizes.map((size) => (
          <button
            key={size}
            onClick={() => onSizeSelect(size)}
            className={cn(
              "flex h-10 min-w-[3rem] items-center justify-center rounded-lg border-2 px-3 text-sm font-medium transition-all hover:border-primary/50",
              selectedSize === size
                ? "border-primary bg-primary text-primary-foreground"
                : "border-gray-300 bg-white text-gray-900 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700"
            )}
            aria-label={`Select size ${size}`}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
};
