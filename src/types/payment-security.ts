// CIVICA 144 Payment Security Types
// Comprehensive security framework for sacred commerce

export interface PaymentSecurityConfig {
  encryption: EncryptionConfig;
  rateLimit: RateLimitConfig;
  fraud: FraudDetectionConfig;
  audit: AuditConfig;
  compliance: ComplianceConfig;
}

export interface EncryptionConfig {
  algorithm: "AES-256-GCM";
  keyRotationInterval: number;
  tokenExpiration: number;
  saltRounds: number;
}

export interface RateLimitConfig {
  windowMs: number;
  maxRequests: number;
  skipSuccessfulRequests: boolean;
  keyGenerator?: (req: any) => string;
}

export interface FraudDetectionConfig {
  velocityChecking: boolean;
  geoLocationValidation: boolean;
  deviceFingerprinting: boolean;
  behavioralAnalysis: boolean;
  minimumRiskScore: number;
}

export interface AuditConfig {
  logAllTransactions: boolean;
  logFailedAttempts: boolean;
  retentionPeriod: number;
  complianceReporting: boolean;
}

export interface ComplianceConfig {
  pciDss: boolean;
  gdpr: boolean;
  ccpa: boolean;
  soc2: boolean;
  dataLocalization: string[];
}

export interface SecurePaymentRequest {
  amount: number;
  currency: string;
  planId: string;
  userId: string;
  paymentMethodId: string;
  billingDetails: BillingDetails;
  metadata: PaymentMetadata;
  signature: string;
  timestamp: number;
  nonce: string;
}

export interface BillingDetails {
  email: string;
  name: string;
  phone?: string;
  address?: {
    line1: string;
    line2?: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
}

export interface PaymentMetadata {
  sessionId: string;
  ipAddress: string;
  userAgent: string;
  deviceFingerprint: string;
  geoLocation?: {
    country: string;
    region: string;
    city: string;
    coordinates?: [number, number];
  };
  ritualContext?: string;
  sacredIntent?: string;
}

export interface SecurePaymentResponse {
  success: boolean;
  transactionId: string;
  paymentIntentId?: string;
  status: PaymentStatus;
  amount: number;
  currency: string;
  timestamp: number;
  securityScore: number;
  warnings: SecurityWarning[];
  nextAction?: PaymentNextAction;
}

export type PaymentStatus =
  | "pending"
  | "processing"
  | "requires_action"
  | "succeeded"
  | "failed"
  | "cancelled"
  | "disputed"
  | "blocked_fraud";

export interface SecurityWarning {
  code: string;
  message: string;
  severity: "low" | "medium" | "high" | "critical";
  action?: string;
}

export interface PaymentNextAction {
  type: "redirect" | "verify_otp" | "complete_3ds" | "manual_review";
  url?: string;
  data?: any;
}

export interface PaystackConfig {
  publicKey: string;
  secretKey?: string; // Only on server side
  baseUrl: string;
  webhookSecret: string;
}

export interface PayPalConfig {
  clientId: string;
  clientSecret?: string; // Only on server side
  environment: "sandbox" | "live";
  webhookId?: string;
}

export interface TransactionAudit {
  id: string;
  transactionId: string;
  userId: string;
  amount: number;
  currency: string;
  provider: "paystack" | "paypal" | "flourish";
  status: PaymentStatus;
  ipAddress: string;
  userAgent: string;
  timestamp: Date;
  processingTime: number;
  securityScore: number;
  fraudRiskLevel: "low" | "medium" | "high" | "critical";
  warnings: SecurityWarning[];
  metadata: Record<string, any>;
}

export interface FraudAnalysis {
  riskScore: number; // 0-100
  factors: FraudFactor[];
  decision: "approve" | "review" | "block";
  confidence: number;
}

export interface FraudFactor {
  type: "velocity" | "geo" | "device" | "behavioral" | "amount" | "pattern";
  score: number;
  description: string;
  weight: number;
}

export interface PaymentSession {
  id: string;
  userId: string;
  planId: string;
  amount: number;
  currency: string;
  provider: "paystack" | "paypal";
  status: "initiated" | "active" | "completed" | "expired" | "cancelled";
  expiresAt: Date;
  createdAt: Date;
  ipAddress: string;
  userAgent: string;
  securityToken: string;
  attempts: number;
  maxAttempts: number;
}

export interface WebhookPayload {
  event: string;
  data: any;
  signature: string;
  timestamp: number;
  provider: "paystack" | "paypal";
}

export interface WebhookVerification {
  isValid: boolean;
  reason?: string;
  payload?: any;
}

// Security Events
export interface SecurityEvent {
  id: string;
  type: SecurityEventType;
  severity: "info" | "warning" | "error" | "critical";
  userId?: string;
  sessionId?: string;
  ipAddress: string;
  userAgent: string;
  description: string;
  metadata: Record<string, any>;
  timestamp: Date;
  resolved: boolean;
  resolvedBy?: string;
  resolvedAt?: Date;
}

export type SecurityEventType =
  | "payment_fraud_detected"
  | "rate_limit_exceeded"
  | "invalid_signature"
  | "suspicious_transaction"
  | "webhook_verification_failed"
  | "encryption_error"
  | "unauthorized_access"
  | "data_breach_attempt"
  | "compliance_violation";

// Rate Limiting
export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetTime: number;
  retryAfter?: number;
}

