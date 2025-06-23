// CIVICA 144 CulturalArchive Component
// Digital preservation of community stories, traditions, and wisdom

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Crown,
  BookOpen,
  Archive,
  Search,
  Star,
  Clock,
  Users,
  Heart,
  Memory,
  Scroll,
  Music,
  Image,
} from "lucide-react";
import {
  CommunityMember,
  CivicScroll,
  CommunityStory,
} from "@/types/scrollSignal";

interface CulturalArchiveProps {
  culturalArchive: CommunityStory[];
  communityMembers: CommunityMember[];
  scrollHistory: CivicScroll[];
}

export const CulturalArchive: React.FC<CulturalArchiveProps> = ({
  culturalArchive,
  communityMembers,
  scrollHistory,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedStory, setSelectedStory] = useState<CommunityStory | null>(
    null,
  );

  // Mock cultural archive data since the prop might be empty
  const mockCulturalData: CommunityStory[] = [
    {
      title: "The Sacred Well of Wisdom",
      type: "origin",
      teller: communityMembers[0] || {
        id: "elder_keeper",
        name: "Elder Keeper",
        role: "elder",
        village: "Sacred Community",
        languages: ["en"],
        wisdom: 95,
        contributions: 500,
      },
      audience: ["child", "community_member"],
      moral:
        "Shared knowledge flows like sacred water, nourishing all who approach with respect",
      symbols: ["💧", "🧠", "🌟", "🤝"],
      versions: [
        {
          variant: "Children's Teaching",
          context: "educational",
          modifications: ["simplified_language", "interactive_gestures"],
          appropriateness: ["age_5_to_12", "learning_circles"],
        },
        {
          variant: "Ceremonial Version",
          context: "ritual",
          modifications: ["formal_language", "ancestral_invocations"],
          appropriateness: ["community_ceremonies", "wisdom_passing"],
        },
      ],
    },
    {
      title: "The Digital Drums of Connection",
      type: "teaching",
      teller: communityMembers[1] || {
        id: "story_keeper",
        name: "Story Keeper",
        role: "teacher",
        village: "Sacred Community",
        languages: ["en"],
        wisdom: 88,
        contributions: 200,
      },
      audience: ["community_member", "teacher"],
      moral: "Technology serves community when guided by sacred intention",
      symbols: ["🥁", "📡", "❤️", "🌐"],
      versions: [
        {
          variant: "Modern Adaptation",
          context: "contemporary",
          modifications: ["technology_integration", "urban_references"],
          appropriateness: ["digital_literacy", "community_workshops"],
        },
      ],
    },
    {
      title: "The Ancestors' Network",
      type: "healing",
      teller: communityMembers[0] || {
        id: "elder_keeper",
        name: "Elder Keeper",
        role: "elder",
        village: "Sacred Community",
        languages: ["en"],
        wisdom: 95,
        contributions: 500,
      },
      audience: ["healer", "elder"],
      moral:
        "Ancient wisdom flows through fiber optic streams to guide healing",
      symbols: ["👵", "🕸️", "🌿", "✨"],
      versions: [
        {
          variant: "Healing Circle Version",
          context: "therapeutic",
          modifications: ["healing_focus", "meditation_elements"],
          appropriateness: ["healing_ceremonies", "trauma_support"],
        },
      ],
    },
  ];

  const archiveData =
    culturalArchive.length > 0 ? culturalArchive : mockCulturalData;

  const categories = [
    { id: "all", label: "All Stories", icon: Archive },
    { id: "origin", label: "Origin Stories", icon: Star },
    { id: "teaching", label: "Teaching Tales", icon: BookOpen },
    { id: "healing", label: "Healing Stories", icon: Heart },
    { id: "celebration", label: "Celebrations", icon: Music },
    { id: "warning", label: "Wisdom Warnings", icon: Crown },
  ];

  const filteredStories = archiveData.filter((story) => {
    const matchesSearch =
      story.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      story.moral.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || story.type === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getStoryTypeColor = (type: string) => {
    const colors = {
      origin: "text-purple-400 border-purple-400 bg-purple-400/10",
      teaching: "text-blue-400 border-blue-400 bg-blue-400/10",
      healing: "text-green-400 border-green-400 bg-green-400/10",
      celebration: "text-yellow-400 border-yellow-400 bg-yellow-400/10",
      warning: "text-red-400 border-red-400 bg-red-400/10",
    };
    return colors[type as keyof typeof colors] || colors.teaching;
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "elder":
        return "👵";
      case "healer":
        return "👨‍⚕️";
      case "teacher":
        return "👩‍🏫";
      case "farmer":
        return "👨‍🌾";
      case "guardian":
        return "👩‍💼";
      default:
        return "👤";
    }
  };

  return (
    <div className="space-y-6">
      {/* Archive Header & Search */}
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardHeader>
          <CardTitle className="flex items-center justify-between text-indigo-400">
            <div className="flex items-center">
              <Archive className="w-5 h-5 mr-2" />
              Sacred Cultural Archive
            </div>
            <Badge
              variant="outline"
              className="border-indigo-400 text-indigo-400 bg-indigo-400/10"
            >
              {archiveData.length} Stories
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search stories, morals, or wisdom..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white/5 border-white/20 text-white placeholder-gray-400"
            />
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <Button
                  key={category.id}
                  variant={
                    selectedCategory === category.id ? "default" : "outline"
                  }
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                  className={`${
                    selectedCategory === category.id
                      ? "bg-indigo-500 hover:bg-indigo-600"
                      : "border-white/20 text-gray-300 hover:bg-white/10"
                  }`}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {category.label}
                </Button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Stories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredStories.map((story, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            onClick={() => setSelectedStory(story)}
            className="cursor-pointer"
          >
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all h-full">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <Badge
                    variant="outline"
                    className={getStoryTypeColor(story.type)}
                  >
                    {story.type.toUpperCase()}
                  </Badge>
                  <div className="flex space-x-1">
                    {story.symbols.slice(0, 3).map((symbol, i) => (
                      <span key={i} className="text-lg">
                        {symbol}
                      </span>
                    ))}
                  </div>
                </div>

                <h3 className="font-semibold text-white mb-2 line-clamp-2">
                  {story.title}
                </h3>

                <p className="text-sm text-gray-300 mb-4 line-clamp-3">
                  {story.moral}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">
                      {getRoleIcon(story.teller.role)}
                    </span>
                    <div>
                      <div className="text-xs font-medium text-white">
                        {story.teller.name}
                      </div>
                      <div className="text-xs text-gray-400 capitalize">
                        {story.teller.role}
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-xs text-purple-400">
                      {story.versions.length} versions
                    </div>
                    <div className="text-xs text-gray-400">
                      For {story.audience.join(", ")}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Story Detail Modal */}
      <AnimatePresence>
        {selectedStory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedStory(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-2xl w-full max-h-[80vh] overflow-y-auto"
            >
              <Card className="bg-gray-900/95 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between text-white">
                    <div className="flex items-center">
                      <Scroll className="w-5 h-5 mr-2 text-indigo-400" />
                      {selectedStory.title}
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedStory(null)}
                      className="text-gray-400 hover:text-white"
                    >
                      ✕
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Story Header */}
                  <div className="flex items-center justify-between">
                    <Badge
                      variant="outline"
                      className={getStoryTypeColor(selectedStory.type)}
                    >
                      {selectedStory.type.toUpperCase()}
                    </Badge>
                    <div className="flex space-x-1">
                      {selectedStory.symbols.map((symbol, i) => (
                        <span key={i} className="text-2xl">
                          {symbol}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Storyteller Info */}
                  <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                    <div className="flex items-center space-x-3">
                      <span className="text-3xl">
                        {getRoleIcon(selectedStory.teller.role)}
                      </span>
                      <div>
                        <div className="font-medium text-white">
                          {selectedStory.teller.name}
                        </div>
                        <div className="text-sm text-gray-400 capitalize">
                          {selectedStory.teller.role}
                        </div>
                        <div className="text-sm text-purple-400">
                          Wisdom: {selectedStory.teller.wisdom} • Contributions:{" "}
                          {selectedStory.teller.contributions}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Story Moral */}
                  <div className="bg-indigo-500/10 rounded-lg p-4 border border-indigo-500/20">
                    <div className="text-sm font-medium text-indigo-400 mb-2">
                      Sacred Teaching
                    </div>
                    <p className="text-white font-medium italic">
                      "{selectedStory.moral}"
                    </p>
                  </div>

                  {/* Audience */}
                  <div className="space-y-2">
                    <div className="text-sm font-medium text-gray-300">
                      Intended Audience
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {selectedStory.audience.map((role, i) => (
                        <Badge
                          key={i}
                          variant="outline"
                          className="border-purple-400 text-purple-400"
                        >
                          {role.replace("_", " ").toUpperCase()}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Story Versions */}
                  <div className="space-y-3">
                    <div className="text-sm font-medium text-gray-300">
                      Story Versions
                    </div>
                    {selectedStory.versions.map((version, i) => (
                      <div
                        key={i}
                        className="bg-white/5 rounded-lg p-3 border border-white/10"
                      >
                        <div className="font-medium text-white mb-2">
                          {version.variant}
                        </div>
                        <div className="text-sm text-gray-300 mb-2">
                          Context: {version.context}
                        </div>
                        <div className="text-xs text-gray-400">
                          <div>
                            Modifications: {version.modifications.join(", ")}
                          </div>
                          <div>
                            Appropriate for:{" "}
                            {version.appropriateness.join(", ")}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Cultural Preservation Notes */}
                  <div className="bg-yellow-500/10 rounded-lg p-4 border border-yellow-500/20">
                    <div className="flex items-center space-x-2 mb-2">
                      <Memory className="w-4 h-4 text-yellow-400" />
                      <span className="text-sm font-medium text-yellow-400">
                        Cultural Preservation
                      </span>
                    </div>
                    <p className="text-sm text-yellow-200">
                      This story is preserved according to sacred protocols and
                      community permissions. Each telling honors the original
                      wisdom while adapting to contemporary understanding.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Archive Statistics */}
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardHeader>
          <CardTitle className="flex items-center text-green-400">
            <Users className="w-5 h-5 mr-2" />
            Archive Statistics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">
                {archiveData.length}
              </div>
              <div className="text-xs text-gray-400">Total Stories</div>
            </div>

            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">
                {new Set(archiveData.map((s) => s.teller.id)).size}
              </div>
              <div className="text-xs text-gray-400">Storytellers</div>
            </div>

            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">
                {archiveData.reduce((acc, s) => acc + s.versions.length, 0)}
              </div>
              <div className="text-xs text-gray-400">Story Versions</div>
            </div>

            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">
                {scrollHistory.filter((s) => s.type === "cultural").length}
              </div>
              <div className="text-xs text-gray-400">Cultural Scrolls</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CulturalArchive;
