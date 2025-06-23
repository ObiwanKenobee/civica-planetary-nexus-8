// CIVICA 144 Community Hub
// Sacred collaboration and connection space

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Users,
  MessageCircle,
  Heart,
  Star,
  Globe,
  Sparkles,
  Calendar,
  MapPin,
  TreePine,
  Crown,
  ArrowRight,
  Eye,
  HandHeart,
  Zap,
  Clock,
  Gift,
  Network,
  BookOpen,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSacredAuth } from "@/hooks/useSacredAuth";
import { useCivica } from "@/contexts/CivicaContext";

interface CommunityMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
  location: string;
  activeRituals: number;
  wisdomShared: number;
  flourishGenerated: number;
  onlineStatus: "online" | "ritual" | "away" | "offline";
  sacredSkills: string[];
  lastContribution: Date;
}

interface SacredCircle {
  id: string;
  name: string;
  purpose: string;
  members: number;
  maxMembers: number;
  type: "ritual" | "study" | "action" | "creation";
  schedule: string;
  guardian: string;
  openToJoin: boolean;
  ritualLevel: "beginner" | "intermediate" | "advanced" | "master";
}

interface WisdomThread {
  id: string;
  title: string;
  author: string;
  authorRole: string;
  content: string;
  responses: number;
  blessings: number;
  tags: string[];
  lastActivity: Date;
  category: "question" | "insight" | "ritual" | "research" | "celebration";
  flourishOffered: number;
}

const MOCK_COMMUNITY_MEMBERS: CommunityMember[] = [
  {
    id: "1",
    name: "Maya Earthsinger",
    role: "Forest Delegate",
    avatar: "🌳",
    location: "Pacific Northwest",
    activeRituals: 3,
    wisdomShared: 47,
    flourishGenerated: 234,
    onlineStatus: "ritual",
    sacredSkills: [
      "Plant Communication",
      "Ecosystem Design",
      "Sacred Listening",
    ],
    lastContribution: new Date(Date.now() - 2 * 60 * 60 * 1000),
  },
  {
    id: "2",
    name: "Kwame Futureweaver",
    role: "Future Diplomat",
    avatar: "🌟",
    location: "Accra, Ghana",
    activeRituals: 2,
    wisdomShared: 23,
    flourishGenerated: 156,
    onlineStatus: "online",
    sacredSkills: ["Future Simulation", "Ancestral Wisdom", "Time Bridging"],
    lastContribution: new Date(Date.now() - 30 * 60 * 1000),
  },
  {
    id: "3",
    name: "Luna Storykeeper",
    role: "Myth Weaver",
    avatar: "📜",
    location: "Mumbai, India",
    activeRituals: 5,
    wisdomShared: 89,
    flourishGenerated: 432,
    onlineStatus: "online",
    sacredSkills: [
      "Story Medicine",
      "Cultural Translation",
      "Narrative Healing",
    ],
    lastContribution: new Date(Date.now() - 10 * 60 * 1000),
  },
];

const MOCK_SACRED_CIRCLES: SacredCircle[] = [
  {
    id: "1",
    name: "Dawn Ceremony Circle",
    purpose: "Daily sunrise intention setting and planetary blessing",
    members: 12,
    maxMembers: 21,
    type: "ritual",
    schedule: "Daily at sunrise",
    guardian: "Elder Sunhawk",
    openToJoin: true,
    ritualLevel: "beginner",
  },
  {
    id: "2",
    name: "Mycelial Network Research",
    purpose: "Studying fungal intelligence for governance models",
    members: 8,
    maxMembers: 12,
    type: "study",
    schedule: "Thursdays 7PM UTC",
    guardian: "Dr. Root Collective",
    openToJoin: true,
    ritualLevel: "intermediate",
  },
  {
    id: "3",
    name: "Sacred Economics Lab",
    purpose: "Designing regenerative economic systems",
    members: 15,
    maxMembers: 18,
    type: "creation",
    schedule: "Bi-weekly Saturdays",
    guardian: "The Abundance Keeper",
    openToJoin: false,
    ritualLevel: "advanced",
  },
];

