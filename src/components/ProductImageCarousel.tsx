import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { LazyImage } from "./LazyImage";
import { cn } from "@/lib/utils";

interface ProductImageCarouselProps {
  images: string[];
  productName: string;
  className?: string;
}

export const ProductImageCarousel = ({
  images,
  productName,
  className,
}: ProductImageCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToImage = (index: number) => {
    setCurrentIndex(index);
  };

  // Touch/swipe handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
    setTranslateX(0);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const currentX = e.touches[0].clientX;
    const diff = currentX - startX;
    setTranslateX(diff);
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);

    if (Math.abs(translateX) > 50) {
      if (translateX > 0) {
        prevImage();
      } else {
        nextImage();
      }
    }
    setTranslateX(0);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        prevImage();
      } else if (e.key === "ArrowRight") {
        nextImage();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Debug logging
  useEffect(() => {
    console.log("ProductImageCarousel - Images:", images);
    console.log("ProductImageCarousel - Current Index:", currentIndex);
    console.log("ProductImageCarousel - Current Image:", images[currentIndex]);
  }, [images, currentIndex]);

  if (!images || images.length === 0) {
    return (
      <div
        className={cn(
          "relative aspect-square bg-gray-100 rounded-lg",
          className
        )}
      >
        <div className="flex items-center justify-center h-full">
          <p className="text-gray-500">No images available</p>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("relative", className)}>
      {/* Main Image Container */}
      <div
        ref={carouselRef}
        className="relative aspect-square overflow-hidden rounded-lg bg-gray-100"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Main Image - Simplified approach */}
        <div className="relative h-full w-full">
          {images.map((image, index) => (
            <div
              key={index}
              className={cn(
                "absolute inset-0 transition-opacity duration-300",
                index === currentIndex ? "opacity-100" : "opacity-0"
              )}
            >
              <LazyImage
                src={image}
                alt={`${productName} - Image ${index + 1}`}
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </div>

        {/* Navigation Arrows - Desktop */}
        {images.length > 1 && (
          <div className="absolute inset-0 hidden items-center justify-between p-4 lg:flex">
            <button
              onClick={prevImage}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/80 shadow-lg transition-all hover:bg-white"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={nextImage}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/80 shadow-lg transition-all hover:bg-white"
              aria-label="Next image"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        )}

        {/* Image Counter - Mobile */}
        {images.length > 1 && (
          <div className="absolute bottom-4 left-4 rounded-full bg-black/50 px-3 py-1 text-sm text-white lg:hidden">
            {currentIndex + 1} / {images.length}
          </div>
        )}

        {/* Dots Indicator - Mobile */}
        {images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2 lg:hidden">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => goToImage(index)}
                className={cn(
                  "h-2 w-2 rounded-full transition-all",
                  index === currentIndex
                    ? "bg-white"
                    : "bg-white/50 hover:bg-white/75"
                )}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Thumbnails - Desktop */}
      {images.length > 1 && (
        <div className="mt-4 hidden grid-cols-4 gap-2 lg:grid">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => goToImage(index)}
              className={cn(
                "aspect-square overflow-hidden rounded-lg border-2 transition-all hover:opacity-80",
                index === currentIndex ? "border-primary" : "border-transparent"
              )}
            >
              <LazyImage
                src={image}
                alt={`${productName} thumbnail ${index + 1}`}
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
