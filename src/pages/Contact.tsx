import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useContactForm } from "@/hooks/use-contact-form";
// ANALYTICS DISABLED - Uncomment to enable
// import { trackContact } from "@/components/MetaPixel";
// import { trackContact as trackGAContact } from "@/components/GoogleAnalytics";

export const Contact = () => {
  const {
    formData,
    isLoading,
    isSubmitted,
    error,
    updateField,
    submitForm,
    resetForm,
  } = useContactForm();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitForm();
    
    // ANALYTICS DISABLED - Uncomment to enable
    // Track contact form submission for Meta Pixel
    // trackContact();
    
    // Track contact form submission for Google Analytics
    // trackGAContact();
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background p-4 md:p-8">
        <div className="max-w-md mx-auto text-center">
          <div className="mb-6">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-foreground mb-2">
              Message Sent Successfully!
            </h1>
            <p className="text-muted-foreground mb-6">
              Thank you for contacting us. We'll get back to you as soon as
              possible.
            </p>
            <Button onClick={resetForm} className="w-full">
              Send Another Message
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          Get in Touch
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Have questions? We'd love to hear from you. Send us a message and
          we'll respond as soon as possible.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Contact Form */}
        <Card>
          <CardHeader>
            <CardTitle>Send us a Message</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    First Name *
                  </label>
                  <Input
                    placeholder="John"
                    value={formData.firstName}
                    onChange={(e) => updateField("firstName", e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Last Name *
                  </label>
                  <Input
                    placeholder="Doe"
                    value={formData.lastName}
                    onChange={(e) => updateField("lastName", e.target.value)}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">
                  Email *
                </label>
                <Input
                  type="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">
                  Subject *
                </label>
                <Input
                  placeholder="How can we help?"
                  value={formData.subject}
                  onChange={(e) => updateField("subject", e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">
                  Message *
                </label>
                <Textarea
                  placeholder="Tell us more about your inquiry..."
                  className="min-h-[120px]"
                  value={formData.message}
                  onChange={(e) => updateField("message", e.target.value)}
                  required
                />
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-luxury-gold" />
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-muted-foreground">tomusacc@gmail.com</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-luxury-gold" />
                <div>
                  <p className="font-medium">Phone</p>
                  <p className="text-muted-foreground">+233 (054) 964-9770</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-luxury-gold" />
                <div>
                  <p className="font-medium">Address</p>
                  <p className="text-muted-foreground">
                    Nsuobri Street
                    <br />
                    Accra, Ghana
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-luxury-gold" />
                <div>
                  <p className="font-medium">Business Hours</p>
                  <p className="text-muted-foreground">
                    Mon - Fri: 9:00 AM - 6:00 PM
                    <br />
                    Sat: 10:00 AM - 4:00 PM
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* FAQ Section */}
          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">
                  Is it original Birkenstock?
                </h4>
                <p className="text-sm text-muted-foreground">
                  It's not Birkenstock, it's <b>Tomus</b>. While we're inspired
                  by global standards of quality, every pair of Tomus footwear
                  is proudly rooted in African craftsmanship, made with
                  materials and design choices that reflect both durability and
                  style. We're building something original, not a copy.
                </p>
              </div>

              <div>
                <h4 className="font-medium mb-2">What's your return policy?</h4>
                <p className="text-sm text-muted-foreground">
                  We offer 7-day returns for unworn items in original packaging.
                </p>
              </div>

              <div>
                <h4 className="font-medium mb-2">
                  Do you ship internationally?
                </h4>
                <p className="text-sm text-muted-foreground">
                  Yes, we ship to most countries worldwide with calculated
                  shipping rates.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
