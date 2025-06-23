// CIVICA 144 ScrollSignal Configuration Management
// Production-level configuration and environment management

import { ScrollSignalConfig } from "@/types/scrollSignal";

export class ScrollSignalConfigManager {
  private static instance: ScrollSignalConfigManager;
  private config: ScrollSignalConfig | null = null;
  private environment: "development" | "staging" | "production" = "development";

  private constructor() {
    this.detectEnvironment();
    this.loadConfiguration();
  }

  public static getInstance(): ScrollSignalConfigManager {
    if (!ScrollSignalConfigManager.instance) {
      ScrollSignalConfigManager.instance = new ScrollSignalConfigManager();
    }
    return ScrollSignalConfigManager.instance;
  }

  private detectEnvironment(): void {
    const hostname = window.location.hostname;
    const isDev =
      hostname === "localhost" ||
      hostname === "127.0.0.1" ||
      hostname.includes("dev");
    const isStaging = hostname.includes("staging") || hostname.includes("test");

    if (isDev) {
      this.environment = "development";
    } else if (isStaging) {
      this.environment = "staging";
    } else {
      this.environment = "production";
    }
  }

  private loadConfiguration(): void {
    const baseConfig = {
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
        iotSensors: [],
        wavelengthZones: [],
      },
      ritual: {
        blessingRequired: true,
        ceremonyTypes: [
          "blessing_circle",
          "healing_ritual",
          "decision_council",
        ],
        elderApproval: true,
        sacredProtocols: [],
      },
      community: {
        healthcareModule: true,
        educationModule: true,
        environmentModule: true,
        culturalArchive: true,
        multispeciesAwareness: true,
      },
    };

