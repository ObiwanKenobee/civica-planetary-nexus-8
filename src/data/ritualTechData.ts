// Ritual Technologist External Node Data
// Service offerings, case studies, and sacred business intelligence

import {
  ServiceOffering,
  ServicePackage,
  CaseStudy,
  PersonaArchetype,
  PaymentOption,
  RitualTechProfile,
  BlogPost,
} from "@/types/ritualTech";

export const RITUAL_TECH_PROFILE: RitualTechProfile = {
  name: "Sacred Architect",
  title: "Ritual Technologist & Polycultural System Architect",
  bio: "I weave ancient wisdom with emerging technology, creating interfaces and systems that remember their sacred purpose. My work bridges the digital and mystical realms.",
  mission:
    "To design technology that serves all life, honors indigenous wisdom, and accelerates planetary awakening through conscious code and sacred user experiences.",
  activeArchetypes: [
    {
      title: "Ritual Technologist",
      description: "Designing sacred ceremonies for digital transformation",
      skills: [
        "Sacred UX Design",
        "Ritual Protocol Creation",
        "Intention Architecture",
      ],
      approach:
        "Every technical solution begins with ceremony and ends with integration",
      sacredPrinciples: [
        "Technology as ceremony",
        "Code as prayer",
        "Users as sacred beings",
      ],
      testimonialQuote:
        "They transformed our product launch from a business event into a sacred offering",
      availability: "open",
    },
    {
      title: "Polycultural System Architect",
      description:
        "Building bridges between wisdom traditions and modern systems",
      skills: [
        "Cross-Cultural Protocol Design",
        "Indigenous Tech Integration",
        "Wisdom Synthesis",
      ],
      approach:
        "Honor multiple ways of knowing while creating coherent technological solutions",
      sacredPrinciples: [
        "All traditions have gifts",
        "Technology must serve diversity",
        "Wisdom over efficiency",
      ],
      testimonialQuote:
        "Their framework helped us honor ancestral knowledge while scaling our platform",
      availability: "limited",
    },
  ],
  skills: [
    {
      category: "Sacred Technology",
      skills: [
        {
          name: "React/TypeScript",
          level: 0.95,
          sacredApplication: "Building consciousness-expanding interfaces",
        },
        {
          name: "Sacred UX Design",
          level: 0.9,
          sacredApplication: "User journeys as spiritual paths",
        },
        {
          name: "Ritual Protocol Development",
          level: 0.85,
          sacredApplication: "Digital ceremony architecture",
        },
      ],
      masteryLevel: 0.9,
      yearsExperience: 8,
      ritualIntegration: "Every code commit includes an intention setting",
    },
    {
      category: "Wisdom Integration",
      skills: [
        {
          name: "Indigenous Knowledge Systems",
          level: 0.8,
          sacredApplication: "Honoring traditional wisdom in modern systems",
        },
        {
          name: "AI Ethics & Alignment",
          level: 0.85,
          sacredApplication: "Teaching machines to serve all life",
        },
        {
          name: "Systems Thinking",
          level: 0.9,
          sacredApplication: "Seeing the web of interconnection",
        },
      ],
      masteryLevel: 0.85,
      yearsExperience: 6,
      ritualIntegration: "Weekly wisdom council with diverse perspectives",
    },
  ],
  experience: [
    {
      role: "Senior Ritual UX Architect",
      organization: "Planetary Intelligence Collective",
      duration: "2021 - Present",
      description:
        "Leading the design of sacred technology interfaces for global transformation",
      achievements: [
        "Designed ritual-based authentication for 50,000+ users",
        "Created the Sacred Economy billing framework",
        "Developed the Intelligence Constellation navigation system",
      ],
      ritualElements: [
        "New moon intention setting",
        "Solstice design reviews",
        "Ancestor consultation",
      ],
      sdgContribution: [4, 7, 10, 11, 16],
    },
  ],
  education: [
    {
      institution: "University of Sacred Technology",
      year: "2020",
      focus: "Consciousness & Computing",
      sacredLearning: "How to embed wisdom in algorithms",
      initiations: ["Digital Shamanism", "Techno-Mysticism"],
    },
  ],
  currentAvailability: "available",
  responseTime: "Within 1 sacred day (24 hours)",
  languages: ["English", "Sacred Geometry", "Python", "Love"],
  timezone: "Cosmic Standard Time",
  ritualPhilosophy:
    "Every interaction is an opportunity for transformation. Technology should serve the awakening of consciousness and the healing of our planet.",
  sacredAlignment: [1, 4, 7, 10, 11, 16], // Primary SDG clusters
};

