// CIVICA 144 VoiceActivation Component
// Sacred voice input interface for scroll creation

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Languages,
  Waves,
  Heart,
  Sparkles,
} from "lucide-react";
import { ScrollType } from "@/types/scrollSignal";
import { voiceRecognitionService } from "@/services/voiceRecognition";

interface VoiceActivationProps {
  isActive: boolean;
  onToggle: () => void;
  selectedType: ScrollType;
}

export const VoiceActivation: React.FC<VoiceActivationProps> = ({
  isActive,
  onToggle,
  selectedType,
}) => {
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [audioLevel, setAudioLevel] = useState(0);
  const [transcript, setTranscript] = useState("");
  const [confidence, setConfidence] = useState(0);
  const [waveformData, setWaveformData] = useState<number[]>([]);
  const [lastWakeWord, setLastWakeWord] = useState("");

  const languages = voiceRecognitionService.getSupportedLanguages();

  // Simulate audio level and waveform when listening
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isActive) {
      interval = setInterval(() => {
        // Simulate real-time audio level
        const newLevel = Math.random() * 100;
        setAudioLevel(newLevel);

        // Simulate waveform data
        const newWaveform = Array.from(
          { length: 20 },
          () => Math.random() * 100,
        );
        setWaveformData(newWaveform);
      }, 100);
    } else {
      setAudioLevel(0);
      setWaveformData([]);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive]);

  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language);
    voiceRecognitionService.setLanguage(language);
  };

  const getScrollTypePrompt = (type: ScrollType): string => {
    const prompts = {
      healthcare: "Speak about your health concern or healing need...",
      education: "Share what you'd like to learn or teach...",
      environment: "Describe environmental changes you've observed...",
      cultural: "Tell us about traditions or cultural wisdom...",
      governance: "Express your thoughts on community decisions...",
      emergency: "Quickly describe the emergency situation...",
      ritual: "Share intentions for sacred ceremony...",
      memory: "Speak the story or memory to preserve...",
    };
    return prompts[type];
  };

  const playFeedbackSound = (
    type: "activation" | "processing" | "completion",
  ) => {
    voiceRecognitionService.playFeedbackSound(type);
  };

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-purple-400">
          <div className="flex items-center">
            <Mic className="w-5 h-5 mr-2" />
            Sacred Voice Input
          </div>
          <Badge
            variant="outline"
            className={`
            ${isActive ? "border-green-400 text-green-400 bg-green-400/10" : "border-gray-400 text-gray-400"}
          `}
          >
            {isActive ? "LISTENING" : "INACTIVE"}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Language Selection */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300 flex items-center">
            <Languages className="w-4 h-4 mr-2" />
            Sacred Language
          </label>
          <Select value={selectedLanguage} onValueChange={handleLanguageChange}>
            <SelectTrigger className="bg-white/5 border-white/20">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {languages.map((lang) => (
                <SelectItem key={lang.code} value={lang.code}>
                  {lang.native} ({lang.name})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Voice Activation Button */}
        <div className="text-center space-y-4">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={onToggle}
              size="lg"
              className={`
                relative w-32 h-32 rounded-full text-lg font-semibold
                ${
                  isActive
                    ? "bg-gradient-to-br from-red-500 via-pink-500 to-purple-500 hover:from-red-600 hover:via-pink-600 hover:to-purple-600"
                    : "bg-gradient-to-br from-purple-500 via-blue-500 to-purple-500 hover:from-purple-600 hover:via-blue-600 hover:to-purple-600"
                }
                shadow-lg transition-all duration-300
              `}
            >
              {/* Pulsing Ring */}
              {isActive && (
                <motion.div
                  animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inset-0 rounded-full border-2 border-white/30"
                />
              )}

              {/* Icon */}
              <motion.div
                animate={isActive ? { scale: [1, 1.1, 1] } : {}}
                transition={{ duration: 1, repeat: Infinity }}
              >
                {isActive ? (
                  <Mic className="w-8 h-8" />
                ) : (
                  <MicOff className="w-8 h-8" />
                )}
              </motion.div>
            </Button>
          </motion.div>

          <p className="text-sm text-gray-400">
            {isActive
              ? "Listening for sacred wisdom..."
              : "Tap to activate voice input"}
          </p>
        </div>

        {/* Audio Level Indicator */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-300 flex items-center">
              <Volume2 className="w-4 h-4 mr-2" />
              Audio Level
            </span>
            <span className="text-sm text-purple-400">
              {audioLevel.toFixed(0)}%
            </span>
          </div>
          <Progress
            value={audioLevel}
            className="h-2 bg-white/10"
            style={{
              background: `linear-gradient(to right, #10b981 ${audioLevel}%, rgba(255,255,255,0.1) ${audioLevel}%)`,
            }}
          />
        </div>

        {/* Real-time Waveform */}
        {isActive && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-2"
          >
            <div className="text-sm text-gray-300 flex items-center">
              <Waves className="w-4 h-4 mr-2" />
              Voice Waveform
            </div>
            <div className="flex items-end justify-center space-x-1 h-16 bg-white/5 rounded-lg p-2">
              {waveformData.map((level, index) => (
                <motion.div
                  key={index}
                  animate={{ height: `${level}%` }}
                  transition={{ duration: 0.1 }}
                  className="w-2 bg-gradient-to-t from-purple-500 to-pink-500 rounded-full min-h-[2px]"
                />
              ))}
            </div>
          </motion.div>
        )}

        {/* Context Prompt */}
        <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
          <div className="text-sm text-gray-300 mb-2 flex items-center">
            <Sparkles className="w-4 h-4 mr-2" />
            {selectedType.charAt(0).toUpperCase() + selectedType.slice(1)}{" "}
            Guidance
          </div>
          <p className="text-sm text-purple-200 italic">
            {getScrollTypePrompt(selectedType)}
          </p>
        </div>

        {/* Wake Word Detection */}
        {lastWakeWord && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-green-500/20 backdrop-blur-sm rounded-lg p-3 border border-green-500/30"
          >
            <div className="text-sm text-green-300 flex items-center">
              <Heart className="w-4 h-4 mr-2" />
              Wake word detected: "{lastWakeWord}"
            </div>
          </motion.div>
        )}

        {/* Live Transcript */}
        <AnimatePresence>
          {transcript && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-300">Live Transcript</span>
                <Badge
                  variant="outline"
                  className={`
                  ${
                    confidence > 0.8
                      ? "border-green-400 text-green-400"
                      : confidence > 0.6
                        ? "border-yellow-400 text-yellow-400"
                        : "border-red-400 text-red-400"
                  }
                `}
                >
                  {(confidence * 100).toFixed(0)}% confidence
                </Badge>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                <p className="text-sm text-white font-medium">"{transcript}"</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Voice Commands Help */}
        <details className="text-sm">
          <summary className="text-gray-300 cursor-pointer hover:text-white transition-colors">
            Sacred Voice Commands
          </summary>
          <div className="mt-2 space-y-1 text-gray-400 pl-4 border-l-2 border-purple-400/30">
            <div>"Sacred Scroll" - Activate listening</div>
            <div>"Community Scroll" - Alternative activation</div>
            <div>"Bless this scroll" - Request blessing</div>
            <div>"Archive this wisdom" - Save to archive</div>
            <div>"Share with community" - Share scroll</div>
          </div>
        </details>

        {/* Audio Feedback Controls */}
        <div className="flex items-center justify-between pt-4 border-t border-white/10">
          <div className="text-sm text-gray-300">Sacred Audio Feedback</div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => playFeedbackSound("activation")}
              className="border-purple-400 text-purple-400 hover:bg-purple-400/10"
            >
              Test Sound
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default VoiceActivation;
