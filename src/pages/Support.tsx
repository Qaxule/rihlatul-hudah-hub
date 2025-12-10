import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Heart, Coffee, DollarSign, CreditCard, Wallet, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const DONATION_AMOUNTS = [
  { value: 500, label: "KES 500", description: "Covers server costs for 1 day" },
  { value: 1000, label: "KES 1,000", description: "Adds new audio recitations" },
  { value: 2500, label: "KES 2,500", description: "Develops new features" },
  { value: 5000, label: "KES 5,000", description: "Major platform improvements" },
];

const Support = () => {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState("");
  const [donorName, setDonorName] = useState("");
  const [donorEmail, setDonorEmail] = useState("");
  const [donorPhone, setDonorPhone] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleDonate = async () => {
    const amount = selectedAmount || Number(customAmount);
    
    if (!amount || amount < 10) {
      toast.error("Please enter a valid donation amount (minimum KES 10)");
      return;
    }

    setIsProcessing(true);

    try {
      const callbackUrl = `${window.location.origin}/support?payment=complete`;
      const ipnUrl = `${window.location.origin}/support?ipn=true`;

      const { data, error } = await supabase.functions.invoke('pesapal-payment', {
        body: {
          action: 'initiate-payment',
          amount,
          currency: 'KES',
          description: `Donation to Rihlatul Hudah - KES ${amount}`,
          callbackUrl,
          ipnUrl,
          donorName: donorName || undefined,
          donorEmail: donorEmail || undefined,
          donorPhone: donorPhone || undefined,
        },
      });

      if (error) throw error;

      if (data?.success && data?.redirect_url) {
        toast.success("Redirecting to PesaPal...");
        window.location.href = data.redirect_url;
      } else {
        throw new Error(data?.error || 'Failed to initiate payment');
      }
    } catch (error) {
      console.error('Payment error:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to process donation');
    } finally {
      setIsProcessing(false);
    }
  };

  const getFinalAmount = () => selectedAmount || Number(customAmount) || 0;

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

          {/* PesaPal Donation Form */}
          <Card className="border-primary/30">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <CreditCard className="w-6 h-6 text-primary" />
                Make a Donation
              </CardTitle>
              <CardDescription>
                Secure payment powered by PesaPal - Mobile Money, Cards & Bank Transfer
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              
              {/* Amount Selection */}
              <div className="space-y-3">
                <Label className="text-base font-semibold">Select Amount</Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {DONATION_AMOUNTS.map((amt) => (
                    <button
                      key={amt.value}
                      onClick={() => {
                        setSelectedAmount(amt.value);
                        setCustomAmount("");
                      }}
                      className={`p-4 rounded-lg border-2 transition-all text-left ${
                        selectedAmount === amt.value
                          ? "border-primary bg-primary/10"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <div className="font-bold text-foreground">{amt.label}</div>
                      <div className="text-xs text-muted-foreground mt-1">{amt.description}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Amount */}
              <div className="space-y-2">
                <Label htmlFor="customAmount">Or enter custom amount (KES)</Label>
                <Input
                  id="customAmount"
                  type="number"
                  placeholder="Enter amount"
                  value={customAmount}
                  onChange={(e) => {
                    setCustomAmount(e.target.value);
                    setSelectedAmount(null);
                  }}
                  min={10}
                />
              </div>

              {/* Donor Details (Optional) */}
              <div className="space-y-4 pt-4 border-t">
                <p className="text-sm text-muted-foreground">
                  Optional: Provide your details for a receipt
                </p>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="donorName">Name</Label>
                    <Input
                      id="donorName"
                      placeholder="Your name"
                      value={donorName}
                      onChange={(e) => setDonorName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="donorEmail">Email</Label>
                    <Input
                      id="donorEmail"
                      type="email"
                      placeholder="your@email.com"
                      value={donorEmail}
                      onChange={(e) => setDonorEmail(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="donorPhone">Phone</Label>
                    <Input
                      id="donorPhone"
                      type="tel"
                      placeholder="+254..."
                      value={donorPhone}
                      onChange={(e) => setDonorPhone(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Donate Button */}
              <Button
                size="lg"
                className="w-full text-lg py-6"
                onClick={handleDonate}
                disabled={isProcessing || getFinalAmount() < 10}
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Heart className="w-5 h-5 mr-2" />
                    Donate {getFinalAmount() > 0 ? `KES ${getFinalAmount().toLocaleString()}` : ""}
                  </>
                )}
              </Button>

              <p className="text-xs text-muted-foreground text-center">
                Payments processed securely via PesaPal. Supports M-Pesa, Airtel Money, Cards & Bank Transfer.
              </p>
            </CardContent>
          </Card>

          {/* Other Donation Options */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <DollarSign className="w-6 h-6 text-primary" />
                Other Ways to Support
              </CardTitle>
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
