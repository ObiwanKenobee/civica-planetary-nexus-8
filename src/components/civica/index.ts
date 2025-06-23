// CIVICA 144 Components - Barrel Export
// Sacred architecture components for the civilizational operating system

export { default as IntelligenceConstellation } from "./IntelligenceConstellation";

// Component exports will be added as they are created
// export { default as ScrollForge } from './ScrollForge';
// export { default as RitualInterface } from './RitualInterface';
// export { default as WisdomCoPilot } from './WisdomCoPilot';
// export { default as BioregionalNexus } from './BioregionalNexus';
// export { default as SimulationEngine } from './SimulationEngine';
// export { default as CovenatalGovernance } from './CovenatalGovernance';
// export { default as LivingAtlas } from './LivingAtlas';
// export { default as InitiatoryAuth } from './InitiatoryAuth';

// Sacred Economy System (Component 4: Flourish Economy)
export { default as FlourishDisplay } from "../FlourishDisplay";

// Enhanced versions of existing components
// These will extend the existing AtlasOfIntelligence and SacredAuth components
// with the full CIVICA 144 functionality

export * from "@/types/civica";
export * from "@/types/billing";
export * from "@/lib/civica-core";
export { useCivica } from "@/contexts/CivicaContext";
export { useBilling } from "@/hooks/useBilling";
