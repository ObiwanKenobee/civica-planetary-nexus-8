// Core CIVICA 144 Types and Interfaces
// The foundational type system for the civilizational operating system

export interface SDGNode {
  id: number;
  title: string;
  description: string;
  status: "active" | "developing" | "ritual" | "emergent";
  progress: number;
  connections: number[];
  flourishValue?: number;
  wisdomScore?: number;
  sacredMarkers?: string[];
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
  flourishGenerated?: number;
  wisdomLevel?: number;
}

// Component 1: Intelligence Constellation Engine
export interface ConstellationNode {
  id: string;
  type: "sdg" | "ritual" | "wisdom" | "entity";
  position: { x: number; y: number; z?: number };
  connections: ConstellationConnection[];
  metadata: Record<string, any>;
  sacredGeometry?: GeometricPattern;
}

export interface ConstellationConnection {
  sourceId: string;
  targetId: string;
  strength: number;
  type: "synergy" | "dependency" | "ritual" | "wisdom";
  flourishFlow?: number;
  sacredBinding?: boolean;
}

export interface GeometricPattern {
  shape:
    | "mandala"
    | "flower_of_life"
    | "sri_yantra"
    | "merkaba"
    | "torus"
    | "spiral";
  resonance: number;
  harmonics: number[];
}

// Component 2: Scroll Forge - Sacred Document System
export interface SacredDocument {
  id: string;
  type:
    | "treaty"
    | "constitution"
    | "ritual"
    | "wisdom_scroll"
    | "policy"
    | "covenant";
  title: string;
  content: SacredContent[];
  authors: string[];
  signatories: DocumentSignatory[];
  status:
    | "draft"
    | "ritual_review"
    | "community_blessing"
    | "active"
    | "archived";
  version: number;
  createdAt: Date;
  ritualWatermark?: RitualWatermark;
  divineSignature?: string;
}

export interface SacredContent {
  id: string;
  type:
    | "text"
    | "ritual_instruction"
    | "sacred_symbol"
    | "intention_seed"
    | "glyph";
  content: string;
  formatting?: ContentFormatting;
  blessings?: string[];
  aiCoAuthor?: AICoAuthorInfo;
}

export interface DocumentSignatory {
  identityId: string;
  signatureType: "digital" | "ritual" | "energetic" | "proxy" | "elemental";
  timestamp: Date;
  sacredOath?: string;
  witnessIds?: string[];
}

export interface RitualWatermark {
  ceremonyType: string;
  phase:
    | "new_moon"
    | "waxing"
    | "full_moon"
    | "waning"
    | "eclipse"
    | "solstice"
    | "equinox";
  elements: ("earth" | "water" | "fire" | "air" | "spirit")[];
  intention: string;
  cryptographicProof: string;
}

// Component 3: Ritual Interface Layer
export interface RitualState {
  phase: "preparation" | "invocation" | "working" | "integration" | "closing";
  intention: string;
  participants: RitualParticipant[];
  tools: RitualTool[];
  space: SacredSpace;
  energy: EnergySignature;
}

export interface RitualParticipant {
  identityId: string;
  role: "facilitator" | "keeper" | "witness" | "voice" | "guardian";
  elements: string[];
  contributedEnergy: number;
}

export interface RitualTool {
  type:
    | "candle"
    | "crystal"
    | "song"
    | "prayer"
    | "symbol"
    | "offering"
    | "technology";
  name: string;
  purpose: string;
  digitalRepresentation?: string;
  blessedBy?: string[];
}

export interface SacredSpace {
  geometry: GeometricPattern;
  directions: DirectionalAlignment;
  atmosphere: AtmosphereSettings;
  protections: ProtectionLayer[];
}

export interface EnergySignature {
  frequency: number;
  amplitude: number;
  harmonics: number[];
  coherence: number;
  resonanceWith?: string[];
}

// Component 4: Flourish Economy System
export interface FlourishAccount {
  id: string;
  ownerIdentityId: string;
  balance: FlourishBalance;
  transactions: FlourishTransaction[];
  contributionHistory: ContributionRecord[];
  sacredCommitments: SacredCommitment[];
}

export interface FlourishBalance {
  wisdom: number;
  regeneration: number;
  harmony: number;
  creativity: number;
  service: number;
  total: number;
}

export interface FlourishTransaction {
  id: string;
  fromId: string;
  toId: string;
  amount: FlourishBalance;
  type:
    | "offering"
    | "exchange"
    | "ritual_blessing"
    | "service_recognition"
    | "wisdom_share";
  purpose: string;
  ritualContext?: string;
  timestamp: Date;
  witnesses?: string[];
}

