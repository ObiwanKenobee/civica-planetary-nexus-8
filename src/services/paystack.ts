// CIVICA 144 Secure Paystack Integration
// Sacred payment processing with maximum security

import axios, { AxiosInstance } from "axios";
import { PaymentSecurity } from "@/lib/payment-security";
import {
  SecurePaymentRequest,
  SecurePaymentResponse,
  PaystackConfig,
  WebhookPayload,
  WebhookVerification,
  TransactionAudit,
  PaymentSecurityError,
  FraudDetectedError,
  PaymentStatus,
} from "@/types/payment-security";

export interface PaystackTransaction {
  id: number;
  domain: string;
  status: string;
  reference: string;
  amount: number;
  currency: string;
  paid_at: string;
  created_at: string;
  channel: string;
  ip_address: string;
  customer: {
    id: number;
    email: string;
    customer_code: string;
  };
  authorization: {
    authorization_code: string;
    bin: string;
    last4: string;
    exp_month: string;
    exp_year: string;
    channel: string;
    card_type: string;
    bank: string;
    country_code: string;
    brand: string;
  };
  plan?: any;
  metadata: Record<string, any>;
}

export interface PaystackResponse<T = any> {
  status: boolean;
  message: string;
  data: T;
}

export interface PaystackInitializeData {
  authorization_url: string;
  access_code: string;
  reference: string;
}

export class SecurePaystackService {
  private api: AxiosInstance | null = null;
  private config: PaystackConfig | null = null;
  private initialized = false;

  private initialize(): void {
    if (this.initialized) return;

    this.config = {
      publicKey: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY || "",
      secretKey: import.meta.env.PAYSTACK_SECRET_KEY || "",
      baseUrl: "https://api.paystack.co",
      webhookSecret: import.meta.env.VITE_WEBHOOK_SECRET || "",
    };

    // Validate configuration only when actually needed
    if (!this.config.publicKey) {
      throw new PaymentSecurityError(
        "Paystack public key not configured. Please set VITE_PAYSTACK_PUBLIC_KEY environment variable.",
        "MISSING_CONFIG",
        "critical",
      );
    }

    this.api = axios.create({
      baseURL: this.config.baseUrl,
      headers: {
        Authorization: `Bearer ${this.config.secretKey}`,
        "Content-Type": "application/json",
        "X-CIVICA-Version": "144",
        "User-Agent": "CIVICA-144/1.0",
      },
      timeout: 30000, // 30 seconds
    });

    this.setupInterceptors();
    this.initialized = true;
  }

  private setupInterceptors(): void {
    if (!this.api) return;

    // Request interceptor for security
    this.api.interceptors.request.use(
      (config) => {
        // Add security headers
        const securityHeaders =
          PaymentSecurity.SecurityHeaders.getCORSHeaders();
        Object.assign(config.headers, securityHeaders);

        // Log request
        PaymentSecurity.AuditLogger.logSecurityEvent(
          "payment_fraud_detected", // Using as generic event type
          "Paystack API request initiated",
          {
            url: config.url,
            method: config.method,
            type: "api_request",
          },
          "info",
        );

        return config;
      },
      (error) => {
        PaymentSecurity.AuditLogger.logSecurityEvent(
          "payment_fraud_detected",
          "Paystack API request failed",
          { error: error.message, type: "api_error" },
          "error",
        );
        return Promise.reject(error);
      },
    );

    // Response interceptor for monitoring
    this.api.interceptors.response.use(
      (response) => {
        // Log successful response
        PaymentSecurity.AuditLogger.logSecurityEvent(
          "payment_fraud_detected",
          "Paystack API response received",
          {
            status: response.status,
            url: response.config.url,
            type: "api_response",
          },
          "info",
        );
        return response;
      },
      (error) => {
        PaymentSecurity.AuditLogger.logSecurityEvent(
          "payment_fraud_detected",
          "Paystack API error response",
          {
            status: error.response?.status,
            message: error.message,
            type: "api_error",
          },
          "error",
        );
        return Promise.reject(error);
      },
    );
  }

