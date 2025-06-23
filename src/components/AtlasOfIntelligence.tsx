
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Globe, Brain, Zap, TreePine, Users, Shield, Cpu, TrendingUp, BookOpen, Sparkles, Clock, Rocket } from 'lucide-react';
import { motion } from 'framer-motion';
import { intelligenceClusters, getClusterById, type IntelligenceCluster } from '@/data/intelligenceClusters';

interface AtlasOfIntelligenceProps {
  onSelectCluster: (clusterId: number) => void;
  selectedCluster?: number;
}

const iconMap = {
  TreePine,
  Users,
  Shield,
  Cpu,
  TrendingUp,
  BookOpen,
  Sparkles,
  Clock,
  Zap,
  Brain,
  Globe,
  Rocket
};

const AtlasOfIntelligence = ({ onSelectCluster, selectedCluster }: AtlasOfIntelligenceProps) => {
  const [planetRotation, setPlanetRotation] = useState(0);
  const [activeConnections, setActiveConnections] = useState<number[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setPlanetRotation(prev => (prev + 0.3) % 360);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (selectedCluster) {
      const cluster = getClusterById(selectedCluster);
      if (cluster) {
        setActiveConnections(cluster.nodes.flatMap(node => node.connections));
      }
    } else {
      setActiveConnections([]);
    }
  }, [selectedCluster]);

  const totalProgress = Math.round(
    intelligenceClusters.reduce((sum, cluster) => sum + cluster.totalProgress, 0) / intelligenceClusters.length
  );

  const totalActiveRituals = intelligenceClusters.reduce((sum, cluster) => sum + cluster.activeRituals, 0);
  const totalAiCoPilots = intelligenceClusters.reduce((sum, cluster) => sum + cluster.aiCoPilots, 0);

  const getClusterPosition = (index: number, total: number) => {
    const angle = (index * 2 * Math.PI) / total;
    const radius = 35;
    const x = 50 + radius * Math.cos(angle);
    const y = 50 + radius * Math.sin(angle);
    return { x, y };
  };

  return (
    <Card className="bg-black/40 border-white/20 backdrop-blur-md">
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-cyan-400">
          <div className="flex items-center space-x-2">
            <Globe className="w-5 h-5" />
            <span>Atlas of Intelligence</span>
          </div>
          <div className="flex items-center space-x-4 text-sm">
            <Badge variant="secondary" className="bg-green-500/20 text-green-400">
              {totalProgress}% Global Progress
            </Badge>
            <Badge variant="secondary" className="bg-purple-500/20 text-purple-400">
              {totalActiveRituals} Active Rituals
            </Badge>
            <Badge variant="secondary" className="bg-blue-500/20 text-blue-400">
              {totalAiCoPilots} AI Co-Pilots
            </Badge>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative h-96 bg-gradient-to-br from-blue-900/50 to-purple-900/50 rounded-lg overflow-hidden">
          {/* Central Planetary Core */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className="relative w-32 h-32 rounded-full bg-gradient-to-br from-cyan-500/30 to-purple-500/30 border-2 border-cyan-400/50 flex items-center justify-center"
              animate={{ rotate: planetRotation }}
              transition={{ ease: "linear" }}
            >
              <div className="text-center">
                <div className="text-xl font-bold text-cyan-400">144</div>
                <div className="text-xs text-white">SDGs</div>
              </div>
            </motion.div>
          </div>

          {/* Intelligence Cluster Nodes */}
          {intelligenceClusters.map((cluster, index) => {
            const position = getClusterPosition(index, intelligenceClusters.length);
            const IconComponent = iconMap[cluster.icon as keyof typeof iconMap] || Globe;
            const isSelected = selectedCluster === cluster.id;
            const isConnected = activeConnections.includes(cluster.id);

            return (
              <motion.div
                key={cluster.id}
                className={`absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2`}
                style={{
                  left: `${position.x}%`,
                  top: `${position.y}%`
                }}
                whileHover={{ scale: 1.2 }}
                animate={{
                  scale: isSelected ? 1.3 : isConnected ? 1.1 : 1,
                  opacity: selectedCluster && !isSelected && !isConnected ? 0.5 : 1
                }}
                onClick={() => onSelectCluster(cluster.id)}
              >
                <div
                  className={`w-16 h-16 rounded-full border-2 flex items-center justify-center ${
                    isSelected
                      ? `bg-gradient-to-br ${cluster.color} border-white`
                      : isConnected
                      ? `bg-gradient-to-br ${cluster.color} border-yellow-400`
                      : 'bg-black/50 border-white/40 hover:border-white/80'
                  } backdrop-blur-sm transition-all duration-300`}
                >
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
                
                {/* Cluster Label */}
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-center">
                  <div className="text-xs font-semibold text-white whitespace-nowrap">
                    {cluster.name.split(' & ')[0]}
                  </div>
                  <div className="text-xs text-gray-400">
                    {cluster.totalProgress}%
                  </div>
                </div>

                {/* Connection Lines */}
                {isSelected && (
                  <svg className="absolute inset-0 w-full h-full pointer-events-none">
                    {cluster.nodes.flatMap(node => 
                      node.connections.map(connId => {
                        const connectedCluster = intelligenceClusters.find(c => 
                          c.nodes.some(n => n.id === connId)
                        );
                        if (!connectedCluster) return null;
                        
                        const connIndex = intelligenceClusters.findIndex(c => c.id === connectedCluster.id);
                        const connPosition = getClusterPosition(connIndex, intelligenceClusters.length);
                        
                        return (
                          <motion.line
                            key={`${cluster.id}-${connId}`}
                            x1="50%"
                            y1="50%"
                            x2={`${connPosition.x}%`}
                            y2={`${connPosition.y}%`}
                            stroke="url(#connectionGradient)"
                            strokeWidth="2"
                            strokeOpacity="0.6"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 1 }}
                          />
                        );
                      })
                    )}
                    <defs>
                      <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style={{stopColor:'#06b6d4', stopOpacity:0.8}} />
                        <stop offset="100%" style={{stopColor:'#8b5cf6', stopOpacity:0.8}} />
                      </linearGradient>
                    </defs>
                  </svg>
                )}
              </motion.div>
            );
          })}

          {/* Legend */}
          <div className="absolute bottom-4 left-4 space-y-2 text-xs">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-cyan-400"></div>
              <span className="text-white">Active Cluster</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
              <span className="text-white">Connected</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-white/40"></div>
              <span className="text-white">Available</span>
            </div>
          </div>

          {/* Real-time Statistics */}
          <div className="absolute top-4 right-4 space-y-2 text-right">
            <div className="text-sm text-cyan-400">
              Live Planetary Intelligence
            </div>
            <div className="text-xs text-green-400">
              🟢 {intelligenceClusters.filter(c => c.totalProgress > 70).length} High Performance
            </div>
            <div className="text-xs text-yellow-400">
              🟡 {intelligenceClusters.filter(c => c.totalProgress >= 50 && c.totalProgress <= 70).length} Developing
            </div>
            <div className="text-xs text-orange-400">
              🟠 {intelligenceClusters.filter(c => c.totalProgress < 50).length} Emerging
            </div>
          </div>
        </div>

        {/* Selected Cluster Details */}
        {selectedCluster && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 p-4 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-lg border border-white/20"
          >
            {(() => {
              const cluster = getClusterById(selectedCluster);
              if (!cluster) return null;
              
              return (
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-lg text-white">{cluster.name}</h3>
                    <div className="flex items-center space-x-2">
                      <Progress value={cluster.totalProgress} className="w-20 h-2" />
                      <span className="text-sm text-white">{cluster.totalProgress}%</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-300 mb-3">{cluster.description}</p>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-lg font-bold text-cyan-400">{cluster.nodes.length}</div>
                      <div className="text-xs text-gray-400">SDG Nodes</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-purple-400">{cluster.activeRituals}</div>
                      <div className="text-xs text-gray-400">Active Rituals</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-green-400">{cluster.aiCoPilots}</div>
                      <div className="text-xs text-gray-400">AI Co-Pilots</div>
                    </div>
                  </div>
                </div>
              );
            })()}
          </motion.div>
        )}

        <div className="mt-4 flex justify-center">
          <Button 
            onClick={() => onSelectCluster(0)}
            variant="outline" 
            className="border-cyan-400 text-cyan-400 hover:bg-cyan-400/20"
          >
            <Globe className="w-4 h-4 mr-2" />
            Explore Full Network
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AtlasOfIntelligence;
