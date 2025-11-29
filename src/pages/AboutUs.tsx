import { Users, Award, Globe, Heart } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const AboutUs = () => {
  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          About Tomus Footwear
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          We’re a modern African brand built on resilience, creativity, and
          craftsmanship. At Tomus Footwear, we create shoes that blend local
          heritage with global quality made to last, made to stand out.
        </p>
      </div>

      {/* Mission Section */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="h-6 w-6 text-luxury-gold" />
            Our Mission
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground leading-relaxed">
            Tomus Footwear exists to redefine African craftsmanship by creating
            premium, innovative footwear that tells a story of resilience,
            style, and identity. Born from the hustle of the streets and shaped
            by a deep understanding of local needs, we design every pair to
            inspire confidence, celebrate heritage, and compete with the world’s
            best proving that excellence can come from anywhere, and walk
            everywhere.
          </p>
        </CardContent>
      </Card>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Award className="h-5 w-5 text-luxury-gold" />
              Quality
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Premium materials and expert craftsmanship ensure every pair meets
              our high standards.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Globe className="h-5 w-5 text-luxury-gold" />
              Sustainability
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Eco-friendly materials and responsible manufacturing practices for
              a better future.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Users className="h-5 w-5 text-luxury-gold" />
              Community
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Building connections with our customers and supporting local
              communities.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Team Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Our Team</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="text-center">
              <div className="w-24 h-24 bg-muted rounded-full mx-auto mb-4 flex items-center justify-center">
                <Users className="h-12 w-12 text-muted-foreground" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Thomas Davis Sarfo & Erasmus Simons</h3>
              <p className="text-muted-foreground">Founders</p>
            </div>
            <div className="text-center">
              <div className="w-24 h-24 bg-muted rounded-full mx-auto mb-4 flex items-center justify-center">
                <Users className="h-12 w-12 text-muted-foreground" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Mark Asirifi</h3>
              <p className="text-muted-foreground">Head of Creative</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
