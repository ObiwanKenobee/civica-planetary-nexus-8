// CIVICA 144 Secure PayPal Integration
// Sacred payment processing with PayPal ecosystem

import axios, { AxiosInstance } from "axios";
import { PaymentSecurity } from "@/lib/payment-security";
import {
  SecurePaymentRequest,
  SecurePaymentResponse,
  PayPalConfig,
  WebhookPayload,
  WebhookVerification,
  TransactionAudit,
  PaymentSecurityError,
  FraudDetectedError,
  PaymentStatus,
} from "@/types/payment-security";

export interface PayPalAccessToken {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
}

export interface PayPalOrder {
  id: string;
  status:
    | "CREATED"
    | "SAVED"
    | "APPROVED"
    | "VOIDED"
    | "COMPLETED"
    | "PAYER_ACTION_REQUIRED";
  intent: "CAPTURE" | "AUTHORIZE";
  links: PayPalLink[];
  create_time: string;
  update_time: string;
  payer?: {
    name?: {
      given_name: string;
      surname: string;
    };
    email_address: string;
    payer_id: string;
  };
  purchase_units: {
    reference_id: string;
    amount: {
      currency_code: string;
      value: string;
    };
    payee?: {
      email_address: string;
      merchant_id: string;
    };
    payments?: {
      captures?: PayPalCapture[];
    };
  }[];
}

export interface PayPalLink {
  href: string;
  rel: string;
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
}

export interface PayPalCapture {
  id: string;
  status:
    | "COMPLETED"
    | "DECLINED"
    | "PARTIALLY_REFUNDED"
    | "PENDING"
    | "REFUNDED";
  amount: {
    currency_code: string;
    value: string;
  };
  final_capture: boolean;
  create_time: string;
  update_time: string;
}

export interface PayPalWebhookEvent {
  id: string;
  event_type: string;
  event_version: string;
  create_time: string;
  resource_type: string;
  resource_version: string;
  resource: any;
  summary: string;
}

export class SecurePayPalService {
  private api: AxiosInstance | null = null;
  private config: PayPalConfig | null = null;
  private accessToken: string | null = null;
  private tokenExpiry: number = 0;
  private initialized = false;

  private initialize(): void {
    if (this.initialized) return;

    this.config = {
      clientId: import.meta.env.VITE_PAYPAL_CLIENT_ID || "",
      clientSecret: import.meta.env.PAYPAL_CLIENT_SECRET || "",
      environment: "live", // Using live environment with provided credentials
      webhookId: import.meta.env.VITE_PAYPAL_WEBHOOK_ID || "",
    };

    // Validate configuration only when actually needed
    if (!this.config.clientId) {
      throw new PaymentSecurityError(
        "PayPal client ID not configured. Please set VITE_PAYPAL_CLIENT_ID environment variable.",
        "MISSING_CONFIG",
        "critical",
      );
    }

    const baseURL =
      this.config.environment === "live"
        ? "https://api.paypal.com"
        : "https://api.sandbox.paypal.com";

    this.api = axios.create({
      baseURL,
      timeout: 30000, // 30 seconds
      headers: {
        "Content-Type": "application/json",
        "X-CIVICA-Version": "144",
        "User-Agent": "CIVICA-144/1.0",
      },
    });

    this.setupInterceptors();
    this.initialized = true;
  }

