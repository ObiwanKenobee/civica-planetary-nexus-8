// CIVICA 144 Wisdom Library
// Sacred knowledge repository and sharing system

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BookOpen,
  Search,
  Star,
  Download,
  Share,
  Heart,
  TreePine,
  Crown,
  Globe,
  Sparkles,
  Eye,
  Clock,
  Filter,
  Tag,
  Users,
  Zap,
  ArrowRight,
  Plus,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface WisdomScroll {
  id: string;
  title: string;
  author: string;
  authorRole: string;
  category:
    | "ritual"
    | "research"
    | "story"
    | "technology"
    | "governance"
    | "economics";
  type:
    | "scroll"
    | "meditation"
    | "pattern"
    | "blueprint"
    | "ceremony"
    | "insight";
  description: string;
  content: string;
  tags: string[];
  difficulty: "novice" | "practitioner" | "adept" | "master";
  readTime: number; // minutes
  downloads: number;
  blessings: number;
  dateCreated: Date;
  lastUpdated: Date;
  flourishValue: number;
  prerequisites?: string[];
  relatedScrolls: string[];
  sacredGeometry?: string;
  cosmicAlignment?: string;
  embodimentPractices: string[];
}

interface WisdomKeeper {
  id: string;
  name: string;
  role: string;
  avatar: string;
  specializations: string[];
  scrollsContributed: number;
  wisdomRating: number;
  activeContributor: boolean;
  bio: string;
  sacredTools: string[];
}

const WISDOM_SCROLLS: WisdomScroll[] = [
  {
    id: "1",
    title: "The Sacred Art of Technology Blessing",
    author: "Maya Techweaver",
    authorRole: "Digital Shaman",
    category: "technology",
    type: "ceremony",
    description:
      "A comprehensive guide to consecrating digital tools for highest service",
    content:
      "In the age of sacred technology, we must remember that every device carries consciousness...",
    tags: ["technology", "blessing", "ritual", "consciousness", "sacred tools"],
    difficulty: "practitioner",
    readTime: 15,
    downloads: 234,
    blessings: 89,
    dateCreated: new Date(2024, 0, 15),
    lastUpdated: new Date(2024, 1, 3),
    flourishValue: 25,
    prerequisites: ["Basic ritual understanding", "Technological familiarity"],
    relatedScrolls: ["2", "5"],
    sacredGeometry: "Merkaba",
    cosmicAlignment: "Mercury in harmony with Jupiter",
    embodimentPractices: [
      "Device meditation",
      "Energy cleansing",
      "Intention setting",
    ],
  },
  {
    id: "2",
    title: "Mycelial Governance: Learning from Fungal Networks",
    author: "Dr. Root Collective",
    authorRole: "Network Researcher",
    category: "governance",
    type: "research",
    description:
      "Exploring decentralized decision-making through the lens of mycelial intelligence",
    content:
      "The underground network of fungal threads offers profound insights into decentralized organization...",
    tags: ["governance", "mycelia", "networks", "decentralization", "biology"],
    difficulty: "adept",
    readTime: 32,
    downloads: 156,
    blessings: 67,
    dateCreated: new Date(2024, 0, 8),
    lastUpdated: new Date(2024, 1, 1),
    flourishValue: 40,
    prerequisites: ["Systems thinking", "Basic ecology knowledge"],
    relatedScrolls: ["1", "3", "4"],
    embodimentPractices: [
      "Forest meditation",
      "Network visualization",
      "Consensus practice",
    ],
  },
  {
    id: "3",
    title: "The Flourish Economy: Sacred Value Creation",
    author: "Abundance Keeper",
    authorRole: "Economic Healer",
    category: "economics",
    type: "blueprint",
    description:
      "A detailed exploration of regenerative economic systems based on sacred value",
    content:
      "Beyond traditional currency lies a realm of sacred value that honors the true wealth of service...",
    tags: [
      "economics",
      "flourish",
      "regenerative",
      "sacred value",
      "abundance",
    ],
    difficulty: "practitioner",
    readTime: 28,
    downloads: 189,
    blessings: 134,
    dateCreated: new Date(2024, 0, 22),
    lastUpdated: new Date(2024, 1, 5),
    flourishValue: 35,
    prerequisites: ["Basic economics understanding", "Abundance mindset"],
    relatedScrolls: ["2", "6"],
    embodimentPractices: [
      "Gratitude practice",
      "Value meditation",
      "Service offerings",
    ],
  },
  {
    id: "4",
    title: "Bioregional Sensing: Attuning to Local Ecosystems",
    author: "River Listener",
    authorRole: "Bioregional Steward",
    category: "ritual",
    type: "meditation",
    description:
      "Practices for developing deep ecological awareness and bioregional connection",
    content:
      "To serve the Earth, we must first learn to listen with our whole being to the local ecosystem...",
    tags: ["bioregional", "sensing", "ecology", "meditation", "connection"],
    difficulty: "novice",
    readTime: 18,
    downloads: 298,
    blessings: 156,
    dateCreated: new Date(2024, 1, 2),
    lastUpdated: new Date(2024, 1, 8),
    flourishValue: 20,
    relatedScrolls: ["2", "5"],
    embodimentPractices: [
      "Nature sitting",
      "Sensory awareness",
      "Ecosystem mapping",
    ],
  },
  {
    id: "5",
    title: "The Future Ancestor Practice",
    author: "Time Keeper Ahava",
    authorRole: "Future Diplomat",
    category: "story",
    type: "ceremony",
    description:
      "A ritual framework for consulting with future generations in decision-making",
    content:
      "Every choice we make echoes through time. This practice helps us listen to the wisdom of unborn voices...",
    tags: ["future", "ancestors", "time", "ceremony", "decision-making"],
    difficulty: "adept",
    readTime: 25,
    downloads: 167,
    blessings: 89,
    dateCreated: new Date(2024, 1, 10),
    lastUpdated: new Date(2024, 1, 12),
    flourishValue: 45,
    prerequisites: [
      "Time meditation experience",
      "Ancestor connection practices",
    ],
    relatedScrolls: ["1", "4"],
    sacredGeometry: "Spiral",
    cosmicAlignment: "Saturn trine Neptune",
    embodimentPractices: [
      "Time meditation",
      "Future visioning",
      "Ancestor dialogue",
    ],
  },
];

