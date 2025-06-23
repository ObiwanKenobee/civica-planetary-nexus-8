import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import {
  Bell,
  Settings,
  Menu,
  X,
  Compass,
  Heart,
  MessageCircle,
  Eye,
  Hand,
  Cpu,
} from "lucide-react";
import GlyphLogo from "./GlyphLogo";
import ClusterCompass from "./ClusterCompass";
import RitualInput from "./RitualInput";
import PresenceOrb from "./PresenceOrb";
import MobileNavigationDrawer from "../MobileNavigationDrawer";

interface NavigationOracleProps {
  isAuthenticated?: boolean;
  userRole?: string;
  onRoleSelect?: (role: string) => void;
  onArrivalChoice?: (choice: string) => void;
  className?: string;
}

const NavigationOracle = ({
  isAuthenticated = false,
  userRole,
  onRoleSelect,
  onArrivalChoice,
  className = "",
}: NavigationOracleProps) => {
  const navigate = useNavigate();
  const [showCompass, setShowCompass] = useState(false);
  const [currentLunarPhase, setCurrentLunarPhase] = useState<
    "new" | "waxing" | "full" | "waning"
  >("full");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      if (typeof window !== "undefined") {
        setIsMobile(window.innerWidth < 1024);
      }
    };

    checkMobile();
    if (typeof window !== "undefined") {
      window.addEventListener("resize", checkMobile);
      return () => window.removeEventListener("resize", checkMobile);
    }
  }, []);

  useEffect(() => {
    const updateCosmicAlignment = () => {
      const now = new Date();
      const day = now.getDate();

      // Simplified lunar phase calculation
      const lunarCycle = ((day % 28) / 28) * 4;
      let lunarPhase: "new" | "waxing" | "full" | "waning";
      if (lunarCycle < 1) lunarPhase = "new";
      else if (lunarCycle < 2) lunarPhase = "waxing";
      else if (lunarCycle < 3) lunarPhase = "full";
      else lunarPhase = "waning";

      setCurrentLunarPhase(lunarPhase);
    };

    updateCosmicAlignment();
    const interval = setInterval(updateCosmicAlignment, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleClusterSelect = (clusterId: number) => {
    setShowCompass(false);

    // Navigate based on cluster
    const clusterRoutes: Record<number, string> = {
      1: "/dashboard",
      2: "/dashboard",
      3: "/dashboard",
      4: "/dashboard",
      5: "/billing",
      6: "/dashboard",
      7: "/dashboard",
      8: "/dashboard",
      9: "/dashboard",
      10: "/dashboard",
      11: "/dashboard",
      12: "/dashboard",
      13: "/ritual-technologist",
    };

    const route = clusterRoutes[clusterId];
    if (route) {
      navigate(route);
    }
  };

  if (isMobile) {
    return (
      <div
        className={`relative bg-black/40 backdrop-blur-md border-b border-white/20 ${className}`}
      >
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Left: Logo and Title */}
            <div className="flex items-center space-x-3">
              <GlyphLogo
                variant={userRole || "base"}
                lunarPhase={currentLunarPhase}
                size={32}
                energyLevel={0.7}
                interactive={true}
              />
              <div>
                <div className="text-sm font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  CIVICA 144+
                </div>
                <div className="text-xs text-gray-400 capitalize">
                  {currentLunarPhase} moon
                </div>
              </div>
            </div>

            {/* Right: Mobile Navigation and Actions */}
            <div className="flex items-center space-x-2">
              {/* Sacred Pulses */}
              <motion.button
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Bell className="w-4 h-4 text-purple-400" />
              </motion.button>

              {/* Services Quick Access */}
              <Button
                onClick={() => navigate("/ritual-technologist")}
                variant="outline"
                size="sm"
                className="border-amber-400 text-amber-400 hover:bg-amber-400/20 text-xs px-2"
              >
                🛠️
              </Button>

              {/* Mobile Navigation Drawer */}
              <MobileNavigationDrawer
                isAuthenticated={isAuthenticated}
                userRole={userRole}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`relative bg-black/40 backdrop-blur-md border-b border-white/20 ${className}`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Left: Glyph Logo and Main Navigation */}
          <div className="flex items-center space-x-8">
            <GlyphLogo
              variant={userRole || "base"}
              lunarPhase={currentLunarPhase}
              size={48}
              energyLevel={0.7}
              interactive={true}
            />
            <div className="hidden xl:block">
              <div className="text-lg font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                CIVICA 144+
              </div>
              <div className="text-xs text-gray-400 capitalize">
                Sacred Technology Portal • {currentLunarPhase} moon
              </div>
            </div>
          </div>

          {/* Center: Navigation Options */}
          <div className="flex-1 flex justify-center max-w-2xl">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <RitualInput
                  mode="intention"
                  onIntention={(intention) =>
                    console.log("Intention:", intention)
                  }
                  size="sm"
                />
              </div>
            ) : (
              <div className="text-center">
                <h2 className="text-lg text-white mb-2 hidden sm:block">
                  Welcome to CIVICA 144
                </h2>
                <p className="text-sm text-gray-400">
                  Sacred Technology for Planetary Intelligence
                </p>
              </div>
            )}
          </div>

          {/* Right: Cluster Compass, Pulses, and Presence Orb */}
          <div className="flex items-center space-x-4">
            {/* Cluster Compass Toggle */}
            <motion.button
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowCompass(!showCompass)}
            >
              <Compass className="w-5 h-5 text-cyan-400" />
            </motion.button>

            {/* Sacred Pulses */}
            <motion.button
              className="relative p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Bell className="w-5 h-5 text-purple-400" />
            </motion.button>

            {/* Ritual Technologist Link */}
            <Button
              onClick={() => navigate("/ritual-technologist")}
              variant="outline"
              size="sm"
              className="border-amber-400 text-amber-400 hover:bg-amber-400/20 hidden sm:flex"
            >
              🛠️ Services
            </Button>

            {/* Guardian Intelligence Link */}
            <Button
              onClick={() => navigate("/guardian")}
              variant="outline"
              size="sm"
              className="border-cyan-400 text-cyan-400 hover:bg-cyan-400/20 hidden lg:flex"
            >
              🧬 Guardian
            </Button>

            {/* Presence Orb */}
            {isAuthenticated && (
              <PresenceOrb
                userRole={userRole}
                size="md"
                onLogoutClick={() => navigate("/auth")}
                onSettingsClick={() => navigate("/settings")}
              />
            )}
          </div>
        </div>
      </div>

      {/* Floating Cluster Compass */}
      <AnimatePresence>
        {showCompass && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -20 }}
            className="absolute top-full left-1/2 transform -translate-x-1/2 z-50 mt-4"
          >
            <Card className="bg-black/90 border-white/20 backdrop-blur-md p-6">
              <CardContent className="p-0">
                <ClusterCompass
                  size={200}
                  onClusterSelect={handleClusterSelect}
                  showLabels={true}
                  interactive={true}
                  energyFlow={true}
                />
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NavigationOracle;
