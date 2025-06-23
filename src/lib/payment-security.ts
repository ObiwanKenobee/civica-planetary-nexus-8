// CIVICA 144 Payment Security Core
// Sacred security for the civilizational operating system

// Using Web Crypto API instead of crypto-js for better browser compatibility
import {
  PaymentSecurityConfig,
  EncryptionResult,
  DecryptionInput,
  SecurityEvent,
  SecurityEventType,
  TransactionAudit,
  FraudAnalysis,
  FraudFactor,
  RateLimitResult,
  PaymentSecurityError,
  FraudDetectedError,
  RateLimitExceededError,
  EncryptionError,
  WebhookVerificationError,
} from "@/types/payment-security";

// Security Configuration
export const PAYMENT_SECURITY_CONFIG: PaymentSecurityConfig = {
  encryption: {
    algorithm: "AES-256-GCM",
    keyRotationInterval: 24 * 60 * 60 * 1000, // 24 hours
    tokenExpiration: 15 * 60 * 1000, // 15 minutes
    saltRounds: 12,
  },
  rateLimit: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    maxRequests: 100,
    skipSuccessfulRequests: false,
  },
  fraud: {
    velocityChecking: true,
    geoLocationValidation: true,
    deviceFingerprinting: true,
    behavioralAnalysis: true,
    minimumRiskScore: 75,
  },
  audit: {
    logAllTransactions: true,
    logFailedAttempts: true,
    retentionPeriod: 7 * 365 * 24 * 60 * 60 * 1000, // 7 years for compliance
    complianceReporting: true,
  },
  compliance: {
    pciDss: true,
    gdpr: true,
    ccpa: true,
    soc2: true,
    dataLocalization: ["EU", "US", "CA"],
  },
};

// Encryption Utilities
export class PaymentEncryption {
  private static readonly SECRET_KEY =
    import.meta.env.VITE_ENCRYPTION_KEY || "CIVICA_DEFAULT_KEY";

  static async encrypt(data: string, key: string): Promise<EncryptionResult> {
    try {
      // Convert key to CryptoKey
      const encoder = new TextEncoder();
      const keyData = encoder.encode(key.padEnd(32, "0").slice(0, 32)); // Ensure 32 bytes
      const cryptoKey = await crypto.subtle.importKey(
        "raw",
        keyData,
        { name: "AES-GCM" },
        false,
        ["encrypt"],
      );

      // Generate IV
      const iv = crypto.getRandomValues(new Uint8Array(12));

      // Encrypt data
      const encodedData = encoder.encode(data);
      const encryptedBuffer = await crypto.subtle.encrypt(
        { name: "AES-GCM", iv },
        cryptoKey,
        encodedData,
      );

      // Convert to base64 strings
      const encrypted = btoa(
        String.fromCharCode(...new Uint8Array(encryptedBuffer)),
      );
      const ivBase64 = btoa(String.fromCharCode(...iv));

      return {
        encrypted,
        iv: ivBase64,
        tag: "", // Web Crypto API handles the tag internally
        algorithm: "AES-256-GCM",
      };
    } catch (error) {
      throw new EncryptionError("Encryption failed", { originalError: error });
    }
  }

  static decrypt(input: DecryptionInput): string {
    try {
      // For demo purposes, return a placeholder since Web Crypto API decrypt is complex
      // In production, implement proper Web Crypto API decryption
      return "decrypted-data";
    } catch (error) {
      throw new EncryptionError(`Decryption failed: ${error}`);
    }
  }

  static generateSecureToken(): string {
    const array = new Uint8Array(32);
    crypto.getRandomValues(array);
    return Array.from(array, (byte) => byte.toString(16).padStart(2, "0")).join(
      "",
    );
  }

  static hashPassword(password: string, salt?: string): string {
    // Simplified hash for demo - in production use proper PBKDF2 with Web Crypto API
    const saltToUse =
      salt || crypto.getRandomValues(new Uint8Array(16)).toString();
    return btoa(password + saltToUse).replace(/[^a-zA-Z0-9]/g, "");
  }

  static verifySignature(
    payload: string,
    signature: string,
    secret: string,
  ): boolean {
    // Simplified verification for demo - in production use proper HMAC with Web Crypto API
    const computedSignature = btoa(payload + secret).replace(
      /[^a-zA-Z0-9]/g,
      "",
    );
    return computedSignature === signature;
  }
}

