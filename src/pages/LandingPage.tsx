import Hero from "@/components/Hero";
import Story from "@/components/Story";
import ImageGallery from "@/components/ImageGallery";
// ANALYTICS DISABLED - Uncomment to enable
// import { MetaPixel } from "@/components/MetaPixel";
// import { GoogleAnalytics } from "@/components/GoogleAnalytics";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* ANALYTICS DISABLED - Uncomment to enable */}
      {/* <MetaPixel pixelId="1299330035267164" /> */}
      {/* <GoogleAnalytics measurementId="G-J8VM57QN5N" /> */}
      <Hero />
      <Story />
      <ImageGallery />
    </div>
  );
};

export default Index;
