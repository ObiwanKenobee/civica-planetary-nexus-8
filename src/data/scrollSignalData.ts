// CIVICA 144 ScrollSignal Data
// Sample data and configurations for the platform

import {
  ScrollSignalConfig,
  CivicScroll,
  CommunityMember,
  SimulationResult,
  CommunityImpact,
  CeremonyType,
  IoTSensorConfig,
  CulturalContext,
  SacredProtocol,
  Tradition,
} from "@/types/scrollSignal";

export const defaultScrollSignalConfig: ScrollSignalConfig = {
  voice: {
    enabled: true,
    languages: ["en", "sw", "es", "fr", "pt", "ar", "hi", "zu"],
    wakeWord: "Sacred Scroll",
    confidence: 0.8,
    noiseReduction: true,
  },
  ai: {
    bedrockModel: "anthropic.claude-3-sonnet",
    sagemakerEndpoint: "civica-scroll-generator",
    amazonQEnabled: true,
    languageSupport: ["en", "sw", "es", "fr", "pt", "ar", "hi", "zu"],
    contextWindow: 100000,
  },
  simulation: {
    edgeComputing: true,
    realTimeSync: true,
    fiveGEnabled: true,
    iotSensors: [
      {
        type: "water_quality",
        location: "Village Well #1",
        frequency: 300, // 5 minutes
        accuracy: 0.95,
        battery: 87,
        connectivity: "5G",
      },
      {
        type: "soil_moisture",
        location: "Community Farm",
        frequency: 1800, // 30 minutes
        accuracy: 0.92,
        battery: 94,
        connectivity: "LoRaWAN",
      },
      {
        type: "air_quality",
        location: "Village Center",
        frequency: 600, // 10 minutes
        accuracy: 0.9,
        battery: 78,
        connectivity: "5G",
      },
    ],
    wavelengthZones: ["Rural Kenya", "Remote Peru", "Northern Ghana"],
  },
  ritual: {
    blessingRequired: true,
    ceremonyTypes: ["blessing_circle", "healing_ritual", "decision_council"],
    elderApproval: true,
    sacredProtocols: [
      {
        name: "Community Scroll Blessing",
        steps: [
          {
            order: 1,
            action: "Form sacred circle",
            performer: "elder",
            duration: 300,
            materials: ["prayer beads", "sacred cloth"],
            energy: "grounding",
          },
          {
            order: 2,
            action: "Read scroll aloud",
            performer: "elder",
            duration: 180,
            materials: ["scroll", "amplification"],
            energy: "raising",
          },
          {
            order: 3,
            action: "Community consent",
            performer: "community_member",
            duration: 600,
            materials: ["consensus stones"],
            energy: "balancing",
          },
        ],
        permissions: ["elder_only", "community_member"],
        restrictions: ["no_commercial_use", "cultural_respect"],
        variations: [
          {
            name: "Emergency Blessing",
            context: "urgent_healthcare",
            modifications: ["shortened_ceremony", "elder_delegation"],
            appropriateness: ["life_threatening", "natural_disaster"],
          },
        ],
      },
    ],
  },
  community: {
    healthcareModule: true,
    educationModule: true,
    environmentModule: true,
    culturalArchive: true,
    multispeciesAwareness: true,
  },
};

export const sampleCommunityMembers: CommunityMember[] = [
  {
    id: "elder_amara",
    name: "Elder Amara",
    role: "elder",
    village: "Kibera Community",
    languages: ["sw", "en"],
    avatar: "👵🏿",
    wisdom: 95,
    contributions: 847,
  },
  {
    id: "healer_kofi",
    name: "Healer Kofi",
    role: "healer",
    village: "Kibera Community",
    languages: ["sw", "en"],
    avatar: "👨🏿‍⚕️",
    wisdom: 88,
    contributions: 432,
  },
  {
    id: "teacher_fatima",
    name: "Teacher Fatima",
    role: "teacher",
    village: "Kibera Community",
    languages: ["sw", "ar", "en"],
    avatar: "👩🏿‍🏫",
    wisdom: 82,
    contributions: 651,
  },
  {
    id: "farmer_john",
    name: "Farmer John",
    role: "farmer",
    village: "Kibera Community",
    languages: ["sw", "en"],
    avatar: "👨🏿‍🌾",
    wisdom: 76,
    contributions: 284,
  },
  {
    id: "guardian_zara",
    name: "Guardian Zara",
    role: "guardian",
    village: "Kibera Community",
    languages: ["sw", "en"],
    avatar: "👩🏿‍💼",
    wisdom: 79,
    contributions: 356,
  },
];

