
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

export const InfoSection = () => {
  return (
    <section id="info-section" className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">Meet Our Team</h2>
          <p className="text-xl text-muted-foreground text-center mb-8">
            We are the IAM Security Team at CDW, dedicated to protecting your organization's identity infrastructure with innovative solutions.
          </p>
          
          <div className="flex justify-center mb-12">
            <Button 
              variant="outline" 
              size="lg" 
              className="group"
              onClick={() => window.open("https://www.cdw.com/content/cdw/en/solutions/cybersecurity/identity-access-management.html", "_blank")}
            >
              Learn more about our IAM solutions
              <ExternalLink className="ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass p-6 rounded-lg text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-primary">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Expert Team</h3>
              <p className="text-muted-foreground">Our certified security professionals bring years of experience securing enterprise identities.</p>
            </div>
            
            <div className="glass p-6 rounded-lg text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-primary">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Tailored Solutions</h3>
              <p className="text-muted-foreground">We customize IAM solutions to match your unique business requirements and security needs.</p>
            </div>
            
            <div className="glass p-6 rounded-lg text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-primary">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5m.75-9 3-3 2.148 2.148A12.061 12.061 0 0 1 16.5 7.605" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Proven Results</h3>
              <p className="text-muted-foreground">Our track record speaks for itself with successful implementations across diverse industries.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
