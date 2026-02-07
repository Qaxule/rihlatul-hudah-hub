import { PageWrapper } from "@/components/app/PageWrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Shield } from "lucide-react";

const PrivacyPolicy = () => {
  return (
    <PageWrapper>
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Card className="shadow-lg">
            <CardHeader className="space-y-4 border-b">
              <div className="flex items-center gap-3">
                <Shield className="w-8 h-8 text-primary" />
                <CardTitle className="text-3xl">Privacy Policy</CardTitle>
              </div>
              <p className="text-sm text-muted-foreground">
                Last Updated: November 2024
              </p>
            </CardHeader>
            
            <CardContent className="p-6">
              <ScrollArea className="h-[600px] pr-4">
                <div className="space-y-6 text-foreground">
                  
                  <section className="space-y-3">
                    <h2 className="text-2xl font-semibold text-primary">1. Information We Collect</h2>
                    <div className="space-y-2 text-muted-foreground">
                      <p>
                        Rihlatul Hudah collects minimal information necessary to provide our services:
                      </p>
                      <ul className="list-disc list-inside space-y-1 ml-4">
                        <li>Account information (email address, username) when you create an account</li>
                        <li>Reading progress and bookmarks to sync across devices</li>
                        <li>Prayer time preferences and location data (stored locally)</li>
                        <li>Usage analytics to improve our services</li>
                      </ul>
                    </div>
                  </section>

                  <section className="space-y-3">
                    <h2 className="text-2xl font-semibold text-primary">2. How We Use Your Information</h2>
                    <div className="space-y-2 text-muted-foreground">
                      <p>We use the collected information to:</p>
                      <ul className="list-disc list-inside space-y-1 ml-4">
                        <li>Provide and maintain our services</li>
                        <li>Personalize your experience and save your preferences</li>
                        <li>Send important updates about the platform</li>
                        <li>Improve our content and features</li>
                        <li>Ensure platform security and prevent abuse</li>
                      </ul>
                    </div>
                  </section>

                  <section className="space-y-3">
                    <h2 className="text-2xl font-semibold text-primary">3. Data Storage and Security</h2>
                    <p className="text-muted-foreground">
                      Your data is stored securely using industry-standard encryption. We implement 
                      appropriate technical and organizational measures to protect your personal information 
                      against unauthorized access, alteration, disclosure, or destruction.
                    </p>
                  </section>

                  <section className="space-y-3">
                    <h2 className="text-2xl font-semibold text-primary">4. Third-Party Services</h2>
                    <div className="space-y-2 text-muted-foreground">
                      <p>We use the following third-party services:</p>
                      <ul className="list-disc list-inside space-y-1 ml-4">
                        <li>Authentication and database services for secure data storage</li>
                        <li>Analytics tools to understand usage patterns</li>
                        <li>Content delivery networks for faster loading times</li>
                      </ul>
                      <p className="mt-2">
                        These services may collect information in accordance with their own privacy policies.
                      </p>
                    </div>
                  </section>

                  <section className="space-y-3">
                    <h2 className="text-2xl font-semibold text-primary">5. Cookies and Local Storage</h2>
                    <p className="text-muted-foreground">
                      We use cookies and local storage to save your preferences, including theme selection, 
                      Arabic text display preferences, and reading progress. These are essential for the 
                      functionality of our platform.
                    </p>
                  </section>

                  <section className="space-y-3">
                    <h2 className="text-2xl font-semibold text-primary">6. Your Rights</h2>
                    <div className="space-y-2 text-muted-foreground">
                      <p>You have the right to:</p>
                      <ul className="list-disc list-inside space-y-1 ml-4">
                        <li>Access your personal data</li>
                        <li>Correct inaccurate data</li>
                        <li>Request deletion of your data</li>
                        <li>Export your bookmarks and notes</li>
                        <li>Opt-out of non-essential communications</li>
                      </ul>
                    </div>
                  </section>

                  <section className="space-y-3">
                    <h2 className="text-2xl font-semibold text-primary">7. Children's Privacy</h2>
                    <p className="text-muted-foreground">
                      Our services are designed for users of all ages. However, we do not knowingly collect 
                      personal information from children under 13 without parental consent. If you believe 
                      we have collected such information, please contact us immediately.
                    </p>
                  </section>

                  <section className="space-y-3">
                    <h2 className="text-2xl font-semibold text-primary">8. Changes to This Policy</h2>
                    <p className="text-muted-foreground">
                      We may update this Privacy Policy from time to time. We will notify users of any 
                      material changes by posting the new policy on this page and updating the "Last Updated" 
                      date.
                    </p>
                  </section>

                  <section className="space-y-3">
                    <h2 className="text-2xl font-semibold text-primary">9. Contact Us</h2>
                    <p className="text-muted-foreground">
                      If you have any questions about this Privacy Policy or our data practices, please 
                      contact us through the contact information provided on our platform.
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

export default PrivacyPolicy;
