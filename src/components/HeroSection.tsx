import { Button } from "@/components/ui/button";
import { LazyImage } from "./LazyImage";
import { useNavigate } from "react-router";

export const HeroSection = () => {
  const navigate = useNavigate();

  const handleShopWomen = () => {
    navigate("/products");
  };

  const handleShopMen = () => {
    navigate("/products");
  };

  return (
    <section className="relative min-h-[500px] sm:min-h-[600px] md:min-h-[700px] lg:min-h-[800px] flex items-center justify-center overflow-hidden rounded-2xl">
      {/* Gradient Background - White blend */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-white to-gray-50 rounded-2xl" />

      {/* Main Content Container */}
      <div className="relative z-10 w-full h-full flex items-center justify-center">
        {/* Model/Product Image - Better mobile positioning */}
        <div className="absolute right-0 top-0 bottom-0 w-full md:w-1/2 lg:w-3/5 flex items-center justify-center md:justify-end pr-2 sm:pr-4 md:pr-8 lg:pr-12">
          <div className="relative h-full w-full flex items-center justify-center">
            <LazyImage
              src="https://res.cloudinary.com/dki2r1gnf/image/upload/v1764415094/H734377414ac24fa9a4e5f912a0a90d97s_feq278.avif"
              alt="Anamon Fashion"
              className="h-[60vh] sm:h-[70vh] md:h-full w-auto max-w-[85%] sm:max-w-[90%] md:max-w-full object-contain object-center md:object-right"
            />
          </div>
        </div>

        {/* Text Overlay at Bottom - Mobile optimized */}
        <div className="absolute bottom-0 left-0 right-0 z-20 px-4 sm:px-6 md:px-8 lg:px-12 pb-6 sm:pb-8 md:pb-12 lg:pb-16">
          <div className="max-w-2xl">
            {/* Main Title - Better mobile sizing */}
            <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-black mb-3 sm:mb-4 md:mb-6 leading-tight">
              <span className="block">Anamon</span>
              <span className="block ml-0 md:ml-4">Fashion</span>
            </h2>

            {/* Tagline */}
            <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-700 mb-4 sm:mb-6 font-light italic">
              Wear your country colors with pride
            </p>

            {/* Action Buttons - Full width on mobile */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Button
                onClick={handleShopWomen}
                variant="outline"
                className="bg-transparent border-2 border-black text-black hover:bg-black hover:text-white px-6 py-3 sm:py-4 md:px-8 md:py-5 text-sm sm:text-base md:text-lg font-medium transition-all duration-300 rounded-none w-full sm:w-fit"
              >
                Shop Women
              </Button>
              <Button
                onClick={handleShopMen}
                variant="outline"
                className="bg-transparent border-2 border-black text-black hover:bg-black hover:text-white px-6 py-3 sm:py-4 md:px-8 md:py-5 text-sm sm:text-base md:text-lg font-medium transition-all duration-300 rounded-none w-full sm:w-fit"
              >
                Shop Men
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
