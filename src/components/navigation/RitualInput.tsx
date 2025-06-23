import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Sparkles,
  Heart,
  Zap,
  Eye,
  Hand,
  MessageCircle,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { IntentionSuggestion } from "@/types/navigation";
import { INTENTION_PLACEHOLDERS } from "@/data/navigationData";

interface RitualInputProps {
  onIntention?: (intention: string) => void;
  onWhisper?: (query: string) => Promise<any[]>;
  mode?: "intention" | "query" | "invocation" | "offering";
  placeholder?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const RitualInput = ({
  onIntention,
  onWhisper,
  mode = "intention",
  placeholder,
  size = "md",
  className = "",
}: RitualInputProps) => {
  const [input, setInput] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [suggestions, setSuggestions] = useState<IntentionSuggestion[]>([]);
  const [selectedSuggestion, setSelectedSuggestion] = useState(-1);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [currentPlaceholder, setCurrentPlaceholder] = useState("");
  const [sacredSymbols, setSacredSymbols] = useState<string[]>([]);
  const [energyLevel, setEnergyLevel] = useState(0);

  const inputRef = useRef<HTMLInputElement>(null);

  // Cycle through sacred placeholders
  useEffect(() => {
    const placeholders = placeholder ? [placeholder] : INTENTION_PLACEHOLDERS;
    let index = 0;

    const cycle = () => {
      setCurrentPlaceholder(placeholders[index]);
      index = (index + 1) % placeholders.length;
    };

    cycle(); // Set initial
    const interval = setInterval(cycle, 4000);
    return () => clearInterval(interval);
  }, [placeholder]);

  // Energy pulse animation
  useEffect(() => {
    const interval = setInterval(() => {
      setEnergyLevel((prev) => Math.sin(Date.now() * 0.003) * 0.3 + 0.7);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  // Generate suggestions based on input
  useEffect(() => {
    if (input.length > 2) {
      generateIntentionSuggestions(input);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [input]);

  const generateIntentionSuggestions = (query: string) => {
    const sacredKeywords = {
      heal: {
        category: "healing",
        clusters: [1, 3, 7],
        symbols: ["💚", "🌿", "✨"],
      },
      water: {
        category: "ritual",
        clusters: [1, 9],
        symbols: ["💧", "🌊", "🐋"],
      },
      future: {
        category: "wisdom",
        clusters: [8, 12],
        symbols: ["🌟", "⏳", "🔮"],
      },
      forest: {
        category: "service",
        clusters: [1, 9],
        symbols: ["🌳", "🦅", "🍃"],
      },
      ceremony: {
        category: "ritual",
        clusters: [7, 6],
        symbols: ["🕯️", "🙏", "📿"],
      },
      wisdom: {
        category: "wisdom",
        clusters: [6, 10],
        symbols: ["📜", "🧠", "💎"],
      },
      connect: {
        category: "service",
        clusters: [2, 11],
        symbols: ["🤝", "🕸️", "💞"],
      },
      create: {
        category: "creation",
        clusters: [4, 6],
        symbols: ["🎨", "🌈", "⚡"],
      },
    };

    const suggestions: IntentionSuggestion[] = [];
    const queryLower = query.toLowerCase();

    Object.entries(sacredKeywords).forEach(([keyword, data]) => {
      if (keyword.includes(queryLower) || queryLower.includes(keyword)) {
        suggestions.push({
          text: `${keyword} alignment ritual`,
          category: data.category as any,
          resonance: 0.8 + Math.random() * 0.2,
          relatedClusters: data.clusters,
          sacredKeywords: [keyword],
        });
      }
    });

    // Add some mystical suggestions
    if (queryLower.includes("light") || queryLower.includes("illuminat")) {
      suggestions.push({
        text: "illuminate the path forward",
        category: "wisdom",
        resonance: 0.9,
        relatedClusters: [7, 10, 12],
        sacredKeywords: ["illumination", "guidance"],
      });
    }

    if (queryLower.includes("earth") || queryLower.includes("gaia")) {
      suggestions.push({
        text: "commune with Gaia consciousness",
        category: "ritual",
        resonance: 0.95,
        relatedClusters: [1, 9],
        sacredKeywords: ["earth", "communion"],
      });
    }

    setSuggestions(suggestions.slice(0, 5));
    setShowSuggestions(suggestions.length > 0);
  };

  const handleSubmit = (intention?: string) => {
    const finalIntention = intention || input;
    if (finalIntention.trim()) {
      onIntention?.(finalIntention);
      if (onWhisper) {
        onWhisper(finalIntention);
      }
      setInput("");
      setShowSuggestions(false);
      extractSacredSymbols(finalIntention);
    }
  };

  const extractSacredSymbols = (text: string) => {
    const symbols = ["✨", "🌟", "💫", "🔮", "🕯️", "🌙", "☀️", "🌈"];
    const extracted = symbols.filter(() => Math.random() > 0.7);
    setSacredSymbols(extracted);
    setTimeout(() => setSacredSymbols([]), 3000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      if (selectedSuggestion >= 0 && suggestions[selectedSuggestion]) {
        handleSubmit(suggestions[selectedSuggestion].text);
        setSelectedSuggestion(-1);
      } else {
        handleSubmit();
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedSuggestion((prev) =>
        Math.min(prev + 1, suggestions.length - 1),
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedSuggestion((prev) => Math.max(prev - 1, -1));
    } else if (e.key === "Escape") {
      setShowSuggestions(false);
      setSelectedSuggestion(-1);
      inputRef.current?.blur();
    }
  };

  const getModeIcon = () => {
    switch (mode) {
      case "intention":
        return Sparkles;
      case "query":
        return Search;
      case "invocation":
        return Eye;
      case "offering":
        return Hand;
      default:
        return MessageCircle;
    }
  };

  const getModeColor = () => {
    switch (mode) {
      case "intention":
        return "#8b5cf6"; // violet-500
      case "query":
        return "#06b6d4"; // cyan-500
      case "invocation":
        return "#ec4899"; // pink-500
      case "offering":
        return "#f59e0b"; // amber-500
      default:
        return "#6b7280"; // gray-500
    }
  };

  const sizes = {
    sm: { input: "text-sm py-2 px-3", icon: "w-4 h-4" },
    md: { input: "text-base py-3 px-4", icon: "w-5 h-5" },
    lg: { input: "text-lg py-4 px-6", icon: "w-6 h-6" },
  };

  const ModeIcon = getModeIcon();
  const modeColor = getModeColor();

  return (
    <div className={`relative ${className}`}>
      {/* Sacred symbols floating */}
      <AnimatePresence>
        {sacredSymbols.map((symbol, index) => (
          <motion.div
            key={`${symbol}-${index}`}
            className="absolute text-2xl pointer-events-none z-10"
            initial={{
              opacity: 0,
              scale: 0,
              x: Math.random() * 100 - 50,
              y: Math.random() * 100 - 50,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1.2, 0],
              y: -100,
              rotate: 360,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 3, ease: "easeOut" }}
            style={{
              left: "50%",
              top: "50%",
            }}
          >
            {symbol}
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Main input container */}
      <motion.div
        className="relative"
        animate={{
          scale: isFocused ? 1.02 : 1,
          boxShadow: isFocused
            ? `0 0 20px ${modeColor}40, 0 0 40px ${modeColor}20`
            : `0 0 10px ${modeColor}20`,
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="relative flex items-center">
          {/* Mode icon */}
          <motion.div
            className="absolute left-3 z-10"
            animate={{
              color: modeColor,
              filter: `brightness(${energyLevel})`,
            }}
          >
            <ModeIcon className={sizes[size].icon} />
          </motion.div>

          {/* Input field */}
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 200)}
            onKeyDown={handleKeyDown}
            className={`
              w-full ${sizes[size].input} pl-12 pr-16 
              bg-black/20 border border-white/20 rounded-lg
              text-white placeholder-gray-400
              focus:outline-none focus:border-white/40
              backdrop-blur-sm transition-all duration-300
            `}
            placeholder={currentPlaceholder}
          />

          {/* Energy pulse indicator */}
          <motion.div
            className="absolute right-3"
            animate={{
              scale: [1, 1.2, 1],
              opacity: energyLevel,
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: modeColor }}
            />
          </motion.div>
        </div>

        {/* Sacred border animation */}
        {isFocused && (
          <motion.div
            className="absolute inset-0 rounded-lg border-2 pointer-events-none"
            style={{ borderColor: modeColor }}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 0.6, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
          />
        )}
      </motion.div>

      {/* Suggestions dropdown */}
      <AnimatePresence>
        {showSuggestions && suggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className="absolute top-full left-0 right-0 mt-2 z-20"
          >
            <Card className="bg-black/80 border-white/20 backdrop-blur-md">
              <CardContent className="p-2">
                {suggestions.map((suggestion, index) => (
                  <motion.div
                    key={index}
                    className={`
                      p-3 rounded cursor-pointer transition-all
                      ${
                        index === selectedSuggestion
                          ? "bg-white/20"
                          : "hover:bg-white/10"
                      }
                    `}
                    onClick={() => handleSubmit(suggestion.text)}
                    whileHover={{ x: 4 }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="text-sm text-white">
                          {suggestion.text}
                        </div>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge
                            variant="outline"
                            className="text-xs"
                            style={{
                              borderColor: modeColor,
                              color: modeColor,
                            }}
                          >
                            {suggestion.category}
                          </Badge>
                          <div className="text-xs text-gray-400">
                            {suggestion.relatedClusters.length} clusters
                          </div>
                        </div>
                      </div>
                      <div className="ml-2">
                        <motion.div
                          className="flex items-center space-x-1"
                          animate={{
                            opacity: [0.5, 1, 0.5],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                        >
                          {[...Array(Math.round(suggestion.resonance * 5))].map(
                            (_, i) => (
                              <div
                                key={i}
                                className="w-1 h-1 rounded-full"
                                style={{ backgroundColor: modeColor }}
                              />
                            ),
                          )}
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sacred inscription hint */}
      {isFocused && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          exit={{ opacity: 0 }}
          className="absolute -bottom-6 left-0 text-xs text-gray-400 italic"
        >
          Speak your intention, and the cosmos aligns...
        </motion.div>
      )}
    </div>
  );
};

export default RitualInput;