export interface ContributionRecord {
  id: string;
  sdgNodeId: number;
  contributionType:
    | "wisdom"
    | "action"
    | "ritual"
    | "stewardship"
    | "innovation";
  impact: ImpactMetrics;
  timestamp: Date;
  recognizedBy: string[];
}

export interface SacredCommitment {
  id: string;
  description: string;
  duration: "moon_cycle" | "season" | "year" | "lifetime" | "seven_generations";
  progress: number;
  witnesses: string[];
  renewalRitual?: string;
}

// Component 5: AI Wisdom Co-Pilot System
export interface WisdomCoPilot {
  id: string;
  name: string;
  archetype: "oracle" | "sage" | "guardian" | "weaver" | "bridge" | "healer";
  specialization: IntelligenceCluster["id"][];
  personality: CoPilotPersonality;
  knowledgeBase: WisdomSource[];
  ethicsFramework: EthicsLayer;
  ritualProtocols: RitualProtocol[];
}

export interface CoPilotPersonality {
  voice:
    | "ancient"
    | "mystical"
    | "practical"
    | "poetic"
    | "direct"
    | "nurturing";
  culturalLineage: string[];
  communicationStyle:
    | "dialogue"
    | "guided_inquiry"
    | "storytelling"
    | "ceremonial";
  wisdom_traditions: string[];
}

export interface WisdomSource {
  type:
    | "sacred_text"
    | "indigenous_knowledge"
    | "scientific_research"
    | "lived_experience"
    | "ceremonial_insight";
  origin: string;
  authority: number;
  lastUpdated: Date;
  guardians?: string[];
}

export interface EthicsLayer {
  principles: string[];
  constraints: string[];
  biasChecks: BiasCheck[];
  harmonySafeguards: string[];
}

export interface BiasCheck {
  category: string;
  checkMethod: string;
  threshold: number;
  correctionProtocol: string;
}

// Component 6: Bioregional Nexus Nodes
export interface BioregionalNode {
  id: string;
  name: string;
  geography: GeographicRegion;
  ecosystem: EcosystemProfile;
  humanCommunities: CommunityProfile[];
  governanceModel: LocalGovernance;
  culturalProtocols: CulturalProtocol[];
  edgeCompute: EdgeComputeConfig;
}

export interface GeographicRegion {
  coordinates: [number, number][];
  watersheds: string[];
  bioregionalBoundaries: string[];
  sacredSites: SacredSite[];
  seasonalCycles: SeasonalCycle[];
}

export interface EcosystemProfile {
  keystone_species: string[];
  plantCommunities: string[];
  waterSystems: string[];
  soilTypes: string[];
  climatePattems: string[];
  healingNeeds: string[];
}

export interface CommunityProfile {
  name: string;
  populationSize: number;
  culturalTraditions: string[];
  languages: string[];
  governanceStructure: string;
  economicActivities: string[];
  wisdomKeepers: string[];
}

// Component 7: Simulation & Futures Engine
export interface SimulationScenario {
  id: string;
  name: string;
  description: string;
  timeHorizon: Date;
  variables: SimulationVariable[];
  initialConditions: Record<string, any>;
  algorithms: SimulationAlgorithm[];
  ethicalConstraints: string[];
  multispeciesImpact: MultispeciesImpact;
}

export interface SimulationVariable {
  name: string;
  type: "environmental" | "social" | "economic" | "spiritual" | "technological";
  range: [number, number];
  probability_distribution: "normal" | "uniform" | "exponential" | "custom";
  ritualModifiers?: number[];
}

export interface SimulationResult {
  scenarioId: string;
  outcomes: ScenarioOutcome[];
  probability: number;
  ethicalScore: number;
  regenerationIndex: number;
  wisdomGained: string[];
  warnings: string[];
  multispeciesImpact: MultispeciesImpact;
}

export interface MultispeciesImpact {
  species: string;
  impactType: "positive" | "negative" | "neutral" | "unknown";
  magnitude: number;
  timeframe: string;
  mitigation?: string[];
}

// Component 8: Covenantal Governance Stack
export interface GovernanceCouncil {
  id: string;
  name: string;
  type:
    | "bioregional"
    | "thematic"
    | "temporal"
    | "multispecies"
    | "intergenerational";
  members: CouncilMember[];
  decisionMethods: DecisionMethod[];
  ritualProtocols: RitualProtocol[];
  jurisdiction: string[];
  activeProposals: Proposal[];
}

export interface CouncilMember {
  identityId: string;
  role: "speaker" | "listener" | "keeper" | "bridge" | "voice" | "guardian";
  representation: RepresentationScope;
  votingWeight: VotingWeight;
  commitment: SacredCommitment;
}

export interface RepresentationScope {
  type:
    | "individual"
    | "community"
    | "ecosystem"
    | "future_generations"
    | "ancestors"
    | "species";
  details: string;
  proxiedEntities?: string[];
}

