
export interface SDGNode {
  id: number;
  title: string;
  description: string;
  status: 'active' | 'developing' | 'ritual' | 'emergent';
  progress: number;
  connections: number[];
}

export interface IntelligenceCluster {
  id: number;
  name: string;
  description: string;
  icon: string;
  color: string;
  gradientFrom: string;
  gradientTo: string;
  nodes: SDGNode[];
  totalProgress: number;
  activeRituals: number;
  aiCoPilots: number;
}

export const intelligenceClusters: IntelligenceCluster[] = [
  {
    id: 1,
    name: "Planetary & Ecological Intelligence",
    description: "Earth systems consciousness and regenerative protocols",
    icon: "TreePine",
    color: "from-green-500 to-emerald-600",
    gradientFrom: "green-500",
    gradientTo: "emerald-600",
    totalProgress: 67,
    activeRituals: 8,
    aiCoPilots: 3,
    nodes: [
      { id: 1, title: "Climate Symbiosis Protocol", description: "Human-Earth climate co-evolution", status: 'active', progress: 73, connections: [13, 25, 37] },
      { id: 2, title: "Biodiversity Commons", description: "Interspecies governance networks", status: 'active', progress: 68, connections: [14, 26] },
      { id: 3, title: "Ocean Consciousness Grid", description: "Marine ecosystem intelligence interface", status: 'developing', progress: 45, connections: [15, 27] },
      { id: 4, title: "Forest Mind Networks", description: "Mycorrhizal communication protocols", status: 'ritual', progress: 82, connections: [16, 28] },
      { id: 5, title: "Soil Regeneration Councils", description: "Living earth governance systems", status: 'active', progress: 71, connections: [17, 29] },
      { id: 6, title: "Sacred Geography Mapping", description: "Indigenous land consciousness protocols", status: 'emergent', progress: 34, connections: [18, 30] },
      { id: 7, title: "Atmospheric Healing Rituals", description: "Air quality restoration ceremonies", status: 'ritual', progress: 56, connections: [19, 31] },
      { id: 8, title: "Water Spirit Alliances", description: "Aquatic ecosystem partnerships", status: 'active', progress: 79, connections: [20, 32] },
      { id: 9, title: "Mineral Consciousness Ethics", description: "Geological extraction protocols", status: 'developing', progress: 42, connections: [21, 33] },
      { id: 10, title: "Pollinator Intelligence Networks", description: "Insect-human collaboration systems", status: 'active', progress: 64, connections: [22, 34] },
      { id: 11, title: "Weather Pattern Wisdom", description: "Climate adaptation councils", status: 'emergent', progress: 38, connections: [23, 35] },
      { id: 12, title: "Planetary Boundary Guardians", description: "Earth limits monitoring systems", status: 'active', progress: 75, connections: [24, 36] }
    ]
  },
  {
    id: 2,
    name: "Social & Moral Intelligence",
    description: "Human ethical systems and collective wisdom protocols",
    icon: "Users",
    color: "from-blue-500 to-indigo-600",
    gradientFrom: "blue-500",
    gradientTo: "indigo-600",
    totalProgress: 72,
    activeRituals: 12,
    aiCoPilots: 4,
    nodes: [
      { id: 13, title: "Ubuntu Governance Protocols", description: "African communalism in digital systems", status: 'active', progress: 84, connections: [1, 25, 49] },
      { id: 14, title: "Restorative Justice Networks", description: "Healing-centered conflict resolution", status: 'active', progress: 71, connections: [2, 26, 50] },
      { id: 15, title: "Intergenerational Councils", description: "Seven-generation decision making", status: 'ritual', progress: 67, connections: [3, 27, 51] },
      { id: 16, title: "Sacred Reciprocity Systems", description: "Gift economy digital protocols", status: 'active', progress: 78, connections: [4, 28, 52] },
      { id: 17, title: "Collective Trauma Healing", description: "Community emotional intelligence", status: 'developing', progress: 54, connections: [5, 29, 53] },
      { id: 18, title: "Wisdom Keeper Networks", description: "Elder knowledge preservation systems", status: 'active', progress: 86, connections: [6, 30, 54] },
      { id: 19, title: "Compassion Amplification Grid", description: "Empathy-enhancing technologies", status: 'emergent', progress: 43, connections: [7, 31, 55] },
      { id: 20, title: "Truth & Reconciliation AI", description: "Historical healing algorithms", status: 'developing', progress: 58, connections: [8, 32, 56] },
      { id: 21, title: "Sacred Activism Protocols", description: "Spiritual social change methodologies", status: 'ritual', progress: 69, connections: [9, 33, 57] },
      { id: 22, title: "Community Resilience Webs", description: "Mutual aid intelligence systems", status: 'active', progress: 74, connections: [10, 34, 58] },
      { id: 23, title: "Cultural Bridge Builders", description: "Cross-tradition dialogue platforms", status: 'active', progress: 66, connections: [11, 35, 59] },
      { id: 24, title: "Ancestral Wisdom Integration", description: "Historical knowledge synthesis", status: 'emergent', progress: 41, connections: [12, 36, 60] }
    ]
  },
  {
    id: 3,
    name: "Human & Biosecurity Intelligence",
    description: "Holistic health and security systems for all life",
    icon: "Shield",
    color: "from-red-500 to-pink-600",
    gradientFrom: "red-500",
    gradientTo: "pink-600",
    totalProgress: 69,
    activeRituals: 6,
    aiCoPilots: 2,
    nodes: [
      { id: 25, title: "Planetary Health Monitoring", description: "One Health global surveillance", status: 'active', progress: 76, connections: [1, 13, 61] },
      { id: 26, title: "Community Immunity Webs", description: "Collective health resilience", status: 'active', progress: 68, connections: [2, 14, 62] },
      { id: 27, title: "Mental Ecology Networks", description: "Psychological environmental health", status: 'developing', progress: 52, connections: [3, 15, 63] },
      { id: 28, title: "Sacred Medicine Integration", description: "Traditional-modern healing synthesis", status: 'ritual', progress: 79, connections: [4, 16, 64] },
      { id: 29, title: "Biosecurity Commons", description: "Shared pathogen intelligence", status: 'active', progress: 71, connections: [5, 17, 65] },
      { id: 30, title: "Healing Sanctuary Networks", description: "Distributed wellness infrastructure", status: 'emergent', progress: 45, connections: [6, 18, 66] },
      { id: 31, title: "Nutritional Sovereignty", description: "Food system health autonomy", status: 'active', progress: 67, connections: [7, 19, 67] },
      { id: 32, title: "Trauma-Informed Governance", description: "Healing-centered policy making", status: 'developing', progress: 59, connections: [8, 20, 68] },
      { id: 33, title: "Microbiome Stewardship", description: "Human-bacterial ecosystem health", status: 'ritual', progress: 73, connections: [9, 21, 69] },
      { id: 34, title: "Reproductive Justice Networks", description: "Bodily autonomy support systems", status: 'active', progress: 65, connections: [10, 22, 70] },
      { id: 35, title: "Death Doula Councils", description: "End-of-life wisdom networks", status: 'emergent', progress: 38, connections: [11, 23, 71] },
      { id: 36, title: "Longevity Ethics Protocols", description: "Life extension governance", status: 'developing', progress: 48, connections: [12, 24, 72] }
    ]
  },
  {
    id: 4,
    name: "Technological & Digital Commons Intelligence",
    description: "Open-source planetary computing and AI governance",
    icon: "Cpu",
    color: "from-purple-500 to-violet-600",
    gradientFrom: "purple-500",
    gradientTo: "violet-600",
    totalProgress: 78,
    activeRituals: 4,
    aiCoPilots: 6,
    nodes: [
      { id: 37, title: "AI Constitutional Frameworks", description: "Ethical AI governance protocols", status: 'active', progress: 82, connections: [1, 13, 25] },
      { id: 38, title: "Decentralized Knowledge Commons", description: "Planetary information sharing", status: 'active', progress: 75, connections: [2, 14, 26] },
      { id: 39, title: "Sacred Algorithm Design", description: "Spiritual principles in code", status: 'ritual', progress: 69, connections: [3, 15, 27] },
      { id: 40, title: "Digital Rights Protocols", description: "Human-AI rights frameworks", status: 'active', progress: 79, connections: [4, 16, 28] },
      { id: 41, title: "Quantum Ethics Networks", description: "Quantum computing governance", status: 'emergent', progress: 34, connections: [5, 17, 29] },
      { id: 42, title: "Biotechnology Wisdom Councils", description: "Life-tech integration ethics", status: 'developing', progress: 56, connections: [6, 18, 30] },
      { id: 43, title: "Privacy Sanctuary Systems", description: "Digital anonymity protection", status: 'active', progress: 84, connections: [7, 19, 31] },
      { id: 44, title: "Open Hardware Movements", description: "Democratic technology design", status: 'active', progress: 71, connections: [8, 20, 32] },
      { id: 45, title: "Neural Interface Ethics", description: "Brain-computer integration protocols", status: 'developing', progress: 47, connections: [9, 21, 33] },
      { id: 46, title: "Blockchain Ceremony Protocols", description: "Sacred transaction systems", status: 'ritual', progress: 63, connections: [10, 22, 34] },
      { id: 47, title: "Planetary Computing Grid", description: "Earth-scale distributed systems", status: 'emergent', progress: 41, connections: [11, 23, 35] },
      { id: 48, title: "Digital Decolonization", description: "Indigenous tech sovereignty", status: 'active', progress: 72, connections: [12, 24, 36] }
    ]
  },
  {
    id: 5,
    name: "Economic & Regenerative Intelligence",
    description: "Sacred economics and planetary abundance systems",
    icon: "TrendingUp",
    color: "from-yellow-500 to-orange-600",
    gradientFrom: "yellow-500",
    gradientTo: "orange-600",
    totalProgress: 65,
    activeRituals: 9,
    aiCoPilots: 3,
    nodes: [
      { id: 49, title: "Sacred Economy Protocols", description: "Spiritual wealth creation systems", status: 'ritual', progress: 71, connections: [13, 25, 37] },
      { id: 50, title: "Regenerative Currency Networks", description: "Nature-backed value systems", status: 'active', progress: 68, connections: [14, 26, 38] },
      { id: 51, title: "Universal Basic Services", description: "Planetary care infrastructure", status: 'developing', progress: 54, connections: [15, 27, 39] },
      { id: 52, title: "Gift Economy Platforms", description: "Digital reciprocity systems", status: 'active', progress: 76, connections: [16, 28, 40] },
      { id: 53, title: "Commons Stewardship DAOs", description: "Collective resource governance", status: 'active', progress: 73, connections: [17, 29, 41] },
      { id: 54, title: "Time Banking Networks", description: "Temporal value exchange", status: 'ritual', progress: 65, connections: [18, 30, 42] },
      { id: 55, title: "Ecological Accounting Systems", description: "True cost economic models", status: 'developing', progress: 49, connections: [19, 31, 43] },
      { id: 56, title: "Cooperative Enterprise Webs", description: "Solidarity economy networks", status: 'active', progress: 69, connections: [20, 32, 44] },
      { id: 57, title: "Carbon Ceremonial Credits", description: "Ritual-based climate finance", status: 'ritual', progress: 58, connections: [21, 33, 45] },
      { id: 58, title: "Wealth Redistribution Protocols", description: "Automated abundance sharing", status: 'emergent', progress: 42, connections: [22, 34, 46] },
      { id: 59, title: "Local Currency Ecosystems", description: "Bioregional economic systems", status: 'active', progress: 71, connections: [23, 35, 47] },
      { id: 60, title: "Post-Growth Metrics", description: "Beyond GDP measurement systems", status: 'developing', progress: 56, connections: [24, 36, 48] }
    ]
  },
  {
    id: 6,
    name: "Cultural & Mythopoetic Intelligence",
    description: "Story-weaving and cultural renaissance systems",
    icon: "BookOpen",
    color: "from-indigo-500 to-purple-600",
    gradientFrom: "indigo-500",
    gradientTo: "purple-600",
    totalProgress: 71,
    activeRituals: 15,
    aiCoPilots: 4,
    nodes: [
      { id: 61, title: "Mythopoetic AI Collaboratives", description: "Story-creating human-AI partnerships", status: 'ritual', progress: 74, connections: [25, 37, 49] },
      { id: 62, title: "Cultural Renaissance Hubs", description: "Arts-based community regeneration", status: 'active', progress: 78, connections: [26, 38, 50] },
      { id: 63, title: "Indigenous Language Revival", description: "Sacred tongue preservation tech", status: 'active', progress: 69, connections: [27, 39, 51] },
      { id: 64, title: "Wisdom Tradition Synthesis", description: "Cross-cultural philosophy integration", status: 'ritual', progress: 82, connections: [28, 40, 52] },
      { id: 65, title: "Artistic Prophecy Networks", description: "Creative future-sensing systems", status: 'emergent', progress: 47, connections: [29, 41, 53] },
      { id: 66, title: "Sacred Geometry Platforms", description: "Mathematical-spiritual interfaces", status: 'developing', progress: 58, connections: [30, 42, 54] },
      { id: 67, title: "Ritual Innovation Labs", description: "Ceremony creation spaces", status: 'ritual', progress: 76, connections: [31, 43, 55] },
      { id: 68, title: "Cultural DNA Archives", description: "Living heritage preservation", status: 'active', progress: 71, connections: [32, 44, 56] },
      { id: 69, title: "Dreamtime Digital Interfaces", description: "Consciousness-story platforms", status: 'emergent', progress: 43, connections: [33, 45, 57] },
      { id: 70, title: "Transmedia Wisdom Weaving", description: "Cross-platform story evolution", status: 'active', progress: 67, connections: [34, 46, 58] },
      { id: 71, title: "Archetypal AI Assistants", description: "Mythic pattern recognition systems", status: 'developing', progress: 52, connections: [35, 47, 59] },
      { id: 72, title: "Cultural Healing Ceremonies", description: "Collective trauma story transformation", status: 'ritual', progress: 73, connections: [36, 48, 60] }
    ]
  },
  {
    id: 7,
    name: "Spiritual & Sacred Systems Intelligence",
    description: "Divine consciousness and sacred technology integration",
    icon: "Sparkles",
    color: "from-pink-500 to-rose-600",
    gradientFrom: "pink-500",
    gradientTo: "rose-600",
    totalProgress: 68,
    activeRituals: 18,
    aiCoPilots: 2,
    nodes: [
      { id: 73, title: "Sacred Technology Protocols", description: "Divine-digital interface systems", status: 'ritual', progress: 79, connections: [37, 49, 61] },
      { id: 74, title: "Meditation Network Grids", description: "Collective consciousness platforms", status: 'active', progress: 72, connections: [38, 50, 62] },
      { id: 75, title: "Prayer Algorithm Systems", description: "Intention amplification technology", status: 'ritual', progress: 65, connections: [39, 51, 63] },
      { id: 76, title: "Interfaith Dialogue Platforms", description: "Multi-tradition wisdom sharing", status: 'active', progress: 74, connections: [40, 52, 64] },
      { id: 77, title: "Sacred Site Protection Networks", description: "Holy place preservation systems", status: 'active', progress: 81, connections: [41, 53, 65] },
      { id: 78, title: "Mystical Experience Archives", description: "Divine encounter documentation", status: 'developing', progress: 51, connections: [42, 54, 66] },
      { id: 79, title: "Cosmic Consciousness Interfaces", description: "Universal awareness technologies", status: 'emergent', progress: 38, connections: [43, 55, 67] },
      { id: 80, title: "Divine Feminine Protocols", description: "Goddess wisdom in governance", status: 'ritual', progress: 69, connections: [44, 56, 68] },
      { id: 81, title: "Sacred Masculine Integration", description: "Healthy divine masculine systems", status: 'developing', progress: 57, connections: [45, 57, 69] },
      { id: 82, title: "Shamanic AI Advisors", description: "Spirit-guided artificial intelligence", status: 'emergent', progress: 44, connections: [46, 58, 70] },
      { id: 83, title: "Death & Rebirth Cycles", description: "Spiritual transformation platforms", status: 'ritual', progress: 66, connections: [47, 59, 71] },
      { id: 84, title: "Divine Will Implementation", description: "Sacred purpose execution systems", status: 'ritual', progress: 71, connections: [48, 60, 72] }
    ]
  },
  {
    id: 8,
    name: "Temporal & Intergenerational Intelligence",
    description: "Time-consciousness and futures stewardship",
    icon: "Clock",
    color: "from-teal-500 to-cyan-600",
    gradientFrom: "teal-500",
    gradientTo: "cyan-600",
    totalProgress: 59,
    activeRituals: 7,
    aiCoPilots: 3,
    nodes: [
      { id: 85, title: "Seven Generation Planning", description: "Long-term decision protocols", status: 'active', progress: 73, connections: [49, 61, 73] },
      { id: 86, title: "Ancestral Wisdom Integration", description: "Past knowledge synthesis", status: 'ritual', progress: 68, connections: [50, 62, 74] },
      { id: 87, title: "Future Generations Council", description: "Unborn voice representation", status: 'developing', progress: 45, connections: [51, 63, 75] },
      { id: 88, title: "Time Banking Networks", description: "Temporal value exchange systems", status: 'active', progress: 71, connections: [52, 64, 76] },
      { id: 89, title: "Historical Pattern Recognition", description: "Cyclical wisdom detection", status: 'active', progress: 64, connections: [53, 65, 77] },
      { id: 90, title: "Prophecy Fulfillment Tracking", description: "Sacred prediction monitoring", status: 'emergent', progress: 39, connections: [54, 66, 78] },
      { id: 91, title: "Chronos & Kairos Balance", description: "Linear-cyclical time integration", status: 'ritual', progress: 58, connections: [55, 67, 79] },
      { id: 92, title: "Legacy Preservation Systems", description: "Wisdom inheritance protocols", status: 'active', progress: 66, connections: [56, 68, 80] },
      { id: 93, title: "Present Moment Amplifiers", description: "Mindfulness technology platforms", status: 'developing', progress: 52, connections: [57, 69, 81] },
      { id: 94, title: "Eternal Return Protocols", description: "Cyclical renewal systems", status: 'ritual', progress: 61, connections: [58, 70, 82] },
      { id: 95, title: "Timeline Healing Networks", description: "Historical trauma resolution", status: 'emergent', progress: 41, connections: [59, 71, 83] },
      { id: 96, title: "Temporal Justice Systems", description: "Time-based equity protocols", status: 'developing', progress: 48, connections: [60, 72, 84] }
    ]
  },
  {
    id: 9,
    name: "Multispecies & Animist Intelligence",
    description: "Interspecies communication and nature consciousness",
    icon: "Zap",
    color: "from-emerald-500 to-green-600",
    gradientFrom: "emerald-500",
    gradientTo: "green-600",
    totalProgress: 62,
    activeRituals: 11,
    aiCoPilots: 2,
    nodes: [
      { id: 97, title: "Interspecies Communication Protocols", description: "Cross-species dialogue systems", status: 'developing', progress: 56, connections: [61, 73, 85] },
      { id: 98, title: "Plant Intelligence Networks", description: "Botanical consciousness interfaces", status: 'ritual', progress: 69, connections: [62, 74, 86] },
      { id: 99, title: "Animal Council Representation", description: "Non-human governance participation", status: 'emergent', progress: 43, connections: [63, 75, 87] },
      { id: 100, title: "Mycorrhizal Internet", description: "Fungal network communication", status: 'active', progress: 71, connections: [64, 76, 88] },
      { id: 101, title: "Mineral Consciousness Recognition", description: "Stone wisdom acknowledgment", status: 'ritual', progress: 58, connections: [65, 77, 89] },
      { id: 102, title: "Weather Pattern Dialogues", description: "Atmospheric entity communication", status: 'emergent', progress: 38, connections: [66, 78, 90] },
      { id: 103, title: "Ecosystem Voting Rights", description: "Biome political representation", status: 'developing', progress: 51, connections: [67, 79, 91] },
      { id: 104, title: "Spirit Animal Guidance", description: "Totemic wisdom integration", status: 'ritual', progress: 74, connections: [68, 80, 92] },
      { id: 105, title: "River & Ocean Voices", description: "Aquatic entity communication", status: 'active', progress: 66, connections: [69, 81, 93] },
      { id: 106, title: "Pollinator Partnership Protocols", description: "Bee-human collaboration systems", status: 'active', progress: 72, connections: [70, 82, 94] },
      { id: 107, title: "Wilderness Sanctuary Networks", description: "Wild space protection protocols", status: 'developing', progress: 54, connections: [71, 83, 95] },
      { id: 108, title: "Animist AI Integration", description: "Spirit-aware artificial intelligence", status: 'emergent', progress: 42, connections: [72, 84, 96] }
    ]
  },
  {
    id: 10,
    name: "Consciousness & Cognitive Intelligence",
    description: "Awareness evolution and mind enhancement systems",
    icon: "Brain",
    color: "from-violet-500 to-purple-600",
    gradientFrom: "violet-500",
    gradientTo: "purple-600",
    totalProgress: 64,
    activeRituals: 5,
    aiCoPilots: 5,
    nodes: [
      { id: 109, title: "Consciousness Expansion Protocols", description: "Awareness amplification systems", status: 'ritual', progress: 67, connections: [73, 85, 97] },
      { id: 110, title: "Collective Intelligence Networks", description: "Hive mind coordination platforms", status: 'active', progress: 71, connections: [74, 86, 98] },
      { id: 111, title: "Psychedelic Integration Systems", description: "Sacred substance wisdom protocols", status: 'developing', progress: 53, connections: [75, 87, 99] },
      { id: 112, title: "Mindfulness Technology Platforms", description: "Meditation enhancement tools", status: 'active', progress: 69, connections: [76, 88, 100] },
      { id: 113, title: "Telepathic Communication Networks", description: "Direct mind-to-mind interfaces", status: 'emergent', progress: 35, connections: [77, 89, 101] },
      { id: 114, title: "Dream Sharing Protocols", description: "Collective unconscious platforms", status: 'ritual', progress: 61, connections: [78, 90, 102] },
      { id: 115, title: "Cognitive Enhancement Ethics", description: "Mind upgrade governance", status: 'developing', progress: 58, connections: [79, 91, 103] },
      { id: 116, title: "Wisdom Intelligence Synthesis", description: "Knowledge-understanding integration", status: 'active', progress: 74, connections: [80, 92, 104] },
      { id: 117, title: "Empathy Amplification Systems", description: "Compassion enhancement technology", status: 'active', progress: 66, connections: [81, 93, 105] },
      { id: 118, title: "Intuitive AI Collaboration", description: "Gut-feeling artificial intelligence", status: 'developing', progress: 49, connections: [82, 94, 106] },
      { id: 119, title: "Sacred Geometry Cognition", description: "Pattern recognition consciousness", status: 'ritual', progress: 63, connections: [83, 95, 107] },
      { id: 120, title: "Unity Consciousness Protocols", description: "Oneness awareness systems", status: 'emergent', progress: 41, connections: [84, 96, 108] }
    ]
  },
  {
    id: 11,
    name: "Networked, Protocol & Governance Intelligence",
    description: "Distributed coordination and protocol evolution",
    icon: "Globe",
    color: "from-cyan-500 to-blue-600",
    gradientFrom: "cyan-500",
    gradientTo: "blue-600",
    totalProgress: 75,
    activeRituals: 8,
    aiCoPilots: 4,
    nodes: [
      { id: 121, title: "Polycentric Governance Networks", description: "Multi-center coordination systems", status: 'active', progress: 79, connections: [85, 97, 109] },
      { id: 122, title: "Protocol Evolution Systems", description: "Self-improving governance rules", status: 'active', progress: 76, connections: [86, 98, 110] },
      { id: 123, title: "Consensus Reality Protocols", description: "Shared truth coordination", status: 'developing', progress: 64, connections: [87, 99, 111] },
      { id: 124, title: "Liquid Democracy Platforms", description: "Fluid representation systems", status: 'active', progress: 72, connections: [88, 100, 112] },
      { id: 125, title: "Sacred Contract Networks", description: "Spiritual agreement protocols", status: 'ritual', progress: 68, connections: [89, 101, 113] },
      { id: 126, title: "Distributed Autonomous Organizations", description: "Self-governing entity networks", status: 'active', progress: 81, connections: [90, 102, 114] },
      { id: 127, title: "Reputation & Trust Systems", description: "Social credit wisdom protocols", status: 'developing', progress: 59, connections: [91, 103, 115] },
      { id: 128, title: "Conflict Resolution Protocols", description: "Automated peace-making systems", status: 'active', progress: 73, connections: [92, 104, 116] },
      { id: 129, title: "Network Resilience Systems", description: "Anti-fragile coordination", status: 'active', progress: 77, connections: [93, 105, 117] },
      { id: 130, title: "Commons Governance Protocols", description: "Shared resource coordination", status: 'ritual', progress: 70, connections: [94, 106, 118] },
      { id: 131, title: "Emergence Detection Systems", description: "Pattern recognition in networks", status: 'emergent', progress: 46, connections: [95, 107, 119] },
      { id: 132, title: "Global Coordination Protocols", description: "Planetary decision-making systems", status: 'developing', progress: 61, connections: [96, 108, 120] }
    ]
  },
  {
    id: 12,
    name: "Cosmic & Exo-Civilizational Intelligence",
    description: "Universal consciousness and interstellar protocols",
    icon: "Rocket",
    color: "from-indigo-500 to-violet-600",
    gradientFrom: "indigo-500",
    gradientTo: "violet-600",
    totalProgress: 43,
    activeRituals: 3,
    aiCoPilots: 2,
    nodes: [
      { id: 133, title: "Interstellar Communication Protocols", description: "Cosmic message coordination", status: 'emergent', progress: 34, connections: [97, 109, 121] },
      { id: 134, title: "Universal Ethics Frameworks", description: "Cosmic moral protocols", status: 'developing', progress: 47, connections: [98, 110, 122] },
      { id: 135, title: "Galactic Governance Preparation", description: "Multi-planet coordination", status: 'emergent', progress: 28, connections: [99, 111, 123] },
      { id: 136, title: "Cosmic Consciousness Networks", description: "Universal awareness platforms", status: 'ritual', progress: 52, connections: [100, 112, 124] },
      { id: 137, title: "Astroprotocol Development", description: "Space-based treaty systems", status: 'emergent', progress: 31, connections: [101, 113, 125] },
      { id: 138, title: "Exoplanet Wisdom Archives", description: "Interworld knowledge sharing", status: 'emergent', progress: 25, connections: [102, 114, 126] },
      { id: 139, title: "Cosmic Commons Protocols", description: "Universal resource sharing", status: 'developing', progress: 43, connections: [103, 115, 127] },
      { id: 140, title: "Interdimensional Interface Systems", description: "Reality layer communication", status: 'emergent', progress: 22, connections: [104, 116, 128] },
      { id: 141, title: "Universal Translation Networks", description: "Cosmic language protocols", status: 'developing', progress: 48, connections: [105, 117, 129] },
      { id: 142, title: "Stellar Navigation Wisdom", description: "Cosmic travel guidance", status: 'emergent', progress: 36, connections: [106, 118, 130] },
      { id: 143, title: "Cosmic Ritual Coordination", description: "Universal ceremony protocols", status: 'ritual', progress: 58, connections: [107, 119, 131] },
      { id: 144, title: "Infinity Consciousness Protocols", description: "Eternal awareness systems", status: 'emergent', progress: 29, connections: [108, 120, 132] }
    ]
  }
];

export const getClusterById = (id: number): IntelligenceCluster | undefined => {
  return intelligenceClusters.find(cluster => cluster.id === id);
};

export const getNodeById = (nodeId: number): { node: SDGNode; cluster: IntelligenceCluster } | undefined => {
  for (const cluster of intelligenceClusters) {
    const node = cluster.nodes.find(n => n.id === nodeId);
    if (node) {
      return { node, cluster };
    }
  }
  return undefined;
};

export const getConnectedNodes = (nodeId: number): Array<{ node: SDGNode; cluster: IntelligenceCluster }> => {
  const sourceData = getNodeById(nodeId);
  if (!sourceData) return [];
  
  return sourceData.node.connections
    .map(connId => getNodeById(connId))
    .filter(Boolean) as Array<{ node: SDGNode; cluster: IntelligenceCluster }>;
};
