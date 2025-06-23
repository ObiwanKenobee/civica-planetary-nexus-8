// CIVICA 144 ScrollSignal Types
// Generative AI-powered civic intelligence platform

export interface ScrollSignalConfig {
  voice: VoiceConfig;
  ai: AIConfig;
  simulation: SimulationConfig;
  ritual: RitualConfig;
  community: CommunityConfig;
}

export interface VoiceConfig {
  enabled: boolean;
  languages: string[];
  wakeWord: string;
  confidence: number;
  noiseReduction: boolean;
}

export interface AIConfig {
  bedrockModel: string;
  sagemakerEndpoint: string;
  amazonQEnabled: boolean;
  languageSupport: string[];
  contextWindow: number;
}

export interface SimulationConfig {
  edgeComputing: boolean;
  realTimeSync: boolean;
  fiveGEnabled: boolean;
  iotSensors: IoTSensorConfig[];
  wavelengthZones: string[];
}

export interface RitualConfig {
  blessingRequired: boolean;
  ceremonyTypes: CeremonyType[];
  elderApproval: boolean;
  sacredProtocols: SacredProtocol[];
}

export interface CommunityConfig {
  healthcareModule: boolean;
  educationModule: boolean;
  environmentModule: boolean;
  culturalArchive: boolean;
  multispeciesAwareness: boolean;
}

export interface CivicScroll {
  id: string;
  title: string;
  content: string;
  type: ScrollType;
  status: ScrollStatus;
  createdBy: CommunityMember;
  createdAt: Date;
  lastModified: Date;
  voiceInput?: VoiceRecording;
  aiGenerated: boolean;
  blessings: Blessing[];
  simulation: SimulationResult;
  communityImpact: CommunityImpact;
  sdgAlignment: SDGAlignment[];
  ritual: RitualData;
  culturalContext: CulturalContext;
  metadata: ScrollMetadata;
}

export type ScrollType =
  | "healthcare"
  | "education"
  | "environment"
  | "cultural"
  | "governance"
  | "emergency"
  | "ritual"
  | "memory";

export type ScrollStatus =
  | "creating"
  | "pending_blessing"
  | "blessed"
  | "active"
  | "completed"
  | "archived";

export interface CommunityMember {
  id: string;
  name: string;
  role: CommunityRole;
  village: string;
  languages: string[];
  avatar?: string;
  wisdom: number;
  contributions: number;
}

export type CommunityRole =
  | "elder"
  | "healer"
  | "teacher"
  | "farmer"
  | "guardian"
  | "child"
  | "visitor";

export interface VoiceRecording {
  audioUrl: string;
  transcript: string;
  language: string;
  confidence: number;
  duration: number;
  waveform: number[];
}

export interface Blessing {
  id: string;
  blessedBy: CommunityMember;
  type: BlessingType;
  timestamp: Date;
  intention: string;
  ceremony?: CeremonyRecord;
  power: number;
}

export type BlessingType =
  | "elder_wisdom"
  | "community_consent"
  | "ancestral_guidance"
  | "nature_harmony"
  | "divine_approval"
  | "collective_prayer";

export interface CeremonyRecord {
  id: string;
  type: CeremonyType;
  participants: CommunityMember[];
  duration: number;
  sacredElements: string[];
  outcome: CeremonyOutcome;
}

export type CeremonyType =
  | "blessing_circle"
  | "healing_ritual"
  | "decision_council"
  | "seasonal_ceremony"
  | "emergency_gathering"
  | "memory_keeping";

export type CeremonyOutcome =
  | "unanimous_approval"
  | "majority_consent"
  | "elder_guidance_needed"
  | "postponed"
  | "rejected";

export interface SimulationResult {
  id: string;
  scenario: string;
  predictions: Prediction[];
  confidence: number;
  timeHorizon: string;
  factors: SimulationFactor[];
  multispeciesImpact: SpeciesImpact[];
  recommendations: Recommendation[];
}

export interface Prediction {
  aspect: string;
  likelihood: number;
  impact: "low" | "medium" | "high" | "critical";
  timeline: string;
  mitigation: string[];
}

