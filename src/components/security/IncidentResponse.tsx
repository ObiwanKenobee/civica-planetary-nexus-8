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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Progress } from "../ui/progress";
import {
  Shield,
  AlertTriangle,
  CheckCircle,
  Clock,
  Users,
  Zap,
  Lock,
  XCircle,
  Play,
  Pause,
  StopCircle,
  RefreshCw,
} from "lucide-react";

interface IncidentResponsePlaybook {
  id: string;
  name: string;
  description: string;
  threatTypes: string[];
  steps: IncidentStep[];
  automation: "full" | "partial" | "manual";
  estimatedTime: number; // minutes
  successRate: number; // percentage
}

interface IncidentStep {
  id: string;
  order: number;
  title: string;
  description: string;
  action: string;
  automated: boolean;
  estimatedDuration: number; // minutes
  status: "pending" | "running" | "completed" | "failed" | "skipped";
  dependencies: string[];
  rollbackable: boolean;
}

interface ActiveIncident {
  id: string;
  threatId: string;
  playbookId: string;
  status: "initiated" | "running" | "paused" | "completed" | "failed";
  startTime: Date;
  currentStep: number;
  completedSteps: number;
  totalSteps: number;
  estimatedCompletion: Date;
  assignedAnalyst?: string;
  escalationLevel: "low" | "medium" | "high" | "critical";
}

interface IncidentResponseProps {
  className?: string;
}

