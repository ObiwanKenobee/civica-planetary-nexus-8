// CIVICA 144 Sacred Loading Component
// Beautiful loading states for sacred transitions

import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, Heart, Star, Globe } from "lucide-react";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg" | "xl";
  type?: "spinner" | "mandala" | "pulse" | "constellation" | "minimal";
  message?: string;
  fullScreen?: boolean;
  sacred?: boolean;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = "md",
  type = "mandala",
  message,
  fullScreen = false,
  sacred = true,
}) => {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-16 h-16",
    lg: "w-24 h-24",
    xl: "w-32 h-32",
  };

  const containerClass = fullScreen
    ? "fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center"
    : "flex items-center justify-center";

  // Sacred Mandala Spinner
  const MandalaSpinner = () => (
    <div className={`relative ${sizeClasses[size]}`}>
      {/* Outer Ring */}
      <motion.div
        className="absolute inset-0 border-2 border-cyan-400/30 rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
      />

      {/* Middle Ring */}
      <motion.div
        className="absolute inset-2 border-2 border-purple-400/50 rounded-full"
        animate={{ rotate: -360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      />

      {/* Inner Ring */}
      <motion.div
        className="absolute inset-4 border-2 border-gold-400/70 rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
      />

      {/* Sacred Center */}
      <motion.div
        className="absolute inset-6 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.7, 1, 0.7],
        }}
        transition={{ duration: 2, repeat: Infinity }}
      />

      {/* Sacred Symbols */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="text-white text-xl"
        >
          ✨
        </motion.div>
      </div>
    </div>
  );

  // Constellation Spinner
  const ConstellationSpinner = () => (
    <div className={`relative ${sizeClasses[size]}`}>
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-cyan-400 rounded-full"
          style={{
            left: "50%",
            top: "50%",
            transformOrigin: `0 ${size === "sm" ? "16px" : size === "md" ? "32px" : size === "lg" ? "48px" : "64px"}`,
          }}
          animate={{
            rotate: [0, 360],
            scale: [1, 1.5, 1],
            opacity: [0.3, 1, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.2,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );

  // Sacred Pulse
  const PulseSpinner = () => (
    <motion.div
      className={`${sizeClasses[size]} bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full`}
      animate={{
        scale: [1, 1.3, 1],
        opacity: [0.5, 1, 0.5],
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );

  // Simple Spinner
  const SimpleSpinner = () => (
    <motion.div
      className={`${sizeClasses[size]} border-4 border-gray-600 border-t-cyan-400 rounded-full`}
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
    />
  );

  // Minimal Dots
  const MinimalSpinner = () => (
    <div className="flex space-x-2">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-3 h-3 bg-cyan-400 rounded-full"
          animate={{
            y: [0, -10, 0],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            delay: i * 0.2,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );

  const renderSpinner = () => {
    switch (type) {
      case "constellation":
        return <ConstellationSpinner />;
      case "pulse":
        return <PulseSpinner />;
      case "spinner":
        return <SimpleSpinner />;
      case "minimal":
        return <MinimalSpinner />;
      default:
        return <MandalaSpinner />;
    }
  };

  const content = (
    <div className="text-center space-y-4">
      {renderSpinner()}

      {message && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="space-y-2"
        >
          <p className="text-white font-medium">{message}</p>
          {sacred && (
            <p className="text-gray-400 text-sm">
              Sacred technology is aligning with cosmic forces...
            </p>
          )}
        </motion.div>
      )}

      {sacred && !message && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center"
        >
          <p className="text-gray-400 text-sm">The sacred flow continues...</p>
        </motion.div>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className={containerClass}>
        {/* Cosmic Background */}
        <div className="fixed inset-0 opacity-20">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        <Card className="bg-black/60 border-white/20 backdrop-blur-md">
          <CardContent className="p-8">{content}</CardContent>
        </Card>
      </div>
    );
  }

  return <div className={containerClass}>{content}</div>;
};

// Prebuilt loading states for common scenarios
export const SacredLoader = {
  Portal: () => (
    <LoadingSpinner
      type="mandala"
      size="lg"
      message="Opening Sacred Portal..."
      fullScreen
    />
  ),

  Community: () => (
    <LoadingSpinner
      type="constellation"
      size="md"
      message="Connecting with Sacred Community..."
    />
  ),

  Wisdom: () => (
    <LoadingSpinner
      type="pulse"
      size="md"
      message="Channeling Ancient Wisdom..."
    />
  ),

  Payment: () => (
    <LoadingSpinner
      type="mandala"
      size="md"
      message="Blessing Sacred Exchange..."
    />
  ),

  Minimal: () => <LoadingSpinner type="minimal" size="sm" />,
};

export default LoadingSpinner;
