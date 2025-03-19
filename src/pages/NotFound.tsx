
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cdw-blue/10 via-background to-cdw-red/10">
      <div className="text-center p-8 max-w-md glass rounded-2xl shadow-lg animate-scale-up">
        <h1 className="text-6xl font-bold mb-4 text-clip-gradient">404</h1>
        <p className="text-xl text-foreground mb-6">Oops! Page not found</p>
        <p className="text-muted-foreground mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link to="/">
          <Button className="bg-gradient-to-r from-cdw-red to-cdw-blue text-white hover:opacity-90 transition-all">
            <Home size={16} className="mr-2" />
            Return to Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
