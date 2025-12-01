import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
import heroVideo from "@/assets/fvneck_video.mp4";

const Hero = () => {
  const navigate = useNavigate();

  const handleShopWomen = () => {
    navigate("/products");
  };

  const handleShopMen = () => {
    navigate("/products");
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Gradient Background - White blend */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-white to-gray-50" />

      {/* Mobile Video Hero - Only visible on mobile */}
      <div className="md:hidden absolute inset-0 w-full h-full">
        <video
          src={heroVideo}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-white/40 to-transparent" />
      </div>

      {/* Desktop Image Hero - Only visible on desktop */}
      <div className="hidden md:block absolute right-0 top-0 bottom-0 w-1/2 lg:w-3/5 flex items-center justify-end pr-8 lg:pr-16">
        <div className="relative h-full w-full flex items-center justify-center">
          <img
            src="https://res.cloudinary.com/dki2r1gnf/image/upload/v1764584313/ChatGPT_Image_Dec_1_2025_10_18_11_AM_v23fpl.png"
            alt="Anamon Fashion"
            className="h-full w-auto max-w-full object-contain object-right"
          />
        </div>
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 w-full h-screen flex items-center justify-center">

        {/* Text Overlay at Bottom - Mobile optimized */}
        <div className="absolute bottom-0 left-0 right-0 z-20 px-4 sm:px-6 md:px-12 lg:px-16 pb-6 sm:pb-8 md:pb-16 lg:pb-20">
          <div className="max-w-2xl">
            {/* Main Title - Better mobile sizing */}
            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-black mb-3 sm:mb-4 md:mb-6 leading-tight">
              <span className="block">Anamon</span>
              <span className="block ml-0 md:ml-4">Fashion</span>
            </h1>

            {/* Tagline */}
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-700 mb-4 sm:mb-6 md:mb-8 font-light italic">
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

export default Hero;
