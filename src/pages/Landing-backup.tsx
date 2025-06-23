import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import EnhancedNavigationBar from "@/components/navigation/EnhancedNavigationBar";

const Landing = () => {
  const navigate = useNavigate();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-white">Initializing Sacred Portal...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-x-hidden">
      {/* Enhanced Navigation */}
      <div className="relative z-50">
        <EnhancedNavigationBar variant="floating" showLabels={true} />
      </div>

      {/* Main Content */}
      <main className="relative z-10 pt-20">
        <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6">
          <div className="container mx-auto text-center max-w-6xl">
            <h1 className="text-4xl sm:text-6xl lg:text-8xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent leading-tight">
              Sacred Portal
            </h1>
            <p className="text-xl text-purple-400 font-medium mt-4">
              Welcome to the Future of Collaboration
            </p>

            <div className="mt-8 space-x-4">
              <Button
                onClick={() => navigate("/auth")}
                className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-8 py-4 text-lg"
                size="lg"
              >
                Enter Portal
              </Button>
              <Button
                onClick={() => navigate("/billing")}
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10 px-8 py-4 text-lg"
                size="lg"
              >
                View Plans
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Landing;
