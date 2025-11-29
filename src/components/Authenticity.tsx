const Authenticity = () => {
    return (
      <section className="relative py-24 sm:py-32 bg-white overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[linear-gradient(45deg,hsl(var(--luxury-gold))_1px,transparent_1px),linear-gradient(-45deg,hsl(var(--luxury-gold))_1px,transparent_1px)] bg-[size:40px_40px]" />
        </div>
  
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Seal */}
          <div className="mb-12 animate-fade-in">
            <div className="inline-block relative">
              <div className="w-48 h-48 sm:w-56 sm:h-56 mx-auto border-4 border-luxury-gold rounded-full flex items-center justify-center relative">
                <div className="absolute inset-0 bg-luxury-gold opacity-10 rounded-full blur-xl animate-pulse" />
                <div className="relative text-center p-8">
                  <p className="text-luxury-gold font-bold text-3xl tracking-[0.2em] uppercase">
                    The Golden Goat
                  </p>
                </div>
              </div>
            </div>
          </div>
  
          {/* Text */}
          <div className="space-y-6 animate-slide-up">
            <p className="text-2xl sm:text-3xl text-gray-700 leading-relaxed">
              Each pair of Paaks carries the seal of authenticity which signifies that the pair was crafted by Tomus a mark of origin, precision, and authenticity.
            </p>
            
            <p className="text-lg text-gray-600">
              From concept to creation, every step is guided by the principles of integrity, craftsmanship, and pride in our heritage.
            </p>
          </div>
  
          {/* Decorative elements */}
          <div className="mt-12 flex items-center justify-center gap-4">
            <div className="h-px w-24 bg-luxury-gold" />
            <div className="w-2 h-2 bg-luxury-gold rounded-full" />
            <div className="h-px w-24 bg-luxury-gold" />
          </div>
        </div>
      </section>
    );
  };
  
  export default Authenticity;
  