export const sampleCulturalContext: CulturalContext = {
  village: "Kibera Community",
  region: "Nairobi, Kenya",
  language: "Swahili",
  traditions: [
    {
      name: "Water Blessing Ceremony",
      type: "seasonal",
      description: "Blessing of community water sources during rainy season",
      participants: ["elder", "healer", "community_member"],
      frequency: "bi-annual",
      significance: "Ensures pure water and community health",
      variations: ["drought_adaptation", "contamination_response"],
    },
    {
      name: "Harvest Gratitude Circle",
      type: "seasonal",
      description: "Celebration and blessing of successful harvest",
      participants: ["farmer", "elder", "teacher", "child"],
      frequency: "post-harvest",
      significance: "Gratitude to ancestors and nature spirits",
      variations: ["poor_harvest_support", "abundance_sharing"],
    },
  ],
  ancestors: [
    {
      source: "Grandmother Wanjiku",
      teaching: "Water shared in kindness never runs dry",
      context: "Community resource management",
      relevance: 94,
      keeper: sampleCommunityMembers[0],
      verified: true,
    },
  ],
  symbols: [
    {
      symbol: "🌍",
      meaning: "Unity with Earth",
      usage: ["environmental_scrolls", "sustainability_rituals"],
      sacredness: "open",
      variations: [
        {
          context: "water_ceremonies",
          form: "🌊🌍",
          meaning: "Earth-Water Unity",
          appropriateness: "water_related_scrolls",
        },
      ],
    },
  ],
  stories: [
    {
      title: "The Speaking Well",
      type: "teaching",
      teller: sampleCommunityMembers[0],
      audience: ["child", "community_member"],
      moral: "Listen to the wisdom of water",
      symbols: ["💧", "👂", "🌍"],
      versions: [
        {
          variant: "Children's Version",
          context: "education",
          modifications: ["simplified_language", "interactive_elements"],
          appropriateness: ["age_5_to_12", "school_setting"],
        },
      ],
    },
  ],
};

export const sampleScrolls: CivicScroll[] = [
  {
    id: "scroll_health_001",
    title: "Community Well Water Quality Alert",
    content:
      "The water spirits whisper of changes in our sacred well. Grandmother Amara felt the shift in her morning prayers. The IoT sensors confirm: mineral levels shifting. Let us gather at sunset to bless new purification protocols.",
    type: "healthcare",
    status: "blessed",
    createdBy: sampleCommunityMembers[1], // Healer Kofi
    createdAt: new Date("2024-01-15T08:30:00Z"),
    lastModified: new Date("2024-01-15T18:45:00Z"),
    voiceInput: {
      audioUrl: "/audio/health_scroll_001.wav",
      transcript:
        "The water in the well tastes different. People are getting stomach problems.",
      language: "sw",
      confidence: 0.92,
      duration: 15.3,
      waveform: [0.2, 0.5, 0.8, 0.6, 0.3, 0.7, 0.4],
    },
    aiGenerated: true,
    blessings: [
      {
        id: "blessing_001",
        blessedBy: sampleCommunityMembers[0], // Elder Amara
        type: "elder_wisdom",
        timestamp: new Date("2024-01-15T18:00:00Z"),
        intention: "Protection and healing for our community",
        power: 92,
      },
    ],
    simulation: {
      id: "sim_health_001",
      scenario: "Water quality intervention",
      predictions: [
        {
          aspect: "Community health",
          likelihood: 0.87,
          impact: "high",
          timeline: "48 hours",
          mitigation: [
            "boil_water",
            "alternative_source",
            "purification_tablets",
          ],
        },
      ],
      confidence: 0.89,
      timeHorizon: "7 days",
      factors: [
        {
          type: "environmental",
          name: "mineral_contamination",
          weight: 0.8,
          currentValue: 0.23,
          trend: "increasing",
        },
      ],
      multispeciesImpact: [
        {
          species: "livestock",
          impact: "negative",
          severity: 0.6,
          timeframe: "24-72 hours",
          mitigation: ["alternative_water_source", "veterinary_care"],
        },
      ],
      recommendations: [
        {
          priority: "immediate",
          action: "Deploy water purification tablets",
          resources: ["purification_tablets", "distribution_team"],
          responsibility: ["healer", "guardian"],
          blessing: true,
        },
      ],
    },
    communityImpact: {
      healthcare: {
        livesAffected: 342,
        severityReduction: 0.78,
        accessImprovement: 0.85,
        preventionEffectiveness: 0.92,
        healerWorkload: "increased",
      },
      education: {
        studentsAffected: 67,
        learningImprovement: 0.0,
        accessIncrease: 0.0,
        culturalPreservation: 0.15,
        teacherSupport: "maintained",
      },
      environment: {
        ecosystemHealth: 0.23,
        waterQuality: 0.45,
        soilHealth: 0.78,
        biodiversity: 0.82,
        climateResilience: 0.86,
        sustainability: "neutral",
      },
      culture: {
        traditionPreservation: 0.91,
        intergenerationalTransfer: 0.88,
        languageVitality: 0.92,
        ceremonyIntegrity: 0.95,
        communityBonding: 0.94,
        wisdomDocumentation: "enhanced",
      },
      overall: {
        sdgScore: 87,
        communityWellbeing: 0.82,
        sustainability: 0.78,
        resilience: 0.85,
        harmony: 0.91,
        risk: "medium",
      },
    },
    sdgAlignment: [
      {
        goal: 3,
        target: "3.3 - End epidemics and combat communicable diseases",
        alignment: 0.92,
        contribution:
          "Preventing waterborne illness through early detection and intervention",
        metrics: [
          {
            indicator: "Incidence of waterborne diseases",
            baseline: 23,
            projected: 7,
            improvement: 0.7,
            timeline: "30 days",
          },
        ],
      },
      {
        goal: 6,
        target: "6.1 - Universal access to safe and affordable drinking water",
        alignment: 0.89,
        contribution: "Ensuring community water source safety and quality",
        metrics: [
          {
            indicator: "Population with safely managed drinking water",
            baseline: 0.67,
            projected: 0.94,
            improvement: 0.27,
            timeline: "7 days",
          },
        ],
      },
    ],
    ritual: {
      required: true,
      type: "healing_ritual",
      participants: [sampleCommunityMembers[0], sampleCommunityMembers[1]],
      sacredElements: [
        {
          name: "Sacred Water Bowl",
          type: "physical",
          significance: "Represents pure water intention",
          availability: true,
        },
        {
          name: "Healing Chant",
          type: "verbal",
          significance: "Calls upon water spirits for purification",
          availability: true,
        },
      ],
      timing: {
        preferred: "dawn",
        duration: 1800,
        preparation: 900,
        followUp: 600,
      },
      protocol: defaultScrollSignalConfig.ritual.sacredProtocols[0],
      energy: {
        intention: "Purification and healing",
        frequency: "healing",
        amplitude: 0.85,
        direction: "outward",
        resonance: ["water", "community", "ancestors"],
      },
    },
    culturalContext: sampleCulturalContext,
    metadata: {
      version: 1,
      language: "en",
      translation: [
        {
          language: "sw",
          content:
            "Roho za maji zinaong'ea juu ya mabadiliko katika kisima chetu kitukufu...",
          quality: 0.94,
          translator: "Elder Amara",
          cultural_adaptation: true,
        },
      ],
      accessibility: {
        audioVersion: true,
        visualAids: true,
        simplifiedLanguage: false,
        symbolicRepresentation: true,
        tactileElements: false,
      },
      privacy: {
        level: "community",
        restrictions: ["no_external_sharing_without_consent"],
        anonymization: false,
        retention: 365,
      },
      sharing: {
        withinVillage: true,
        acrossRegion: true,
        globally: false,
        commercial: false,
        research: true,
        educational: true,
      },
      preservation: {
        archival: true,
        blockchain: true,
        physicalCopy: true,
        oralTransmission: true,
        priority: "high",
      },
    },
  },
];

