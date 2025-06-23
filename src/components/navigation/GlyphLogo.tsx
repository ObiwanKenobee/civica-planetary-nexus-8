import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlyphMorphism } from "@/types/navigation";
import { GLYPH_MORPHISMS } from "@/data/navigationData";

interface GlyphLogoProps {
  variant?: string;
  lunarPhase?: "new" | "waxing" | "full" | "waning";
  size?: number;
  interactive?: boolean;
  energyLevel?: number; // 0-1
  className?: string;
}

const GlyphLogo = ({
  variant = "base",
  lunarPhase = "full",
  size = 48,
  interactive = true,
  energyLevel = 0.7,
  className = "",
}: GlyphLogoProps) => {
  const [currentGlyph, setCurrentGlyph] = useState("◯");
  const [isAnimating, setIsAnimating] = useState(false);
  const [hoverIntensity, setHoverIntensity] = useState(0);
  const [energyPulse, setEnergyPulse] = useState(0);

  const morphism = GLYPH_MORPHISMS[variant] || GLYPH_MORPHISMS.base;

  // Energy pulse animation
  useEffect(() => {
    const interval = setInterval(() => {
      setEnergyPulse((prev) => (prev + 0.1) % (Math.PI * 2));
    }, 100);
    return () => clearInterval(interval);
  }, []);

  // Glyph morphing based on variant
  useEffect(() => {
    if (variant === "lunar") {
      setCurrentGlyph(morphism.variants[lunarPhase] || morphism.baseForm);
    } else {
      setCurrentGlyph(morphism.variants[variant] || morphism.baseForm);
    }
  }, [variant, lunarPhase, morphism]);

  // Auto-morphing for base form (cycles through roles)
  useEffect(() => {
    if (variant === "base" && interactive) {
      const variants = Object.values(morphism.variants);
      let index = 0;

      const interval = setInterval(() => {
        setIsAnimating(true);
        setTimeout(() => {
          setCurrentGlyph(variants[index]);
          index = (index + 1) % variants.length;
          setIsAnimating(false);
        }, 500);
      }, morphism.morphSpeed);

      return () => clearInterval(interval);
    }
  }, [variant, interactive, morphism]);

  const pulseIntensity = Math.sin(energyPulse) * 0.3 + 0.7;
  const glowIntensity = energyLevel * pulseIntensity + hoverIntensity * 0.3;

  const energyColors = morphism.energyChannels;
  const currentEnergyColor =
    energyColors[Math.floor(energyPulse / (Math.PI / 2)) % energyColors.length];

  return (
    <motion.div
      className={`relative flex items-center justify-center cursor-pointer ${className}`}
      style={{ width: size, height: size }}
      onHoverStart={() => interactive && setHoverIntensity(1)}
      onHoverEnd={() => interactive && setHoverIntensity(0)}
      whileHover={{ scale: interactive ? 1.1 : 1 }}
      whileTap={{ scale: interactive ? 0.95 : 1 }}
    >
      {/* Sacred geometric base */}
      <motion.div
        className="absolute inset-0 rounded-full border border-white/20"
        animate={{
          borderColor: `${currentEnergyColor}${Math.round(glowIntensity * 100)
            .toString(16)
            .padStart(2, "0")}`,
          boxShadow: `0 0 ${20 * glowIntensity}px ${currentEnergyColor}${Math.round(
            glowIntensity * 80,
          )
            .toString(16)
            .padStart(2, "0")}`,
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Energy emanations */}
      {interactive && (
        <motion.div
          className="absolute inset-0 rounded-full"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.4, 0.1, 0.4],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            background: `radial-gradient(circle, ${currentEnergyColor}20 0%, transparent 70%)`,
          }}
        />
      )}

      {/* Sacred ratios visualization */}
      {energyLevel > 0.8 && (
        <motion.div
          className="absolute inset-0"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          {morphism.sacredRatios.map((ratio, index) => (
            <div
              key={index}
              className="absolute border border-white/10 rounded-full"
              style={{
                width: `${(size * ratio) / 3}px`,
                height: `${(size * ratio) / 3}px`,
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            />
          ))}
        </motion.div>
      )}

      {/* Main glyph */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentGlyph}
          initial={{ scale: 0, rotate: -180, opacity: 0 }}
          animate={{
            scale: 1,
            rotate: 0,
            opacity: 1,
            filter: `brightness(${1 + glowIntensity * 0.5})`,
          }}
          exit={{ scale: 0, rotate: 180, opacity: 0 }}
          transition={{
            duration: 0.6,
            ease: "easeInOut",
            type: "spring",
            stiffness: 200,
            damping: 20,
          }}
          className="relative z-10 flex items-center justify-center"
          style={{
            fontSize: size * 0.6,
            textShadow: `0 0 ${10 * glowIntensity}px ${currentEnergyColor}`,
          }}
        >
          {currentGlyph}
        </motion.div>
      </AnimatePresence>

      {/* Interaction feedback */}
      {interactive && hoverIntensity > 0 && (
        <motion.div
          className="absolute inset-0 rounded-full border-2"
          style={{ borderColor: currentEnergyColor }}
          initial={{ scale: 1, opacity: 0 }}
          animate={{
            scale: 1.3,
            opacity: 0.6,
            borderColor: `${currentEnergyColor}${Math.round(
              hoverIntensity * 255,
            )
              .toString(16)
              .padStart(2, "0")}`,
          }}
          transition={{ duration: 0.3 }}
        />
      )}

      {/* Sacred inscriptions for high energy states */}
      {energyLevel > 0.9 && (
        <motion.div
          className="absolute inset-0"
          animate={{ rotate: -360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        >
          {["☰", "☱", "☲", "☳", "☴", "☵", "☶", "☷"].map(
            (symbol, index) => {
              const angle = index * 45 * (Math.PI / 180);
              const radius = size * 0.4;
              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle) * radius;

              return (
                <div
                  key={symbol}
                  className="absolute text-white/30 text-xs"
                  style={{
                    left: "50%",
                    top: "50%",
                    transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                  }}
                >
                  {symbol}
                </div>
              );
            },
          )}
        </motion.div>
      )}

      {/* Resonance indicator */}
      {variant !== "base" && (
        <motion.div
          className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full border border-white/40"
          animate={{
            backgroundColor: currentEnergyColor,
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: morphism.resonanceFrequency * 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      )}
    </motion.div>
  );
};

export default GlyphLogo;
