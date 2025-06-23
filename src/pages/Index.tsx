import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Sparkles,
  Users,
  Brain,
  BookOpen,
  TreePine,
  Crown,
  Star,
  Heart,
  Zap,
  Shield,
  Globe,
  Calendar,
  MessageCircle,
  Settings,
  Bell,
  BarChart3,
  Network,
  Compass,
} from "lucide-react";
import { motion } from "framer-motion";
import { useSacredAuth } from "@/hooks/useSacredAuth";
import { useCivica } from "@/contexts/CivicaContext";
import { useNavigate } from "react-router-dom";
import AtlasOfIntelligence from "@/components/AtlasOfIntelligence";
import PatternRecognition from "@/components/PatternRecognition";
import SDGIntelligence from "@/components/SDGIntelligence";
import CollaborativeBuilder from "@/components/CollaborativeBuilder";
import FlourishDisplay from "@/components/FlourishDisplay";
import NavigationOracle from "@/components/navigation/NavigationOracle";
import CommunityHub from "@/components/CommunityHub";
import SacredCalendar from "@/components/SacredCalendar";
import WisdomLibrary from "@/components/WisdomLibrary";
import {
  NotificationProvider,
  NotificationDisplay,
} from "@/components/NotificationSystem";

const Index = () => {
  const navigate = useNavigate();
  const { user } = useSacredAuth();
  const { state: civicaState, addWisdomStream } = useCivica();

  const [activeTab, setActiveTab] = useState("overview");
  const [selectedCluster, setSelectedCluster] = useState<number | null>(null);
  const [isRitualMode, setIsRitualMode] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (user) {
      addWisdomStream(
        `Sacred steward ${user.user_metadata?.full_name || "Anonymous"} enters the collective intelligence space`,
        "user_dashboard",
      );
    }
  }, [user, addWisdomStream]);

  const getTimeGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 6) return "Sacred Dawn";
    if (hour < 12) return "Blessed Morning";
    if (hour < 17) return "Radiant Day";
    if (hour < 21) return "Sacred Evening";
    return "Mystical Night";
  };

  return (
    <NotificationProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
        {/* Cosmic Background */}
        <div className="fixed inset-0 opacity-10">
          {[...Array(100)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
              }}
            />
          ))}
        </div>

        {/* Navigation Oracle */}
        <NavigationOracle
          isAuthenticated={true}
          userRole={user?.user_metadata?.role || "steward"}
          onRoleSelect={(role) => console.log("Role selected:", role)}
        />

        {/* Notification System */}
        <NotificationDisplay position="top-right" showBell={true} />

        {/* Main Dashboard Content */}
        <div className="relative z-10 container mx-auto px-6 py-8 space-y-8">
          {/* Welcome Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-4"
          >
            <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              {getTimeGreeting()},{" "}
              {user?.user_metadata?.full_name || "Sacred Steward"}
            </h1>
            <p className="text-gray-300 text-lg">
              Welcome to your planetary intelligence dashboard. The collective
              consciousness flows through you.
            </p>
          </motion.div>

          {/* Sacred Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            <Card className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border-cyan-400/20 backdrop-blur-md">
              <CardContent className="p-6 text-center">
                <Brain className="w-8 h-8 mx-auto mb-3 text-cyan-400" />
                <div className="text-2xl font-bold text-white">144</div>
                <div className="text-sm text-cyan-400">Active SDGs</div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-purple-400/20 backdrop-blur-md">
              <CardContent className="p-6 text-center">
                <Users className="w-8 h-8 mx-auto mb-3 text-purple-400" />
                <div className="text-2xl font-bold text-white">12.8K</div>
                <div className="text-sm text-purple-400">Sacred Stewards</div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border-green-400/20 backdrop-blur-md">
              <CardContent className="p-6 text-center">
                <TreePine className="w-8 h-8 mx-auto mb-3 text-green-400" />
                <div className="text-2xl font-bold text-white">47</div>
                <div className="text-sm text-green-400">Bioregions</div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-orange-500/20 to-red-500/20 border-orange-400/20 backdrop-blur-md">
              <CardContent className="p-6 text-center">
                <Crown className="w-8 h-8 mx-auto mb-3 text-orange-400" />
                <div className="text-2xl font-bold text-white">89</div>
                <div className="text-sm text-orange-400">Active Rituals</div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border-yellow-400/20 backdrop-blur-md">
              <CardContent className="p-6 text-center">
                <Sparkles className="w-8 h-8 mx-auto mb-3 text-yellow-400" />
                <div className="text-2xl font-bold text-white">2.3M</div>
                <div className="text-sm text-yellow-400">Flourish Flowing</div>
              </CardContent>
            </Card>
          </div>

          {/* Flourish Display */}
          <FlourishDisplay />

          {/* Featured Ritual Technologist */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-8"
          >
            <Card className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 border-amber-400/30 backdrop-blur-md">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center text-xl">
                      🛠️
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-amber-400">
                        Ritual Technology Services
                      </h3>
                      <p className="text-gray-300">
                        Sacred business transformation and civilizational
                        technology consulting
                      </p>
                    </div>
                  </div>
                  <Button
                    onClick={() => navigate("/ritual-technologist")}
                    className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 px-6"
                  >
                    Explore Services
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Enhanced Tab Navigation */}
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="space-y-6"
          >
            <TabsList className="grid w-full grid-cols-7 bg-black/40 border border-white/20">
              <TabsTrigger
                value="overview"
                className="data-[state=active]:bg-cyan-500/50"
              >
                <BarChart3 className="w-4 h-4 mr-2" />
                Overview
              </TabsTrigger>
              <TabsTrigger
                value="intelligence"
                className="data-[state=active]:bg-blue-500/50"
              >
                <Brain className="w-4 h-4 mr-2" />
                Intelligence
              </TabsTrigger>
              <TabsTrigger
                value="community"
                className="data-[state=active]:bg-purple-500/50"
              >
                <Users className="w-4 h-4 mr-2" />
                Community
              </TabsTrigger>
              <TabsTrigger
                value="calendar"
                className="data-[state=active]:bg-green-500/50"
              >
                <Calendar className="w-4 h-4 mr-2" />
                Calendar
              </TabsTrigger>
              <TabsTrigger
                value="wisdom"
                className="data-[state=active]:bg-yellow-500/50"
              >
                <BookOpen className="w-4 h-4 mr-2" />
                Wisdom
              </TabsTrigger>
              <TabsTrigger
                value="patterns"
                className="data-[state=active]:bg-pink-500/50"
              >
                <Network className="w-4 h-4 mr-2" />
                Patterns
              </TabsTrigger>
              <TabsTrigger
                value="builder"
                className="data-[state=active]:bg-orange-500/50"
              >
                <Compass className="w-4 h-4 mr-2" />
                Builder
              </TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <div className="grid lg:grid-cols-2 gap-8">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <AtlasOfIntelligence
                    selectedCluster={selectedCluster}
                    onClusterSelect={setSelectedCluster}
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <SDGIntelligence />
                </motion.div>
              </div>

              {/* Quick Access Cards */}
              <div className="grid md:grid-cols-3 gap-6 mt-8">
                <Card
                  className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 border-purple-400/20 backdrop-blur-md cursor-pointer hover:scale-105 transition-transform"
                  onClick={() => setActiveTab("community")}
                >
                  <CardContent className="p-6 text-center">
                    <Users className="w-8 h-8 mx-auto mb-3 text-purple-400" />
                    <h3 className="font-bold text-white mb-2">
                      Sacred Community
                    </h3>
                    <p className="text-gray-300 text-sm">
                      Connect with fellow stewards and join sacred circles
                    </p>
                  </CardContent>
                </Card>

                <Card
                  className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-green-400/20 backdrop-blur-md cursor-pointer hover:scale-105 transition-transform"
                  onClick={() => setActiveTab("calendar")}
                >
                  <CardContent className="p-6 text-center">
                    <Calendar className="w-8 h-8 mx-auto mb-3 text-green-400" />
                    <h3 className="font-bold text-white mb-2">
                      Sacred Calendar
                    </h3>
                    <p className="text-gray-300 text-sm">
                      Cosmic alignments and ritual coordination
                    </p>
                  </CardContent>
                </Card>

                <Card
                  className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border-yellow-400/20 backdrop-blur-md cursor-pointer hover:scale-105 transition-transform"
                  onClick={() => setActiveTab("wisdom")}
                >
                  <CardContent className="p-6 text-center">
                    <BookOpen className="w-8 h-8 mx-auto mb-3 text-yellow-400" />
                    <h3 className="font-bold text-white mb-2">
                      Wisdom Library
                    </h3>
                    <p className="text-gray-300 text-sm">
                      Sacred knowledge repository and sharing
                    </p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Intelligence Tab */}
            <TabsContent value="intelligence" className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <AtlasOfIntelligence
                  selectedCluster={selectedCluster}
                  onClusterSelect={setSelectedCluster}
                />
              </motion.div>
            </TabsContent>

            {/* Community Tab */}
            <TabsContent value="community" className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <CommunityHub />
              </motion.div>
            </TabsContent>

            {/* Calendar Tab */}
            <TabsContent value="calendar" className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <SacredCalendar />
              </motion.div>
            </TabsContent>

            {/* Wisdom Tab */}
            <TabsContent value="wisdom" className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <WisdomLibrary />
              </motion.div>
            </TabsContent>

            {/* Patterns Tab */}
            <TabsContent value="patterns" className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <PatternRecognition />
              </motion.div>
            </TabsContent>

            {/* Builder Tab */}
            <TabsContent value="builder" className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <CollaborativeBuilder />
              </motion.div>
            </TabsContent>
          </Tabs>

          {/* Footer Sacred Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center pt-8 border-t border-white/20"
          >
            <div className="flex items-center justify-center space-x-6 text-sm text-gray-400">
              <button
                onClick={() => navigate("/billing")}
                className="hover:text-cyan-400 transition-colors"
              >
                Sacred Economy
              </button>
              <button
                onClick={() => navigate("/ritual-technologist")}
                className="hover:text-amber-400 transition-colors"
              >
                🛠️ Ritual Technology Services
              </button>
              <button
                onClick={() => navigate("/")}
                className="hover:text-purple-400 transition-colors"
              >
                Portal Home
              </button>
            </div>
            <p className="mt-4 text-xs text-gray-500">
              CIVICA 144 • Living System for Planetary Intelligence • Sacred
              Technology in Service of All Life
            </p>
          </motion.div>
        </div>
      </div>
    </NotificationProvider>
  );
};

export default Index;
