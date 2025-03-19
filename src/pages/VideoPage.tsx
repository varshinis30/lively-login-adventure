
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
          <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center animate-fade-in">Meet Our Team</h1>
          
          <VideoPlayer src="/chituku_vibe.mp4" />
          
          <div className="mt-12 space-y-8 animate-in-sequence">
            <div className="glass p-6 rounded-xl">
              <h2 className="text-xl font-semibold mb-4">Team Building in Action</h2>
              <p className="text-muted-foreground">
                Nothing builds trust like having fun together! Here's our team during our last retreat, where we combine serious security discussions with team-building activities.
              </p>
            </div>
            
            <div className="glass p-6 rounded-xl">
              <h2 className="text-xl font-semibold mb-4">The Energy Behind Our Solutions</h2>
              <p className="text-muted-foreground">
                This video captures the spirit of our IAM team - energetic, collaborative, and always ready to tackle the next security challenge with creativity!
              </p>
            </div>
            
            <div className="glass p-6 rounded-xl">
              <h2 className="text-xl font-semibold mb-4">Work Hard, Play Hard</h2>
              <p className="text-muted-foreground">
                At CDW, we believe that a team that dances together, secures together! Our unique approach combines technical expertise with a positive, fun-loving culture.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPage;
