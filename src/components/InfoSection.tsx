
import { useEffect, useRef } from 'react';
import { Separator } from '@/components/ui/separator';
import { 
  ShieldCheck, 
  Users, 
  Lock, 
  Key, 
  Shield, 
  BarChart 
} from 'lucide-react';

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const Feature = ({ icon, title, description }: FeatureProps) => (
  <div className="bg-card shadow-sm hover:shadow-md transition-shadow p-6 rounded-xl border animate-on-scroll opacity-0 translate-y-10 transition-all duration-700">
    <div className="mb-4 text-primary">{icon}</div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-muted-foreground">{description}</p>
  </div>
);

export const InfoSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const elements = entry.target.querySelectorAll('.animate-on-scroll');
            elements.forEach((el, index) => {
              setTimeout(() => {
                el.classList.add('opacity-100');
                el.classList.remove('opacity-0', 'translate-y-10');
              }, index * 150);
            });
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const features = [
    {
      icon: <ShieldCheck size={32} />,
      title: "Advanced Authentication",
      description: "Multi-factor authentication and risk-based access controls to protect sensitive resources.",
    },
    {
      icon: <Users size={32} />,
      title: "Identity Governance",
      description: "Comprehensive identity lifecycle management with automated provisioning.",
    },
    {
      icon: <Lock size={32} />,
      title: "Zero Trust Security",
      description: "Implement zero trust architecture with continuous verification mechanisms.",
    },
    {
      icon: <Key size={32} />,
      title: "Privileged Access",
      description: "Secure privileged access management with just-in-time provisioning.",
    },
    {
      icon: <Shield size={32} />,
      title: "Compliance Management",
      description: "Stay compliant with regulatory requirements through automated reporting.",
    },
    {
      icon: <BarChart size={32} />,
      title: "Security Analytics",
      description: "Advanced analytics and reporting to detect anomalies and potential threats.",
    },
  ];

  return (
    <section 
      id="info-section" 
      ref={sectionRef}
      className="py-24 bg-background"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-block px-3 py-1 text-sm font-medium bg-secondary/20 text-secondary rounded-full mb-4 animate-on-scroll opacity-0 translate-y-10 transition-all duration-700">
            Our Expertise
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 animate-on-scroll opacity-0 translate-y-10 transition-all duration-700">
            IAM Security Team
          </h2>
          <p className="text-lg text-muted-foreground animate-on-scroll opacity-0 translate-y-10 transition-all duration-700">
            Our team of security experts has decades of combined experience in protecting enterprise identity infrastructure and implementing robust security measures.
          </p>
        </div>
        
        <Separator className="my-12 max-w-xl mx-auto" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Feature 
              key={index} 
              icon={feature.icon} 
              title={feature.title} 
              description={feature.description} 
            />
          ))}
        </div>
        
        <div className="mt-20 max-w-3xl mx-auto text-center animate-on-scroll opacity-0 translate-y-10 transition-all duration-700">
          <div className="glass p-8 rounded-2xl">
            <h3 className="text-2xl font-bold mb-4">Why Choose Our Team?</h3>
            <p className="text-muted-foreground mb-6">
              With a proven track record of successful IAM deployments across Fortune 500 companies, our team brings unparalleled expertise to solve your most complex security challenges.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
                24/7 Support
              </div>
              <div className="bg-secondary/10 text-secondary px-4 py-2 rounded-full text-sm font-medium">
                Certified Experts
              </div>
              <div className="bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
                Global Coverage
              </div>
              <div className="bg-secondary/10 text-secondary px-4 py-2 rounded-full text-sm font-medium">
                Rapid Response
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