export const SERVICE_OFFERINGS: ServiceOffering[] = [
  {
    id: "ritual_design",
    tier: "entry",
    name: "Ritual Design for Regenerative Teams",
    description:
      "Sacred ceremonies for product launches, team alignment, and organizational transformation",
    longDescription:
      "Transform your business milestones into sacred ceremonies that align your team with purpose, invoke collective wisdom, and create lasting positive change. Each ritual is custom-designed for your specific intention and cultural context.",
    basePrice: 144,
    currency: "USD",
    duration: "1-2 weeks",
    deliverables: [
      "Custom ritual protocol document",
      "Sacred materials list",
      "Facilitation guide",
      "Integration practices",
      "Follow-up alignment check",
    ],
    process: [
      {
        phase: "Sacred Consultation",
        description: "Deep listening to understand your intention and context",
        duration: "60 minutes",
        ritualElement: "Opening circle with smudging",
      },
      {
        phase: "Ritual Architecture",
        description: "Designing the ceremony structure and flow",
        duration: "3-5 days",
        ritualElement: "New moon visioning session",
      },
      {
        phase: "Sacred Documentation",
        description: "Creating detailed ritual protocols and materials",
        duration: "2-3 days",
      },
      {
        phase: "Ceremony Facilitation",
        description: "Leading or supporting the actual ritual",
        duration: "2-4 hours",
        ritualElement: "Full ceremonial facilitation",
      },
    ],
    testimonials: [
      {
        author: "Maya Chen",
        role: "CEO",
        organization: "Regenerative Ventures",
        quote:
          "Our product launch went from a stressful deadline to a sacred offering. The ritual helped us align our entire team with purpose.",
        serviceType: "ritual_design",
        outcome:
          "200% increase in team alignment scores, 150% improvement in user reception",
        flourishGenerated: 89,
      },
    ],
    sdgAlignment: [3, 8, 11, 16, 17],
    ritualComponents: [
      "Intention Setting",
      "Elemental Invocation",
      "Community Blessing",
      "Future Visioning",
    ],
    flourishAlternative: {
      amount: 200,
      type: "service",
    },
  },

  {
    id: "scroll_drafting",
    tier: "scroll",
    name: "Wisdom Scrolls & Constitution Drafting",
    description:
      "Poetic policies, sacred constitutions, and mission frameworks that inspire and align",
    longDescription:
      "Create foundational documents that serve as both practical guidance and sacred inspiration. Whether you need a company constitution, DAO governance framework, or community charter, we'll craft language that honors both wisdom and clarity.",
    basePrice: 288,
    currency: "USD",
    duration: "2-3 weeks",
    deliverables: [
      "Beautifully formatted sacred document",
      "Plain language version for legal compliance",
      "Implementation guidance",
      "Ritual for document blessing and adoption",
      "Version control with ceremonial updates",
    ],
    process: [
      {
        phase: "Wisdom Gathering",
        description:
          "Collecting input from all stakeholders and wisdom traditions",
        duration: "1 week",
        ritualElement: "Talking circle with all voices",
      },
      {
        phase: "Sacred Synthesis",
        description: "Weaving together practical needs with poetic inspiration",
        duration: "1-2 weeks",
        ritualElement: "Daily morning pages practice",
      },
      {
        phase: "Community Review",
        description: "Iterating with feedback and blessing from community",
        duration: "3-5 days",
        ritualElement: "Group reading and blessing ceremony",
      },
    ],
    testimonials: [
      {
        author: "David Rivera",
        role: "Community Organizer",
        organization: "Urban Permaculture Collective",
        quote:
          "Our constitution became a living document that people actually read and feel inspired by. It guides every decision we make.",
        serviceType: "scroll_drafting",
        outcome:
          "100% adoption rate, featured as model constitution by 5 other organizations",
        flourishGenerated: 156,
      },
    ],
    sdgAlignment: [4, 10, 11, 16],
    ritualComponents: [
      "Ancestral Wisdom Invocation",
      "Multi-Voice Integration",
      "Future Blessing",
    ],
    flourishAlternative: {
      amount: 400,
      type: "wisdom",
    },
  },

  {
    id: "sdg_mapping",
    tier: "systems",
    name: "Cluster Map for SDG-Aligned Strategy",
    description:
      "3-week deep engagement to align your organization with planetary intelligence clusters",
    longDescription:
      "A comprehensive analysis and strategy development process that maps your organization's purpose, products, and practices to the United Nations SDGs and CIVICA intelligence clusters. Receive actionable guidance for amplifying your positive impact.",
    basePrice: 440,
    currency: "USD",
    duration: "3 weeks",
    deliverables: [
      "Complete SDG alignment assessment",
      "CIVICA cluster integration map",
      "Strategic action plan with ritual milestones",
      "Impact measurement framework",
      "Ongoing consultation for implementation",
    ],
    process: [
      {
        phase: "Systems Listening",
        description: "Deep analysis of current operations and impact",
        duration: "1 week",
        ritualElement: "Organizational medicine wheel ceremony",
      },
      {
        phase: "Cluster Alignment",
        description: "Mapping to CIVICA intelligence clusters and SDGs",
        duration: "1 week",
        ritualElement: "Constellation mapping with sacred geometry",
      },
      {
        phase: "Sacred Strategy",
        description: "Creating implementation roadmap with ritual integration",
        duration: "1 week",
        ritualElement: "Future visioning and commitment ceremony",
      },
    ],
    testimonials: [
      {
        author: "Dr. Sarah Kim",
        role: "Director of Innovation",
        organization: "Global Health Initiative",
        quote:
          "The SDG mapping helped us see how our health work connects to education, environment, and economic justice. Our impact tripled.",
        serviceType: "sdg_mapping",
        outcome:
          "300% increase in measurable SDG impact, $2M in aligned funding secured",
        flourishGenerated: 234,
      },
    ],
    sdgAlignment: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
    ritualComponents: [
      "Systems Visioning",
      "Interconnection Mapping",
      "Impact Blessing",
    ],
    flourishAlternative: {
      amount: 600,
      type: "regeneration",
    },
  },

  {
    id: "ritual_ux",
    tier: "ritual_ux",
    name: "Interface of Interbeing",
    description:
      "UX/UI transformation rooted in sacred sequence, intention, and symbolic wisdom",
    longDescription:
      "Redesign your digital interfaces to honor the sacred nature of human interaction with technology. Every click becomes an intention, every screen a ceremony, every user journey a path of transformation.",
    basePrice: 555,
    currency: "USD",
    duration: "4-6 weeks",
    deliverables: [
      "Sacred UX audit of current interface",
      "Ritual-based user journey redesign",
      "Symbolic design system with sacred geometry",
      "Interactive prototypes with ceremony integration",
      "Implementation guidance with ritual protocols",
    ],
    process: [
      {
        phase: "Sacred Interface Audit",
        description: "Analyzing current UX through a ritual lens",
        duration: "1 week",
        ritualElement: "User journey meditation and energy mapping",
      },
      {
        phase: "Intentional Architecture",
        description: "Designing interactions as sacred ceremonies",
        duration: "2-3 weeks",
        ritualElement: "Design sprints with blessing and visioning",
      },
      {
        phase: "Sacred Implementation",
        description: "Building prototypes with ritual integration",
        duration: "1-2 weeks",
        ritualElement: "Code blessing and user testing ceremonies",
      },
    ],
    testimonials: [
      {
        author: "Alex Thompson",
        role: "Product Manager",
        organization: "Mindful Tech Co",
        quote:
          "Our app went from feeling sterile to feeling alive. Users now report feeling inspired and centered after using our platform.",
        serviceType: "ritual_ux",
        outcome:
          "85% increase in user engagement, 92% positive sentiment in reviews",
        flourishGenerated: 178,
      },
    ],
    sdgAlignment: [4, 9, 11],
    ritualComponents: [
      "User Empathy Ceremonies",
      "Sacred Geometry Integration",
      "Intention-Based Interactions",
    ],
    flourishAlternative: {
      amount: 750,
      type: "creativity",
    },
  },

  {
    id: "strategic_copilot",
    tier: "strategic",
    name: "Mythic Futures Advisor",
    description:
      "Ongoing 1:1 partnership for strategic guidance, including simulation building and impact metrics",
    longDescription:
      "Monthly strategic partnership combining practical business guidance with mythic visioning and ritual support. Includes access to CIVICA simulation tools and Flourish economic integration.",
    basePrice: 888,
    currency: "USD",
    duration: "Monthly retainer",
    deliverables: [
      "Two 90-minute strategic sessions per month",
      "Custom simulation models for decision-making",
      "Ritual calendar aligned with business goals",
      "Flourish metrics integration and reporting",
      "24/7 asynchronous guidance via sacred channels",
    ],
    process: [
      {
        phase: "Monthly Strategy Ritual",
        description: "Deep strategic planning with mythic context",
        duration: "90 minutes",
        ritualElement: "New moon visioning and full moon review",
      },
      {
        phase: "Ongoing Oracle Support",
        description: "Continuous guidance between formal sessions",
        duration: "Ongoing",
        ritualElement: "Daily intention alignment and weekly check-ins",
      },
    ],
    testimonials: [
      {
        author: "Maria Santos",
        role: "Founder & CEO",
        organization: "Regenerative Finance Platform",
        quote:
          "Having a strategic advisor who understands both business and sacred principles has been transformative. Our company has found its soul.",
        serviceType: "strategic_copilot",
        outcome:
          "400% revenue growth while maintaining sacred values, featured in 3 major publications",
        flourishGenerated: 445,
      },
    ],
    sdgAlignment: [8, 9, 10, 11, 12],
    ritualComponents: [
      "Strategic Visioning",
      "Mythic Contextualization",
      "Sacred Metrics Integration",
    ],
    flourishAlternative: {
      amount: 1200,
      type: "wisdom",
    },
  },

  {
    id: "dao_architecture",
    tier: "dao",
    name: "Polycultural DAO Architecture",
    description:
      "End-to-end setup of regenerative governance with ritual-based voting and consent protocols",
    longDescription:
      "Design and implement a complete decentralized governance system that honors multiple cultural traditions, includes ritual decision-making processes, and ensures voices of future generations are heard.",
    basePrice: 1111,
    currency: "USD",
    duration: "6-8 weeks",
    deliverables: [
      "Complete DAO technical architecture",
      "Multicultural governance protocols",
      "Ritual-based voting system design",
      "Smart contract development and deployment",
      "Community onboarding and facilitation training",
    ],
    process: [
      {
        phase: "Governance Visioning",
        description: "Co-creating the governance vision with community",
        duration: "2 weeks",
        ritualElement: "Multi-stakeholder visioning councils",
      },
      {
        phase: "Sacred Architecture",
        description: "Designing technical and ritual governance systems",
        duration: "3-4 weeks",
        ritualElement: "Code ceremony and blessing protocols",
      },
      {
        phase: "Community Activation",
        description: "Launching DAO with training and support",
        duration: "1-2 weeks",
        ritualElement: "DAO birth ceremony and ongoing ritual integration",
      },
    ],
    testimonials: [
      {
        author: "Council of Elders",
        role: "Traditional Leaders",
        organization: "Indigenous Rights DAO",
        quote:
          "Finally, a governance system that honors our traditional council ways while using modern technology for global coordination.",
        serviceType: "dao_architecture",
        outcome:
          "50+ indigenous communities connected, $500K in aligned funding distributed",
        flourishGenerated: 612,
      },
    ],
    sdgAlignment: [1, 2, 5, 10, 11, 16],
    ritualComponents: [
      "Consensus Building Ceremonies",
      "Multi-Generational Council Integration",
      "Sacred Contract Blessing",
    ],
    flourishAlternative: {
      amount: 1500,
      type: "harmony",
    },
  },
];

