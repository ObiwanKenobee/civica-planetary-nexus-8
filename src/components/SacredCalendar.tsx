// CIVICA 144 Sacred Calendar
// Celestial alignment and ritual scheduling system

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Calendar,
  Moon,
  Sun,
  Star,
  Clock,
  MapPin,
  Users,
  Bell,
  Plus,
  Eye,
  Heart,
  Sparkles,
  TreePine,
  Crown,
  ChevronLeft,
  ChevronRight,
  Globe,
  Zap,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface CosmicEvent {
  id: string;
  name: string;
  type: "lunar" | "solar" | "planetary" | "seasonal" | "galactic";
  date: Date;
  description: string;
  significance: string;
  ritualSuggestions: string[];
  energyLevel: number;
  color: string;
}

interface SacredRitual {
  id: string;
  title: string;
  facilitator: string;
  type: "ceremony" | "meditation" | "study" | "action" | "celebration";
  participants: number;
  maxParticipants: number;
  date: Date;
  duration: number; // minutes
  location: "virtual" | "hybrid" | "earth_anchor";
  coordinates?: { lat: number; lng: number };
  description: string;
  intention: string;
  requirements: string[];
  flourishOffered: number;
  cosmicAlignment?: string;
  difficulty: "beginner" | "intermediate" | "advanced" | "master";
  tools: string[];
}

interface BioregionalEvent {
  id: string;
  bioregion: string;
  title: string;
  type: "seasonal" | "ecological" | "community" | "emergency";
  date: Date;
  urgency: "low" | "medium" | "high" | "critical";
  description: string;
  actionNeeded: string[];
  coordinates: { lat: number; lng: number };
}

const COSMIC_EVENTS: CosmicEvent[] = [
  {
    id: "1",
    name: "New Moon in Aquarius",
    type: "lunar",
    date: new Date(2024, 1, 10),
    description:
      "A powerful time for collective visioning and technological blessing",
    significance:
      "Innovation, community healing, and sacred technology alignment",
    ritualSuggestions: [
      "Water blessing ceremony",
      "Technology consecration",
      "Community visioning",
    ],
    energyLevel: 0.9,
    color: "#06b6d4",
  },
  {
    id: "2",
    name: "Winter Solstice",
    type: "seasonal",
    date: new Date(2024, 11, 21),
    description: "The return of light and renewal of sacred contracts",
    significance: "Death and rebirth, inner wisdom, longest night",
    ritualSuggestions: [
      "Candle lighting ceremony",
      "Ancestor honoring",
      "Intention setting",
    ],
    energyLevel: 0.95,
    color: "#f59e0b",
  },
  {
    id: "3",
    name: "Venus-Jupiter Conjunction",
    type: "planetary",
    date: new Date(2024, 2, 15),
    description: "Alignment of abundance and wisdom energies",
    significance:
      "Prosperity consciousness, spiritual expansion, heart opening",
    ritualSuggestions: [
      "Abundance ceremony",
      "Heart opening meditation",
      "Prosperity manifestation",
    ],
    energyLevel: 0.85,
    color: "#ec4899",
  },
];

const SACRED_RITUALS: SacredRitual[] = [
  {
    id: "1",
    title: "Dawn Planetary Blessing",
    facilitator: "Maya Earthsinger",
    type: "ceremony",
    participants: 47,
    maxParticipants: 108,
    date: new Date(Date.now() + 24 * 60 * 60 * 1000), // tomorrow
    duration: 60,
    location: "virtual",
    description:
      "Daily sunrise ceremony for planetary healing and collective intention setting",
    intention:
      "To bless the Earth and all beings with love, healing, and wisdom",
    requirements: ["Sacred water", "Candle or light source", "Quiet space"],
    flourishOffered: 15,
    cosmicAlignment: "Solar energy at peak receptivity",
    difficulty: "beginner",
    tools: ["Crystal bowl", "Sage or incense", "Journal"],
  },
  {
    id: "2",
    title: "Mycelial Governance Research Circle",
    facilitator: "Dr. Root Collective",
    type: "study",
    participants: 12,
    maxParticipants: 18,
    date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days
    duration: 120,
    location: "hybrid",
    coordinates: { lat: 47.6062, lng: -122.3321 }, // Seattle
    description:
      "Deep study of fungal networks as models for decentralized governance",
    intention:
      "To learn from mycelial intelligence for creating regenerative organizations",
    requirements: ["Research materials", "Note-taking tools", "Open mind"],
    flourishOffered: 25,
    cosmicAlignment: "Earth element in ascendancy",
    difficulty: "intermediate",
    tools: ["Microscope (if available)", "Field notebook", "Soil samples"],
  },
  {
    id: "3",
    title: "Sacred Technology Blessing Ritual",
    facilitator: "The Digital Shaman",
    type: "ceremony",
    participants: 23,
    maxParticipants: 33,
    date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 1 week
    duration: 90,
    location: "virtual",
    description:
      "Consecrating our technological tools for highest good and service",
    intention:
      "To align our digital tools with sacred purpose and planetary healing",
    requirements: [
      "Your primary device",
      "Sacred intention",
      "Blessing materials",
    ],
    flourishOffered: 30,
    cosmicAlignment: "Mercury in harmony with Jupiter",
    difficulty: "beginner",
    tools: ["Essential oils", "Crystals", "Sacred symbols"],
  },
];