export function IncidentResponse({ className }: IncidentResponseProps) {
  const [playbooks, setPlaybooks] = useState<IncidentResponsePlaybook[]>([]);
  const [activeIncidents, setActiveIncidents] = useState<ActiveIncident[]>([]);
  const [selectedPlaybook, setSelectedPlaybook] =
    useState<IncidentResponsePlaybook | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadIncidentData();
    const interval = setInterval(loadIncidentData, 30000); // Update every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const loadIncidentData = async () => {
    try {
      setLoading(true);

      // Mock playbooks (in production, fetch from backend)
      const mockPlaybooks: IncidentResponsePlaybook[] = [
        {
          id: "pb_malware",
          name: "Malware Detection Response",
          description: "Comprehensive response to malware threats",
          threatTypes: ["malware", "virus", "trojan", "ransomware"],
          automation: "full",
          estimatedTime: 15,
          successRate: 98,
          steps: [
            {
              id: "step_1",
              order: 1,
              title: "Isolate Infected Asset",
              description:
                "Immediately isolate the affected system from network",
              action: "isolate_asset",
              automated: true,
              estimatedDuration: 2,
              status: "pending",
              dependencies: [],
              rollbackable: true,
            },
            {
              id: "step_2",
              order: 2,
              title: "Quarantine Malicious Files",
              description: "Move detected malware to secure quarantine",
              action: "quarantine_files",
              automated: true,
              estimatedDuration: 3,
              status: "pending",
              dependencies: ["step_1"],
              rollbackable: true,
            },
            {
              id: "step_3",
              order: 3,
              title: "Full System Scan",
              description: "Comprehensive malware scan of affected system",
              action: "system_scan",
              automated: true,
              estimatedDuration: 8,
              status: "pending",
              dependencies: ["step_2"],
              rollbackable: false,
            },
            {
              id: "step_4",
              order: 4,
              title: "Update Security Signatures",
              description: "Update antivirus and EDR signatures",
              action: "update_signatures",
              automated: true,
              estimatedDuration: 1,
              status: "pending",
              dependencies: [],
              rollbackable: false,
            },
            {
              id: "step_5",
              order: 5,
              title: "Restore Network Access",
              description:
                "Safely restore system to network after verification",
              action: "restore_access",
              automated: false,
              estimatedDuration: 1,
              status: "pending",
              dependencies: ["step_3"],
              rollbackable: true,
            },
          ],
        },
        {
          id: "pb_brute_force",
          name: "Brute Force Attack Response",
          description: "Response to authentication brute force attacks",
          threatTypes: ["brute_force", "credential_stuffing", "password_spray"],
          automation: "partial",
          estimatedTime: 8,
          successRate: 95,
          steps: [
            {
              id: "bf_step_1",
              order: 1,
              title: "Block Source IP",
              description: "Immediately block attacking IP address",
              action: "block_ip",
              automated: true,
              estimatedDuration: 1,
              status: "pending",
              dependencies: [],
              rollbackable: true,
            },
            {
              id: "bf_step_2",
              order: 2,
              title: "Lock Target Accounts",
              description: "Temporarily lock targeted user accounts",
              action: "lock_accounts",
              automated: true,
              estimatedDuration: 2,
              status: "pending",
              dependencies: [],
              rollbackable: true,
            },
            {
              id: "bf_step_3",
              order: 3,
              title: "Notify Affected Users",
              description: "Alert users of potential account compromise",
              action: "notify_users",
              automated: false,
              estimatedDuration: 3,
              status: "pending",
              dependencies: ["bf_step_2"],
              rollbackable: false,
            },
            {
              id: "bf_step_4",
              order: 4,
              title: "Force Password Reset",
              description: "Require password reset for targeted accounts",
              action: "force_password_reset",
              automated: false,
              estimatedDuration: 2,
              status: "pending",
              dependencies: ["bf_step_3"],
              rollbackable: false,
            },
          ],
        },
        {
          id: "pb_data_exfiltration",
          name: "Data Exfiltration Response",
          description: "Response to potential data breach incidents",
          threatTypes: ["data_exfiltration", "data_theft", "insider_threat"],
          automation: "manual",
          estimatedTime: 45,
          successRate: 87,
          steps: [
            {
              id: "de_step_1",
              order: 1,
              title: "Preserve Evidence",
              description: "Secure forensic evidence of the incident",
              action: "preserve_evidence",
              automated: false,
              estimatedDuration: 10,
              status: "pending",
              dependencies: [],
              rollbackable: false,
            },
            {
              id: "de_step_2",
              order: 2,
              title: "Assess Data Exposure",
              description: "Determine what data may have been compromised",
              action: "assess_exposure",
              automated: false,
              estimatedDuration: 15,
              status: "pending",
              dependencies: ["de_step_1"],
              rollbackable: false,
            },
            {
              id: "de_step_3",
              order: 3,
              title: "Legal Notification",
              description: "Notify legal team and prepare compliance reports",
              action: "legal_notification",
              automated: false,
              estimatedDuration: 10,
              status: "pending",
              dependencies: ["de_step_2"],
              rollbackable: false,
            },
            {
              id: "de_step_4",
              order: 4,
              title: "Remediate Vulnerabilities",
              description: "Fix security gaps that enabled the breach",
              action: "remediate_vulnerabilities",
              automated: false,
              estimatedDuration: 10,
              status: "pending",
              dependencies: ["de_step_2"],
              rollbackable: false,
            },
          ],
        },
      ];

      // Mock active incidents
      const mockActiveIncidents: ActiveIncident[] = [
        {
          id: "incident_001",
          threatId: "threat_001",
          playbookId: "pb_malware",
          status: "running",
          startTime: new Date(Date.now() - 300000), // 5 minutes ago
          currentStep: 3,
          completedSteps: 2,
          totalSteps: 5,
          estimatedCompletion: new Date(Date.now() + 600000), // 10 minutes from now
          assignedAnalyst: "Sarah Chen",
          escalationLevel: "high",
        },
      ];

      setPlaybooks(mockPlaybooks);
      setActiveIncidents(mockActiveIncidents);
    } catch (error) {
      console.error("Failed to load incident response data:", error);
    } finally {
      setLoading(false);
    }
  };

  const executePlaybook = async (playbookId: string, threatId: string) => {
    try {
      const response = await fetch("/api/security/xdr?action=response", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          playbookId,
          threatId,
          action: "execute_playbook",
        }),
      });

      if (response.ok) {
        loadIncidentData(); // Reload to show new incident
      }
    } catch (error) {
      console.error("Failed to execute playbook:", error);
    }
  };

  const pauseIncident = async (incidentId: string) => {
    // Implementation for pausing incident response
    console.log("Pausing incident:", incidentId);
  };

  const resumeIncident = async (incidentId: string) => {
    // Implementation for resuming incident response
    console.log("Resuming incident:", incidentId);
  };

  const escalateIncident = async (incidentId: string) => {
    // Implementation for escalating incident
    console.log("Escalating incident:", incidentId);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "running":
        return <Play className="h-4 w-4 text-blue-500" />;
      case "paused":
        return <Pause className="h-4 w-4 text-yellow-500" />;
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "failed":
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getAutomationBadge = (automation: string) => {
    switch (automation) {
      case "full":
        return (
          <Badge className="bg-green-100 text-green-800">Fully Automated</Badge>
        );
      case "partial":
        return (
          <Badge className="bg-yellow-100 text-yellow-800">
            Semi-Automated
          </Badge>
        );
      case "manual":
        return <Badge className="bg-gray-100 text-gray-800">Manual</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  if (loading) {
    return (
      <Card className={className}>
        <CardContent className="flex items-center justify-center h-64">
          <RefreshCw className="h-8 w-8 animate-spin" />
          <span className="ml-2">Loading incident response data...</span>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="h-5 w-5" />
            <span>Incident Response Center</span>
          </CardTitle>
          <CardDescription>
            Automated and orchestrated incident response management
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="active" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="active">Active Incidents</TabsTrigger>
              <TabsTrigger value="playbooks">Response Playbooks</TabsTrigger>
              <TabsTrigger value="history">Response History</TabsTrigger>
            </TabsList>

            {/* Active Incidents Tab */}
            <TabsContent value="active" className="space-y-4">
              {activeIncidents.length === 0 ? (
                <div className="text-center py-8">
                  <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                  <p className="text-lg font-medium text-green-600">
                    No Active Incidents
                  </p>
                  <p className="text-muted-foreground">
                    All threats are contained
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {activeIncidents.map((incident) => {
                    const playbook = playbooks.find(
                      (p) => p.id === incident.playbookId,
                    );
                    const progressPercentage =
                      (incident.completedSteps / incident.totalSteps) * 100;

                    return (
                      <Card
                        key={incident.id}
                        className="border-l-4 border-l-blue-500"
                      >
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center space-x-2">
                              {getStatusIcon(incident.status)}
                              <span className="font-medium">
                                Incident {incident.id}
                              </span>
                              <Badge
                                variant={
                                  incident.escalationLevel === "critical"
                                    ? "destructive"
                                    : "secondary"
                                }
                              >
                                {incident.escalationLevel}
                              </Badge>
                            </div>
                            <div className="flex space-x-2">
                              {incident.status === "running" && (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => pauseIncident(incident.id)}
                                >
                                  <Pause className="h-4 w-4 mr-1" />
                                  Pause
                                </Button>
                              )}
                              {incident.status === "paused" && (
                                <Button
                                  size="sm"
                                  onClick={() => resumeIncident(incident.id)}
                                >
                                  <Play className="h-4 w-4 mr-1" />
                                  Resume
                                </Button>
                              )}
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => escalateIncident(incident.id)}
                              >
                                <AlertTriangle className="h-4 w-4 mr-1" />
                                Escalate
                              </Button>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                            <div>
                              <span className="text-sm text-muted-foreground">
                                Playbook:
                              </span>
                              <div className="font-medium">
                                {playbook?.name}
                              </div>
                            </div>
                            <div>
                              <span className="text-sm text-muted-foreground">
                                Assigned to:
                              </span>
                              <div className="font-medium">
                                {incident.assignedAnalyst || "Unassigned"}
                              </div>
                            </div>
                            <div>
                              <span className="text-sm text-muted-foreground">
                                Started:
                              </span>
                              <div className="font-medium">
                                {incident.startTime.toLocaleTimeString()}
                              </div>
                            </div>
                          </div>

                          <div className="mb-4">
                            <div className="flex justify-between text-sm mb-1">
                              <span>Progress</span>
                              <span>
                                {incident.completedSteps}/{incident.totalSteps}{" "}
                                steps
                              </span>
                            </div>
                            <Progress
                              value={progressPercentage}
                              className="h-2"
                            />
                          </div>

                          {playbook && (
                            <div className="space-y-2">
                              <h4 className="font-medium text-sm">
                                Response Steps
                              </h4>
                              {playbook.steps.map((step, index) => (
                                <div
                                  key={step.id}
                                  className={`flex items-center space-x-2 p-2 rounded text-sm ${
                                    index < incident.completedSteps
                                      ? "bg-green-50 text-green-700"
                                      : index === incident.currentStep - 1
                                        ? "bg-blue-50 text-blue-700"
                                        : "bg-gray-50 text-gray-600"
                                  }`}
                                >
                                  {index < incident.completedSteps ? (
                                    <CheckCircle className="h-4 w-4" />
                                  ) : index === incident.currentStep - 1 ? (
                                    <RefreshCw className="h-4 w-4 animate-spin" />
                                  ) : (
                                    <Clock className="h-4 w-4" />
                                  )}
                                  <span>{step.title}</span>
                                  {step.automated && (
                                    <Badge
                                      variant="outline"
                                      className="text-xs"
                                    >
                                      Auto
                                    </Badge>
                                  )}
                                </div>
                              ))}
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              )}
            </TabsContent>

            {/* Playbooks Tab */}
            <TabsContent value="playbooks" className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {playbooks.map((playbook) => (
                  <Card
                    key={playbook.id}
                    className={`cursor-pointer transition-colors hover:bg-muted/50 ${
                      selectedPlaybook?.id === playbook.id
                        ? "border-primary bg-muted/30"
                        : ""
                    }`}
                    onClick={() => setSelectedPlaybook(playbook)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium">{playbook.name}</h3>
                        {getAutomationBadge(playbook.automation)}
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        {playbook.description}
                      </p>

                      <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                        <div>
                          <span className="text-muted-foreground">Steps:</span>
                          <span className="ml-2 font-medium">
                            {playbook.steps.length}
                          </span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">
                            Est. Time:
                          </span>
                          <span className="ml-2 font-medium">
                            {playbook.estimatedTime}m
                          </span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">
                            Success Rate:
                          </span>
                          <span className="ml-2 font-medium text-green-600">
                            {playbook.successRate}%
                          </span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">
                            Auto Steps:
                          </span>
                          <span className="ml-2 font-medium">
                            {playbook.steps.filter((s) => s.automated).length}/
                            {playbook.steps.length}
                          </span>
                        </div>
                      </div>

                      <div className="mb-3">
                        <span className="text-sm text-muted-foreground">
                          Threat Types:
                        </span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {playbook.threatTypes.map((type, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="text-xs"
                            >
                              {type.replace(/_/g, " ")}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <Button
                        size="sm"
                        className="w-full"
                        onClick={(e) => {
                          e.stopPropagation();
                          executePlaybook(playbook.id, "manual_test");
                        }}
                      >
                        <Zap className="h-4 w-4 mr-1" />
                        Execute Playbook
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Playbook Details */}
              {selectedPlaybook && (
                <Card>
                  <CardHeader>
                    <CardTitle>{selectedPlaybook.name} - Details</CardTitle>
                    <CardDescription>
                      {selectedPlaybook.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <h4 className="font-medium">Response Steps</h4>
                      {selectedPlaybook.steps.map((step, index) => (
                        <div key={step.id} className="border rounded-lg p-3">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium">
                              Step {step.order}: {step.title}
                            </span>
                            <div className="flex space-x-2">
                              {step.automated && (
                                <Badge variant="secondary" className="text-xs">
                                  Automated
                                </Badge>
                              )}
                              {step.rollbackable && (
                                <Badge variant="outline" className="text-xs">
                                  Rollbackable
                                </Badge>
                              )}
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">
                            {step.description}
                          </p>
                          <div className="text-xs text-muted-foreground">
                            Duration: {step.estimatedDuration}m
                            {step.dependencies.length > 0 && (
                              <span className="ml-4">
                                Depends on: {step.dependencies.join(", ")}
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            {/* History Tab */}
            <TabsContent value="history" className="space-y-4">
              <div className="text-center py-8">
                <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-lg font-medium">Response History</p>
                <p className="text-muted-foreground">
                  Historical incident response data will be displayed here
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}

export default IncidentResponse;