const WISDOM_KEEPERS: WisdomKeeper[] = [
  {
    id: "1",
    name: "Maya Techweaver",
    role: "Digital Shaman",
    avatar: "🔮",
    specializations: [
      "Sacred Technology",
      "Digital Blessing",
      "Consciousness Tech",
    ],
    scrollsContributed: 12,
    wisdomRating: 4.8,
    activeContributor: true,
    bio: "Bridging ancient wisdom with modern technology for planetary healing",
    sacredTools: [
      "Crystal-infused computers",
      "Blessed algorithms",
      "Conscious code",
    ],
  },
  {
    id: "2",
    name: "Dr. Root Collective",
    role: "Network Researcher",
    avatar: "🍄",
    specializations: [
      "Mycelial Governance",
      "Network Theory",
      "Biological Intelligence",
    ],
    scrollsContributed: 8,
    wisdomRating: 4.9,
    activeContributor: true,
    bio: "Learning from fungal networks to create regenerative organizational structures",
    sacredTools: ["Microscopes", "Network mapping", "Soil communion"],
  },
  {
    id: "3",
    name: "River Listener",
    role: "Bioregional Steward",
    avatar: "🌊",
    specializations: [
      "Bioregional Awareness",
      "Ecosystem Communication",
      "Place-based Wisdom",
    ],
    scrollsContributed: 15,
    wisdomRating: 4.7,
    activeContributor: true,
    bio: "Teaching humans to listen to the voice of the land and water",
    sacredTools: ["Water ceremonies", "Plant allies", "Stone circles"],
  },
];

