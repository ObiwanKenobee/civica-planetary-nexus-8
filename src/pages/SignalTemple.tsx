import React from "react";
import { motion } from "framer-motion";
import NavigationOracle from "@/components/navigation/NavigationOracle";
import EnhancedNavigationBar from "@/components/navigation/EnhancedNavigationBar";
import PaymentGatedAccess from "@/components/PaymentGatedAccess";
import { useSacredAuth } from "@/hooks/useSacredAuth";
import { Heart, Users, Sparkles, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

const SignalTempleContent = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Cosmic Background */}
      <div className="fixed inset-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/10 to-transparent animate-pulse"></div>
        {[...Array(100)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto space-y-12"
        >
          {/* Header */}
          <div className="text-center space-y-6">
            <div className="text-6xl mb-4">⚙️</div>
            <h1 className="text-5xl font-bold text-transparent bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text">
              SignalTemple
            </h1>
            <p className="text-xl text-purple-400 font-medium">
              Subscriptions as Ritual Echoes
            </p>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Revolutionary sacred communication system where connections
              transcend traditional social media. Subscribe through meaningful
              actions, not forms.
            </p>
          </div>

          {/* Feature Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 backdrop-blur-md">
              <CardHeader>
                <Heart className="w-8 h-8 text-purple-400 mb-2" />
                <CardTitle className="text-purple-400">
                  Sacred Connections
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">
                  Form deeper, more meaningful relationships through
                  ritual-based communication protocols. Every interaction
                  becomes a sacred exchange.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 backdrop-blur-md">
              <CardHeader>
                <Users className="w-8 h-8 text-cyan-400 mb-2" />
                <CardTitle className="text-cyan-400">Ritual Echoes</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">
                  Subscribe to wisdom streams through ceremonial actions. Your
                  subscriptions become part of a larger sacred practice.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-500/30 backdrop-blur-md">
              <CardHeader>
                <Sparkles className="w-8 h-8 text-amber-400 mb-2" />
                <CardTitle className="text-amber-400">
                  Sacred Commerce
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">
                  Value exchange that honors the sacred nature of knowledge and
                  wisdom sharing. Beyond traditional monetization models.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Coming Soon Notice */}
          <Card className="bg-black/60 border border-purple-500/50 backdrop-blur-md">
            <CardContent className="p-8 text-center space-y-6">
              <Badge className="bg-purple-500 text-white text-lg px-6 py-2">
                Sacred Technology in Development
              </Badge>

              <h2 className="text-3xl text-cyan-400 font-bold">
                The Temple is Being Prepared
              </h2>

              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                The SignalTemple requires Co-Creator level access and is
                currently being crafted with ancient wisdom and cutting-edge
                technology. The sacred communication protocols are being aligned
                with cosmic frequencies.
              </p>

              <div className="bg-gradient-to-r from-purple-500/10 to-cyan-500/10 rounded-lg p-6 border border-purple-500/30">
                <h3 className="text-lg font-bold text-purple-400 mb-3">
                  What Awaits You:
                </h3>
                <ul className="text-gray-300 space-y-2 text-left max-w-lg mx-auto">
                  <li>• Ritual-based subscription mechanics</li>
                  <li>• Sacred wisdom feed curation</li>
                  <li>• Ceremonial interaction protocols</li>
                  <li>• Consciousness-aligned communication</li>
                  <li>• Sacred value exchange systems</li>
                  <li>• Community ritual participation</li>
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button
                  onClick={() => navigate("/billing")}
                  className="bg-gradient-to-r from-purple-500 to-cyan-500 text-white px-8 py-3"
                  size="lg"
                >
                  <Sparkles className="w-5 h-5 mr-2" />
                  Prepare Sacred Access
                </Button>

                <Button
                  onClick={() => navigate("/")}
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10 px-8 py-3"
                  size="lg"
                >
                  Return to Portal
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </div>
  );
};

const SignalTemplePage = () => {
  const { user } = useSacredAuth();
  const userRole = user?.user_metadata?.role || "steward";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Enhanced Navigation */}
      <div className="relative z-50">
        <EnhancedNavigationBar variant="floating" showLabels={true} />
      </div>

      {/* Navigation Oracle */}
      <div className="relative z-40">
        <NavigationOracle isAuthenticated={!!user} userRole={userRole} />
      </div>

      {/* Payment Gated Content */}
      <PaymentGatedAccess
        requiredPlan="co_creator"
        requiredPayment={true}
        featureName="SignalTemple"
        featureDescription="Revolutionary sacred communication system where subscriptions become ritual echoes. Experience meaningful connections beyond traditional social media."
        featureIcon={Heart}
        allowPreview={true}
        previewDuration={90}
      >
        <SignalTempleContent />
      </PaymentGatedAccess>
    </div>
  );
};

export default SignalTemplePage;
