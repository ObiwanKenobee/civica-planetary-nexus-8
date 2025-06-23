import { BillingPlan, PaymentMethod, RedemptionOption } from "@/types/billing";

// CIVICA-Aligned Service Portfolio
export interface CivicaService {
  id: string;
  name: string;
  description: string;
  icon: string;
  basePrice: number;
  category: "core" | "package" | "enterprise";
  deliveryTime: string;
  includes: string[];
  addOns: ServiceAddOn[];
  paystackEnabled: boolean;
  paypalEnabled: boolean;
  flourishPrice?: number;
  sacredBarterOptions?: string[];
}

export interface ServiceAddOn {
  id: string;
  name: string;
  price: number;
  description: string;
}

export interface ServicePackage {
  id: string;
  name: string;
  description: string;
  icon: string;
  services: string[]; // Service IDs
  originalPrice: number;
  packagePrice: number;
  savings: number;
  popular?: boolean;
}

// Core Service Menu
export const civicaServices: CivicaService[] = [
  {
    id: "ritual_design",
    name: "Ritual Design for Regenerative Teams",
    description:
      "Design rituals for product launches, retreats, campaigns, or DAO alignment",
    icon: "💫",
    basePrice: 144,
    category: "core",
    deliveryTime: "5-7 days",
    includes: [
      "Custom ritual ceremony design",
      "Sacred sequence mapping",
      "Intention alignment process",
      "Group facilitation guide",
      "Symbolic element integration",
    ],
    addOns: [
      {
        id: "facilitation",
        name: "Live Facilitation",
        price: 288,
        description: "Expert-led ceremony facilitation",
      },
      {
        id: "follow_up",
        name: "Integration Session",
        price: 72,
        description: "Post-ritual integration session",
      },
    ],
    paystackEnabled: true,
    paypalEnabled: true,
    flourishPrice: 720,
    sacredBarterOptions: [
      "Wisdom sharing",
      "Community service",
      "Regenerative project contribution",
    ],
  },
  {
    id: "wisdom_scrolls",
    name: "Wisdom Scrolls & Constitution Drafting",
    description: "Draft poetic policies, covenants, or mission frameworks",
    icon: "📜",
    basePrice: 288,
    category: "core",
    deliveryTime: "7-10 days",
    includes: [
      "Poetic policy creation",
      "Constitutional framework",
      "Values alignment document",
      "Implementation guidelines",
      "Sacred language integration",
    ],
    addOns: [
      {
        id: "revision",
        name: "Additional Revision",
        price: 55,
        description: "Extra revision round",
      },
      {
        id: "governance",
        name: "Governance Integration",
        price: 144,
        description: "DAO governance setup",
      },
    ],
    paystackEnabled: true,
    paypalEnabled: true,
    flourishPrice: 1440,
    sacredBarterOptions: [
      "Legal expertise exchange",
      "Writing collaboration",
      "Community feedback",
    ],
  },
  {
    id: "sdg_strategy",
    name: "Cluster Map for SDG-Aligned Strategy",
    description:
      "3-week engagement to align products, organizations, or civic initiatives with CIVICA intelligence clusters",
    icon: "🧬",
    basePrice: 440,
    category: "core",
    deliveryTime: "3 weeks",
    includes: [
      "Comprehensive SDG alignment audit",
      "Intelligence cluster mapping",
      "Strategic roadmap creation",
      "Stakeholder engagement plan",
      "Impact measurement framework",
      "Weekly check-in sessions",
    ],
    addOns: [
      {
        id: "extended",
        name: "Extended Support",
        price: 220,
        description: "2 weeks additional support",
      },
      {
        id: "training",
        name: "Team Training",
        price: 333,
        description: "Team training on SDG implementation",
      },
    ],
    paystackEnabled: true,
    paypalEnabled: true,
    flourishPrice: 2200,
    sacredBarterOptions: [
      "Research collaboration",
      "Data sharing",
      "Pilot project partnership",
    ],
  },
  {
    id: "sacred_ui",
    name: "Interface of Interbeing (Ritual UX/Sacred UI)",
    description:
      "UX/UI audits + redesigns rooted in intention, myth, sacred sequence, and symbolic systems",
    icon: "🛕",
    basePrice: 555,
    category: "core",
    deliveryTime: "2-3 weeks",
    includes: [
      "Sacred UX audit",
      "Mythic user journey mapping",
      "Symbolic design language",
      "Intention-based interface design",
      "Accessibility integration",
      "Prototype development",
    ],
    addOns: [
      {
        id: "development",
        name: "Frontend Development",
        price: 888,
        description: "Full frontend implementation",
      },
      {
        id: "testing",
        name: "User Testing",
        price: 222,
        description: "Sacred user testing sessions",
      },
    ],
    paystackEnabled: true,
    paypalEnabled: true,
    flourishPrice: 2775,
    sacredBarterOptions: [
      "Design expertise exchange",
      "User research collaboration",
      "Portfolio showcase",
    ],
  },
  {
    id: "mythic_advisor",
    name: "Mythic Futures Advisor (Strategic Co-Pilot)",
    description:
      "Ongoing 1:1 engagement, includes simulation building + Flourish metrics",
    icon: "🧠",
    basePrice: 888,
    category: "core",
    deliveryTime: "Monthly retainer",
    includes: [
      "Weekly 1:1 strategy sessions",
      "Custom simulation development",
      "Flourish metrics tracking",
      "Future scenario planning",
      "Strategic decision support",
      "Access to exclusive tools",
    ],
    addOns: [
      {
        id: "emergency",
        name: "Emergency Consultation",
        price: 222,
        description: "24-hour response priority",
      },
      {
        id: "team_access",
        name: "Team Access",
        price: 444,
        description: "Extend access to your team",
      },
    ],
    paystackEnabled: true,
    paypalEnabled: true,
    flourishPrice: 4440,
    sacredBarterOptions: [
      "Reciprocal mentoring",
      "Strategic partnership",
      "Knowledge exchange",
    ],
  },
  {
    id: "dao_architecture",
    name: "Polycultural DAO Architecture",
    description:
      "End-to-end setup of DAO logic, ritual-based voting, consent protocols",
    icon: "🕸️",
    basePrice: 1111,
    category: "enterprise",
    deliveryTime: "4-6 weeks",
    includes: [
      "DAO structure design",
      "Smart contract development",
      "Ritual-based governance",
      "Consent protocol integration",
      "Multi-stakeholder framework",
      "Launch ceremony facilitation",
    ],
    addOns: [
      {
        id: "maintenance",
        name: "Monthly Maintenance",
        price: 333,
        description: "Ongoing DAO maintenance",
      },
      {
        id: "training",
        name: "Governance Training",
        price: 555,
        description: "Member governance training",
      },
    ],
    paystackEnabled: true,
    paypalEnabled: true,
    flourishPrice: 5555,
    sacredBarterOptions: [
      "Governance expertise",
      "Community building",
      "Technology partnership",
    ],
  },
];