export interface RateLimitStore {
  get(key: string): Promise<number>;
  set(key: string, value: number, ttl: number): Promise<void>;
  increment(key: string, ttl: number): Promise<number>;
  reset(key: string): Promise<void>;
}

// Encryption
export interface EncryptionResult {
  encrypted: string;
  iv: string;
  tag: string;
}

export interface DecryptionInput {
  encrypted: string;
  iv: string;
  tag: string;
  key: string;
}

// Sacred Payment Extensions
export interface SacredPaymentIntent {
  intention: string;
  ritualContext?: string;
  blessingsRequested: string[];
  serviceAlignment: string[];
  planetaryImpact: string;
  flourishGeneration: {
    wisdom: number;
    regeneration: number;
    harmony: number;
    creativity: number;
    service: number;
  };
}

export interface PaymentBlessing {
  id: string;
  transactionId: string;
  blessing: string;
  source: "community" | "facilitator" | "system";
  timestamp: Date;
  verified: boolean;
}

export interface KarmaScore {
  generosity: number;
  trustworthiness: number;
  serviceContribution: number;
  communitySupport: number;
  total: number;
}

// Error Types
export class PaymentSecurityError extends Error {
  constructor(
    message: string,
    public code: string,
    public severity: "low" | "medium" | "high" | "critical",
    public metadata?: Record<string, any>,
  ) {
    super(message);
    this.name = "PaymentSecurityError";
  }
}

export class FraudDetectedError extends PaymentSecurityError {
  constructor(
    message: string,
    public riskScore: number,
    public factors: FraudFactor[],
  ) {
    super(message, "FRAUD_DETECTED", "critical", { riskScore, factors });
    this.name = "FraudDetectedError";
  }
}

export class RateLimitExceededError extends PaymentSecurityError {
  constructor(
    message: string,
    public retryAfter: number,
  ) {
    super(message, "RATE_LIMIT_EXCEEDED", "medium", { retryAfter });
    this.name = "RateLimitExceededError";
  }
}

export class EncryptionError extends PaymentSecurityError {
  constructor(message: string) {
    super(message, "ENCRYPTION_ERROR", "high");
    this.name = "EncryptionError";
  }
}

export class WebhookVerificationError extends PaymentSecurityError {
  constructor(
    message: string,
    public provider: string,
  ) {
    super(message, "WEBHOOK_VERIFICATION_FAILED", "high", { provider });
    this.name = "WebhookVerificationError";
  }
}
