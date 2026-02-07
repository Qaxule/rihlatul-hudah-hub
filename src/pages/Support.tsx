import { useState } from "react";
import { PageWrapper } from "@/components/app/PageWrapper";
import { useSEO, SEO_DATA } from "@/hooks/useSEO";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Heart, Coffee, DollarSign, CreditCard, Wallet, Loader2, Copy, Check } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

type CurrencyCode = "UGX" | "KES" | "USD" | "EUR" | "AED";

interface CurrencyConfig {
  code: CurrencyCode;
  name: string;
  symbol: string;
  minAmount: number;
  maxAmount: number;
  maxUgxEquivalent: string;
  amounts: number[];
}

// All max amounts based on 25,000 UGX limit
const CURRENCIES: CurrencyConfig[] = [{
  code: "UGX",
  name: "Ugandan Shilling",
  symbol: "UGX",
  minAmount: 1000,
  maxAmount: 25000,
  maxUgxEquivalent: "25,000 UGX",
  amounts: [5000, 10000, 15000, 25000]
}, {
  code: "KES",
  name: "Kenyan Shilling",
  symbol: "KES",
  minAmount: 100,
  maxAmount: 700,
  maxUgxEquivalent: "~25,000 UGX",
  amounts: [200, 400, 500, 700]
}, {
  code: "USD",
  name: "US Dollar",
  symbol: "$",
  minAmount: 1,
  maxAmount: 7,
  maxUgxEquivalent: "~25,000 UGX",
  amounts: [2, 3, 5, 7]
}, {
  code: "EUR",
  name: "Euro",
  symbol: "€",
  minAmount: 1,
  maxAmount: 6,
  maxUgxEquivalent: "~25,000 UGX",
  amounts: [2, 3, 5, 6]
}, {
  code: "AED",
  name: "UAE Dirham",
  symbol: "AED",
  minAmount: 5,
  maxAmount: 25,
  maxUgxEquivalent: "~25,000 UGX",
  amounts: [10, 15, 20, 25]
}];

