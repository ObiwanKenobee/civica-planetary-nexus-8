import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  ReactNode,
} from "react";
import {
  CivicaState,
  CivicaEvent,
  CivicaConfig,
  RitualState,
  WisdomStream,
  EmergentPattern,
} from "@/types/civica";
import {
  DEFAULT_CIVICA_CONFIG,
  PatternEngine,
  RitualEngine,
} from "@/lib/civica-core";
import { useSacredAuth } from "@/hooks/useSacredAuth";

// Global CIVICA State Context
interface CivicaContextType {
  state: CivicaState;
  dispatch: React.Dispatch<CivicaEvent>;
  startRitual: (ritualType: string, intention: string) => void;
  endRitual: () => void;
  addWisdomStream: (content: string, source: string) => void;
  updateGlobalData: (key: string, value: any) => void;
  getSystemCoherence: () => number;
  getCurrentPhase: () => string;
  isRitualActive: () => boolean;
}

const CivicaContext = createContext<CivicaContextType | undefined>(undefined);

// Initial State
const initialState: CivicaState = {
  config: DEFAULT_CIVICA_CONFIG,
  activeUser: null,
  currentRitual: null,
  globalData: {
    lastUpdated: new Date().toISOString(),
    activeNodes: 0,
    totalConnections: 0,
    communitySize: 0,
    ritualsCompleted: 0,
  },
  wisdomStreams: [],
  emergentPatterns: [],
};

// Action Types
const CIVICA_ACTIONS = {
  UPDATE_CONFIG: "UPDATE_CONFIG",
  SET_ACTIVE_USER: "SET_ACTIVE_USER",
  START_RITUAL: "START_RITUAL",
  UPDATE_RITUAL: "UPDATE_RITUAL",
  END_RITUAL: "END_RITUAL",
  ADD_WISDOM_STREAM: "ADD_WISDOM_STREAM",
  UPDATE_GLOBAL_DATA: "UPDATE_GLOBAL_DATA",
  DETECT_PATTERNS: "DETECT_PATTERNS",
  SYSTEM_EVOLUTION: "SYSTEM_EVOLUTION",
} as const;

