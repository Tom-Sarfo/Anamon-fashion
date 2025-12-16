import proudGirl from "@/assets/proud-girl.png";
import skateGirls from "@/assets/skate-girls.png";
import africanGirl from "@/assets/african-girl.png";
import hoodGang from "@/assets/hood-gang.png";


import { LazyImage } from "./LazyImage";

const ImageGallery = () => {
  return (
    <section className="relative py-16 sm:py-24 md:py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="h-px w-16 bg-black mx-auto mb-6" />
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-4">
            Our Collection
          </h2>
          <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto">
            Showcasing Ghana's vibrant colors in every design
          </p>
        </div>

        {/* Image Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
          {/* First Image - Yellow Cheer */}
          <div className="group relative overflow-hidden rounded-lg animate-fade-in">
            <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px]">
              <LazyImage
                src={proudGirl}
                alt="Yellow cheer outfit with Ghana colors"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <p className="text-white font-semibold text-lg">
                  Cheer Leader Collection
                </p>
              </div>
            </div>
          </div>

          {/* Second Image - Baseball Lady */}
          <div
            className="group relative overflow-hidden rounded-lg animate-fade-in"
            style={{ animationDelay: "0.1s" }}
          >
            <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px]">
              <LazyImage
                src={skateGirls}
                alt="Baseball style outfit with Ghana colors"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <p className="text-white font-semibold text-lg">
                  Lifestyle Collection
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Gallery Section - Smaller Images */}
        <div className="mt-8 md:mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {/* Repeat images in smaller format for visual interest */}
          <div className="group relative overflow-hidden rounded-lg animate-fade-in">
            <div className="relative w-full h-[250px] md:h-[300px]">
              <LazyImage
                src={proudGirl}
                alt="Yellow cheer outfit"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>
          </div>

          <div
            className="group relative overflow-hidden rounded-lg animate-fade-in"
            style={{ animationDelay: "0.1s" }}
          >
            <div className="relative w-full h-[250px] md:h-[300px]">
              <LazyImage
                src={skateGirls}
                alt="Baseball style outfit"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>
          </div>

          <div
            className="group relative overflow-hidden rounded-lg animate-fade-in"
            style={{ animationDelay: "0.2s" }}
          >
            <div className="relative w-full h-[250px] md:h-[300px]">
              <LazyImage
                src={africanGirl}
                alt="Yellow cheer outfit"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>
          </div>

          <div
            className="group relative overflow-hidden rounded-lg animate-fade-in"
            style={{ animationDelay: "0.3s" }}
          >
            <div className="relative w-full h-[250px] md:h-[300px]">
              <LazyImage
                src={hoodGang}
                alt="Baseball style outfit"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImageGallery;