const MOCK_WISDOM_THREADS: WisdomThread[] = [
  {
    id: "1",
    title: "How do we bridge indigenous wisdom with AI development?",
    author: "River Pathfinder",
    authorRole: "Wisdom Keeper",
    content:
      "I've been contemplating how ancient wisdom traditions can inform our approach to artificial intelligence...",
    responses: 23,
    blessings: 45,
    tags: ["AI Ethics", "Indigenous Wisdom", "Sacred Technology"],
    lastActivity: new Date(Date.now() - 3 * 60 * 60 * 1000),
    category: "question",
    flourishOffered: 25,
  },
  {
    id: "2",
    title: "Successful regenerative agriculture pilot in Kenya",
    author: "Amara Soilkeeper",
    authorRole: "Soil Steward",
    content:
      "Sharing results from our 6-month permaculture project that increased soil health by 300%...",
    responses: 18,
    blessings: 67,
    tags: ["Regenerative Agriculture", "Success Story", "Kenya"],
    lastActivity: new Date(Date.now() - 1 * 60 * 60 * 1000),
    category: "celebration",
    flourishOffered: 50,
  },
  {
    id: "3",
    title: "New moon intention ritual for collective healing",
    author: "Luna Ceremonialist",
    authorRole: "Ritual Designer",
    content:
      "I'm offering a new moon ceremony focused on planetary healing. Here's the ritual structure...",
    responses: 34,
    blessings: 89,
    tags: ["Ritual Design", "New Moon", "Planetary Healing"],
    lastActivity: new Date(Date.now() - 30 * 60 * 1000),
    category: "ritual",
    flourishOffered: 15,
  },
];

