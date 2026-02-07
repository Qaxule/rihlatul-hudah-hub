import { PageWrapper } from "@/components/app/PageWrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FileText } from "lucide-react";

const TermsOfUse = () => {
  return (
    <PageWrapper>
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Card className="shadow-lg">
            <CardHeader className="space-y-4 border-b">
              <div className="flex items-center gap-3">
                <FileText className="w-8 h-8 text-primary" />
                <CardTitle className="text-3xl">Terms of Use</CardTitle>
              </div>
              <p className="text-sm text-muted-foreground">
                Last Updated: November 2024
              </p>
            </CardHeader>
            
            <CardContent className="p-6">
              <ScrollArea className="h-[600px] pr-4">
                <div className="space-y-6 text-foreground">
                  
                  <section className="space-y-3">
                    <h2 className="text-2xl font-semibold text-primary">1. Acceptance of Terms</h2>
                    <p className="text-muted-foreground">
                      By accessing and using Rihlatul Hudah (رحلة الهدى), you accept and agree to be bound 
                      by the terms and provisions of this agreement. If you do not agree to these terms, 
                      please do not use our services.
                    </p>
                  </section>

                  <section className="space-y-3">
                    <h2 className="text-2xl font-semibold text-primary">2. Use of Services</h2>
                    <div className="space-y-2 text-muted-foreground">
                      <p>Rihlatul Hudah provides:</p>
                      <ul className="list-disc list-inside space-y-1 ml-4">
                        <li>Access to the Holy Qur'an with translations and recitations</li>
                        <li>Hadith collections from authentic sources</li>
                        <li>Islamic learning resources and educational content</li>
                        <li>Prayer times and Islamic calendar</li>
                        <li>Personal spiritual development tools</li>
                      </ul>
                      <p className="mt-2">
                        All services are provided free of charge for educational and spiritual purposes.
                      </p>
                    </div>
                  </section>

                  <section className="space-y-3">
                    <h2 className="text-2xl font-semibold text-primary">3. User Accounts</h2>
                    <div className="space-y-2 text-muted-foreground">
                      <p>When creating an account, you agree to:</p>
                      <ul className="list-disc list-inside space-y-1 ml-4">
                        <li>Provide accurate and complete information</li>
                        <li>Maintain the security of your account credentials</li>
                        <li>Notify us immediately of any unauthorized access</li>
                        <li>Be responsible for all activities under your account</li>
                      </ul>
                    </div>
                  </section>

                  <section className="space-y-3">
                    <h2 className="text-2xl font-semibold text-primary">4. Acceptable Use</h2>
                    <div className="space-y-2 text-muted-foreground">
                      <p>You agree NOT to:</p>
                      <ul className="list-disc list-inside space-y-1 ml-4">
                        <li>Use the platform for any unlawful purpose</li>
                        <li>Attempt to gain unauthorized access to any part of the platform</li>
                        <li>Interfere with or disrupt the services</li>
                        <li>Upload malicious code or viruses</li>
                        <li>Reproduce, duplicate, or copy content without permission</li>
                        <li>Misrepresent or distort Islamic teachings</li>
                      </ul>
                    </div>
                  </section>

                  <section className="space-y-3">
                    <h2 className="text-2xl font-semibold text-primary">5. Intellectual Property</h2>
                    <div className="space-y-2 text-muted-foreground">
                      <p>
                        The Qur'anic text and Hadith are divine revelations and prophetic traditions that 
                        belong to all Muslims. However:
                      </p>
                      <ul className="list-disc list-inside space-y-1 ml-4">
                        <li>Translations and commentaries are property of their respective authors</li>
                        <li>The platform design and code are protected by copyright</li>
                        <li>Our logo and branding are registered trademarks</li>
                      </ul>
                      <p className="mt-2">
                        Educational and non-commercial use of content is generally permitted with proper 
                        attribution.
                      </p>
                    </div>
                  </section>

                  <section className="space-y-3">
                    <h2 className="text-2xl font-semibold text-primary">6. User-Generated Content</h2>
                    <p className="text-muted-foreground">
                      If you create notes, reflections, or other content on the platform, you retain 
                      ownership but grant us a license to store and display this content as part of our 
                      services. You are responsible for ensuring your content is respectful and accurate.
                    </p>
                  </section>

                  <section className="space-y-3">
                    <h2 className="text-2xl font-semibold text-primary">7. Third-Party Links</h2>
                    <p className="text-muted-foreground">
                      Our platform may contain links to third-party websites or services. We are not 
                      responsible for the content, privacy policies, or practices of any third-party sites.
                    </p>
                  </section>

                  <section className="space-y-3">
                    <h2 className="text-2xl font-semibold text-primary">8. Disclaimers and Limitations</h2>
                    <div className="space-y-2 text-muted-foreground">
                      <p>
                        Rihlatul Hudah is provided "as is" without warranties of any kind. We strive for 
                        accuracy but:
                      </p>
                      <ul className="list-disc list-inside space-y-1 ml-4">
                        <li>We do not guarantee uninterrupted or error-free service</li>
                        <li>We are not liable for any damages arising from use of the platform</li>
                        <li>We recommend consulting qualified scholars for religious guidance</li>
                      </ul>
                    </div>
                  </section>

                  <section className="space-y-3">
                    <h2 className="text-2xl font-semibold text-primary">9. Modifications to Service</h2>
                    <p className="text-muted-foreground">
                      We reserve the right to modify, suspend, or discontinue any part of our services 
                      at any time without notice. We may also update these Terms of Use periodically.
                    </p>
                  </section>

                  <section className="space-y-3">
                    <h2 className="text-2xl font-semibold text-primary">10. Termination</h2>
                    <p className="text-muted-foreground">
                      We reserve the right to terminate or suspend your account if you violate these terms. 
                      You may also close your account at any time through the account settings.
                    </p>
                  </section>

                  <section className="space-y-3">
                    <h2 className="text-2xl font-semibold text-primary">11. Governing Law</h2>
                    <p className="text-muted-foreground">
                      These terms shall be governed by and construed in accordance with applicable laws, 
                      without regard to conflict of law principles.
                    </p>
                  </section>

                  <section className="space-y-3">
                    <h2 className="text-2xl font-semibold text-primary">12. Contact Information</h2>
                    <p className="text-muted-foreground">
                      For questions about these Terms of Use, please contact us through the contact 
                      information provided on our platform.
                    </p>
                  </section>

                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </main>
    </PageWrapper>
  );
};

export default TermsOfUse;
