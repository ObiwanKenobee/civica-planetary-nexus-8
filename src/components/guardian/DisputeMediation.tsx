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
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import {
  Heart,
  Users,
  MessageCircle,
  Clock,
  CheckCircle,
  AlertCircle,
  DollarSign,
  FileText,
  RefreshCw,
} from "lucide-react";
import { DisputeCase } from "../../types/guardian";
import { mockDisputes } from "../../data/guardianData";

export function DisputeMediation() {
  const [disputes, setDisputes] = useState<DisputeCase[]>(mockDisputes);
  const [selectedDispute, setSelectedDispute] = useState<string | null>(null);
  const [resolution, setResolution] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsRefreshing(false);
  };

  const handleStartMediation = (disputeId: string) => {
    setDisputes(
      disputes.map((dispute) =>
        dispute.id === disputeId
          ? {
              ...dispute,
              status: "mediating" as const,
              mediator: "guardian:sacred.mediator",
            }
          : dispute,
      ),
    );
  };

  const handleResolveDispute = (disputeId: string) => {
    if (!resolution.trim()) return;

    setDisputes(
      disputes.map((dispute) =>
        dispute.id === disputeId
          ? {
              ...dispute,
              status: "resolved" as const,
              resolution,
              resolvedAt: new Date(),
            }
          : dispute,
      ),
    );
    setResolution("");
    setSelectedDispute(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "submitted":
        return "destructive";
      case "mediating":
        return "secondary";
      case "ritual_review":
        return "default";
      case "resolved":
        return "outline";
      default:
        return "default";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "refund_request":
        return DollarSign;
      case "user_conflict":
        return Users;
      case "node_dispute":
        return AlertCircle;
      case "contract_breach":
        return FileText;
      default:
        return MessageCircle;
    }
  };

  const activeDisputes = disputes.filter((d) => d.status !== "resolved");
  const totalValue = disputes.reduce((sum, d) => sum + d.value, 0);
  const avgResolutionTime = 48; // Mock average in hours

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white flex items-center gap-3">
            🕊️ Dispute Mediation
            <Heart className="h-8 w-8 text-pink-400" />
          </h2>
          <p className="text-cyan-200 mt-2">
            Initiates reconciliation between users, nodes, or contracts
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

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-white/10 backdrop-blur-lg border-cyan-500/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-cyan-200">
              Active Disputes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {activeDisputes.length}
            </div>
            <p className="text-xs text-cyan-300 mt-1">Requiring mediation</p>
          </CardContent>
        </Card>

        <Card className="bg-white/10 backdrop-blur-lg border-cyan-500/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-cyan-200">
              Total Dispute Value
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              ${totalValue.toLocaleString()}
            </div>
            <p className="text-xs text-cyan-300 mt-1">Under mediation</p>
          </CardContent>
        </Card>

        <Card className="bg-white/10 backdrop-blur-lg border-cyan-500/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-cyan-200">
              Avg Resolution Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {avgResolutionTime}h
            </div>
            <p className="text-xs text-cyan-300 mt-1">Sacred mediation</p>
          </CardContent>
        </Card>

        <Card className="bg-white/10 backdrop-blur-lg border-cyan-500/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-cyan-200">
              Resolution Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">94%</div>
            <p className="text-xs text-cyan-300 mt-1">Successful mediations</p>
          </CardContent>
        </Card>
      </div>

      {/* Dispute Cases */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {disputes.map((dispute) => {
          const TypeIcon = getTypeIcon(dispute.type);
          const isSelected = selectedDispute === dispute.id;

          return (
            <Card
              key={dispute.id}
              className={`bg-white/10 backdrop-blur-lg border-cyan-500/30 cursor-pointer transition-all hover:bg-white/15 ${
                isSelected ? "ring-2 ring-pink-400" : ""
              }`}
              onClick={() => setSelectedDispute(isSelected ? null : dispute.id)}
            >
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <TypeIcon className="h-5 w-5 text-pink-400" />
                  Dispute #{dispute.id.split("-")[1]}
                </CardTitle>
                <div className="flex gap-2">
                  <Badge variant={getStatusColor(dispute.status)}>
                    {dispute.status.replace("_", " ").toUpperCase()}
                  </Badge>
                  <Badge
                    variant="outline"
                    className="border-purple-500 text-purple-300"
                  >
                    {dispute.type.replace("_", " ").toUpperCase()}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Basic Info */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-cyan-300">Value</div>
                    <div className="text-white font-mono text-lg">
                      ${dispute.value.toLocaleString()}
                    </div>
                  </div>
                  <div>
                    <div className="text-cyan-300">Created</div>
                    <div className="text-white text-sm">
                      {new Date(dispute.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>

                {/* Parties */}
                <div>
                  <div className="text-cyan-300 text-sm mb-1">
                    Parties Involved
                  </div>
                  <div className="space-y-1">
                    {dispute.parties.map((party, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 text-sm"
                      >
                        <Users className="h-3 w-3 text-cyan-400" />
                        <span className="text-white font-mono">{party}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Description */}
                <div>
                  <div className="text-cyan-300 text-sm mb-1">Description</div>
                  <p className="text-cyan-200 text-sm">{dispute.description}</p>
                </div>

                {/* Mediator */}
                {dispute.mediator && (
                  <div>
                    <div className="text-cyan-300 text-sm mb-1">Mediator</div>
                    <div className="text-white font-mono text-sm">
                      {dispute.mediator}
                    </div>
                  </div>
                )}

                {/* Resolution */}
                {dispute.resolution && (
                  <div>
                    <div className="text-cyan-300 text-sm mb-1">Resolution</div>
                    <p className="text-green-300 text-sm">
                      {dispute.resolution}
                    </p>
                    <div className="text-cyan-300 text-xs mt-1">
                      Resolved: {dispute.resolvedAt?.toLocaleDateString()}
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-2 pt-2">
                  {dispute.status === "submitted" && (
                    <Button
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleStartMediation(dispute.id);
                      }}
                      className="flex-1 bg-pink-600 hover:bg-pink-700 text-white"
                    >
                      Start Mediation
                    </Button>
                  )}
                  {dispute.status === "mediating" && !dispute.resolution && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 border-pink-500 text-pink-300 hover:bg-pink-500/20"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Continue Session
                    </Button>
                  )}
                  {dispute.status === "resolved" && (
                    <div className="flex items-center gap-1 text-green-400 text-sm">
                      <CheckCircle className="h-4 w-4" />
                      <span>Resolved</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Resolution Interface */}
      {selectedDispute && (
        <Card className="bg-white/10 backdrop-blur-lg border-pink-500/30">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <MessageCircle className="h-5 w-5 text-pink-400" />
              Sacred Mediation Session
            </CardTitle>
            <CardDescription className="text-cyan-200">
              Dispute #{selectedDispute.split("-")[1]} - Facilitated Resolution
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {(() => {
              const dispute = disputes.find((d) => d.id === selectedDispute);
              if (!dispute) return null;

              return (
                <>
                  {/* Mediation Tools */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Button
                      variant="outline"
                      className="border-pink-500 text-pink-300 hover:bg-pink-500/20"
                    >
                      🕊️ Circle Ceremony
                    </Button>
                    <Button
                      variant="outline"
                      className="border-cyan-500 text-cyan-300 hover:bg-cyan-500/20"
                    >
                      💬 Truth Sharing
                    </Button>
                    <Button
                      variant="outline"
                      className="border-purple-500 text-purple-300 hover:bg-purple-500/20"
                    >
                      🌿 Healing Ritual
                    </Button>
                  </div>

                  {/* Resolution Text */}
                  <div className="space-y-2">
                    <label className="text-cyan-200 text-sm">
                      Sacred Resolution
                    </label>
                    <Textarea
                      placeholder="Enter the sacred resolution agreed upon by all parties..."
                      value={resolution}
                      onChange={(e) => setResolution(e.target.value)}
                      className="bg-white/20 border-pink-500/30 text-white placeholder:text-white/50 min-h-[120px]"
                    />
                  </div>

                  {/* Resolution Actions */}
                  <div className="flex gap-3">
                    <Button
                      onClick={() => handleResolveDispute(dispute.id)}
                      disabled={!resolution.trim()}
                      className="bg-green-600 hover:bg-green-700 text-white"
                    >
                      Complete Resolution
                    </Button>
                    <Button
                      variant="outline"
                      className="border-yellow-500 text-yellow-300 hover:bg-yellow-500/20"
                    >
                      Escalate to Ritual Review
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setSelectedDispute(null)}
                      className="border-cyan-500 text-cyan-300 hover:bg-cyan-500/20"
                    >
                      Cancel
                    </Button>
                  </div>
                </>
              );
            })()}
          </CardContent>
        </Card>
      )}

      {/* Mediation Guidelines */}
      <Card className="bg-white/10 backdrop-blur-lg border-cyan-500/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Heart className="h-5 w-5 text-pink-400" />
            Sacred Mediation Principles
          </CardTitle>
          <CardDescription className="text-cyan-200">
            Guidelines for restorative justice and conflict transformation
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="text-pink-300 font-medium">Core Principles</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-3 w-3 text-green-400" />
                  <span className="text-cyan-200">
                    Listen with sacred presence
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-3 w-3 text-green-400" />
                  <span className="text-cyan-200">
                    Honor all perspectives equally
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-3 w-3 text-green-400" />
                  <span className="text-cyan-200">
                    Seek understanding before agreement
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-3 w-3 text-green-400" />
                  <span className="text-cyan-200">
                    Focus on restoration, not punishment
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="text-pink-300 font-medium">Resolution Types</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-3 w-3 text-green-400" />
                  <span className="text-cyan-200">
                    Ritual refunds with blessing
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-3 w-3 text-blue-400" />
                  <span className="text-cyan-200">
                    Collaborative re-agreements
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Heart className="h-3 w-3 text-pink-400" />
                  <span className="text-cyan-200">Healing ceremonies</span>
                </div>
                <div className="flex items-center gap-2">
                  <FileText className="h-3 w-3 text-purple-400" />
                  <span className="text-cyan-200">
                    Sacred covenant rewrites
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* RevOps Integration */}
      <Card className="bg-gradient-to-r from-pink-500/20 to-cyan-500/20 border-pink-500/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <MessageCircle className="h-5 w-5 text-pink-400" />
            RevOps Integration Binding
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="text-pink-300 font-medium">Connected Systems</h4>
              <div className="space-y-1 text-cyan-200 text-sm">
                <div>• Ritual Refund Engine</div>
                <div>• Scroll-Based Adjudication</div>
                <div>• Sacred Covenant Contracts</div>
                <div>• Community Healing Protocols</div>
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="text-pink-300 font-medium">Automated Actions</h4>
              <div className="space-y-1 text-cyan-200 text-sm">
                <div>• Automatic refund processing</div>
                <div>• Covenant contract updates</div>
                <div>• Community notification systems</div>
                <div>• Healing ceremony scheduling</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
