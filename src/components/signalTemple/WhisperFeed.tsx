import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Waves,
  Bell,
  Heart,
  Archive,
  Share,
  Eye,
  EyeOff,
  Scroll,
  Zap,
  Star,
  Clock,
  User,
  MapPin,
  Tag,
  ChevronDown,
  ChevronUp,
  Filter,
  RefreshCw,
  Trash2,
} from "lucide-react";
import { WhisperFeedItem, SemanticTag } from "@/types/signalTemple";
import signalTemple from "@/services/signalTemple";

interface WhisperFeedProps {
  userId: string;
  maxItems?: number;
  variant?: "full" | "compact" | "minimal";
  onItemClick?: (item: WhisperFeedItem) => void;
  className?: string;
}

const WhisperFeed: React.FC<WhisperFeedProps> = ({
  userId,
  maxItems = 20,
  variant = "full",
  onItemClick,
  className = "",
}) => {
  const [items, setItems] = useState<WhisperFeedItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const [filterTag, setFilterTag] = useState<SemanticTag | "all">("all");
  const [showOnlyUnread, setShowOnlyUnread] = useState(false);
  const [lastRefresh, setLastRefresh] = useState(new Date());

  useEffect(() => {
    loadWhisperFeed();

    // Set up auto-refresh
    const interval = setInterval(loadWhisperFeed, 30000); // Every 30 seconds
    return () => clearInterval(interval);
  }, [userId]);

  const loadWhisperFeed = async () => {
    setIsLoading(true);
    try {
      const feed = await signalTemple.getWhisperFeed(userId, maxItems);
      setItems(feed);
      setLastRefresh(new Date());
    } catch (error) {
      console.error("Failed to load whisper feed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const markAsRead = async (itemId: string) => {
    try {
      await signalTemple.markWhisperAsRead(userId, itemId);
      setItems((prev) =>
        prev.map((item) =>
          item.id === itemId ? { ...item, isRead: true } : item,
        ),
      );
    } catch (error) {
      console.error("Failed to mark as read:", error);
    }
  };

  const archiveItem = async (itemId: string) => {
    try {
      await signalTemple.archiveWhisper(userId, itemId);
      setItems((prev) => prev.filter((item) => item.id !== itemId));
    } catch (error) {
      console.error("Failed to archive item:", error);
    }
  };

  const handleItemExpand = (itemId: string) => {
    setExpandedItem(expandedItem === itemId ? null : itemId);
    if (!items.find((item) => item.id === itemId)?.isRead) {
      markAsRead(itemId);
    }

    const item = items.find((item) => item.id === itemId);
    if (item && onItemClick) {
      onItemClick(item);
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "urgent_call":
        return "text-red-400 border-red-400 bg-red-500/20";
      case "echo":
        return "text-orange-400 border-orange-400 bg-orange-500/20";
      case "pulse":
        return "text-cyan-400 border-cyan-400 bg-cyan-500/20";
      default:
        return "text-green-400 border-green-400 bg-green-500/20";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "signal":
        return Bell;
      case "ritual_echo":
        return Scroll;
      case "flourish_blessing":
        return Star;
      case "cluster_pulse":
        return Zap;
      default:
        return Waves;
    }
  };

  const formatTimeAgo = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / 60000);

    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes}m ago`;
    if (minutes < 1440) return `${Math.floor(minutes / 60)}h ago`;
    return `${Math.floor(minutes / 1440)}d ago`;
  };

  const filteredItems = items.filter((item) => {
    const tagMatch =
      filterTag === "all" || item.semanticTags.includes(filterTag);
    const readMatch = !showOnlyUnread || !item.isRead;
    return tagMatch && readMatch;
  });

  const unreadCount = items.filter((item) => !item.isRead).length;
  const uniqueTags = Array.from(
    new Set(items.flatMap((item) => item.semanticTags)),
  );

  if (variant === "minimal") {
    return (
      <div className={`space-y-2 ${className}`}>
        {filteredItems.slice(0, 3).map((item) => {
          const IconComponent = getTypeIcon(item.type);
          return (
            <Card
              key={item.id}
              className="bg-black/30 border-purple-500/20 backdrop-blur-sm cursor-pointer hover:border-purple-500/40 transition-all"
              onClick={() => handleItemExpand(item.id)}
            >
              <CardContent className="p-3">
                <div className="flex items-start space-x-3">
                  <div
                    className={`p-1.5 rounded-full ${getUrgencyColor(item.urgencyLevel)}`}
                  >
                    <IconComponent className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4
                      className={`font-medium text-sm line-clamp-1 ${item.isRead ? "text-gray-400" : "text-white"}`}
                    >
                      {item.title}
                    </h4>
                    <p className="text-gray-500 text-xs line-clamp-1">
                      {item.preview}
                    </p>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-gray-500 text-xs">
                        {formatTimeAgo(item.receivedAt)}
                      </span>
                      {!item.isRead && (
                        <div className="w-2 h-2 rounded-full bg-cyan-400"></div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className={`space-y-4 ${className}`}>
        <Card className="bg-black/40 border-purple-500/30 backdrop-blur-md">
          <CardContent className="p-8 text-center">
            <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-purple-400">Loading Sacred Whispers...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Header */}
      <Card className="bg-gradient-to-r from-purple-900/60 to-cyan-900/60 border-purple-400/30 backdrop-blur-md">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Waves className="w-6 h-6 text-purple-400" />
              <div>
                <CardTitle className="text-purple-400">
                  Sacred Whisper Feed
                </CardTitle>
                <p className="text-gray-400 text-sm">
                  Personal messages from the collective consciousness
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              {unreadCount > 0 && (
                <Badge
                  variant="secondary"
                  className="bg-cyan-500/20 text-cyan-300"
                >
                  {unreadCount} unread
                </Badge>
              )}

              <Button
                variant="ghost"
                size="sm"
                onClick={loadWhisperFeed}
                className="text-purple-400 hover:bg-purple-500/20"
              >
                <RefreshCw className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-white/10">
            <Button
              variant={showOnlyUnread ? "default" : "outline"}
              size="sm"
              onClick={() => setShowOnlyUnread(!showOnlyUnread)}
              className={`${
                showOnlyUnread
                  ? "bg-cyan-500 text-white"
                  : "border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/20"
              }`}
            >
              <Eye className="w-3 h-3 mr-2" />
              Unread Only
            </Button>

            <select
              value={filterTag}
              onChange={(e) =>
                setFilterTag(e.target.value as SemanticTag | "all")
              }
              className="bg-black/40 border border-purple-500/30 rounded px-3 py-1 text-sm text-white"
            >
              <option value="all">All Themes</option>
              {uniqueTags.map((tag) => (
                <option key={tag} value={tag} className="capitalize">
                  {tag.replace(/_/g, " ")}
                </option>
              ))}
            </select>

            <span className="text-gray-400 text-xs ml-auto">
              Last updated: {formatTimeAgo(lastRefresh)}
            </span>
          </div>
        </CardHeader>
      </Card>

      {/* Whisper Items */}
      <div className="space-y-3 max-h-96 overflow-y-auto scrollbar-sacred">
        <AnimatePresence>
          {filteredItems.map((item, index) => {
            const IconComponent = getTypeIcon(item.type);
            const isExpanded = expandedItem === item.id;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card
                  className={`bg-black/40 backdrop-blur-md cursor-pointer transition-all ${
                    item.isRead
                      ? "border-gray-600/30 hover:border-gray-600/50"
                      : "border-purple-500/30 hover:border-purple-500/50"
                  } ${isExpanded ? "border-cyan-400/70" : ""}`}
                >
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      {/* Header */}
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3 flex-1">
                          <div
                            className={`p-2 rounded-lg ${getUrgencyColor(item.urgencyLevel)}`}
                          >
                            <IconComponent className="w-5 h-5" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2 mb-1">
                              <h4
                                className={`font-semibold leading-tight ${
                                  item.isRead ? "text-gray-400" : "text-white"
                                }`}
                              >
                                {item.title}
                              </h4>
                              {!item.isRead && (
                                <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></div>
                              )}
                            </div>

                            <div className="flex items-center space-x-3 text-xs text-gray-500 mb-2">
                              <span>{formatTimeAgo(item.receivedAt)}</span>
                              {item.metadata.authorRole && (
                                <span className="flex items-center">
                                  <User className="w-3 h-3 mr-1" />
                                  {item.metadata.authorRole.replace(/_/g, " ")}
                                </span>
                              )}
                              {item.metadata.bioregion && (
                                <span className="flex items-center">
                                  <MapPin className="w-3 h-3 mr-1" />
                                  {item.metadata.bioregion}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Badge
                            variant="outline"
                            className={`text-xs ${getUrgencyColor(item.urgencyLevel)}`}
                          >
                            {item.urgencyLevel.replace(/_/g, " ")}
                          </Badge>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleItemExpand(item.id);
                            }}
                            className="text-gray-400 hover:text-white"
                          >
                            {isExpanded ? (
                              <ChevronUp className="w-4 h-4" />
                            ) : (
                              <ChevronDown className="w-4 h-4" />
                            )}
                          </Button>
                        </div>
                      </div>

                      {/* Preview */}
                      <p
                        className={`leading-relaxed ${
                          isExpanded ? "" : "line-clamp-2"
                        } ${item.isRead ? "text-gray-400" : "text-gray-300"}`}
                      >
                        {isExpanded
                          ? item.fullContent || item.preview
                          : item.preview}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2">
                        {item.semanticTags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="outline"
                            className="text-xs border-cyan-500/30 text-cyan-300"
                          >
                            <Tag className="w-3 h-3 mr-1" />
                            {tag.replace(/_/g, " ")}
                          </Badge>
                        ))}
                      </div>

                      {/* Actions */}
                      {(isExpanded || variant === "full") && item.actions && (
                        <div className="flex items-center justify-between pt-3 border-t border-white/10">
                          <div className="flex items-center space-x-2">
                            {item.actions.canEcho && (
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-purple-400 hover:bg-purple-500/20 h-8 px-3"
                              >
                                <Heart className="w-3 h-3 mr-1" />
                                Echo
                              </Button>
                            )}
                            {item.actions.canShare && (
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-cyan-400 hover:bg-cyan-500/20 h-8 px-3"
                              >
                                <Share className="w-3 h-3 mr-1" />
                                Share
                              </Button>
                            )}
                          </div>

                          <div className="flex items-center space-x-2">
                            {item.actions.canArchive && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  archiveItem(item.id);
                                }}
                                className="text-gray-400 hover:bg-gray-500/20 h-8 px-3"
                              >
                                <Archive className="w-3 h-3" />
                              </Button>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Empty State */}
      {filteredItems.length === 0 && (
        <Card className="bg-black/20 border-gray-600/30 backdrop-blur-sm">
          <CardContent className="p-8 text-center">
            <Waves className="w-12 h-12 mx-auto mb-4 text-gray-500" />
            <h3 className="text-white font-semibold mb-2">Sacred Silence</h3>
            <p className="text-gray-400 mb-4">
              {showOnlyUnread
                ? "All whispers have been received and acknowledged"
                : "No whispers match your current filters"}
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setFilterTag("all");
                setShowOnlyUnread(false);
              }}
              className="border-purple-500/30 text-purple-400 hover:bg-purple-500/20"
            >
              Clear Filters
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default WhisperFeed;