// Rate Limiting
export class PaymentRateLimit {
  private static requests = new Map<
    string,
    { count: number; resetTime: number }
  >();

  static async checkRateLimit(
    identifier: string,
    config = PAYMENT_SECURITY_CONFIG.rateLimit,
  ): Promise<RateLimitResult> {
    const now = Date.now();
    const key = `payment:${identifier}`;
    const existing = this.requests.get(key);

    if (!existing || now > existing.resetTime) {
      this.requests.set(key, {
        count: 1,
        resetTime: now + config.windowMs,
      });

      return {
        allowed: true,
        remaining: config.maxRequests - 1,
        resetTime: now + config.windowMs,
      };
    }

    if (existing.count >= config.maxRequests) {
      return {
        allowed: false,
        remaining: 0,
        resetTime: existing.resetTime,
        retryAfter: existing.resetTime - now,
      };
    }

    existing.count++;
    this.requests.set(key, existing);

    return {
      allowed: true,
      remaining: config.maxRequests - existing.count,
      resetTime: existing.resetTime,
    };
  }

  static clearRateLimit(identifier: string): void {
    this.requests.delete(`payment:${identifier}`);
  }
}

// Fraud Detection
export class FraudDetection {
  static analyzeFraudRisk(
    transactionData: any,
    userHistory: any[] = [],
    config = PAYMENT_SECURITY_CONFIG.fraud,
  ): FraudAnalysis {
    const factors: FraudFactor[] = [];
    let totalScore = 0;
    let totalWeight = 0;

    // Velocity Checking
    if (config.velocityChecking) {
      const velocityFactor = this.analyzeVelocity(transactionData, userHistory);
      factors.push(velocityFactor);
      totalScore += velocityFactor.score * velocityFactor.weight;
      totalWeight += velocityFactor.weight;
    }

    // Amount Analysis
    const amountFactor = this.analyzeAmount(transactionData, userHistory);
    factors.push(amountFactor);
    totalScore += amountFactor.score * amountFactor.weight;
    totalWeight += amountFactor.weight;

    // Geographic Analysis
    if (config.geoLocationValidation && transactionData.geoLocation) {
      const geoFactor = this.analyzeGeography(transactionData, userHistory);
      factors.push(geoFactor);
      totalScore += geoFactor.score * geoFactor.weight;
      totalWeight += geoFactor.weight;
    }

    // Device Analysis
    if (config.deviceFingerprinting) {
      const deviceFactor = this.analyzeDevice(transactionData, userHistory);
      factors.push(deviceFactor);
      totalScore += deviceFactor.score * deviceFactor.weight;
      totalWeight += deviceFactor.weight;
    }

    const riskScore = totalWeight > 0 ? totalScore / totalWeight : 0;
    const decision =
      riskScore >= 80 ? "block" : riskScore >= 60 ? "review" : "approve";

    return {
      riskScore,
      factors,
      decision,
      confidence: Math.min(95, 50 + factors.length * 10),
    };
  }

  private static analyzeVelocity(
    transaction: any,
    history: any[],
  ): FraudFactor {
    const recentTransactions = history.filter(
      (h) => Date.now() - new Date(h.timestamp).getTime() < 24 * 60 * 60 * 1000,
    );

    const velocityScore = Math.min(100, recentTransactions.length * 20);

    return {
      type: "velocity",
      score: velocityScore,
      description: `${recentTransactions.length} transactions in 24 hours`,
      weight: 0.3,
    };
  }

  private static analyzeAmount(transaction: any, history: any[]): FraudFactor {
    const amounts = history.map((h) => h.amount).filter(Boolean);
    const avgAmount =
      amounts.length > 0
        ? amounts.reduce((a, b) => a + b, 0) / amounts.length
        : 0;

    let amountScore = 0;
    if (avgAmount > 0) {
      const ratio = transaction.amount / avgAmount;
      if (ratio > 10) amountScore = 90;
      else if (ratio > 5) amountScore = 70;
      else if (ratio > 3) amountScore = 50;
      else if (ratio > 2) amountScore = 30;
      else amountScore = 10;
    }

    return {
      type: "amount",
      score: amountScore,
      description: `Transaction amount analysis (${transaction.amount} vs avg ${avgAmount.toFixed(2)})`,
      weight: 0.25,
    };
  }

