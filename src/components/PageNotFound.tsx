// CIVICA 144 Sacred 404 Page
// When paths diverge from the sacred flow

import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Compass,
  Home,
  ArrowLeft,
  Search,
  Map,
  Star,
  TreePine,
  Heart,
  Sparkles,
  Eye,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import SacredPortal from "@/components/SacredPortal";

const SUGGESTED_PATHS = [
  {
    path: "/dashboard",
    name: "Sacred Dashboard",
    icon: <Compass className="w-5 h-5" />,
    description: "Return to your planetary intelligence center",
    color: "from-cyan-500 to-blue-500",
  },
  {
    path: "/community",
    name: "Sacred Community",
    icon: <Heart className="w-5 h-5" />,
    description: "Connect with fellow planetary stewards",
    color: "from-purple-500 to-pink-500",
  },
  {
    path: "/wisdom",
    name: "Wisdom Library",
    icon: <Star className="w-5 h-5" />,
    description: "Explore the repository of sacred knowledge",
    color: "from-yellow-500 to-orange-500",
  },
  {
    path: "/ritual-technologist",
    name: "Ritual Technology Services",
    icon: <Sparkles className="w-5 h-5" />,
    description: "Sacred business transformation consulting",
    color: "from-amber-500 to-orange-500",
  },
  {
    path: "/calendar",
    name: "Sacred Calendar",
    icon: <TreePine className="w-5 h-5" />,
    description: "Cosmic alignments and ritual coordination",
    color: "from-green-500 to-emerald-500",
  },
];

const MYSTICAL_MESSAGES = [
  "Sometimes the path not taken leads to greater wisdom...",
  "In the multiverse of possibilities, you've found an uncharted realm...",
  "The cosmic web has infinite threads - this one awaits creation...",
  "Every lost traveler eventually finds their way to sacred ground...",
  "The void between worlds is where new realities are born...",
];

export const PageNotFound: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentMessage] = React.useState(
    MYSTICAL_MESSAGES[Math.floor(Math.random() * MYSTICAL_MESSAGES.length)],
  );

  const handleGoHome = () => {
    navigate("/");
  };

  const handleGoBack = () => {
    window.history.back();
  };

  const handleSearch = () => {
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Cosmic Background */}
      <div className="fixed inset-0 opacity-10">
        {[...Array(80)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0.5],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: Math.random() * 4 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-6 py-16 flex items-center justify-center min-h-screen">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="max-w-4xl w-full text-center space-y-12"
        >
          {/* Sacred Portal */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, duration: 1, type: "spring" }}
            className="flex justify-center"
          >
            <SacredPortal
              type="mandala"
              size={200}
              intensity={0.6}
              timeOfDay="midnight"
              interactive={false}
            />
          </motion.div>

          {/* Main Content */}
          <Card className="bg-black/40 border-white/20 backdrop-blur-md">
            <CardHeader className="text-center">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="space-y-4"
              >
                <div className="flex items-center justify-center space-x-4">
                  <Badge className="bg-purple-500/20 text-purple-400 px-4 py-2 text-lg">
                    <Map className="w-5 h-5 mr-2" />
                    404
                  </Badge>
                  <Badge className="bg-cyan-500/20 text-cyan-400 px-4 py-2">
                    <Eye className="w-4 h-4 mr-1" />
                    Portal Not Found
                  </Badge>
                </div>

                <CardTitle className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  Uncharted Sacred Space
                </CardTitle>

                <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                  You've wandered into a realm between worlds. The path you seek
                  does not yet exist in the sacred web.
                </p>
              </motion.div>
            </CardHeader>

            <CardContent className="space-y-8">
              {/* Mystical Message */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="text-center"
              >
                <p className="text-lg italic text-purple-300">
                  "{currentMessage}"
                </p>
              </motion.div>

              {/* Current Path Info */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
                className="bg-black/20 rounded-lg p-4"
              >
                <h3 className="text-cyan-400 font-semibold mb-2">Lost Path:</h3>
                <code className="text-orange-400 bg-black/40 px-3 py-1 rounded">
                  {location.pathname}
                </code>
              </motion.div>

              {/* Suggested Paths */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.5 }}
                className="space-y-6"
              >
                <h3 className="text-2xl font-bold text-center text-cyan-400">
                  Choose a Sacred Path
                </h3>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {SUGGESTED_PATHS.map((path, index) => (
                    <motion.div
                      key={path.path}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 3 + index * 0.1 }}
                      whileHover={{ scale: 1.05, y: -5 }}
                      className="cursor-pointer"
                      onClick={() => navigate(path.path)}
                    >
                      <Card className="bg-black/20 border-white/10 hover:border-white/30 transition-all h-full">
                        <CardContent className="p-4 text-center space-y-3">
                          <div
                            className={`w-12 h-12 mx-auto rounded-full bg-gradient-to-r ${path.color} flex items-center justify-center`}
                          >
                            {path.icon}
                          </div>
                          <h4 className="font-semibold text-white">
                            {path.name}
                          </h4>
                          <p className="text-sm text-gray-400">
                            {path.description}
                          </p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 3.5 }}
                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              >
                <Button
                  onClick={handleGoHome}
                  size="lg"
                  className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 px-8"
                >
                  <Home className="w-5 h-5 mr-2" />
                  Return to Sacred Portal
                </Button>

                <Button
                  onClick={handleGoBack}
                  variant="outline"
                  size="lg"
                  className="border-white/30 text-white hover:bg-white/10 px-8"
                >
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  Retrace Sacred Steps
                </Button>

                <Button
                  onClick={handleSearch}
                  variant="outline"
                  size="lg"
                  className="border-cyan-400 text-cyan-400 hover:bg-cyan-400/20 px-8"
                >
                  <Search className="w-5 h-5 mr-2" />
                  Explore Platform
                </Button>
              </motion.div>

              {/* Sacred Footer */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 4 }}
                className="text-center pt-6 border-t border-white/20"
              >
                <p className="text-sm text-gray-400">
                  Lost paths often lead to the most beautiful discoveries. The
                  sacred technology learns and adapts with every journey.
                </p>
                <p className="text-xs text-gray-500 mt-2">
                  CIVICA 144 • Sacred Technology for Planetary Intelligence
                </p>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default PageNotFound;
