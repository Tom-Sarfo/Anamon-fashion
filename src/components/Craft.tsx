import { Link } from "react-router";
import soleImage from "@/assets/paaks-sole.jpg";
import greyImage from "@/assets/paaks-grey.jpg";
import blackImage from "@/assets/paaks-black.jpg";

const Craft = () => {
  return (
    <section className="relative py-24 sm:py-32 bg-gradient-to-b from-white to-[hsl(var(--luxury-cream))]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 animate-slide-up">
          <div className="h-px w-16 bg-luxury-gold mx-auto mb-6" />
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-luxury-black mb-6">
            NeoSuede<sup>TM</sup>
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            <Link
              to="/neosuede"
              className="text-luxury-gold underline underline-offset-4 hover:text-[hsl(var(--luxury-gold-muted))]"
            >
              NeoSuede
            </Link>{" "}
            is the upper material of choice for Paaks. Engineered to last
            longer, crafted for modern luxury
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="group relative overflow-hidden rounded-xl animate-fade-in">
            <img
              src={soleImage}
              alt="Paaks sole detail"
              className="w-full h-[28rem] md:h-[32rem] object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white/85 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
              <p className="text-luxury-gold font-semibold">Premium Leather</p>
            </div>
          </div>

          <div
            className="group relative overflow-hidden rounded-xl animate-fade-in"
            style={{ animationDelay: "0.1s" }}
          >
            <img
              src={greyImage}
              alt="Paaks grey variant"
              className="w-full h-[28rem] md:h-[32rem] object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white/85 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
              <p className="text-luxury-gold font-semibold">Water Resistant</p>
            </div>
          </div>

          <div
            className="group relative overflow-hidden rounded-xl animate-fade-in"
            style={{ animationDelay: "0.2s" }}
          >
            <img
              src={blackImage}
              alt="Paaks black variant"
              className="w-full h-[28rem] md:h-[32rem] object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white/85 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
              <p className="text-luxury-gold font-semibold">
                Exceptional Durability
              </p>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {[
            { title: "Sustainable", description: "Eco-conscious materials" },
            { title: "Durable", description: "Built to endure" },
            {
              title: "Effortless Care",
              description: "Easy to clean and maintain",
            },
            { title: "Waterproof", description: "Designed to repel moisture" },
          ].map((feature, index) => (
            <div
              key={index}
              className="animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-16 h-16 mx-auto mb-4 border-2 border-luxury-gold rounded-full flex items-center justify-center">
                <div className="w-8 h-8 bg-luxury-gold rounded-full" />
              </div>
              <h3 className="text-xl font-semibold text-luxury-gold mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Craft;
