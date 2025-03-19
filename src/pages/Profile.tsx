
import { useEffect } from 'react';
import { ProfileCard } from '@/components/ProfileCard';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
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
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center animate-fade-in">Your Profile</h1>
          
          <div className="mb-12 text-center max-w-xl mx-auto animate-fade-in">
            <p className="text-muted-foreground">
              View and manage your account information below. This data is retrieved from your Okta identity profile.
            </p>
          </div>
          
          <ProfileCard />
        </div>
      </div>
    </div>
  );
};

export default Profile;
