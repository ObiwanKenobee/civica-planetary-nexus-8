
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Brain, Zap, Users, TreePine, Globe, MessageCircle, TrendingUp, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

interface SDGIntelligenceProps {
  sdgId: number;
  title: string;
  color: string;
}

const SDGIntelligence = ({ sdgId, title, color }: SDGIntelligenceProps) => {
  const [activeSimulation, setActiveSimulation] = useState('current');

  const aiInsights = [
    {
      type: "Pattern Recognition",
      insight: "Detected 73% correlation between community rituals and wellbeing metrics",
      confidence: 89
    },
    {
      type: "Prediction",
      insight: "Ubuntu governance model shows 94% success rate in similar contexts",
      confidence: 76
    },
    {
      type: "Recommendation",
      insight: "Integrate indigenous wisdom protocols for 34% efficiency gain",
      confidence: 82
    }
  ];

  const connections = [
    { name: "Ecological Symbiosis", strength: 94, type: "synergy" },
    { name: "Quantum Governance", strength: 78, type: "dependency" },
    { name: "Cosmic Economics", strength: 67, type: "influence" }
  ];

  return (
    <div className="space-y-6">
      <Card className={`bg-gradient-to-br ${color} border-white/40 backdrop-blur-md`}>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>{title}</span>
            <Badge variant="secondary" className="bg-white/20">
              SDG {sdgId}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4 mb-4">
            <div className="text-center">
              <div className="text-2xl font-bold">87%</div>
              <div className="text-sm opacity-80">Global Progress</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">144</div>
              <div className="text-sm opacity-80">Active Nodes</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">12</div>
              <div className="text-sm opacity-80">AI Co-Pilots</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="intelligence" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4 bg-black/40 border border-white/20">
          <TabsTrigger value="intelligence" className="data-[state=active]:bg-purple-500/50">
            <Brain className="w-4 h-4 mr-2" />
            Intelligence
          </TabsTrigger>
          <TabsTrigger value="simulation" className="data-[state=active]:bg-blue-500/50">
            <TrendingUp className="w-4 h-4 mr-2" />
            Simulation
          </TabsTrigger>
          <TabsTrigger value="governance" className="data-[state=active]:bg-green-500/50">
            <Users className="w-4 h-4 mr-2" />
            Governance
          </TabsTrigger>
          <TabsTrigger value="connections" className="data-[state=active]:bg-orange-500/50">
            <Globe className="w-4 h-4 mr-2" />
            Connections
          </TabsTrigger>
        </TabsList>

        <TabsContent value="intelligence" className="space-y-4">
          <Card className="bg-black/40 border-white/20 backdrop-blur-md">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-purple-400">
                <Brain className="w-5 h-5" />
                <span>AI Co-Pilot Insights</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {aiInsights.map((insight, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-3 bg-purple-500/10 rounded-lg border border-purple-500/20"
                >
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline" className="text-purple-400 border-purple-400">
                      {insight.type}
                    </Badge>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm">Confidence:</span>
                      <Progress value={insight.confidence} className="w-16 h-2" />
                      <span className="text-sm">{insight.confidence}%</span>
                    </div>
                  </div>
                  <p className="text-sm">{insight.insight}</p>
                </motion.div>
              ))}
              
              <Button className="w-full bg-purple-500 hover:bg-purple-600">
                <MessageCircle className="w-4 h-4 mr-2" />
                Chat with SDG Co-Pilot
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="simulation" className="space-y-4">
          <Card className="bg-black/40 border-white/20 backdrop-blur-md">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-blue-400">
                <TrendingUp className="w-5 h-5" />
                <span>Futures Simulator</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-2">
                  {['current', 'optimistic', 'regenerative'].map((scenario) => (
                    <Button
                      key={scenario}
                      variant={activeSimulation === scenario ? "default" : "outline"}
                      onClick={() => setActiveSimulation(scenario)}
                      className="text-xs"
                    >
                      {scenario.charAt(0).toUpperCase() + scenario.slice(1)}
                    </Button>
                  ))}
                </div>
                
                <div className="h-32 bg-gradient-to-r from-blue-500/20 to-green-500/20 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-400">2035</div>
                    <div className="text-sm">Simulation Timeline</div>
                    <div className="text-xs text-green-400 mt-2">
                      {activeSimulation === 'regenerative' && "Planet healing accelerated by 340%"}
                      {activeSimulation === 'optimistic' && "SDG targets achieved 5 years early"}
                      {activeSimulation === 'current' && "Steady progress maintaining trajectory"}
                    </div>
                  </div>
                </div>
                
                <Button className="w-full bg-blue-500 hover:bg-blue-600">
                  <Zap className="w-4 h-4 mr-2" />
                  Run Deep Simulation
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="governance" className="space-y-4">
          <Card className="bg-black/40 border-white/20 backdrop-blur-md">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-green-400">
                <Users className="w-5 h-5" />
                <span>Polycentric Governance</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-green-500/10 rounded-lg">
                  <div>
                    <div className="font-semibold">Sacred Waters Protection</div>
                    <div className="text-sm text-gray-400">Active Proposal • Ubuntu Council</div>
                  </div>
                  <Badge className="bg-green-500">Consensus</Badge>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-yellow-500/10 rounded-lg">
                  <div>
                    <div className="font-semibold">AI Ethics Amendment</div>
                    <div className="text-sm text-gray-400">Under Review • Dharma Assembly</div>
                  </div>
                  <Badge className="bg-yellow-500">Deliberating</Badge>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-purple-500/10 rounded-lg">
                  <div>
                    <div className="font-semibold">Wisdom Currency Protocol</div>
                    <div className="text-sm text-gray-400">Ritual Phase • Sophia Circle</div>
                  </div>
                  <Badge className="bg-purple-500">Ceremony</Badge>
                </div>
              </div>
              
              <Button className="w-full bg-green-500 hover:bg-green-600">
                <Shield className="w-4 h-4 mr-2" />
                Join Governance Council
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="connections" className="space-y-4">
          <Card className="bg-black/40 border-white/20 backdrop-blur-md">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-orange-400">
                <Globe className="w-5 h-5" />
                <span>SDG Interconnections</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {connections.map((connection, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">{connection.name}</span>
                    <div className="flex items-center space-x-2">
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${
                          connection.type === 'synergy' ? 'border-green-400 text-green-400' :
                          connection.type === 'dependency' ? 'border-blue-400 text-blue-400' :
                          'border-orange-400 text-orange-400'
                        }`}
                      >
                        {connection.type}
                      </Badge>
                      <span className="text-sm">{connection.strength}%</span>
                    </div>
                  </div>
                  <Progress value={connection.strength} className="h-2" />
                </div>
              ))}
              
              <Button className="w-full bg-orange-500 hover:bg-orange-600">
                <Globe className="w-4 h-4 mr-2" />
                Explore Full Network
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SDGIntelligence;
