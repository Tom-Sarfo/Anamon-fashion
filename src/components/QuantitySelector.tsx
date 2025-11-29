import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuantitySelectorProps {
  quantity: number;
  onQuantityChange: (quantity: number) => void;
  min?: number;
  max?: number;
  className?: string;
}

export const QuantitySelector = ({
  quantity,
  onQuantityChange,
  min = 1,
  max = 99,
  className,
}: QuantitySelectorProps) => {
  const handleIncrement = () => {
    if (quantity < max) {
      onQuantityChange(quantity + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > min) {
      onQuantityChange(quantity - 1);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= min && value <= max) {
      onQuantityChange(value);
    }
  };

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <button
        onClick={handleDecrement}
        disabled={quantity <= min}
        className={cn(
          "flex h-8 w-8 items-center justify-center rounded-md border border-gray-300 transition-all hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600 dark:hover:bg-gray-700",
          quantity > min && "hover:border-primary"
        )}
        aria-label="Decrease quantity"
      >
        <Minus className="h-4 w-4" />
      </button>

      <input
        type="number"
        value={quantity.toString().padStart(2, "0")}
        onChange={handleInputChange}
        min={min}
        max={max}
        className="w-12 text-center text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20"
        aria-label="Quantity"
      />

      <button
        onClick={handleIncrement}
        disabled={quantity >= max}
        className={cn(
          "flex h-8 w-8 items-center justify-center rounded-md border border-gray-300 transition-all hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600 dark:hover:bg-gray-700",
          quantity < max && "hover:border-primary"
        )}
        aria-label="Increase quantity"
      >
        <Plus className="h-4 w-4" />
      </button>
    </div>
  );
};