  async initializePayment(
    request: SecurePaymentRequest,
  ): Promise<SecurePaymentResponse> {
    try {
      this.initialize();

      // Security validations
      await this.validatePaymentRequest(request);

      // Fraud detection
      const fraudAnalysis = PaymentSecurity.FraudDetection.analyzeFraudRisk(
        request.metadata,
        [], // In real implementation, fetch user's transaction history
      );

      if (fraudAnalysis.decision === "block") {
        throw new FraudDetectedError(
          "Transaction blocked due to high fraud risk",
          fraudAnalysis.riskScore,
          fraudAnalysis.factors,
        );
      }

      // Prepare Paystack request
      const paystackRequest = {
        email: request.billingDetails.email,
        amount: Math.round(request.amount * 100), // Convert to kobo
        currency: request.currency,
        reference: this.generateReference(request.userId),
        callback_url: `${window.location.origin}/payment/callback`,
        metadata: {
          userId: request.userId,
          planId: request.planId,
          sessionId: request.metadata.sessionId,
          deviceFingerprint: request.metadata.deviceFingerprint,
          ritualContext: request.metadata.ritualContext,
          sacredIntent: request.metadata.sacredIntent,
        },
        channels: [
          "card",
          "bank",
          "ussd",
          "qr",
          "mobile_money",
          "bank_transfer",
        ],
        split_code: undefined, // For marketplace splits
        subaccount: undefined, // For sub-accounts
      };

      // Make API call
      const response = await this.api.post<
        PaystackResponse<PaystackInitializeData>
      >("/transaction/initialize", paystackRequest);

      if (!response.data.status) {
        throw new PaymentSecurityError(
          response.data.message,
          "PAYSTACK_ERROR",
          "medium",
        );
      }

      // Create audit record
      const audit: TransactionAudit = {
        id: PaymentSecurity.Encryption.generateSecureToken(),
        transactionId: response.data.data.reference,
        userId: request.userId,
        amount: request.amount,
        currency: request.currency,
        provider: "paystack",
        status: "pending",
        ipAddress: request.metadata.ipAddress,
        userAgent: request.metadata.userAgent,
        timestamp: new Date(),
        processingTime: 0,
        securityScore: 100 - fraudAnalysis.riskScore,
        fraudRiskLevel: this.mapRiskLevel(fraudAnalysis.riskScore),
        warnings:
          fraudAnalysis.decision === "review"
            ? [
                {
                  code: "MANUAL_REVIEW_REQUIRED",
                  message: "Transaction requires manual review",
                  severity: "medium",
                },
              ]
            : [],
        metadata: {
          paystackReference: response.data.data.reference,
          accessCode: response.data.data.access_code,
          fraudAnalysis,
        },
      };

      PaymentSecurity.AuditLogger.logTransactionAudit(audit);

      return {
        success: true,
        transactionId: response.data.data.reference,
        paymentIntentId: response.data.data.access_code,
        status: "pending",
        amount: request.amount,
        currency: request.currency,
        timestamp: Date.now(),
        securityScore: audit.securityScore,
        warnings: audit.warnings,
        nextAction: {
          type: "redirect",
          url: response.data.data.authorization_url,
          data: {
            access_code: response.data.data.access_code,
            reference: response.data.data.reference,
          },
        },
      };
    } catch (error) {
      if (error instanceof PaymentSecurityError) {
        throw error;
      }

      PaymentSecurity.AuditLogger.logSecurityEvent(
        "payment_fraud_detected",
        "Payment initialization failed",
        {
          error: error instanceof Error ? error.message : "Unknown error",
          userId: request.userId,
          type: "payment_error",
        },
        "error",
        request.userId,
        request.metadata.sessionId,
      );

      throw new PaymentSecurityError(
        "Payment initialization failed",
        "INITIALIZATION_ERROR",
        "medium",
        {
          originalError:
            error instanceof Error ? error.message : "Unknown error",
        },
      );
    }
  }

  async verifyTransaction(reference: string): Promise<PaystackTransaction> {
    try {
      this.initialize();

      const response = await this.api!.get<
        PaystackResponse<PaystackTransaction>
      >(`/transaction/verify/${reference}`);

      if (!response.data.status) {
        throw new PaymentSecurityError(
          response.data.message,
          "VERIFICATION_FAILED",
          "medium",
        );
      }

      return response.data.data;
    } catch (error) {
      PaymentSecurity.AuditLogger.logSecurityEvent(
        "payment_fraud_detected",
        "Transaction verification failed",
        {
          reference,
          error: error instanceof Error ? error.message : "Unknown error",
          type: "verification_error",
        },
        "error",
      );

      throw error;
    }
  }

