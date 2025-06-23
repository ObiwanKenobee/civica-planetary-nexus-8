import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sparkles,
  Crown,
  Leaf,
  Brain,
  Heart,
  Users,
  Eye,
  Moon,
  Sun,
} from "lucide-react";
import { motion } from "framer-motion";
import { useSacredAuth } from "@/hooks/useSacredAuth";
import { useToast } from "@/hooks/use-toast";

const identityIcons = {
  civic: Crown,
  ancestral: Moon,
  ecological: Leaf,
  digital: Brain,
  spiritual: Heart,
  proxy: Users,
};

const identityColors = {
  civic: "from-amber-500 to-orange-500",
  ancestral: "from-purple-500 to-indigo-500",
  ecological: "from-green-500 to-emerald-500",
  digital: "from-blue-500 to-cyan-500",
  spiritual: "from-pink-500 to-rose-500",
  proxy: "from-gray-500 to-slate-500",
};

const SacredAuth = () => {
  const {
    signUp,
    signIn,
    createSacredIdentity,
    sacredIdentities,
    startRitualSession,
  } = useSacredAuth();
  const { toast } = useToast();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showIdentityCreation, setShowIdentityCreation] = useState(false);
  const [showRitualEntry, setShowRitualEntry] = useState(false);
  const [selectedIdentity, setSelectedIdentity] = useState<any>(null);

  // Identity creation form
  const [newIdentity, setNewIdentity] = useState({
    identity_type: "",
    identity_name: "",
    cultural_lineage: "",
    ceremonial_title: "",
    mythic_avatar: "",
    proxy_represents: "",
    sacred_key_phrase: "",
  });

  // Ritual entry form
  const [ritualData, setRitualData] = useState({
    authMethod: "",
    ritualType: "",
    intentionStatement: "",
    memoryOffering: "",
    sacredVow: "",
    sdgCluster: "",
  });

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = isSignUp
        ? await signUp(email, password)
        : await signIn(email, password);

      if (error) {
        toast({
          title: "Authentication Error",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Welcome to CIVICA 144",
          description: isSignUp
            ? "Your sacred account has been created"
            : "You have entered the sacred space",
        });
        setShowIdentityCreation(true);
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateIdentity = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await createSacredIdentity(newIdentity);

      if (error) {
        toast({
          title: "Identity Creation Error",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Sacred Identity Created",
          description: `Your ${newIdentity.identity_type} identity has been woven into the cosmic tapestry`,
        });
        setShowIdentityCreation(false);
        setNewIdentity({
          identity_type: "",
          identity_name: "",
          cultural_lineage: "",
          ceremonial_title: "",
          mythic_avatar: "",
          proxy_represents: "",
          sacred_key_phrase: "",
        });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRitualEntry = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedIdentity) return;

    setIsLoading(true);

    try {
      const { error } = await startRitualSession(
        selectedIdentity.id,
        ritualData,
      );

      if (error) {
        toast({
          title: "Ritual Entry Error",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Sacred Session Initiated",
          description: `You have entered as ${selectedIdentity.identity_name}`,
        });
        setShowRitualEntry(false);
        window.location.href = "/dashboard";
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (showIdentityCreation) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-2xl"
        >
          <Card className="bg-black/40 border-white/20 backdrop-blur-md">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Weave Your Sacred Identity
              </CardTitle>
              <p className="text-gray-400">
                Create your plural identity within the CIVICA consciousness
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCreateIdentity} className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-300">
                      Identity Type
                    </label>
                    <Select
                      onValueChange={(value) =>
                        setNewIdentity({ ...newIdentity, identity_type: value })
                      }
                    >
                      <SelectTrigger className="bg-black/20 border-white/20">
                        <SelectValue placeholder="Choose your sacred archetype" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="civic">
                          🏛️ Civic - Guardian of Community
                        </SelectItem>
                        <SelectItem value="ancestral">
                          🌙 Ancestral - Keeper of Memory
                        </SelectItem>
                        <SelectItem value="ecological">
                          🌿 Ecological - Voice of Nature
                        </SelectItem>
                        <SelectItem value="digital">
                          🧠 Digital - Consciousness Bridge
                        </SelectItem>
                        <SelectItem value="spiritual">
                          💖 Spiritual - Heart of Wisdom
                        </SelectItem>
                        <SelectItem value="proxy">
                          👥 Proxy - Representative of Others
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-300">
                      Sacred Name
                    </label>
                    <Input
                      type="text"
                      placeholder="Your ceremonial identity name"
                      value={newIdentity.identity_name}
                      onChange={(e) =>
                        setNewIdentity({
                          ...newIdentity,
                          identity_name: e.target.value,
                        })
                      }
                      className="bg-black/20 border-white/20"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-300">
                      Cultural Lineage
                    </label>
                    <Input
                      type="text"
                      placeholder="Your ancestral or cultural heritage"
                      value={newIdentity.cultural_lineage}
                      onChange={(e) =>
                        setNewIdentity({
                          ...newIdentity,
                          cultural_lineage: e.target.value,
                        })
                      }
                      className="bg-black/20 border-white/20"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-300">
                      Ceremonial Title
                    </label>
                    <Input
                      type="text"
                      placeholder="Your sacred role or title"
                      value={newIdentity.ceremonial_title}
                      onChange={(e) =>
                        setNewIdentity({
                          ...newIdentity,
                          ceremonial_title: e.target.value,
                        })
                      }
                      className="bg-black/20 border-white/20"
                    />
                  </div>

                  {newIdentity.identity_type === "proxy" && (
                    <div>
                      <label className="text-sm font-medium text-gray-300">
                        Represents
                      </label>
                      <Input
                        type="text"
                        placeholder="Who or what you speak for (e.g., 'Future Generations', 'Amazon Rainforest')"
                        value={newIdentity.proxy_represents}
                        onChange={(e) =>
                          setNewIdentity({
                            ...newIdentity,
                            proxy_represents: e.target.value,
                          })
                        }
                        className="bg-black/20 border-white/20"
                      />
                    </div>
                  )}

                  <div>
                    <label className="text-sm font-medium text-gray-300">
                      Sacred Key Phrase
                    </label>
                    <Input
                      type="text"
                      placeholder="A personal mantra or sacred phrase"
                      value={newIdentity.sacred_key_phrase}
                      onChange={(e) =>
                        setNewIdentity({
                          ...newIdentity,
                          sacred_key_phrase: e.target.value,
                        })
                      }
                      className="bg-black/20 border-white/20"
                    />
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowIdentityCreation(false)}
                    className="flex-1 border-white/20 text-white hover:bg-white/10"
                  >
                    Back
                  </Button>
                  <Button
                    type="submit"
                    disabled={
                      isLoading ||
                      !newIdentity.identity_type ||
                      !newIdentity.identity_name
                    }
                    className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                  >
                    {isLoading ? "Weaving..." : "Create Sacred Identity"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  if (showRitualEntry && selectedIdentity) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-2xl"
        >
          <Card className="bg-black/40 border-white/20 backdrop-blur-md">
            <CardHeader className="text-center">
              <div
                className={`mx-auto w-16 h-16 rounded-full bg-gradient-to-r ${identityColors[selectedIdentity.identity_type as keyof typeof identityColors]} flex items-center justify-center mb-4`}
              >
                {(() => {
                  const Icon =
                    identityIcons[
                      selectedIdentity.identity_type as keyof typeof identityIcons
                    ];
                  return <Icon className="w-8 h-8 text-white" />;
                })()}
              </div>
              <CardTitle className="text-2xl bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Sacred Ritual Entry
              </CardTitle>
              <p className="text-gray-400">
                Entering as{" "}
                <span className="text-white font-medium">
                  {selectedIdentity.identity_name}
                </span>
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleRitualEntry} className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-300">
                      Authentication Method
                    </label>
                    <Select
                      onValueChange={(value) =>
                        setRitualData({ ...ritualData, authMethod: value })
                      }
                    >
                      <SelectTrigger className="bg-black/20 border-white/20">
                        <SelectValue placeholder="Choose your sacred method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ritual">🕯️ Sacred Ritual</SelectItem>
                        <SelectItem value="vow">🤝 Sacred Vow</SelectItem>
                        <SelectItem value="intention">
                          💭 Intention Setting
                        </SelectItem>
                        <SelectItem value="cultural_credential">
                          🏛️ Cultural Credential
                        </SelectItem>
                        <SelectItem value="ancestral_token">
                          🌙 Ancestral Token
                        </SelectItem>
                        <SelectItem value="proxy_delegate">
                          👥 Proxy Delegation
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-300">
                      Ritual Type
                    </label>
                    <Input
                      type="text"
                      placeholder="e.g., 'Dawn Gratitude', 'Earth Healing', 'Future Visioning'"
                      value={ritualData.ritualType}
                      onChange={(e) =>
                        setRitualData({
                          ...ritualData,
                          ritualType: e.target.value,
                        })
                      }
                      className="bg-black/20 border-white/20"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-300">
                      Intention Statement
                    </label>
                    <Textarea
                      placeholder="State your sacred intention for this session..."
                      value={ritualData.intentionStatement}
                      onChange={(e) =>
                        setRitualData({
                          ...ritualData,
                          intentionStatement: e.target.value,
                        })
                      }
                      className="bg-black/20 border-white/20"
                      rows={3}
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-300">
                      Memory Offering
                    </label>
                    <Textarea
                      placeholder="Share a story, wisdom, or memory as your offering..."
                      value={ritualData.memoryOffering}
                      onChange={(e) =>
                        setRitualData({
                          ...ritualData,
                          memoryOffering: e.target.value,
                        })
                      }
                      className="bg-black/20 border-white/20"
                      rows={3}
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-300">
                      Sacred Vow
                    </label>
                    <Textarea
                      placeholder="Make a commitment to the collective wisdom..."
                      value={ritualData.sacredVow}
                      onChange={(e) =>
                        setRitualData({
                          ...ritualData,
                          sacredVow: e.target.value,
                        })
                      }
                      className="bg-black/20 border-white/20"
                      rows={2}
                    />
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowRitualEntry(false)}
                    className="flex-1 border-white/20 text-white hover:bg-white/10"
                  >
                    Back
                  </Button>
                  <Button
                    type="submit"
                    disabled={
                      isLoading ||
                      !ritualData.authMethod ||
                      !ritualData.ritualType
                    }
                    className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                  >
                    {isLoading
                      ? "Entering Sacred Space..."
                      : "Begin Sacred Session"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-6">
      {/* Cosmic background effects */}
      <div className="fixed inset-0 opacity-30">
        {[...Array(100)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md relative z-10"
      >
        <Card className="bg-black/40 border-white/20 backdrop-blur-md">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-r from-cyan-400 to-purple-400 flex items-center justify-center mb-4">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Sacred Authentication
            </CardTitle>
            <p className="text-gray-400">Enter the CIVICA 144 consciousness</p>
          </CardHeader>
          <CardContent>
            {sacredIdentities.length > 0 ? (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">
                  Choose Your Sacred Identity
                </h3>
                <div className="space-y-3">
                  {sacredIdentities.map((identity) => {
                    const Icon =
                      identityIcons[
                        identity.identity_type as keyof typeof identityIcons
                      ];
                    return (
                      <motion.div
                        key={identity.id}
                        whileHover={{ scale: 1.02 }}
                        className={`p-4 rounded-lg bg-gradient-to-r ${identityColors[identity.identity_type as keyof typeof identityColors]} bg-opacity-20 border border-white/20 cursor-pointer`}
                        onClick={() => {
                          setSelectedIdentity(identity);
                          setShowRitualEntry(true);
                        }}
                      >
                        <div className="flex items-center space-x-3">
                          <Icon className="w-6 h-6 text-white" />
                          <div>
                            <h4 className="font-medium text-white">
                              {identity.identity_name}
                            </h4>
                            <p className="text-sm text-gray-300 capitalize">
                              {identity.identity_type} Identity
                            </p>
                            {identity.ceremonial_title && (
                              <Badge
                                variant="secondary"
                                className="mt-1 text-xs"
                              >
                                {identity.ceremonial_title}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
                <Button
                  onClick={() => setShowIdentityCreation(true)}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                >
                  + Create New Sacred Identity
                </Button>
              </div>
            ) : (
              <Tabs defaultValue="signin" className="space-y-4">
                <TabsList className="grid w-full grid-cols-2 bg-black/40 border border-white/20">
                  <TabsTrigger
                    value="signin"
                    onClick={() => setIsSignUp(false)}
                  >
                    Sacred Entry
                  </TabsTrigger>
                  <TabsTrigger value="signup" onClick={() => setIsSignUp(true)}>
                    Begin Journey
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="signin" className="space-y-4">
                  <form onSubmit={handleAuth} className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-300">
                        Sacred Email
                      </label>
                      <Input
                        type="email"
                        placeholder="your.sacred.email@domain.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-black/20 border-white/20"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-300">
                        Sacred Password
                      </label>
                      <Input
                        type="password"
                        placeholder="Your ceremonial key"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="bg-black/20 border-white/20"
                        required
                      />
                    </div>
                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                    >
                      {isLoading
                        ? "Entering Sacred Space..."
                        : "Enter Sacred Space"}
                    </Button>
                  </form>
                </TabsContent>

                <TabsContent value="signup" className="space-y-4">
                  <form onSubmit={handleAuth} className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-300">
                        Sacred Email
                      </label>
                      <Input
                        type="email"
                        placeholder="your.sacred.email@domain.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-black/20 border-white/20"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-300">
                        Sacred Password
                      </label>
                      <Input
                        type="password"
                        placeholder="Create your ceremonial key"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="bg-black/20 border-white/20"
                        required
                      />
                    </div>
                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
                    >
                      {isLoading
                        ? "Weaving Your Consciousness..."
                        : "Begin Sacred Journey"}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default SacredAuth;
