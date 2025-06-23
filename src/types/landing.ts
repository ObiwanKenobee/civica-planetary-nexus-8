// CIVICA 144 Landing Page Types
// Sacred portal interfaces and ceremonial data structures

export interface SacredRole {
  id: string;
  name: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  gradient: string;
  ritualPath: string;
  permissions: string[];
  wisdomFocus: string[];
  sacredTools: string[];
}

export interface IntelligenceClusterPreview {
  id: number;
  name: string;
  shortName: string;
  description: string;
  icon: string;
  color: string;
  position: { x: number; y: number };
  activeNodes: number;
  totalNodes: number;
  ritualActivity: "high" | "medium" | "low";
  wisdomLevel: number;
}

export interface ScrollOfOrigins {
  sections: ScrollSection[];
  contributors: Contributor[];
  principles: SacredPrinciple[];
}

export interface ScrollSection {
  id: string;
  title: string;
  content: string;
  symbolism: string;
  lineage: string[];
}

export interface Contributor {
  name: string;
  role: string;
  lineage: string;
  contribution: string;
  wisdom: string;
}

export interface SacredPrinciple {
  principle: string;
  description: string;
  manifestation: string;
  symbol: string;
}

export interface LandingPageState {
  currentSection: string;
  selectedRole: SacredRole | null;
  hoveredCluster: number | null;
  ritualPhase: "preparation" | "invocation" | "working" | "integration";
  cosmicTime: {
    timeOfDay: "dawn" | "midday" | "dusk" | "midnight";
    lunarPhase: "new" | "waxing" | "full" | "waning";
    season: "spring" | "summer" | "autumn" | "winter";
  };
  portalEnergy: number; // 0-1, affects animations and atmosphere
}

export interface FlourishFlowVisualization {
  stages: FlowStage[];
  currentStage: number;
  totalFlow: number;
  regenerativeImpact: number;
}

export interface FlowStage {
  id: string;
  name: string;
  description: string;
  icon: string;
  inputType: "fiat" | "contribution" | "ritual" | "wisdom";
  outputType: "flourish" | "access" | "blessing" | "regeneration";
  efficiency: number;
  sacredMultiplier: number;
}

export interface AICoilotPreview {
  name: string;
  archetype: string;
  personality: string;
  specialization: string[];
  sampleInteraction: {
    userQuery: string;
    response: string;
    wisdomSource: string;
  };
  avatar: string;
  voice: "ancient" | "mystical" | "practical" | "poetic";
}

export interface RitualClock {
  currentTime: Date;
  timeOfDay: "dawn" | "midday" | "dusk" | "midnight";
  lunarPhase: "new" | "waxing" | "full" | "waning";
  season: "spring" | "summer" | "autumn" | "winter";
  sacredEvents: SacredEvent[];
  timeUntilNext: string;
}

export interface SacredEvent {
  name: string;
  type: "solstice" | "equinox" | "eclipse" | "lunar" | "planetary";
  date: Date;
  significance: string;
  ritualFocus: string;
}

export interface PortalAnimation {
  type: "mandala" | "constellation" | "spiral" | "tree_of_life" | "sri_yantra";
  speed: number;
  intensity: number;
  harmonics: number[];
  syncWithAudio: boolean;
}
