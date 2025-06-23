// CIVICA 144 ScrollSignal Components
// Barrel exports for all ScrollSignal platform components

export { default as ScrollSignalPlatform } from "./ScrollSignalPlatform";
export { default as ScrollParchment } from "./ScrollParchment";
export { default as VoiceActivation } from "./VoiceActivation";
export { default as AIScrollGenerator } from "./AIScrollGenerator";
export { default as RitualBlessing } from "./RitualBlessing";
export { default as SimulationEngine } from "./SimulationEngine";
export { default as CommunityModules } from "./CommunityModules";
export { default as CulturalArchive } from "./CulturalArchive";

// Re-export types for convenience
export type {
  CivicScroll,
  ScrollType,
  CommunityMember,
  ScrollSignalState,
  VoiceRecording,
  Blessing,
  SimulationResult,
  IoTReading,
  ScrollGenerationRequest,
} from "@/types/scrollSignal";
