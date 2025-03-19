
import { useEffect } from 'react';
import { VideoPlayer } from '@/components/VideoPlayer';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';

const VideoPage = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center animate-fade-in">Exclusive Content</h1>
          
          <VideoPlayer src="/chituku_vibe.mp4" />
          
          <div className="mt-12 space-y-8 animate-in-sequence">
            <div className="glass p-6 rounded-xl">
              <h2 className="text-xl font-semibold mb-4">How to Implement Multi-Factor Authentication</h2>
              <p className="text-muted-foreground">
                In this funny but informative video, our team shows you the ins and outs of implementing MFA across your organization. Notice how our expert demonstrates what NOT to do before showing the right approach!
              </p>
            </div>
            
            <div className="glass p-6 rounded-xl">
              <h2 className="text-xl font-semibold mb-4">The Security Team's Secret Weapon</h2>
              <p className="text-muted-foreground">
                Did you catch that dance move at 1:24? That's actually a metaphor for how quickly our IAM solutions can respond to security threats. Plus, it's just plain funny to watch our security experts let loose!
              </p>
            </div>
            
            <div className="glass p-6 rounded-xl">
              <h2 className="text-xl font-semibold mb-4">Behind the Scenes</h2>
              <p className="text-muted-foreground">
                This video was filmed during our team building retreat, where we combine serious security discussions with a bit of fun. We believe that a team that laughs together secures together!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPage;
