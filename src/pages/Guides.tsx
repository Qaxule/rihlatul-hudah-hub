import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, BookOpen, Heart, Star } from "lucide-react";

const Guides = () => {
  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navigation />
      
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center space-y-6 mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary/30">
            <Users className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">
            New Muslim Guide
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Welcome to Islam! Here you'll find step-by-step guides for your journey in faith.
          </p>
        </div>

        {/* Welcome Message */}
        <Card className="max-w-4xl mx-auto mb-12 shadow-elevated border-primary/20">
          <CardContent className="p-8 space-y-4">
            <div className="flex items-center gap-2 text-primary">
              <Heart className="w-6 h-6" />
              <h2 className="text-2xl font-bold">Assalamu Alaikum!</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              We're honored to accompany you on this beautiful journey. These guides will help you 
              understand and practice the fundamentals of Islam with ease and clarity. Take your time, 
              and remember that learning is a lifelong journey.
            </p>
          </CardContent>
        </Card>

        {/* Guides Grid */}
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Salah Guide */}
          <Card className="shadow-soft hover:shadow-elevated transition-all">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-primary" />
                </div>
                How to Perform Salah (Prayer)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Salah is one of the Five Pillars of Islam and the most important act of worship. 
                It connects you directly with Allah five times a day.
              </p>
              
              <div className="space-y-3">
                <div className="p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-semibold text-foreground mb-2">Step 1: Make Intention (Niyyah)</h4>
                  <p className="text-sm text-muted-foreground">
                    In your heart, make the intention to pray for the sake of Allah. You can say: 
                    "I intend to pray [name of prayer] for the sake of Allah."
                  </p>
                </div>

                <div className="p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-semibold text-foreground mb-2">Step 2: Say Takbir</h4>
                  <p className="text-sm text-muted-foreground">
                    Raise your hands to ear level and say "Allahu Akbar" (Allah is the Greatest). 
                    This marks the beginning of your prayer.
                  </p>
                </div>

                <div className="p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-semibold text-foreground mb-2">Step 3: Recite Al-Fatihah</h4>
                  <p className="text-sm text-muted-foreground">
                    Place your right hand over your left on your chest, and recite Surah Al-Fatihah, 
                    followed by another short surah or verses from the Qur'an.
                  </p>
                </div>

                <div className="p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-semibold text-foreground mb-2">Step 4: Perform Ruku (Bowing)</h4>
                  <p className="text-sm text-muted-foreground">
                    Say "Allahu Akbar" and bow down, placing your hands on your knees. Say 
                    "Subhana Rabbiyal Adheem" (Glory be to my Lord, the Magnificent) three times.
                  </p>
                </div>

                <div className="p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-semibold text-foreground mb-2">Step 5: Perform Sujud (Prostration)</h4>
                  <p className="text-sm text-muted-foreground">
                    Say "Allahu Akbar" and prostrate with your forehead, nose, hands, knees, and toes 
                    touching the ground. Say "Subhana Rabbiyal A'la" (Glory be to my Lord, the Most High) 
                    three times. Repeat the prostration twice.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Wudhu Guide */}
          <Card className="shadow-soft hover:shadow-elevated transition-all">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Star className="w-6 h-6 text-primary" />
                </div>
                How to Perform Wudhu (Ablution)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Wudhu is the ritual purification required before performing Salah. It cleanses 
                both the body and the soul.
              </p>
              
              <div className="space-y-3">
                <div className="p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-semibold text-foreground mb-2">1. Make Intention</h4>
                  <p className="text-sm text-muted-foreground">
                    Begin with the intention in your heart to perform wudhu for purification.
                  </p>
                </div>

                <div className="p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-semibold text-foreground mb-2">2. Say Bismillah</h4>
                  <p className="text-sm text-muted-foreground">
                    Say "Bismillah" (In the name of Allah) before beginning.
                  </p>
                </div>

                <div className="p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-semibold text-foreground mb-2">3. Wash Your Hands</h4>
                  <p className="text-sm text-muted-foreground">
                    Wash both hands up to the wrists three times, making sure water reaches between 
                    your fingers.
                  </p>
                </div>

                <div className="p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-semibold text-foreground mb-2">4. Rinse Your Mouth</h4>
                  <p className="text-sm text-muted-foreground">
                    Take water in your right hand, rinse your mouth thoroughly three times.
                  </p>
                </div>

                <div className="p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-semibold text-foreground mb-2">5. Clean Your Nose</h4>
                  <p className="text-sm text-muted-foreground">
                    Sniff water into your nostrils and blow it out three times using your left hand.
                  </p>
                </div>

                <div className="p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-semibold text-foreground mb-2">6. Wash Your Face</h4>
                  <p className="text-sm text-muted-foreground">
                    Wash your entire face from forehead to chin and from ear to ear three times.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Five Pillars */}
          <Card className="shadow-soft hover:shadow-elevated transition-all">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Heart className="w-6 h-6 text-primary" />
                </div>
                The Five Pillars of Islam
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                The Five Pillars are the foundation of a Muslim's faith and practice.
              </p>
              
              <div className="space-y-3">
                {[
                  { 
                    title: "Shahada (Faith)", 
                    description: "The declaration of faith: 'There is no god but Allah, and Muhammad is His messenger.'" 
                  },
                  { 
                    title: "Salah (Prayer)", 
                    description: "Performing the five daily prayers at prescribed times." 
                  },
                  { 
                    title: "Zakat (Charity)", 
                    description: "Giving a portion of one's wealth to those in need (usually 2.5% annually)." 
                  },
                  { 
                    title: "Sawm (Fasting)", 
                    description: "Fasting during the month of Ramadan from dawn until sunset." 
                  },
                  { 
                    title: "Hajj (Pilgrimage)", 
                    description: "Making the pilgrimage to Mecca at least once in a lifetime if physically and financially able." 
                  },
                ].map((pillar, index) => (
                  <div key={index} className="p-4 bg-muted/50 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-2">{index + 1}. {pillar.title}</h4>
                    <p className="text-sm text-muted-foreground">{pillar.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Guides;