// Reducer Function
function civicaReducer(state: CivicaState, event: CivicaEvent): CivicaState {
  switch (event.type) {
    case CIVICA_ACTIONS.UPDATE_CONFIG:
      return {
        ...state,
        config: { ...state.config, ...event.payload },
      };

    case CIVICA_ACTIONS.SET_ACTIVE_USER:
      return {
        ...state,
        activeUser: event.payload,
      };

    case CIVICA_ACTIONS.START_RITUAL:
      const {
        ritualType,
        intention,
        participants = [],
        geometry,
      } = event.payload;
      const newRitual: RitualState = {
        phase: "preparation",
        intention,
        participants: participants.map((p: any) => ({
          identityId: p.identityId || p.id,
          role: p.role || "witness",
          elements: p.elements || ["spirit"],
          contributedEnergy: 0,
        })),
        tools: [],
        space: {
          geometry:
            geometry ||
            RitualEngine.selectOptimalGeometry(intention, participants.length),
          directions: {
            north: "earth",
            south: "fire",
            east: "air",
            west: "water",
            center: "spirit",
          },
          atmosphere: {
            lighting: "candles",
            sound: "silence",
            scent: "sage",
            temperature: "comfortable",
          },
          protections: ["sacred_circle", "intention_shield"],
        },
        energy: {
          frequency: 432,
          amplitude: 0.5,
          harmonics: [432, 528, 693, 741],
          coherence: 0.7,
          resonanceWith: ["earth_frequency", "collective_heart"],
        },
      };

      return {
        ...state,
        currentRitual: newRitual,
        globalData: {
          ...state.globalData,
          activeRituals: (state.globalData.activeRituals || 0) + 1,
        },
      };

    case CIVICA_ACTIONS.UPDATE_RITUAL:
      if (!state.currentRitual) return state;

      return {
        ...state,
        currentRitual: {
          ...state.currentRitual,
          ...event.payload,
        },
      };

    case CIVICA_ACTIONS.END_RITUAL:
      if (!state.currentRitual) return state;

      // Calculate ritual impact and update system
      const ritualImpact = calculateRitualImpact(state.currentRitual);

      return {
        ...state,
        currentRitual: null,
        globalData: {
          ...state.globalData,
          ritualsCompleted: (state.globalData.ritualsCompleted || 0) + 1,
          activeRituals: Math.max(0, (state.globalData.activeRituals || 1) - 1),
          totalRitualImpact:
            (state.globalData.totalRitualImpact || 0) + ritualImpact,
        },
        config: {
          ...state.config,
          globalConsciousnessLevel: Math.min(
            1.0,
            state.config.globalConsciousnessLevel + ritualImpact * 0.01,
          ),
          harmonyIndex: Math.min(
            1.0,
            state.config.harmonyIndex + ritualImpact * 0.005,
          ),
        },
      };

    case CIVICA_ACTIONS.ADD_WISDOM_STREAM:
      const { content, source, wisdom_level = 0.5 } = event.payload;
      const newWisdomStream: WisdomStream = {
        id: `wisdom_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        source,
        content,
        wisdom_level,
        blessing_count: 0,
        sacred_markers: extractSacredMarkers(content),
      };

      const updatedWisdomStreams = [
        newWisdomStream,
        ...state.wisdomStreams,
      ].slice(0, 100); // Keep last 100

      return {
        ...state,
        wisdomStreams: updatedWisdomStreams,
        config: {
          ...state.config,
          systemWisdom: calculateSystemWisdom(updatedWisdomStreams),
        },
      };

    case CIVICA_ACTIONS.UPDATE_GLOBAL_DATA:
      return {
        ...state,
        globalData: {
          ...state.globalData,
          [event.payload.key]: event.payload.value,
          lastUpdated: new Date().toISOString(),
        },
      };

    case CIVICA_ACTIONS.DETECT_PATTERNS:
      const patterns = PatternEngine.detectEmergentPatterns([
        ...state.wisdomStreams,
        state.globalData,
        state.config,
      ]);

      const emergentPatterns: EmergentPattern[] = patterns.map(
        (pattern, index) => ({
          id: `pattern_${Date.now()}_${index}`,
          type: pattern.type,
          confidence: pattern.significance || 0.5,
          description: `Detected ${pattern.type}: ${pattern.theme || "Unknown pattern"}`,
          implications: generateImplications(pattern),
          suggested_rituals: suggestRituals(pattern),
        }),
      );

      return {
        ...state,
        emergentPatterns: [
          ...emergentPatterns,
          ...state.emergentPatterns,
        ].slice(0, 50), // Keep last 50
      };

    case CIVICA_ACTIONS.SYSTEM_EVOLUTION:
      // Periodic system evolution based on accumulated wisdom and patterns
      const coherence = PatternEngine.calculateSystemCoherence(
        state.wisdomStreams,
      );
      const newPhase = determineSystemPhase(state.config, coherence);

      return {
        ...state,
        config: {
          ...state.config,
          planetaryPhase: newPhase,
          globalConsciousnessLevel: Math.min(
            1.0,
            state.config.globalConsciousnessLevel + 0.001,
          ),
          systemWisdom: calculateSystemWisdom(state.wisdomStreams),
          harmonyIndex: coherence,
        },
      };

    default:
      return state;
  }
}

// Helper Functions
function calculateRitualImpact(ritual: RitualState): number {
  const participantCount = ritual.participants.length;
  const energyCoherence = ritual.energy.coherence;
  const geometryResonance = ritual.space.geometry.resonance;
  const phaseBonus = ritual.phase === "integration" ? 1.2 : 1.0;

  return participantCount * energyCoherence * geometryResonance * phaseBonus;
}

function extractSacredMarkers(content: string): string[] {
  const markers = [];
  const sacredWords = [
    "blessing",
    "gratitude",
    "love",
    "unity",
    "peace",
    "wisdom",
    "harmony",
    "sacred",
    "divine",
    "holy",
    "blessed",
    "healing",
    "transformation",
    "interconnected",
    "wholeness",
    "balance",
    "truth",
    "compassion",
  ];

  sacredWords.forEach((word) => {
    if (content.toLowerCase().includes(word)) {
      markers.push(word);
    }
  });

  return markers;
}

function calculateSystemWisdom(wisdomStreams: WisdomStream[]): number {
  if (wisdomStreams.length === 0) return 0;

  const avgWisdom =
    wisdomStreams.reduce((sum, stream) => sum + stream.wisdom_level, 0) /
    wisdomStreams.length;
  const diversityBonus =
    new Set(wisdomStreams.map((s) => s.source)).size * 0.01;
  const blessingBonus =
    wisdomStreams.reduce((sum, stream) => sum + stream.blessing_count, 0) *
    0.001;

  return Math.min(1.0, avgWisdom + diversityBonus + blessingBonus);
}

function generateImplications(pattern: any): string[] {
  const implications = [];

  if (pattern.type === "theme_emergence") {
    implications.push(
      `The theme "${pattern.theme}" is gaining collective attention`,
    );
    implications.push(`This suggests a need for focused action in this area`);
    if (pattern.frequency > 10) {
      implications.push(
        "This theme may be ready for manifestation into reality",
      );
    }
  }

  return implications;
}

function suggestRituals(pattern: any): string[] {
  const rituals = [];

  if (pattern.type === "theme_emergence") {
    rituals.push("focus_circle");
    rituals.push("manifestation_ceremony");
    if (pattern.theme.includes("healing")) {
      rituals.push("healing_ceremony");
    }
    if (pattern.theme.includes("wisdom")) {
      rituals.push("wisdom_council");
    }
  }

  return rituals;
}

function determineSystemPhase(
  config: CivicaConfig,
  coherence: number,
): CivicaConfig["planetaryPhase"] {
  const consciousness = config.globalConsciousnessLevel;
  const wisdom = config.systemWisdom;
  const harmony = config.harmonyIndex;

  const overall = (consciousness + wisdom + harmony + coherence) / 4;

  if (overall < 0.3) return "awakening";
  if (overall < 0.6) return "transformation";
  if (overall < 0.8) return "integration";
  return "transcendence";
}

// Provider Component
export const CivicaProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(civicaReducer, initialState);
  const { user } = useSacredAuth();

  // Set active user when authenticated
  useEffect(() => {
    if (user) {
      dispatch({
        type: CIVICA_ACTIONS.SET_ACTIVE_USER,
        payload: user.id,
        timestamp: new Date(),
        source: "auth_system",
      });
    }
  }, [user]);

  // Periodic system evolution
  useEffect(() => {
    const interval = setInterval(() => {
      dispatch({
        type: CIVICA_ACTIONS.SYSTEM_EVOLUTION,
        payload: {},
        timestamp: new Date(),
        source: "system_evolution",
      });
    }, 60000); // Every minute

    return () => clearInterval(interval);
  }, []);

  // Pattern detection
  useEffect(() => {
    const interval = setInterval(() => {
      dispatch({
        type: CIVICA_ACTIONS.DETECT_PATTERNS,
        payload: {},
        timestamp: new Date(),
        source: "pattern_engine",
      });
    }, 30000); // Every 30 seconds

    return () => clearInterval(interval);
  }, []);

  // Context API Methods
  const startRitual = (ritualType: string, intention: string) => {
    dispatch({
      type: CIVICA_ACTIONS.START_RITUAL,
      payload: {
        ritualType,
        intention,
        participants: user
          ? [{ identityId: user.id, role: "facilitator" }]
          : [],
      },
      timestamp: new Date(),
      source: "user_action",
      ritualContext: ritualType,
    });
  };

  const endRitual = () => {
    dispatch({
      type: CIVICA_ACTIONS.END_RITUAL,
      payload: {},
      timestamp: new Date(),
      source: "user_action",
      ritualContext: state.currentRitual?.intention,
    });
  };

  const addWisdomStream = (content: string, source: string) => {
    dispatch({
      type: CIVICA_ACTIONS.ADD_WISDOM_STREAM,
      payload: { content, source },
      timestamp: new Date(),
      source: "wisdom_system",
    });
  };

  const updateGlobalData = (key: string, value: any) => {
    dispatch({
      type: CIVICA_ACTIONS.UPDATE_GLOBAL_DATA,
      payload: { key, value },
      timestamp: new Date(),
      source: "data_update",
    });
  };

  const getSystemCoherence = (): number => {
    return PatternEngine.calculateSystemCoherence([
      ...state.wisdomStreams,
      state.globalData,
    ]);
  };

  const getCurrentPhase = (): string => {
    return state.config.planetaryPhase;
  };

  const isRitualActive = (): boolean => {
    return state.currentRitual !== null;
  };

  const contextValue: CivicaContextType = {
    state,
    dispatch,
    startRitual,
    endRitual,
    addWisdomStream,
    updateGlobalData,
    getSystemCoherence,
    getCurrentPhase,
    isRitualActive,
  };

  return (
    <CivicaContext.Provider value={contextValue}>
      {children}
    </CivicaContext.Provider>
  );
};

// Custom Hook
export const useCivica = (): CivicaContextType => {
  const context = useContext(CivicaContext);
  if (context === undefined) {
    throw new Error("useCivica must be used within a CivicaProvider");
  }
  return context;
};

export default CivicaContext;
