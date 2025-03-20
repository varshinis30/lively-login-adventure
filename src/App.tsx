
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Security } from "@okta/okta-react";
import { Navbar } from "@/components/Navbar";
import { AuthProvider } from "@/context/AuthContext";
import Home from "./pages/Home";
import VideoPage from "./pages/VideoPage";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import oktaAuth from "./lib/auth";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Security oktaAuth={oktaAuth} restoreOriginalUri={async (_oktaAuth, originalUri) => {
          window.location.replace(originalUri || '/');
        }}>
          <AuthProvider>
            <div className="min-h-screen flex flex-col w-full">
              <Navbar />
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/video" element={<VideoPage />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/login/callback" element={null} /> {/* Empty element, the auth provider will handle redirection */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
            </div>
          </AuthProvider>
        </Security>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
