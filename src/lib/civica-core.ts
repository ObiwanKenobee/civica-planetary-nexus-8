// CIVICA 144 Core System Utilities and Constants
// Sacred mathematics, universal constants, and core system functions

import {
  GeometricPattern,
  CivicaConfig,
  FlourishBalance,
} from "@/types/civica";

// Sacred Numbers and Constants
export const SACRED_CONSTANTS = {
  TOTAL_SDGS: 144,
  INTELLIGENCE_CLUSTERS: 12,
  NODES_PER_CLUSTER: 12,
  GOLDEN_RATIO: 1.618033988749,
  FIBONACCI_SEQUENCE: [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144],
  PRIME_RESONANCES: [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47],
  PLANETARY_FREQUENCY: 7.83, // Schumann Resonance
  LUNAR_CYCLES_YEAR: 13,
  ELEMENTS_COUNT: 5, // Earth, Water, Fire, Air, Spirit
  SACRED_DIRECTIONS: 7, // N, S, E, W, Up, Down, Center
  WISDOM_THRESHOLD: 0.618, // Golden ratio threshold for wisdom recognition
  HARMONY_BASELINE: 432, // Hz - Sacred frequency
} as const;

// Sacred Geometry Patterns
export const SACRED_GEOMETRIES: Record<string, GeometricPattern> = {
  FLOWER_OF_LIFE: {
    shape: "flower_of_life",
    resonance: 0.888,
    harmonics: [1, 2, 3, 6, 12, 19],
  },
  SRI_YANTRA: {
    shape: "sri_yantra",
    resonance: 0.963,
    harmonics: [1, 4, 9, 16, 25],
  },
  MANDALA_BASIC: {
    shape: "mandala",
    resonance: 0.777,
    harmonics: [1, 3, 7, 12, 21],
  },
  MERKABA: {
    shape: "merkaba",
    resonance: 0.846,
    harmonics: [1, 2, 4, 8, 16],
  },
  TORUS_FIELD: {
    shape: "torus",
    resonance: 0.925,
    harmonics: [1, 2, 3, 5, 8, 13],
  },
  SPIRAL_COSMIC: {
    shape: "spiral",
    resonance: 0.618,
    harmonics: [1, 1, 2, 3, 5, 8, 13, 21],
  },
} as const;

// Elemental Correspondences
export const ELEMENTAL_SYSTEM = {
  EARTH: {
    direction: "north",
    color: "#4ade80", // green-400
    qualities: ["stability", "manifestation", "abundance", "grounding"],
    sdgClusters: [1, 3, 5], // Planetary, Human Health, Economics
    ritualTools: ["crystal", "stone", "salt", "herbs"],
    frequency: 256,
  },
  WATER: {
    direction: "west",
    color: "#0ea5e9", // sky-500
    qualities: ["flow", "adaptation", "emotion", "purification"],
    sdgClusters: [2, 6, 8], // Social, Cultural, Temporal
    ritualTools: ["bowl", "shell", "water", "tears"],
    frequency: 285,
  },
  FIRE: {
    direction: "south",
    color: "#f97316", // orange-500
    qualities: ["transformation", "passion", "energy", "illumination"],
    sdgClusters: [4, 7, 10], // Technology, Spiritual, Consciousness
    ritualTools: ["candle", "incense", "torch", "mirror"],
    frequency: 396,
  },
  AIR: {
    direction: "east",
    color: "#a855f7", // purple-500
    qualities: ["communication", "intellect", "freedom", "inspiration"],
    sdgClusters: [9, 11, 12], // Multispecies, Networks, Cosmic
    ritualTools: ["feather", "bell", "wand", "breath"],
    frequency: 417,
  },
  SPIRIT: {
    direction: "center",
    color: "#ec4899", // pink-500
    qualities: ["unity", "transcendence", "love", "divine connection"],
    sdgClusters: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], // All clusters
    ritualTools: ["prayer", "meditation", "silence", "presence"],
    frequency: 528,
  },
} as const;