export interface SimulationFactor {
  type: "environmental" | "social" | "economic" | "cultural" | "technological";
  name: string;
  weight: number;
  currentValue: number;
  trend: "increasing" | "decreasing" | "stable" | "volatile";
}

export interface SpeciesImpact {
  species: string;
  impact: "positive" | "negative" | "neutral";
  severity: number;
  timeframe: string;
  mitigation: string[];
}

export interface Recommendation {
  priority: "immediate" | "short_term" | "long_term";
  action: string;
  resources: string[];
  responsibility: CommunityRole[];
  blessing: boolean;
}

export interface CommunityImpact {
  healthcare: HealthcareImpact;
  education: EducationImpact;
  environment: EnvironmentImpact;
  culture: CulturalImpact;
  overall: OverallImpact;
}

export interface HealthcareImpact {
  livesAffected: number;
  severityReduction: number;
  accessImprovement: number;
  preventionEffectiveness: number;
  healerWorkload: "reduced" | "maintained" | "increased";
}

export interface EducationImpact {
  studentsAffected: number;
  learningImprovement: number;
  accessIncrease: number;
  culturalPreservation: number;
  teacherSupport: "enhanced" | "maintained" | "strained";
}

export interface EnvironmentImpact {
  ecosystemHealth: number;
  waterQuality: number;
  soilHealth: number;
  biodiversity: number;
  climateResilience: number;
  sustainability: "regenerative" | "neutral" | "extractive";
}

export interface CulturalImpact {
  traditionPreservation: number;
  intergenerationalTransfer: number;
  languageVitality: number;
  ceremonyIntegrity: number;
  communityBonding: number;
  wisdomDocumentation: "enhanced" | "maintained" | "lost";
}

export interface OverallImpact {
  sdgScore: number;
  communityWellbeing: number;
  sustainability: number;
  resilience: number;
  harmony: number;
  risk: "low" | "medium" | "high";
}

export interface SDGAlignment {
  goal: number;
  target: string;
  alignment: number;
  contribution: string;
  metrics: SDGMetric[];
}

export interface SDGMetric {
  indicator: string;
  baseline: number;
  projected: number;
  improvement: number;
  timeline: string;
}

export interface RitualData {
  required: boolean;
  type: CeremonyType;
  participants: CommunityMember[];
  sacredElements: SacredElement[];
  timing: RitualTiming;
  protocol: SacredProtocol;
  energy: RitualEnergy;
}

export interface SacredElement {
  name: string;
  type: "physical" | "verbal" | "energetic" | "symbolic";
  significance: string;
  availability: boolean;
}

export interface RitualTiming {
  preferred:
    | "dawn"
    | "midday"
    | "dusk"
    | "midnight"
    | "moon_phase"
    | "seasonal";
  duration: number;
  preparation: number;
  followUp: number;
}

export interface SacredProtocol {
  name: string;
  steps: ProtocolStep[];
  permissions: PermissionLevel[];
  restrictions: string[];
  variations: ProtocolVariation[];
}

export interface ProtocolStep {
  order: number;
  action: string;
  performer: CommunityRole;
  duration: number;
  materials: string[];
  energy: "grounding" | "raising" | "balancing" | "releasing";
}

export type PermissionLevel =
  | "elder_only"
  | "initiated_only"
  | "community_member"
  | "visitor_welcome"
  | "children_included";

export interface ProtocolVariation {
  name: string;
  context: string;
  modifications: string[];
  appropriateness: string[];
}

export interface RitualEnergy {
  intention: string;
  frequency: "healing" | "wisdom" | "protection" | "abundance" | "harmony";
  amplitude: number;
  direction: "inward" | "outward" | "circular" | "spiral";
  resonance: string[];
}

export interface CulturalContext {
  village: string;
  region: string;
  language: string;
  traditions: Tradition[];
  ancestors: AncestralWisdom[];
  symbols: CulturalSymbol[];
  stories: CommunityStory[];
}

export interface Tradition {
  name: string;
  type: "seasonal" | "lifecycle" | "healing" | "governance" | "spiritual";
  description: string;
  participants: CommunityRole[];
  frequency: string;
  significance: string;
  variations: string[];
}

