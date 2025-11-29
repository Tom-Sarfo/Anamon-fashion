import detailImage from "@/assets/paaks-detail.jpg";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";

const Story = () => {
  const navigate = useNavigate();

  const handleShopNow = () => {
    navigate("/products");
  };

  return (
    <section
      id="story"
      className="relative py-24 sm:py-32 bg-white overflow-hidden"
    >
      {/* Gold texture overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(var(--luxury-gold))_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image */}
          <div className="order-2 lg:order-1 animate-slide-up">
            <div className="relative">
              <div className="absolute -inset-4 bg-luxury-gold opacity-20 blur-2xl rounded-full" />
              <img
                src={detailImage}
                alt="Paaks craftsmanship detail"
                className="relative w-full h-auto rounded-lg shadow-luxury"
              />
            </div>
          </div>

          {/* Story Text */}
          <div className="order-1 lg:order-2 space-y-8 animate-fade-in">
            <div>
              <div className="h-px w-16 bg-luxury-gold mb-6" />
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-luxury-black mb-6">
                The Story of <span className="text-luxury-gold">Paaks</span>
              </h2>
            </div>

            <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
              <p>
                Every cut tells a story. Every detail honors a master. The Paaks
                design is more than footwear, it's a living tribute to the
                craftsman who taught us the sacred art of shoemaking.
              </p>

              <p>
                Born in the heart of Accra, this collection embodies the
                patience, precision, and pride passed down through generations.
                Each pair carries the spirit of mentorship, the weight of
                wisdom, and the beauty of legacy preserved.
              </p>

              <p className="text-luxury-gold font-semibold">
                When you wear Paaks, you walk in the footsteps of tradition
                while forging your own path forward.
              </p>
            </div>

            <div className="pt-6">
              <Button
                onClick={handleShopNow}
                variant="outline"
                className="border-2 border-luxury-gold px-6 py-3 rounded-full bg-transparent hover:bg-luxury-gold hover:text-luxury-black text-luxury-gold font-semibold tracking-wide transition-all duration-300"
              >
                Shop Paaks Collection
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Story;