  async handleWebhook(payload: WebhookPayload): Promise<WebhookVerification> {
    try {
      this.initialize();

      // Verify webhook signature
      const isValid = PaymentSecurity.Encryption.verifySignature(
        JSON.stringify(payload.data),
        payload.signature,
        this.config!.webhookSecret,
      );

      if (!isValid) {
        PaymentSecurity.AuditLogger.logSecurityEvent(
          "webhook_verification_failed",
          "Invalid webhook signature from Paystack",
          { event: payload.event },
          "critical",
        );

        return {
          isValid: false,
          reason: "Invalid signature",
        };
      }

      // Process webhook event
      await this.processWebhookEvent(payload);

      return {
        isValid: true,
        payload: payload.data,
      };
    } catch (error) {
      PaymentSecurity.AuditLogger.logSecurityEvent(
        "webhook_verification_failed",
        "Webhook processing failed",
        {
          error: error instanceof Error ? error.message : "Unknown error",
          event: payload.event,
        },
        "error",
      );

      return {
        isValid: false,
        reason: error instanceof Error ? error.message : "Processing failed",
      };
    }
  }

  private async processWebhookEvent(payload: WebhookPayload): Promise<void> {
    const { event, data } = payload;

    switch (event) {
      case "charge.success":
        await this.handleChargeSuccess(data);
        break;
      case "charge.failed":
        await this.handleChargeFailed(data);
        break;
      case "transfer.success":
        await this.handleTransferSuccess(data);
        break;
      case "transfer.failed":
        await this.handleTransferFailed(data);
        break;
      default:
        PaymentSecurity.AuditLogger.logSecurityEvent(
          "payment_fraud_detected",
          `Unknown webhook event: ${event}`,
          { event, data },
          "warning",
        );
    }
  }

  private async handleChargeSuccess(data: any): Promise<void> {
    // Update transaction status
    PaymentSecurity.AuditLogger.logSecurityEvent(
      "payment_fraud_detected",
      "Payment charge successful",
      {
        reference: data.reference,
        amount: data.amount,
        email: data.customer.email,
        type: "charge_success",
      },
      "info",
    );

    // Generate sacred blessing
    PaymentSecurity.SacredSecurity.blessTransaction(
      data.reference,
      "Sacred exchange blessed by divine abundance",
    );
  }

  private async handleChargeFailed(data: any): Promise<void> {
    PaymentSecurity.AuditLogger.logSecurityEvent(
      "payment_fraud_detected",
      "Payment charge failed",
      {
        reference: data.reference,
        gateway_response: data.gateway_response,
        type: "charge_failed",
      },
      "warning",
    );
  }

  private async handleTransferSuccess(data: any): Promise<void> {
    PaymentSecurity.AuditLogger.logSecurityEvent(
      "payment_fraud_detected",
      "Transfer successful",
      {
        reference: data.reference,
        amount: data.amount,
        type: "transfer_success",
      },
      "info",
    );
  }

  private async handleTransferFailed(data: any): Promise<void> {
    PaymentSecurity.AuditLogger.logSecurityEvent(
      "payment_fraud_detected",
      "Transfer failed",
      {
        reference: data.reference,
        failure_reason: data.failure_reason,
        type: "transfer_failed",
      },
      "error",
    );
  }

  private async validatePaymentRequest(
    request: SecurePaymentRequest,
  ): Promise<void> {
    // Validate amount
    PaymentSecurity.InputValidator.validateAmount(request.amount);

    // Validate currency
    PaymentSecurity.InputValidator.validateCurrency(request.currency);

    // Validate email
    PaymentSecurity.InputValidator.validateEmail(request.billingDetails.email);

    // Validate timestamp
    PaymentSecurity.InputValidator.validateTimestamp(request.timestamp);

    // Rate limiting
    const rateLimitResult = await PaymentSecurity.RateLimit.checkRateLimit(
      `${request.userId}:${request.metadata.ipAddress}`,
    );

    if (!rateLimitResult.allowed) {
      throw new PaymentSecurityError(
        "Rate limit exceeded",
        "RATE_LIMIT_EXCEEDED",
        "medium",
        { retryAfter: rateLimitResult.retryAfter },
      );
    }
  }

  private generateReference(userId: string): string {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substr(2, 9);
    return `CIVICA_${userId}_${timestamp}_${random}`;
  }

  private mapRiskLevel(
    riskScore: number,
  ): "low" | "medium" | "high" | "critical" {
    if (riskScore >= 80) return "critical";
    if (riskScore >= 60) return "high";
    if (riskScore >= 40) return "medium";
    return "low";
  }

  // Public key for frontend
  getPublicKey(): string {
    return this.config.publicKey;
  }

  // Test connection
  async testConnection(): Promise<boolean> {
    try {
      const response = await this.api.get("/bank");
      return response.data.status === true;
    } catch {
      return false;
    }
  }
}

// Export singleton instance
export const paystackService = new SecurePaystackService();