// Package Bundles
export const servicePackages: ServicePackage[] = [
  {
    id: "civica_launch_kit",
    name: "CIVICA Launch Kit",
    description: "Perfect starter package for regenerative organizations",
    icon: "🌀",
    services: ["ritual_design", "wisdom_scrolls", "sdg_strategy"],
    originalPrice: 872, // 144 + 288 + 440
    packagePrice: 399,
    savings: 473,
    popular: true,
  },
  {
    id: "bioregional_identity",
    name: "Bioregional Civic Identity Pack",
    description: "Discover and align with your bioregional identity",
    icon: "🌍",
    services: ["ritual_design", "wisdom_scrolls"],
    originalPrice: 432, // 144 + 288
    packagePrice: 222,
    savings: 210,
  },
  {
    id: "future_architect_retainer",
    name: "Future Architect's Monthly Retainer",
    description: "Comprehensive monthly support for visionary leaders",
    icon: "🔮",
    services: ["mythic_advisor", "ritual_design", "wisdom_scrolls"],
    originalPrice: 1320, // 888 + 144 + 288
    packagePrice: 999,
    savings: 321,
  },
];

export const CIVICA_BILLING_PLANS: BillingPlan[] = [
  {
    id: "civic_explorer",
    name: "Civic Explorer",
    description:
      "Begin your journey into collective intelligence and sacred technology",
    icon: "🌱",
    basePrice: 0,
    color: "from-green-400 to-emerald-600",
    features: [
      {
        id: "basic_access",
        name: "Basic CIVICA Access",
        description: "Core platform features and community",
        included: true,
      },
      {
        id: "simulations",
        name: "Future Simulations",
        description: "Run basic future scenario simulations",
        included: 3,
      },
      {
        id: "scrolls",
        name: "Wisdom Scrolls",
        description: "Create and share wisdom documents",
        included: 5,
      },
      {
        id: "rituals",
        name: "Ritual Participation",
        description: "Join community rituals and ceremonies",
        included: true,
      },
    ],
    limitations: [
      { feature: "simulations", limit: 3, unit: "per month" },
      { feature: "scrolls", limit: 5, unit: "per month" },
      { feature: "ai_queries", limit: 50, unit: "per month" },
    ],
    flourishBenefits: [
      {
        type: "generation_multiplier",
        value: 1.0,
        description: "Standard Flourish generation rate",
      },
    ],
    sacredPerks: [
      "Access to community wisdom circles",
      "Basic ritual participation",
      "Entry-level SDG alignment tools",
    ],
    regionalPricing: [
      { region: "Global North", countryCode: "US", priceMultiplier: 1.0 },
      { region: "Global South", countryCode: "NG", priceMultiplier: 0.25 },
      { region: "Emerging Economies", countryCode: "BR", priceMultiplier: 0.5 },
    ],
  },
  {
    id: "co_creator",
    name: "Co-Creator",
    description: "Active participation in planetary intelligence weaving",
    icon: "🤝",
    basePrice: 12,
    color: "from-blue-400 to-indigo-600",
    popular: true,
    features: [
      {
        id: "enhanced_access",
        name: "Enhanced CIVICA Access",
        description: "Full platform features and collaboration tools",
        included: true,
      },
      {
        id: "unlimited_simulations",
        name: "Unlimited Simulations",
        description: "Run unlimited future scenario simulations",
        included: true,
      },
      {
        id: "ritual_creation",
        name: "Ritual Creation",
        description: "Create and host community rituals",
        included: true,
      },
      {
        id: "ai_queries",
        name: "AI Co-Pilot Access",
        description: "Enhanced AI collaboration features",
        included: 200,
      },
    ],
    limitations: [
      { feature: "ai_queries", limit: 200, unit: "per month" },
      { feature: "storage", limit: 5, unit: "GB" },
    ],
    flourishBenefits: [
      {
        type: "generation_multiplier",
        value: 1.5,
        description: "50% enhanced Flourish generation",
      },
      {
        type: "monthly_grant",
        value: 50,
        description: "50 bonus Flourish monthly",
      },
    ],
    sacredPerks: [
      "Monthly wisdom keeper sessions",
      "Enhanced community features",
      "Priority support access",
      "Beta feature early access",
    ],
    regionalPricing: [
      { region: "Global North", countryCode: "US", priceMultiplier: 1.0 },
      { region: "Global South", countryCode: "NG", priceMultiplier: 0.25 },
      { region: "Emerging Economies", countryCode: "BR", priceMultiplier: 0.5 },
    ],
  },
  {
    id: "cluster_steward",
    name: "Cluster Steward",
    description: "Leadership within the 144 SDG intelligence network",
    icon: "👑",
    basePrice: 33,
    color: "from-purple-400 to-violet-600",
    features: [
      {
        id: "cluster_leadership",
        name: "Cluster Leadership",
        description: "Lead and coordinate SDG clusters",
        included: true,
      },
      {
        id: "unlimited_everything",
        name: "Unlimited Access",
        description: "Unlimited use of all platform features",
        included: true,
      },
      {
        id: "governance_tools",
        name: "Governance Tools",
        description: "Advanced governance and coordination tools",
        included: true,
      },
      {
        id: "api_access",
        name: "API Access",
        description: "Developer API for custom integrations",
        included: true,
      },
    ],
    limitations: [],
    flourishBenefits: [
      {
        type: "generation_multiplier",
        value: 2.0,
        description: "100% enhanced Flourish generation",
      },
      {
        type: "monthly_grant",
        value: 144,
        description: "144 bonus Flourish monthly",
      },
      {
        type: "ritual_bonus",
        value: 3.0,
        description: "Triple Flourish for ritual facilitation",
      },
    ],
    sacredPerks: [
      "Weekly wisdom keeper sessions",
      "Cluster coordination access",
      "Advanced governance tools",
      "Priority feature development input",
      "Sacred council participation",
    ],
    regionalPricing: [
      { region: "Global North", countryCode: "US", priceMultiplier: 1.0 },
      { region: "Global South", countryCode: "NG", priceMultiplier: 0.25 },
      { region: "Emerging Economies", countryCode: "BR", priceMultiplier: 0.5 },
    ],
  },
  {
    id: "intelligence_architect",
    name: "Intelligence Architect",
    description: "Design and build planetary consciousness infrastructure",
    icon: "⚡",
    basePrice: 77,
    color: "from-cyan-400 to-blue-600",
    features: [
      {
        id: "full_api_suite",
        name: "Full API Suite",
        description: "Complete developer API access",
        included: true,
      },
      {
        id: "custom_integrations",
        name: "Custom Integrations",
        description: "Build custom CIVICA integrations",
        included: true,
      },
      {
        id: "dedicated_support",
        name: "Dedicated Support",
        description: "Personal technical support specialist",
        included: true,
      },
      {
        id: "beta_features",
        name: "Beta Features",
        description: "First access to experimental features",
        included: true,
      },
    ],
    limitations: [],
    flourishBenefits: [
      {
        type: "generation_multiplier",
        value: 3.0,
        description: "200% enhanced Flourish generation",
      },
      {
        type: "monthly_grant",
        value: 333,
        description: "333 bonus Flourish monthly",
      },
      {
        type: "access_unlock",
        value: 1,
        description: "Unlock premium features for others",
      },
    ],
    sacredPerks: [
      "Architecture design partnership",
      "Platform development input",
      "Technical advisory council",
      "Custom feature development",
      "Exclusive architect community",
    ],
    regionalPricing: [
      { region: "Global North", countryCode: "US", priceMultiplier: 1.0 },
      { region: "Global South", countryCode: "NG", priceMultiplier: 0.25 },
      { region: "Emerging Economies", countryCode: "BR", priceMultiplier: 0.5 },
    ],
  },
  {
    id: "institutional",
    name: "Institutional",
    description:
      "Enterprise-scale coordination for organizations and bioregions",
    icon: "🏛️",
    basePrice: 144,
    color: "from-amber-400 to-orange-600",
    enterprise: true,
    features: [
      {
        id: "multi_user",
        name: "Multi-User Management",
        description: "Coordinate hundreds of users",
        included: true,
      },
      {
        id: "white_label",
        name: "White-label Options",
        description: "Custom branding and domains",
        included: true,
      },
      {
        id: "enterprise_support",
        name: "Enterprise Support",
        description: "24/7 dedicated support team",
        included: true,
      },
      {
        id: "custom_development",
        name: "Custom Development",
        description: "Bespoke feature development",
        included: true,
      },
    ],
    limitations: [],
    flourishBenefits: [
      {
        type: "generation_multiplier",
        value: 5.0,
        description: "400% enhanced collective Flourish generation",
      },
      {
        type: "monthly_grant",
        value: 1440,
        description: "1440 organizational Flourish monthly",
      },
    ],
    sacredPerks: [
      "Organizational transformation consulting",
      "Custom governance implementation",
      "Bioregional sovereignty support",
      "Strategic partnership opportunities",
      "Global council representation",
    ],
    regionalPricing: [
      { region: "Global North", countryCode: "US", priceMultiplier: 1.0 },
      { region: "Global South", countryCode: "NG", priceMultiplier: 0.25 },
      { region: "Emerging Economies", countryCode: "BR", priceMultiplier: 0.5 },
    ],
  },
];

