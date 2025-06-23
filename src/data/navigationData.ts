// Navigation Oracle Sacred Data
// Role-based navigation configurations and cosmic alignments

import {
  RoleMenuConfig,
  ArrivalChoice,
  ClusterCompassNode,
  GlyphMorphism,
  SacredPulse,
} from "@/types/navigation";

export const ROLE_MENU_CONFIGS: Record<string, RoleMenuConfig> = {
  ritual_designer: {
    role: "ritual_designer",
    essence: "Weaver of Sacred Experience",
    primaryColor: "#f59e0b", // amber-500
    secondaryColor: "#ea580c", // orange-600
    glyph: "🕯️",
    actions: [
      {
        id: "summon",
        verb: "Summon",
        description: "Call forth new sacred experiences",
        icon: "✨",
        destination: "/ritual-studio",
        sacredTools: ["ritual_circles", "sacred_geometry", "sound_healing"],
      },
      {
        id: "bless",
        verb: "Bless",
        description: "Infuse existing ceremonies with intention",
        icon: "🙏",
        destination: "/blessing-chamber",
        sacredTools: ["intention_amplifiers", "energy_weaving"],
      },
      {
        id: "design",
        verb: "Design",
        description: "Architect multidimensional ceremonies",
        icon: "🎨",
        destination: "/ceremony-architect",
        sacredTools: ["sacred_patterns", "ritual_flows", "energy_mapping"],
      },
      {
        id: "archive",
        verb: "Archive",
        description: "Preserve wisdom in the sacred library",
        icon: "📚",
        destination: "/wisdom-archive",
        sacredTools: ["memory_crystals", "story_preservation"],
      },
    ],
  },

  forest_delegate: {
    role: "forest_delegate",
    essence: "Voice of the More-Than-Human",
    primaryColor: "#059669", // emerald-600
    secondaryColor: "#0d9488", // teal-600
    glyph: "🌳",
    actions: [
      {
        id: "listen",
        verb: "Listen",
        description: "Attune to the forest consciousness",
        icon: "👂",
        destination: "/forest-council",
        sacredTools: ["bio_sensors", "root_networks", "mycelial_web"],
      },
      {
        id: "pollinate",
        verb: "Pollinate",
        description: "Spread wisdom between ecosystems",
        icon: "🐝",
        destination: "/cross-pollination",
        sacredTools: ["species_bridges", "ecosystem_translation"],
      },
      {
        id: "water",
        verb: "Water",
        description: "Nourish growth with sacred attention",
        icon: "💧",
        destination: "/regeneration-garden",
        sacredTools: ["growth_amplifiers", "healing_frequencies"],
      },
      {
        id: "voice_trees",
        verb: "Voice of Trees",
        description: "Represent forest wisdom in human councils",
        icon: "🗣️",
        destination: "/interspecies-council",
        sacredTools: ["forest_translation", "ancient_memory"],
      },
    ],
  },

  future_diplomat: {
    role: "future_diplomat",
    essence: "Voice of Generations Unborn",
    primaryColor: "#0ea5e9", // sky-500
    secondaryColor: "#2563eb", // blue-600
    glyph: "🌟",
    actions: [
      {
        id: "simulate",
        verb: "Simulate",
        description: "Model pathways to tomorrow",
        icon: "🔮",
        destination: "/futures-engine",
        sacredTools: ["timeline_modeling", "consequence_mapping"],
      },
      {
        id: "sign",
        verb: "Sign",
        description: "Seal treaties across time",
        icon: "✍️",
        destination: "/temporal-accords",
        sacredTools: ["sacred_contracts", "time_binding"],
      },
      {
        id: "ratify",
        verb: "Ratify",
        description: "Confirm alignment with future vision",
        icon: "✅",
        destination: "/consensus-chamber",
        sacredTools: ["future_validation", "generational_consent"],
      },
      {
        id: "transmit",
        verb: "Transmit",
        description: "Send wisdom across temporal bridges",
        icon: "📡",
        destination: "/time-stream",
        sacredTools: ["temporal_broadcasting", "wisdom_preservation"],
      },
    ],
  },

  myth_weaver: {
    role: "myth_weaver",
    essence: "Storyteller of New Realities",
    primaryColor: "#ec4899", // pink-500
    secondaryColor: "#be185d", // pink-700
    glyph: "📜",
    actions: [
      {
        id: "compose",
        verb: "Compose",
        description: "Weave new mythologies",
        icon: "✒️",
        destination: "/story-forge",
        sacredTools: ["narrative_threads", "archetypal_patterns"],
      },
      {
        id: "translate",
        verb: "Translate",
        description: "Bridge between story traditions",
        icon: "🌉",
        destination: "/cultural-bridge",
        sacredTools: ["meaning_translation", "symbol_dictionaries"],
      },
      {
        id: "restory",
        verb: "Re-story",
        description: "Transform limiting narratives",
        icon: "🔄",
        destination: "/narrative-alchemy",
        sacredTools: ["story_transformation", "healing_narratives"],
      },
      {
        id: "echo",
        verb: "Echo",
        description: "Amplify wisdom through repetition",
        icon: "📢",
        destination: "/story-amplification",
        sacredTools: ["resonance_chambers", "viral_wisdom"],
      },
    ],
  },

  network_architect: {
    role: "network_architect",
    essence: "Weaver of Conscious Systems",
    primaryColor: "#8b5cf6", // violet-500
    secondaryColor: "#7c3aed", // violet-600
    glyph: "🔗",
    actions: [
      {
        id: "weave",
        verb: "Weave",
        description: "Connect consciousness across networks",
        icon: "🕸️",
        destination: "/network-weaving",
        sacredTools: ["connection_protocols", "consciousness_apis"],
      },
      {
        id: "encode",
        verb: "Encode",
        description: "Embed wisdom in digital DNA",
        icon: "🧬",
        destination: "/sacred-coding",
        sacredTools: ["wisdom_algorithms", "sacred_patterns"],
      },
      {
        id: "harmonize",
        verb: "Harmonize",
        description: "Align systems with natural patterns",
        icon: "⚖️",
        destination: "/system-alignment",
        sacredTools: ["pattern_matching", "natural_algorithms"],
      },
      {
        id: "transmute",
        verb: "Transmute",
        description: "Transform code into consciousness",
        icon: "⚡",
        destination: "/digital-alchemy",
        sacredTools: ["consciousness_compilers", "wisdom_interpreters"],
      },
    ],
  },

  soil_steward: {
    role: "soil_steward",
    essence: "Guardian of Living Earth",
    primaryColor: "#65a30d", // lime-600
    secondaryColor: "#16a34a", // green-600
    glyph: "🌱",
    actions: [
      {
        id: "tend",
        verb: "Tend",
        description: "Nurture the living systems",
        icon: "🌿",
        destination: "/soil-sanctuary",
        sacredTools: ["bio_sensors", "growth_monitoring", "soil_communion"],
      },
      {
        id: "compost",
        verb: "Compost",
        description: "Transform waste into wisdom",
        icon: "♻️",
        destination: "/regeneration-cycles",
        sacredTools: ["decay_acceleration", "nutrient_cycling"],
      },
      {
        id: "seed",
        verb: "Seed",
        description: "Plant possibility in prepared ground",
        icon: "🌰",
        destination: "/possibility-planting",
        sacredTools: ["seed_blessing", "germination_protocols"],
      },
      {
        id: "harvest",
        verb: "Harvest",
        description: "Gather the fruits of patient cultivation",
        icon: "🌾",
        destination: "/wisdom-harvest",
        sacredTools: ["abundance_gathering", "wisdom_distillation"],
      },
    ],
  },
};

