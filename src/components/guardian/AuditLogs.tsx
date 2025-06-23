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
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  FileText,
  Search,
  Filter,
  Download,
  CheckCircle,
  XCircle,
  Clock,
  Shield,
  RefreshCw,
} from "lucide-react";
import { AuditEntry } from "../../types/guardian";
import { mockAuditEntries } from "../../data/guardianData";

export function AuditLogs() {
  const [auditEntries, setAuditEntries] =
    useState<AuditEntry[]>(mockAuditEntries);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterCurrency, setFilterCurrency] = useState("all");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsRefreshing(false);
  };

  const handleExport = () => {
    // Mock export functionality
    const data = filteredEntries.map((entry) => ({
      timestamp: entry.timestamp.toISOString(),
      action: entry.action,
      actor: entry.actor,
      target: entry.target,
      value: entry.value,
      currency: entry.currency,
      consent: entry.consent,
      signature: entry.signature,
    }));

    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `audit-log-${new Date().toISOString().split("T")[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const filteredEntries = auditEntries.filter((entry) => {
    const matchesSearch =
      searchTerm === "" ||
      entry.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.actor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.target.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType =
      filterType === "all" || entry.action.includes(filterType);
    const matchesCurrency =
      filterCurrency === "all" || entry.currency === filterCurrency;

    return matchesSearch && matchesType && matchesCurrency;
  });

  const totalValue = auditEntries.reduce(
    (sum, entry) => sum + (entry.value || 0),
    0,
  );
  const consentedActions = auditEntries.filter((entry) => entry.consent).length;
  const consentRate = Math.round(
    (consentedActions / auditEntries.length) * 100,
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white flex items-center gap-3">
            🧾 Audit & Consent Logs
            <FileText className="h-8 w-8 text-purple-400" />
          </h2>
          <p className="text-cyan-200 mt-2">
            Tracks all economic and governance actions with consent verification
          </p>
        </div>
        <div className="flex gap-3">
          <Button
            onClick={handleExport}
            variant="outline"
            className="border-purple-500 text-purple-300 hover:bg-purple-500/20"
          >
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
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
      </div>

      {/* Summary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-white/10 backdrop-blur-lg border-cyan-500/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-cyan-200">
              Total Entries
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {auditEntries.length}
            </div>
            <p className="text-xs text-cyan-300 mt-1">Recorded actions</p>
          </CardContent>
        </Card>

        <Card className="bg-white/10 backdrop-blur-lg border-cyan-500/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-cyan-200">
              Consent Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{consentRate}%</div>
            <p className="text-xs text-cyan-300 mt-1">Actions with consent</p>
            <div className="flex items-center gap-1 mt-1">
              <CheckCircle className="h-3 w-3 text-green-400" />
              <span className="text-green-400 text-xs">PCI DSS Compliant</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/10 backdrop-blur-lg border-cyan-500/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-cyan-200">
              Total Value
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              ${totalValue.toLocaleString()}
            </div>
            <p className="text-xs text-cyan-300 mt-1">Tracked transactions</p>
          </CardContent>
        </Card>

        <Card className="bg-white/10 backdrop-blur-lg border-cyan-500/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-cyan-200">
              Security Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">🔒</div>
            <p className="text-xs text-cyan-300 mt-1">AES-256-GCM</p>
            <div className="flex items-center gap-1 mt-1">
              <Shield className="h-3 w-3 text-green-400" />
              <span className="text-green-400 text-xs">Encrypted</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="bg-white/10 backdrop-blur-lg border-cyan-500/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Filter className="h-5 w-5 text-purple-400" />
            Filter & Search
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-cyan-200 text-sm">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-cyan-400" />
                <Input
                  placeholder="Search actions, actors, targets..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-white/20 border-cyan-500/30 text-white placeholder:text-white/50"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-cyan-200 text-sm">Action Type</label>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="bg-white/20 border-cyan-500/30 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Actions</SelectItem>
                  <SelectItem value="purchase">Purchases</SelectItem>
                  <SelectItem value="distribution">Distributions</SelectItem>
                  <SelectItem value="booking">Bookings</SelectItem>
                  <SelectItem value="refund">Refunds</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-cyan-200 text-sm">Currency</label>
              <Select value={filterCurrency} onValueChange={setFilterCurrency}>
                <SelectTrigger className="bg-white/20 border-cyan-500/30 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Currencies</SelectItem>
                  <SelectItem value="fiat">Fiat</SelectItem>
                  <SelectItem value="flourish">Flourish</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Audit Entries */}
      <Card className="bg-white/10 backdrop-blur-lg border-cyan-500/30">
        <CardHeader>
          <CardTitle className="text-white">Audit Trail</CardTitle>
          <CardDescription className="text-cyan-200">
            Showing {filteredEntries.length} of {auditEntries.length} entries
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredEntries.map((entry) => (
              <div
                key={entry.id}
                className="flex items-start justify-between p-4 border border-cyan-500/20 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
              >
                <div className="flex-1 space-y-2">
                  {/* Header */}
                  <div className="flex items-center gap-3">
                    <Badge variant={entry.consent ? "default" : "destructive"}>
                      {entry.consent ? (
                        <CheckCircle className="h-3 w-3 mr-1" />
                      ) : (
                        <XCircle className="h-3 w-3 mr-1" />
                      )}
                      {entry.consent ? "Consented" : "No Consent"}
                    </Badge>
                    <Badge
                      variant="outline"
                      className="border-purple-500 text-purple-300"
                    >
                      {entry.action.replace("_", " ").toUpperCase()}
                    </Badge>
                    <Badge
                      variant="outline"
                      className="border-cyan-500 text-cyan-300"
                    >
                      {entry.currency.toUpperCase()}
                    </Badge>
                    <div className="flex items-center gap-1 text-cyan-300 text-sm">
                      <Clock className="h-3 w-3" />
                      {new Date(entry.timestamp).toLocaleString()}
                    </div>
                  </div>

                  {/* Details */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-cyan-300">Actor:</span>
                      <div className="text-white font-mono">{entry.actor}</div>
                    </div>
                    <div>
                      <span className="text-cyan-300">Target:</span>
                      <div className="text-white font-mono">{entry.target}</div>
                    </div>
                    <div>
                      <span className="text-cyan-300">Value:</span>
                      <div className="text-white font-mono">
                        {entry.value
                          ? `${entry.currency === "fiat" ? "$" : "🌸"} ${entry.value.toLocaleString()}`
                          : "N/A"}
                      </div>
                    </div>
                  </div>

                  {/* Metadata */}
                  {entry.metadata && Object.keys(entry.metadata).length > 0 && (
                    <div className="space-y-1">
                      <span className="text-cyan-300 text-sm">Metadata:</span>
                      <div className="text-xs text-cyan-200 bg-white/5 p-2 rounded border border-cyan-500/20">
                        {Object.entries(entry.metadata).map(([key, value]) => (
                          <div key={key} className="flex justify-between">
                            <span className="text-cyan-400">{key}:</span>
                            <span className="text-white">{String(value)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Signature */}
                  <div className="text-xs">
                    <span className="text-cyan-300">Signature:</span>
                    <span className="text-white font-mono ml-2">
                      {entry.signature}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 ml-4">
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-cyan-500 text-cyan-300 hover:bg-cyan-500/20"
                  >
                    Details
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-purple-500 text-purple-300 hover:bg-purple-500/20"
                  >
                    Verify
                  </Button>
                </div>
              </div>
            ))}

            {filteredEntries.length === 0 && (
              <div className="text-center py-8 text-cyan-300">
                <FileText className="h-12 w-12 mx-auto mb-3 text-purple-400" />
                <p className="text-lg font-medium">No audit entries found</p>
                <p className="text-sm">Try adjusting your search filters</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* RevOps Integration */}
      <Card className="bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border-purple-500/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Shield className="h-5 w-5 text-purple-400" />
            RevOps Integration Binding
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="text-purple-300 font-medium">Connected Systems</h4>
              <div className="space-y-1 text-cyan-200 text-sm">
                <div>• Consentful Billing Log</div>
                <div>• Sacred Transaction Archive</div>
                <div>• IPFS + Ceramic Storage</div>
                <div>• Markdown Scroll Backups</div>
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="text-purple-300 font-medium">Security Features</h4>
              <div className="space-y-1 text-cyan-200 text-sm">
                <div>• AES-256-GCM encryption</div>
                <div>• Immutable audit trails</div>
                <div>• Consent verification</div>
                <div>• PCI DSS compliance</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