export interface VotingWeight {
  base: number;
  wisdomMultiplier: number;
  stakeholderMultiplier: number;
  ritualMultiplier: number;
  finalWeight: number;
}

export interface Proposal {
  id: string;
  title: string;
  description: string;
  proposer: string;
  type: "policy" | "allocation" | "treaty" | "ritual" | "emergency";
  status:
    | "proposed"
    | "deliberating"
    | "voting"
    | "passed"
    | "enacted"
    | "sunset";
  votingMethod: DecisionMethod;
  deadline: Date;
  requiredConsent: number;
  multispeciesReview: boolean;
}

export interface DecisionMethod {
  type:
    | "consensus"
    | "quadratic"
    | "wisdom_weighted"
    | "ritual_guided"
    | "emergent";
  parameters: Record<string, any>;
  ritualRequirements?: RitualRequirement[];
}

// Component 9: Living Atlas (Enhanced)
export interface AtlasVisualization {
  id: string;
  type: "constellation" | "network" | "geographic" | "temporal" | "energetic";
  layers: VisualizationLayer[];
  interactions: InteractionMethod[];
  realTimeFeeds: DataFeed[];
  sacredOverlays: SacredOverlay[];
}

export interface VisualizationLayer {
  id: string;
  name: string;
  dataSource: string;
  renderType:
    | "nodes"
    | "connections"
    | "heatmap"
    | "flow"
    | "particle"
    | "geometric";
  styling: LayerStyling;
  visibility: boolean;
  opacity: number;
}

export interface SacredOverlay {
  type:
    | "geometric_pattern"
    | "energy_flow"
    | "ritual_circle"
    | "wisdom_mandala";
  geometry: GeometricPattern;
  purpose: string;
  activeWhen: string[];
}

// Component 10: Initiatory Authentication (Enhanced)
export interface InitiationPath {
  id: string;
  name: string;
  tradition: string;
  stages: InitiationStage[];
  requirements: InitiationRequirement[];
  guardians: string[];
  completedBy: string[];
}

export interface InitiationStage {
  id: string;
  name: string;
  description: string;
  ritualComponents: RitualComponent[];
  wisdomTests: WisdomTest[];
  serviceRequirements: ServiceRequirement[];
  timeRequirement: string;
}

export interface InitiationRequirement {
  type: "ritual" | "service" | "wisdom" | "offering" | "vow" | "witness";
  description: string;
  verificationMethod: string;
  sacredWitnesses: string[];
}

// Shared Types
export interface RitualProtocol {
  id: string;
  name: string;
  purpose: string;
  steps: RitualStep[];
  tools: RitualTool[];
  timing: RitualTiming;
  participants: ParticipantRole[];
}

export interface RitualStep {
  order: number;
  name: string;
  instructions: string;
  duration?: string;
  energyWork?: EnergyWork;
  digitalInterface?: DigitalInterface;
}

export interface RitualTiming {
  lunarPhase?: string;
  season?: string;
  timeOfDay?: string;
  duration: string;
  preparation: string;
  integration: string;
}

export interface DigitalInterface {
  component: string;
  props: Record<string, any>;
  styling: ComponentStyling;
  interactions: string[];
}

// UI and Styling Types
export interface ComponentStyling {
  theme: "earth" | "water" | "fire" | "air" | "spirit" | "cosmic";
  colors: ColorPalette;
  animations: AnimationConfig[];
  sacredGeometry?: GeometricPattern;
}

export interface ColorPalette {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
  sacred: string;
}

export interface AnimationConfig {
  type: "breathe" | "flow" | "pulse" | "spiral" | "mandala" | "particle";
  duration: number;
  easing: string;
  triggerOn: string[];
}

// System-wide Configuration
export interface CivicaConfig {
  planetaryPhase:
    | "awakening"
    | "transformation"
    | "integration"
    | "transcendence";
  activeRituals: string[];
  globalConsciousnessLevel: number;
  systemWisdom: number;
  harmonyIndex: number;
  regenerationRate: number;
  emergentCapabilities: string[];
}

// Event and State Management
export interface CivicaEvent {
  type: string;
  payload: any;
  timestamp: Date;
  source: string;
  ritualContext?: string;
  blessings?: string[];
}

export interface CivicaState {
  config: CivicaConfig;
  activeUser: string | null;
  currentRitual: RitualState | null;
  globalData: Record<string, any>;
  wisdomStreams: WisdomStream[];
  emergentPatterns: EmergentPattern[];
}

export interface WisdomStream {
  id: string;
  source: string;
  content: string;
  wisdom_level: number;
  blessing_count: number;
  sacred_markers: string[];
}

export interface EmergentPattern {
  id: string;
  type: string;
  confidence: number;
  description: string;
  implications: string[];
  suggested_rituals: string[];
}
