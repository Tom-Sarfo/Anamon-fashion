import { Button } from "@/components/ui/button";
import { MetaPixel } from "@/components/MetaPixel";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";

const keyBenefits = [
  {
    title: "Stronger & Longer Lasting",
    description:
      "NeoSuede handles everyday wear without fading, tearing, or weakening so you keep the same soft feel with far better durability.",
  },
  {
    title: "More Resistant to Water & Stains",
    description:
      "Unlike traditional suede, NeoSuede repels moisture so your shoes don’t get damaged or stained quickly and stay fresh much longer.",
  },
  {
    title: "Softer & More Comfortable",
    description:
      "NeoSuede keeps a premium, smooth hand-feel. It’s gentle on the skin and feels broken in from the very first wear.",
  },
  {
    title: "Easier to Maintain",
    description:
      "A quick light brush or wipe keeps NeoSuede clean no complicated maintenance routine or suede shy living required.",
  },
  {
    title: "Same Beautiful Look, Better Quality",
    description:
      "You still get the rich, elegant suede aesthetic, now paired with modern performance and daily durability.",
  },
];

export const NeoSuede = () => {
  return (
    <div className="min-h-screen bg-background">
      <MetaPixel pixelId="1299330035267164" />
      <GoogleAnalytics measurementId="G-J8VM57QN5N" />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        <section className="space-y-6 text-center">
          <p className="uppercase tracking-[0.3em] text-xs text-muted-foreground">
            Materials Spotlight
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground">
            NeoSuede™ by Tomus Footwear
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
            NeoSuede is our new and improved premium suede. It keeps the soft,
            luxurious feel you love, but with next level strength, resistance,
            and everyday ease. Think of it as suede upgraded for modern life.
          </p>
        </section>

        <section className="grid gap-8">
          <div className="rounded-2xl border border-border p-8 bg-card shadow-sm">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">
              What is NeoSuede?
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              NeoSuede is Tomus Footwear’s proprietary premium suede material.
              It delivers the same plush hand feel as traditional suede, yet it
              is engineered to be stronger, more durable, and far more resistant
              to everyday life. It’s the next generation of suede built for
              modern schedules, Ghanaian heat, and year round wear.
            </p>
          </div>

          <div className="rounded-2xl border border-border p-8 bg-card shadow-sm space-y-6">
            <h2 className="text-2xl font-semibold text-foreground">
              Key Benefits
            </h2>
            <div className="grid gap-6">
              {keyBenefits.map((benefit) => (
                <div
                  key={benefit.title}
                  className="rounded-xl border border-border/70 p-6 bg-background text-left"
                >
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="text-center space-y-4">
          <h2 className="text-2xl font-semibold text-foreground">
            Ready to feel NeoSuede for yourself?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore the latest Paaks collection crafted in NeoSuede for a daring
            blend of softness, strength, and everyday elegance.
          </p>
          <Button
            size="lg"
            className="bg-luxury-gold hover:bg-[hsl(var(--luxury-gold-muted))] text-luxury-black font-semibold"
            onClick={() => (window.location.href = "/products")}
          >
            Shop Paaks Collection
          </Button>
        </section>
      </div>
    </div>
  );
};

export default NeoSuede;
