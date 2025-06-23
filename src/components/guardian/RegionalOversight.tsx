import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import {
  Globe,
  TrendingDown,
  TrendingUp,
  AlertCircle,
  MapPin,
  Leaf,
  Users,
  DollarSign,
  RefreshCw,
} from "lucide-react";
import { RegionalMetrics } from "../../types/guardian";
import { mockRegionalMetrics } from "../../data/guardianData";

export function RegionalOversight() {
  const [regions, setRegions] =
    useState<RegionalMetrics[]>(mockRegionalMetrics);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsRefreshing(false);
  };

  const getFundingLevelColor = (level: string) => {
    switch (level) {
      case "underfunded":
        return "destructive";
      case "overfunded":
        return "secondary";
      case "balanced":
        return "default";
      default:
        return "default";
    }
  };

  const getExtractionColor = (ratio: number) => {
    if (ratio > 1.5) return "text-red-400";
    if (ratio > 1.0) return "text-yellow-400";
    return "text-green-400";
  };

  const underfundedRegions = regions.filter(
    (r) => r.fundingLevel === "underfunded",
  ).length;
  const overextracted = regions.filter((r) => r.extractionRatio > 1.0).length;
  const totalFlourish = regions.reduce((sum, r) => sum + r.flourishFlow, 0);
  const avgSDGAlignment = Math.round(
    regions.reduce((sum, r) => sum + r.sdgAlignment, 0) / regions.length,
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white flex items-center gap-3">
            🌍 Regional Oversight
            <Globe className="h-8 w-8 text-green-400" />
          </h2>
          <p className="text-cyan-200 mt-2">
            Flags underfunded or overextracted bioregions
          </p>
        </div>
        <Button
          onClick={handleRefresh}
          disabled={isRefreshing}
          variant="outline"
          className="border-cyan-500 text-cyan-300 hover:bg-cyan-500/20"
        >
          <RefreshCw
            className={`h-4 w-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`}
          />
          Refresh
        </Button>
      </div>

      {/* Global Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-white/10 backdrop-blur-lg border-cyan-500/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-cyan-200">
              Underfunded Regions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {underfundedRegions}
            </div>
            <p className="text-xs text-cyan-300 mt-1">Need funding support</p>
            {underfundedRegions > 0 && (
              <Badge variant="destructive" className="mt-2 text-xs">
                Action Required
              </Badge>
            )}
          </CardContent>
        </Card>

        <Card className="bg-white/10 backdrop-blur-lg border-cyan-500/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-cyan-200">
              Overextracted
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{overextracted}</div>
            <p className="text-xs text-cyan-300 mt-1">
              Above sustainable ratio
            </p>
            {overextracted > 0 && (
              <Badge variant="destructive" className="mt-2 text-xs">
                Rebalance Needed
              </Badge>
            )}
          </CardContent>
        </Card>

        <Card className="bg-white/10 backdrop-blur-lg border-cyan-500/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-cyan-200">
              Total Flourish Flow
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {totalFlourish.toLocaleString()}
            </div>
            <p className="text-xs text-cyan-300 mt-1">Across all regions</p>
            <div className="flex items-center gap-1 mt-2">
              <TrendingUp className="h-3 w-3 text-green-400" />
              <span className="text-green-400 text-xs">+12% this month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/10 backdrop-blur-lg border-cyan-500/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-cyan-200">
              Avg SDG Alignment
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {avgSDGAlignment}%
            </div>
            <p className="text-xs text-cyan-300 mt-1">Sustainability score</p>
            <div className="mt-3">
              <Progress value={avgSDGAlignment} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Regional Status Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {regions.map((region) => (
          <Card
            key={region.regionId}
            className={`bg-white/10 backdrop-blur-lg border-cyan-500/30 cursor-pointer transition-all hover:bg-white/15 ${
              selectedRegion === region.regionId ? "ring-2 ring-cyan-400" : ""
            }`}
            onClick={() =>
              setSelectedRegion(
                selectedRegion === region.regionId ? null : region.regionId,
              )
            }
          >
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <MapPin className="h-5 w-5 text-green-400" />
                {region.name}
              </CardTitle>
              <div className="flex gap-2">
                <Badge variant={getFundingLevelColor(region.fundingLevel)}>
                  {region.fundingLevel}
                </Badge>
                {region.alerts.length > 0 && (
                  <Badge variant="destructive">
                    {region.alerts.length} Alert
                    {region.alerts.length !== 1 ? "s" : ""}
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Key Metrics */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-cyan-300">Flourish Flow</div>
                  <div className="text-white font-mono text-lg">
                    {region.flourishFlow.toLocaleString()}
                  </div>
                </div>
                <div>
                  <div className="text-cyan-300">SDG Alignment</div>
                  <div className="text-white font-mono text-lg">
                    {region.sdgAlignment}%
                  </div>
                </div>
              </div>

              {/* Extraction Ratio */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-cyan-200 text-sm">
                    Extraction Ratio
                  </span>
                  <span
                    className={`font-mono ${getExtractionColor(region.extractionRatio)}`}
                  >
                    {region.extractionRatio.toFixed(1)}x
                  </span>
                </div>
                <Progress
                  value={Math.min(region.extractionRatio * 50, 100)}
                  className="h-2"
                />
                <div className="text-xs text-cyan-300 mt-1">
                  Target: &lt;1.0x (sustainable)
                </div>
              </div>

              {/* SDG Alignment Progress */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-cyan-200 text-sm">SDG Alignment</span>
                  <span className="text-white font-mono">
                    {region.sdgAlignment}%
                  </span>
                </div>
                <Progress value={region.sdgAlignment} className="h-2" />
              </div>

              {/* Last Audit */}
              <div className="text-xs text-cyan-300">
                Last audit: {new Date(region.lastAudit).toLocaleDateString()}
              </div>

              {/* Alerts */}
              {region.alerts.length > 0 && (
                <div className="space-y-1">
                  {region.alerts.map((alert, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 text-xs"
                    >
                      <AlertCircle className="h-3 w-3 text-red-400" />
                      <span className="text-red-300">{alert}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Quick Actions */}
              <div className="flex gap-2 pt-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1 border-cyan-500 text-cyan-300 hover:bg-cyan-500/20"
                >
                  <DollarSign className="h-3 w-3 mr-1" />
                  Fund
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1 border-green-500 text-green-300 hover:bg-green-500/20"
                >
                  <Leaf className="h-3 w-3 mr-1" />
                  Audit
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Detailed Region View */}
      {selectedRegion && (
        <Card className="bg-white/10 backdrop-blur-lg border-cyan-500/30">
          <CardHeader>
            <CardTitle className="text-white">
              Detailed Analysis:{" "}
              {regions.find((r) => r.regionId === selectedRegion)?.name}
            </CardTitle>
            <CardDescription className="text-cyan-200">
              Comprehensive bioregional metrics and recommendations
            </CardDescription>
          </CardHeader>
          <CardContent>
            {(() => {
              const region = regions.find((r) => r.regionId === selectedRegion);
              if (!region) return null;

              return (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Financial Flows */}
                  <div className="space-y-4">
                    <h4 className="text-lg font-medium text-white">
                      Financial Flows
                    </h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                        <span className="text-cyan-200">Incoming Flourish</span>
                        <span className="text-green-400 font-mono">
                          +{region.flourishFlow}
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                        <span className="text-cyan-200">Value Extracted</span>
                        <span className="text-red-400 font-mono">
                          -
                          {Math.round(
                            region.flourishFlow * region.extractionRatio,
                          )}
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                        <span className="text-cyan-200">Net Flow</span>
                        <span className="text-white font-mono">
                          {Math.round(
                            region.flourishFlow * (1 - region.extractionRatio),
                          )}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Sustainability Metrics */}
                  <div className="space-y-4">
                    <h4 className="text-lg font-medium text-white">
                      Sustainability Metrics
                    </h4>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-cyan-200">SDG Alignment</span>
                          <span className="text-white">
                            {region.sdgAlignment}%
                          </span>
                        </div>
                        <Progress value={region.sdgAlignment} />
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-cyan-200">
                            Extraction Sustainability
                          </span>
                          <span
                            className={getExtractionColor(
                              region.extractionRatio,
                            )}
                          >
                            {region.extractionRatio > 1.0
                              ? "Unsustainable"
                              : "Sustainable"}
                          </span>
                        </div>
                        <Progress
                          value={
                            region.extractionRatio > 1.0
                              ? 100
                              : (1 - region.extractionRatio) * 100
                          }
                          className={
                            region.extractionRatio > 1.0
                              ? "bg-red-500/20"
                              : "bg-green-500/20"
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })()}
          </CardContent>
        </Card>
      )}

      {/* RevOps Integration */}
      <Card className="bg-gradient-to-r from-green-500/20 to-cyan-500/20 border-green-500/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Users className="h-5 w-5 text-green-400" />
            RevOps Integration Binding
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="text-green-300 font-medium">Connected Systems</h4>
              <div className="space-y-1 text-cyan-200 text-sm">
                <div>• Bioregional Flow Monitor</div>
                <div>• Flourish Allocation Router</div>
                <div>• SDG Impact Tracker</div>
                <div>• Extraction Ratio Calculator</div>
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="text-green-300 font-medium">Automated Actions</h4>
              <div className="space-y-1 text-cyan-200 text-sm">
                <div>• Emergency funding deployment</div>
                <div>• Extraction ratio alerts</div>
                <div>• SDG alignment bonuses</div>
                <div>• Quarterly rebalancing ceremonies</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