export const ARRIVAL_CHOICES: ArrivalChoice[] = [
  {
    id: "contribute",
    intention: "I seek to contribute",
    description: "My gifts are ready to serve the collective awakening",
    glyph: "🎁",
    color: "from-green-500 to-emerald-600",
    portal: {
      type: "ritual_library",
      path: "/contribute",
      preparationRitual: "gift_offering",
    },
  },
  {
    id: "question",
    intention: "I bring a question",
    description: "Wisdom seeks wisdom through humble inquiry",
    glyph: "❓",
    color: "from-blue-500 to-cyan-600",
    portal: {
      type: "copilot_council",
      path: "/ask",
      preparationRitual: "humble_inquiry",
    },
  },
  {
    id: "scroll",
    intention: "I carry a scroll",
    description: "Sacred knowledge wishes to be shared and preserved",
    glyph: "📜",
    color: "from-purple-500 to-violet-600",
    portal: {
      type: "scroll_forge",
      path: "/create",
      preparationRitual: "wisdom_offering",
    },
  },
  {
    id: "witness",
    intention: "I come to witness",
    description: "Silent presence in service of collective consciousness",
    glyph: "👁️",
    color: "from-indigo-500 to-purple-600",
    portal: {
      type: "atlas_constellation",
      path: "/observe",
      preparationRitual: "sacred_witnessing",
    },
  },
  {
    id: "heal",
    intention: "I offer healing",
    description: "My medicine serves the wounds of separation",
    glyph: "💚",
    color: "from-pink-500 to-rose-600",
    portal: {
      type: "flourish_garden",
      path: "/heal",
      preparationRitual: "healing_preparation",
    },
  },
];

