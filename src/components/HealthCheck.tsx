import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { CheckCircle, XCircle, AlertCircle } from "lucide-react";

interface HealthStatus {
  component: string;
  status: "healthy" | "warning" | "error";
  message: string;
}

export default function HealthCheck() {
  const [healthStatus, setHealthStatus] = useState<HealthStatus[]>([]);

  useEffect(() => {
    const checkSystemHealth = () => {
      const checks: HealthStatus[] = [];

      // Check React
      try {
        checks.push({
          component: "React",
          status: "healthy",
          message: "React is running properly",
        });
      } catch (error) {
        checks.push({
          component: "React",
          status: "error",
          message: `React error: ${error}`,
        });
      }

      // Check Router
      try {
        const location = window.location;
        checks.push({
          component: "Router",
          status: "healthy",
          message: `Current route: ${location.pathname}`,
        });
      } catch (error) {
        checks.push({
          component: "Router",
          status: "error",
          message: `Router error: ${error}`,
        });
      }

      // Check Local Storage
      try {
        localStorage.setItem("health-check", "test");
        localStorage.removeItem("health-check");
        checks.push({
          component: "Local Storage",
          status: "healthy",
          message: "Local storage is accessible",
        });
      } catch (error) {
        checks.push({
          component: "Local Storage",
          status: "error",
          message: `Local storage error: ${error}`,
        });
      }

      // Check Environment Variables
      const requiredEnvs = ["VITE_APP_ENVIRONMENT"];
      const missingEnvs = requiredEnvs.filter((env) => !import.meta.env[env]);

      if (missingEnvs.length === 0) {
        checks.push({
          component: "Environment",
          status: "healthy",
          message: "All required environment variables are present",
        });
      } else {
        checks.push({
          component: "Environment",
          status: "warning",
          message: `Missing environment variables: ${missingEnvs.join(", ")}`,
        });
      }

      // Check Guardian System
      try {
        const guardianSession = localStorage.getItem("guardian-session");
        checks.push({
          component: "Guardian System",
          status: guardianSession ? "healthy" : "warning",
          message: guardianSession
            ? "Guardian session exists"
            : "No Guardian session found",
        });
      } catch (error) {
        checks.push({
          component: "Guardian System",
          status: "error",
          message: `Guardian system error: ${error}`,
        });
      }

      setHealthStatus(checks);
    };

    checkSystemHealth();
    const interval = setInterval(checkSystemHealth, 5000); // Check every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "healthy":
        return <CheckCircle className="h-4 w-4 text-green-400" />;
      case "warning":
        return <AlertCircle className="h-4 w-4 text-yellow-400" />;
      case "error":
        return <XCircle className="h-4 w-4 text-red-400" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "healthy":
        return "default";
      case "warning":
        return "secondary";
      case "error":
        return "destructive";
      default:
        return "outline";
    }
  };

  return (
    <Card className="bg-white/10 backdrop-blur-lg border-cyan-500/30">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          System Health Check
          {healthStatus.some((h) => h.status === "error") ? (
            <XCircle className="h-5 w-5 text-red-400" />
          ) : healthStatus.some((h) => h.status === "warning") ? (
            <AlertCircle className="h-5 w-5 text-yellow-400" />
          ) : (
            <CheckCircle className="h-5 w-5 text-green-400" />
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {healthStatus.map((check, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-white/5 rounded-lg"
            >
              <div className="flex items-center gap-3">
                {getStatusIcon(check.status)}
                <span className="text-white font-medium">
                  {check.component}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={getStatusColor(check.status)}>
                  {check.status.toUpperCase()}
                </Badge>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 p-3 bg-white/5 rounded-lg">
          <h4 className="text-white font-medium mb-2">System Information</h4>
          <div className="space-y-1 text-sm text-cyan-200">
            <div>
              Environment:{" "}
              {import.meta.env.VITE_APP_ENVIRONMENT || "development"}
            </div>
            <div>
              Platform: {import.meta.env.VITE_DEPLOYMENT_PLATFORM || "local"}
            </div>
            <div>Timestamp: {new Date().toISOString()}</div>
            <div>User Agent: {navigator.userAgent}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
