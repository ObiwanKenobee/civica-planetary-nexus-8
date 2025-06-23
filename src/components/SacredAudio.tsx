import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Volume2, VolumeX, Music } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface SacredAudioProps {
  timeOfDay: "dawn" | "midday" | "dusk" | "midnight";
  enabled?: boolean;
  className?: string;
}

const SacredAudio = ({
  timeOfDay,
  enabled = true,
  className = "",
}: SacredAudioProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const [currentFrequency, setCurrentFrequency] = useState(432); // Hz
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorsRef = useRef<OscillatorNode[]>([]);
  const gainNodeRef = useRef<GainNode | null>(null);

  // Sacred frequencies for different times
  const timeFrequencies = {
    dawn: [432, 528, 639], // Hope, love, communication
    midday: [741, 852, 963], // Awakening, intuition, cosmic consciousness
    dusk: [396, 417, 528], // Grounding, change, love
    midnight: [174, 285, 396], // Pain relief, healing, grounding
  };

  useEffect(() => {
    if (!enabled) return;

    // Initialize Web Audio API
    const initAudio = () => {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext ||
          (window as any).webkitAudioContext)();
        gainNodeRef.current = audioContextRef.current.createGain();
        gainNodeRef.current.connect(audioContextRef.current.destination);
        gainNodeRef.current.gain.setValueAtTime(
          volume,
          audioContextRef.current.currentTime,
        );
      }
    };

    // Only initialize when user first interacts
    const handleUserInteraction = () => {
      initAudio();
      document.removeEventListener("click", handleUserInteraction);
      document.removeEventListener("keydown", handleUserInteraction);
    };

    document.addEventListener("click", handleUserInteraction);
    document.addEventListener("keydown", handleUserInteraction);

    return () => {
      document.removeEventListener("click", handleUserInteraction);
      document.removeEventListener("keydown", handleUserInteraction);
    };
  }, [enabled, volume]);

  useEffect(() => {
    if (isPlaying && audioContextRef.current && gainNodeRef.current) {
      startSacredTones();
    } else {
      stopSacredTones();
    }

    return () => stopSacredTones();
  }, [isPlaying, timeOfDay]);

  const startSacredTones = () => {
    if (!audioContextRef.current || !gainNodeRef.current) return;

    stopSacredTones(); // Clear any existing oscillators

    const ctx = audioContextRef.current;
    const frequencies = timeFrequencies[timeOfDay];

    frequencies.forEach((freq, index) => {
      const oscillator = ctx.createOscillator();
      const oscGain = ctx.createGain();

      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(freq, ctx.currentTime);

      // Create subtle beating and harmonics
      const detune = (Math.random() - 0.5) * 2; // Small random detune for organic feel
      oscillator.detune.setValueAtTime(detune, ctx.currentTime);

      // Individual oscillator volume (very quiet)
      oscGain.gain.setValueAtTime(
        (volume / frequencies.length) * 0.3,
        ctx.currentTime,
      );

      // Add subtle LFO for breathing effect
      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      lfo.frequency.setValueAtTime(0.1 + index * 0.05, ctx.currentTime); // Slow breathing rate
      lfoGain.gain.setValueAtTime(0.05, ctx.currentTime);

      lfo.connect(lfoGain);
      lfoGain.connect(oscGain.gain);
      lfo.start();

      oscillator.connect(oscGain);
      oscGain.connect(gainNodeRef.current!);
      oscillator.start();

      oscillatorsRef.current.push(oscillator);
    });
  };

  const stopSacredTones = () => {
    oscillatorsRef.current.forEach((osc) => {
      try {
        osc.stop();
        osc.disconnect();
      } catch (e) {
        // Oscillator might already be stopped
      }
    });
    oscillatorsRef.current = [];
  };

  const toggleAudio = () => {
    if (!audioContextRef.current && typeof window !== "undefined") {
      const AudioContext =
        window.AudioContext || (window as any).webkitAudioContext;
      if (AudioContext) {
        audioContextRef.current = new AudioContext();
      }
    }

    setIsPlaying(!isPlaying);
  };

  const updateVolume = (newVolume: number) => {
    setVolume(newVolume);
    if (gainNodeRef.current && audioContextRef.current) {
      gainNodeRef.current.gain.setValueAtTime(
        newVolume,
        audioContextRef.current.currentTime,
      );
    }
  };

  if (!enabled) return null;

  const timeColors = {
    dawn: "text-orange-400",
    midday: "text-blue-400",
    dusk: "text-purple-400",
    midnight: "text-indigo-400",
  };

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <Button
        variant="ghost"
        size="sm"
        onClick={toggleAudio}
        className={`hover:bg-white/10 ${timeColors[timeOfDay]}`}
        title={isPlaying ? "Pause sacred tones" : "Play sacred tones"}
      >
        {isPlaying ? (
          <Volume2 className="w-4 h-4" />
        ) : (
          <VolumeX className="w-4 h-4" />
        )}
      </Button>

      <AnimatePresence>
        {isPlaying && (
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "auto" }}
            exit={{ opacity: 0, width: 0 }}
            className="flex items-center space-x-2"
          >
            <Music
              className={`w-3 h-3 ${timeColors[timeOfDay]} animate-pulse`}
            />
            <input
              type="range"
              min="0"
              max="0.5"
              step="0.1"
              value={volume}
              onChange={(e) => updateVolume(parseFloat(e.target.value))}
              className="w-16 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer"
              title="Sacred tone volume"
            />
            <span className={`text-xs ${timeColors[timeOfDay]}`}>
              {timeFrequencies[timeOfDay].join("Hz, ")}Hz
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SacredAudio;
