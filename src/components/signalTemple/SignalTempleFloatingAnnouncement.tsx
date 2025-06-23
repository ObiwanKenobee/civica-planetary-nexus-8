import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Waves,
  X,
  CheckCircle,
  Sparkles,
  Star,
  Bell,
  Scroll,
  Globe,
  Users,
  Heart,
  Zap,
  ArrowRight,
  Info,
  Gift,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface SignalTempleFloatingAnnouncementProps {
  onAccept?: () => void;
  onClose?: () => void;
  autoShow?: boolean;
  userId?: string;
}

const SignalTempleFloatingAnnouncement: React.FC<
  SignalTempleFloatingAnnouncementProps
> = ({ onAccept, onClose, autoShow = true, userId = "demo_user" }) => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [hasSeenAnnouncement, setHasSeenAnnouncement] = useState(false);

  useEffect(() => {
    // Check if user has already seen the announcement
    const hasSeenKey = "civica_signal_temple_announcement_seen";
    const seen = localStorage.getItem(hasSeenKey);

    if (!seen && autoShow) {
      // Show after a brief delay for dramatic effect
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 3000); // Increased delay to avoid conflicts

      return () => clearTimeout(timer);
    }
  }, [autoShow]);

  const handleAccept = () => {
    localStorage.setItem("civica_signal_temple_announcement_seen", "true");
    localStorage.setItem("civica_signal_temple_accepted", "true");
    setIsVisible(false);
    onAccept?.();

    // Navigate to SignalTemple after acceptance
    setTimeout(() => {
      navigate("/signal-temple");
    }, 500);
  };

  const handleClose = () => {
    localStorage.setItem("civica_signal_temple_announcement_seen", "true");
    setIsVisible(false);
    onClose?.();
  };

  const features = [
    {
      icon: Bell,
      title: "Intelligent Triggers",
      description:
        "Subscribe through sacred actions—follow scrolls, join clusters, make Flourish transactions",
      color: "text-cyan-400",
      bgColor: "bg-cyan-500/20",
    },
    {
      icon: Globe,
      title: "Bioregional Whispers",
      description:
        "Receive place-based ecological updates and community signals from your bioregion",
      color: "text-green-400",
      bgColor: "bg-green-500/20",
    },
    {
      icon: Users,
      title: "Sacred Consent",
      description:
        "Sovereign control over signal reception with ritual unsubscribe protocols",
      color: "text-purple-400",
      bgColor: "bg-purple-500/20",
    },
  ];

  const steps = [
    {
      title: "⚙️ Introducing SignalTemple",
      subtitle: "Revolutionary Sacred Communication System",
      content:
        "Move beyond traditional newsletters to ritual echoes. Experience subscriptions as sacred contracts created through meaningful actions.",
      action: "Learn More",
    },
    {
      title: "🧠 Consciousness-Informed Intelligence",
      subtitle: "AI-Guided Subscription Management",
      content:
        "Our intelligence layer analyzes your intentions and creates personalized signal flows that serve your highest purpose and collective wisdom.",
      action: "Explore Intelligence",
    },
    {
      title: "🌍 Planetary Impact",
      subtitle: "Bioregional & Ecological Integration",
      content:
        "Receive urgent signals from your bioregion, support regenerative projects, and participate in the healing of our planet through conscious communication.",
      action: "Join the Movement",
    },
  ];

  const currentStepData = steps[currentStep];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[9999] flex items-center justify-center p-4"
          onClick={(e) => e.target === e.currentTarget && handleClose()}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{
              type: "spring",
              damping: 25,
              stiffness: 200,
              duration: 0.6,
            }}
            className="relative max-w-4xl w-full max-h-[90vh] overflow-hidden"
          >
            {/* Cosmic Background */}
            <div className="absolute inset-0 opacity-30 pointer-events-none">
              {[...Array(30)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-white rounded-full"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0, 1, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 0.1,
                  }}
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                />
              ))}
            </div>

            <Card className="bg-gradient-to-br from-purple-900/95 via-slate-900/95 to-cyan-900/95 border-2 border-purple-400/50 backdrop-blur-md shadow-2xl">
              {/* Header */}
              <CardHeader className="relative border-b border-purple-400/30 pb-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-4">
                    <motion.div
                      animate={{
                        rotate: [0, 360],
                        scale: [1, 1.1, 1],
                      }}
                      transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="p-4 rounded-2xl bg-gradient-to-r from-purple-500 via-cyan-500 to-purple-500 bg-size-200 animate-gradient-x"
                    >
                      <Waves className="w-8 h-8 text-white" />
                    </motion.div>
                    <div>
                      <CardTitle className="text-3xl font-bold text-white flex items-center">
                        {currentStepData.title}
                        <motion.div
                          animate={{ rotate: [0, 15, -15, 0] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          <Badge className="ml-3 bg-yellow-500 text-black font-bold">
                            <Star className="w-3 h-3 mr-1" />
                            NEW
                          </Badge>
                        </motion.div>
                      </CardTitle>
                      <p className="text-cyan-400 text-lg font-medium mt-1">
                        {currentStepData.subtitle}
                      </p>
                    </div>
                  </div>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleClose}
                    className="text-gray-400 hover:text-white hover:bg-white/10 rounded-full p-2"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>

                {/* Step Indicator */}
                <div className="flex items-center justify-center space-x-2 mt-6">
                  {steps.map((_, index) => (
                    <motion.div
                      key={index}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        index === currentStep
                          ? "w-8 bg-cyan-400"
                          : index < currentStep
                            ? "w-2 bg-green-400"
                            : "w-2 bg-gray-600"
                      }`}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                    />
                  ))}
                </div>
              </CardHeader>

              {/* Content */}
              <CardContent className="p-8 space-y-8">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.5 }}
                  className="text-center space-y-6"
                >
                  <p className="text-gray-200 text-xl leading-relaxed max-w-3xl mx-auto">
                    {currentStepData.content}
                  </p>

                  {/* Features showcase for first step */}
                  {currentStep === 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="grid md:grid-cols-3 gap-6 mt-8"
                    >
                      {features.map((feature, index) => {
                        const IconComponent = feature.icon;
                        return (
                          <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 + index * 0.1 }}
                            className={`p-6 rounded-xl bg-black/30 border border-white/10 hover:border-white/20 transition-all ${feature.bgColor}`}
                          >
                            <div className="space-y-3">
                              <div
                                className={`p-3 rounded-lg bg-black/20 w-fit mx-auto`}
                              >
                                <IconComponent
                                  className={`w-6 h-6 ${feature.color}`}
                                />
                              </div>
                              <h3 className="text-white font-bold">
                                {feature.title}
                              </h3>
                              <p className="text-gray-300 text-sm leading-relaxed">
                                {feature.description}
                              </p>
                            </div>
                          </motion.div>
                        );
                      })}
                    </motion.div>
                  )}

                  {/* Live stats for second step */}
                  {currentStep === 1 && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 }}
                      className="grid grid-cols-3 gap-6 p-6 bg-black/20 rounded-xl border border-cyan-400/30"
                    >
                      <div className="text-center">
                        <motion.div
                          className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent"
                          animate={{ opacity: [0.7, 1, 0.7] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          5
                        </motion.div>
                        <div className="text-sm text-gray-400">
                          Signal Channels
                        </div>
                      </div>
                      <div className="text-center">
                        <motion.div
                          className="text-3xl font-bold bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent"
                          animate={{ opacity: [0.7, 1, 0.7] }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: 0.3,
                          }}
                        >
                          12
                        </motion.div>
                        <div className="text-sm text-gray-400">
                          Wisdom Themes
                        </div>
                      </div>
                      <div className="text-center">
                        <motion.div
                          className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
                          animate={{ opacity: [0.7, 1, 0.7] }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: 0.6,
                          }}
                        >
                          ∞
                        </motion.div>
                        <div className="text-sm text-gray-400">
                          Sacred Possibilities
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Planet visualization for third step */}
                  {currentStep === 2 && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 }}
                      className="flex items-center justify-center py-8"
                    >
                      <motion.div
                        animate={{
                          rotate: [0, 360],
                          scale: [1, 1.05, 1],
                        }}
                        transition={{
                          duration: 10,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="relative w-32 h-32 rounded-full bg-gradient-to-br from-green-500 via-blue-500 to-green-600 shadow-2xl"
                      >
                        <div className="absolute inset-2 rounded-full bg-gradient-to-br from-green-400/50 to-blue-400/50" />
                        <div className="absolute top-4 left-6 w-3 h-3 rounded-full bg-green-300" />
                        <div className="absolute bottom-6 right-4 w-4 h-4 rounded-full bg-blue-300" />
                        <motion.div
                          animate={{ opacity: [0.5, 1, 0.5] }}
                          transition={{ duration: 3, repeat: Infinity }}
                          className="absolute inset-0 rounded-full border-2 border-cyan-400/50"
                        />
                      </motion.div>
                    </motion.div>
                  )}
                </motion.div>
              </CardContent>

              {/* Footer Actions */}
              <div className="p-8 border-t border-white/10 bg-black/20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    {currentStep > 0 && (
                      <Button
                        variant="outline"
                        onClick={() => setCurrentStep(currentStep - 1)}
                        className="border-gray-500 text-gray-400 hover:bg-gray-500/20"
                      >
                        Previous
                      </Button>
                    )}

                    <Button
                      variant="ghost"
                      onClick={handleClose}
                      className="text-gray-400 hover:text-white hover:bg-white/10"
                    >
                      Maybe Later
                    </Button>
                  </div>

                  <div className="flex items-center space-x-3">
                    {currentStep < steps.length - 1 ? (
                      <Button
                        onClick={() => setCurrentStep(currentStep + 1)}
                        className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 px-8"
                        size="lg"
                      >
                        {currentStepData.action}
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </Button>
                    ) : (
                      <Button
                        onClick={handleAccept}
                        className="bg-gradient-to-r from-green-500 to-cyan-500 hover:from-green-600 hover:to-cyan-600 px-8"
                        size="lg"
                      >
                        <CheckCircle className="w-5 h-5 mr-2" />
                        Enter SignalTemple
                        <Sparkles className="w-5 h-5 ml-2" />
                      </Button>
                    )}
                  </div>
                </div>

                {/* Sacred Gift Mention */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 }}
                  className="flex items-center justify-center mt-6 text-center"
                >
                  <div className="flex items-center space-x-2 px-4 py-2 bg-yellow-500/20 border border-yellow-500/30 rounded-full">
                    <Gift className="w-4 h-4 text-yellow-400" />
                    <span className="text-yellow-400 font-semibold text-sm">
                      First 100 users receive sacred inception bonus
                    </span>
                  </div>
                </motion.div>
              </div>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SignalTempleFloatingAnnouncement;
