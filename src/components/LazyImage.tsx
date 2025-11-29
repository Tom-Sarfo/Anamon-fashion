import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  onLoad?: () => void;
  onError?: () => void;
}

export const LazyImage = ({
  src,
  alt,
  className = "",
  onLoad,
  onError,
}: LazyImageProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  useEffect(() => {
    const img = new Image();

    img.onload = () => {
      setIsLoading(false);
      setImageSrc(src);
      onLoad?.();
    };

    img.onerror = () => {
      setIsLoading(false);
      setHasError(true);
      onError?.();
    };

    img.src = src;
  }, [src, onLoad, onError]);

  if (hasError) {
    return (
      <div
        className={`flex items-center justify-center bg-muted rounded-lg ${className}`}
      >
        <div className="text-center text-muted-foreground">
          <div className="w-8 h-8 mx-auto mb-2 bg-muted rounded-full flex items-center justify-center">
            <span className="text-xs">!</span>
          </div>
          <p className="text-xs">Failed to load</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div
        className={`flex items-center justify-center bg-muted rounded-lg ${className}`}
      >
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <img src={imageSrc || src} alt={alt} className={className} loading="lazy" />
  );
};
