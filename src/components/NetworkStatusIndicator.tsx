// CIVICA 144 Network Status Indicator
// Visual network status with recovery actions

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Wifi,
  WifiOff,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  Signal,
  Globe,
  Zap,
  Clock,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import useNetworkStatus from "@/hooks/useNetworkStatus";

interface NetworkStatusIndicatorProps {
  variant?: "minimal" | "detailed" | "floating";
  showRecovery?: boolean;
  className?: string;
}

const NetworkStatusIndicator: React.FC<NetworkStatusIndicatorProps> = ({
  variant = "minimal",
  showRecovery = true,
  className = "",
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const networkStatus = useNetworkStatus();

  const getHealthColor = () => {
    const health = networkStatus.getNetworkHealth();
    switch (health) {
      case "excellent":
        return "text-green-400 border-green-400/20 bg-green-500/10";
      case "good":
        return "text-blue-400 border-blue-400/20 bg-blue-500/10";
      case "poor":
        return "text-yellow-400 border-yellow-400/20 bg-yellow-500/10";
      case "critical":
        return "text-red-400 border-red-400/20 bg-red-500/10";
    }
  };

  const getStatusIcon = () => {
    if (networkStatus.isRecovering) {
      return <RefreshCw className="w-4 h-4 animate-spin" />;
    }
    if (!networkStatus.isOnline) {
      return <WifiOff className="w-4 h-4" />;
    }
    if (networkStatus.isSlowConnection) {
      return <Signal className="w-4 h-4" />;
    }
    return <Wifi className="w-4 h-4" />;
  };

  const getStatusText = () => {
    if (networkStatus.isRecovering) {
      return `Reconnecting... (${networkStatus.reconnectAttempts}/10)`;
    }
    if (!networkStatus.isOnline) {
      return "Offline";
    }
    if (networkStatus.isSlowConnection) {
      return `Slow (${networkStatus.effectiveType})`;
    }
    return `Online (${networkStatus.effectiveType})`;
  };

  const formatTime = (date: Date | null) => {
    if (!date) return "Never";
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);

    if (minutes > 0) return `${minutes}m ${seconds}s ago`;
    return `${seconds}s ago`;
  };

  if (variant === "minimal") {
    return (
      <div className={`flex items-center space-x-2 ${className}`}>
        <div className={`p-1 rounded-full ${getHealthColor()}`}>
          {getStatusIcon()}
        </div>
        {!networkStatus.isOnline && (
          <span className="text-sm text-red-400">Offline</span>
        )}
      </div>
    );
  }

  if (variant === "floating") {
    return (
      <AnimatePresence>
        {(!networkStatus.isOnline || networkStatus.isRecovering) && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className={`fixed bottom-4 right-4 z-50 ${className}`}
          >
            <Card className={`${getHealthColor()} border backdrop-blur-md`}>
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2">
                    {getStatusIcon()}
                    <span className="text-sm font-semibold">
                      {getStatusText()}
                    </span>
                  </div>
                  {showRecovery && !networkStatus.isOnline && (
                    <Button
                      size="sm"
                      onClick={networkStatus.retryConnection}
                      disabled={networkStatus.isRecovering}
                      className="h-8 px-3 bg-white/10 hover:bg-white/20"
                    >
                      {networkStatus.isRecovering ? (
                        <RefreshCw className="w-3 h-3 animate-spin" />
                      ) : (
                        "Retry"
                      )}
                    </Button>
                  )}
                </div>
                {networkStatus.outageCount > 0 && (
                  <div className="mt-2 text-xs opacity-75">
                    {networkStatus.outageCount} outage(s) detected
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    );
  }

  // Detailed variant
  return (
    <Card
      className={`${getHealthColor()} border backdrop-blur-md ${className}`}
    >
      <CardContent className="p-4">
        <div className="space-y-4">
          {/* Main Status */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {getStatusIcon()}
              <div>
                <div className="font-semibold">{getStatusText()}</div>
                <div className="text-xs opacity-75">
                  Health: {networkStatus.getNetworkHealth()}
                </div>
              </div>
            </div>
            <Badge variant="outline" className="text-xs">
              {networkStatus.connectionType}
            </Badge>
          </div>

          {/* Offline Alert */}
          {!networkStatus.isOnline && (
            <Alert className="border-red-400/20 bg-red-500/10">
              <AlertTriangle className="w-4 h-4" />
              <AlertDescription className="text-red-200">
                Connection lost.{" "}
                {networkStatus.isRecovering
                  ? "Attempting to reconnect..."
                  : "Click retry to reconnect."}
              </AlertDescription>
            </Alert>
          )}

          {/* Connection Details */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full text-xs"
          >
            {isExpanded ? "Hide Details" : "Show Details"}
          </Button>

          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-3"
              >
                {/* Connection Metrics */}
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="flex items-center justify-between">
                    <span>Speed:</span>
                    <span>{networkStatus.downlink} Mbps</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Latency:</span>
                    <span>{networkStatus.rtt}ms</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Save Data:</span>
                    <span>{networkStatus.saveData ? "Yes" : "No"}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Outages:</span>
                    <span>{networkStatus.outageCount}</span>
                  </div>
                </div>

                {/* Timeline */}
                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-3 h-3 text-green-400" />
                      <span>Last Online:</span>
                    </div>
                    <span>{formatTime(networkStatus.lastOnline)}</span>
                  </div>
                  {networkStatus.lastOffline && (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <WifiOff className="w-3 h-3 text-red-400" />
                        <span>Last Offline:</span>
                      </div>
                      <span>{formatTime(networkStatus.lastOffline)}</span>
                    </div>
                  )}
                </div>

                {/* Actions */}
                {showRecovery && (
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      onClick={networkStatus.retryConnection}
                      disabled={networkStatus.isRecovering}
                      className="flex-1 h-8"
                    >
                      {networkStatus.isRecovering ? (
                        <>
                          <RefreshCw className="w-3 h-3 mr-2 animate-spin" />
                          Connecting...
                        </>
                      ) : (
                        <>
                          <Zap className="w-3 h-3 mr-2" />
                          Retry Connection
                        </>
                      )}
                    </Button>
                    {networkStatus.outageCount > 0 && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={networkStatus.clearOutages}
                        className="h-8 px-3"
                      >
                        Clear
                      </Button>
                    )}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </CardContent>
    </Card>
  );
};

export default NetworkStatusIndicator;