export const SERVICE_PACKAGES: ServicePackage[] = [
  {
    id: "civica_launch_kit",
    name: "CIVICA Launch Kit",
    description:
      "Perfect for organizations beginning their sacred transformation journey",
    services: ["ritual_design", "scroll_drafting", "sdg_mapping"],
    bundlePrice: 399,
    savings: 473,
    duration: "4-5 weeks",
    mostPopular: true,
  },
  {
    id: "bioregional_identity",
    name: "Bioregional Civic Identity Pack",
    description: "For individuals and small groups seeking sacred alignment",
    services: ["ritual_design", "scroll_drafting"],
    bundlePrice: 222,
    savings: 210,
    duration: "3-4 weeks",
  },
  {
    id: "future_architect",
    name: "Future Architect's Monthly Retainer",
    description: "Comprehensive monthly support for visionary leaders",
    services: ["strategic_copilot", "scroll_drafting"],
    bundlePrice: 999,
    savings: 177,
    duration: "Monthly ongoing",
  },
];

export const PAYMENT_OPTIONS: PaymentOption[] = [
  {
    id: "paystack",
    name: "Paystack",
    type: "fiat",
    description:
      "Ideal for Africa-based payments. Cards, Bank Transfers, Mobile Money",
    icon: "💳",
    processingFee: 0.015,
    instantApproval: true,
  },
  {
    id: "paypal",
    name: "PayPal",
    type: "fiat",
    description: "Global accessibility with automatic invoicing",
    icon: "🌍",
    processingFee: 0.029,
    instantApproval: true,
  },
  {
    id: "flourish",
    name: "Flourish Credits",
    type: "flourish",
    description: "Sacred currency earned through platform contribution",
    icon: "✨",
    processingFee: 0,
    instantApproval: true,
    ritualRequired: true,
  },
  {
    id: "crypto",
    name: "Cryptocurrency",
    type: "crypto",
    description: "ETH, USDC, or other aligned tokens",
    icon: "🪙",
    processingFee: 0.005,
    instantApproval: false,
  },
  {
    id: "barter",
    name: "Sacred Barter",
    type: "barter",
    description: "Exchange aligned skills, land access, or sacred offerings",
    icon: "🤝",
    processingFee: 0,
    instantApproval: false,
    ritualRequired: true,
  },
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: "regenerative_finance",
    title: "Sacred Economy Platform",
    subtitle: "Transforming finance through ritual and regenerative principles",
    client: "EcoFlow Financial",
    challenge:
      "Traditional financial interface felt extractive and disconnected from values. Users reported feeling stressed and guilty about money interactions.",
    approach:
      "Complete UX redesign using sacred geometry, ritual-based transactions, and regenerative economic principles integrated throughout the user journey.",
    ritualElements: [
      "Gratitude meditation before transactions",
      "Impact visualization showing ecological outcomes",
      "Monthly full moon financial blessing ceremony",
      "Sacred geometry in all interface elements",
    ],
    outcomes: [
      {
        metric: "User Satisfaction",
        value: "94%",
        description:
          "Users report feeling aligned and peaceful when using the platform",
        type: "quantitative",
      },
      {
        metric: "Regenerative Impact",
        value: "$2.3M",
        description: "Directed toward ecological restoration projects",
        type: "quantitative",
      },
      {
        metric: "Sacred Transformation",
        value: "Profound",
        description:
          "Users describe money relationship healing and spiritual growth",
        type: "sacred",
      },
    ],
    images: [
      "platform-overview.jpg",
      "ritual-interface.jpg",
      "impact-dashboard.jpg",
    ],
    testimonial: {
      author: "Jennifer Walsh",
      role: "CEO",
      organization: "EcoFlow Financial",
      quote:
        "Our platform went from being a necessary tool to being a sacred practice that users cherish. The ritual elements transformed how people relate to money itself.",
      serviceType: "ritual_ux",
      outcome:
        "300% increase in user engagement, 500% growth in regenerative investments",
      flourishGenerated: 789,
    },
    sdgImpact: [1, 8, 13, 14, 15],
    flourishGenerated: 789,
    duration: "8 weeks",
    technologies: ["React", "Sacred Geometry", "Web3", "Ritual Protocols"],
    ritualProtocols: [
      "Transaction Blessing",
      "Impact Meditation",
      "Abundance Ceremony",
    ],
  },
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "sacred-ux-manifesto",
    title: "The Sacred UX Manifesto",
    subtitle: "Why every interface should be a ceremony",
    slug: "sacred-ux-manifesto",
    content: `# The Sacred UX Manifesto

## Why Every Interface Should Be A Ceremony

In the rush to optimize conversions and minimize friction, we've forgotten something essential: every human interaction with technology is an opportunity for transformation, healing, and awakening.

### The Problem With Sterile Interfaces

Traditional UX design treats humans as efficiency machines—beings whose only goal is to complete tasks as quickly as possible. But we are not machines. We are conscious beings seeking meaning, connection, and growth in every moment.

When we interact with technology, we bring our full selves: our hopes, fears, wounds, and wisdom. Yet most interfaces ignore this reality, creating sterile experiences that leave us feeling depleted rather than nourished.

### Sacred UX: A New Paradigm

Sacred UX recognizes that every click is an intention, every screen is a threshold, and every user journey is a potential pilgrimage. It asks: How can technology serve not just our tasks, but our souls?

Key principles of Sacred UX:

1. **Intention Over Efficiency**: Every interaction begins with a moment of mindfulness
2. **Beauty Over Utility**: Interfaces that inspire and uplift the human spirit  
3. **Ritual Over Friction**: Meaningful ceremonies replace mindless clicking
4. **Wisdom Over Data**: Ancient principles guide modern solutions
5. **Connection Over Isolation**: Technology that brings us together, not apart

### Practical Implementation

Sacred UX isn't just philosophy—it's practical design methodology:

- **Breathing Space**: Built-in pauses for reflection and intention-setting
- **Sacred Geometry**: Interface layouts based on natural proportions
- **Ritual Sequences**: Important actions framed as ceremonies
- **Meaningful Feedback**: Responses that acknowledge the human behind the click
- **Seasonal Adaptation**: Interfaces that change with natural cycles

### The Future of Human-Computer Interaction

As AI becomes more sophisticated, the question isn't whether machines will become more human, but whether our interfaces will honor the sacred dimension of human experience.

Sacred UX is a bridge between the efficiency of technology and the wisdom of the heart. It's time we build interfaces worthy of the magnificent beings who use them.`,
    excerpt:
      "Traditional UX design treats humans as efficiency machines. Sacred UX recognizes that every click is an intention, every screen is a threshold, and every user journey is a potential pilgrimage.",
    publishDate: new Date("2024-01-15"),
    lastUpdated: new Date("2024-01-15"),
    tags: [
      "Sacred UX",
      "Design Philosophy",
      "Human-Computer Interaction",
      "Consciousness",
      "Technology",
    ],
    sdgClusters: [4, 9, 11],
    readTime: 8,
    semanticSignals: [
      {
        cluster: "technological_intelligence",
        keywords: ["sacred UX", "conscious design", "ritual interface"],
        symbolicTags: ["🕯️", "💻", "🌙"],
        resonanceScore: 0.89,
        blessingWebs: [
          "design_community",
          "consciousness_tech",
          "sacred_activists",
        ],
        ethicalMetrics: [
          {
            name: "Human Dignity Preservation",
            value: 0.95,
            description: "How well the content honors human consciousness",
            measurementMethod: "Qualitative assessment by wisdom council",
          },
        ],
      },
    ],
    ritualElements: [
      "Design as ceremony",
      "Interface blessing",
      "User journey pilgrimage",
    ],
    flourishValue: 156,
    status: "published",
  },
];
