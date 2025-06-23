import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Sparkles,
  Globe,
  Heart,
  Code,
  Zap,
  Users,
  Star,
  CheckCircle,
  ArrowRight,
  Calendar,
  DollarSign,
  BookOpen,
  MessageCircle,
  Mail,
  Phone,
  ExternalLink,
  Clock,
  Award,
  Target,
  TrendingUp,
  Shield,
  Cpu,
  Brain,
  Eye,
  Settings,
  Download,
  Share,
  Menu,
  X,
  ChevronLeft,
  Filter,
  Search,
  Grid,
  List,
  Bell,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import NavigationOracle from "@/components/navigation/NavigationOracle";
import ServiceExposureHub from "@/components/ServiceExposureHub";
import ResponsiveTestimonialsCarousel from "@/components/ResponsiveTestimonialsCarousel";
import ResponsivePricingTables from "@/components/ResponsivePricingTables";
import EmergencySupportWidget from "@/components/EmergencySupportWidget";
import { useSacredAuth } from "@/hooks/useSacredAuth";

const RitualTechServices = () => {
  const navigate = useNavigate();
  const { user } = useSacredAuth();
  const [activeView, setActiveView] = useState<"grid" | "list">("grid");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [timeOfDay, setTimeOfDay] = useState<
    "dawn" | "midday" | "dusk" | "midnight"
  >("midday");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const updateTimeOfDay = () => {
      const hour = new Date().getHours();
      if (hour >= 5 && hour < 9) setTimeOfDay("dawn");
      else if (hour >= 9 && hour < 17) setTimeOfDay("midday");
      else if (hour >= 17 && hour < 21) setTimeOfDay("dusk");
      else setTimeOfDay("midnight");
    };

    updateTimeOfDay();
    const interval = setInterval(updateTimeOfDay, 60000);
    return () => clearInterval(interval);
  }, []);

  const getThemeClasses = () => {
    switch (timeOfDay) {
      case "dawn":
        return {
          gradient: "from-pink-900 via-purple-900 to-orange-900",
          accent: "from-pink-400 to-orange-400",
          particles: "text-pink-200",
        };
      case "midday":
        return {
          gradient: "from-blue-900 via-cyan-900 to-teal-900",
          accent: "from-cyan-400 to-teal-400",
          particles: "text-cyan-200",
        };
      case "dusk":
        return {
          gradient: "from-purple-900 via-indigo-900 to-pink-900",
          accent: "from-purple-400 to-pink-400",
          particles: "text-purple-200",
        };
      default:
        return {
          gradient: "from-indigo-900 via-purple-900 to-violet-900",
          accent: "from-indigo-400 to-violet-400",
          particles: "text-indigo-200",
        };
    }
  };

  const theme = getThemeClasses();

  const categories = [
    { id: "all", label: "All Services", count: 12 },
    { id: "architecture", label: "Sacred Architecture", count: 3 },
    { id: "ai-training", label: "AI Training", count: 2 },
    { id: "development", label: "Development", count: 4 },
    { id: "systems", label: "Systems Design", count: 2 },
    { id: "security", label: "Sacred Security", count: 1 },
  ];

  if (!isClient) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-white">Loading Sacred Services...</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen bg-gradient-to-br ${theme.gradient} text-white overflow-x-hidden`}
    >
      {/* Cosmic Background */}
      <div className="fixed inset-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/10 to-transparent animate-pulse"></div>
        {[...Array(150)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-1 h-1 bg-white rounded-full animate-pulse ${theme.particles}`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Navigation Oracle */}
      <div className="relative z-50">
        <NavigationOracle
          isAuthenticated={!!user}
          userRole={user?.user_metadata?.role || "visitor"}
        />
      </div>

      {/* Header Section */}
      <header className="relative z-20 pt-8 pb-6 px-4 sm:px-6">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Breadcrumb */}
            <div className="flex items-center space-x-2 text-sm text-gray-400 mb-6">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/")}
                className="text-gray-400 hover:text-white p-1"
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Home
              </Button>
              <span>/</span>
              <span className="text-cyan-400">Ritual Technology Services</span>
            </div>

            {/* Main Header */}
            <div className="text-center space-y-6 mb-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="flex items-center justify-center space-x-4 mb-4"
              >
                <div
                  className={`p-4 rounded-2xl bg-gradient-to-r ${theme.accent}`}
                >
                  <Cpu className="w-12 h-12 text-white" />
                </div>
              </motion.div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                <span
                  className={`bg-gradient-to-r ${theme.accent} bg-clip-text text-transparent`}
                >
                  Sacred Technology
                </span>
                <br />
                <span className="text-white">Services</span>
              </h1>

              <p className="text-lg sm:text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed px-4">
                Comprehensive consciousness-informed technology solutions for
                organizations ready to embrace regenerative business practices
                and sacred technological integration.
              </p>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 max-w-3xl mx-auto mt-8">
                <div className="text-center">
                  <div
                    className={`text-2xl sm:text-3xl font-bold bg-gradient-to-r ${theme.accent} bg-clip-text text-transparent`}
                  >
                    12+
                  </div>
                  <div className="text-xs sm:text-sm text-gray-400">
                    Service Types
                  </div>
                </div>
                <div className="text-center">
                  <div
                    className={`text-2xl sm:text-3xl font-bold bg-gradient-to-r ${theme.accent} bg-clip-text text-transparent`}
                  >
                    340%
                  </div>
                  <div className="text-xs sm:text-sm text-gray-400">
                    Avg Performance Boost
                  </div>
                </div>
                <div className="text-center">
                  <div
                    className={`text-2xl sm:text-3xl font-bold bg-gradient-to-r ${theme.accent} bg-clip-text text-transparent`}
                  >
                    98.5%
                  </div>
                  <div className="text-xs sm:text-sm text-gray-400">
                    Client Satisfaction
                  </div>
                </div>
                <div className="text-center">
                  <div
                    className={`text-2xl sm:text-3xl font-bold bg-gradient-to-r ${theme.accent} bg-clip-text text-transparent`}
                  >
                    24/7
                  </div>
                  <div className="text-xs sm:text-sm text-gray-400">
                    Sacred Support
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Filters & Search Section */}
      <section className="relative z-20 py-6 px-4 sm:px-6 border-b border-white/10">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-6"
          >
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search sacred services..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-black/40 border border-cyan-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={
                    selectedCategory === category.id ? "default" : "outline"
                  }
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                  className={`${
                    selectedCategory === category.id
                      ? "bg-cyan-500 text-white"
                      : "border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/20"
                  }`}
                >
                  {category.label}
                  <Badge
                    variant="secondary"
                    className="ml-2 bg-black/20 text-xs"
                  >
                    {category.count}
                  </Badge>
                </Button>
              ))}
            </div>

            {/* View Toggle */}
            <div className="flex items-center justify-center space-x-2">
              <Button
                variant={activeView === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveView("grid")}
                className={
                  activeView === "grid"
                    ? "bg-purple-500"
                    : "border-purple-500/30 text-purple-300"
                }
              >
                <Grid className="w-4 h-4 mr-2" />
                Grid
              </Button>
              <Button
                variant={activeView === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveView("list")}
                className={
                  activeView === "list"
                    ? "bg-purple-500"
                    : "border-purple-500/30 text-purple-300"
                }
              >
                <List className="w-4 h-4 mr-2" />
                List
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Services Content */}
      <main className="relative z-10 container mx-auto px-4 sm:px-6 py-8 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="space-y-12 sm:space-y-16"
        >
          {/* Featured Services */}
          <section>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                Featured Services
              </h2>
              <Badge className="bg-yellow-500 text-black">
                <Star className="w-3 h-3 mr-1" />
                Most Popular
              </Badge>
            </div>
            <ServiceExposureHub showBooking={true} featuredOnly={false} />
          </section>

          {/* Investment & Pricing */}
          <section>
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                Sacred Investment Options
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Transparent pricing for consciousness-informed technology
                solutions. All investments include sacred support and
                regenerative impact tracking.
              </p>
            </div>
            <ResponsivePricingTables showFlourish={true} />
          </section>

          {/* Success Stories */}
          <section>
            <ResponsiveTestimonialsCarousel
              autoPlay={true}
              showRatings={true}
              showProjectDetails={true}
            />
          </section>

          {/* Service Categories Deep Dive */}
          <section>
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                Service Categories
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Explore our comprehensive range of consciousness-informed
                technology services.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: Brain,
                  title: "Quantum-Sacred Architecture",
                  description:
                    "Revolutionary system design integrating quantum principles with sacred geometry",
                  color: "from-purple-500 to-cyan-500",
                  services: [
                    "Consciousness Analysis",
                    "Sacred Geometry Integration",
                    "Performance Optimization",
                  ],
                },
                {
                  icon: Globe,
                  title: "Bioregional AI Training",
                  description:
                    "Place-based artificial intelligence that understands local ecosystems",
                  color: "from-green-500 to-emerald-500",
                  services: [
                    "Ecosystem Data Integration",
                    "Cultural Wisdom Incorporation",
                    "Local Pattern Recognition",
                  ],
                },
                {
                  icon: Users,
                  title: "Collective Intelligence",
                  description:
                    "Harness the wisdom of crowds for superior decision-making systems",
                  color: "from-orange-500 to-red-500",
                  services: [
                    "Multi-perspective Analysis",
                    "Wisdom Crowd Integration",
                    "Collective Debugging",
                  ],
                },
                {
                  icon: Sparkles,
                  title: "Regenerative Systems",
                  description:
                    "Technology that actively heals and regenerates rather than depletes",
                  color: "from-cyan-500 to-blue-500",
                  services: [
                    "Life-supporting Design",
                    "Regenerative Feedback",
                    "Ecosystem Integration",
                  ],
                },
                {
                  icon: Shield,
                  title: "Sacred Security",
                  description:
                    "Protection through consciousness-based protocols and sacred boundaries",
                  color: "from-violet-500 to-purple-500",
                  services: [
                    "Consciousness Authentication",
                    "Sacred Boundaries",
                    "Energetic Protection",
                  ],
                },
                {
                  icon: Code,
                  title: "Development Services",
                  description:
                    "Full-stack development with consciousness as the primary consideration",
                  color: "from-yellow-500 to-orange-500",
                  services: [
                    "Conscious Coding",
                    "Sacred UX Design",
                    "Ethical Implementation",
                  ],
                },
              ].map((category, index) => {
                const IconComponent = category.icon;
                return (
                  <motion.div
                    key={category.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Card className="bg-black/40 border-white/10 backdrop-blur-md hover:border-white/20 transition-all h-full">
                      <CardHeader>
                        <div className="flex items-center space-x-3 mb-4">
                          <div
                            className={`p-3 rounded-xl bg-gradient-to-r ${category.color}`}
                          >
                            <IconComponent className="w-6 h-6 text-white" />
                          </div>
                          <CardTitle className="text-white">
                            {category.title}
                          </CardTitle>
                        </div>
                        <p className="text-gray-300">{category.description}</p>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <h4 className="text-white font-semibold text-sm">
                            Includes:
                          </h4>
                          <ul className="space-y-2">
                            {category.services.map((service, i) => (
                              <li
                                key={i}
                                className="text-gray-300 text-sm flex items-center"
                              >
                                <CheckCircle className="w-3 h-3 text-green-400 mr-2 flex-shrink-0" />
                                {service}
                              </li>
                            ))}
                          </ul>
                          <Button
                            variant="outline"
                            className="w-full mt-4 border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/20"
                            onClick={() => navigate("/ritual-technologist")}
                          >
                            Explore Details
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </section>

          {/* Call to Action */}
          <section className="text-center py-12 sm:py-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-white">
                Ready to Transform Your Organization?
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Begin your journey toward consciousness-informed technology that
                serves both your business goals and the greater good of all
                life.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 px-8 py-4"
                  onClick={() =>
                    window.open(
                      "mailto:ritual@civica144.com?subject=Sacred Technology Consultation",
                      "_blank",
                    )
                  }
                >
                  <Mail className="w-5 h-5 mr-2" />
                  Start Your Consultation
                </Button>

                <Button
                  size="lg"
                  variant="outline"
                  className="border-amber-400 text-amber-400 hover:bg-amber-400/20 px-8 py-4"
                  onClick={() => navigate("/ritual-technologist")}
                >
                  <BookOpen className="w-5 h-5 mr-2" />
                  View Full Platform
                </Button>
              </div>

              <div className="max-w-2xl mx-auto">
                <Card className="bg-gradient-to-r from-green-900/40 to-cyan-900/40 border-green-400/30">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-center space-x-3 mb-3">
                      <Heart className="w-6 h-6 text-green-400" />
                      <h3 className="text-white font-bold text-lg">
                        Sacred Guarantee
                      </h3>
                    </div>
                    <p className="text-gray-300 text-center">
                      Every service comes with our sacred commitment to
                      consciousness-first technology, regenerative impact, and
                      support for your organization's highest purpose.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          </section>
        </motion.div>
      </main>

      {/* Emergency Support Widget */}
      <EmergencySupportWidget position="bottom-right" variant="floating" />
    </div>
  );
};

export default RitualTechServices;
