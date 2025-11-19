import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Coffee, DollarSign, CreditCard, Wallet } from "lucide-react";

const Support = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-subtle">
      <Navigation />
      
      <main className="flex-1 container mx-auto px-4 py-8 mt-16">
        <div className="max-w-4xl mx-auto space-y-8">
          
          {/* Hero Section */}
          <Card className="shadow-lg border-primary/20">
            <CardHeader className="text-center space-y-4">
              <div className="flex justify-center">
                <div className="p-4 bg-primary/10 rounded-full">
                  <Heart className="w-12 h-12 text-primary" />
                </div>
              </div>
              <CardTitle className="text-4xl">Support Rihlatul Hudah</CardTitle>
              <CardDescription className="text-lg">
                Help us keep Islamic knowledge accessible to everyone, free of charge
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Mission Statement */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Coffee className="w-6 h-6 text-primary" />
                Our Mission
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                Rihlatul Hudah (رحلة الهدى - Journey of Guidance) is committed to providing free access 
                to authentic Islamic knowledge for Muslims around the world. Our platform offers:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Complete Qur'an with multiple translations and recitations</li>
                <li>Authentic Hadith collections from major books</li>
                <li>Prayer times and Islamic calendar</li>
                <li>Educational resources and learning materials</li>
                <li>Personal spiritual development tools</li>
              </ul>
              <p className="pt-2">
                Your support helps us maintain and improve these services, expand our content library, 
                and reach more people seeking Islamic knowledge.
              </p>
            </CardContent>
          </Card>

          {/* Donation Options */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <DollarSign className="w-6 h-6 text-primary" />
                Ways to Support
              </CardTitle>
              <CardDescription>
                Choose the method that works best for you
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              
              {/* PayPal */}
              <div className="p-6 border rounded-lg space-y-3 hover:border-primary/50 transition-colors">
                <div className="flex items-center gap-3">
                  <Wallet className="w-8 h-8 text-primary" />
                  <div>
                    <h3 className="text-xl font-semibold">PayPal</h3>
                    <p className="text-sm text-muted-foreground">Quick and secure one-time donation</p>
                  </div>
                </div>
                <Button className="w-full" size="lg" variant="outline">
                  <CreditCard className="w-4 h-4 mr-2" />
                  Donate via PayPal
                </Button>
                <p className="text-xs text-muted-foreground text-center">
                  PayPal Email: donations@rihlatul-hudah.org
                </p>
              </div>

              {/* Bank Transfer */}
              <div className="p-6 border rounded-lg space-y-3">
                <div className="flex items-center gap-3">
                  <DollarSign className="w-8 h-8 text-primary" />
                  <div>
                    <h3 className="text-xl font-semibold">Bank Transfer</h3>
                    <p className="text-sm text-muted-foreground">Direct bank transfer for larger donations</p>
                  </div>
                </div>
                <div className="bg-muted/50 p-4 rounded space-y-2 text-sm">
                  <div className="grid grid-cols-2 gap-2">
                    <span className="font-semibold">Bank Name:</span>
                    <span className="text-muted-foreground">Islamic Development Bank</span>
                    
                    <span className="font-semibold">Account Name:</span>
                    <span className="text-muted-foreground">Rihlatul Hudah Foundation</span>
                    
                    <span className="font-semibold">Account Number:</span>
                    <span className="text-muted-foreground">123-456-7890</span>
                    
                    <span className="font-semibold">SWIFT/BIC:</span>
                    <span className="text-muted-foreground">ISDBSA00XXX</span>
                    
                    <span className="font-semibold">IBAN:</span>
                    <span className="text-muted-foreground">SA00 1234 5678 9012 3456 7890</span>
                  </div>
                </div>
              </div>

              {/* Cryptocurrency */}
              <div className="p-6 border rounded-lg space-y-3">
                <div className="flex items-center gap-3">
                  <Wallet className="w-8 h-8 text-primary" />
                  <div>
                    <h3 className="text-xl font-semibold">Cryptocurrency</h3>
                    <p className="text-sm text-muted-foreground">Support us with Bitcoin or Ethereum</p>
                  </div>
                </div>
                <div className="bg-muted/50 p-4 rounded space-y-3 text-sm">
                  <div>
                    <p className="font-semibold mb-1">Bitcoin (BTC)</p>
                    <p className="text-muted-foreground font-mono text-xs break-all">
                      bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold mb-1">Ethereum (ETH)</p>
                    <p className="text-muted-foreground font-mono text-xs break-all">
                      0x71C7656EC7ab88b098defB751B7401B5f6d8976F
                    </p>
                  </div>
                </div>
              </div>

            </CardContent>
          </Card>

          {/* Impact Section */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Your Impact</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                Every contribution, no matter how small, makes a difference. Your support helps:
              </p>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 bg-primary/5 rounded-lg">
                  <h4 className="font-semibold text-foreground mb-2">$10 USD</h4>
                  <p className="text-sm">Covers server costs for 1 day</p>
                </div>
                <div className="p-4 bg-primary/5 rounded-lg">
                  <h4 className="font-semibold text-foreground mb-2">$50 USD</h4>
                  <p className="text-sm">Adds new audio recitations</p>
                </div>
                <div className="p-4 bg-primary/5 rounded-lg">
                  <h4 className="font-semibold text-foreground mb-2">$100 USD</h4>
                  <p className="text-sm">Develops new features for 1 month</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Sadaqah Jariyah */}
          <Card className="border-primary/30 bg-primary/5">
            <CardContent className="pt-6 text-center space-y-3">
              <p className="text-lg font-semibold text-foreground">
                "When a person dies, their deeds come to an end except for three: 
                Sadaqah Jariyah (ongoing charity), knowledge from which benefit is gained, 
                or a righteous child who prays for them."
              </p>
              <p className="text-sm text-muted-foreground">- Hadith, Sahih Muslim</p>
              <p className="text-muted-foreground mt-4">
                May your contribution be a source of continuous reward (Sadaqah Jariyah) as 
                countless people benefit from this knowledge.
              </p>
            </CardContent>
          </Card>

          {/* Thank You */}
          <Card className="text-center">
            <CardContent className="pt-6 space-y-3">
              <Heart className="w-12 h-12 text-primary mx-auto" />
              <h3 className="text-2xl font-semibold">Jazakallahu Khairan</h3>
              <p className="text-muted-foreground">
                May Allah reward you abundantly for your support and generosity
              </p>
            </CardContent>
          </Card>

        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Support;