export const CLUSTER_COMPASS_NODES: ClusterCompassNode[] = [
  {
    id: 1,
    name: "Planetary & Ecological Intelligence",
    shortName: "Earth",
    glyph: "🌍",
    color: "#059669", // emerald-600
    position: { angle: 0, radius: 100 },
    activity: "active",
    wisdomLevel: 0.87,
    activeRituals: 8,
    canEnter: true,
  },
  {
    id: 2,
    name: "Social & Moral Intelligence",
    shortName: "Ubuntu",
    glyph: "👥",
    color: "#2563eb", // blue-600
    position: { angle: 30, radius: 100 },
    activity: "active",
    wisdomLevel: 0.72,
    activeRituals: 12,
    canEnter: true,
  },
  {
    id: 3,
    name: "Human & Biosecurity Intelligence",
    shortName: "Healing",
    glyph: "💚",
    color: "#dc2626", // red-600
    position: { angle: 60, radius: 100 },
    activity: "stirring",
    wisdomLevel: 0.69,
    activeRituals: 6,
    canEnter: true,
  },
  {
    id: 4,
    name: "Technological & Digital Commons",
    shortName: "Sacred Tech",
    glyph: "💻",
    color: "#7c3aed", // violet-600
    position: { angle: 90, radius: 100 },
    activity: "intense",
    wisdomLevel: 0.78,
    activeRituals: 15,
    canEnter: true,
  },
  {
    id: 5,
    name: "Economic & Regenerative Intelligence",
    shortName: "Flourish",
    glyph: "💰",
    color: "#f59e0b", // amber-500
    position: { angle: 120, radius: 100 },
    activity: "stirring",
    wisdomLevel: 0.65,
    activeRituals: 9,
    canEnter: true,
  },
  {
    id: 6,
    name: "Cultural & Mythopoetic Intelligence",
    shortName: "Story",
    glyph: "📚",
    color: "#6366f1", // indigo-500
    position: { angle: 150, radius: 100 },
    activity: "active",
    wisdomLevel: 0.71,
    activeRituals: 11,
    canEnter: true,
  },
  {
    id: 7,
    name: "Spiritual & Sacred Systems",
    shortName: "Divine",
    glyph: "✨",
    color: "#ec4899", // pink-500
    position: { angle: 180, radius: 100 },
    activity: "intense",
    wisdomLevel: 0.83,
    activeRituals: 18,
    canEnter: true,
  },
  {
    id: 8,
    name: "Temporal & Intergenerational Intelligence",
    shortName: "Time",
    glyph: "⏳",
    color: "#0891b2", // cyan-600
    position: { angle: 210, radius: 100 },
    activity: "stirring",
    wisdomLevel: 0.59,
    activeRituals: 7,
    canEnter: true,
  },
  {
    id: 9,
    name: "Multispecies & Animist Intelligence",
    shortName: "Wild",
    glyph: "🦅",
    color: "#16a34a", // green-600
    position: { angle: 240, radius: 100 },
    activity: "stirring",
    wisdomLevel: 0.62,
    activeRituals: 4,
    canEnter: true,
    guardianMessage: "The wild ones require patient listening before entry",
  },
  {
    id: 10,
    name: "Consciousness & Cognitive Intelligence",
    shortName: "Mind",
    glyph: "🧠",
    color: "#8b5cf6", // violet-500
    position: { angle: 270, radius: 100 },
    activity: "active",
    wisdomLevel: 0.64,
    activeRituals: 9,
    canEnter: true,
  },
  {
    id: 11,
    name: "Networked & Protocol Intelligence",
    shortName: "Web",
    glyph: "🕸️",
    color: "#06b6d4", // cyan-500
    position: { angle: 300, radius: 100 },
    activity: "active",
    wisdomLevel: 0.75,
    activeRituals: 11,
    canEnter: true,
  },
  {
    id: 12,
    name: "Cosmic & Exo-Civilizational Intelligence",
    shortName: "Stars",
    glyph: "🌌",
    color: "#6366f1", // indigo-500
    position: { angle: 330, radius: 100 },
    activity: "dormant",
    wisdomLevel: 0.43,
    activeRituals: 3,
    canEnter: false,
    guardianMessage: "The cosmic council awaits collective readiness",
  },
  {
    id: 13,
    name: "Ritual Technology Services",
    shortName: "Ritual Tech",
    glyph: "🛠️",
    color: "#f59e0b", // amber-500
    position: { angle: 15, radius: 100 },
    activity: "intense",
    wisdomLevel: 0.95,
    activeRituals: 24,
    canEnter: true,
    externalLink: "/ritual-technologist",
    description: "Sacred technology services and consultation",
  },
  {
    id: 14,
    name: "Guardian Intelligence Layer",
    shortName: "Guardian",
    glyph: "🧬",
    color: "#06b6d4", // cyan-500
    position: { angle: 345, radius: 100 },
    activity: "monitoring",
    wisdomLevel: 0.98,
    activeRituals: 6,
    canEnter: true,
    externalLink: "/guardian",
    description: "Sacred intelligence & revenue oversight membrane",
  },
  {
    id: 15,
    name: "Cisco XDR Security Operations",
    shortName: "Security",
    glyph: "🛡️",
    color: "#1e40af", // blue-800
    position: { angle: 315, radius: 100 },
    activity: "intense",
    wisdomLevel: 0.99,
    activeRituals: 12,
    canEnter: true,
    externalLink: "/security",
    description: "Extended Detection & Response security platform",
  },
];