export interface AncestralWisdom {
  source: string;
  teaching: string;
  context: string;
  relevance: number;
  keeper: CommunityMember;
  verified: boolean;
}

export interface CulturalSymbol {
  symbol: string;
  meaning: string;
  usage: string[];
  sacredness: "open" | "restricted" | "sacred" | "taboo";
  variations: SymbolVariation[];
}

export interface SymbolVariation {
  context: string;
  form: string;
  meaning: string;
  appropriateness: string;
}

export interface CommunityStory {
  title: string;
  type: "origin" | "teaching" | "warning" | "celebration" | "healing";
  teller: CommunityMember;
  audience: CommunityRole[];
  moral: string;
  symbols: string[];
  versions: StoryVersion[];
}

export interface StoryVersion {
  variant: string;
  context: string;
  modifications: string[];
  appropriateness: string[];
}

export interface ScrollMetadata {
  version: number;
  language: string;
  dialect?: string;
  translation?: Translation[];
  accessibility: AccessibilityFeatures;
  privacy: PrivacySettings;
  sharing: SharingPermissions;
  preservation: PreservationSettings;
}

export interface Translation {
  language: string;
  content: string;
  quality: number;
  translator: string;
  cultural_adaptation: boolean;
}

export interface AccessibilityFeatures {
  audioVersion: boolean;
  visualAids: boolean;
  simplifiedLanguage: boolean;
  symbolicRepresentation: boolean;
  tactileElements: boolean;
}

export interface PrivacySettings {
  level: "public" | "community" | "elders" | "private";
  restrictions: string[];
  anonymization: boolean;
  retention: number;
}

export interface SharingPermissions {
  withinVillage: boolean;
  acrossRegion: boolean;
  globally: boolean;
  commercial: boolean;
  research: boolean;
  educational: boolean;
}

export interface PreservationSettings {
  archival: boolean;
  blockchain: boolean;
  physicalCopy: boolean;
  oralTransmission: boolean;
  priority: "low" | "medium" | "high" | "critical";
}

export interface IoTSensorConfig {
  type: IoTSensorType;
  location: string;
  frequency: number;
  accuracy: number;
  battery: number;
  connectivity: "5G" | "LoRaWAN" | "WiFi" | "Satellite";
}

export type IoTSensorType =
  | "water_quality"
  | "soil_moisture"
  | "air_quality"
  | "weather"
  | "crop_health"
  | "livestock"
  | "energy"
  | "health_monitor";

export interface ScrollSignalState {
  isListening: boolean;
  currentScroll: CivicScroll | null;
  scrollHistory: CivicScroll[];
  activeSimulations: SimulationResult[];
  communityMembers: CommunityMember[];
  ritualQueue: RitualData[];
  iotData: IoTReading[];
  culturalArchive: CommunityStory[];
  blessings: Blessing[];
}

export interface IoTReading {
  sensorId: string;
  type: IoTSensorType;
  value: number;
  unit: string;
  timestamp: Date;
  location: string;
  quality: "excellent" | "good" | "fair" | "poor";
  alert: boolean;
}

export interface ScrollSignalAction {
  type: ScrollSignalActionType;
  payload?: any;
}

export type ScrollSignalActionType =
  | "START_LISTENING"
  | "STOP_LISTENING"
  | "VOICE_INPUT"
  | "GENERATE_SCROLL"
  | "REQUEST_BLESSING"
  | "SIMULATE_IMPACT"
  | "EXECUTE_ACTION"
  | "ARCHIVE_SCROLL"
  | "UPDATE_IOT_DATA"
  | "ADD_COMMUNITY_MEMBER"
  | "CULTURAL_MEMORY_ADD";

export interface ScrollGenerationRequest {
  voiceInput?: VoiceRecording;
  textInput?: string;
  type: ScrollType;
  urgency: "low" | "medium" | "high" | "emergency";
  requester: CommunityMember;
  context: CulturalContext;
  preferences: GenerationPreferences;
}

export interface GenerationPreferences {
  language: string;
  formality: "casual" | "formal" | "ceremonial" | "ancient";
  length: "brief" | "moderate" | "detailed" | "comprehensive";
  imagery: boolean;
  symbols: boolean;
  ritual_integration: boolean;
  ai_creativity: number;
}
