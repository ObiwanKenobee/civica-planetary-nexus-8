// Intelligent Blog Slider - Dynamic content from intelligence layer
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  Eye,
  Heart,
  Sparkles,
  Brain,
  Zap,
  ExternalLink,
  BookOpen,
  TrendingUp,
  Users,
  Globe,
  Star,
  ArrowRight,
} from "lucide-react";
import {
  blogIntelligence,
  intelligenceFeedManager,
} from "@/services/blogIntelligence";
import { BlogPost } from "@/types/ritualTech";

interface IntelligentBlogSliderProps {
  maxPosts?: number;
  autoAdvance?: boolean;
  showIntelligenceInsights?: boolean;
  category?: string;
  className?: string;
}

const IntelligentBlogSlider: React.FC<IntelligentBlogSliderProps> = ({
  maxPosts = 6,
  autoAdvance = true,
  showIntelligenceInsights = true,
  category,
  className = "",
}) => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [insights, setInsights] = useState<any[]>([]);
  const [isPlaying, setIsPlaying] = useState(autoAdvance);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Load blog posts from intelligence layer
  useEffect(() => {
    const loadPosts = async () => {
      setIsLoading(true);
      try {
        const fetchedPosts = await blogIntelligence.fetchLatestPosts();
        const filteredPosts = category
          ? fetchedPosts.filter((post) => post.category === category)
          : fetchedPosts;

        setPosts(filteredPosts.slice(0, maxPosts));

        if (showIntelligenceInsights) {
          const fetchedInsights = blogIntelligence.generateInsights();
          setInsights(fetchedInsights);
        }
      } catch (error) {
        console.error("Failed to load blog posts:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadPosts();

    // Subscribe to intelligence feed updates
    intelligenceFeedManager.subscribe(
      "blog_updates",
      (newPosts: BlogPost[]) => {
        setPosts((prev) => [...newPosts, ...prev].slice(0, maxPosts));
      },
    );
  }, [maxPosts, category, showIntelligenceInsights]);

  // Auto-advance logic
  useEffect(() => {
    if (isPlaying && posts.length > 1) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % posts.length);
      }, 5000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, posts.length]);

  const nextPost = () => {
    setCurrentIndex((prev) => (prev + 1) % posts.length);
  };

  const prevPost = () => {
    setCurrentIndex((prev) => (prev - 1 + posts.length) % posts.length);
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "critical":
        return "bg-red-500";
      case "high":
        return "bg-orange-500";
      case "medium":
        return "bg-yellow-500";
      default:
        return "bg-green-500";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "technology":
        return <Zap className="w-4 h-4" />;
      case "research":
        return <Brain className="w-4 h-4" />;
      case "practice":
        return <Sparkles className="w-4 h-4" />;
      case "intelligence":
        return <Globe className="w-4 h-4" />;
      default:
        return <BookOpen className="w-4 h-4" />;
    }
  };

  if (isLoading) {
    return (
      <div className={`relative ${className}`}>
        <Card className="bg-black/40 border-purple-500/30 backdrop-blur-md">
          <CardContent className="p-8">
            <div className="flex items-center justify-center space-x-4">
              <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-purple-400">
                Loading Intelligence Insights...
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className={`relative ${className}`}>
        <Card className="bg-black/40 border-gray-500/30 backdrop-blur-md">
          <CardContent className="p-8 text-center">
            <Globe className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <p className="text-gray-400">No intelligence insights available</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const currentPost = posts[currentIndex];

  return (
    <div className={`relative ${className}`}>
      {/* Intelligence Insights Header */}
      {showIntelligenceInsights && insights.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <Card className="bg-gradient-to-r from-purple-900/40 to-cyan-900/40 border-purple-400/30 backdrop-blur-md">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Brain className="w-5 h-5 text-purple-400" />
                  <span className="text-purple-400 font-semibold">
                    Live Intelligence Feed
                  </span>
                </div>
                <Badge
                  variant="secondary"
                  className="bg-purple-500/20 text-purple-300"
                >
                  {insights.length} Active Insights
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="grid md:grid-cols-2 gap-3">
                {insights.slice(0, 2).map((insight, index) => (
                  <motion.div
                    key={insight.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start space-x-3 p-3 rounded-lg bg-black/20 border border-purple-500/20"
                  >
                    <div
                      className={`w-2 h-2 rounded-full mt-2 ${getUrgencyColor(insight.urgency)}`}
                    ></div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold text-white truncate">
                        {insight.title}
                      </h4>
                      <p className="text-xs text-gray-300 mt-1 line-clamp-2">
                        {insight.content}
                      </p>
                      <div className="flex items-center mt-2 space-x-2">
                        <Badge
                          variant="outline"
                          className="text-xs border-purple-500/30 text-purple-300"
                        >
                          {insight.type}
                        </Badge>
                        <span className="text-xs text-gray-400">
                          {insight.source}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Main Blog Slider */}
      <Card className="bg-black/40 border-cyan-500/30 backdrop-blur-md overflow-hidden">
        {/* Slider Header */}
        <CardHeader className="border-b border-cyan-500/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <BookOpen className="w-6 h-6 text-cyan-400" />
              <CardTitle className="text-cyan-400">
                Intelligence Dispatches
              </CardTitle>
              <Badge
                variant="secondary"
                className="bg-cyan-500/20 text-cyan-300"
              >
                {posts.length} Posts
              </Badge>
            </div>

            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsPlaying(!isPlaying)}
                className="text-cyan-400 hover:bg-cyan-500/20"
              >
                {isPlaying ? "Pause" : "Play"}
              </Button>

              <div className="flex items-center space-x-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={prevPost}
                  className="text-cyan-400 hover:bg-cyan-500/20"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={nextPost}
                  className="text-cyan-400 hover:bg-cyan-500/20"
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Progress Indicator */}
          <div className="flex space-x-1 mt-3">
            {posts.map((_, index) => (
              <div
                key={index}
                className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
                  index === currentIndex ? "bg-cyan-400" : "bg-gray-600"
                }`}
              />
            ))}
          </div>
        </CardHeader>

        {/* Slider Content */}
        <CardContent className="p-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -300 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="relative"
            >
              {/* Featured Image */}
              <div className="relative h-64 bg-gradient-to-br from-cyan-900/40 to-purple-900/40">
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute top-4 left-4">
                  <Badge
                    variant="secondary"
                    className="bg-black/40 text-white backdrop-blur-sm"
                  >
                    {getCategoryIcon(currentPost.category)}
                    <span className="ml-1 capitalize">
                      {currentPost.category}
                    </span>
                  </Badge>
                </div>
                {currentPost.featured && (
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-yellow-500 text-black">
                      <Star className="w-3 h-3 mr-1" />
                      Featured
                    </Badge>
                  </div>
                )}
                {currentPost.aiGenerated && (
                  <div className="absolute bottom-4 left-4">
                    <Badge className="bg-purple-500 text-white">
                      <Brain className="w-3 h-3 mr-1" />
                      AI Generated
                    </Badge>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2 line-clamp-2">
                      {currentPost.title}
                    </h3>
                    <p className="text-gray-300 line-clamp-3">
                      {currentPost.excerpt}
                    </p>
                  </div>

                  {/* Meta Information */}
                  <div className="flex items-center justify-between text-sm text-gray-400">
                    <div className="flex items-center space-x-4">
                      <span>{currentPost.author}</span>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>{currentPost.readTime} min read</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-1">
                        <Eye className="w-3 h-3" />
                        <span>{currentPost.views}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Heart className="w-3 h-3" />
                        <span>{currentPost.likes}</span>
                      </div>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {currentPost.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className="text-xs border-cyan-500/30 text-cyan-300"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center justify-between pt-4">
                    <Button
                      variant="outline"
                      className="border-cyan-500 text-cyan-400 hover:bg-cyan-500/20"
                    >
                      Read Full Article
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>

                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-gray-400 hover:text-white"
                      >
                        <Heart className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-gray-400 hover:text-white"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </CardContent>
      </Card>

      {/* Quick Navigation */}
      <div className="mt-4 flex justify-center space-x-2">
        {posts.slice(0, 5).map((post, index) => (
          <Button
            key={post.id}
            variant="ghost"
            size="sm"
            onClick={() => setCurrentIndex(index)}
            className={`text-xs px-2 py-1 h-auto ${
              index === currentIndex
                ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30"
                : "text-gray-400 hover:text-white"
            }`}
          >
            {post.title.slice(0, 20)}...
          </Button>
        ))}
      </div>
    </div>
  );
};

export default IntelligentBlogSlider;
