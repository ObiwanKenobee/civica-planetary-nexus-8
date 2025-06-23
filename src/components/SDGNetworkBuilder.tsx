
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { motion, AnimatePresence } from 'framer-motion';
import { Layers, Zap, Target, Shuffle, Sparkles, Users, Globe } from 'lucide-react';

interface SDGTile {
  id: number;
  type: 'action' | 'resource' | 'connection' | 'catalyst';
  value: number;
  suit: string;
  color: string;
  label: string;
  connections: number[];
  power: number;
}

interface NetworkBuilderProps {
  onPatternComplete: (pattern: SDGTile[]) => void;
}

const SDGNetworkBuilder = ({ onPatternComplete }: NetworkBuilderProps) => {
  const [playerHand, setPlayerHand] = useState<SDGTile[]>([]);
  const [playedTiles, setPlayedTiles] = useState<SDGTile[]>([]);
  const [availableTiles, setAvailableTiles] = useState<SDGTile[]>([]);
  const [selectedTile, setSelectedTile] = useState<SDGTile | null>(null);
  const [combo, setCombo] = useState(0);
  const [networkPower, setNetworkPower] = useState(0);

  const generateSDGTiles = (): SDGTile[] => {
    const suits = ['Ecological', 'Social', 'Economic', 'Cultural', 'Spiritual', 'Technological'];
    const types: ('action' | 'resource' | 'connection' | 'catalyst')[] = ['action', 'resource', 'connection', 'catalyst'];
    const colors = ['from-green-500/20 to-emerald-500/20', 'from-blue-500/20 to-cyan-500/20', 
                   'from-purple-500/20 to-violet-500/20', 'from-orange-500/20 to-red-500/20'];
    
    const tiles: SDGTile[] = [];
    for (let i = 1; i <= 144; i++) {
      tiles.push({
        id: i,
        type: types[Math.floor(Math.random() * types.length)],
        value: (i % 9) + 1,
        suit: suits[Math.floor(i / 24)],
        color: colors[Math.floor(Math.random() * colors.length)],
        label: `SDG ${i}`,
        connections: [Math.floor(Math.random() * 144) + 1, Math.floor(Math.random() * 144) + 1],
        power: Math.floor(Math.random() * 10) + 1
      });
    }
    return tiles;
  };

  useEffect(() => {
    const tiles = generateSDGTiles();
    setAvailableTiles(tiles.slice(0, 100));
    setPlayerHand(tiles.slice(100, 114));
  }, []);

  const checkForPatterns = (tiles: SDGTile[]): boolean => {
    // Mahjong-style pattern detection
    const suitGroups = tiles.reduce((acc, tile) => {
      acc[tile.suit] = (acc[tile.suit] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Check for "Triplet" (3 of same suit)
    const hasTriplet = Object.values(suitGroups).some(count => count >= 3);
    
    // Check for "Sequence" (consecutive values in same type)
    const typeGroups = tiles.reduce((acc, tile) => {
      if (!acc[tile.type]) acc[tile.type] = [];
      acc[tile.type].push(tile.value);
      return acc;
    }, {} as Record<string, number[]>);

    const hasSequence = Object.values(typeGroups).some(values => {
      const sorted = values.sort((a, b) => a - b);
      for (let i = 0; i < sorted.length - 2; i++) {
        if (sorted[i + 1] === sorted[i] + 1 && sorted[i + 2] === sorted[i] + 2) {
          return true;
        }
      }
      return false;
    });

    return hasTriplet || hasSequence;
  };

  const playTile = (tile: SDGTile) => {
    const newPlayedTiles = [...playedTiles, tile];
    setPlayedTiles(newPlayedTiles);
    setPlayerHand(playerHand.filter(t => t.id !== tile.id));
    
    const newNetworkPower = networkPower + tile.power;
    setNetworkPower(newNetworkPower);

    if (checkForPatterns(newPlayedTiles.slice(-3))) {
      const newCombo = combo + 1;
      setCombo(newCombo);
      onPatternComplete(newPlayedTiles.slice(-3));
    }

    setSelectedTile(null);
  };

  const drawTile = () => {
    if (availableTiles.length > 0 && playerHand.length < 14) {
      const newTile = availableTiles[0];
      setPlayerHand([...playerHand, newTile]);
      setAvailableTiles(availableTiles.slice(1));
    }
  };

  const getTileIcon = (type: string) => {
    switch (type) {
      case 'action': return <Target className="w-4 h-4" />;
      case 'resource': return <Layers className="w-4 h-4" />;
      case 'connection': return <Users className="w-4 h-4" />;
      case 'catalyst': return <Sparkles className="w-4 h-4" />;
      default: return <Globe className="w-4 h-4" />;
    }
  };

  return (
    <Card className="bg-black/40 border-white/20 backdrop-blur-md">
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-cyan-400">
          <div className="flex items-center space-x-2">
            <Layers className="w-5 h-5" />
            <span>SDG Network Builder</span>
          </div>
          <div className="flex items-center space-x-4 text-sm">
            <Badge variant="secondary" className="bg-purple-500/20 text-purple-400">
              Combo: {combo}x
            </Badge>
            <Badge variant="secondary" className="bg-green-500/20 text-green-400">
              Power: {networkPower}
            </Badge>
            <Badge variant="secondary" className="bg-blue-500/20 text-blue-400">
              Hand: {playerHand.length}/14
            </Badge>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Network Board */}
        <div className="min-h-48 bg-gradient-to-br from-slate-800/50 to-purple-900/50 rounded-lg p-4 border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Active Network</h3>
            <div className="flex items-center space-x-2">
              <Progress value={(networkPower / 500) * 100} className="w-32 h-2" />
              <span className="text-sm text-white">{networkPower}/500</span>
            </div>
          </div>
          
          <div className="grid grid-cols-6 gap-2">
            <AnimatePresence>
              {playedTiles.map((tile, index) => (
                <motion.div
                  key={tile.id}
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-2 bg-gradient-to-br ${tile.color} rounded border border-white/20 text-center cursor-pointer hover:scale-105 transition-transform`}
                >
                  <div className="flex items-center justify-center mb-1">
                    {getTileIcon(tile.type)}
                  </div>
                  <div className="text-xs font-bold text-white">{tile.value}</div>
                  <div className="text-xs text-gray-300">{tile.suit.slice(0, 3)}</div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Player Hand */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">Your SDG Tiles</h3>
            <div className="flex items-center space-x-2">
              <Button
                onClick={drawTile}
                disabled={availableTiles.length === 0 || playerHand.length >= 14}
                variant="outline"
                size="sm"
                className="border-cyan-400 text-cyan-400 hover:bg-cyan-400/20"
              >
                <Shuffle className="w-4 h-4 mr-2" />
                Draw Tile
              </Button>
              <span className="text-sm text-gray-400">
                Deck: {availableTiles.length}
              </span>
            </div>
          </div>
          
          <div className="grid grid-cols-7 gap-2">
            {playerHand.map((tile) => (
              <motion.div
                key={tile.id}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className={`p-3 bg-gradient-to-br ${tile.color} rounded-lg border cursor-pointer transition-all ${
                  selectedTile?.id === tile.id 
                    ? 'border-yellow-400 shadow-lg shadow-yellow-400/20' 
                    : 'border-white/20 hover:border-white/40'
                }`}
                onClick={() => setSelectedTile(tile)}
              >
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    {getTileIcon(tile.type)}
                  </div>
                  <div className="text-sm font-bold text-white">{tile.value}</div>
                  <div className="text-xs text-gray-300">{tile.suit.slice(0, 4)}</div>
                  <div className="text-xs text-green-400 mt-1">⚡{tile.power}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Selected Tile Actions */}
        {selectedTile && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-lg border border-white/20"
          >
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-white">{selectedTile.label}</h4>
                <p className="text-sm text-gray-300">
                  {selectedTile.suit} • {selectedTile.type} • Power: {selectedTile.power}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  Connects to: SDG {selectedTile.connections[0]}, SDG {selectedTile.connections[1]}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  onClick={() => playTile(selectedTile)}
                  className="bg-green-500 hover:bg-green-600"
                >
                  <Zap className="w-4 h-4 mr-2" />
                  Play Tile
                </Button>
                <Button
                  onClick={() => setSelectedTile(null)}
                  variant="outline"
                  className="border-gray-400 text-gray-400 hover:bg-gray-400/20"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Pattern Recognition Display */}
        {combo > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-4 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-lg border border-yellow-400/40"
          >
            <div className="text-center">
              <div className="text-xl font-bold text-yellow-400 mb-2">
                🎉 Pattern Matched! Combo x{combo}
              </div>
              <div className="text-sm text-white">
                Network synergy activated! Bonus power multiplier applied.
              </div>
            </div>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
};

export default SDGNetworkBuilder;
