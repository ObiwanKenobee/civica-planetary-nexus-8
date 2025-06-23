// Ritual Technologist External Node Types
// CIVICA-aligned personal portfolio and service offerings

export interface ServiceOffering {
  id: string;
  tier: "entry" | "scroll" | "systems" | "ritual_ux" | "strategic" | "dao";
  name: string;
  description: string;
  longDescription: string;
  basePrice: number;
  currency: "USD" | "Flourish";
  duration: string;
  deliverables: string[];
  process: ServiceStep[];
  testimonials: Testimonial[];
  sdgAlignment: number[];
  ritualComponents: string[];
  flourishAlternative?: {
    amount: number;
    type: "wisdom" | "service" | "creativity" | "regeneration" | "harmony";
  };
}

export interface ServiceStep {
  phase: string;
  description: string;
  duration: string;
  ritualElement?: string;
}

export interface ServicePackage {
  id: string;
  name: string;
  description: string;
  services: string[]; // Service IDs
  bundlePrice: number;
  savings: number;
  duration: string;
  mostPopular?: boolean;
}

export interface Testimonial {
  author: string;
  role: string;
  organization?: string;
  quote: string;
  serviceType: string;
  outcome: string;
  flourishGenerated?: number;
}

export interface CaseStudy {
  id: string;
  title: string;
  subtitle: string;
  client: string;
  challenge: string;
  approach: string;
  ritualElements: string[];
  outcomes: CaseStudyOutcome[];
  images: string[];
  testimonial: Testimonial;
  sdgImpact: number[];
  flourishGenerated: number;
  duration: string;
  technologies: string[];
  ritualProtocols: string[];
}

export interface CaseStudyOutcome {
  metric: string;
  value: string;
  description: string;
  type: "quantitative" | "qualitative" | "sacred";
}

export interface PersonaArchetype {
  title: string;
  description: string;
  skills: string[];
  approach: string;
  sacredPrinciples: string[];
  testimonialQuote: string;
  availability: "open" | "limited" | "waitlist" | "closed";
}

export interface PaymentOption {
  id: string;
  name: string;
  type: "fiat" | "crypto" | "flourish" | "barter";
  description: string;
  icon: string;
  paymentUrl?: string;
  processingFee?: number;
  instantApproval: boolean;
  ritualRequired?: boolean;
}

export interface SemanticSignal {
  cluster: string;
  keywords: string[];
  symbolicTags: string[];
  resonanceScore: number;
  blessingWebs: string[];
  ethicalMetrics: EthicalMetric[];
}

export interface EthicalMetric {
  name: string;
  value: number;
  description: string;
  measurementMethod: string;
}

export interface RitualTechProfile {
  name: string;
  title: string;
  bio: string;
  mission: string;
  activeArchetypes: PersonaArchetype[];
  skills: SkillCluster[];
  experience: Experience[];
  education: Education[];
  currentAvailability: "available" | "limited" | "booked";
  responseTime: string;
  languages: string[];
  timezone: string;
  ritualPhilosophy: string;
  sacredAlignment: number[];
}

export interface SkillCluster {
  category: string;
  skills: Skill[];
  masteryLevel: number; // 0-1
  yearsExperience: number;
  ritualIntegration: string;
}

export interface Skill {
  name: string;
  level: number; // 0-1
  sacredApplication: string;
  certifications?: string[];
}

export interface Experience {
  role: string;
  organization: string;
  duration: string;
  description: string;
  achievements: string[];
  ritualElements: string[];
  sdgContribution: number[];
}

export interface Education {
  degree?: string;
  institution: string;
  year: string;
  focus: string;
  sacredLearning: string;
  initiations?: string[];
}

export interface BlogPost {
  id: string;
  title: string;
  subtitle?: string;
  slug?: string;
  content: string;
  excerpt: string;
  publishedAt?: Date;
  publishDate?: Date;
  lastUpdated?: Date;
  tags: string[];
  sdgClusters?: number[];
  readTime: number;
  semanticSignals?: SemanticSignal[];
  ritualElements?: string[];
  author: string | PersonaArchetype;
  flourishValue?: number;
  status?: "draft" | "published" | "archived";
  category: string;
  featured?: boolean;
  image?: string;
  views?: number;
  likes?: number;
  aiGenerated?: boolean;
}
export interface ContactForm {
  serviceType: string;
  name: string;
  email: string;
  organization?: string;
  projectDescription: string;
  timeline: string;
  budget: string;
  sacredIntention: string;
  preferredPayment: string;
  ritualPreference: "full_ceremony" | "light_ritual" | "no_ritual";
}

export interface BookingCalendar {
  availableSlots: TimeSlot[];
  bookedSlots: TimeSlot[];
  ritualBlocks: RitualBlock[];
  timezone: string;
}

export interface TimeSlot {
  start: Date;
  end: Date;
  type: "consultation" | "ceremony" | "workshop" | "retreat";
  available: boolean;
  ritualPreparation?: string;
}

export interface RitualBlock {
  start: Date;
  end: Date;
  type: "new_moon" | "full_moon" | "solstice" | "equinox" | "personal_ceremony";
  description: string;
  availability: "closed" | "open" | "invitation_only";
}

export interface IntelligenceInsight {
  id: string;
  title: string;
  type: "technology" | "governance" | "research" | "social" | "ecological";
  urgency: "low" | "medium" | "high" | "critical";
  content: string;
  tags: string[];
  timestamp: Date;
  source: string;
}

export interface ServiceUpdate {
  id: string;
  type:
    | "new_offering"
    | "capacity_expansion"
    | "methodology_breakthrough"
    | "pricing_update";
  title: string;
  description: string;
  urgency: "low" | "medium" | "high" | "critical";
  availableSlots: number;
  pricing: string;
  deadline: Date;
}
