// CIVICA 144 Offline Recovery Page
// Help users recover from network connectivity issues

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  WifiOff,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  Globe,
  Smartphone,
  Router,
  Shield,
  Clock,
  TrendingUp,
  Zap,
} from "lucide-react";
import { motion } from "framer-motion";
import useNetworkStatus from "@/hooks/useNetworkStatus";
import NetworkStatusIndicator from "./NetworkStatusIndicator";

const OfflineRecoveryPage: React.FC = () => {
  const [recoveryStep, setRecoveryStep] = useState(0);
  const [isTestingConnection, setIsTestingConnection] = useState(false);
  const networkStatus = useNetworkStatus();

  const recoverySteps = [
    {
      title: "Check Network Connection",
      icon: <Globe className="w-6 h-6" />,
      description: "Verify your internet connection is working",
      actions: [
        "Try visiting another website (e.g., google.com)",
        "Check if other devices can connect to the internet",
        "Look for network connectivity indicators on your device",
      ],
    },
    {
      title: "Router & Modem Reset",
      icon: <Router className="w-6 h-6" />,
      description: "Reset your network equipment",
      actions: [
        "Unplug your router and modem for 30 seconds",
        "Plug in the modem first, wait 2 minutes",
        "Plug in the router, wait 2 minutes",
        "Check all cables are securely connected",
      ],
    },
    {
      title: "Device Network Settings",
      icon: <Smartphone className="w-6 h-6" />,
      description: "Check your device network configuration",
      actions: [
        "Turn WiFi off and on again",
        "Try switching between WiFi and mobile data",
        "Forget and reconnect to your WiFi network",
        "Restart your device network adapter",
      ],
    },
    {
      title: "Browser & Cache Issues",
      icon: <Shield className="w-6 h-6" />,
      description: "Clear browser data that might be causing issues",
      actions: [
        "Clear browser cache and cookies",
        "Disable browser extensions temporarily",
        "Try incognito/private browsing mode",
        "Update your browser to the latest version",
      ],
    },
  ];

  const testConnection = async () => {
    setIsTestingConnection(true);
    try {
      const isConnected = await networkStatus.retryConnection();
      if (isConnected) {
        setRecoveryStep(0);
      }
    } finally {
      setIsTestingConnection(false);
    }
  };

  useEffect(() => {
    if (networkStatus.isOnline) {
      setRecoveryStep(0);
    }
  }, [networkStatus.isOnline]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Background pattern */}
      <div className="fixed inset-0 opacity-10">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-4xl mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="mx-auto w-20 h-20 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center"
          >
            <WifiOff className="w-10 h-10 text-white" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent"
          >
            Connection Lost
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-300"
          >
            CIVICA platform has lost connection to the sacred network
          </motion.p>
        </div>

        {/* Network Status */}
        <NetworkStatusIndicator variant="detailed" />

        {/* Quick Recovery */}
        <Card className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border-blue-400/20 backdrop-blur-md">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-blue-400">
              <Zap className="w-5 h-5" />
              <span>Quick Recovery</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-300">
              Try these quick fixes before proceeding to detailed recovery
              steps:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button
                onClick={() => window.location.reload()}
                className="h-16 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
              >
                <RefreshCw className="w-5 h-5 mr-2" />
                Refresh Page
              </Button>

              <Button
                onClick={testConnection}
                disabled={isTestingConnection}
                className="h-16 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
              >
                {isTestingConnection ? (
                  <>
                    <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                    Testing...
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Test Connection
                  </>
                )}
              </Button>

              <Button
                onClick={() => {
                  localStorage.clear();
                  sessionStorage.clear();
                  window.location.reload();
                }}
                className="h-16 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              >
                <Shield className="w-5 h-5 mr-2" />
                Clear Cache
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Recovery Steps */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-center text-cyan-400">
            Step-by-Step Recovery Guide
          </h2>

          <div className="grid gap-6">
            {recoverySteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card
                  className={`transition-all cursor-pointer ${
                    recoveryStep === index
                      ? "bg-gradient-to-r from-purple-500/30 to-cyan-500/30 border-cyan-400 ring-2 ring-cyan-400/50"
                      : "bg-black/40 border-white/20 hover:border-white/40"
                  } backdrop-blur-md`}
                  onClick={() => setRecoveryStep(index)}
                >
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-3">
                      <div
                        className={`p-2 rounded-full ${
                          recoveryStep === index
                            ? "bg-cyan-500/20"
                            : "bg-gray-500/20"
                        }`}
                      >
                        {step.icon}
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <span>
                            Step {index + 1}: {step.title}
                          </span>
                          {recoveryStep === index && (
                            <Badge className="bg-cyan-500/20 text-cyan-400">
                              Current
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-400 font-normal mt-1">
                          {step.description}
                        </p>
                      </div>
                    </CardTitle>
                  </CardHeader>

                  {recoveryStep === index && (
                    <CardContent>
                      <ul className="space-y-2">
                        {step.actions.map((action, actionIndex) => (
                          <li
                            key={actionIndex}
                            className="flex items-start space-x-2"
                          >
                            <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full mt-2 flex-shrink-0" />
                            <span className="text-sm text-gray-300">
                              {action}
                            </span>
                          </li>
                        ))}
                      </ul>

                      <div className="flex space-x-2 mt-4">
                        <Button
                          onClick={testConnection}
                          disabled={isTestingConnection}
                          className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                        >
                          {isTestingConnection ? (
                            <>
                              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                              Testing...
                            </>
                          ) : (
                            <>
                              <CheckCircle className="w-4 h-4 mr-2" />
                              Test Connection
                            </>
                          )}
                        </Button>

                        {index < recoverySteps.length - 1 && (
                          <Button
                            onClick={() => setRecoveryStep(index + 1)}
                            variant="outline"
                            className="border-white/20 text-gray-300 hover:bg-white/5"
                          >
                            Next Step
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  )}
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Contact Support */}
        <Card className="bg-gradient-to-r from-orange-500/20 to-red-500/20 border-orange-400/20 backdrop-blur-md">
          <CardHeader>
            <CardTitle className="text-orange-400">
              Still Having Issues?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-300 mb-4">
              If you've tried all the recovery steps and are still experiencing
              connection issues, our sacred support guardians are here to help.
            </p>

            <div className="flex space-x-4">
              <Button
                onClick={() =>
                  window.open(
                    "mailto:support@civica144.com?subject=Connection Issues",
                    "_blank",
                  )
                }
                className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
              >
                Contact Support
              </Button>

              <Button
                onClick={() => window.open("/diagnostic", "_blank")}
                variant="outline"
                className="border-orange-400 text-orange-400 hover:bg-orange-400/20"
              >
                Run Full Diagnostic
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OfflineRecoveryPage;