const BIOREGIONAL_EVENTS: BioregionalEvent[] = [
  {
    id: "1",
    bioregion: "Pacific Northwest",
    title: "Ancient Forest Protection Action",
    type: "emergency",
    date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    urgency: "high",
    description:
      "Coordinated action to protect old-growth forests from logging",
    actionNeeded: [
      "Physical presence",
      "Media amplification",
      "Legal support",
      "Spiritual ceremony",
    ],
    coordinates: { lat: 45.3311, lng: -121.7113 },
  },
  {
    id: "2",
    bioregion: "Sahel Region",
    title: "Desertification Reversal Project",
    type: "ecological",
    date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
    urgency: "medium",
    description: "Community reforestation and soil restoration initiative",
    actionNeeded: [
      "Funding",
      "Tree seedlings",
      "Local coordination",
      "Water systems",
    ],
    coordinates: { lat: 14.6937, lng: -17.4441 },
  },
];

export const SacredCalendar: React.FC = () => {
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<"month" | "week" | "cosmic">(
    "month",
  );
  const [selectedEvent, setSelectedEvent] = useState<
    SacredRitual | CosmicEvent | BioregionalEvent | null
  >(null);
  const [lunarPhase, setLunarPhase] = useState<
    "new" | "waxing" | "full" | "waning"
  >("waxing");

  useEffect(() => {
    // Calculate current lunar phase
    const now = new Date();
    const lunarCycle = ((now.getDate() % 28) / 28) * 4;
    if (lunarCycle < 1) setLunarPhase("new");
    else if (lunarCycle < 2) setLunarPhase("waxing");
    else if (lunarCycle < 3) setLunarPhase("full");
    else setLunarPhase("waning");
  }, []);

  const getLunarIcon = () => {
    switch (lunarPhase) {
      case "new":
        return "🌑";
      case "waxing":
        return "🌓";
      case "full":
        return "🌕";
      case "waning":
        return "🌗";
    }
  };

  const getEventTypeIcon = (type: string) => {
    switch (type) {
      case "ceremony":
        return <Sparkles className="w-4 h-4" />;
      case "meditation":
        return <Heart className="w-4 h-4" />;
      case "study":
        return <Eye className="w-4 h-4" />;
      case "action":
        return <Zap className="w-4 h-4" />;
      case "celebration":
        return <Star className="w-4 h-4" />;
      case "lunar":
        return <Moon className="w-4 h-4" />;
      case "solar":
        return <Sun className="w-4 h-4" />;
      case "planetary":
        return <Globe className="w-4 h-4" />;
      case "seasonal":
        return <TreePine className="w-4 h-4" />;
      case "galactic":
        return <Star className="w-4 h-4" />;
      default:
        return <Calendar className="w-4 h-4" />;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "bg-green-500/20 text-green-400";
      case "intermediate":
        return "bg-blue-500/20 text-blue-400";
      case "advanced":
        return "bg-purple-500/20 text-purple-400";
      case "master":
        return "bg-gold-500/20 text-yellow-400";
      default:
        return "bg-gray-500/20 text-gray-400";
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "low":
        return "bg-green-500/20 text-green-400";
      case "medium":
        return "bg-yellow-500/20 text-yellow-400";
      case "high":
        return "bg-orange-500/20 text-orange-400";
      case "critical":
        return "bg-red-500/20 text-red-400";
      default:
        return "bg-gray-500/20 text-gray-400";
    }
  };

  const formatDateTime = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-cyan-400 flex items-center">
            <Calendar className="w-6 h-6 mr-2" />
            Sacred Calendar
            <span className="ml-3 text-xl">{getLunarIcon()}</span>
          </h2>
          <p className="text-gray-400">
            Cosmic alignments and ritual coordination
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <Badge className="bg-purple-500/20 text-purple-400">
            <Moon className="w-3 h-3 mr-1" />
            {lunarPhase} moon
          </Badge>
          <Button
            onClick={() => navigate("/ritual-technologist")}
            className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
          >
            🛠️ Book Ritual Tech Session
          </Button>
        </div>
      </div>

      <Tabs
        value={viewMode}
        onValueChange={(v) => setViewMode(v as "month" | "week" | "cosmic")}
        className="space-y-6"
      >
        <TabsList className="grid w-full grid-cols-3 bg-black/40 border border-white/20">
          <TabsTrigger
            value="month"
            className="data-[state=active]:bg-cyan-500/50"
          >
            <Calendar className="w-4 h-4 mr-2" />
            Monthly View
          </TabsTrigger>
          <TabsTrigger
            value="cosmic"
            className="data-[state=active]:bg-purple-500/50"
          >
            <Star className="w-4 h-4 mr-2" />
            Cosmic Events
          </TabsTrigger>
          <TabsTrigger
            value="bioregional"
            className="data-[state=active]:bg-green-500/50"
          >
            <TreePine className="w-4 h-4 mr-2" />
            Bioregional
          </TabsTrigger>
        </TabsList>

        {/* Monthly Ritual View */}
        <TabsContent value="month" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Upcoming Rituals */}
            <Card className="bg-black/40 border-white/20 backdrop-blur-md">
              <CardHeader>
                <CardTitle className="text-cyan-400">
                  Upcoming Sacred Rituals
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {SACRED_RITUALS.map((ritual) => (
                  <motion.div
                    key={ritual.id}
                    whileHover={{ scale: 1.02 }}
                    className="cursor-pointer p-4 bg-black/20 rounded-lg border border-white/10 hover:border-white/20 transition-all"
                    onClick={() => setSelectedEvent(ritual)}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-white">
                        {ritual.title}
                      </h3>
                      <Badge className={getDifficultyColor(ritual.difficulty)}>
                        {ritual.difficulty}
                      </Badge>
                    </div>

                    <div className="flex items-center space-x-4 text-sm text-gray-400 mb-2">
                      <span className="flex items-center">
                        {getEventTypeIcon(ritual.type)}
                        <span className="ml-1">{ritual.type}</span>
                      </span>
                      <span className="flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {formatDateTime(ritual.date)}
                      </span>
                      <span className="flex items-center">
                        <Users className="w-3 h-3 mr-1" />
                        {ritual.participants}/{ritual.maxParticipants}
                      </span>
                    </div>

                    <p className="text-gray-300 text-sm mb-3">
                      {ritual.intention}
                    </p>

                    <div className="flex items-center justify-between">
                      <span className="text-purple-400 text-sm">
                        by {ritual.facilitator}
                      </span>
                      <Badge className="bg-yellow-500/20 text-yellow-400">
                        <Sparkles className="w-3 h-3 mr-1" />
                        {ritual.flourishOffered}
                      </Badge>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>

            {/* Create New Ritual */}
            <Card className="bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border-purple-400/20 backdrop-blur-md">
              <CardHeader>
                <CardTitle className="text-purple-400">
                  Facilitate a Sacred Ritual
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-300">
                  Share your gifts with the community by facilitating a sacred
                  gathering. Every ritual strengthens our collective wisdom.
                </p>

                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Sparkles className="w-4 h-4 text-purple-400" />
                    <span className="text-sm">
                      Choose your ritual type and intention
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-purple-400" />
                    <span className="text-sm">
                      Set cosmic alignment and timing
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-purple-400" />
                    <span className="text-sm">
                      Invite participants and set capacity
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Heart className="w-4 h-4 text-purple-400" />
                    <span className="text-sm">
                      Generate Flourish through service
                    </span>
                  </div>
                </div>

                <Button className="w-full bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Sacred Ritual
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Cosmic Events */}
        <TabsContent value="cosmic" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            {COSMIC_EVENTS.map((event) => (
              <Card
                key={event.id}
                className="bg-black/40 border-white/20 backdrop-blur-md hover:border-white/40 transition-all"
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-cyan-400 flex items-center">
                        {getEventTypeIcon(event.type)}
                        <span className="ml-2">{event.name}</span>
                      </CardTitle>
                      <p className="text-sm text-gray-400 mt-1">
                        {formatDateTime(event.date)}
                      </p>
                    </div>
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: event.color }}
                    />
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-300">{event.description}</p>

                  <div>
                    <h4 className="font-semibold text-purple-400 mb-2">
                      Spiritual Significance
                    </h4>
                    <p className="text-sm text-gray-300">
                      {event.significance}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-green-400 mb-2">
                      Suggested Rituals
                    </h4>
                    <div className="space-y-1">
                      {event.ritualSuggestions.map((suggestion, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-2"
                        >
                          <Sparkles className="w-3 h-3 text-green-400" />
                          <span className="text-sm text-gray-300">
                            {suggestion}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-400">
                        Energy Level:
                      </span>
                      <div className="w-20 bg-gray-700 rounded-full h-2">
                        <div
                          className="h-2 rounded-full bg-gradient-to-r from-cyan-400 to-purple-400"
                          style={{ width: `${event.energyLevel * 100}%` }}
                        />
                      </div>
                    </div>
                    <Button
                      size="sm"
                      className="bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600"
                    >
                      Create Ritual
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Bioregional Events */}
        <TabsContent value="bioregional" className="space-y-6">
          <div className="space-y-4">
            {BIOREGIONAL_EVENTS.map((event) => (
              <Card
                key={event.id}
                className="bg-black/40 border-white/20 backdrop-blur-md"
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-white text-lg mb-1">
                        {event.title}
                      </h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-400">
                        <span className="flex items-center">
                          <TreePine className="w-3 h-3 mr-1" />
                          {event.bioregion}
                        </span>
                        <span className="flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          {formatDateTime(event.date)}
                        </span>
                        <Badge className={getUrgencyColor(event.urgency)}>
                          {event.urgency} urgency
                        </Badge>
                      </div>
                    </div>
                    <Badge className="bg-green-500/20 text-green-400">
                      {event.type}
                    </Badge>
                  </div>

                  <p className="text-gray-300 mb-4">{event.description}</p>

                  <div className="mb-4">
                    <h4 className="font-semibold text-orange-400 mb-2">
                      Action Needed
                    </h4>
                    <div className="grid grid-cols-2 gap-2">
                      {event.actionNeeded.map((action, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-2"
                        >
                          <Zap className="w-3 h-3 text-orange-400" />
                          <span className="text-sm text-gray-300">
                            {action}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="flex items-center text-sm text-gray-400">
                      <MapPin className="w-3 h-3 mr-1" />
                      {event.coordinates.lat.toFixed(2)},{" "}
                      {event.coordinates.lng.toFixed(2)}
                    </span>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-cyan-400 text-cyan-400 hover:bg-cyan-400/20"
                      >
                        View Details
                      </Button>
                      <Button
                        size="sm"
                        className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                      >
                        Join Action
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Event Detail Modal */}
      <AnimatePresence>
        {selectedEvent && "facilitator" in selectedEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6"
            onClick={() => setSelectedEvent(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-black/90 border border-white/20 rounded-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="space-y-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-cyan-400 mb-2">
                      {selectedEvent.title}
                    </h2>
                    <p className="text-purple-400">
                      Facilitated by {selectedEvent.facilitator}
                    </p>
                  </div>
                  <Badge
                    className={getDifficultyColor(selectedEvent.difficulty)}
                  >
                    {selectedEvent.difficulty}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-white mb-2">Details</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span>{formatDateTime(selectedEvent.date)}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Users className="w-4 h-4 text-gray-400" />
                        <span>
                          {selectedEvent.participants}/
                          {selectedEvent.maxParticipants} participants
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span>{selectedEvent.location}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Sparkles className="w-4 h-4 text-yellow-400" />
                        <span>
                          {selectedEvent.flourishOffered} Flourish offered
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-white mb-2">
                      Requirements
                    </h3>
                    <div className="space-y-1">
                      {selectedEvent.requirements.map((req, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-2 text-sm"
                        >
                          <Bell className="w-3 h-3 text-cyan-400" />
                          <span>{req}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-green-400 mb-2">
                    Sacred Intention
                  </h3>
                  <p className="text-gray-300">{selectedEvent.intention}</p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-300 mb-2">
                    Description
                  </h3>
                  <p className="text-gray-300">{selectedEvent.description}</p>
                </div>

                {selectedEvent.cosmicAlignment && (
                  <div>
                    <h3 className="font-semibold text-purple-400 mb-2">
                      Cosmic Alignment
                    </h3>
                    <p className="text-gray-300">
                      {selectedEvent.cosmicAlignment}
                    </p>
                  </div>
                )}

                <div className="flex space-x-4">
                  <Button className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600">
                    Join Ritual
                  </Button>
                  <Button
                    variant="outline"
                    className="border-cyan-400 text-cyan-400 hover:bg-cyan-400/20"
                  >
                    Add to Calendar
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SacredCalendar;
