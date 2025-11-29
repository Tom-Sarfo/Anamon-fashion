import { Button } from "@/components/ui/button";
import { LazyImage } from "./LazyImage";
import { useNavigate } from "react-router";

export const HeroSection = () => {
  const navigate = useNavigate();

  const handleShopNow = () => {
    navigate("/products");
  };

  return (
    <section className="mt-4 mb-6 p-6 rounded-2xl bg-[hsl(var(--hero-bg))] relative overflow-hidden flex flex-col md:flex-row items-stretch min-h-[320px]">
      {/* Text Content */}
      <div className="relative z-10 flex-1 flex flex-col justify-center md:items-start items-center text-center md:text-left">
        <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-[hsl(var(--hero-text))] mb-2">
          Be Rare!
        </h2>
        <p className="text-base md:text-lg lg:text-xl xl:text-2xl text-[hsl(var(--hero-text))]/80 mb-6 whitespace-pre-line">
          Join the elite and stand out!
        </p>
        <Button
          className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-8 py-3 lg:px-10 lg:py-4 lg:text-lg"
          onClick={handleShopNow}
        >
          Shop Now
        </Button>
      </div>
      {/* Hero Image */}
      <div className="relative flex-1 min-h-[180px] md:min-h-0 md:static md:w-2/5 w-full h-40 md:h-auto mt-4 md:mt-0">
        <LazyImage
          src="https://res.cloudinary.com/dki2r1gnf/image/upload/v1726297052/TOMUS-46_rdl5pf.jpg"
          alt="Featured Shoe"
          className="w-full h-full object-cover rounded-xl"
        />
      </div>
    </section>
  );
};
