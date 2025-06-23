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
  Brain,
  Eye,
  MessageSquare,
  UserCheck,
  Scale,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Zap,
  RefreshCw,
} from "lucide-react";
import { MetaCoPilotInsight } from "../../types/guardian";
import { mockAIInsights } from "../../data/guardianData";

interface MetaCoPilotProps {
  isCompact?: boolean;
}

export function MetaCoPilot({ isCompact = false }: MetaCoPilotProps) {
  const [insights, setInsights] =
    useState<MetaCoPilotInsight[]>(mockAIInsights);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsRefreshing(false);
  };

  const handleDismissInsight = (insightId: string) => {
    setInsights(insights.filter((insight) => insight.id !== insightId));
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "watcher":
        return Eye;
      case "whisperer":
        return MessageSquare;
      case "witness":
        return UserCheck;
      case "balancer":
        return Scale;
      default:
        return Brain;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "watcher":
        return "text-blue-400";
      case "whisperer":
        return "text-green-400";
      case "witness":
        return "text-purple-400";
      case "balancer":
        return "text-yellow-400";
      default:
        return "text-cyan-400";
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return "text-green-400";
    if (confidence >= 75) return "text-blue-400";
    if (confidence >= 60) return "text-yellow-400";
    return "text-red-400";
  };

  const filteredInsights =
    selectedCategory === "all"
      ? insights
      : insights.filter((insight) => insight.category === selectedCategory);

  const actionRequiredCount = insights.filter(
    (insight) => insight.actionRequired,
  ).length;
  const avgConfidence = Math.round(
    insights.reduce((sum, insight) => sum + insight.confidence, 0) /
      insights.length,
  );

  if (isCompact) {
    return (
      <div className="space-y-4">
        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3 text-center">
          <div>
            <div className="text-lg font-bold text-white">
              {insights.length}
            </div>
            <div className="text-xs text-cyan-300">Active Insights</div>
          </div>
          <div>
            <div className="text-lg font-bold text-white">
              {actionRequiredCount}
            </div>
            <div className="text-xs text-cyan-300">Need Action</div>
          </div>
          <div>
            <div className="text-lg font-bold text-white">{avgConfidence}%</div>
            <div className="text-xs text-cyan-300">Avg Confidence</div>
          </div>
        </div>

        {/* Latest Insights */}
        <div className="space-y-2">
          {insights.slice(0, 3).map((insight) => {
            const CategoryIcon = getCategoryIcon(insight.category);
            const categoryColor = getCategoryColor(insight.category);

            return (
              <div
                key={insight.id}
                className="p-3 bg-white/5 rounded-lg border border-cyan-500/20"
              >
                <div className="flex items-start gap-2">
                  <CategoryIcon className={`h-4 w-4 mt-1 ${categoryColor}`} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-white text-sm font-medium truncate">
                        {insight.title}
                      </span>
                      {insight.actionRequired && (
                        <AlertTriangle className="h-3 w-3 text-yellow-400 flex-shrink-0" />
                      )}
                    </div>
                    <p className="text-cyan-200 text-xs">
                      {insight.description}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="outline" className="text-xs">
                        {insight.category}
                      </Badge>
                      <span
                        className={`text-xs ${getConfidenceColor(insight.confidence)}`}
                      >
                        {insight.confidence}% confidence
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <Button
          size="sm"
          variant="outline"
          className="w-full border-cyan-500 text-cyan-300 hover:bg-cyan-500/20"
        >
          View All Insights
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white flex items-center gap-3">
            🧠 Meta Co-Pilot AI
            <Brain className="h-8 w-8 text-purple-400" />
          </h2>
          <p className="text-cyan-200 mt-2">
            Detects bias, burnout, ethical debt, and neglected clusters
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

      {/* AI Roles Overview */}
      <Card className="bg-white/10 backdrop-blur-lg border-cyan-500/30">
        <CardHeader>
          <CardTitle className="text-white">AI Behavioral Roles</CardTitle>
          <CardDescription className="text-cyan-200">
            How Meta Co-Pilot monitors meaning and ethics within revenue flows
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                role: "watcher",
                icon: Eye,
                color: "text-blue-400",
                description:
                  "Flags if a service cluster receives excessive Flourish despite low ritual alignment",
                count: insights.filter((i) => i.category === "watcher").length,
              },
              {
                role: "whisperer",
                icon: MessageSquare,
                color: "text-green-400",
                description:
                  "Notifies users if they're undercharging for sacred services — offers suggestions",
                count: insights.filter((i) => i.category === "whisperer")
                  .length,
              },
              {
                role: "witness",
                icon: UserCheck,
                color: "text-purple-400",
                description:
                  'Annotates billing records with symbolic analysis: "Blessed with Fire Intention"',
                count: insights.filter((i) => i.category === "witness").length,
              },
              {
                role: "balancer",
                icon: Scale,
                color: "text-yellow-400",
                description:
                  "Suggests redistributions of income between users and bioregions based on impact equity",
                count: insights.filter((i) => i.category === "balancer").length,
              },
            ].map((role) => {
              const Icon = role.icon;
              return (
                <Card
                  key={role.role}
                  className={`bg-white/5 border-gray-500/20 cursor-pointer transition-all hover:bg-white/10 ${
                    selectedCategory === role.role ? "ring-2 ring-cyan-400" : ""
                  }`}
                  onClick={() =>
                    setSelectedCategory(
                      selectedCategory === role.role ? "all" : role.role,
                    )
                  }
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <Icon className={`h-6 w-6 ${role.color}`} />
                      <div>
                        <div className="text-white font-medium capitalize">
                          {role.role}
                        </div>
                        <div className="text-cyan-300 text-sm">
                          {role.count} insights
                        </div>
                      </div>
                    </div>
                    <p className="text-cyan-200 text-xs">{role.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-white/10 backdrop-blur-lg border-cyan-500/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-cyan-200">
              Active Insights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {insights.length}
            </div>
            <p className="text-xs text-cyan-300 mt-1">
              AI-generated recommendations
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white/10 backdrop-blur-lg border-cyan-500/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-cyan-200">
              Action Required
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {actionRequiredCount}
            </div>
            <p className="text-xs text-cyan-300 mt-1">
              Need immediate attention
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white/10 backdrop-blur-lg border-cyan-500/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-cyan-200">
              Avg Confidence
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {avgConfidence}%
            </div>
            <p className="text-xs text-cyan-300 mt-1">AI prediction accuracy</p>
            <div className="mt-3">
              <Progress value={avgConfidence} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/10 backdrop-blur-lg border-cyan-500/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-cyan-200">
              Processing Speed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">2.3s</div>
            <p className="text-xs text-cyan-300 mt-1">Average analysis time</p>
            <div className="flex items-center gap-1 mt-1">
              <Zap className="h-3 w-3 text-yellow-400" />
              <span className="text-yellow-400 text-xs">Real-time</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Insights */}
      <Card className="bg-white/10 backdrop-blur-lg border-cyan-500/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Brain className="h-5 w-5 text-purple-400" />
            AI Insights & Recommendations
          </CardTitle>
          <CardDescription className="text-cyan-200">
            {selectedCategory === "all"
              ? `Showing all ${filteredInsights.length} insights`
              : `Showing ${filteredInsights.length} ${selectedCategory} insights`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredInsights.map((insight) => {
              const CategoryIcon = getCategoryIcon(insight.category);
              const categoryColor = getCategoryColor(insight.category);
              const confidenceColor = getConfidenceColor(insight.confidence);

              return (
                <div
                  key={insight.id}
                  className="flex items-start justify-between p-4 border border-cyan-500/20 rounded-lg bg-white/5"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <CategoryIcon className={`h-5 w-5 ${categoryColor}`} />
                      <div className="flex-1">
                        <h4 className="text-white font-medium">
                          {insight.title}
                        </h4>
                        <div className="flex items-center gap-3 mt-1">
                          <Badge
                            variant="outline"
                            className={`border-gray-500 text-gray-300`}
                          >
                            {insight.category.toUpperCase()}
                          </Badge>
                          <span className={`text-sm ${confidenceColor}`}>
                            {insight.confidence}% confidence
                          </span>
                          <span className="text-cyan-300 text-sm">
                            {new Date(insight.timestamp).toLocaleTimeString()}
                          </span>
                        </div>
                      </div>
                      {insight.actionRequired && (
                        <AlertTriangle className="h-5 w-5 text-yellow-400" />
                      )}
                    </div>

                    <p className="text-cyan-200 mb-3">{insight.description}</p>

                    {insight.suggestedAction && (
                      <div className="bg-white/5 p-3 rounded border border-green-500/20">
                        <div className="flex items-center gap-2 mb-1">
                          <CheckCircle className="h-4 w-4 text-green-400" />
                          <span className="text-green-300 text-sm font-medium">
                            Suggested Action
                          </span>
                        </div>
                        <p className="text-green-200 text-sm">
                          {insight.suggestedAction}
                        </p>
                      </div>
                    )}

                    <div className="mt-3">
                      <div className="text-cyan-300 text-sm mb-1">
                        Confidence Level
                      </div>
                      <Progress value={insight.confidence} className="h-2" />
                    </div>
                  </div>

                  <div className="flex gap-2 ml-4">
                    {insight.actionRequired && (
                      <Button
                        size="sm"
                        className="bg-green-600 hover:bg-green-700 text-white"
                      >
                        Take Action
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDismissInsight(insight.id)}
                      className="border-cyan-500 text-cyan-300 hover:bg-cyan-500/20"
                    >
                      Dismiss
                    </Button>
                  </div>
                </div>
              );
            })}

            {filteredInsights.length === 0 && (
              <div className="text-center py-8 text-cyan-300">
                <Brain className="h-12 w-12 mx-auto mb-3 text-purple-400" />
                <p className="text-lg font-medium">No insights available</p>
                <p className="text-sm">
                  {selectedCategory === "all"
                    ? "AI is monitoring but found no issues to report"
                    : `No ${selectedCategory} insights at this time`}
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* AI Configuration */}
      <Card className="bg-white/10 backdrop-blur-lg border-cyan-500/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-green-400" />
            AI Learning & Configuration
          </CardTitle>
          <CardDescription className="text-cyan-200">
            Meta Co-Pilot training and sensitivity settings
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="text-white font-medium">Learning Sources</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-cyan-200 text-sm">
                    Sacred Scroll Content
                  </span>
                  <span className="text-white font-mono">12,456 docs</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-cyan-200 text-sm">
                    Transaction Patterns
                  </span>
                  <span className="text-white font-mono">89,234 events</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-cyan-200 text-sm">User Feedback</span>
                  <span className="text-white font-mono">3,567 signals</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-cyan-200 text-sm">Ritual Outcomes</span>
                  <span className="text-white font-mono">1,892 ceremonies</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-white font-medium">Detection Sensitivity</h4>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-cyan-200 text-sm">
                      Bias Detection
                    </span>
                    <span className="text-white">High</span>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-cyan-200 text-sm">
                      Burnout Monitoring
                    </span>
                    <span className="text-white">Medium</span>
                  </div>
                  <Progress value={65} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-cyan-200 text-sm">
                      Alignment Checking
                    </span>
                    <span className="text-white">High</span>
                  </div>
                  <Progress value={90} className="h-2" />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* RevOps Integration */}
      <Card className="bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border-purple-500/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Brain className="h-5 w-5 text-purple-400" />
            RevOps Integration Binding
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="text-purple-300 font-medium">Connected Systems</h4>
              <div className="space-y-1 text-cyan-200 text-sm">
                <div>• LangChain / Autogen AI Framework</div>
                <div>• Flourish Flow Analytics Engine</div>
                <div>• Sacred Scroll Semantic Analysis</div>
                <div>• Revenue Pattern Recognition</div>
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="text-purple-300 font-medium">Automated Actions</h4>
              <div className="space-y-1 text-cyan-200 text-sm">
                <div>• Real-time insight generation</div>
                <div>• Bias correction suggestions</div>
                <div>• Revenue optimization alerts</div>
                <div>• Stakeholder notification triggers</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