// Lunar Phase Correspondences
export const LUNAR_PHASES = {
  NEW_MOON: {
    phase: "new_moon",
    energy: "intention",
    ritualFocus: "new beginnings",
    flourishMultiplier: 1.0,
    wisdomMultiplier: 1.2,
    bestFor: ["visioning", "planning", "seed planting"],
  },
  WAXING: {
    phase: "waxing",
    energy: "growth",
    ritualFocus: "building momentum",
    flourishMultiplier: 1.3,
    wisdomMultiplier: 1.1,
    bestFor: ["action taking", "skill building", "collaboration"],
  },
  FULL_MOON: {
    phase: "full_moon",
    energy: "manifestation",
    ritualFocus: "celebration and release",
    flourishMultiplier: 1.6,
    wisdomMultiplier: 1.4,
    bestFor: ["major decisions", "community gatherings", "peak work"],
  },
  WANING: {
    phase: "waning",
    energy: "reflection",
    ritualFocus: "gratitude and integration",
    flourishMultiplier: 1.1,
    wisdomMultiplier: 1.5,
    bestFor: ["evaluation", "wisdom sharing", "letting go"],
  },
} as const;

// Time Cycles and Rhythms
export const TEMPORAL_CYCLES = {
  DAILY: {
    dawn: { energy: "awakening", rituals: ["gratitude", "intention setting"] },
    midday: { energy: "action", rituals: ["manifestation", "service"] },
    dusk: { energy: "reflection", rituals: ["integration", "sharing"] },
    midnight: { energy: "mystery", rituals: ["visioning", "deep work"] },
  },
  SEASONAL: {
    spring: { element: "air", focus: "new growth", sdgEmphasis: [1, 2, 9] },
    summer: {
      element: "fire",
      focus: "manifestation",
      sdgEmphasis: [4, 7, 10],
    },
    autumn: { element: "earth", focus: "harvest", sdgEmphasis: [3, 5, 6] },
    winter: { element: "water", focus: "wisdom", sdgEmphasis: [8, 11, 12] },
  },
  GENERATIONAL: {
    "7_years": "personal mastery cycle",
    "21_years": "adult initiation cycle",
    "49_years": "wisdom keeper cycle",
    "147_years": "ancestral wisdom cycle",
  },
} as const;

// Core Utility Functions
export class CivicaMath {
  static fibonacciResonance(value: number): number {
    const fib = SACRED_CONSTANTS.FIBONACCI_SEQUENCE;
    const closest = fib.reduce((prev, curr) =>
      Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev,
    );
    return value / closest;
  }

  static goldenRatioAlignment(value: number): number {
    return Math.abs(value - SACRED_CONSTANTS.GOLDEN_RATIO) < 0.1
      ? 1.618
      : value;
  }

  static calculateSacredHarmonic(frequency: number): number[] {
    const base = frequency;
    return [
      base,
      base * SACRED_CONSTANTS.GOLDEN_RATIO,
      base * 2,
      base * 3,
      base * 5,
      base * 8,
    ];
  }

  static planetaryResonance(localFreq: number): number {
    return localFreq * (SACRED_CONSTANTS.PLANETARY_FREQUENCY / 100);
  }

  static wisdomScore(inputs: {
    experience: number;
    service: number;
    compassion: number;
    understanding: number;
  }): number {
    const { experience, service, compassion, understanding } = inputs;
    const base = (experience + service + compassion + understanding) / 4;
    const fibBonus = this.fibonacciResonance(base) > 1.5 ? 0.2 : 0;
    const goldenBonus =
      Math.abs(base - SACRED_CONSTANTS.GOLDEN_RATIO) < 0.1 ? 0.3 : 0;
    return Math.min(1.0, base + fibBonus + goldenBonus);
  }
}

export class RitualEngine {
  static calculateRitualPower(
    participants: number,
    intention: number,
    harmony: number,
    geometry: GeometricPattern,
  ): number {
    const basepower = participants * intention * harmony;
    const geometryMultiplier = geometry.resonance;
    const harmonicBonus = geometry.harmonics.length * 0.1;
    return basepower * geometryMultiplier * (1 + harmonicBonus);
  }