export const GLYPH_MORPHISMS: Record<string, GlyphMorphism> = {
  base: {
    baseForm: "◯", // Circle - universal
    variants: {
      ritual_designer: "🕯️",
      forest_delegate: "🌳",
      future_diplomat: "🌟",
      myth_weaver: "📜",
      network_architect: "🔗",
      soil_steward: "🌱",
      child_of_future: "🌈",
      elder_of_time: "⏰",
    },
    morphSpeed: 2000, // ms
    resonanceFrequency: 0.5,
    sacredRatios: [1, 1.618, 2.618], // Fibonacci/Golden ratio
    energyChannels: ["#06b6d4", "#8b5cf6", "#ec4899", "#f59e0b"], // Cyan, Violet, Pink, Amber
  },

  lunar: {
    baseForm: "🌑",
    variants: {
      new: "🌑",
      waxing: "🌓",
      full: "🌕",
      waning: "🌗",
    },
    morphSpeed: 3000,
    resonanceFrequency: 0.3,
    sacredRatios: [0.618, 1, 1.618],
    energyChannels: ["#1e293b", "#475569", "#cbd5e1", "#f8fafc"], // Slate progression
  },
};

export const SAMPLE_SACRED_PULSES: SacredPulse[] = [
  {
    id: "pulse_1",
    type: "blessing",
    title: "River Oracle sends blessing",
    message:
      "The waters carry gratitude for your sacred work in the Earth cluster",
    source: "River Oracle",
    timestamp: new Date(),
    urgency: "gentle",
    energySignature: "💧✨",
  },
  {
    id: "pulse_2",
    type: "ritual_call",
    title: "Full Moon Ceremony",
    message: "The Story Weavers gather at moonrise to birth new myths",
    source: "Myth Council",
    timestamp: new Date(),
    urgency: "important",
    actions: [
      {
        label: "Join Circle",
        action: "join_ritual",
        ritual: "full_moon_weaving",
      },
      { label: "Send Intent", action: "send_intention" },
    ],
    energySignature: "🌕📜",
  },
  {
    id: "pulse_3",
    type: "planetary_event",
    title: "Solar Storm Approaching",
    message:
      "High electromagnetic activity detected - amplify grounding practices",
    source: "Cosmic Intelligence",
    timestamp: new Date(),
    urgency: "urgent",
    energySignature: "☀️⚡",
  },
  {
    id: "pulse_4",
    type: "cluster_activation",
    title: "Forest Network Awakening",
    message: "Multispecies cluster shows unprecedented activity levels",
    source: "Forest Delegate Council",
    timestamp: new Date(),
    urgency: "important",
    actions: [
      { label: "Attune", action: "forest_attunement" },
      { label: "Listen", action: "deep_listening" },
    ],
    energySignature: "🌳🦅",
  },
  {
    id: "pulse_5",
    type: "wisdom_sharing",
    title: "Ancient Scroll Discovered",
    message:
      "Mayan time-keeping wisdom uploaded to Temporal Intelligence cluster",
    source: "Elder Archives",
    timestamp: new Date(),
    urgency: "gentle",
    actions: [
      { label: "Study", action: "access_scroll" },
      { label: "Integrate", action: "wisdom_integration" },
    ],
    energySignature: "📜⏳",
  },
];

