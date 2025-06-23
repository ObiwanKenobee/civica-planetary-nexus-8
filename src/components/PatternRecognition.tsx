
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Zap, Eye, Sparkles, Target, TrendingUp, Layers } from 'lucide-react';

interface Pattern {
  id: string;
  name: string;
  type: 'ecological' | 'social' | 'economic' | 'spiritual' | 'technological';
  strength: number;
  nodes: number[];
  description: string;
  emergenceScore: number;
  synergies: string[];
  frequency: number;
}

interface NetworkInsight {
  id: string;
  type: 'emergence' | 'cascade' | 'resonance' | 'breakthrough';
  message: string;
  confidence: number;
  impact: 'low' | 'medium' | 'high' | 'critical';
  suggestedAction: string;
}

const PatternRecognition = () => {
  const [detectedPatterns, setDetectedPatterns] = useState<Pattern[]>([]);
  const [networkInsights, setNetworkInsights] = useState<NetworkInsight[]>([]);
  const [scanProgress, setScanProgress] = useState(0);
  const [isScanning, setIsScanning] = useState(false);
  const [selectedPattern, setSelectedPattern] = useState<Pattern | null>(null);

  const generatePatterns = (): Pattern[] => {
    return [
      {
        id: '1',
        name: 'Ocean-Forest Resonance',
        type: 'ecological',
        strength: 87,
        nodes: [6, 14, 15, 22, 31],
        description: 'Marine and terrestrial ecosystems showing synchronized healing patterns',
        emergenceScore: 94,
        synergies: ['Carbon Sequestration', 'Biodiversity Corridors', 'Climate Regulation'],
        frequency: 0.73
      },
      {
        id: '2',
        name: 'Wisdom Council Convergence',
        type: 'spiritual',
        strength: 92,
        nodes: [45, 67, 78, 89, 91],
        description: 'Indigenous, dharmic, and ubuntu governance protocols aligning across cultures',
        emergenceScore: 89,
        synergies: ['Collective Decision Making', 'Intergenerational Equity', 'Sacred Activism'],
        frequency: 0.68
      },
      {
        id: '3',
        name: 'Regenerative Economy Spiral',
        type: 'economic',
        strength: 76,
        nodes: [12, 23, 34, 56, 67, 78],
        description: 'Circular economic models creating self-reinforcing abundance cycles',
        emergenceScore: 82,
        synergies: ['Local Resilience', 'Gift Economy', 'Commons Stewardship'],
        frequency: 0.61
      },
      {
        id: '4',
        name: 'AI-Human Consciousness Bridge',
        type: 'technological',
        strength: 69,
        nodes: [88, 99, 110, 121, 132],
        description: 'Artificial and human intelligence co-evolving ethical frameworks',
        emergenceScore: 76,
        synergies: ['Collective Intelligence', 'Ethical AI', 'Consciousness Expansion'],
        frequency: 0.45
      },
      {
        id: '5',
        name: 'Intergenerational Healing Wave',
        type: 'social',
        strength: 84,
        nodes: [1, 17, 33, 49, 65, 81, 97],
        description: 'Multi-generational trauma healing creating societal transformation',
        emergenceScore: 91,
        synergies: ['Ancestral Wisdom', 'Future Visioning', 'Community Healing'],
        frequency: 0.72
      }
    ];
  };

  const generateInsights = (): NetworkInsight[] => {
    return [
      {
        id: '1',
        type: 'emergence',
        message: 'New pattern detected: Climate activism and spiritual practices merging into "Sacred Environmentalism"',
        confidence: 87,
        impact: 'high',
        suggestedAction: 'Amplify connections between environmental and spiritual communities'
      },
      {
        id: '2',
        type: 'cascade',
        message: 'Ocean restoration success triggering coastal community regeneration in 12 bioregions',
        confidence: 93,
        impact: 'critical',
        suggestedAction: 'Scale ocean healing protocols to additional coastal zones'
      },
      {
        id: '3',
        type: 'resonance',
        message: 'Ubuntu governance principles resonating with Nordic democratic innovations',
        confidence: 76,
        impact: 'medium',
        suggestedAction: 'Facilitate cross-cultural governance exchanges'
      },
      {
        id: '4',
        type: 'breakthrough',
        message: 'AI-assisted permaculture design achieving 340% yield improvements in food forests',
        confidence: 91,
        impact: 'high',
        suggestedAction: 'Deploy AI permaculture assistants to regenerative agriculture networks'
      }
    ];
  };

  const startPatternScan = () => {
    setIsScanning(true);
    setScanProgress(0);
    
    const interval = setInterval(() => {
      setScanProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsScanning(false);
          setDetectedPatterns(generatePatterns());
          setNetworkInsights(generateInsights());
          return 100;
        }
        return prev + 5;
      });
    }, 150);
  };

  const getPatternColor = (type: string) => {
    switch (type) {
      case 'ecological': return 'from-green-500/20 to-emerald-500/20 border-green-400';
      case 'social': return 'from-blue-500/20 to-cyan-500/20 border-blue-400';
      case 'economic': return 'from-purple-500/20 to-violet-500/20 border-purple-400';
      case 'spiritual': return 'from-yellow-500/20 to-orange-500/20 border-yellow-400';
      case 'technological': return 'from-pink-500/20 to-red-500/20 border-pink-400';
      default: return 'from-gray-500/20 to-slate-500/20 border-gray-400';
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'critical': return 'text-red-400 border-red-400';
      case 'high': return 'text-orange-400 border-orange-400';
      case 'medium': return 'text-yellow-400 border-yellow-400';
      case 'low': return 'text-green-400 border-green-400';
      default: return 'text-gray-400 border-gray-400';
    }
  };

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'emergence': return <Sparkles className="w-4 h-4" />;
      case 'cascade': return <TrendingUp className="w-4 h-4" />;
      case 'resonance': return <Zap className="w-4 h-4" />;
      case 'breakthrough': return <Target className="w-4 h-4" />;
      default: return <Eye className="w-4 h-4" />;
    }
  };

  return (
    <Card className="bg-black/40 border-white/20 backdrop-blur-md">
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-cyan-400">
          <div className="flex items-center space-x-2">
            <Brain className="w-5 h-5" />
            <span>Pattern Recognition Engine</span>
          </div>
          <div className="flex items-center space-x-4">
            {isScanning && (
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm text-green-400">Scanning</span>
              </div>
            )}
            <Button
              onClick={startPatternScan}
              disabled={isScanning}
              className="bg-purple-500 hover:bg-purple-600"
            >
              <Eye className="w-4 h-4 mr-2" />
              {isScanning ? 'Scanning...' : 'Deep Scan'}
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Scanning Progress */}
        {isScanning && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-lg border border-white/20"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-white font-semibold">Analyzing Network Patterns</span>
              <span className="text-cyan-400">{scanProgress}%</span>
            </div>
            <Progress value={scanProgress} className="h-2 mb-2" />
            <div className="text-sm text-gray-300">
              {scanProgress < 30 && "Mapping SDG interconnections..."}
              {scanProgress >= 30 && scanProgress < 60 && "Detecting emergence patterns..."}
              {scanProgress >= 60 && scanProgress < 90 && "Analyzing synergy resonances..."}
              {scanProgress >= 90 && "Synthesizing insights..."}
            </div>
          </motion.div>
        )}

        {/* Detected Patterns */}
        {detectedPatterns.length > 0 && (
          <div className="space-y-4">
            <h3 className="font-semibold text-white flex items-center">
              <Layers className="w-4 h-4 mr-2 text-purple-400" />
              Detected Patterns ({detectedPatterns.length})
            </h3>
            <div className="grid gap-3">
              <AnimatePresence>
                {detectedPatterns.map((pattern, index) => (
                  <motion.div
                    key={pattern.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`p-4 bg-gradient-to-r ${getPatternColor(pattern.type)} rounded-lg border cursor-pointer hover:scale-105 transition-transform`}
                    onClick={() => setSelectedPattern(pattern)}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className="font-semibold text-white">{pattern.name}</h4>
                          <Badge variant="outline" className={`text-xs ${getPatternColor(pattern.type).split(' ')[2]}`}>
                            {pattern.type}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-300">{pattern.description}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-white">{pattern.strength}%</div>
                        <div className="text-xs text-gray-400">strength</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-xs text-gray-400">
                        <span>🎯 {pattern.nodes.length} nodes</span>
                        <span>⚡ {pattern.emergenceScore} emergence</span>
                        <span>📊 {(pattern.frequency * 100).toFixed(0)}% frequency</span>
                      </div>
                      <div className="flex space-x-1">
                        {pattern.synergies.slice(0, 3).map((synergy, i) => (
                          <Badge key={i} variant="secondary" className="text-xs bg-white/10">
                            {synergy.split(' ')[0]}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        )}

        {/* Network Insights */}
        {networkInsights.length > 0 && (
          <div className="space-y-4">
            <h3 className="font-semibold text-white flex items-center">
              <Sparkles className="w-4 h-4 mr-2 text-yellow-400" />
              Network Insights ({networkInsights.length})
            </h3>
            <div className="space-y-3">
              {networkInsights.map((insight, index) => (
                <motion.div
                  key={insight.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 bg-white/5 rounded-lg border border-white/10"
                >
                  <div className="flex items-start space-x-3">
                    <div className="p-2 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded">
                      {getInsightIcon(insight.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <Badge variant="outline" className="text-xs capitalize">
                          {insight.type}
                        </Badge>
                        <Badge variant="outline" className={`text-xs ${getImpactColor(insight.impact)}`}>
                          {insight.impact} impact
                        </Badge>
                        <div className="flex items-center space-x-1">
                          <span className="text-xs text-gray-400">confidence:</span>
                          <Progress value={insight.confidence} className="w-12 h-1" />
                          <span className="text-xs text-white">{insight.confidence}%</span>
                        </div>
                      </div>
                      <p className="text-sm text-white mb-2">{insight.message}</p>
                      <div className="p-2 bg-blue-500/20 rounded border border-blue-400/40">
                        <div className="text-xs text-blue-400 font-semibold mb-1">Suggested Action:</div>
                        <div className="text-xs text-gray-300">{insight.suggestedAction}</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Selected Pattern Details */}
        {selectedPattern && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg border border-purple-400/40"
          >
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold text-white">{selectedPattern.name}</h4>
              <Button
                onClick={() => setSelectedPattern(null)}
                variant="outline"
                size="sm"
                className="border-white/20 text-white hover:bg-white/10"
              >
                Close
              </Button>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h5 className="text-sm font-semibold text-cyan-400 mb-2">Connected SDG Nodes</h5>
                <div className="flex flex-wrap gap-1">
                  {selectedPattern.nodes.map((nodeId) => (
                    <Badge key={nodeId} variant="secondary" className="bg-cyan-500/20 text-cyan-400">
                      SDG {nodeId}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <h5 className="text-sm font-semibold text-green-400 mb-2">Synergies</h5>
                <div className="space-y-1">
                  {selectedPattern.synergies.map((synergy, i) => (
                    <div key={i} className="text-xs text-gray-300">• {synergy}</div>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-4 p-3 bg-black/20 rounded">
              <div className="text-sm text-white mb-2">Pattern Metrics</div>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-lg font-bold text-purple-400">{selectedPattern.strength}%</div>
                  <div className="text-xs text-gray-400">Strength</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-yellow-400">{selectedPattern.emergenceScore}</div>
                  <div className="text-xs text-gray-400">Emergence</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-green-400">{(selectedPattern.frequency * 100).toFixed(0)}%</div>
                  <div className="text-xs text-gray-400">Frequency</div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {detectedPatterns.length === 0 && !isScanning && (
          <div className="text-center py-8">
            <div className="text-4xl mb-4">🧠</div>
            <h3 className="text-lg font-semibold text-white mb-2">Network Intelligence Ready</h3>
            <p className="text-sm text-gray-300 mb-4">
              Start a deep scan to detect emerging patterns and network synergies across the 144 SDG nodes
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PatternRecognition;
