import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AlertTriangle } from "lucide-react";

const Disclaimer = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-subtle">
      <Navigation />
      
      <main className="flex-1 container mx-auto px-4 py-8 mt-16">
        <div className="max-w-4xl mx-auto">
          <Card className="shadow-lg">
            <CardHeader className="space-y-4 border-b">
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-8 h-8 text-primary" />
                <CardTitle className="text-3xl">Disclaimer</CardTitle>
              </div>
              <p className="text-sm text-muted-foreground">
                Last Updated: November 2024
              </p>
            </CardHeader>
            
            <CardContent className="p-6">
              <ScrollArea className="h-[600px] pr-4">
                <div className="space-y-6 text-foreground">
                  
                  <section className="space-y-3">
                    <h2 className="text-2xl font-semibold text-primary">General Disclaimer</h2>
                    <p className="text-muted-foreground">
                      Rihlatul Hudah (رحلة الهدى - Journey of Guidance) is an educational platform designed 
                      to provide access to Islamic knowledge and resources. The information provided through 
                      this platform is for educational and spiritual development purposes only.
                    </p>
                  </section>

                  <section className="space-y-3">
                    <h2 className="text-2xl font-semibold text-primary">Religious Guidance</h2>
                    <div className="space-y-2 text-muted-foreground">
                      <p>
                        <strong>Important:</strong> While we strive to provide accurate Islamic content, 
                        this platform should not be considered a substitute for:
                      </p>
                      <ul className="list-disc list-inside space-y-1 ml-4">
                        <li>Qualified Islamic scholars and teachers</li>
                        <li>Professional religious counseling</li>
                        <li>Formal Islamic education</li>
                        <li>Personal study of classical Islamic texts</li>
                      </ul>
                      <p className="mt-2">
                        For matters of religious significance, Islamic jurisprudence (fiqh), or personal 
                        spiritual guidance, please consult with qualified Islamic scholars and institutions.
                      </p>
                    </div>
                  </section>

                  <section className="space-y-3">
                    <h2 className="text-2xl font-semibold text-primary">Content Accuracy</h2>
                    <div className="space-y-2 text-muted-foreground">
                      <p>
                        We make every effort to ensure the accuracy of the content provided, including:
                      </p>
                      <ul className="list-disc list-inside space-y-1 ml-4">
                        <li>Qur'anic text and translations</li>
                        <li>Hadith narrations and collections</li>
                        <li>Islamic educational materials</li>
                        <li>Prayer times and calendar information</li>
                      </ul>
                      <p className="mt-2">
                        However, we cannot guarantee complete accuracy or freedom from errors. Users are 
                        encouraged to verify important information with authentic sources and qualified scholars.
                      </p>
                    </div>
                  </section>

                  <section className="space-y-3">
                    <h2 className="text-2xl font-semibold text-primary">Translations and Interpretations</h2>
                    <p className="text-muted-foreground">
                      All translations of the Qur'an and Hadith are human interpretations and may not 
                      capture the full depth, nuance, and multiple meanings of the original Arabic text. 
                      We acknowledge that translation of divine revelation is inherently limited, and the 
                      Arabic text remains the primary and authoritative source.
                    </p>
                  </section>

                  <section className="space-y-3">
                    <h2 className="text-2xl font-semibold text-primary">Madhahib and Schools of Thought</h2>
                    <p className="text-muted-foreground">
                      Islam encompasses diverse schools of thought (madhahib) and scholarly opinions on 
                      various matters. The content on this platform may reflect particular interpretations 
                      or approaches. We respect the diversity of valid Islamic scholarly opinions and 
                      encourage users to learn about and respect different perspectives within mainstream 
                      Sunni and Shia traditions.
                    </p>
                  </section>

                  <section className="space-y-3">
                    <h2 className="text-2xl font-semibold text-primary">Prayer Times</h2>
                    <p className="text-muted-foreground">
                      Prayer times are calculated using standard astronomical calculations and may vary 
                      based on location, calculation method, and local factors. We recommend:
                    </p>
                    <ul className="list-disc list-inside space-y-1 ml-4 text-muted-foreground mt-2">
                      <li>Verifying times with local mosques or Islamic centers</li>
                      <li>Understanding different calculation methods used by various communities</li>
                      <li>Being aware that visibility conditions may affect sighting-based determinations</li>
                    </ul>
                  </section>

                  <section className="space-y-3">
                    <h2 className="text-2xl font-semibold text-primary">Health and Medical Matters</h2>
                    <p className="text-muted-foreground">
                      Any content related to health, fasting, or physical well-being is for informational 
                      purposes only and should not be considered medical advice. Always consult with 
                      qualified healthcare professionals for medical guidance, especially regarding fasting 
                      during Ramadan or other religious practices that may affect your health.
                    </p>
                  </section>

                  <section className="space-y-3">
                    <h2 className="text-2xl font-semibold text-primary">Third-Party Content</h2>
                    <p className="text-muted-foreground">
                      We may include content from various Islamic scholars, institutions, and sources. 
                      The inclusion of such content does not necessarily imply our endorsement of all 
                      views or opinions expressed. We strive to present mainstream Islamic perspectives 
                      from reputable sources.
                    </p>
                  </section>

                  <section className="space-y-3">
                    <h2 className="text-2xl font-semibold text-primary">Technical Limitations</h2>
                    <div className="space-y-2 text-muted-foreground">
                      <p>
                        While we work to maintain reliable service, users should be aware that:
                      </p>
                      <ul className="list-disc list-inside space-y-1 ml-4">
                        <li>Technical issues may occasionally affect availability</li>
                        <li>Audio recitations depend on internet connectivity</li>
                        <li>Location-based features require appropriate permissions</li>
                        <li>Offline features may have limited functionality</li>
                      </ul>
                    </div>
                  </section>

                  <section className="space-y-3">
                    <h2 className="text-2xl font-semibold text-primary">User Responsibility</h2>
                    <div className="space-y-2 text-muted-foreground">
                      <p>
                        Users of this platform are responsible for:
                      </p>
                      <ul className="list-disc list-inside space-y-1 ml-4">
                        <li>Verifying important religious information with qualified scholars</li>
                        <li>Using the platform in accordance with Islamic principles</li>
                        <li>Respecting the sacred nature of the content provided</li>
                        <li>Understanding that this is a supplementary learning tool, not a replacement for traditional Islamic education</li>
                      </ul>
                    </div>
                  </section>

                  <section className="space-y-3">
                    <h2 className="text-2xl font-semibold text-primary">Limitation of Liability</h2>
                    <p className="text-muted-foreground">
                      To the fullest extent permitted by law, Rihlatul Hudah and its operators shall not 
                      be liable for any direct, indirect, incidental, consequential, or special damages 
                      arising from the use of this platform or reliance on any information provided.
                    </p>
                  </section>

                  <section className="space-y-3">
                    <h2 className="text-2xl font-semibold text-primary">Updates and Changes</h2>
                    <p className="text-muted-foreground">
                      This disclaimer may be updated periodically to reflect changes in our services or 
                      legal requirements. Continued use of the platform constitutes acceptance of any 
                      updates to this disclaimer.
                    </p>
                  </section>

                  <section className="space-y-3">
                    <h2 className="text-2xl font-semibold text-primary">Questions and Concerns</h2>
                    <p className="text-muted-foreground">
                      If you have questions about this disclaimer or concerns about content accuracy, 
                      please contact us through the contact information provided on our platform.
                    </p>
                  </section>

                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Disclaimer;