  static selectOptimalGeometry(
    intention: string,
    participants: number,
  ): GeometricPattern {
    const geometries = Object.values(SACRED_GEOMETRIES);

    // Simple algorithm - can be enhanced with ML
    if (intention.includes("unity") || intention.includes("healing")) {
      return SACRED_GEOMETRIES.FLOWER_OF_LIFE;
    }
    if (intention.includes("manifestation") || intention.includes("creation")) {
      return SACRED_GEOMETRIES.SRI_YANTRA;
    }
    if (
      intention.includes("protection") ||
      intention.includes("transformation")
    ) {
      return SACRED_GEOMETRIES.MERKABA;
    }
    if (intention.includes("flow") || intention.includes("evolution")) {
      return SACRED_GEOMETRIES.SPIRAL_COSMIC;
    }

    return SACRED_GEOMETRIES.MANDALA_BASIC;
  }

  static getCurrentLunarPhase(): keyof typeof LUNAR_PHASES {
    // Simplified lunar phase calculation
    const now = new Date();
    const newMoon = new Date("2024-01-11"); // Reference new moon
    const daysSinceNew = Math.floor(
      (now.getTime() - newMoon.getTime()) / (1000 * 60 * 60 * 24),
    );
    const lunarCycle = daysSinceNew % 29.5;

    if (lunarCycle < 7) return "NEW_MOON";
    if (lunarCycle < 14) return "WAXING";
    if (lunarCycle < 21) return "FULL_MOON";
    return "WANING";
  }

  static getElementalAlignment(
    clusterId: number,
  ): keyof typeof ELEMENTAL_SYSTEM {
    for (const [element, config] of Object.entries(ELEMENTAL_SYSTEM)) {
      if (config.sdgClusters.includes(clusterId)) {
        return element as keyof typeof ELEMENTAL_SYSTEM;
      }
    }
    return "SPIRIT"; // Default to spirit for universal connection
  }
}

export class FlourishEngine {
  static calculateFlourishGeneration(
    contribution: number,
    impact: number,
    harmony: number,
    lunarPhase: keyof typeof LUNAR_PHASES,
    ritualContext?: boolean,
  ): FlourishBalance {
    const base = contribution * impact * harmony;
    const lunarMultiplier = LUNAR_PHASES[lunarPhase].flourishMultiplier;
    const ritualBonus = ritualContext ? 1.5 : 1.0;

    const total = base * lunarMultiplier * ritualBonus;

    // Distribute across flourish types based on sacred proportions
    return {
      wisdom: total * 0.233, // Fibonacci proportion
      regeneration: total * 0.377, // Golden ratio complement
      harmony: total * 0.144, // 144/1000
      creativity: total * 0.123, // Sacred triad
      service: total * 0.123, // Sacred triad
      total,
    };
  }

  static validateTransaction(
    from: FlourishBalance,
    amount: FlourishBalance,
  ): boolean {
    return (
      from.wisdom >= amount.wisdom &&
      from.regeneration >= amount.regeneration &&
      from.harmony >= amount.harmony &&
      from.creativity >= amount.creativity &&
      from.service >= amount.service
    );
  }

  static applyTransaction(
    balance: FlourishBalance,
    amount: FlourishBalance,
    isDebit: boolean,
  ): FlourishBalance {
    const multiplier = isDebit ? -1 : 1;
    return {
      wisdom: balance.wisdom + amount.wisdom * multiplier,
      regeneration: balance.regeneration + amount.regeneration * multiplier,
      harmony: balance.harmony + amount.harmony * multiplier,
      creativity: balance.creativity + amount.creativity * multiplier,
      service: balance.service + amount.service * multiplier,
      total: balance.total + amount.total * multiplier,
    };
  }
}

export class WisdomEngine {
  static evaluateWisdom(content: string, context: string[]): number {
    // Simple wisdom scoring - can be enhanced with AI
    const wisdomKeywords = [
      "compassion",
      "balance",
      "harmony",
      "understanding",
      "service",
      "interconnection",
      "sustainability",
      "regeneration",
      "unity",
      "love",
      "truth",
      "justice",
      "beauty",
      "wisdom",
      "peace",
      "healing",
      "wholeness",
    ];

    const contentLower = content.toLowerCase();
    const keywordMatches = wisdomKeywords.filter((keyword) =>
      contentLower.includes(keyword),
    ).length;

    const contextBonus = context.length * 0.1;
    const lengthPenalty = content.length > 1000 ? 0.1 : 0; // Brevity bonus

    return Math.min(
      1.0,
      keywordMatches / wisdomKeywords.length + contextBonus - lengthPenalty,
    );
  }

