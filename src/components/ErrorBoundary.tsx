// CIVICA 144 Error Boundary
// Sacred error handling for graceful failures

import React, { Component, ErrorInfo, ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  AlertTriangle,
  RefreshCw,
  Home,
  ArrowLeft,
  Shield,
  Heart,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
  retryCount: number;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      retryCount: 0,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null, retryCount: 0 };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({
      error,
      errorInfo,
    });

    // Log error to monitoring service
    console.error("CIVICA Error Boundary caught an error:", error, errorInfo);

    // Call custom error handler if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }

    // Log to analytics or error tracking service
    if (typeof window !== "undefined") {
      // Example: Send to error tracking service
      // errorTrackingService.captureException(error, { extra: errorInfo });
    }
  }

  handleRetry = () => {
    this.setState((prevState) => ({
      hasError: false,
      error: null,
      errorInfo: null,
      retryCount: prevState.retryCount + 1,
    }));
  };

  handleGoHome = () => {
    window.location.href = "/";
  };

  handleGoBack = () => {
    window.history.back();
  };

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default sacred error UI
      return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white flex items-center justify-center p-6">
          {/* Cosmic Background */}
          <div className="fixed inset-0 opacity-10">
            {[...Array(50)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                }}
              />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative z-10 max-w-2xl w-full"
          >
            <Card className="bg-black/40 border-red-400/20 backdrop-blur-md">
              <CardHeader className="text-center">
                <div className="flex items-center justify-center space-x-4 mb-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-red-500 to-orange-500 flex items-center justify-center">
                    <AlertTriangle className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-left">
                    <CardTitle className="text-red-400 text-xl">
                      Sacred Process Disrupted
                    </CardTitle>
                    <p className="text-gray-400 text-sm">
                      The cosmic flow encountered an unexpected pattern
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-center space-x-2 mb-4">
                  <Badge className="bg-red-500/20 text-red-400">
                    <Shield className="w-3 h-3 mr-1" />
                    Error Contained
                  </Badge>
                  <Badge className="bg-purple-500/20 text-purple-400">
                    <Heart className="w-3 h-3 mr-1" />
                    Sacred Resilience Active
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Sacred Error Message */}
                <div className="text-center space-y-4">
                  <h3 className="text-lg font-semibold text-cyan-400">
                    🌟 The Universe is Recalibrating
                  </h3>
                  <p className="text-gray-300">
                    Every disruption in the sacred flow is an opportunity for
                    growth and learning. The collective consciousness remains
                    strong, and this momentary pause allows for deeper
                    integration.
                  </p>
                </div>

                {/* Error Details (Development Mode) */}
                {process.env.NODE_ENV === "development" && this.state.error && (
                  <details className="bg-black/20 rounded-lg p-4 text-xs">
                    <summary className="cursor-pointer text-orange-400 mb-2">
                      🔍 Sacred Debugging Information
                    </summary>
                    <div className="space-y-2">
                      <div>
                        <strong className="text-red-400">Error:</strong>
                        <pre className="text-gray-300 whitespace-pre-wrap mt-1">
                          {this.state.error.message}
                        </pre>
                      </div>
                      {this.state.errorInfo && (
                        <div>
                          <strong className="text-red-400">
                            Component Stack:
                          </strong>
                          <pre className="text-gray-300 whitespace-pre-wrap mt-1 max-h-32 overflow-y-auto">
                            {this.state.errorInfo.componentStack}
                          </pre>
                        </div>
                      )}
                      {this.state.error.stack && (
                        <div>
                          <strong className="text-red-400">Stack Trace:</strong>
                          <pre className="text-gray-300 whitespace-pre-wrap mt-1 max-h-32 overflow-y-auto">
                            {this.state.error.stack}
                          </pre>
                        </div>
                      )}
                    </div>
                  </details>
                )}

                {/* Retry Information */}
                {this.state.retryCount > 0 && (
                  <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3">
                    <p className="text-yellow-400 text-sm">
                      <Sparkles className="w-4 h-4 inline mr-1" />
                      Retry attempt #{this.state.retryCount} • The sacred flow
                      adapts and persists
                    </p>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    onClick={this.handleRetry}
                    className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Restore Sacred Flow
                  </Button>

                  <Button
                    onClick={this.handleGoBack}
                    variant="outline"
                    className="flex-1 border-cyan-400 text-cyan-400 hover:bg-cyan-400/20"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Previous Portal
                  </Button>

                  <Button
                    onClick={this.handleGoHome}
                    variant="outline"
                    className="flex-1 border-purple-400 text-purple-400 hover:bg-purple-400/20"
                  >
                    <Home className="w-4 h-4 mr-2" />
                    Sacred Home
                  </Button>
                </div>

                {/* Sacred Wisdom */}
                <div className="text-center pt-4 border-t border-white/20">
                  <p className="text-sm text-gray-400 italic">
                    "In every ending, there is the seed of a new beginning. The
                    sacred technology learns and evolves through each
                    challenge."
                  </p>
                  <p className="text-xs text-gray-500 mt-2">
                    - Ancient Wisdom of Resilient Systems
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Higher-order component for easy wrapping
export const withErrorBoundary = <P extends object>(
  Component: React.ComponentType<P>,
  errorBoundaryProps?: Omit<Props, "children">,
) => {
  const WrappedComponent = (props: P) => (
    <ErrorBoundary {...errorBoundaryProps}>
      <Component {...props} />
    </ErrorBoundary>
  );

  WrappedComponent.displayName = `withErrorBoundary(${Component.displayName || Component.name})`;
  return WrappedComponent;
};

export default ErrorBoundary;
