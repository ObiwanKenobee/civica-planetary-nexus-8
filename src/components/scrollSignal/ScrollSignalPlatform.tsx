// CIVICA 144 ScrollSignal Platform
// Main interface for generative AI civic intelligence

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Mic,
  MicOff,
  ScrollText,
  Sparkles,
  Heart,
  Globe,
  Zap,
  Users,
  TreePine,
  Stethoscope,
  GraduationCap,
  Leaf,
  Crown,
  AlertTriangle,
  Lightbulb,
  Memory,
} from "lucide-react";

import { ScrollParchment } from "./ScrollParchment";
import { VoiceActivation } from "./VoiceActivation";
import { AIScrollGenerator } from "./AIScrollGenerator";
import { RitualBlessing } from "./RitualBlessing";
import { SimulationEngine } from "./SimulationEngine";
import { CommunityModules } from "./CommunityModules";
import { CulturalArchive } from "./CulturalArchive";

import { scrollSignalService } from "@/services/scrollSignal";
import { voiceRecognitionService } from "@/services/voiceRecognition";
import {
  CivicScroll,
  ScrollType,
  CommunityMember,
  ScrollSignalState,
  IoTReading,
} from "@/types/scrollSignal";
import { sampleCommunityMembers } from "@/data/scrollSignalData";