export const WisdomLibrary: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("all");
  const [selectedScroll, setSelectedScroll] = useState<WisdomScroll | null>(
    null,
  );
  const [filteredScrolls, setFilteredScrolls] = useState(WISDOM_SCROLLS);
  const [activeTab, setActiveTab] = useState("scrolls");

  useEffect(() => {
    let filtered = WISDOM_SCROLLS;

    if (searchQuery) {
      filtered = filtered.filter(
        (scroll) =>
          scroll.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          scroll.tags.some((tag) =>
            tag.toLowerCase().includes(searchQuery.toLowerCase()),
          ) ||
          scroll.description.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (scroll) => scroll.category === selectedCategory,
      );
    }

    if (selectedDifficulty !== "all") {
      filtered = filtered.filter(
        (scroll) => scroll.difficulty === selectedDifficulty,
      );
    }

    setFilteredScrolls(filtered);
  }, [searchQuery, selectedCategory, selectedDifficulty]);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "ritual":
        return <Sparkles className="w-4 h-4" />;
      case "research":
        return <BookOpen className="w-4 h-4" />;
      case "story":
        return <Heart className="w-4 h-4" />;
      case "technology":
        return <Zap className="w-4 h-4" />;
      case "governance":
        return <Crown className="w-4 h-4" />;
      case "economics":
        return <Star className="w-4 h-4" />;
      default:
        return <BookOpen className="w-4 h-4" />;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "novice":
        return "bg-green-500/20 text-green-400";
      case "practitioner":
        return "bg-blue-500/20 text-blue-400";
      case "adept":
        return "bg-purple-500/20 text-purple-400";
      case "master":
        return "bg-gold-500/20 text-yellow-400";
      default:
        return "bg-gray-500/20 text-gray-400";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "scroll":
        return "bg-cyan-500/20 text-cyan-400";
      case "meditation":
        return "bg-purple-500/20 text-purple-400";
      case "pattern":
        return "bg-green-500/20 text-green-400";
      case "blueprint":
        return "bg-blue-500/20 text-blue-400";
      case "ceremony":
        return "bg-pink-500/20 text-pink-400";
      case "insight":
        return "bg-yellow-500/20 text-yellow-400";
      default:
        return "bg-gray-500/20 text-gray-400";
    }
  };

  const timeAgo = (date: Date) => {
    const days = Math.floor(
      (Date.now() - date.getTime()) / (1000 * 60 * 60 * 24),
    );
    if (days === 0) return "Today";
    if (days === 1) return "Yesterday";
    if (days < 30) return `${days} days ago`;
    const months = Math.floor(days / 30);
    return `${months} month${months > 1 ? "s" : ""} ago`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-cyan-400 flex items-center">
            <BookOpen className="w-6 h-6 mr-2" />
            Sacred Wisdom Library
          </h2>
          <p className="text-gray-400">
            Repository of planetary intelligence and sacred knowledge
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <Badge className="bg-green-500/20 text-green-400">
            <BookOpen className="w-3 h-3 mr-1" />
            {WISDOM_SCROLLS.length} Sacred Scrolls
          </Badge>
          <Button
            onClick={() => navigate("/ritual-technologist")}
            className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
          >
            🛠️ Commission Wisdom Scroll
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <Card className="bg-black/40 border-white/20 backdrop-blur-md">
        <CardContent className="p-6">
          <div className="grid md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search wisdom scrolls..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-black/20 border-white/20"
                />
              </div>
            </div>

            <div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full p-2 bg-black/20 border border-white/20 rounded-md text-white"
              >
                <option value="all">All Categories</option>
                <option value="ritual">Ritual</option>
                <option value="research">Research</option>
                <option value="story">Story</option>
                <option value="technology">Technology</option>
                <option value="governance">Governance</option>
                <option value="economics">Economics</option>
              </select>
            </div>

            <div>
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="w-full p-2 bg-black/20 border border-white/20 rounded-md text-white"
              >
                <option value="all">All Levels</option>
                <option value="novice">Novice</option>
                <option value="practitioner">Practitioner</option>
                <option value="adept">Adept</option>
                <option value="master">Master</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TabsList className="grid w-full grid-cols-3 bg-black/40 border border-white/20">
          <TabsTrigger
            value="scrolls"
            className="data-[state=active]:bg-cyan-500/50"
          >
            <BookOpen className="w-4 h-4 mr-2" />
            Sacred Scrolls
          </TabsTrigger>
          <TabsTrigger
            value="keepers"
            className="data-[state=active]:bg-purple-500/50"
          >
            <Crown className="w-4 h-4 mr-2" />
            Wisdom Keepers
          </TabsTrigger>
          <TabsTrigger
            value="contribute"
            className="data-[state=active]:bg-green-500/50"
          >
            <Plus className="w-4 h-4 mr-2" />
            Contribute
          </TabsTrigger>
        </TabsList>

        {/* Sacred Scrolls */}
        <TabsContent value="scrolls" className="space-y-4">
          <div className="grid lg:grid-cols-2 gap-6">
            {filteredScrolls.map((scroll) => (
              <motion.div
                key={scroll.id}
                whileHover={{ scale: 1.02 }}
                className="cursor-pointer"
                onClick={() => setSelectedScroll(scroll)}
              >
                <Card className="bg-black/40 border-white/20 backdrop-blur-md hover:border-white/40 transition-all h-full">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-cyan-400 text-lg mb-2">
                          {scroll.title}
                        </CardTitle>
                        <div className="flex items-center space-x-3 text-sm text-gray-400">
                          <span>
                            by{" "}
                            <span className="text-purple-400">
                              {scroll.author}
                            </span>
                          </span>
                          <span>•</span>
                          <span>{scroll.authorRole}</span>
                        </div>
                      </div>
                      <div className="flex flex-col space-y-2">
                        <Badge
                          className={getDifficultyColor(scroll.difficulty)}
                        >
                          {scroll.difficulty}
                        </Badge>
                        <Badge className={getTypeColor(scroll.type)}>
                          {scroll.type}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-gray-300 text-sm">
                      {scroll.description}
                    </p>

                    <div className="flex items-center space-x-4 text-sm">
                      <span className="flex items-center text-gray-400">
                        {getCategoryIcon(scroll.category)}
                        <span className="ml-1 capitalize">
                          {scroll.category}
                        </span>
                      </span>
                      <span className="flex items-center text-gray-400">
                        <Clock className="w-3 h-3 mr-1" />
                        {scroll.readTime}m read
                      </span>
                      <Badge className="bg-yellow-500/20 text-yellow-400">
                        <Sparkles className="w-3 h-3 mr-1" />
                        {scroll.flourishValue}
                      </Badge>
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {scroll.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {scroll.tags.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{scroll.tags.length - 3}
                        </Badge>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-white/10">
                      <div className="flex items-center space-x-4 text-sm">
                        <span className="flex items-center text-green-400">
                          <Download className="w-3 h-3 mr-1" />
                          {scroll.downloads}
                        </span>
                        <span className="flex items-center text-red-400">
                          <Heart className="w-3 h-3 mr-1" />
                          {scroll.blessings}
                        </span>
                      </div>
                      <span className="text-xs text-gray-400">
                        {timeAgo(scroll.lastUpdated)}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        {/* Wisdom Keepers */}
        <TabsContent value="keepers" className="space-y-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {WISDOM_KEEPERS.map((keeper) => (
              <Card
                key={keeper.id}
                className="bg-black/40 border-white/20 backdrop-blur-md hover:border-white/40 transition-all"
              >
                <CardContent className="p-6">
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-cyan-400 to-purple-400 flex items-center justify-center text-2xl">
                      {keeper.avatar}
                    </div>

                    <div>
                      <h3 className="font-bold text-white">{keeper.name}</h3>
                      <p className="text-cyan-400 text-sm">{keeper.role}</p>
                    </div>

                    <p className="text-gray-300 text-sm">{keeper.bio}</p>

                    <div className="space-y-3">
                      <div className="flex items-center justify-center space-x-4 text-sm">
                        <span className="flex items-center">
                          <BookOpen className="w-3 h-3 mr-1 text-green-400" />
                          {keeper.scrollsContributed}
                        </span>
                        <span className="flex items-center">
                          <Star className="w-3 h-3 mr-1 text-yellow-400" />
                          {keeper.wisdomRating}
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-1 justify-center">
                        {keeper.specializations.slice(0, 2).map((spec) => (
                          <Badge
                            key={spec}
                            variant="outline"
                            className="text-xs"
                          >
                            {spec}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <Button
                      size="sm"
                      className="w-full bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600"
                    >
                      View Wisdom
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Contribute */}
        <TabsContent value="contribute" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-green-400/20 backdrop-blur-md">
              <CardHeader>
                <CardTitle className="text-green-400">
                  Share Your Wisdom
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-300">
                  Every piece of wisdom shared strengthens the collective
                  intelligence. Your insights could be exactly what someone
                  needs for their journey.
                </p>

                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Sparkles className="w-4 h-4 text-green-400" />
                    <span className="text-sm">
                      Write ritual guides and ceremonies
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <BookOpen className="w-4 h-4 text-green-400" />
                    <span className="text-sm">
                      Document research and insights
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Heart className="w-4 h-4 text-green-400" />
                    <span className="text-sm">
                      Share stories and experiences
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Zap className="w-4 h-4 text-green-400" />
                    <span className="text-sm">
                      Create technology blueprints
                    </span>
                  </div>
                </div>

                <Button className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600">
                  <Plus className="w-4 h-4 mr-2" />
                  Contribute Wisdom
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 border-amber-400/20 backdrop-blur-md">
              <CardHeader>
                <CardTitle className="text-amber-400 flex items-center">
                  🛠️ Professional Wisdom Creation
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-300">
                  Need custom wisdom scrolls, ritual designs, or knowledge
                  documentation for your organization?
                </p>

                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Crown className="w-4 h-4 text-amber-400" />
                    <span className="text-sm">Custom ritual design</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <BookOpen className="w-4 h-4 text-amber-400" />
                    <span className="text-sm">Knowledge documentation</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Globe className="w-4 h-4 text-amber-400" />
                    <span className="text-sm">
                      Organizational wisdom systems
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span className="text-sm">
                      Sacred technology integration
                    </span>
                  </div>
                </div>

                <Button
                  onClick={() => navigate("/ritual-technologist")}
                  className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
                >
                  <ArrowRight className="w-4 h-4 mr-2" />
                  Explore Services
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Scroll Detail Modal */}
      <AnimatePresence>
        {selectedScroll && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6"
            onClick={() => setSelectedScroll(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-black/90 border border-white/20 rounded-lg p-6 max-w-3xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="space-y-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-cyan-400 mb-2">
                      {selectedScroll.title}
                    </h2>
                    <p className="text-purple-400">
                      by {selectedScroll.author} • {selectedScroll.authorRole}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <Badge
                      className={getDifficultyColor(selectedScroll.difficulty)}
                    >
                      {selectedScroll.difficulty}
                    </Badge>
                    <Badge className={getTypeColor(selectedScroll.type)}>
                      {selectedScroll.type}
                    </Badge>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-white mb-2">Details</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span>{selectedScroll.readTime} minute read</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        {getCategoryIcon(selectedScroll.category)}
                        <span className="capitalize">
                          {selectedScroll.category}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Sparkles className="w-4 h-4 text-yellow-400" />
                        <span>
                          {selectedScroll.flourishValue} Flourish value
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Download className="w-4 h-4 text-green-400" />
                        <span>{selectedScroll.downloads} downloads</span>
                      </div>
                    </div>
                  </div>

                  {selectedScroll.prerequisites && (
                    <div>
                      <h3 className="font-semibold text-white mb-2">
                        Prerequisites
                      </h3>
                      <div className="space-y-1">
                        {selectedScroll.prerequisites.map((prereq, index) => (
                          <div
                            key={index}
                            className="flex items-center space-x-2 text-sm"
                          >
                            <Eye className="w-3 h-3 text-cyan-400" />
                            <span>{prereq}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <h3 className="font-semibold text-green-400 mb-2">
                    Description
                  </h3>
                  <p className="text-gray-300">{selectedScroll.description}</p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-300 mb-2">
                    Content Preview
                  </h3>
                  <p className="text-gray-300">
                    {selectedScroll.content.substring(0, 200)}...
                  </p>
                </div>

                {selectedScroll.embodimentPractices.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-purple-400 mb-2">
                      Embodiment Practices
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {selectedScroll.embodimentPractices.map(
                        (practice, index) => (
                          <div
                            key={index}
                            className="flex items-center space-x-2 text-sm"
                          >
                            <Sparkles className="w-3 h-3 text-purple-400" />
                            <span>{practice}</span>
                          </div>
                        ),
                      )}
                    </div>
                  </div>
                )}

                <div className="flex flex-wrap gap-2">
                  {selectedScroll.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex space-x-4">
                  <Button className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600">
                    <Download className="w-4 h-4 mr-2" />
                    Access Full Scroll
                  </Button>
                  <Button
                    variant="outline"
                    className="border-red-400 text-red-400 hover:bg-red-400/20"
                  >
                    <Heart className="w-4 h-4 mr-2" />
                    Bless ({selectedScroll.blessings})
                  </Button>
                  <Button
                    variant="outline"
                    className="border-cyan-400 text-cyan-400 hover:bg-cyan-400/20"
                  >
                    <Share className="w-4 h-4 mr-2" />
                    Share
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

export default WisdomLibrary;
