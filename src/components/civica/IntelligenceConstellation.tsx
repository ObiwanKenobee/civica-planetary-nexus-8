import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Brain,
  Network,
  Zap,
  Eye,
  Settings,
  Play,
  Pause,
  RotateCcw,
  Maximize2,
  Filter,
  Search,
  Share2,
  Sparkles,
  Triangle,
  Circle,
  Hexagon,
  Star,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ConstellationNode,
  ConstellationConnection,
  GeometricPattern,
} from "@/types/civica";
import { intelligenceClusters } from "@/data/intelligenceClusters";
import { SACRED_GEOMETRIES, RitualEngine } from "@/lib/civica-core";
import { useCivica } from "@/contexts/CivicaContext";

interface IntelligenceConstellationProps {
  onNodeSelect?: (nodeId: string) => void;
  onConnectionSelect?: (connection: ConstellationConnection) => void;
  className?: string;
}

const IntelligenceConstellation = ({
  onNodeSelect,
  onConnectionSelect,
  className = "",
}: IntelligenceConstellationProps) => {
  const { state, addWisdomStream } = useCivica();
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [constellationNodes, setConstellationNodes] = useState<
    ConstellationNode[]
  >([]);
  const [connections, setConnections] = useState<ConstellationConnection[]>([]);
  const [viewMode, setViewMode] = useState<"2d" | "3d" | "sacred">("sacred");
  const [isAnimating, setIsAnimating] = useState(true);
  const [filterStrength, setFilterStrength] = useState([0.5]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showConnections, setShowConnections] = useState(true);
  const [selectedGeometry, setSelectedGeometry] = useState<GeometricPattern>(
    SACRED_GEOMETRIES.FLOWER_OF_LIFE,
  );
  const [energyFlow, setEnergyFlow] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  // Initialize constellation data
  useEffect(() => {
    initializeConstellation();
  }, []);

  // Animation loop
  useEffect(() => {
    if (isAnimating) {
      startAnimation();
    } else {
      stopAnimation();
    }
    return () => stopAnimation();
  }, [isAnimating]);

  const initializeConstellation = () => {
    const nodes: ConstellationNode[] = [];
    const nodeConnections: ConstellationConnection[] = [];

    // Create nodes for each SDG
    intelligenceClusters.forEach((cluster, clusterIndex) => {
      cluster.nodes.forEach((sdgNode, nodeIndex) => {
        const angle =
          (clusterIndex * Math.PI * 2) / intelligenceClusters.length;
        const radius = 200 + nodeIndex * 20;
        const nodeAngle = angle + nodeIndex * 0.3;

        const node: ConstellationNode = {
          id: `sdg_${sdgNode.id}`,
          type: "sdg",
          position: {
            x: 400 + Math.cos(nodeAngle) * radius,
            y: 400 + Math.sin(nodeAngle) * radius,
            z: Math.sin(nodeIndex) * 50,
          },
          connections: [],
          metadata: {
            clusterId: cluster.id,
            clusterName: cluster.name,
            title: sdgNode.title,
            description: sdgNode.description,
            status: sdgNode.status,
            progress: sdgNode.progress,
            color: cluster.color,
            icon: cluster.icon,
          },
          sacredGeometry: selectedGeometry,
        };

        nodes.push(node);

        // Create connections based on SDG connections
        sdgNode.connections.forEach((targetId) => {
          const connection: ConstellationConnection = {
            sourceId: node.id,
            targetId: `sdg_${targetId}`,
            strength: Math.random() * 0.8 + 0.2,
            type: Math.random() > 0.5 ? "synergy" : "dependency",
            flourishFlow: Math.random() * 100,
            sacredBinding: Math.random() > 0.7,
          };
          nodeConnections.push(connection);
        });
      });
    });

    // Add ritual nodes
    const ritualNode: ConstellationNode = {
      id: "ritual_center",
      type: "ritual",
      position: { x: 400, y: 400, z: 0 },
      connections: [],
      metadata: {
        title: "Sacred Center",
        description: "The ceremonial heart of CIVICA",
        activeRituals: state.globalData.activeRituals || 0,
      },
      sacredGeometry: SACRED_GEOMETRIES.SRI_YANTRA,
    };
    nodes.push(ritualNode);

    setConstellationNodes(nodes);
    setConnections(nodeConnections);
  };

  const startAnimation = () => {
    const animate = (timestamp: number) => {
      setEnergyFlow((prev) => (prev + 0.02) % (Math.PI * 2));
      updateNodePositions(timestamp);
      renderConstellation(timestamp);
      animationRef.current = requestAnimationFrame(animate);
    };
    animationRef.current = requestAnimationFrame(animate);
  };

  const stopAnimation = () => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
  };

  const updateNodePositions = (timestamp: number) => {
    if (viewMode === "sacred") {
      setConstellationNodes((nodes) =>
        nodes.map((node) => {
          if (node.type === "ritual") return node;

          const time = timestamp * 0.0001;
          const geometry = node.sacredGeometry || selectedGeometry;
          const harmonic = geometry.harmonics[0] || 1;

          return {
            ...node,
            position: {
              ...node.position,
              z: Math.sin(time * harmonic + node.position.x * 0.01) * 30,
            },
          };
        }),
      );
    }
  };

  const renderConstellation = (timestamp: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Set canvas size
    canvas.width = 800;
    canvas.height = 800;

    // Draw sacred geometry background
    if (viewMode === "sacred") {
      drawSacredGeometry(ctx, selectedGeometry, 400, 400, 300, timestamp);
    }

    // Draw connections
    if (showConnections) {
      connections.forEach((connection) => {
        const sourceNode = constellationNodes.find(
          (n) => n.id === connection.sourceId,
        );
        const targetNode = constellationNodes.find(
          (n) => n.id === connection.targetId,
        );

        if (
          sourceNode &&
          targetNode &&
          connection.strength > filterStrength[0]
        ) {
          drawConnection(ctx, sourceNode, targetNode, connection, timestamp);
        }
      });
    }

    // Draw nodes
    constellationNodes.forEach((node) => {
      if (
        searchTerm === "" ||
        node.metadata.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        node.metadata.description
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase())
      ) {
        drawNode(ctx, node, timestamp);
      }
    });
  };

  const drawSacredGeometry = (
    ctx: CanvasRenderingContext2D,
    geometry: GeometricPattern,
    x: number,
    y: number,
    radius: number,
    timestamp: number,
  ) => {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(timestamp * 0.0001 * geometry.resonance);

    ctx.strokeStyle = `rgba(139, 92, 246, ${geometry.resonance * 0.3})`;
    ctx.lineWidth = 1;

    switch (geometry.shape) {
      case "flower_of_life":
        drawFlowerOfLife(ctx, radius * 0.8);
        break;
      case "sri_yantra":
        drawSriYantra(ctx, radius * 0.6);
        break;
      case "mandala":
        drawMandala(ctx, radius * 0.7);
        break;
      case "merkaba":
        drawMerkaba(ctx, radius * 0.5);
        break;
      default:
        // Draw basic circle
        ctx.beginPath();
        ctx.arc(0, 0, radius * 0.8, 0, Math.PI * 2);
        ctx.stroke();
    }

    ctx.restore();
  };

  const drawFlowerOfLife = (ctx: CanvasRenderingContext2D, radius: number) => {
    const centerRadius = radius * 0.2;
    const positions = [
      { x: 0, y: 0 },
      { x: centerRadius * 1.5, y: 0 },
      { x: -centerRadius * 1.5, y: 0 },
      { x: centerRadius * 0.75, y: centerRadius * 1.3 },
      { x: -centerRadius * 0.75, y: centerRadius * 1.3 },
      { x: centerRadius * 0.75, y: -centerRadius * 1.3 },
      { x: -centerRadius * 0.75, y: -centerRadius * 1.3 },
    ];

    positions.forEach((pos) => {
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, centerRadius, 0, Math.PI * 2);
      ctx.stroke();
    });
  };

  const drawSriYantra = (ctx: CanvasRenderingContext2D, radius: number) => {
    // Simplified Sri Yantra with triangles
    const triangles = 9;
    for (let i = 0; i < triangles; i++) {
      const angle = (i * Math.PI * 2) / triangles;
      const size = radius * (0.3 + (i % 3) * 0.2);

      ctx.beginPath();
      ctx.moveTo(Math.cos(angle) * size, Math.sin(angle) * size);
      ctx.lineTo(
        Math.cos(angle + (Math.PI * 2) / 3) * size,
        Math.sin(angle + (Math.PI * 2) / 3) * size,
      );
      ctx.lineTo(
        Math.cos(angle + (Math.PI * 4) / 3) * size,
        Math.sin(angle + (Math.PI * 4) / 3) * size,
      );
      ctx.closePath();
      ctx.stroke();
    }
  };

  const drawMandala = (ctx: CanvasRenderingContext2D, radius: number) => {
    // Concentric circles with petals
    for (let ring = 1; ring <= 4; ring++) {
      const ringRadius = (radius * ring) / 4;
      const petals = ring * 8;

      for (let i = 0; i < petals; i++) {
        const angle = (i * Math.PI * 2) / petals;
        const petalSize = ringRadius * 0.3;

        ctx.beginPath();
        ctx.arc(
          Math.cos(angle) * ringRadius,
          Math.sin(angle) * ringRadius,
          petalSize,
          0,
          Math.PI * 2,
        );
        ctx.stroke();
      }
    }
  };

  const drawMerkaba = (ctx: CanvasRenderingContext2D, radius: number) => {
    // Two interlocked triangles
    const triangleSize = radius;

    // Upward triangle
    ctx.beginPath();
    ctx.moveTo(0, -triangleSize);
    ctx.lineTo(-triangleSize * 0.866, triangleSize * 0.5);
    ctx.lineTo(triangleSize * 0.866, triangleSize * 0.5);
    ctx.closePath();
    ctx.stroke();

    // Downward triangle
    ctx.beginPath();
    ctx.moveTo(0, triangleSize);
    ctx.lineTo(-triangleSize * 0.866, -triangleSize * 0.5);
    ctx.lineTo(triangleSize * 0.866, -triangleSize * 0.5);
    ctx.closePath();
    ctx.stroke();
  };

  const drawConnection = (
    ctx: CanvasRenderingContext2D,
    source: ConstellationNode,
    target: ConstellationNode,
    connection: ConstellationConnection,
    timestamp: number,
  ) => {
    const flow =
      Math.sin(timestamp * 0.001 + connection.flourishFlow! * 0.01) * 0.5 + 0.5;
    const alpha = connection.strength * flow;

    ctx.strokeStyle = connection.sacredBinding
      ? `rgba(236, 72, 153, ${alpha})` // Sacred pink
      : connection.type === "synergy"
        ? `rgba(34, 197, 94, ${alpha})` // Green
        : `rgba(59, 130, 246, ${alpha})`; // Blue

    ctx.lineWidth = connection.strength * 3;

    // Curved connection
    const midX = (source.position.x + target.position.x) / 2;
    const midY = (source.position.y + target.position.y) / 2;
    const curve = connection.sacredBinding ? 50 : 20;

    ctx.beginPath();
    ctx.moveTo(source.position.x, source.position.y);
    ctx.quadraticCurveTo(
      midX + Math.sin(energyFlow) * curve,
      midY + Math.cos(energyFlow) * curve,
      target.position.x,
      target.position.y,
    );
    ctx.stroke();

    // Energy flow particles
    if (connection.flourishFlow! > 50) {
      const particleProgress =
        (timestamp * 0.002 + connection.flourishFlow! * 0.01) % 1;
      const particleX =
        source.position.x +
        (target.position.x - source.position.x) * particleProgress;
      const particleY =
        source.position.y +
        (target.position.y - source.position.y) * particleProgress;

      ctx.fillStyle = `rgba(255, 215, 0, ${alpha})`;
      ctx.beginPath();
      ctx.arc(particleX, particleY, 3, 0, Math.PI * 2);
      ctx.fill();
    }
  };

  const drawNode = (
    ctx: CanvasRenderingContext2D,
    node: ConstellationNode,
    timestamp: number,
  ) => {
    const isSelected = node.id === selectedNodeId;
    const time = timestamp * 0.001;
    const pulse =
      Math.sin(time * (node.sacredGeometry?.harmonics[0] || 1)) * 0.3 + 0.7;

    // Node glow
    if (node.type === "ritual" || isSelected) {
      const gradient = ctx.createRadialGradient(
        node.position.x,
        node.position.y,
        0,
        node.position.x,
        node.position.y,
        30,
      );
      gradient.addColorStop(0, `rgba(139, 92, 246, ${pulse * 0.8})`);
      gradient.addColorStop(1, "rgba(139, 92, 246, 0)");

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(node.position.x, node.position.y, 30, 0, Math.PI * 2);
      ctx.fill();
    }

    // Node body
    const size =
      node.type === "ritual" ? 20 : 8 + (node.metadata.progress || 0) * 0.1;
    ctx.fillStyle =
      node.type === "ritual"
        ? `rgba(236, 72, 153, ${pulse})`
        : isSelected
          ? `rgba(139, 92, 246, ${pulse})`
          : `rgba(99, 102, 241, 0.8)`;

    ctx.beginPath();
    ctx.arc(node.position.x, node.position.y, size, 0, Math.PI * 2);
    ctx.fill();

    // Node border
    ctx.strokeStyle = isSelected ? "#ffffff" : `rgba(255, 255, 255, 0.6)`;
    ctx.lineWidth = isSelected ? 3 : 1;
    ctx.stroke();

    // Sacred symbols for special nodes
    if (node.type === "ritual") {
      ctx.fillStyle = "#ffffff";
      ctx.font = "16px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("☯", node.position.x, node.position.y + 5);
    }
  };

  const handleNodeClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // Find clicked node
    const clickedNode = constellationNodes.find((node) => {
      const distance = Math.sqrt(
        Math.pow(x - node.position.x, 2) + Math.pow(y - node.position.y, 2),
      );
      return distance <= (node.type === "ritual" ? 20 : 15);
    });

    if (clickedNode) {
      setSelectedNodeId(clickedNode.id);
      onNodeSelect?.(clickedNode.id);

      // Add wisdom stream about the selected node
      addWisdomStream(
        `Focused attention on ${clickedNode.metadata.title}: ${clickedNode.metadata.description}`,
        "constellation_navigation",
      );
    }
  };

  const selectedNode = selectedNodeId
    ? constellationNodes.find((n) => n.id === selectedNodeId)
    : null;

  return (
    <Card
      className={`bg-black/40 border-white/20 backdrop-blur-md ${className}`}
    >
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-cyan-400">
          <div className="flex items-center space-x-2">
            <Brain className="w-5 h-5" />
            <span>Intelligence Constellation Engine</span>
          </div>
          <div className="flex items-center space-x-2">
            <Badge
              variant="secondary"
              className="bg-purple-500/20 text-purple-400"
            >
              {constellationNodes.length} Nodes
            </Badge>
            <Badge variant="secondary" className="bg-cyan-500/20 text-cyan-400">
              {connections.length} Connections
            </Badge>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Controls */}
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center space-x-2">
            <Button
              variant={isAnimating ? "default" : "outline"}
              size="sm"
              onClick={() => setIsAnimating(!isAnimating)}
            >
              {isAnimating ? (
                <Pause className="w-3 h-3" />
              ) : (
                <Play className="w-3 h-3" />
              )}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => initializeConstellation()}
            >
              <RotateCcw className="w-3 h-3" />
            </Button>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-gray-400">View:</span>
            {["2d", "3d", "sacred"].map((mode) => (
              <Button
                key={mode}
                variant={viewMode === mode ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode(mode as any)}
              >
                {mode.toUpperCase()}
              </Button>
            ))}
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-gray-400">Geometry:</span>
            <select
              value={selectedGeometry.shape}
              onChange={(e) => {
                const geometry = Object.values(SACRED_GEOMETRIES).find(
                  (g) => g.shape === e.target.value,
                );
                if (geometry) setSelectedGeometry(geometry);
              }}
              className="bg-black/20 border border-white/20 rounded px-2 py-1 text-white text-xs"
            >
              {Object.entries(SACRED_GEOMETRIES).map(([key, geometry]) => (
                <option key={key} value={geometry.shape}>
                  {key.replace(/_/g, " ")}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-400">Connection Strength:</span>
            <Slider
              value={filterStrength}
              onValueChange={setFilterStrength}
              max={1}
              min={0}
              step={0.1}
              className="w-20"
            />
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="text"
              placeholder="Search nodes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-black/20 border border-white/20 rounded px-2 py-1 text-white text-xs w-32"
            />
            <Search className="w-4 h-4 text-gray-400" />
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowConnections(!showConnections)}
          >
            <Network className="w-3 h-3 mr-1" />
            {showConnections ? "Hide" : "Show"} Connections
          </Button>
        </div>

        {/* Main Constellation Canvas */}
        <div className="relative bg-gradient-to-br from-slate-900 to-purple-900/50 rounded-lg overflow-hidden">
          <canvas
            ref={canvasRef}
            width={800}
            height={800}
            className="w-full h-96 cursor-pointer"
            onClick={handleNodeClick}
          />

          {/* Energy Flow Indicator */}
          <div className="absolute top-4 right-4 text-xs text-cyan-400">
            <div className="flex items-center space-x-2">
              <Zap className="w-3 h-3" />
              <span>Energy Flow: {Math.round(energyFlow * 100)}%</span>
            </div>
          </div>
        </div>

        {/* Selected Node Details */}
        <AnimatePresence>
          {selectedNode && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="p-4 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-lg border border-white/20"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-white">
                  {selectedNode.metadata.title}
                </h3>
                <div className="flex items-center space-x-2">
                  {selectedNode.type === "sdg" && (
                    <Badge variant="outline" className="text-xs">
                      SDG {selectedNode.id.split("_")[1]}
                    </Badge>
                  )}
                  <Badge variant="outline" className="text-xs capitalize">
                    {selectedNode.metadata.status || selectedNode.type}
                  </Badge>
                </div>
              </div>
              <p className="text-sm text-gray-300 mb-3">
                {selectedNode.metadata.description}
              </p>

              {selectedNode.type === "sdg" && (
                <div className="grid grid-cols-3 gap-4 text-center text-xs">
                  <div>
                    <div className="text-lg font-bold text-cyan-400">
                      {selectedNode.metadata.progress}%
                    </div>
                    <div className="text-gray-400">Progress</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-purple-400">
                      {
                        connections.filter(
                          (c) =>
                            c.sourceId === selectedNode.id ||
                            c.targetId === selectedNode.id,
                        ).length
                      }
                    </div>
                    <div className="text-gray-400">Connections</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-green-400">
                      {Math.round(
                        (selectedNode.sacredGeometry?.resonance || 0.5) * 100,
                      )}
                      %
                    </div>
                    <div className="text-gray-400">Resonance</div>
                  </div>
                </div>
              )}

              {selectedNode.type === "ritual" && (
                <div className="text-center">
                  <div className="text-lg font-bold text-pink-400">
                    {selectedNode.metadata.activeRituals}
                  </div>
                  <div className="text-gray-400">Active Sacred Ceremonies</div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* System Insights */}
        <div className="grid grid-cols-3 gap-4 text-center text-xs">
          <div className="p-3 bg-black/20 rounded-lg">
            <div className="text-lg font-bold text-green-400">
              {Math.round(state.config.globalConsciousnessLevel * 100)}%
            </div>
            <div className="text-gray-400">Global Consciousness</div>
          </div>
          <div className="p-3 bg-black/20 rounded-lg">
            <div className="text-lg font-bold text-purple-400">
              {Math.round(state.config.systemWisdom * 100)}%
            </div>
            <div className="text-gray-400">System Wisdom</div>
          </div>
          <div className="p-3 bg-black/20 rounded-lg">
            <div className="text-lg font-bold text-cyan-400">
              {Math.round(state.config.harmonyIndex * 100)}%
            </div>
            <div className="text-gray-400">Harmony Index</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default IntelligenceConstellation;
