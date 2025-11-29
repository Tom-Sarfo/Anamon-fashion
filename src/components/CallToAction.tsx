import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";

const CallToAction = () => {
  const navigate = useNavigate();

  const handleShopNow = () => {
    navigate("/products");
  };

  return (
    <section className="relative py-32 sm:py-40 bg-gradient-to-br from-white via-[hsl(var(--luxury-cream))] to-white overflow-hidden">
      {/* Animated gold glow */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-luxury-gold opacity-10 blur-[120px] animate-pulse" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Main Message */}
        <div className="mb-16 animate-fade-in">
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 text-luxury-black">
            <span>Crafted in </span>
            <span className="text-luxury-gold gold-glow">Accra</span>
          </h2>
          <p className="text-4xl sm:text-5xl lg:text-6xl font-bold text-luxury-black">
            Designed for the <span className="text-luxury-gold gold-glow">world</span>
          </p>
        </div>

        {/* Description */}
        <p className="text-xl sm:text-2xl text-gray-700 mb-12 max-w-3xl mx-auto leading-relaxed animate-slide-up">
          Step into luxury that honors tradition while embracing modernity. The Paaks collection is now available.
        </p>

        {/* CTA Button */}
        <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <Button 
            size="lg"
            onClick={handleShopNow}
            className="bg-luxury-gold hover:bg-[hsl(var(--luxury-gold-muted))] text-luxury-black font-bold px-12 py-7 text-xl transition-all duration-300 hover:shadow-[0_0_60px_hsl(var(--luxury-gold)/0.5)] hover:scale-105"
          >
            Shop the Paaks Collection
          </Button>
        </div>

        {/* Footer accent */}
        <div className="mt-20 flex items-center justify-center gap-6 opacity-60">
          <div className="h-px w-32 bg-luxury-gold" />
          <svg className="w-6 h-6 text-luxury-gold" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2l2.4 7.4h7.6l-6 4.6 2.3 7-6.3-4.7-6.3 4.7 2.3-7-6-4.6h7.6z" />
          </svg>
          <div className="h-px w-32 bg-luxury-gold" />
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
