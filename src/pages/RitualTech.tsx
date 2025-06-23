import { useState, useEffect } from "react";
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
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import NavigationOracle from "@/components/navigation/NavigationOracle";
import IntelligentBlogSlider from "@/components/IntelligentBlogSlider";
import ServiceExposureHub from "@/components/ServiceExposureHub";
import ResponsiveTestimonialsCarousel from "@/components/ResponsiveTestimonialsCarousel";
import ResponsivePricingTables from "@/components/ResponsivePricingTables";
import TouchOptimizedIntelligenceFeed from "@/components/TouchOptimizedIntelligenceFeed";
import EmergencySupportWidget from "@/components/EmergencySupportWidget";
import { useSacredAuth } from "@/hooks/useSacredAuth";

const RitualTech = () => {
  const navigate = useNavigate();
  const { user } = useSacredAuth();
  const [activeSection, setActiveSection] = useState("overview");
  const [timeOfDay, setTimeOfDay] = useState<
    "dawn" | "midday" | "dusk" | "midnight"
  >("midday");
  const [flourishValue, setFlourishValue] = useState(0);
  const [intelligenceMetrics, setIntelligenceMetrics] = useState({
    activeProjects: 23,
    clientSatisfaction: 98.5,
    systemsDeployed: 147,
    consciousnessIndex: 87.3,
  });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Detect time of day for cosmic theming
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

  // Simulate live metrics updates
  useEffect(() => {
    const updateMetrics = () => {
      setIntelligenceMetrics((prev) => ({
        activeProjects: prev.activeProjects + Math.floor(Math.random() * 3) - 1,
        clientSatisfaction: Math.min(
          100,
          prev.clientSatisfaction + (Math.random() - 0.5) * 0.1,
        ),
        systemsDeployed: prev.systemsDeployed + Math.floor(Math.random() * 2),
        consciousnessIndex: Math.min(
          100,
          prev.consciousnessIndex + (Math.random() - 0.5) * 0.5,
        ),
      }));
    };

    const interval = setInterval(updateMetrics, 10000);
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

  const navigationSections = [
    { id: "overview", label: "Overview", icon: Eye },
    { id: "services", label: "Services", icon: Zap },
    { id: "pricing", label: "Investment", icon: DollarSign },
    { id: "testimonials", label: "Success Stories", icon: Star },
    { id: "intelligence", label: "Intelligence", icon: Brain },
    { id: "contact", label: "Consultation", icon: MessageCircle },
  ];

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setIsMobileMenuOpen(false);
  };

  if (!isClient) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-white">Initializing Ritual Technology Portal...</p>
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
        {[...Array(100)].map((_, i) => (
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

      {/* Mobile Section Navigation */}
      <div className="sticky top-0 z-40 bg-black/20 backdrop-blur-md border-b border-white/10 lg:hidden">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-3">
            <h1 className="text-lg font-bold text-cyan-400">
              🛠️ Ritual Technologist
            </h1>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white hover:bg-white/10"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>
          </div>

          {/* Mobile Navigation Menu */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="pb-4 space-y-2">
                  {navigationSections.map((section) => {
                    const IconComponent = section.icon;
                    return (
                      <Button
                        key={section.id}
                        variant="ghost"
                        onClick={() => scrollToSection(section.id)}
                        className={`w-full justify-start ${
                          activeSection === section.id
                            ? "bg-cyan-500/20 text-cyan-400"
                            : "text-gray-400 hover:text-white hover:bg-white/5"
                        }`}
                      >
                        <IconComponent className="w-4 h-4 mr-2" />
                        {section.label}
                      </Button>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Header - Desktop */}
      <header className="relative z-20 p-4 sm:p-6 border-b border-white/20 backdrop-blur-sm hidden lg:block">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0"
          >
            <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
              <div className="flex items-center space-x-4">
                <div
                  className={`p-3 rounded-xl bg-gradient-to-r ${theme.accent}`}
                >
                  <Cpu className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <div>
                  <h1
                    className={`text-2xl sm:text-3xl font-bold bg-gradient-to-r ${theme.accent} bg-clip-text text-transparent`}
                  >
                    Ritual Technologist
                  </h1>
                  <p className="text-gray-300 text-sm sm:text-base">
                    Consciousness-Informed Technology Solutions
                  </p>
                </div>
              </div>
            </div>

            {/* Live Metrics - Hidden on mobile */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 lg:flex lg:items-center lg:space-x-6 lg:gap-0">
              <div className="text-center">
                <div
                  className={`text-lg sm:text-2xl font-bold bg-gradient-to-r ${theme.accent} bg-clip-text text-transparent`}
                >
                  {intelligenceMetrics.activeProjects}
                </div>
                <div className="text-xs text-gray-400">Active Projects</div>
              </div>
              <div className="text-center">
                <div
                  className={`text-lg sm:text-2xl font-bold bg-gradient-to-r ${theme.accent} bg-clip-text text-transparent`}
                >
                  {intelligenceMetrics.clientSatisfaction.toFixed(1)}%
                </div>
                <div className="text-xs text-gray-400">Client Satisfaction</div>
              </div>
              <div className="text-center">
                <div
                  className={`text-lg sm:text-2xl font-bold bg-gradient-to-r ${theme.accent} bg-clip-text text-transparent`}
                >
                  {intelligenceMetrics.consciousnessIndex.toFixed(1)}
                </div>
                <div className="text-xs text-gray-400">Consciousness Index</div>
              </div>
              <div className="text-center">
                <div
                  className={`text-lg sm:text-2xl font-bold bg-gradient-to-r ${theme.accent} bg-clip-text text-transparent`}
                >
                  {intelligenceMetrics.systemsDeployed}
                </div>
                <div className="text-xs text-gray-400">Systems Deployed</div>
              </div>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Desktop Navigation Tabs */}
      <div className="relative z-20 border-b border-white/10 hidden lg:block">
        <div className="container mx-auto px-6">
          <div className="flex space-x-1 overflow-x-auto">
            {navigationSections.map((section) => {
              const IconComponent = section.icon;
              return (
                <Button
                  key={section.id}
                  variant="ghost"
                  onClick={() => scrollToSection(section.id)}
                  className={`flex items-center space-x-2 px-6 py-4 rounded-none border-b-2 transition-all whitespace-nowrap ${
                    activeSection === section.id
                      ? `border-cyan-400 bg-cyan-500/10 text-cyan-400`
                      : "border-transparent text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                  <span>{section.label}</span>
                </Button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-12 sm:space-y-16 lg:space-y-20">
        {/* Overview Section */}
        <section id="overview" className="space-y-8 sm:space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-6 sm:space-y-8"
          >
            <h2 className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight">
              <span
                className={`bg-gradient-to-r ${theme.accent} bg-clip-text text-transparent`}
              >
                Technology
              </span>
              <br />
              <span className="text-white">That Serves</span>
              <br />
              <span
                className={`bg-gradient-to-r ${theme.accent} bg-clip-text text-transparent`}
              >
                Consciousness
              </span>
            </h2>

            <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed px-4">
              Where ancient wisdom meets cutting-edge technology. I specialize
              in creating digital systems that honor consciousness, serve
              ecological regeneration, and enhance collective intelligence.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 lg:space-x-6 px-4">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600"
                onClick={() => scrollToSection("services")}
              >
                <Zap className="w-5 h-5 mr-2" />
                Explore Services
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-white/30 text-white hover:bg-white/10"
                onClick={() => scrollToSection("contact")}
              >
                <Calendar className="w-5 h-5 mr-2" />
                Book Consultation
              </Button>
            </div>
          </motion.div>

          {/* Unique Value Proposition */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <Card className="bg-black/40 border-cyan-500/30 backdrop-blur-md">
              <CardHeader className="pb-3">
                <div className="flex items-center space-x-3">
                  <Brain className="w-6 h-6 sm:w-8 sm:h-8 text-cyan-400" />
                  <CardTitle className="text-cyan-400 text-lg sm:text-xl">
                    Consciousness-First
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 leading-relaxed">
                  Technology designed with consciousness as the primary
                  consideration, creating systems that feel alive and responsive
                  to human needs.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-black/40 border-green-500/30 backdrop-blur-md">
              <CardHeader className="pb-3">
                <div className="flex items-center space-x-3">
                  <Globe className="w-6 h-6 sm:w-8 sm:h-8 text-green-400" />
                  <CardTitle className="text-green-400 text-lg sm:text-xl">
                    Regenerative Impact
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 leading-relaxed">
                  Every system I build contributes to ecological and social
                  regeneration, going beyond sustainability to actively heal our
                  world.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-black/40 border-purple-500/30 backdrop-blur-md md:col-span-2 lg:col-span-1">
              <CardHeader className="pb-3">
                <div className="flex items-center space-x-3">
                  <Users className="w-6 h-6 sm:w-8 sm:h-8 text-purple-400" />
                  <CardTitle className="text-purple-400 text-lg sm:text-xl">
                    Collective Intelligence
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 leading-relaxed">
                  Harness the wisdom of crowds and collective intelligence to
                  create systems that grow smarter and more effective over time.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Services Section */}
        <section id="services">
          <ServiceExposureHub />
        </section>

        {/* Pricing Section */}
        <section id="pricing">
          <ResponsivePricingTables showFlourish={true} />
        </section>

        {/* Testimonials Section */}
        <section id="testimonials">
          <ResponsiveTestimonialsCarousel
            autoPlay={true}
            showRatings={true}
            showProjectDetails={true}
          />
        </section>

        {/* Intelligence Section */}
        <section id="intelligence" className="space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Intelligence Layer
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Live insights, breakthroughs, and thought leadership in
              consciousness-informed technology.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-white mb-4">
                Intelligence Dispatches
              </h3>
              <IntelligentBlogSlider
                maxPosts={6}
                autoAdvance={true}
                showIntelligenceInsights={true}
              />
            </div>

            <div>
              <h3 className="text-xl font-bold text-white mb-4">Live Feed</h3>
              <TouchOptimizedIntelligenceFeed
                maxItems={8}
                autoRefresh={true}
                showEngagement={true}
                variant="full"
              />
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Begin Your Consultation
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Ready to explore consciousness-informed technology solutions?
              Let's discuss how we can serve your vision.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <Card className="bg-black/40 border-cyan-500/30 backdrop-blur-md">
              <CardHeader className="pb-3">
                <CardTitle className="text-cyan-400 flex items-center">
                  <Mail className="w-5 h-5 mr-2" />
                  Direct Consultation
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-300 text-sm sm:text-base">
                  Schedule a direct consultation to explore your specific needs
                  and co-create a consciousness-informed solution.
                </p>
                <Button
                  className="w-full bg-gradient-to-r from-cyan-500 to-purple-500"
                  onClick={() =>
                    window.open(
                      "mailto:ritual@civica144.com?subject=Consultation Request",
                      "_blank",
                    )
                  }
                >
                  <Mail className="w-4 h-4 mr-2" />
                  ritual@civica144.com
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-black/40 border-purple-500/30 backdrop-blur-md">
              <CardHeader className="pb-3">
                <CardTitle className="text-purple-400 flex items-center">
                  <Calendar className="w-5 h-5 mr-2" />
                  Sacred Scheduling
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-300 text-sm sm:text-base">
                  Honor natural rhythms and cosmic timing with our sacred
                  scheduling approach to consultations.
                </p>
                <Button
                  variant="outline"
                  className="w-full border-purple-500 text-purple-400 hover:bg-purple-500/20"
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Sacred Calendar (Coming Soon)
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-black/40 border-green-500/30 backdrop-blur-md md:col-span-2 lg:col-span-1">
              <CardHeader className="pb-3">
                <CardTitle className="text-green-400 flex items-center">
                  <Phone className="w-5 h-5 mr-2" />
                  Emergency Support
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-300 text-sm sm:text-base">
                  For urgent technical matters requiring immediate
                  consciousness-informed guidance and support.
                </p>
                <Button
                  variant="outline"
                  className="w-full border-green-500 text-green-400 hover:bg-green-500/20"
                  onClick={() =>
                    window.open("tel:+1-555-RITUAL-TECH", "_blank")
                  }
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Emergency Hotline
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="text-center space-y-4 max-w-4xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 text-sm">
              <div className="text-gray-400">
                <div className="font-semibold text-white mb-1">
                  Response Time
                </div>
                <div>24-48 hours</div>
              </div>
              <div className="text-gray-400">
                <div className="font-semibold text-white mb-1">
                  Consultation Fee
                </div>
                <div>Complimentary Discovery</div>
              </div>
              <div className="text-gray-400">
                <div className="font-semibold text-white mb-1">
                  Time Investment
                </div>
                <div>45-60 minutes</div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Emergency Support Widget */}
      <EmergencySupportWidget position="bottom-right" variant="floating" />
    </div>
  );
};

export default RitualTech;