export const ScrollSignalPlatform: React.FC = () => {
  const [platformState, setPlatformState] = useState<ScrollSignalState>(
    scrollSignalService.getState(),
  );
  const [activeTab, setActiveTab] = useState<string>("create");
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [selectedScrollType, setSelectedScrollType] =
    useState<ScrollType>("healthcare");
  const [currentUser] = useState<CommunityMember>(sampleCommunityMembers[0]);
  const [notifications, setNotifications] = useState<string[]>([]);

  // Real-time state updates
  useEffect(() => {
    const interval = setInterval(() => {
      setPlatformState(scrollSignalService.getState());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Voice activation handler
  const handleVoiceToggle = useCallback(async () => {
    if (isVoiceActive) {
      voiceRecognitionService.stopListening();
      await scrollSignalService.stopListening();
      setIsVoiceActive(false);
    } else {
      try {
        await scrollSignalService.startListening();
        setIsVoiceActive(true);

        // Setup voice recognition callbacks
        await voiceRecognitionService.startListening({
          onStart: () => {
            addNotification("🎙️ Sacred voice listening activated");
          },
          onResult: (transcript, confidence, isFinal) => {
            if (isFinal && confidence > 0.7) {
              addNotification(`Voice received: "${transcript}"`);
            }
          },
          onWakeWord: (wakeWord) => {
            addNotification(`✨ Wake word detected: "${wakeWord}"`);
            voiceRecognitionService.playFeedbackSound("activation");
          },
          onError: (error) => {
            addNotification(`Voice error: ${error}`);
            setIsVoiceActive(false);
          },
        });
      } catch (error) {
        console.error("Voice activation failed:", error);
        addNotification("Voice activation failed - please check permissions");
      }
    }
  }, [isVoiceActive]);

  const addNotification = useCallback((message: string) => {
    setNotifications((prev) => [...prev.slice(-4), message]);
    setTimeout(() => {
      setNotifications((prev) => prev.slice(1));
    }, 5000);
  }, []);

  const scrollTypeIcons = {
    healthcare: Stethoscope,
    education: GraduationCap,
    environment: Leaf,
    cultural: Crown,
    governance: Users,
    emergency: AlertTriangle,
    ritual: Heart,
    memory: Memory,
  };

  const scrollTypeColors = {
    healthcare: "text-red-500",
    education: "text-blue-500",
    environment: "text-green-500",
    cultural: "text-purple-500",
    governance: "text-yellow-500",
    emergency: "text-orange-500",
    ritual: "text-pink-500",
    memory: "text-indigo-500",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
      {/* Sacred Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className={
            'absolute inset-0 bg-[url(\'data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%239C92AC" fill-opacity="0.4"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\')]'
          }
        ></div>
      </div>

      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 p-6 border-b border-white/10"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <motion.div
              animate={{ rotate: isVoiceActive ? 360 : 0 }}
              transition={{ duration: 2, repeat: isVoiceActive ? Infinity : 0 }}
            >
              <ScrollText className="w-8 h-8 text-purple-400" />
            </motion.div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                CIVICA: ScrollSignal
              </h1>
              <p className="text-gray-400 text-sm">
                Generative AI Civic Intelligence Platform
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* Community Status */}
            <div className="text-center">
              <div className="text-lg font-bold text-purple-400">
                {platformState.communityMembers.length}
              </div>
              <div className="text-xs text-gray-400">Community</div>
            </div>

            {/* Active Scrolls */}
            <div className="text-center">
              <div className="text-lg font-bold text-green-400">
                {platformState.scrollHistory.length}
              </div>
              <div className="text-xs text-gray-400">Scrolls</div>
            </div>

            {/* Voice Control */}
            <Button
              onClick={handleVoiceToggle}
              variant={isVoiceActive ? "default" : "outline"}
              size="lg"
              className={`${
                isVoiceActive
                  ? "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                  : "border-purple-400 text-purple-400 hover:bg-purple-500/10"
              } transition-all duration-300`}
            >
              {isVoiceActive ? (
                <Mic className="w-5 h-5 mr-2" />
              ) : (
                <MicOff className="w-5 h-5 mr-2" />
              )}
              {isVoiceActive ? "Listening" : "Activate Voice"}
            </Button>
          </div>
        </div>

        {/* Live Notifications */}
        <AnimatePresence>
          {notifications.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 space-y-2"
            >
              {notifications.map((notification, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2 text-sm border border-white/20"
                >
                  {notification}
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Main Platform Interface */}
      <main className="relative z-10 p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-6 bg-white/10 backdrop-blur-sm border border-white/20">
            <TabsTrigger
              value="create"
              className="data-[state=active]:bg-purple-500"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Create
            </TabsTrigger>
            <TabsTrigger
              value="archive"
              className="data-[state=active]:bg-blue-500"
            >
              <ScrollText className="w-4 h-4 mr-2" />
              Archive
            </TabsTrigger>
            <TabsTrigger
              value="community"
              className="data-[state=active]:bg-green-500"
            >
              <Users className="w-4 h-4 mr-2" />
              Community
            </TabsTrigger>
            <TabsTrigger
              value="simulation"
              className="data-[state=active]:bg-yellow-500"
            >
              <Zap className="w-4 h-4 mr-2" />
              Simulation
            </TabsTrigger>
            <TabsTrigger
              value="ritual"
              className="data-[state=active]:bg-pink-500"
            >
              <Heart className="w-4 h-4 mr-2" />
              Ritual
            </TabsTrigger>
            <TabsTrigger
              value="culture"
              className="data-[state=active]:bg-indigo-500"
            >
              <Crown className="w-4 h-4 mr-2" />
              Culture
            </TabsTrigger>
          </TabsList>

          {/* Scroll Creation Tab */}
          <TabsContent value="create" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left Panel - Voice & AI Generation */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                {/* Scroll Type Selection */}
                <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                  <CardHeader>
                    <CardTitle className="flex items-center text-purple-400">
                      <Lightbulb className="w-5 h-5 mr-2" />
                      Scroll Type Selection
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-4 gap-3">
                      {Object.entries(scrollTypeIcons).map(([type, Icon]) => (
                        <Button
                          key={type}
                          variant={
                            selectedScrollType === type ? "default" : "outline"
                          }
                          size="sm"
                          onClick={() =>
                            setSelectedScrollType(type as ScrollType)
                          }
                          className={`flex flex-col items-center p-3 h-auto ${
                            selectedScrollType === type
                              ? "bg-gradient-to-br from-purple-500 to-pink-500"
                              : "border-white/20 hover:bg-white/10"
                          }`}
                        >
                          <Icon
                            className={`w-6 h-6 mb-1 ${scrollTypeColors[type as ScrollType]}`}
                          />
                          <span className="text-xs capitalize">{type}</span>
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Voice Activation Panel */}
                <VoiceActivation
                  isActive={isVoiceActive}
                  onToggle={handleVoiceToggle}
                  selectedType={selectedScrollType}
                />

                {/* AI Scroll Generator */}
                <AIScrollGenerator
                  selectedType={selectedScrollType}
                  currentUser={currentUser}
                  isVoiceActive={isVoiceActive}
                />
              </motion.div>

              {/* Right Panel - Scroll Display */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                {/* Current Scroll Display */}
                <ScrollParchment
                  scroll={platformState.currentScroll}
                  isGenerating={false}
                />

                {/* Real-time IoT Data */}
                <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                  <CardHeader>
                    <CardTitle className="flex items-center text-green-400">
                      <Globe className="w-5 h-5 mr-2" />
                      Live Community Data
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {platformState.iotData.slice(-3).map((reading) => (
                        <div
                          key={reading.sensorId}
                          className="flex items-center justify-between"
                        >
                          <div className="flex items-center space-x-2">
                            <div
                              className={`w-2 h-2 rounded-full ${
                                reading.alert ? "bg-red-400" : "bg-green-400"
                              }`}
                            />
                            <span className="text-sm text-gray-300">
                              {reading.location}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline" className="text-xs">
                              {reading.value} {reading.unit}
                            </Badge>
                            <span
                              className={`text-xs ${
                                reading.quality === "excellent"
                                  ? "text-green-400"
                                  : reading.quality === "good"
                                    ? "text-yellow-400"
                                    : "text-red-400"
                              }`}
                            >
                              {reading.quality}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </TabsContent>

          {/* Scroll Archive Tab */}
          <TabsContent value="archive" className="mt-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="flex items-center text-blue-400">
                    <ScrollText className="w-5 h-5 mr-2" />
                    Community Scroll Archive
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {platformState.scrollHistory.map((scroll) => (
                      <motion.div
                        key={scroll.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-all cursor-pointer"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-3">
                            {React.createElement(scrollTypeIcons[scroll.type], {
                              className: `w-5 h-5 ${scrollTypeColors[scroll.type]}`,
                            })}
                            <span className="font-medium">{scroll.title}</span>
                          </div>
                          <Badge
                            variant="outline"
                            className={`
                            ${
                              scroll.status === "blessed"
                                ? "border-green-400 text-green-400"
                                : scroll.status === "active"
                                  ? "border-blue-400 text-blue-400"
                                  : "border-gray-400 text-gray-400"
                            }
                          `}
                          >
                            {scroll.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-400 line-clamp-2">
                          {scroll.content}
                        </p>
                        <div className="flex items-center justify-between mt-3 text-xs text-gray-500">
                          <span>By {scroll.createdBy.name}</span>
                          <span>{scroll.createdAt.toLocaleDateString()}</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Community Modules Tab */}
          <TabsContent value="community" className="mt-6">
            <CommunityModules
              communityMembers={platformState.communityMembers}
              iotData={platformState.iotData}
              scrollHistory={platformState.scrollHistory}
            />
          </TabsContent>

          {/* Simulation Engine Tab */}
          <TabsContent value="simulation" className="mt-6">
            <SimulationEngine
              activeSimulations={platformState.activeSimulations}
              iotData={platformState.iotData}
              scrollHistory={platformState.scrollHistory}
            />
          </TabsContent>

          {/* Ritual Blessing Tab */}
          <TabsContent value="ritual" className="mt-6">
            <RitualBlessing
              currentScroll={platformState.currentScroll}
              ritualQueue={platformState.ritualQueue}
              communityMembers={platformState.communityMembers}
              blessings={platformState.blessings}
            />
          </TabsContent>

          {/* Cultural Archive Tab */}
          <TabsContent value="culture" className="mt-6">
            <CulturalArchive
              culturalArchive={platformState.culturalArchive}
              communityMembers={platformState.communityMembers}
              scrollHistory={platformState.scrollHistory}
            />
          </TabsContent>
        </Tabs>
      </main>

      {/* Floating Status Indicators */}
      <div className="fixed bottom-6 right-6 space-y-3">
        {/* Connection Status */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="bg-green-500/20 backdrop-blur-sm rounded-full p-3 border border-green-500/30"
        >
          <Globe className="w-5 h-5 text-green-400" />
        </motion.div>

        {/* 5G Status */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="bg-blue-500/20 backdrop-blur-sm rounded-full p-3 border border-blue-500/30"
        >
          <Zap className="w-5 h-5 text-blue-400" />
        </motion.div>

        {/* Voice Status */}
        {isVoiceActive && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="bg-purple-500/20 backdrop-blur-sm rounded-full p-3 border border-purple-500/30"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <Mic className="w-5 h-5 text-purple-400" />
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ScrollSignalPlatform;
