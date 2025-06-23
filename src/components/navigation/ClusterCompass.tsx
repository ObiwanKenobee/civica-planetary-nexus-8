import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ClusterCompassNode } from "@/types/navigation";
import { CLUSTER_COMPASS_NODES } from "@/data/navigationData";

interface ClusterCompassProps {
  selectedCluster?: number;
  onClusterSelect?: (clusterId: number) => void;
  size?: number;
  showLabels?: boolean;
  interactive?: boolean;
  energyFlow?: boolean;
  className?: string;
}

const ClusterCompass = ({
  selectedCluster,
  onClusterSelect,
  size = 200,
  showLabels = true,
  interactive = true,
  energyFlow = true,
  className = "",
}: ClusterCompassProps) => {
  const [hoveredCluster, setHoveredCluster] = useState<number | null>(null);
  const [rotationOffset, setRotationOffset] = useState(0);
  const [energyPulse, setEnergyPulse] = useState(0);
  const [constellationPhase, setConstellationPhase] = useState(0);

  // Continuous rotation for the compass
  useEffect(() => {
    if (energyFlow) {
      const interval = setInterval(() => {
        setRotationOffset((prev) => (prev + 0.2) % 360);
        setEnergyPulse((prev) => (prev + 0.05) % (Math.PI * 2));
        setConstellationPhase((prev) => (prev + 0.02) % (Math.PI * 2));
      }, 100);
      return () => clearInterval(interval);
    }
  }, [energyFlow]);

  const getNodePosition = (node: ClusterCompassNode, radius: number) => {
    const angle = (node.position.angle + rotationOffset) * (Math.PI / 180);
    return {
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius,
    };
  };

  const getActivityColor = (activity: string) => {
    switch (activity) {
      case "intense":
        return "#ef4444"; // red-500
      case "active":
        return "#22c55e"; // green-500
      case "stirring":
        return "#f59e0b"; // amber-500
      case "dormant":
        return "#6b7280"; // gray-500
      default:
        return "#8b5cf6"; // violet-500
    }
  };

  const getActivityIntensity = (activity: string) => {
    switch (activity) {
      case "intense":
        return 1.0;
      case "active":
        return 0.8;
      case "stirring":
        return 0.6;
      case "dormant":
        return 0.3;
      default:
        return 0.5;
    }
  };

  const centerRadius = size * 0.3;
  const nodeRadius = size * 0.35;

  return (
    <div
      className={`relative ${className}`}
      style={{ width: size * 2, height: size * 2 }}
    >
      {/* Central nexus */}
      <motion.div
        className="absolute flex items-center justify-center rounded-full border-2 border-white/20"
        style={{
          width: centerRadius,
          height: centerRadius,
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
        animate={{
          borderColor: selectedCluster ? "#06b6d4" : "#ffffff33",
          boxShadow: selectedCluster
            ? "0 0 20px #06b6d4, inset 0 0 20px #06b6d450"
            : "0 0 10px #ffffff20",
        }}
      >
        <motion.div
          className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-400 to-purple-400"
          animate={{
            scale: [1, 1.1, 1],
            rotate: rotationOffset,
          }}
          transition={{
            scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
            rotate: { duration: 20, repeat: Infinity, ease: "linear" },
          }}
        />
        <div className="absolute text-xs text-white font-semibold">144</div>
      </motion.div>

      {/* Energy emanation rings */}
      {energyFlow && (
        <>
          {[1, 2, 3].map((ring) => (
            <motion.div
              key={ring}
              className="absolute rounded-full border border-white/10"
              style={{
                width: centerRadius + ring * 40,
                height: centerRadius + ring * 40,
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
              }}
              animate={{
                scale: [1, 1.05, 1],
                opacity: [0.3, 0.1, 0.3],
              }}
              transition={{
                duration: 3 + ring,
                repeat: Infinity,
                ease: "easeInOut",
                delay: ring * 0.5,
              }}
            />
          ))}
        </>
      )}

      {/* Cluster nodes */}
      {CLUSTER_COMPASS_NODES.map((node) => {
        const position = getNodePosition(node, nodeRadius);
        const isSelected = selectedCluster === node.id;
        const isHovered = hoveredCluster === node.id;
        const activityColor = getActivityColor(node.activity);
        const activityIntensity = getActivityIntensity(node.activity);
        const pulseEffect = Math.sin(energyPulse + node.id) * 0.2 + 0.8;

        return (
          <motion.div
            key={node.id}
            className={`absolute cursor-pointer ${!node.canEnter ? "cursor-not-allowed" : ""}`}
            style={{
              left: "50%",
              top: "50%",
              transform: `translate(calc(-50% + ${position.x}px), calc(-50% + ${position.y}px))`,
            }}
            whileHover={interactive && node.canEnter ? { scale: 1.2 } : {}}
            onClick={() => {
              if (interactive && node.canEnter) {
                // Handle external links
                if (node.externalLink) {
                  window.location.href = node.externalLink;
                  return;
                }
                // Handle internal navigation
                if (onClusterSelect) {
                  onClusterSelect(node.id);
                }
              }
            }}
            onHoverStart={() => interactive && setHoveredCluster(node.id)}
            onHoverEnd={() => interactive && setHoveredCluster(null)}
          >
            {/* Node glow effect */}
            <motion.div
              className="absolute inset-0 rounded-full"
              animate={{
                scale: isSelected ? 1.5 : isHovered ? 1.3 : 1,
                opacity:
                  (isSelected ? 0.6 : isHovered ? 0.4 : 0.2) *
                  activityIntensity *
                  pulseEffect,
              }}
              style={{
                width: 40,
                height: 40,
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
                background: `radial-gradient(circle, ${activityColor}60 0%, transparent 70%)`,
              }}
            />

            {/* Node body */}
            <motion.div
              className="relative w-10 h-10 rounded-full border-2 flex items-center justify-center"
              style={{
                backgroundColor: `${activityColor}20`,
                borderColor: node.canEnter ? activityColor : "#6b7280",
              }}
              animate={{
                borderColor: isSelected
                  ? "#ffffff"
                  : isHovered
                    ? "#06b6d4"
                    : node.canEnter
                      ? activityColor
                      : "#6b7280",
                backgroundColor: `${activityColor}${Math.round(
                  activityIntensity * pulseEffect * 50,
                )
                  .toString(16)
                  .padStart(2, "0")}`,
              }}
            >
              <span
                className="text-lg"
                style={{ filter: `brightness(${pulseEffect})` }}
              >
                {node.glyph}
              </span>
            </motion.div>

            {/* Activity indicator */}
            <motion.div
              className="absolute -top-1 -right-1 w-3 h-3 rounded-full border border-white/40"
              style={{ backgroundColor: activityColor }}
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.8, 1, 0.8],
              }}
              transition={{
                duration: 2 / activityIntensity,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Ritual count */}
            {node.activeRituals > 0 && (
              <motion.div
                className="absolute -bottom-1 -left-1 w-4 h-4 rounded-full bg-purple-500 flex items-center justify-center text-xs text-white font-bold"
                animate={{
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                {node.activeRituals}
              </motion.div>
            )}

            {/* Node label */}
            {showLabels && (isSelected || isHovered) && (
              <motion.div
                className="absolute top-12 left-1/2 transform -translate-x-1/2 z-10"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <div className="bg-black/80 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                  {node.shortName}
                </div>
              </motion.div>
            )}
          </motion.div>
        );
      })}

      {/* Connection lines for selected cluster */}
      {selectedCluster && energyFlow && (
        <svg
          className="absolute inset-0 pointer-events-none"
          width={size * 2}
          height={size * 2}
        >
          <defs>
            <linearGradient
              id="connectionGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop
                offset="0%"
                style={{ stopColor: "#06b6d4", stopOpacity: 0.8 }}
              />
              <stop
                offset="100%"
                style={{ stopColor: "#8b5cf6", stopOpacity: 0.3 }}
              />
            </linearGradient>
          </defs>
          {CLUSTER_COMPASS_NODES.filter(
            (node) => node.id === selectedCluster,
          ).map((selectedNode) => {
            const selectedPos = getNodePosition(selectedNode, nodeRadius);
            return CLUSTER_COMPASS_NODES.filter(
              (node) => node.id !== selectedCluster && Math.random() > 0.6,
            ) // Show some connections
              .map((connectedNode) => {
                const connectedPos = getNodePosition(connectedNode, nodeRadius);
                return (
                  <motion.line
                    key={`${selectedCluster}-${connectedNode.id}`}
                    x1={size + selectedPos.x}
                    y1={size + selectedPos.y}
                    x2={size + connectedPos.x}
                    y2={size + connectedPos.y}
                    stroke="url(#connectionGradient)"
                    strokeWidth="1"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.6 }}
                    exit={{ pathLength: 0, opacity: 0 }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                  />
                );
              });
          })}
        </svg>
      )}

      {/* Cluster detail card */}
      <AnimatePresence>
        {hoveredCluster && interactive && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 z-20"
            style={{ width: Math.min(300, size * 1.5) }}
          >
            {(() => {
              const node = CLUSTER_COMPASS_NODES.find(
                (n) => n.id === hoveredCluster,
              );
              if (!node) return null;

              return (
                <Card className="bg-black/80 border-white/20 backdrop-blur-md">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-lg">{node.glyph}</span>
                      <h3 className="font-semibold text-white text-sm">
                        {node.name}
                      </h3>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-400">
                          Wisdom Level:
                        </span>
                        <div className="flex items-center space-x-2">
                          <div className="w-16 h-1 bg-gray-600 rounded">
                            <div
                              className="h-1 bg-cyan-400 rounded transition-all"
                              style={{ width: `${node.wisdomLevel * 100}%` }}
                            />
                          </div>
                          <span className="text-xs text-cyan-400">
                            {Math.round(node.wisdomLevel * 100)}%
                          </span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-400">Activity:</span>
                        <Badge
                          variant="outline"
                          className="text-xs"
                          style={{
                            borderColor: getActivityColor(node.activity),
                            color: getActivityColor(node.activity),
                          }}
                        >
                          {node.activity}
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-400">
                          Active Rituals:
                        </span>
                        <span className="text-xs text-purple-400">
                          {node.activeRituals}
                        </span>
                      </div>
                      {node.guardianMessage && (
                        <div className="text-xs italic text-yellow-400 mt-2">
                          "{node.guardianMessage}"
                        </div>
                      )}
                      {!node.canEnter && (
                        <div className="text-xs text-red-400 mt-2">
                          Entrance requires collective preparation
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })()}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ClusterCompass;
