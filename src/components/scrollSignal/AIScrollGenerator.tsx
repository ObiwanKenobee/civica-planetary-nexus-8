// CIVICA 144 AIScrollGenerator Component
// AI-powered scroll generation interface

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Brain,
  Sparkles,
  Wand2,
  FileText,
  Languages,
  Settings,
  Zap,
  Heart,
  Globe,
  Clock,
  AlertCircle,
} from "lucide-react";
import {
  ScrollType,
  CommunityMember,
  ScrollGenerationRequest,
  CivicScroll,
} from "@/types/scrollSignal";
import { scrollSignalService } from "@/services/scrollSignal";
import { aiScrollGenerationService } from "@/services/aiScrollGeneration";
import { sampleCulturalContext } from "@/data/scrollSignalData";

interface AIScrollGeneratorProps {
  selectedType: ScrollType;
  currentUser: CommunityMember;
  isVoiceActive: boolean;
}

export const AIScrollGenerator: React.FC<AIScrollGeneratorProps> = ({
  selectedType,
  currentUser,
  isVoiceActive,
}) => {
  const [textInput, setTextInput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState("");

  // Generation preferences
  const [language, setLanguage] = useState("en");
  const [formality, setFormality] = useState<
    "casual" | "formal" | "ceremonial" | "ancient"
  >("formal");
  const [length, setLength] = useState<
    "brief" | "moderate" | "detailed" | "comprehensive"
  >("moderate");
  const [creativity, setCreativity] = useState([0.7]);
  const [includeImagery, setIncludeImagery] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [ritualIntegration, setRitualIntegration] = useState(true);
  const [urgency, setUrgency] = useState<
    "low" | "medium" | "high" | "emergency"
  >("medium");

  const [availableModels] = useState(
    aiScrollGenerationService.getAvailableModels(),
  );
  const [selectedModel, setSelectedModel] = useState(
    "anthropic.claude-3-sonnet",
  );

  // Auto-generation when voice input is complete
  useEffect(() => {
    // Simulate voice-to-text completion triggering generation
    if (isVoiceActive && textInput.length > 10) {
      const autoGenerateTimer = setTimeout(() => {
        handleGenerate();
      }, 3000);

      return () => clearTimeout(autoGenerateTimer);
    }
  }, [isVoiceActive, textInput]);

  const handleGenerate = async () => {
    if (!textInput.trim() && !isVoiceActive) {
      return;
    }

    setIsGenerating(true);
    setGenerationProgress(0);

    try {
      // Step 1: Preparing request
      setCurrentStep("Preparing sacred request...");
      setGenerationProgress(10);
      await delay(500);

      // Step 2: Cultural context
      setCurrentStep("Gathering cultural wisdom...");
      setGenerationProgress(25);
      await delay(700);

      // Step 3: AI processing
      setCurrentStep("Invoking Amazon Bedrock...");
      setGenerationProgress(50);
      await delay(1000);

      // Step 4: Ritual integration
      setCurrentStep("Weaving sacred elements...");
      setGenerationProgress(75);
      await delay(800);

      // Step 5: Final blessing
      setCurrentStep("Blessing the scroll...");
      setGenerationProgress(90);
      await delay(500);

      const request: ScrollGenerationRequest = {
        textInput: textInput.trim(),
        type: selectedType,
        urgency,
        requester: currentUser,
        context: sampleCulturalContext,
        preferences: {
          language,
          formality,
          length,
          imagery: includeImagery,
          symbols: includeSymbols,
          ritual_integration: ritualIntegration,
          ai_creativity: creativity[0],
        },
      };

      const generatedScroll = await scrollSignalService.generateScroll(request);

      setCurrentStep("Scroll creation complete!");
      setGenerationProgress(100);

      // Clear input after successful generation
      setTextInput("");
    } catch (error) {
      console.error("Scroll generation failed:", error);
      setCurrentStep("Generation failed - please try again");
    } finally {
      setTimeout(() => {
        setIsGenerating(false);
        setGenerationProgress(0);
        setCurrentStep("");
      }, 1000);
    }
  };

  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const getUrgencyColor = (level: string) => {
    const colors = {
      low: "border-green-400 text-green-400 bg-green-400/10",
      medium: "border-yellow-400 text-yellow-400 bg-yellow-400/10",
      high: "border-orange-400 text-orange-400 bg-orange-400/10",
      emergency: "border-red-400 text-red-400 bg-red-400/10",
    };
    return colors[level as keyof typeof colors];
  };

  const getModelBadgeColor = (provider: string) => {
    const colors = {
      bedrock: "border-purple-400 text-purple-400 bg-purple-400/10",
      sagemaker: "border-blue-400 text-blue-400 bg-blue-400/10",
      amazonq: "border-green-400 text-green-400 bg-green-400/10",
    };
    return colors[provider as keyof typeof colors] || colors.bedrock;
  };

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-blue-400">
          <div className="flex items-center">
            <Brain className="w-5 h-5 mr-2" />
            AI Scroll Generator
          </div>
          <Badge
            variant="outline"
            className="border-blue-400 text-blue-400 bg-blue-400/10"
          >
            AWS Bedrock
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Input Method */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-300">
              Sacred Input Method
            </label>
            <Badge
              variant="outline"
              className={
                isVoiceActive
                  ? "border-purple-400 text-purple-400"
                  : "border-gray-400 text-gray-400"
              }
            >
              {isVoiceActive ? "Voice Active" : "Text Input"}
            </Badge>
          </div>

          <Textarea
            placeholder={
              isVoiceActive
                ? "Voice input will appear here..."
                : `Describe your ${selectedType} need or share your wisdom...`
            }
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            className="bg-white/5 border-white/20 text-white placeholder-gray-400 min-h-[100px] resize-none"
            disabled={isVoiceActive}
          />

          {textInput.length > 0 && (
            <div className="text-xs text-gray-400">
              {textInput.length} characters • {textInput.split(" ").length}{" "}
              words
            </div>
          )}
        </div>

        {/* Generation Settings */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Settings className="w-4 h-4 text-gray-400" />
            <span className="text-sm font-medium text-gray-300">
              Generation Settings
            </span>
          </div>

          {/* Quick Settings Row */}
          <div className="grid grid-cols-2 gap-4">
            {/* Urgency */}
            <div className="space-y-2">
              <label className="text-xs text-gray-400">Urgency Level</label>
              <Select
                value={urgency}
                onValueChange={(value: any) => setUrgency(value)}
              >
                <SelectTrigger className="bg-white/5 border-white/20 h-8">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">🟢 Low</SelectItem>
                  <SelectItem value="medium">🟡 Medium</SelectItem>
                  <SelectItem value="high">🟠 High</SelectItem>
                  <SelectItem value="emergency">🔴 Emergency</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Language */}
            <div className="space-y-2">
              <label className="text-xs text-gray-400">Language</label>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger className="bg-white/5 border-white/20 h-8">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">🇺🇸 English</SelectItem>
                  <SelectItem value="sw">🇰🇪 Swahili</SelectItem>
                  <SelectItem value="es">🇪🇸 Spanish</SelectItem>
                  <SelectItem value="fr">🇫🇷 French</SelectItem>
                  <SelectItem value="pt">🇧🇷 Portuguese</SelectItem>
                  <SelectItem value="ar">🇸🇦 Arabic</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Advanced Settings */}
          <details className="space-y-3">
            <summary className="text-sm text-gray-300 cursor-pointer hover:text-white transition-colors">
              Advanced Sacred Parameters
            </summary>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-4 border-l-2 border-purple-400/30">
              {/* Formality */}
              <div className="space-y-2">
                <label className="text-xs text-gray-400">Sacred Tone</label>
                <Select
                  value={formality}
                  onValueChange={(value: any) => setFormality(value)}
                >
                  <SelectTrigger className="bg-white/5 border-white/20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="casual">Casual</SelectItem>
                    <SelectItem value="formal">Formal</SelectItem>
                    <SelectItem value="ceremonial">Ceremonial</SelectItem>
                    <SelectItem value="ancient">Ancient</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Length */}
              <div className="space-y-2">
                <label className="text-xs text-gray-400">Scroll Length</label>
                <Select
                  value={length}
                  onValueChange={(value: any) => setLength(value)}
                >
                  <SelectTrigger className="bg-white/5 border-white/20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="brief">Brief</SelectItem>
                    <SelectItem value="moderate">Moderate</SelectItem>
                    <SelectItem value="detailed">Detailed</SelectItem>
                    <SelectItem value="comprehensive">Comprehensive</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* AI Creativity */}
              <div className="space-y-2">
                <label className="text-xs text-gray-400">
                  AI Creativity: {(creativity[0] * 100).toFixed(0)}%
                </label>
                <Slider
                  value={creativity}
                  onValueChange={setCreativity}
                  min={0.1}
                  max={1.0}
                  step={0.1}
                  className="w-full"
                />
              </div>

              {/* Model Selection */}
              <div className="space-y-2">
                <label className="text-xs text-gray-400">AI Model</label>
                <Select value={selectedModel} onValueChange={setSelectedModel}>
                  <SelectTrigger className="bg-white/5 border-white/20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {availableModels.map((model) => (
                      <SelectItem key={model.name} value={model.name}>
                        {model.name.split(".").pop()} ({model.provider})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Enhancement Toggles */}
            <div className="grid grid-cols-3 gap-4 pl-4">
              <div className="flex items-center space-x-2">
                <Switch
                  checked={includeImagery}
                  onCheckedChange={setIncludeImagery}
                  className="data-[state=checked]:bg-purple-500"
                />
                <label className="text-xs text-gray-400">Imagery</label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  checked={includeSymbols}
                  onCheckedChange={setIncludeSymbols}
                  className="data-[state=checked]:bg-purple-500"
                />
                <label className="text-xs text-gray-400">Symbols</label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  checked={ritualIntegration}
                  onCheckedChange={setRitualIntegration}
                  className="data-[state=checked]:bg-purple-500"
                />
                <label className="text-xs text-gray-400">Ritual</label>
              </div>
            </div>
          </details>
        </div>

        {/* Generation Progress */}
        <AnimatePresence>
          {isGenerating && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm text-purple-300">
                  Sacred Generation in Progress
                </span>
                <span className="text-sm text-purple-400">
                  {generationProgress}%
                </span>
              </div>

              <Progress
                value={generationProgress}
                className="h-2 bg-purple-400/20"
              />

              <div className="flex items-center space-x-2 text-sm text-gray-300">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="w-4 h-4 text-purple-400" />
                </motion.div>
                <span>{currentStep}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Generation Button */}
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button
            onClick={handleGenerate}
            disabled={isGenerating || (!textInput.trim() && !isVoiceActive)}
            className={`w-full py-3 text-lg font-semibold ${
              isGenerating
                ? "bg-purple-400/50 cursor-not-allowed"
                : "bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
            } transition-all duration-300`}
          >
            {isGenerating ? (
              <div className="flex items-center space-x-2">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="w-5 h-5" />
                </motion.div>
                <span>Weaving Sacred Scroll...</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Wand2 className="w-5 h-5" />
                <span>Generate Sacred Scroll</span>
              </div>
            )}
          </Button>
        </motion.div>

        {/* Generation Info */}
        <div className="text-xs text-gray-400 space-y-1">
          <div className="flex items-center justify-between">
            <span>Model: {selectedModel.split(".").pop()}</span>
            <Badge
              variant="outline"
              className={getModelBadgeColor(
                availableModels.find((m) => m.name === selectedModel)
                  ?.provider || "bedrock",
              )}
            >
              {availableModels
                .find((m) => m.name === selectedModel)
                ?.provider?.toUpperCase()}
            </Badge>
          </div>
          <div className="flex items-center justify-between">
            <span>Urgency:</span>
            <Badge variant="outline" className={getUrgencyColor(urgency)}>
              {urgency.toUpperCase()}
            </Badge>
          </div>
          <div className="flex items-center justify-between">
            <span>Cultural Integration:</span>
            <span className="text-green-400">Active</span>
          </div>
        </div>

        {/* Help Text */}
        <div className="bg-blue-500/10 backdrop-blur-sm rounded-lg p-3 border border-blue-500/20">
          <div className="flex items-start space-x-2">
            <FileText className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
            <div className="text-xs text-blue-200">
              <p className="font-medium mb-1">Sacred Generation Tips:</p>
              <ul className="space-y-0.5 text-blue-200/80">
                <li>• Be specific about your community need</li>
                <li>• Include cultural context when relevant</li>
                <li>• Higher creativity for ceremonial content</li>
                <li>• Emergency mode prioritizes speed over artistry</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIScrollGenerator;
