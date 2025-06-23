import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { X, Heart, Eye, Hand, MessageCircle } from "lucide-react";
import { ArrivalChoice } from "@/types/navigation";
import { RITUAL_PREPARATION_STEPS } from "@/data/navigationData";
import SacredPortal from "@/components/SacredPortal";

interface SacredArrivalProps {
  isOpen: boolean;
  selectedChoice: ArrivalChoice | null;
  onClose: () => void;
  onComplete: () => void;
  timeOfDay: "dawn" | "midday" | "dusk" | "midnight";
}

const SacredArrival = ({
  isOpen,
  selectedChoice,
  onClose,
  onComplete,
  timeOfDay,
}: SacredArrivalProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isInRitual, setIsInRitual] = useState(false);
  const [ritualProgress, setRitualProgress] = useState(0);
  const [breathCount, setBreathCount] = useState(0);
  const [intentionSet, setIntentionSet] = useState(false);

  const ritualSteps = selectedChoice?.portal.preparationRitual
    ? RITUAL_PREPARATION_STEPS[
        selectedChoice.portal
          .preparationRitual as keyof typeof RITUAL_PREPARATION_STEPS
      ] || []
    : [];

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen && selectedChoice) {
      setCurrentStep(0);
      setIsInRitual(false);
      setRitualProgress(0);
      setBreathCount(0);
      setIntentionSet(false);
    }
  }, [isOpen, selectedChoice]);

  // Auto-advance through ritual steps
  useEffect(() => {
    if (isInRitual && currentStep < ritualSteps.length) {
      const timer = setTimeout(() => {
        setCurrentStep((prev) => prev + 1);
        setRitualProgress((prev) =>
          Math.min(100, prev + 100 / ritualSteps.length),
        );
      }, ritualSteps[currentStep]?.duration || 3000);

      return () => clearTimeout(timer);
    } else if (isInRitual && currentStep >= ritualSteps.length) {
      // Ritual complete
      setTimeout(() => {
        onComplete();
      }, 1000);
    }
  }, [isInRitual, currentStep, ritualSteps, onComplete]);

  const startRitual = () => {
    setIsInRitual(true);
    setCurrentStep(0);
  };

  const getChoiceIcon = (choice: ArrivalChoice) => {
    const icons = {
      contribute: Heart,
      question: MessageCircle,
      scroll: Hand,
      witness: Eye,
      heal: Heart,
    };
    const Icon = icons[choice.id as keyof typeof icons] || Heart;
    return Icon;
  };

  if (!isOpen || !selectedChoice) return null;

  const Icon = getChoiceIcon(selectedChoice);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          className="bg-black/60 border border-white/20 rounded-lg p-8 max-w-2xl w-full"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </Button>

          {!isInRitual ? (
            /* Pre-ritual preparation */
            <div className="text-center space-y-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className={`mx-auto w-20 h-20 rounded-full bg-gradient-to-r ${selectedChoice.color} flex items-center justify-center`}
              >
                <Icon className="w-10 h-10 text-white" />
              </motion.div>

              <div>
                <h2 className="text-2xl font-bold text-white mb-2">
                  Sacred Preparation
                </h2>
                <p className="text-cyan-400 text-lg">
                  {selectedChoice.intention}
                </p>
                <p className="text-gray-300 text-sm mt-2">
                  {selectedChoice.description}
                </p>
              </div>

              <Card className="bg-black/40 border-white/20 backdrop-blur-md">
                <CardHeader>
                  <CardTitle className="text-purple-400 text-center">
                    Portal:{" "}
                    {selectedChoice.portal.type.replace("_", " ").toUpperCase()}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-300 text-sm text-center">
                    Before entering this sacred space, we invite you to
                    participate in a brief preparation ritual to align your
                    intention and energy.
                  </p>

                  <div className="text-center">
                    <div className="text-sm text-gray-400 mb-2">
                      Preparation steps:
                    </div>
                    <div className="text-2xl text-cyan-400">
                      {ritualSteps.length}
                    </div>
                  </div>

                  <div className="space-y-2">
                    {ritualSteps.map((step, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-2 text-sm"
                      >
                        <div className="w-2 h-2 rounded-full bg-gray-600" />
                        <span className="text-gray-400">
                          {step.instruction}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <div className="flex space-x-4">
                <Button
                  variant="outline"
                  onClick={onClose}
                  className="flex-1 border-white/20 text-white hover:bg-white/10"
                >
                  Skip Ritual
                </Button>
                <Button
                  onClick={startRitual}
                  className={`flex-1 bg-gradient-to-r ${selectedChoice.color} hover:opacity-90 text-black font-semibold`}
                >
                  Begin Preparation
                </Button>
              </div>
            </div>
          ) : (
            /* Active ritual */
            <div className="space-y-6">
              {/* Sacred Portal */}
              <div className="flex justify-center">
                <SacredPortal
                  type="spiral"
                  size={200}
                  intensity={0.8}
                  timeOfDay={timeOfDay}
                  interactive={false}
                />
              </div>

              {/* Progress */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Sacred Preparation</span>
                  <span className="text-cyan-400">
                    {Math.round(ritualProgress)}%
                  </span>
                </div>
                <Progress value={ritualProgress} className="h-2" />
              </div>

              {/* Current step */}
              <Card className="bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border-white/20">
                <CardContent className="p-6 text-center">
                  {currentStep < ritualSteps.length ? (
                    <motion.div
                      key={currentStep}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-4"
                    >
                      <div className="text-sm text-gray-400">
                        Step {currentStep + 1} of {ritualSteps.length}
                      </div>
                      <h3 className="text-xl text-white font-semibold">
                        {ritualSteps[currentStep]?.instruction}
                      </h3>
                      <div className="text-sm text-gray-300">
                        Duration:{" "}
                        {Math.round(
                          (ritualSteps[currentStep]?.duration || 3000) / 1000,
                        )}{" "}
                        seconds
                      </div>

                      {/* Breathing indicator */}
                      <motion.div
                        className="mx-auto w-16 h-16 rounded-full border-2 border-cyan-400 flex items-center justify-center"
                        animate={{
                          scale: [1, 1.2, 1],
                          borderColor: ["#06b6d4", "#8b5cf6", "#06b6d4"],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      >
                        <div className="text-xs text-center">
                          <div>Breathe</div>
                        </div>
                      </motion.div>
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="space-y-4"
                    >
                      <div className="text-6xl">✨</div>
                      <h3 className="text-xl text-cyan-400 font-semibold">
                        Preparation Complete
                      </h3>
                      <p className="text-gray-300">
                        You are now ready to enter the sacred space with aligned
                        intention.
                      </p>
                    </motion.div>
                  )}
                </CardContent>
              </Card>

              {/* Cancel button */}
              <div className="text-center">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  className="text-gray-400 hover:text-white"
                >
                  Cancel Ritual
                </Button>
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SacredArrival;
