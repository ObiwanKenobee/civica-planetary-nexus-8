// Navigation Oracle Types - Sacred Header System
// Transforming navigation from menu to ritual interface

export interface NavigationOracleState {
  mode: "arrival" | "authenticated" | "ritual_active" | "cosmic_event";
  selectedRole: string | null;
  activeCluster: number | null;
  ritualPhase:
    | "preparation"
    | "invocation"
    | "working"
    | "integration"
    | "closing";
  cosmicAlignment: CosmicAlignment;
  intentionFocus: string | null;
}

export interface CosmicAlignment {
  lunarPhase: "new" | "waxing" | "full" | "waning";
  timeOfDay: "dawn" | "midday" | "dusk" | "midnight";
  season: "spring" | "summer" | "autumn" | "winter";
  sacredEvents: SacredEvent[];
  planetaryEnergy: number; // 0-1 scale
}

export interface SacredEvent {
  type:
    | "solstice"
    | "equinox"
    | "eclipse"
    | "lunar"
    | "portal_day"
    | "collective_ritual";
  name: string;
  date: Date;
  energySignature: string;
  ritualRecommendations: string[];
}

export interface RoleMenuConfig {
  role: string;
  actions: RoleAction[];
  essence: string;
  primaryColor: string;
  secondaryColor: string;
  glyph: string;
}

export interface RoleAction {
  id: string;
  verb: string; // e.g., "Invoke", "Pollinate", "Simulate"
  description: string;
  icon: string;
  ritual?: string;
  destination: string;
  requiredEnergy?: number;
  sacredTools: string[];
}

export interface ArrivalChoice {
  id: string;
  intention: string;
  description: string;
  portal: PortalDestination;
  glyph: string;
  color: string;
}

export interface PortalDestination {
  type:
    | "ritual_library"
    | "copilot_council"
    | "scroll_forge"
    | "atlas_constellation"
    | "flourish_garden";
  path: string;
  preparationRitual?: string;
  requiredAlignment?: string[];
}

export interface ClusterCompassNode {
  id: number;
  name: string;
  shortName: string;
  glyph: string;
  color: string;
  position: { angle: number; radius: number };
  activity: "dormant" | "stirring" | "active" | "intense";
  wisdomLevel: number;
  activeRituals: number;
  canEnter: boolean;
  guardianMessage?: string;
  externalLink?: string;
  description?: string;
}

export interface SacredPulse {
  id: string;
  type:
    | "blessing"
    | "ritual_call"
    | "planetary_event"
    | "wisdom_sharing"
    | "cluster_activation";
  title: string;
  message: string;
  source: string;
  timestamp: Date;
  urgency: "gentle" | "important" | "urgent" | "cosmic";
  actions?: PulseAction[];
  energySignature: string;
}

export interface PulseAction {
  label: string;
  action: string;
  ritual?: string;
}

export interface PresenceOrb {
  shape: "circle" | "triangle" | "square" | "hexagon" | "star" | "spiral";
  colors: string[];
  glow: number; // 0-1 intensity
  pattern: "solid" | "pulse" | "breathe" | "flow" | "mandala";
  inscriptions: string[]; // Sacred symbols or runes
  energy: {
    wisdom: number;
    service: number;
    connection: number;
    creativity: number;
  };
}

export interface RitualInputState {
  placeholder: string;
  mode: "intention" | "query" | "invocation" | "offering";
  suggestions: IntentionSuggestion[];
  semanticContext: string[];
  activeSymbols: string[];
}

export interface IntentionSuggestion {
  text: string;
  category: "ritual" | "wisdom" | "service" | "creation" | "healing";
  resonance: number;
  relatedClusters: number[];
  sacredKeywords: string[];
}

export interface GlyphMorphism {
  baseForm: string;
  variants: Record<string, string>; // role or phase variants
  morphSpeed: number;
  resonanceFrequency: number;
  sacredRatios: number[]; // Golden ratio, fibonacci, etc.
  energyChannels: string[]; // Color channels for energy flow
}

export interface NavigationRitual {
  name: string;
  steps: RitualStep[];
  duration: number; // seconds
  requiredElements: string[];
  blessings: string[];
  outcome: string;
}

export interface RitualStep {
  instruction: string;
  duration: number;
  visualization?: string;
  breathWork?: string;
  intention?: string;
  sacredGeometry?: string;
}

// Sacred Search/Whisper Engine
export interface WhisperQuery {
  rawInput: string;
  intention: string;
  symbols: string[];
  clusters: number[];
  semanticEmbedding: number[];
  sacredResonance: number;
}

export interface WhisperResult {
  type:
    | "ritual"
    | "scroll"
    | "being"
    | "place"
    | "wisdom"
    | "simulation"
    | "treaty";
  title: string;
  description: string;
  relevance: number;
  sacredMarkers: string[];
  accessPath: string;
  ritualRequired?: string;
  guardianConsent?: boolean;
}

// Navigation Oracle Context
export interface NavigationOracleContext {
  state: NavigationOracleState;
  roleConfig: RoleMenuConfig | null;
  compassNodes: ClusterCompassNode[];
  sacredPulses: SacredPulse[];
  presenceOrb: PresenceOrb;
  ritualInput: RitualInputState;
  glyph: GlyphMorphism;

  // Actions
  setIntention: (intention: string) => void;
  selectCluster: (clusterId: number) => void;
  performRitual: (ritualName: string) => Promise<void>;
  whisperQuery: (query: string) => Promise<WhisperResult[]>;
  acknowledgePulse: (pulseId: string) => void;
  morphGlyph: (variant: string) => void;
  alignWithCosmic: (alignment: Partial<CosmicAlignment>) => void;
}