const CopyButton = ({ text, label }: { text: string; label: string }) => {
  const [copied, setCopied] = useState(false);
  
  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success(`${label} copied to clipboard`);
    setTimeout(() => setCopied(false), 2000);
  };
  
  return (
    <Button variant="ghost" size="sm" onClick={handleCopy} className="h-7 px-2">
      {copied ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
    </Button>
  );
};
const Support = () => {
  const [selectedCurrency, setSelectedCurrency] = useState<CurrencyCode>("UGX");
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState("");
  const [donorName, setDonorName] = useState("");
  const [donorEmail, setDonorEmail] = useState("");
  const [donorPhone, setDonorPhone] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const currentCurrency = CURRENCIES.find(c => c.code === selectedCurrency) || CURRENCIES[0];
  const handleCurrencyChange = (code: CurrencyCode) => {
    setSelectedCurrency(code);
    setSelectedAmount(null);
    setCustomAmount("");
  };
  const formatAmount = (amount: number) => {
    if (currentCurrency.symbol === "$" || currentCurrency.symbol === "€") {
      return `${currentCurrency.symbol}${amount.toLocaleString()}`;
    }
    return `${currentCurrency.code} ${amount.toLocaleString()}`;
  };
  const handleDonate = async () => {
    const amount = selectedAmount || Number(customAmount);
    if (!amount || amount < currentCurrency.minAmount) {
      toast.error(`Please enter a valid donation amount (minimum ${formatAmount(currentCurrency.minAmount)})`);
      return;
    }
    if (amount > currentCurrency.maxAmount) {
      toast.error(`Maximum donation amount is ${formatAmount(currentCurrency.maxAmount)} due to payment processor limits`);
      return;
    }
    setIsProcessing(true);
    try {
      const callbackUrl = `${window.location.origin}/support?payment=complete`;
      const ipnUrl = `${window.location.origin}/support?ipn=true`;
      const {
        data,
        error
      } = await supabase.functions.invoke('pesapal-payment', {
        body: {
          action: 'initiate-payment',
          amount,
          currency: selectedCurrency,
          description: `Donation to Rihlatul Hudah - ${formatAmount(amount)}`,
          callbackUrl,
          ipnUrl,
          donorName: donorName || undefined,
          donorEmail: donorEmail || undefined,
          donorPhone: donorPhone || undefined
        }
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
  return <PageWrapper>
      <main className="flex-1 container mx-auto px-4 py-8">
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
              
              {/* Currency Selection */}
              <div className="space-y-2">
                <Label className="text-base font-semibold">Select Currency</Label>
                <Select value={selectedCurrency} onValueChange={value => handleCurrencyChange(value as CurrencyCode)}>
                  <SelectTrigger className="w-full md:w-64">
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent className="bg-background border">
                    {CURRENCIES.map(currency => <SelectItem key={currency.code} value={currency.code}>
                        {currency.code} - {currency.name}
                      </SelectItem>)}
                  </SelectContent>
                </Select>
              </div>

              {/* Amount Selection */}
              <div className="space-y-3">
                <Label className="text-base font-semibold">Select Amount</Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {currentCurrency.amounts.map(amt => <button key={amt} onClick={() => {
                  setSelectedAmount(amt);
                  setCustomAmount("");
                }} className={`p-4 rounded-lg border-2 transition-all text-center ${selectedAmount === amt ? "border-primary bg-primary/10" : "border-border hover:border-primary/50"}`}>
                      <div className="font-bold text-foreground">{formatAmount(amt)}</div>
                    </button>)}
                </div>
              </div>

              {/* Custom Amount */}
              <div className="space-y-2">
                <Label htmlFor="customAmount">Or enter custom amount ({currentCurrency.code})</Label>
                <Input id="customAmount" type="number" placeholder={`Enter between ${currentCurrency.minAmount.toLocaleString()} - ${currentCurrency.maxAmount.toLocaleString()} (max ${currentCurrency.maxUgxEquivalent})`} value={customAmount} onChange={e => {
                setCustomAmount(e.target.value);
                setSelectedAmount(null);
              }} min={currentCurrency.minAmount} max={currentCurrency.maxAmount} />
              </div>

              {/* Donor Details (Optional) */}
              <div className="space-y-4 pt-4 border-t">
                <p className="text-sm text-muted-foreground">
                  Optional: Provide your details for a receipt
                </p>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="donorName">Name</Label>
                    <Input id="donorName" placeholder="Your name" value={donorName} onChange={e => setDonorName(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="donorEmail">Email</Label>
                    <Input id="donorEmail" type="email" placeholder="your@email.com" value={donorEmail} onChange={e => setDonorEmail(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="donorPhone">Phone</Label>
                    <Input id="donorPhone" type="tel" placeholder="+256..." value={donorPhone} onChange={e => setDonorPhone(e.target.value)} />
                  </div>
                </div>
              </div>

              {/* Donate Button */}
              <Button size="lg" className="w-full text-lg py-6" onClick={handleDonate} disabled={isProcessing || getFinalAmount() < currentCurrency.minAmount}>
                {isProcessing ? <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Processing...
                  </> : <>
                    <Heart className="w-5 h-5 mr-2" />
                    Donate {getFinalAmount() > 0 ? formatAmount(getFinalAmount()) : ""}
                  </>}
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
                <Button className="w-full" size="lg" variant="outline" onClick={() => window.open('https://paypal.me/marshallqaxule', '_blank')}>
                  <CreditCard className="w-4 h-4 mr-2" />
                  Donate via PayPal
                </Button>
                <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                  <span>PayPal Email: marshallqaxule@gmail.com</span>
                  <CopyButton text="marshallqaxule@gmail.com" label="PayPal email" />
                </div>
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
                  <div className="grid grid-cols-[auto_1fr_auto] gap-x-2 gap-y-2 items-center">
                    <span className="font-semibold">Bank Name:</span>
                    <span className="text-muted-foreground">SALAAM BANK UGANDA LIMITED</span>
                    <CopyButton text="SALAAM BANK UGANDA LIMITED" label="Bank name" />
                    
                    <span className="font-semibold">Account Name:</span>
                    <span className="text-muted-foreground">KASULE ABDUL RAHMAN</span>
                    <CopyButton text="KASULE ABDUL RAHMAN" label="Account name" />
                    
                    <span className="font-semibold">Account Number:</span>
                    <span className="text-muted-foreground">1410007056</span>
                    <CopyButton text="1410007056" label="Account number" />
                    
                    <span className="font-semibold">SWIFT Code:</span>
                    <span className="text-muted-foreground">TOPFUGKA</span>
                    <CopyButton text="TOPFUGKA" label="SWIFT code" />
                    
                    <span className="font-semibold">Bank Address:</span>
                    <span className="text-muted-foreground">KAMPALA ROAD, PLOT 53 FLOOR 1, KAMPALA</span>
                    <CopyButton text="KAMPALA ROAD, PLOT 53 FLOOR 1, KAMPALA" label="Bank address" />
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
                <div className="bg-muted/50 p-4 rounded space-y-4 text-sm">
                  <div className="space-y-2">
                    <p className="font-semibold">Bitcoin (BTC)</p>
                    <div className="flex items-center gap-2">
                      <p className="text-muted-foreground font-mono text-xs break-all flex-1">
                        3BuomtEZ8GK9vfGFWAdgWSmrdxDLSPGUoN
                      </p>
                      <CopyButton text="3BuomtEZ8GK9vfGFWAdgWSmrdxDLSPGUoN" label="Bitcoin address" />
                    </div>
                    <div className="text-xs space-y-1 text-amber-600 dark:text-amber-400">
                      <p className="font-medium">⚠️ Do not send Bitcoin Cash (BCH) to this address</p>
                      <p>This address can only receive Bitcoin on the Bitcoin network. Don't send Bitcoin on any other network or it may be lost.</p>
                    </div>
                  </div>
                  <div className="space-y-2 pt-2 border-t border-border">
                    <p className="font-semibold">Ethereum (ETH)</p>
                    <div className="flex items-center gap-2">
                      <p className="text-muted-foreground font-mono text-xs break-all flex-1">
                        0xF68E255e69898c04a274B25FE6E63bb7e8fBd758
                      </p>
                      <CopyButton text="0xF68E255e69898c04a274B25FE6E63bb7e8fBd758" label="Ethereum address" />
                    </div>
                    <div className="text-xs space-y-1 text-amber-600 dark:text-amber-400">
                      <p className="font-medium">⚠️ Do not send any ERC-20s, NFTs or WETH to this address</p>
                      <p>This address can only receive Ethereum on the Ethereum network. Don't send Ethereum on any other network or it may be lost.</p>
                    </div>
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
    </PageWrapper>;
};
export default Support;