export const PAYMENT_METHODS: PaymentMethod[] = [
  {
    id: "paystack",
    type: "card",
    name: "Paystack",
    description: "Cards, Bank Transfer, Mobile Money, USSD",
    icon: "💳",
    available: true,
    regions: ["NG", "GH", "ZA", "KE"],
    processingFee: 0.029,
    instantActivation: true,
  },
  {
    id: "paypal",
    type: "card",
    name: "PayPal",
    description: "Global payment solution",
    icon: "🌍",
    available: true,
    processingFee: 0.034,
    instantActivation: true,
  },
  {
    id: "flourish",
    type: "flourish",
    name: "Flourish Credits",
    description: "Sacred economy currency",
    icon: "✨",
    available: true,
    processingFee: 0,
    instantActivation: true,
  },
  {
    id: "barter",
    type: "barter",
    name: "Sacred Barter",
    description: "Skills, wisdom, or offerings",
    icon: "🤝",
    available: true,
    processingFee: 0,
    instantActivation: false,
  },
];

export const FLOURISH_REDEMPTION_OPTIONS: RedemptionOption[] = [
  {
    id: "subscription_credit",
    name: "Subscription Credit",
    description: "Apply Flourish toward monthly subscription",
    cost: {
      wisdom: 100,
      regeneration: 0,
      harmony: 0,
      creativity: 0,
      service: 0,
      total: 100,
    },
    type: "subscription_credit",
    duration: "1 month",
    impact: "$12 USD equivalent credit",
  },
  {
    id: "ai_queries",
    name: "AI Co-Pilot Query Bundle",
    description: "Additional AI consciousness interactions",
    cost: {
      wisdom: 30,
      regeneration: 0,
      harmony: 0,
      creativity: 0,
      service: 0,
      total: 30,
    },
    type: "feature_unlock",
    duration: "1 month",
    impact: "100 additional AI queries",
  },
  {
    id: "blessing_pool",
    name: "Community Blessing Pool",
    description: "Gift access to Global South community members",
    cost: {
      wisdom: 0,
      regeneration: 0,
      harmony: 50,
      creativity: 0,
      service: 100,
      total: 150,
    },
    type: "blessing_pool",
    impact: "Sponsor 1 month of Co-Creator access for someone in need",
  },
  {
    id: "regenerative_project",
    name: "Bioregional Regeneration Fund",
    description: "Support local ecological healing projects",
    cost: {
      wisdom: 0,
      regeneration: 200,
      harmony: 50,
      creativity: 0,
      service: 50,
      total: 300,
    },
    type: "regenerative_project",
    impact: "Fund tree planting, soil restoration, or biodiversity projects",
  },
];

// Backward compatibility exports
export const billingPlans = CIVICA_BILLING_PLANS;
export const paymentMethods = PAYMENT_METHODS;
export const redemptionOptions = FLOURISH_REDEMPTION_OPTIONS;