  static synthesizeWisdom(sources: string[]): string {
    // Placeholder for wisdom synthesis algorithm
    return `Synthesized wisdom from ${sources.length} sources: Integration of diverse perspectives reveals the interconnected nature of all wisdom traditions.`;
  }
}

export class PatternEngine {
  static detectEmergentPatterns(data: Record<string, any>[]): any[] {
    // Simplified pattern detection - can be enhanced with ML
    const patterns = [];

    // Look for recurring themes
    const themes = new Map<string, number>();
    data.forEach((item) => {
      if (item.theme) {
        themes.set(item.theme, (themes.get(item.theme) || 0) + 1);
      }
    });

    // Find patterns with significant frequency
    for (const [theme, count] of themes.entries()) {
      if (count >= Math.sqrt(data.length)) {
        patterns.push({
          type: "theme_emergence",
          theme,
          frequency: count,
          significance: count / data.length,
        });
      }
    }

    return patterns;
  }

  static calculateSystemCoherence(nodes: any[]): number {
    // Measure how well connected and aligned the system is
    const connections = nodes.reduce(
      (sum, node) => sum + (node.connections?.length || 0),
      0,
    );
    const maxPossibleConnections = nodes.length * (nodes.length - 1);
    const connectivity = connections / maxPossibleConnections;

    const avgProgress =
      nodes.reduce((sum, node) => sum + (node.progress || 0), 0) / nodes.length;
    const progressVariance =
      nodes.reduce(
        (sum, node) => sum + Math.pow((node.progress || 0) - avgProgress, 2),
        0,
      ) / nodes.length;

    const alignment = 1 - progressVariance / 10000; // Normalize variance

    return (connectivity + alignment) / 2;
  }
}

// Default CIVICA Configuration
export const DEFAULT_CIVICA_CONFIG: CivicaConfig = {
  planetaryPhase: "awakening",
  activeRituals: ["dawn_gratitude", "planetary_healing", "wisdom_sharing"],
  globalConsciousnessLevel: 0.47,
  systemWisdom: 0.52,
  harmonyIndex: 0.63,
  regenerationRate: 0.41,
  emergentCapabilities: [
    "multi_species_communication",
    "wisdom_synthesis",
    "collective_decision_making",
    "regenerative_economics",
    "sacred_technology_integration",
  ],
};

// Ritual Templates
export const RITUAL_TEMPLATES = {
  DAWN_GRATITUDE: {
    name: "Dawn Gratitude Circle",
    duration: "20 minutes",
    participants: "1-144",
    elements: ["air", "spirit"],
    geometry: SACRED_GEOMETRIES.MANDALA_BASIC,
    steps: [
      "Form circle facing east",
      "Three breaths with sunrise",
      "Share one gratitude",
      "Silent appreciation",
      "Group blessing",
    ],
  },
  DECISION_COUNCIL: {
    name: "Sacred Decision Council",
    duration: "90 minutes",
    participants: "7-21",
    elements: ["all"],
    geometry: SACRED_GEOMETRIES.FLOWER_OF_LIFE,
    steps: [
      "Sacred space preparation",
      "Intention setting",
      "Perspective sharing",
      "Wisdom synthesis",
      "Consensus building",
      "Commitment ritual",
    ],
  },
  HEALING_CEREMONY: {
    name: "Planetary Healing Ceremony",
    duration: "60 minutes",
    participants: "12-144",
    elements: ["earth", "water", "spirit"],
    geometry: SACRED_GEOMETRIES.SRI_YANTRA,
    steps: [
      "Grounding and centering",
      "Connecting with Earth",
      "Sending healing energy",
      "Receiving Earth wisdom",
      "Integration and commitment",
    ],
  },
} as const;

export default {
  SACRED_CONSTANTS,
  SACRED_GEOMETRIES,
  ELEMENTAL_SYSTEM,
  LUNAR_PHASES,
  TEMPORAL_CYCLES,
  CivicaMath,
  RitualEngine,
  FlourishEngine,
  WisdomEngine,
  PatternEngine,
  DEFAULT_CIVICA_CONFIG,
  RITUAL_TEMPLATES,
};
