
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion } from 'framer-motion';
import { Users, Puzzle, Crown, Star, Zap, Globe, MessageCircle, Trophy } from 'lucide-react';

interface Player {
  id: string;
  name: string;
  avatar: string;
  score: number;
  rank: string;
  specialization: string;
  onlineStatus: 'online' | 'building' | 'away';
}

interface CollaborativeSession {
  id: string;
  name: string;
  players: Player[];
  objective: string;
  progress: number;
  timeRemaining: number;
  difficulty: 'beginner' | 'advanced' | 'master';
  rewards: string[];
}

const CollaborativeBuilder = () => {
  const [activeSession, setActiveSession] = useState<CollaborativeSession | null>(null);
  const [availableSessions, setAvailableSessions] = useState<CollaborativeSession[]>([]);
  const [myPlayer] = useState<Player>({
    id: '1',
    name: 'Earth Guardian',
    avatar: '🌍',
    score: 2847,
    rank: 'Planetary Architect',
    specialization: 'Ecological Intelligence',
    onlineStatus: 'online'
  });

  useEffect(() => {
    // Simulate live sessions
    setAvailableSessions([
      {
        id: '1',
        name: 'Oceanic Restoration Network',
        players: [
          { id: '2', name: 'Wave Keeper', avatar: '🌊', score: 3200, rank: 'Master Builder', specialization: 'Marine Systems', onlineStatus: 'building' },
          { id: '3', name: 'Coral Whisperer', avatar: '🐠', score: 2900, rank: 'Ecosystem Sage', specialization: 'Biodiversity', onlineStatus: 'online' },
          { id: '4', name: 'Deep Current', avatar: '🌀', score: 2650, rank: 'Flow Designer', specialization: 'Ocean Currents', onlineStatus: 'online' }
        ],
        objective: 'Build a self-healing ocean ecosystem network connecting 12 marine sanctuaries',
        progress: 67,
        timeRemaining: 28,
        difficulty: 'advanced',
        rewards: ['Ocean Sage Badge', 'Marine Network Template', '500 Blue Credits']
      },
      {
        id: '2',
        name: 'Urban Forest Integration',
        players: [
          { id: '5', name: 'Canopy Architect', avatar: '🌳', score: 3500, rank: 'Forest Master', specialization: 'Urban Ecology', onlineStatus: 'building' },
          { id: '6', name: 'Root Network', avatar: '🌿', score: 2800, rank: 'Growth Guide', specialization: 'Permaculture', onlineStatus: 'online' }
        ],
        objective: 'Design living city infrastructure that breathes with nature',
        progress: 34,
        timeRemaining: 45,
        difficulty: 'master',
        rewards: ['Green City Badge', 'Biophilic Design Kit', '750 Green Credits']
      },
      {
        id: '3',
        name: 'Wisdom Council Formation',
        players: [
          { id: '7', name: 'Story Weaver', avatar: '📚', score: 4100, rank: 'Mythopoetic Master', specialization: 'Cultural Intelligence', onlineStatus: 'building' },
          { id: '8', name: 'Circle Keeper', avatar: '🔮', score: 3800, rank: 'Ritual Guardian', specialization: 'Sacred Governance', onlineStatus: 'online' },
          { id: '9', name: 'Voice Bridge', avatar: '🌈', score: 3200, rank: 'Translation Master', specialization: 'Cross-Cultural', onlineStatus: 'away' }
        ],
        objective: 'Create protocols for intergenerational decision-making across cultures',
        progress: 89,
        timeRemaining: 12,
        difficulty: 'beginner',
        rewards: ['Wisdom Keeper Badge', 'Council Templates', '300 Spirit Credits']
      }
    ]);
  }, []);

  const joinSession = (session: CollaborativeSession) => {
    setActiveSession({
      ...session,
      players: [...session.players, myPlayer]
    });
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'text-green-400 border-green-400';
      case 'advanced': return 'text-yellow-400 border-yellow-400';
      case 'master': return 'text-red-400 border-red-400';
      default: return 'text-gray-400 border-gray-400';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-400';
      case 'building': return 'bg-blue-400 animate-pulse';
      case 'away': return 'bg-yellow-400';
      default: return 'bg-gray-400';
    }
  };

  if (activeSession) {
    return (
      <Card className="bg-black/40 border-white/20 backdrop-blur-md">
        <CardHeader>
          <CardTitle className="flex items-center justify-between text-cyan-400">
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5" />
              <span>{activeSession.name}</span>
            </div>
            <div className="flex items-center space-x-4 text-sm">
              <Badge variant="secondary" className="bg-green-500/20 text-green-400">
                {activeSession.progress}% Complete
              </Badge>
              <Badge variant="secondary" className="bg-orange-500/20 text-orange-400">
                {activeSession.timeRemaining}m left
              </Badge>
              <Button
                onClick={() => setActiveSession(null)}
                variant="outline"
                size="sm"
                className="border-white/20 text-white hover:bg-white/10"
              >
                Leave Session
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Session Objective */}
          <div className="p-4 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-lg border border-white/20">
            <h3 className="font-semibold text-white mb-2">Mission Objective</h3>
            <p className="text-sm text-gray-300">{activeSession.objective}</p>
            <div className="mt-3">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-white">Progress</span>
                <span className="text-cyan-400">{activeSession.progress}%</span>
              </div>
              <Progress value={activeSession.progress} className="h-2" />
            </div>
          </div>

          {/* Live Players */}
          <div className="space-y-3">
            <h3 className="font-semibold text-white flex items-center">
              <Crown className="w-4 h-4 mr-2 text-yellow-400" />
              Live Builders ({activeSession.players.length})
            </h3>
            <div className="grid md:grid-cols-2 gap-3">
              {activeSession.players.map((player) => (
                <motion.div
                  key={player.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg border border-white/10"
                >
                  <div className="relative">
                    <div className="text-2xl">{player.avatar}</div>
                    <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full ${getStatusColor(player.onlineStatus)}`}></div>
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-white">{player.name}</div>
                    <div className="text-xs text-gray-400">{player.rank}</div>
                    <div className="text-xs text-cyan-400">{player.specialization}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-yellow-400">{player.score}</div>
                    <div className="text-xs text-gray-400">score</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Real-time Collaboration Tools */}
          <Tabs defaultValue="builder" className="space-y-4">
            <TabsList className="grid w-full grid-cols-3 bg-black/40 border border-white/20">
              <TabsTrigger value="builder" className="data-[state=active]:bg-purple-500/50">
                <Puzzle className="w-4 h-4 mr-2" />
                Builder
              </TabsTrigger>
              <TabsTrigger value="chat" className="data-[state=active]:bg-blue-500/50">
                <MessageCircle className="w-4 h-4 mr-2" />
                Council
              </TabsTrigger>
              <TabsTrigger value="rewards" className="data-[state=active]:bg-yellow-500/50">
                <Trophy className="w-4 h-4 mr-2" />
                Rewards
              </TabsTrigger>
            </TabsList>

            <TabsContent value="builder" className="space-y-4">
              <div className="min-h-64 bg-gradient-to-br from-slate-800/50 to-purple-900/50 rounded-lg p-4 border border-white/10">
                <div className="text-center text-white">
                  <div className="text-4xl mb-4">🏗️</div>
                  <h3 className="text-lg font-semibold mb-2">Collaborative Building Space</h3>
                  <p className="text-sm text-gray-300 mb-4">
                    Work together to place SDG tiles and create network patterns
                  </p>
                  <div className="grid grid-cols-4 gap-2 max-w-md mx-auto">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                      <div key={i} className="aspect-square bg-white/10 rounded border border-white/20 flex items-center justify-center cursor-pointer hover:bg-white/20 transition-colors">
                        <span className="text-xs text-gray-400">#{i}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="chat" className="space-y-4">
              <div className="space-y-3 max-h-48 overflow-y-auto">
                <div className="p-3 bg-blue-500/20 rounded-lg">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-sm font-semibold text-white">Wave Keeper</span>
                    <span className="text-xs text-gray-400">2m ago</span>
                  </div>
                  <p className="text-sm text-gray-300">Let's connect the coral restoration nodes to the current flow patterns</p>
                </div>
                <div className="p-3 bg-green-500/20 rounded-lg">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-sm font-semibold text-white">Coral Whisperer</span>
                    <span className="text-xs text-gray-400">1m ago</span>
                  </div>
                  <p className="text-sm text-gray-300">Great idea! I'll place the biodiversity amplifier here 🐠</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <input
                  type="text"
                  placeholder="Share wisdom with the council..."
                  className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded text-white placeholder-gray-400 text-sm"
                />
                <Button size="sm" className="bg-cyan-500 hover:bg-cyan-600">
                  Send
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="rewards" className="space-y-4">
              <div className="space-y-3">
                <h4 className="font-semibold text-white">Session Rewards</h4>
                <div className="grid gap-2">
                  {activeSession.rewards.map((reward, index) => (
                    <div key={index} className="flex items-center space-x-3 p-2 bg-yellow-500/20 rounded border border-yellow-400/40">
                      <Star className="w-4 h-4 text-yellow-400" />
                      <span className="text-sm text-white">{reward}</span>
                    </div>
                  ))}
                </div>
                <div className="p-3 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-lg border border-white/20">
                  <div className="text-sm text-white mb-2">Collective Achievement Bonus</div>
                  <div className="text-xs text-gray-300">
                    Working together unlocks 2x rewards and special network effects!
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-black/40 border-white/20 backdrop-blur-md">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-cyan-400">
          <Users className="w-5 h-5" />
          <span>Collaborative Building Sessions</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* My Status */}
        <div className="p-4 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-lg border border-white/20">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="text-3xl">{myPlayer.avatar}</div>
              <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full ${getStatusColor(myPlayer.onlineStatus)}`}></div>
            </div>
            <div className="flex-1">
              <div className="font-semibold text-white">{myPlayer.name}</div>
              <div className="text-sm text-cyan-400">{myPlayer.rank}</div>
              <div className="text-xs text-gray-400">{myPlayer.specialization}</div>
            </div>
            <div className="text-right">
              <div className="text-xl font-bold text-yellow-400">{myPlayer.score}</div>
              <div className="text-xs text-gray-400">total score</div>
            </div>
          </div>
        </div>

        {/* Available Sessions */}
        <div className="space-y-4">
          <h3 className="font-semibold text-white">Join Active Sessions</h3>
          <div className="space-y-3">
            {availableSessions.map((session) => (
              <motion.div
                key={session.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-colors"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-semibold text-white">{session.name}</h4>
                      <Badge variant="outline" className={`text-xs ${getDifficultyColor(session.difficulty)}`}>
                        {session.difficulty}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-300 mb-2">{session.objective}</p>
                    <div className="flex items-center space-x-4 text-xs text-gray-400">
                      <span>👥 {session.players.length} builders</span>
                      <span>⏱️ {session.timeRemaining}m remaining</span>
                      <span>🎯 {session.progress}% complete</span>
                    </div>
                  </div>
                  <Button
                    onClick={() => joinSession(session)}
                    className="bg-green-500 hover:bg-green-600 ml-4"
                  >
                    <Zap className="w-4 h-4 mr-2" />
                    Join
                  </Button>
                </div>
                
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-xs text-gray-400">Active builders:</span>
                  <div className="flex -space-x-2">
                    {session.players.slice(0, 3).map((player) => (
                      <div key={player.id} className="w-6 h-6 rounded-full bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center text-xs border border-white/20">
                        {player.avatar}
                      </div>
                    ))}
                    {session.players.length > 3 && (
                      <div className="w-6 h-6 rounded-full bg-gray-600 flex items-center justify-center text-xs border border-white/20 text-white">
                        +{session.players.length - 3}
                      </div>
                    )}
                  </div>
                </div>

                <Progress value={session.progress} className="h-2" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Quick Start */}
        <div className="flex justify-center">
          <Button
            variant="outline"
            className="border-cyan-400 text-cyan-400 hover:bg-cyan-400/20"
          >
            <Globe className="w-4 h-4 mr-2" />
            Create New Session
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CollaborativeBuilder;
