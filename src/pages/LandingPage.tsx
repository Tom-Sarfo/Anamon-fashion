import Authenticity from "@/components/Authenticity";
import CallToAction from "@/components/CallToAction";
import Craft from "@/components/Craft";
import Hero from "@/components/Hero";
import Story from "@/components/Story";
import { MetaPixel } from "@/components/MetaPixel";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <MetaPixel pixelId="1299330035267164" />
      <GoogleAnalytics measurementId="G-J8VM57QN5N" />
      <Hero />
      <Story />
      <Craft />
      <Authenticity />
      <CallToAction />
    </div>
  );
};

export default Index;