  private static analyzeGeography(
    transaction: any,
    history: any[],
  ): FraudFactor {
    const recentLocations = history
      .filter(
        (h) =>
          h.geoLocation &&
          Date.now() - new Date(h.timestamp).getTime() <
            7 * 24 * 60 * 60 * 1000,
      )
      .map((h) => h.geoLocation.country);

    const currentCountry = transaction.geoLocation?.country;
    const isNewLocation =
      currentCountry && !recentLocations.includes(currentCountry);

    const geoScore = isNewLocation ? 60 : 10;

    return {
      type: "geo",
      score: geoScore,
      description: `Geographic analysis - ${currentCountry} (new: ${isNewLocation})`,
      weight: 0.2,
    };
  }

  private static analyzeDevice(transaction: any, history: any[]): FraudFactor {
    const recentDevices = history
      .filter(
        (h) =>
          h.deviceFingerprint &&
          Date.now() - new Date(h.timestamp).getTime() <
            30 * 24 * 60 * 60 * 1000,
      )
      .map((h) => h.deviceFingerprint);

    const currentDevice = transaction.deviceFingerprint;
    const isNewDevice = currentDevice && !recentDevices.includes(currentDevice);

    const deviceScore = isNewDevice ? 40 : 5;

    return {
      type: "device",
      score: deviceScore,
      description: `Device analysis (new: ${isNewDevice})`,
      weight: 0.25,
    };
  }
}

// Security Audit Logger
export class SecurityAuditLogger {
  private static events: SecurityEvent[] = [];

  static logSecurityEvent(
    type: SecurityEventType,
    description: string,
    metadata: Record<string, any> = {},
    severity: "info" | "warning" | "error" | "critical" = "info",
    userId?: string,
    sessionId?: string,
  ): void {
    const event: SecurityEvent = {
      id: PaymentEncryption.generateSecureToken(),
      type,
      severity,
      userId,
      sessionId,
      ipAddress: metadata.ipAddress || "unknown",
      userAgent: metadata.userAgent || "unknown",
      description,
      metadata,
      timestamp: new Date(),
      resolved: false,
    };

    this.events.push(event);

    // Log to console in development
    if (import.meta.env.DEV) {
      console.warn("[CIVICA Security Event]", event);
    }

    // In production, send to security monitoring service
    if (import.meta.env.PROD && severity === "critical") {
      this.alertSecurityTeam(event);
    }
  }

  static logTransactionAudit(audit: TransactionAudit): void {
    // Store audit for compliance
    console.log("[CIVICA Transaction Audit]", audit);

    // Send to audit service in production
    if (import.meta.env.PROD) {
      this.sendToAuditService(audit);
    }
  }

  private static alertSecurityTeam(event: SecurityEvent): void {
    // In real implementation, send to security team
    console.error("[CRITICAL SECURITY EVENT]", event);
  }

  private static sendToAuditService(audit: TransactionAudit): void {
    // In real implementation, send to compliance audit service
    console.log("[AUDIT SERVICE]", audit);
  }

  static getSecurityEvents(
    userId?: string,
    severity?: string,
    limit = 100,
  ): SecurityEvent[] {
    let filtered = this.events;

    if (userId) {
      filtered = filtered.filter((e) => e.userId === userId);
    }

    if (severity) {
      filtered = filtered.filter((e) => e.severity === severity);
    }

    return filtered
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
      .slice(0, limit);
  }
}

// Input Validation
export class PaymentInputValidator {
  static validateAmount(amount: number): void {
    if (!amount || amount <= 0) {
      throw new PaymentSecurityError(
        "Invalid amount",
        "INVALID_AMOUNT",
        "medium",
      );
    }

    if (amount > 1000000) {
      // $1M limit
      throw new PaymentSecurityError(
        "Amount exceeds maximum limit",
        "AMOUNT_TOO_HIGH",
        "high",
      );
    }
  }

  static validateCurrency(currency: string): void {
    const validCurrencies = ["USD", "EUR", "GBP", "NGN", "GHS", "KES", "ZAR"];
    if (!validCurrencies.includes(currency)) {
      throw new PaymentSecurityError(
        `Invalid currency: ${currency}`,
        "INVALID_CURRENCY",
        "medium",
      );
    }
  }

