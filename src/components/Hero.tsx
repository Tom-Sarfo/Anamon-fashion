import { Button } from "@/components/ui/button";
import heroImage from "@/assets/paaks-hero.jpg";

const Hero = () => {
  const handleExploreStory = () => {
    const storySection = document.getElementById("story");
    if (storySection) {
      storySection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Paaks luxury sandals"
          className="w-full h-full object-cover object-center opacity-40 animate-float scale-95 md:scale-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-white/60 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full text-center px-4 sm:px-8 lg:px-16 animate-fade-in">
        <div className="mb-6 inline-block">
          <div className="h-px w-24 bg-luxury-gold mx-auto mb-8" />
        </div>

        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 text-luxury-black tracking-tight">
          Introducing <span className="text-luxury-gold gold-glow">PAAKS</span>
        </h1>

        <p className="text-xl sm:text-2xl md:text-3xl text-gray-700 mb-12 font-light tracking-wide">
          A tribute to craftsmanship and legacy
        </p>

        <Button
          size="lg"
          onClick={handleExploreStory}
          className="bg-luxury-gold hover:bg-[hsl(var(--luxury-gold-muted))] text-luxury-black font-semibold px-10 py-6 text-lg transition-all duration-300 hover:shadow-[0_0_40px_hsl(var(--luxury-gold)/0.4)] hover:scale-105"
        >
          Explore the Story
        </Button>

        <div className="mt-16 animate-bounce">
          <div className="w-6 h-10 border-2 border-luxury-gold rounded-full mx-auto flex items-start justify-center p-2">
            <div className="w-1 h-3 bg-luxury-gold rounded-full" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