    // Environment-specific overrides
    const envOverrides = this.getEnvironmentOverrides();
    this.config = { ...baseConfig, ...envOverrides };
  }

  private getEnvironmentOverrides(): Partial<ScrollSignalConfig> {
    switch (this.environment) {
      case "development":
        return {
          ai: {
            bedrockModel: "anthropic.claude-3-sonnet",
            sagemakerEndpoint: "dev-civica-scroll-generator",
            amazonQEnabled: false,
            languageSupport: ["en"],
            contextWindow: 50000,
          },
          simulation: {
            edgeComputing: false,
            realTimeSync: false,
            fiveGEnabled: false,
            iotSensors: [],
            wavelengthZones: ["dev-zone"],
          },
        };

      case "staging":
        return {
          ai: {
            bedrockModel: "anthropic.claude-3-sonnet",
            sagemakerEndpoint: "staging-civica-scroll-generator",
            amazonQEnabled: true,
            languageSupport: ["en", "sw"],
            contextWindow: 75000,
          },
          simulation: {
            edgeComputing: true,
            realTimeSync: true,
            fiveGEnabled: false,
            iotSensors: [],
            wavelengthZones: ["staging-us-west-2"],
          },
        };

      case "production":
        return {
          ai: {
            bedrockModel: "anthropic.claude-3-sonnet",
            sagemakerEndpoint: "prod-civica-scroll-generator",
            amazonQEnabled: true,
            languageSupport: ["en", "sw", "es", "fr", "pt", "ar", "hi", "zu"],
            contextWindow: 100000,
          },
          simulation: {
            edgeComputing: true,
            realTimeSync: true,
            fiveGEnabled: true,
            iotSensors: [],
            wavelengthZones: [
              "us-west-2-wl1",
              "eu-west-1-wl1",
              "ap-south-1-wl1",
            ],
          },
        };

      default:
        return {};
    }
  }

  public getConfig(): ScrollSignalConfig {
    if (!this.config) {
      throw new Error("Configuration not loaded");
    }
    return this.config;
  }

  public getEnvironment(): string {
    return this.environment;
  }

  public updateConfig(updates: Partial<ScrollSignalConfig>): void {
    if (!this.config) {
      throw new Error("Configuration not loaded");
    }
    this.config = { ...this.config, ...updates };
  }

  public isFeatureEnabled(feature: string): boolean {
    if (!this.config) return false;

    switch (feature) {
      case "voice_input":
        return this.config.voice.enabled;
      case "ai_generation":
        return !!this.config.ai.bedrockModel;
      case "edge_computing":
        return this.config.simulation.edgeComputing;
      case "5g_connectivity":
        return this.config.simulation.fiveGEnabled;
      case "ritual_blessing":
        return this.config.ritual.blessingRequired;
      case "cultural_archive":
        return this.config.community.culturalArchive;
      default:
        return false;
    }
  }

  public getApiEndpoints(): Record<string, string> {
    const baseUrl =
      this.environment === "production"
        ? "https://api.civica144.com"
        : this.environment === "staging"
          ? "https://staging-api.civica144.com"
          : "http://localhost:3001";

    return {
      bedrock: `${baseUrl}/ai/bedrock`,
      sagemaker: `${baseUrl}/ai/sagemaker`,
      amazonQ: `${baseUrl}/ai/amazonq`,
      iot: `${baseUrl}/iot`,
      simulation: `${baseUrl}/simulation`,
      community: `${baseUrl}/community`,
      cultural: `${baseUrl}/cultural`,
    };
  }

  public validateConfiguration(): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!this.config) {
      errors.push("Configuration not loaded");
      return { isValid: false, errors };
    }

    // Validate voice configuration
    if (this.config.voice.enabled && this.config.voice.languages.length === 0) {
      errors.push("Voice enabled but no languages configured");
    }

    // Validate AI configuration
    if (!this.config.ai.bedrockModel) {
      errors.push("No AI model configured");
    }

    // Validate environment-specific requirements
    if (this.environment === "production") {
      if (!this.config.simulation.fiveGEnabled) {
        errors.push("5G should be enabled in production");
      }
      if (this.config.ai.languageSupport.length < 3) {
        errors.push("Production should support multiple languages");
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  public getHealthCheck(): Promise<{
    status: string;
    checks: Record<string, boolean>;
  }> {
    return new Promise((resolve) => {
      const checks = {
        configuration_loaded: !!this.config,
        voice_api_available:
          typeof window !== "undefined" && "webkitSpeechRecognition" in window,
        local_storage_available: typeof localStorage !== "undefined",
        network_available: navigator.onLine,
        ai_endpoints_configured: !!this.config?.ai.bedrockModel,
      };

      const status = Object.values(checks).every(Boolean)
        ? "healthy"
        : "degraded";

      resolve({ status, checks });
    });
  }

  public exportConfiguration(): string {
    return JSON.stringify(
      {
        environment: this.environment,
        config: this.config,
        timestamp: new Date().toISOString(),
      },
      null,
      2,
    );
  }

  public importConfiguration(configJson: string): boolean {
    try {
      const imported = JSON.parse(configJson);
      if (imported.config) {
        this.config = imported.config;
        return true;
      }
      return false;
    } catch (error) {
      console.error("Failed to import configuration:", error);
      return false;
    }
  }
}

// Export singleton instance
export const scrollSignalConfig = ScrollSignalConfigManager.getInstance();

// Export configuration validation utilities
export const validateScrollSignalConfig = (
  config: Partial<ScrollSignalConfig>,
): string[] => {
  const errors: string[] = [];

  if (
    config.voice?.enabled &&
    (!config.voice.languages || config.voice.languages.length === 0)
  ) {
    errors.push("Voice input enabled but no languages specified");
  }

  if (config.ai?.contextWindow && config.ai.contextWindow < 1000) {
    errors.push("AI context window too small (minimum 1000 tokens)");
  }

  if (
    config.simulation?.fiveGEnabled &&
    !config.simulation.wavelengthZones?.length
  ) {
    errors.push("5G enabled but no wavelength zones configured");
  }

  return errors;
};

// Development helpers
export const getDebugInfo = () => {
  const config = scrollSignalConfig.getConfig();
  return {
    environment: scrollSignalConfig.getEnvironment(),
    features: {
      voiceInput: scrollSignalConfig.isFeatureEnabled("voice_input"),
      aiGeneration: scrollSignalConfig.isFeatureEnabled("ai_generation"),
      edgeComputing: scrollSignalConfig.isFeatureEnabled("edge_computing"),
      fiveG: scrollSignalConfig.isFeatureEnabled("5g_connectivity"),
      ritualBlessing: scrollSignalConfig.isFeatureEnabled("ritual_blessing"),
      culturalArchive: scrollSignalConfig.isFeatureEnabled("cultural_archive"),
    },
    validation: scrollSignalConfig.validateConfiguration(),
    endpoints: scrollSignalConfig.getApiEndpoints(),
  };
};
