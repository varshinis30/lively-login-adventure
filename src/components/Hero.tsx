
import { useEffect, useRef } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';

export const Hero = () => {
  const { login, isAuthenticated } = useAuth();
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100');
            entry.target.classList.remove('opacity-0', 'translate-y-10');
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    const elements = heroRef.current?.querySelectorAll('.animate-on-scroll');
    elements?.forEach((el) => observer.observe(el));

    return () => {
      elements?.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <div 
      ref={heroRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-cdw-blue/10 via-background to-cdw-red/10 z-0"></div>
      
      {/* Content */}
      <div className="container mx-auto px-4 pt-24 pb-16 relative z-10 flex flex-col items-center justify-center">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <div className="animate-on-scroll opacity-0 translate-y-10 transition-all duration-700">
            <span className="inline-block px-3 py-1 text-sm font-medium bg-primary/10 text-primary rounded-full mb-4">
              Secure Your Digital Future
            </span>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-clip-gradient">
              IAM Security Solutions
            </h1>
            <p className="text-lg md:text-xl text-foreground/80 mb-8 max-w-2xl mx-auto">
              Comprehensive identity and access management security solutions designed to protect your organization's most valuable assets.
            </p>
          </div>
          
          <div className="animate-on-scroll opacity-0 translate-y-10 transition-all duration-700 delay-300">
            {!isAuthenticated && (
              <Button
                onClick={login}
                className="bg-gradient-to-r from-cdw-red to-cdw-blue text-white px-8 py-6 rounded-full text-lg hover:opacity-90 transition-all shadow-lg hover:shadow-xl"
              >
                Login with Okta
              </Button>
            )}
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <a href="#info-section" className="flex flex-col items-center text-foreground/70 hover:text-foreground transition-colors">
          <span className="text-sm mb-2">Scroll to learn more</span>
          <ChevronDown size={20} />
        </a>
      </div>
    </div>
  );
};