  private setupInterceptors(): void {
    if (!this.api) return;

    // Request interceptor for security and auth
    this.api.interceptors.request.use(
      async (config) => {
        // Add authentication for API requests
        if (!config.url?.includes("/oauth2/token")) {
          const token = await this.getAccessToken();
          config.headers.Authorization = `Bearer ${token}`;
        }

        // Add security headers
        const securityHeaders =
          PaymentSecurity.SecurityHeaders.getCORSHeaders();
        Object.assign(config.headers, securityHeaders);

        // Log request
        PaymentSecurity.AuditLogger.logSecurityEvent(
          "payment_fraud_detected",
          "PayPal API request initiated",
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
          "PayPal API request failed",
          { error: error.message, type: "api_error" },
          "error",
        );
        return Promise.reject(error);
      },
    );

    // Response interceptor for monitoring
    this.api.interceptors.response.use(
      (response) => {
        PaymentSecurity.AuditLogger.logSecurityEvent(
          "payment_fraud_detected",
          "PayPal API response received",
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
          "PayPal API error response",
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

  private async getAccessToken(): Promise<string> {
    // Return cached token if still valid
    if (this.accessToken && Date.now() < this.tokenExpiry) {
      return this.accessToken;
    }

    try {
      const auth = Buffer.from(
        `${this.config.clientId}:${this.config.clientSecret}`,
      ).toString("base64");

      const response = await this.api!.post<PayPalAccessToken>(
        "/v1/oauth2/token",
        "grant_type=client_credentials",
        {
          headers: {
            Authorization: `Basic ${auth}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
        },
      );

      this.accessToken = response.data.access_token;
      this.tokenExpiry = Date.now() + response.data.expires_in * 1000 - 60000; // 1 min buffer

      return this.accessToken;
    } catch (error) {
      PaymentSecurity.AuditLogger.logSecurityEvent(
        "unauthorized_access",
        "PayPal authentication failed",
        { error: error instanceof Error ? error.message : "Unknown error" },
        "critical",
      );

      throw new PaymentSecurityError(
        "PayPal authentication failed",
        "AUTH_FAILED",
        "critical",
      );
    }
  }

  async createOrder(
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

      // Create PayPal order
      const orderRequest = {
        intent: "CAPTURE",
        purchase_units: [
          {
            reference_id: this.generateReference(request.userId),
            amount: {
              currency_code: request.currency,
              value: request.amount.toFixed(2),
            },
            custom_id: `CIVICA_${request.userId}_${request.planId}`,
            description: `CIVICA 144 - ${this.getPlanName(request.planId)}`,
            soft_descriptor: "CIVICA144",
          },
        ],
        application_context: {
          brand_name: "CIVICA 144",
          locale: "en-US",
          landing_page: "BILLING",
          shipping_preference: "NO_SHIPPING",
          user_action: "PAY_NOW",
          return_url: `${window.location.origin}/payment/paypal/success`,
          cancel_url: `${window.location.origin}/payment/paypal/cancel`,
        },
        metadata: {
          userId: request.userId,
          planId: request.planId,
          sessionId: request.metadata.sessionId,
          deviceFingerprint: request.metadata.deviceFingerprint,
          ritualContext: request.metadata.ritualContext,
          sacredIntent: request.metadata.sacredIntent,
        },
      };

      const response = await this.api!.post<PayPalOrder>(
        "/v2/checkout/orders",
        orderRequest,
      );

      const approvalUrl = response.data.links.find(
        (link) => link.rel === "approve",
      )?.href;

      if (!approvalUrl) {
        throw new PaymentSecurityError(
          "PayPal approval URL not found",
          "APPROVAL_URL_MISSING",
          "medium",
        );
      }

      // Create audit record
      const audit: TransactionAudit = {
        id: PaymentSecurity.Encryption.generateSecureToken(),
        transactionId: response.data.id,
        userId: request.userId,
        amount: request.amount,
        currency: request.currency,
        provider: "paypal",
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
          paypalOrderId: response.data.id,
          fraudAnalysis,
        },
      };

      PaymentSecurity.AuditLogger.logTransactionAudit(audit);

      return {
        success: true,
        transactionId: response.data.id,
        paymentIntentId: response.data.id,
        status: "pending",
        amount: request.amount,
        currency: request.currency,
        timestamp: Date.now(),
        securityScore: audit.securityScore,
        warnings: audit.warnings,
        nextAction: {
          type: "redirect",
          url: approvalUrl,
          data: {
            orderId: response.data.id,
          },
        },
      };
    } catch (error) {
      if (error instanceof PaymentSecurityError) {
        throw error;
      }

      PaymentSecurity.AuditLogger.logSecurityEvent(
        "payment_fraud_detected",
        "PayPal order creation failed",
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
        "PayPal order creation failed",
        "ORDER_CREATION_ERROR",
        "medium",
        {
          originalError:
            error instanceof Error ? error.message : "Unknown error",
        },
      );
    }
  }

  async captureOrder(orderId: string): Promise<PayPalOrder> {
    try {
      this.initialize();

      const response = await this.api!.post<PayPalOrder>(
        `/v2/checkout/orders/${orderId}/capture`,
      );

      PaymentSecurity.AuditLogger.logSecurityEvent(
        "payment_fraud_detected",
        "PayPal order captured successfully",
        {
          orderId,
          status: response.data.status,
          type: "capture_success",
        },
        "info",
      );

      // Generate sacred blessing
      PaymentSecurity.SacredSecurity.blessTransaction(
        orderId,
        "Sacred PayPal exchange blessed with gratitude and abundance",
      );

      return response.data;
    } catch (error) {
      PaymentSecurity.AuditLogger.logSecurityEvent(
        "payment_fraud_detected",
        "PayPal order capture failed",
        {
          orderId,
          error: error instanceof Error ? error.message : "Unknown error",
          type: "capture_error",
        },
        "error",
      );

      throw new PaymentSecurityError(
        "PayPal order capture failed",
        "CAPTURE_FAILED",
        "medium",
        { orderId },
      );
    }
  }

  async getOrderDetails(orderId: string): Promise<PayPalOrder> {
    try {
      this.initialize();

      const response = await this.api!.get<PayPalOrder>(
        `/v2/checkout/orders/${orderId}`,
      );
      return response.data;
    } catch (error) {
      PaymentSecurity.AuditLogger.logSecurityEvent(
        "payment_fraud_detected",
        "PayPal order details fetch failed",
        {
          orderId,
          error: error instanceof Error ? error.message : "Unknown error",
          type: "fetch_error",
        },
        "error",
      );

      throw error;
    }
  }

  async handleWebhook(payload: WebhookPayload): Promise<WebhookVerification> {
    try {
      this.initialize();

      // In a real implementation, verify webhook signature using PayPal's webhook verification API
      // For now, we'll do basic validation
      const isValid = this.validateWebhookStructure(payload);

      if (!isValid) {
        PaymentSecurity.AuditLogger.logSecurityEvent(
          "webhook_verification_failed",
          "Invalid webhook payload from PayPal",
          { event: payload.event },
          "critical",
        );

        return {
          isValid: false,
          reason: "Invalid payload structure",
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
        "PayPal webhook processing failed",
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

  private validateWebhookStructure(payload: WebhookPayload): boolean {
    return !!(
      payload.event &&
      payload.data &&
      typeof payload.event === "string" &&
      typeof payload.data === "object"
    );
  }

  private async processWebhookEvent(payload: WebhookPayload): Promise<void> {
    const { event, data } = payload;

    switch (event) {
      case "CHECKOUT.ORDER.APPROVED":
        await this.handleOrderApproved(data);
        break;
      case "CHECKOUT.ORDER.COMPLETED":
        await this.handleOrderCompleted(data);
        break;
      case "PAYMENT.CAPTURE.COMPLETED":
        await this.handleCaptureCompleted(data);
        break;
      case "PAYMENT.CAPTURE.DENIED":
        await this.handleCaptureDenied(data);
        break;
      default:
        PaymentSecurity.AuditLogger.logSecurityEvent(
          "payment_fraud_detected",
          `Unknown PayPal webhook event: ${event}`,
          { event, data },
          "warning",
        );
    }
  }

  private async handleOrderApproved(data: any): Promise<void> {
    PaymentSecurity.AuditLogger.logSecurityEvent(
      "payment_fraud_detected",
      "PayPal order approved",
      {
        orderId: data.id,
        type: "order_approved",
      },
      "info",
    );
  }

  private async handleOrderCompleted(data: any): Promise<void> {
    PaymentSecurity.AuditLogger.logSecurityEvent(
      "payment_fraud_detected",
      "PayPal order completed",
      {
        orderId: data.id,
        type: "order_completed",
      },
      "info",
    );
  }

  private async handleCaptureCompleted(data: any): Promise<void> {
    PaymentSecurity.AuditLogger.logSecurityEvent(
      "payment_fraud_detected",
      "PayPal capture completed",
      {
        captureId: data.id,
        amount: data.amount,
        type: "capture_completed",
      },
      "info",
    );

    // Generate sacred blessing
    PaymentSecurity.SacredSecurity.blessTransaction(
      data.id,
      "Sacred capture blessed by divine flow of abundance",
    );
  }

  private async handleCaptureDenied(data: any): Promise<void> {
    PaymentSecurity.AuditLogger.logSecurityEvent(
      "payment_fraud_detected",
      "PayPal capture denied",
      {
        captureId: data.id,
        reason: data.reason_code,
        type: "capture_denied",
      },
      "warning",
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
    return `CIVICA_PAYPAL_${userId}_${timestamp}_${random}`;
  }

  private getPlanName(planId: string): string {
    const planNames: Record<string, string> = {
      civic_explorer: "Civic Explorer Plan",
      co_creator: "Co-Creator Plan",
      cluster_steward: "Cluster Steward Plan",
      intelligence_architect: "Intelligence Architect Plan",
      institutional: "Institutional Plan",
    };

    return planNames[planId] || "CIVICA 144 Plan";
  }

  private mapRiskLevel(
    riskScore: number,
  ): "low" | "medium" | "high" | "critical" {
    if (riskScore >= 80) return "critical";
    if (riskScore >= 60) return "high";
    if (riskScore >= 40) return "medium";
    return "low";
  }

  // Public client ID for frontend
  getClientId(): string {
    this.initialize();
    return this.config!.clientId;
  }

  // Test connection
  async testConnection(): Promise<boolean> {
    try {
      this.initialize();
      await this.getAccessToken();
      return true;
    } catch {
      return false;
    }
  }
}

// Export singleton instance
export const paypalService = new SecurePayPalService();
