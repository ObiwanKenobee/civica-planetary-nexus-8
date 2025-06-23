import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Globe, AlertTriangle, Shield, Eye, RefreshCw } from "lucide-react";

interface ThreatLocation {
  location: [number, number]; // [latitude, longitude]
  threatCount: number;
  severity: "critical" | "high" | "medium" | "low";
  country: string;
  city: string;
  lastThreat: Date;
  threatTypes: string[];
}

interface ThreatMapProps {
  className?: string;
}

export function ThreatMap({ className }: ThreatMapProps) {
  const [threatLocations, setThreatLocations] = useState<ThreatLocation[]>([]);
  const [selectedLocation, setSelectedLocation] =
    useState<ThreatLocation | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadThreatData();
    const interval = setInterval(loadThreatData, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  const loadThreatData = async () => {
    try {
      setLoading(true);

      // Simulate threat location data (in production, fetch from XDR API)
      const mockThreatData: ThreatLocation[] = [
        {
          location: [37.7749, -122.4194], // San Francisco
          threatCount: 15,
          severity: "high",
          country: "United States",
          city: "San Francisco",
          lastThreat: new Date(Date.now() - 300000), // 5 minutes ago
          threatTypes: ["brute_force", "malware", "phishing"],
        },
        {
          location: [51.5074, -0.1278], // London
          threatCount: 8,
          severity: "medium",
          country: "United Kingdom",
          city: "London",
          lastThreat: new Date(Date.now() - 600000), // 10 minutes ago
          threatTypes: ["intrusion_attempt", "data_exfiltration"],
        },
        {
          location: [35.6762, 139.6503], // Tokyo
          threatCount: 3,
          severity: "low",
          country: "Japan",
          city: "Tokyo",
          lastThreat: new Date(Date.now() - 1800000), // 30 minutes ago
          threatTypes: ["anomaly_detection"],
        },
        {
          location: [52.52, 13.405], // Berlin
          threatCount: 23,
          severity: "critical",
          country: "Germany",
          city: "Berlin",
          lastThreat: new Date(Date.now() - 120000), // 2 minutes ago
          threatTypes: [
            "advanced_persistent_threat",
            "ransomware",
            "lateral_movement",
          ],
        },
        {
          location: [-33.8688, 151.2093], // Sydney
          threatCount: 6,
          severity: "medium",
          country: "Australia",
          city: "Sydney",
          lastThreat: new Date(Date.now() - 900000), // 15 minutes ago
          threatTypes: ["credential_stuffing", "bot_activity"],
        },
      ];

      setThreatLocations(mockThreatData);
    } catch (error) {
      console.error("Failed to load threat data:", error);
    } finally {
      setLoading(false);
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-red-500";
      case "high":
        return "bg-orange-500";
      case "medium":
        return "bg-yellow-500";
      case "low":
        return "bg-blue-500";
      default:
        return "bg-gray-500";
    }
  };

  const getSeveritySize = (severity: string) => {
    switch (severity) {
      case "critical":
        return "w-6 h-6";
      case "high":
        return "w-5 h-5";
      case "medium":
        return "w-4 h-4";
      case "low":
        return "w-3 h-3";
      default:
        return "w-3 h-3";
    }
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / 60000);

    if (diffInMinutes < 1) return "Just now";
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;

    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center space-x-2">
              <Globe className="h-5 w-5" />
              <span>Global Threat Map</span>
            </CardTitle>
            <CardDescription>
              Real-time threat activity across monitored regions
            </CardDescription>
          </div>
          <Button
            onClick={loadThreatData}
            disabled={loading}
            size="sm"
            variant="outline"
          >
            <RefreshCw
              className={`h-4 w-4 mr-1 ${loading ? "animate-spin" : ""}`}
            />
            Refresh
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {/* World Map Visualization */}
        <div
          className="relative bg-slate-50 dark:bg-slate-800 rounded-lg p-6 mb-4"
          style={{ minHeight: "300px" }}
        >
          {/* Simple world map representation */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <Globe className="h-16 w-16 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">
                Global Threat Distribution
              </p>
            </div>
          </div>

          {/* Threat location markers */}
          <div className="relative h-full">
            {threatLocations.map((location, index) => (
              <div
                key={index}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all hover:scale-110"
                style={{
                  left: `${20 + index * 15}%`,
                  top: `${30 + (index % 3) * 20}%`,
                }}
                onClick={() => setSelectedLocation(location)}
              >
                <div
                  className={`${getSeverityColor(location.severity)} ${getSeveritySize(location.severity)} rounded-full animate-pulse border-2 border-white shadow-lg`}
                >
                  <div className="w-full h-full rounded-full bg-white/30"></div>
                </div>
                {location.severity === "critical" && (
                  <div className="absolute -top-1 -right-1">
                    <AlertTriangle className="h-3 w-3 text-red-600" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Threat Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">
              {threatLocations.filter((l) => l.severity === "critical").length}
            </div>
            <div className="text-xs text-muted-foreground">Critical</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">
              {threatLocations.filter((l) => l.severity === "high").length}
            </div>
            <div className="text-xs text-muted-foreground">High</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-600">
              {threatLocations.filter((l) => l.severity === "medium").length}
            </div>
            <div className="text-xs text-muted-foreground">Medium</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {threatLocations.filter((l) => l.severity === "low").length}
            </div>
            <div className="text-xs text-muted-foreground">Low</div>
          </div>
        </div>

        {/* Threat Locations List */}
        <div className="space-y-2">
          <h4 className="font-medium text-sm">Active Threat Locations</h4>
          {threatLocations
            .sort((a, b) => b.threatCount - a.threatCount)
            .map((location, index) => (
              <div
                key={index}
                className={`border rounded-lg p-3 cursor-pointer transition-colors hover:bg-muted/50 ${
                  selectedLocation === location ? "bg-muted border-primary" : ""
                }`}
                onClick={() => setSelectedLocation(location)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div
                      className={`${getSeverityColor(location.severity)} w-3 h-3 rounded-full`}
                    ></div>
                    <span className="font-medium">
                      {location.city}, {location.country}
                    </span>
                    <Badge variant="outline">
                      {location.threatCount} threats
                    </Badge>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {formatTimeAgo(location.lastThreat)}
                  </span>
                </div>
                <div className="mt-1 text-xs text-muted-foreground">
                  Types: {location.threatTypes.join(", ")}
                </div>
              </div>
            ))}
        </div>

        {/* Selected Location Details */}
        {selectedLocation && (
          <div className="mt-4 p-4 border rounded-lg bg-muted/30">
            <h4 className="font-medium mb-2">
              {selectedLocation.city}, {selectedLocation.country}
            </h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Threat Count:</span>
                <span className="ml-2 font-medium">
                  {selectedLocation.threatCount}
                </span>
              </div>
              <div>
                <span className="text-muted-foreground">Severity:</span>
                <Badge
                  className="ml-2"
                  variant={
                    selectedLocation.severity === "critical"
                      ? "destructive"
                      : "secondary"
                  }
                >
                  {selectedLocation.severity}
                </Badge>
              </div>
              <div>
                <span className="text-muted-foreground">Last Activity:</span>
                <span className="ml-2 font-medium">
                  {formatTimeAgo(selectedLocation.lastThreat)}
                </span>
              </div>
              <div>
                <span className="text-muted-foreground">Coordinates:</span>
                <span className="ml-2 font-mono text-xs">
                  {selectedLocation.location[0].toFixed(2)},{" "}
                  {selectedLocation.location[1].toFixed(2)}
                </span>
              </div>
            </div>
            <div className="mt-2">
              <span className="text-muted-foreground text-sm">
                Threat Types:
              </span>
              <div className="flex flex-wrap gap-1 mt-1">
                {selectedLocation.threatTypes.map((type, idx) => (
                  <Badge key={idx} variant="outline" className="text-xs">
                    {type.replace(/_/g, " ")}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Legend */}
        <div className="mt-4 p-3 bg-muted/20 rounded-lg">
          <h4 className="font-medium text-sm mb-2">Legend</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <span>Critical</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-orange-500"></div>
              <span>High</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <span>Medium</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
              <span>Low</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default ThreatMap;