export const ritualSounds = {
  blessing: "/audio/blessing_chimes.wav",
  creation: "/audio/scroll_creation.wav",
  completion: "/audio/ritual_completion.wav",
  ambient: "/audio/sacred_ambient.wav",
  voice_activation: "/audio/voice_wake.wav",
};

export const scrollTemplates = {
  healthcare: {
    structure:
      "🩺 **Health Concern**: {issue}\n🌟 **Sacred Guidance**: {ai_guidance}\n📊 **Community Impact**: {simulation}\n🙏 **Blessing Protocol**: {ritual}",
    prompts: {
      symptoms: "Describe what you or your loved one is experiencing",
      urgency: "How urgent is this situation?",
      preferences: "Any traditional remedies you prefer?",
    },
  },
  education: {
    structure:
      "📚 **Learning Need**: {need}\n✨ **Sacred Knowledge**: {ai_guidance}\n👥 **Community Learning**: {simulation}\n🎓 **Wisdom Blessing**: {ritual}",
    prompts: {
      subject: "What would you like to learn about?",
      age_group: "Who is this learning for?",
      method: "How do you learn best?",
    },
  },
  environment: {
    structure:
      "🌍 **Environmental Concern**: {concern}\n🌱 **Sacred Balance**: {ai_guidance}\n🔄 **Ecosystem Impact**: {simulation}\n🌿 **Nature Blessing**: {ritual}",
    prompts: {
      observation: "What changes have you noticed?",
      location: "Where is this happening?",
      species: "Which plants/animals are affected?",
    },
  },
};

export const defaultIoTReadings = [
  {
    sensorId: "water_001",
    type: "water_quality" as const,
    value: 7.2,
    unit: "pH",
    timestamp: new Date(),
    location: "Village Well #1",
    quality: "good" as const,
    alert: false,
  },
  {
    sensorId: "soil_001",
    type: "soil_moisture" as const,
    value: 68,
    unit: "%",
    timestamp: new Date(),
    location: "Community Farm",
    quality: "excellent" as const,
    alert: false,
  },
  {
    sensorId: "air_001",
    type: "air_quality" as const,
    value: 42,
    unit: "AQI",
    timestamp: new Date(),
    location: "Village Center",
    quality: "good" as const,
    alert: false,
  },
];
