
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/context/AuthContext';

export const ProfileCard = () => {
  const { user } = useAuth();
  
  if (!user) {
    return <div>Loading user information...</div>;
  }

  // Get user initials for avatar fallback
  const getInitials = () => {
    if (user.name && typeof user.name === 'string') {
      return user.name
        .split(' ')
        .map(name => name[0])
        .join('')
        .toUpperCase();
    }
    return user.username && typeof user.username === 'string' 
      ? user.username.substring(0, 2).toUpperCase() 
      : 'U';
  };

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg animate-scale-up">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl">User Profile</CardTitle>
            <CardDescription>Your Okta account information</CardDescription>
          </div>
          <Avatar className="h-16 w-16">
            <AvatarImage src={typeof user.picture === 'string' ? user.picture : undefined} alt={typeof user.name === 'string' ? user.name : 'User'} />
            <AvatarFallback className="bg-primary text-primary-foreground text-lg">
              {getInitials()}
            </AvatarFallback>
          </Avatar>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 gap-4">
          <div className="space-y-1.5">
            <h3 className="text-sm font-medium text-muted-foreground">Full Name</h3>
            <p className="text-base font-medium">{typeof user.name === 'string' ? user.name : 'Not provided'}</p>
          </div>
          
          <div className="space-y-1.5">
            <h3 className="text-sm font-medium text-muted-foreground">Username</h3>
            <p className="text-base font-medium">
              {typeof user.username === 'string' 
                ? user.username 
                : typeof user.preferred_username === 'string' 
                  ? user.preferred_username 
                  : 'Not provided'}
            </p>
          </div>
          
          <div className="space-y-1.5">
            <h3 className="text-sm font-medium text-muted-foreground">Email</h3>
            <p className="text-base font-medium">{typeof user.email === 'string' ? user.email : 'Not provided'}</p>
          </div>
          
          {user.groups && Array.isArray(user.groups) && (
            <div className="space-y-1.5">
              <h3 className="text-sm font-medium text-muted-foreground">Groups</h3>
              <div className="flex flex-wrap gap-2">
                {user.groups.map((group, index) => (
                  <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary/20 text-secondary">
                    {typeof group === 'string' ? group : String(group)}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
