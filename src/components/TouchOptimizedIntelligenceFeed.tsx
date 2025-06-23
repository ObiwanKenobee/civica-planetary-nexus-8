import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Brain,
  Zap,
  Globe,
  Users,
  Star,
  Eye,
  Heart,
  Clock,
  ChevronUp,
  ChevronDown,
  RefreshCw,
  Filter,
  Share,
  BookOpen,
  ExternalLink,
  Play,
  Pause,
  MoreVertical,
} from "lucide-react";
import { blogIntelligence } from "@/services/blogIntelligence";

interface IntelligenceItem {
  id: string;
  type: "insight" | "update" | "breakthrough" | "alert";
  title: string;
  content: string;
  source: string;
  timestamp: Date;
  urgency: "low" | "medium" | "high" | "critical";
  tags: string[];
  engagement: {
    views: number;
    likes: number;
    shares: number;
  };
  category: string;
}

interface TouchOptimizedIntelligenceFeedProps {
  maxItems?: number;
  autoRefresh?: boolean;
  showEngagement?: boolean;
  variant?: "minimal" | "full" | "compact";
  className?: string;
}

const TouchOptimizedIntelligenceFeed: React.FC<
  TouchOptimizedIntelligenceFeedProps
> = ({
  maxItems = 10,
  autoRefresh = true,
  showEngagement = true,
  variant = "full",
  className = "",
}) => {
  const [items, setItems] = useState<IntelligenceItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [isAutoPlaying, setIsAutoPlaying] = useState(autoRefresh);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const [lastRefresh, setLastRefresh] = useState(new Date());

  const scrollRef = useRef<HTMLDivElement>(null);
  const pullToRefreshRef = useRef<HTMLDivElement>(null);
  const [pullDistance, setPullDistance] = useState(0);
  const [isPulling, setIsPulling] = useState(false);

  // Generate mock intelligence data
  const generateIntelligenceItems = useCallback((): IntelligenceItem[] => {
    const types: Array<IntelligenceItem["type"]> = [
      "insight",
      "update",
      "breakthrough",
      "alert",
    ];
    const urgencies: Array<IntelligenceItem["urgency"]> = [
      "low",
      "medium",
      "high",
      "critical",
    ];
    const categories = [
      "technology",
      "consciousness",
      "ecology",
      "governance",
      "research",
    ];

    const templates = [
      {
        title: "Quantum coherence patterns detected in distributed systems",
        content:
          "New research reveals how quantum entanglement principles can optimize distributed computing architectures for consciousness-responsive applications.",
        source: "Quantum Consciousness Lab",
      },
      {
        title: "Bioregional AI achieves 97% cultural sensitivity accuracy",
        content:
          "Latest deployment of place-based AI systems shows unprecedented alignment with local cultural wisdom and ecological patterns.",
        source: "Bioregional Intelligence Network",
      },
      {
        title: "Sacred geometry integration improves user engagement by 340%",
        content:
          "Implementation of sacred geometric patterns in user interface design leads to dramatic improvements in user satisfaction and system harmony.",
        source: "Sacred Design Institute",
      },
      {
        title:
          "Collective intelligence protocols prevent major system failures",
        content:
          "Advanced collective decision-making algorithms successfully predict and prevent critical infrastructure failures before they occur.",
        source: "Collective Wisdom Council",
      },
      {
        title:
          "Regenerative technology deployment exceeds carbon negative goals",
        content:
          "New regenerative computing systems not only achieve carbon neutrality but actively sequester carbon while processing data.",
        source: "Regenerative Tech Alliance",
      },
    ];

    return Array.from({ length: maxItems }, (_, index) => {
      const template = templates[index % templates.length];
      return {
        id: `item-${Date.now()}-${index}`,
        type: types[Math.floor(Math.random() * types.length)],
        title: template.title,
        content: template.content,
        source: template.source,
        timestamp: new Date(Date.now() - Math.random() * 86400000 * 7), // Last 7 days
        urgency: urgencies[Math.floor(Math.random() * urgencies.length)],
        tags: categories.slice(0, Math.floor(Math.random() * 3) + 1),
        engagement: {
          views: Math.floor(Math.random() * 1000) + 50,
          likes: Math.floor(Math.random() * 100) + 5,
          shares: Math.floor(Math.random() * 50) + 1,
        },
        category: categories[Math.floor(Math.random() * categories.length)],
      };
    });
  }, [maxItems]);

  // Load intelligence items
  useEffect(() => {
    const loadItems = async () => {
      setIsLoading(true);
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const newItems = generateIntelligenceItems();
        setItems(newItems);
        setLastRefresh(new Date());
      } catch (error) {
        console.error("Failed to load intelligence items:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadItems();
  }, [generateIntelligenceItems]);

  // Auto-refresh functionality
  useEffect(() => {
    if (isAutoPlaying) {
      const interval = setInterval(() => {
        const newItems = generateIntelligenceItems();
        setItems(newItems);
        setLastRefresh(new Date());
      }, 30000); // Refresh every 30 seconds

      return () => clearInterval(interval);
    }
  }, [isAutoPlaying, generateIntelligenceItems]);

  // Pull-to-refresh handling
  const handlePan = (event: any, info: PanInfo) => {
    if (info.offset.y > 0 && scrollRef.current?.scrollTop === 0) {
      setIsPulling(true);
      setPullDistance(Math.min(info.offset.y, 100));
    }
  };

  const handlePanEnd = (event: any, info: PanInfo) => {
    if (isPulling && pullDistance > 60) {
      // Trigger refresh
      const newItems = generateIntelligenceItems();
      setItems(newItems);
      setLastRefresh(new Date());
    }
    setIsPulling(false);
    setPullDistance(0);
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "critical":
        return "text-red-400 bg-red-500/20 border-red-500";
      case "high":
        return "text-orange-400 bg-orange-500/20 border-orange-500";
      case "medium":
        return "text-yellow-400 bg-yellow-500/20 border-yellow-500";
      default:
        return "text-green-400 bg-green-500/20 border-green-500";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "insight":
        return <Brain className="w-4 h-4" />;
      case "breakthrough":
        return <Zap className="w-4 h-4" />;
      case "alert":
        return <Star className="w-4 h-4" />;
      default:
        return <Globe className="w-4 h-4" />;
    }
  };

  const filteredItems =
    selectedFilter === "all"
      ? items
      : items.filter(
          (item) =>
            item.category === selectedFilter || item.type === selectedFilter,
        );

  const formatTimeAgo = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / 60000);

    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes}m ago`;
    if (minutes < 1440) return `${Math.floor(minutes / 60)}h ago`;
    return `${Math.floor(minutes / 1440)}d ago`;
  };

  if (variant === "minimal") {
    return (
      <div className={`space-y-3 ${className}`}>
        {filteredItems.slice(0, 3).map((item) => (
          <Card
            key={item.id}
            className="bg-black/30 border-purple-500/20 backdrop-blur-sm"
          >
            <CardContent className="p-4">
              <div className="flex items-start space-x-3">
                <div
                  className={`p-1.5 rounded-full ${getUrgencyColor(item.urgency)}`}
                >
                  {getTypeIcon(item.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-white font-medium text-sm line-clamp-2">
                    {item.title}
                  </h4>
                  <p className="text-gray-400 text-xs mt-1">
                    {formatTimeAgo(item.timestamp)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <Brain className="w-6 h-6 text-purple-400" />
          <div>
            <h3 className="text-xl font-bold text-white">Intelligence Feed</h3>
            <p className="text-gray-400 text-sm">
              Last updated: {formatTimeAgo(lastRefresh)}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className="text-purple-400 hover:bg-purple-500/20"
          >
            {isAutoPlaying ? (
              <Pause className="w-4 h-4" />
            ) : (
              <Play className="w-4 h-4" />
            )}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              const newItems = generateIntelligenceItems();
              setItems(newItems);
              setLastRefresh(new Date());
            }}
            className="text-purple-400 hover:bg-purple-500/20"
          >
            <RefreshCw className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Filter Pills - Touch Optimized */}
      <div className="flex space-x-2 mb-4 overflow-x-auto pb-2">
        {[
          "all",
          "insight",
          "breakthrough",
          "alert",
          "technology",
          "consciousness",
        ].map((filter) => (
          <Button
            key={filter}
            variant={selectedFilter === filter ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedFilter(filter)}
            className={`whitespace-nowrap min-w-fit px-4 py-2 ${
              selectedFilter === filter
                ? "bg-purple-500 text-white"
                : "border-purple-500/30 text-purple-300 hover:bg-purple-500/20"
            }`}
          >
            {filter.charAt(0).toUpperCase() + filter.slice(1)}
          </Button>
        ))}
      </div>

      {/* Pull-to-Refresh Indicator */}
      <AnimatePresence>
        {isPulling && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-0 left-1/2 transform -translate-x-1/2 z-10"
          >
            <div className="bg-purple-500/20 border border-purple-500/30 rounded-full p-2 backdrop-blur-sm">
              <RefreshCw
                className={`w-4 h-4 text-purple-400 ${pullDistance > 60 ? "animate-spin" : ""}`}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Feed */}
      <motion.div
        ref={scrollRef}
        className="max-h-96 overflow-y-auto space-y-3 touch-pan-y"
        onPan={handlePan}
        onPanEnd={handlePanEnd}
        style={{ transform: `translateY(${pullDistance * 0.5}px)` }}
      >
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <AnimatePresence>
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card
                  className={`bg-black/40 border-purple-500/30 backdrop-blur-md cursor-pointer transition-all hover:border-purple-500/50 ${
                    expandedItem === item.id ? "border-purple-400" : ""
                  }`}
                >
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      {/* Header */}
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3 flex-1">
                          <div
                            className={`p-2 rounded-lg ${getUrgencyColor(item.urgency)}`}
                          >
                            {getTypeIcon(item.type)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-white font-semibold leading-tight">
                              {item.title}
                            </h4>
                            <div className="flex items-center space-x-3 mt-1">
                              <span className="text-gray-400 text-sm">
                                {item.source}
                              </span>
                              <span className="text-gray-500 text-xs">
                                {formatTimeAgo(item.timestamp)}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Badge
                            variant="outline"
                            className={`${getUrgencyColor(item.urgency)} border text-xs`}
                          >
                            {item.urgency}
                          </Badge>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              setExpandedItem(
                                expandedItem === item.id ? null : item.id,
                              )
                            }
                            className="text-gray-400 hover:text-white"
                          >
                            {expandedItem === item.id ? (
                              <ChevronUp className="w-4 h-4" />
                            ) : (
                              <ChevronDown className="w-4 h-4" />
                            )}
                          </Button>
                        </div>
                      </div>

                      {/* Content Preview */}
                      <p
                        className={`text-gray-300 leading-relaxed ${
                          expandedItem === item.id ? "" : "line-clamp-2"
                        }`}
                      >
                        {item.content}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2">
                        {item.tags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="outline"
                            className="text-xs border-cyan-500/30 text-cyan-300"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      {/* Engagement & Actions */}
                      {showEngagement && (
                        <div className="flex items-center justify-between pt-2 border-t border-white/10">
                          <div className="flex items-center space-x-4 text-sm text-gray-400">
                            <div className="flex items-center space-x-1">
                              <Eye className="w-4 h-4" />
                              <span>{item.engagement.views}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Heart className="w-4 h-4" />
                              <span>{item.engagement.likes}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Share className="w-4 h-4" />
                              <span>{item.engagement.shares}</span>
                            </div>
                          </div>

                          <div className="flex items-center space-x-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-purple-400 hover:bg-purple-500/20 h-8 px-3"
                            >
                              <BookOpen className="w-3 h-3 mr-1" />
                              Read
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-purple-400 hover:bg-purple-500/20 h-8 px-3"
                            >
                              <Share className="w-3 h-3 mr-1" />
                              Share
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </motion.div>

      {/* Load More */}
      {filteredItems.length >= maxItems && (
        <div className="text-center mt-4">
          <Button
            variant="outline"
            className="border-purple-500 text-purple-400 hover:bg-purple-500/20"
            onClick={() => {
              const newItems = generateIntelligenceItems();
              setItems([...items, ...newItems]);
            }}
          >
            Load More Insights
            <ChevronDown className="w-4 h-4 ml-2" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default TouchOptimizedIntelligenceFeed;