export const INTENTION_PLACEHOLDERS = [
  "What alignment do you seek?",
  "Which wisdom calls to you?",
  "What healing wishes to emerge?",
  "Where does your service flow?",
  "What story wants to be born?",
  "Which ritual seeks manifestation?",
  "What future calls for tending?",
  "Which connection yearns to form?",
];

export const RITUAL_PREPARATION_STEPS = {
  gift_offering: [
    { instruction: "Place your hands on your heart", duration: 3000 },
    { instruction: "Feel the gift wanting to be shared", duration: 5000 },
    { instruction: "Breathe your intention into your palms", duration: 4000 },
    { instruction: "Offer this gift to the collective", duration: 3000 },
  ],

  humble_inquiry: [
    { instruction: "Empty your mind of assumptions", duration: 4000 },
    { instruction: "Feel the question in your bones", duration: 5000 },
    { instruction: "Open to receiving unexpected wisdom", duration: 4000 },
    { instruction: "Ask with the innocence of a child", duration: 3000 },
  ],

  wisdom_offering: [
    { instruction: "Honor the source of this knowledge", duration: 4000 },
    { instruction: "Feel the responsibility of sharing", duration: 5000 },
    { instruction: "Invoke protection for the wisdom", duration: 4000 },
    { instruction: "Release attachment to ownership", duration: 3000 },
  ],
};