export const CommunityHub: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useSacredAuth();
  const { state: civicaState } = useCivica();

  const [activeTab, setActiveTab] = useState("members");
  const [selectedMember, setSelectedMember] = useState<CommunityMember | null>(
    null,
  );
  const [onlineMembers, setOnlineMembers] = useState(MOCK_COMMUNITY_MEMBERS);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "bg-green-400";
      case "ritual":
        return "bg-purple-400 animate-pulse";
      case "away":
        return "bg-yellow-400";
      case "offline":
        return "bg-gray-400";
      default:
        return "bg-gray-400";
    }
  };

  const getRitualLevelColor = (level: string) => {
    switch (level) {
      case "beginner":
        return "bg-green-500";
      case "intermediate":
        return "bg-blue-500";
      case "advanced":
        return "bg-purple-500";
      case "master":
        return "bg-gold-500";
      default:
        return "bg-gray-500";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "question":
        return <MessageCircle className="w-4 h-4" />;
      case "insight":
        return <Star className="w-4 h-4" />;
      case "ritual":
        return <Sparkles className="w-4 h-4" />;
      case "research":
        return <BookOpen className="w-4 h-4" />;
      case "celebration":
        return <Heart className="w-4 h-4" />;
      default:
        return <MessageCircle className="w-4 h-4" />;
    }
  };

  const timeAgo = (date: Date) => {
    const minutes = Math.floor((Date.now() - date.getTime()) / (1000 * 60));
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-cyan-400">Sacred Community</h2>
          <p className="text-gray-400">
            Connect with fellow stewards of planetary intelligence
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <Badge className="bg-green-500/20 text-green-400">
            <Users className="w-3 h-3 mr-1" />
            {
              onlineMembers.filter(
                (m) =>
                  m.onlineStatus === "online" || m.onlineStatus === "ritual",
              ).length
            }{" "}
            Online
          </Badge>
          <Button
            onClick={() => navigate("/ritual-technologist")}
            className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
          >
            🛠️ Ritual Tech Services
          </Button>
        </div>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TabsList className="grid w-full grid-cols-4 bg-black/40 border border-white/20">
          <TabsTrigger
            value="members"
            className="data-[state=active]:bg-cyan-500/50"
          >
            <Users className="w-4 h-4 mr-2" />
            Community
          </TabsTrigger>
          <TabsTrigger
            value="circles"
            className="data-[state=active]:bg-purple-500/50"
          >
            <Crown className="w-4 h-4 mr-2" />
            Sacred Circles
          </TabsTrigger>
          <TabsTrigger
            value="wisdom"
            className="data-[state=active]:bg-green-500/50"
          >
            <BookOpen className="w-4 h-4 mr-2" />
            Wisdom Threads
          </TabsTrigger>
          <TabsTrigger
            value="collaboration"
            className="data-[state=active]:bg-orange-500/50"
          >
            <Network className="w-4 h-4 mr-2" />
            Collaborate
          </TabsTrigger>
        </TabsList>

        {/* Community Members */}
        <TabsContent value="members" className="space-y-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {onlineMembers.map((member) => (
              <motion.div
                key={member.id}
                whileHover={{ scale: 1.02 }}
                className="cursor-pointer"
                onClick={() => setSelectedMember(member)}
              >
                <Card className="bg-black/40 border-white/20 backdrop-blur-md hover:border-white/40 transition-all">
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <div className="relative">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-400 to-purple-400 flex items-center justify-center text-xl">
                          {member.avatar}
                        </div>
                        <div
                          className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-gray-800 ${getStatusColor(member.onlineStatus)}`}
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-white truncate">
                          {member.name}
                        </h3>
                        <p className="text-sm text-cyan-400">{member.role}</p>
                        <p className="text-xs text-gray-400 flex items-center mt-1">
                          <MapPin className="w-3 h-3 mr-1" />
                          {member.location}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                      <div>
                        <div className="text-lg font-bold text-purple-400">
                          {member.activeRituals}
                        </div>
                        <div className="text-xs text-gray-400">Rituals</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-green-400">
                          {member.wisdomShared}
                        </div>
                        <div className="text-xs text-gray-400">Wisdom</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-yellow-400">
                          {member.flourishGenerated}
                        </div>
                        <div className="text-xs text-gray-400">Flourish</div>
                      </div>
                    </div>

                    <div className="mt-3 flex flex-wrap gap-1">
                      {member.sacredSkills.slice(0, 2).map((skill) => (
                        <Badge
                          key={skill}
                          variant="outline"
                          className="text-xs"
                        >
                          {skill}
                        </Badge>
                      ))}
                      {member.sacredSkills.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{member.sacredSkills.length - 2}
                        </Badge>
                      )}
                    </div>

                    <div className="mt-3 text-xs text-gray-400">
                      Last seen: {timeAgo(member.lastContribution)}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        {/* Sacred Circles */}
        <TabsContent value="circles" className="space-y-4">
          <div className="grid lg:grid-cols-2 gap-6">
            {MOCK_SACRED_CIRCLES.map((circle) => (
              <Card
                key={circle.id}
                className="bg-black/40 border-white/20 backdrop-blur-md hover:border-white/40 transition-all"
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-cyan-400">
                        {circle.name}
                      </CardTitle>
                      <p className="text-sm text-gray-400 mt-1">
                        {circle.purpose}
                      </p>
                    </div>
                    <Badge
                      className={`${getRitualLevelColor(circle.ritualLevel)} text-white`}
                    >
                      {circle.ritualLevel}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Members:</span>
                    <span className="text-white">
                      {circle.members}/{circle.maxMembers}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Schedule:</span>
                    <span className="text-white">{circle.schedule}</span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Guardian:</span>
                    <span className="text-purple-400">{circle.guardian}</span>
                  </div>

                  <Button
                    disabled={!circle.openToJoin}
                    className={`w-full ${
                      circle.openToJoin
                        ? "bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                        : "bg-gray-600 cursor-not-allowed"
                    }`}
                  >
                    {circle.openToJoin ? "Request to Join" : "Circle Full"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Wisdom Threads */}
        <TabsContent value="wisdom" className="space-y-4">
          <div className="space-y-4">
            {MOCK_WISDOM_THREADS.map((thread) => (
              <Card
                key={thread.id}
                className="bg-black/40 border-white/20 backdrop-blur-md hover:border-white/40 transition-all"
              >
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-400 to-cyan-400 flex items-center justify-center">
                        {getCategoryIcon(thread.category)}
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <h3 className="font-semibold text-white text-lg mb-2">
                          {thread.title}
                        </h3>
                        <Badge className="bg-yellow-500/20 text-yellow-400">
                          <Sparkles className="w-3 h-3 mr-1" />
                          {thread.flourishOffered}
                        </Badge>
                      </div>

                      <div className="flex items-center space-x-4 text-sm text-gray-400 mb-3">
                        <span>
                          by{" "}
                          <span className="text-cyan-400">{thread.author}</span>
                        </span>
                        <span>•</span>
                        <span>{thread.authorRole}</span>
                        <span>•</span>
                        <span>{timeAgo(thread.lastActivity)}</span>
                      </div>

                      <p className="text-gray-300 mb-4">{thread.content}</p>

                      <div className="flex items-center justify-between">
                        <div className="flex flex-wrap gap-2">
                          {thread.tags.map((tag) => (
                            <Badge
                              key={tag}
                              variant="outline"
                              className="text-xs"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        <div className="flex items-center space-x-4 text-sm">
                          <span className="flex items-center text-gray-400">
                            <MessageCircle className="w-4 h-4 mr-1" />
                            {thread.responses}
                          </span>
                          <span className="flex items-center text-red-400">
                            <Heart className="w-4 h-4 mr-1" />
                            {thread.blessings}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Collaboration */}
        <TabsContent value="collaboration" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 border-purple-400/20 backdrop-blur-md">
              <CardHeader>
                <CardTitle className="text-purple-400">
                  Sacred Co-Creation
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-300">
                  Join forces with fellow stewards to birth new solutions for
                  planetary healing.
                </p>
                <div className="space-y-2">
                  {[
                    "Regenerative Systems Design",
                    "Wisdom Documentation",
                    "Ritual Creation",
                    "Technology Development",
                  ].map((project) => (
                    <div key={project} className="flex items-center space-x-2">
                      <HandHeart className="w-4 h-4 text-purple-400" />
                      <span className="text-sm">{project}</span>
                    </div>
                  ))}
                </div>
                <Button className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600">
                  Start Co-Creation
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 border-amber-400/20 backdrop-blur-md">
              <CardHeader>
                <CardTitle className="text-amber-400 flex items-center">
                  🛠️ Ritual Technology Services
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-300">
                  Professional sacred technology consulting and business
                  transformation services.
                </p>
                <div className="space-y-2">
                  {[
                    "Sacred Business Strategy",
                    "Technology Blessing",
                    "Wisdom Integration",
                    "Flourish Economy Design",
                  ].map((service) => (
                    <div key={service} className="flex items-center space-x-2">
                      <Zap className="w-4 h-4 text-amber-400" />
                      <span className="text-sm">{service}</span>
                    </div>
                  ))}
                </div>
                <Button
                  onClick={() => navigate("/ritual-technologist")}
                  className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
                >
                  Explore Services
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Member Detail Modal */}
      <AnimatePresence>
        {selectedMember && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6"
            onClick={() => setSelectedMember(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-black/90 border border-white/20 rounded-lg p-6 max-w-lg w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center space-x-4 mb-6">
                <div className="relative">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-cyan-400 to-purple-400 flex items-center justify-center text-2xl">
                    {selectedMember.avatar}
                  </div>
                  <div
                    className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-gray-800 ${getStatusColor(selectedMember.onlineStatus)}`}
                  />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">
                    {selectedMember.name}
                  </h3>
                  <p className="text-cyan-400">{selectedMember.role}</p>
                  <p className="text-gray-400 flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {selectedMember.location}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-purple-400 mb-2">
                    Sacred Skills
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedMember.sacredSkills.map((skill) => (
                      <Badge
                        key={skill}
                        className="bg-purple-500/20 text-purple-400"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="bg-black/40 rounded-lg p-3">
                    <div className="text-lg font-bold text-purple-400">
                      {selectedMember.activeRituals}
                    </div>
                    <div className="text-xs text-gray-400">Active Rituals</div>
                  </div>
                  <div className="bg-black/40 rounded-lg p-3">
                    <div className="text-lg font-bold text-green-400">
                      {selectedMember.wisdomShared}
                    </div>
                    <div className="text-xs text-gray-400">Wisdom Shared</div>
                  </div>
                  <div className="bg-black/40 rounded-lg p-3">
                    <div className="text-lg font-bold text-yellow-400">
                      {selectedMember.flourishGenerated}
                    </div>
                    <div className="text-xs text-gray-400">
                      Flourish Generated
                    </div>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <Button className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600">
                    Send Message
                  </Button>
                  <Button className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600">
                    Collaborate
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

export default CommunityHub;