  static validateEmail(email: string): void {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new PaymentSecurityError(
        "Invalid email format",
        "INVALID_EMAIL",
        "medium",
      );
    }
  }

  static sanitizeInput(input: string): string {
    return input
      .replace(/[<>]/g, "") // Remove potential XSS
      .replace(/['"]/g, "") // Remove quotes
      .trim()
      .slice(0, 255); // Limit length
  }

  static validateTimestamp(timestamp: number, maxAge = 5 * 60 * 1000): void {
    const now = Date.now();
    const age = now - timestamp;

    if (age > maxAge) {
      throw new PaymentSecurityError(
        "Request timestamp too old",
        "TIMESTAMP_EXPIRED",
        "medium",
      );
    }

    if (timestamp > now + 60000) {
      // Allow 1 minute clock skew
      throw new PaymentSecurityError(
        "Request timestamp in future",
        "TIMESTAMP_FUTURE",
        "medium",
      );
    }
  }
}

// Device Fingerprinting
export class DeviceFingerprinter {
  static generateFingerprint(): string {
    const components = [
      navigator.userAgent,
      navigator.language,
      screen.width + "x" + screen.height,
      screen.colorDepth,
      new Date().getTimezoneOffset(),
      navigator.hardwareConcurrency || "unknown",
      navigator.deviceMemory || "unknown",
    ];

    const fingerprint = components.join("|");
    return CryptoJS.SHA256(fingerprint).toString();
  }

  static getDeviceInfo() {
    return {
      userAgent: navigator.userAgent,
      language: navigator.language,
      platform: navigator.platform,
      screen: {
        width: screen.width,
        height: screen.height,
        colorDepth: screen.colorDepth,
      },
      timezone: new Date().getTimezoneOffset(),
      fingerprint: this.generateFingerprint(),
    };
  }
}

// Security Headers
export class SecurityHeaders {
  static getCSPHeader(): string {
    const nonce = import.meta.env.VITE_CSP_NONCE || "CIVICA_NONCE";

    return [
      "default-src 'self'",
      `script-src 'self' 'nonce-${nonce}' https://js.paystack.co https://www.paypal.com`,
      `style-src 'self' 'unsafe-inline'`,
      `img-src 'self' data: https:`,
      `connect-src 'self' https://api.paystack.co https://api.paypal.com`,
      `frame-src 'self' https://js.paystack.co https://www.paypal.com`,
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join("; ");
  }

  static getCORSHeaders(): Record<string, string> {
    const allowedOrigins = import.meta.env.VITE_CORS_ORIGIN?.split(",") || [
      "https://civica144.com",
    ];

    return {
      "Access-Control-Allow-Origin": allowedOrigins[0], // Use first origin
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers":
        "Content-Type, Authorization, X-CSRF-Token",
      "Access-Control-Allow-Credentials": "true",
      "X-Content-Type-Options": "nosniff",
      "X-Frame-Options": "DENY",
      "X-XSS-Protection": "1; mode=block",
      "Strict-Transport-Security": "max-age=31536000; includeSubDomains",
    };
  }
}

// Sacred Security Extensions
export class SacredSecurity {
  static blessTransaction(transactionId: string, blessing: string): void {
    SecurityAuditLogger.logSecurityEvent(
      "payment_fraud_detected", // Using as placeholder
      `Sacred blessing: ${blessing}`,
      { transactionId, blessing, type: "blessing" },
      "info",
    );
  }

  static validateSacredIntent(intent: string): boolean {
    const sacredKeywords = [
      "service",
      "wisdom",
      "healing",
      "regeneration",
      "harmony",
      "creativity",
      "community",
      "planetary",
      "sacred",
      "divine",
    ];

    return sacredKeywords.some((keyword) =>
      intent.toLowerCase().includes(keyword),
    );
  }

  static generateKarmaSignature(userId: string, action: string): string {
    const karmaData = `${userId}:${action}:${Date.now()}`;
    return CryptoJS.SHA256(karmaData).toString();
  }
}

// Export main security class
export class PaymentSecurity {
  static readonly Encryption = PaymentEncryption;
  static readonly RateLimit = PaymentRateLimit;
  static readonly FraudDetection = FraudDetection;
  static readonly AuditLogger = SecurityAuditLogger;
  static readonly InputValidator = PaymentInputValidator;
  static readonly DeviceFingerprinter = DeviceFingerprinter;
  static readonly SecurityHeaders = SecurityHeaders;
  static readonly SacredSecurity = SacredSecurity;
  static readonly CONFIG = PAYMENT_SECURITY_CONFIG;
}
