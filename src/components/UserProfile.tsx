// CIVICA 144 User Profile Management
// Sacred identity and role management

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  User,
  Edit,
  Save,
  X,
  Camera,
  Star,
  Heart,
  Crown,
  MapPin,
  Globe,
  Calendar,
  Award,
  Sparkles,
  Settings,
  Shield,
  Eye,
  Lock,
  Bell,
  Palette,
  Moon,
  Sun,
} from "lucide-react";
import { useSacredAuth } from "@/hooks/useSacredAuth";
import { useCivica } from "@/contexts/CivicaContext";
import { useBilling } from "@/hooks/useBilling";

interface UserProfileData {
  id: string;
  fullName: string;
  email: string;
  role: string;
  bio: string;
  location: string;
  avatar?: string;
  sacredSkills: string[];
  bioregion: string;
  timezone: string;
  preferredLanguage: string;
  cosmicPreferences: {
    lunarNotifications: boolean;
    seasonalTheming: boolean;
    sacredColors: string;
    ritualReminders: boolean;
  };
  privacySettings: {
    profileVisibility: "public" | "community" | "private";
    showLocation: boolean;
    showStats: boolean;
    allowMessages: boolean;
  };
  achievements: Array<{
    id: string;
    name: string;
    description: string;
    icon: string;
    dateEarned: Date;
    category: string;
  }>;
  stats: {
    wisdomShared: number;
    ritualsParticipated: number;
    flourishGenerated: number;
    communityConnections: number;
    daysActive: number;
  };
}

const SACRED_ROLES = [
  {
    id: "ritual_designer",
    name: "Ritual Designer",
    icon: "🕯️",
    color: "from-amber-500 to-orange-500",
  },
  {
    id: "forest_delegate",
    name: "Forest Delegate",
    icon: "🌳",
    color: "from-green-500 to-emerald-500",
  },
  {
    id: "future_diplomat",
    name: "Future Diplomat",
    icon: "🌟",
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: "myth_weaver",
    name: "Myth Weaver",
    icon: "📜",
    color: "from-purple-500 to-pink-500",
  },
  {
    id: "network_architect",
    name: "Network Architect",
    icon: "🔗",
    color: "from-indigo-500 to-purple-500",
  },
  {
    id: "soil_steward",
    name: "Soil Steward",
    icon: "🌱",
    color: "from-lime-500 to-green-500",
  },
  {
    id: "child_of_future",
    name: "Child of Future",
    icon: "🌈",
    color: "from-pink-500 to-rose-500",
  },
  {
    id: "elder_of_time",
    name: "Elder of Time",
    icon: "⏰",
    color: "from-slate-500 to-gray-500",
  },
];

const SAMPLE_ACHIEVEMENTS = [
  {
    id: "1",
    name: "Sacred First Steps",
    description: "Completed sacred authentication and entered the portal",
    icon: "🚪",
    dateEarned: new Date(2024, 0, 15),
    category: "onboarding",
  },
  {
    id: "2",
    name: "Wisdom Keeper",
    description: "Shared first piece of sacred knowledge",
    icon: "📚",
    dateEarned: new Date(2024, 0, 20),
    category: "wisdom",
  },
  {
    id: "3",
    name: "Community Builder",
    description: "Connected with 10 sacred stewards",
    icon: "👥",
    dateEarned: new Date(2024, 1, 5),
    category: "community",
  },
];

export const UserProfile: React.FC = () => {
  const { user, updateProfile } = useSacredAuth();
  const { state: civicaState } = useCivica();
  const { flourishAccount } = useBilling();

  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");
  const [profileData, setProfileData] = useState<UserProfileData>({
    id: user?.id || "",
    fullName: user?.user_metadata?.full_name || "",
    email: user?.email || "",
    role: user?.user_metadata?.role || "steward",
    bio: user?.user_metadata?.bio || "",
    location: user?.user_metadata?.location || "",
    avatar: user?.user_metadata?.avatar_url,
    sacredSkills: user?.user_metadata?.sacred_skills || [],
    bioregion: user?.user_metadata?.bioregion || "",
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    preferredLanguage: "en",
    cosmicPreferences: {
      lunarNotifications: true,
      seasonalTheming: true,
      sacredColors: "aurora",
      ritualReminders: true,
    },
    privacySettings: {
      profileVisibility: "community",
      showLocation: true,
      showStats: true,
      allowMessages: true,
    },
    achievements: SAMPLE_ACHIEVEMENTS,
    stats: {
      wisdomShared: 12,
      ritualsParticipated: 8,
      flourishGenerated: flourishAccount.balance.total,
      communityConnections: 47,
      daysActive: 23,
    },
  });

  const [editData, setEditData] = useState(profileData);

  const handleSave = async () => {
    try {
      await updateProfile({
        full_name: editData.fullName,
        bio: editData.bio,
        location: editData.location,
        role: editData.role,
        sacred_skills: editData.sacredSkills,
        bioregion: editData.bioregion,
      });

      setProfileData(editData);
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  };

  const handleCancel = () => {
    setEditData(profileData);
    setIsEditing(false);
  };

  const getSelectedRole = () => {
    return (
      SACRED_ROLES.find((role) => role.id === profileData.role) ||
      SACRED_ROLES[0]
    );
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-cyan-400">Sacred Profile</h2>
          <p className="text-gray-400">
            Manage your identity and sacred preferences
          </p>
        </div>
        <div className="flex items-center space-x-3">
          {!isEditing ? (
            <Button
              onClick={() => setIsEditing(true)}
              className="bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600"
            >
              <Edit className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>
          ) : (
            <div className="flex space-x-2">
              <Button
                onClick={handleSave}
                className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
              >
                <Save className="w-4 h-4 mr-2" />
                Save
              </Button>
              <Button
                onClick={handleCancel}
                variant="outline"
                className="border-gray-400 text-gray-400 hover:bg-gray-400/20"
              >
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
            </div>
          )}
        </div>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TabsList className="grid w-full grid-cols-5 bg-black/40 border border-white/20">
          <TabsTrigger
            value="profile"
            className="data-[state=active]:bg-cyan-500/50"
          >
            <User className="w-4 h-4 mr-2" />
            Profile
          </TabsTrigger>
          <TabsTrigger
            value="sacred"
            className="data-[state=active]:bg-purple-500/50"
          >
            <Crown className="w-4 h-4 mr-2" />
            Sacred
          </TabsTrigger>
          <TabsTrigger
            value="achievements"
            className="data-[state=active]:bg-yellow-500/50"
          >
            <Award className="w-4 h-4 mr-2" />
            Achievements
          </TabsTrigger>
          <TabsTrigger
            value="settings"
            className="data-[state=active]:bg-green-500/50"
          >
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </TabsTrigger>
          <TabsTrigger
            value="privacy"
            className="data-[state=active]:bg-red-500/50"
          >
            <Shield className="w-4 h-4 mr-2" />
            Privacy
          </TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile" className="space-y-6">
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Avatar and Basic Info */}
            <Card className="bg-black/40 border-white/20 backdrop-blur-md">
              <CardContent className="p-6 text-center space-y-4">
                <div className="relative inline-block">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-r from-cyan-400 to-purple-400 flex items-center justify-center text-3xl">
                    {getSelectedRole().icon}
                  </div>
                  {isEditing && (
                    <Button
                      size="sm"
                      className="absolute bottom-0 right-0 rounded-full w-8 h-8 p-0"
                    >
                      <Camera className="w-4 h-4" />
                    </Button>
                  )}
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-white">
                    {profileData.fullName}
                  </h3>
                  <Badge
                    className={`bg-gradient-to-r ${getSelectedRole().color} text-white`}
                  >
                    {getSelectedRole().name}
                  </Badge>
                  <p className="text-gray-400 flex items-center justify-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {profileData.location || "Location not set"}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/20">
                  <div className="text-center">
                    <div className="text-lg font-bold text-cyan-400">
                      {profileData.stats.flourishGenerated}
                    </div>
                    <div className="text-xs text-gray-400">Flourish</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-purple-400">
                      {profileData.stats.daysActive}
                    </div>
                    <div className="text-xs text-gray-400">Days Active</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Profile Details */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="bg-black/40 border-white/20 backdrop-blur-md">
                <CardHeader>
                  <CardTitle className="text-cyan-400">
                    Personal Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input
                        id="fullName"
                        value={
                          isEditing ? editData.fullName : profileData.fullName
                        }
                        onChange={(e) =>
                          setEditData((prev) => ({
                            ...prev,
                            fullName: e.target.value,
                          }))
                        }
                        disabled={!isEditing}
                        className="bg-black/20 border-white/20"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        value={profileData.email}
                        disabled
                        className="bg-black/20 border-white/20 opacity-50"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="bio">Sacred Bio</Label>
                    <Textarea
                      id="bio"
                      placeholder="Share your sacred mission and purpose..."
                      value={isEditing ? editData.bio : profileData.bio}
                      onChange={(e) =>
                        setEditData((prev) => ({
                          ...prev,
                          bio: e.target.value,
                        }))
                      }
                      disabled={!isEditing}
                      className="bg-black/20 border-white/20 min-h-[100px]"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        placeholder="City, Country"
                        value={
                          isEditing ? editData.location : profileData.location
                        }
                        onChange={(e) =>
                          setEditData((prev) => ({
                            ...prev,
                            location: e.target.value,
                          }))
                        }
                        disabled={!isEditing}
                        className="bg-black/20 border-white/20"
                      />
                    </div>
                    <div>
                      <Label htmlFor="bioregion">Bioregion</Label>
                      <Input
                        id="bioregion"
                        placeholder="Your ecological region"
                        value={
                          isEditing ? editData.bioregion : profileData.bioregion
                        }
                        onChange={(e) =>
                          setEditData((prev) => ({
                            ...prev,
                            bioregion: e.target.value,
                          }))
                        }
                        disabled={!isEditing}
                        className="bg-black/20 border-white/20"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Sacred Stats */}
              <Card className="bg-black/40 border-white/20 backdrop-blur-md">
                <CardHeader>
                  <CardTitle className="text-purple-400">
                    Sacred Statistics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-3 bg-black/20 rounded-lg">
                      <div className="text-lg font-bold text-blue-400">
                        {profileData.stats.wisdomShared}
                      </div>
                      <div className="text-xs text-gray-400">Wisdom Shared</div>
                    </div>
                    <div className="text-center p-3 bg-black/20 rounded-lg">
                      <div className="text-lg font-bold text-purple-400">
                        {profileData.stats.ritualsParticipated}
                      </div>
                      <div className="text-xs text-gray-400">Rituals</div>
                    </div>
                    <div className="text-center p-3 bg-black/20 rounded-lg">
                      <div className="text-lg font-bold text-green-400">
                        {profileData.stats.communityConnections}
                      </div>
                      <div className="text-xs text-gray-400">Connections</div>
                    </div>
                    <div className="text-center p-3 bg-black/20 rounded-lg">
                      <div className="text-lg font-bold text-yellow-400">
                        {profileData.stats.flourishGenerated}
                      </div>
                      <div className="text-xs text-gray-400">Flourish</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Sacred Tab */}
        <TabsContent value="sacred" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Sacred Role */}
            <Card className="bg-black/40 border-white/20 backdrop-blur-md">
              <CardHeader>
                <CardTitle className="text-purple-400">Sacred Role</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  {SACRED_ROLES.map((role) => (
                    <motion.div
                      key={role.id}
                      whileHover={{ scale: 1.02 }}
                      className={`cursor-pointer p-3 rounded-lg border transition-all ${
                        (isEditing ? editData.role : profileData.role) ===
                        role.id
                          ? "border-cyan-400 bg-cyan-400/20"
                          : "border-white/20 bg-black/20 hover:border-white/40"
                      }`}
                      onClick={() =>
                        isEditing &&
                        setEditData((prev) => ({ ...prev, role: role.id }))
                      }
                    >
                      <div className="text-center space-y-2">
                        <div className="text-2xl">{role.icon}</div>
                        <div className="text-sm font-medium text-white">
                          {role.name}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Sacred Skills */}
            <Card className="bg-black/40 border-white/20 backdrop-blur-md">
              <CardHeader>
                <CardTitle className="text-green-400">Sacred Skills</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {profileData.sacredSkills.map((skill, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="bg-green-500/20 text-green-400"
                    >
                      {skill}
                    </Badge>
                  ))}
                  {profileData.sacredSkills.length === 0 && (
                    <p className="text-gray-400 text-sm">
                      No sacred skills added yet
                    </p>
                  )}
                </div>

                {isEditing && (
                  <Input
                    placeholder="Add sacred skills (comma separated)"
                    className="bg-black/20 border-white/20"
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        const value = e.currentTarget.value.trim();
                        if (value) {
                          setEditData((prev) => ({
                            ...prev,
                            sacredSkills: [...prev.sacredSkills, value],
                          }));
                          e.currentTarget.value = "";
                        }
                      }
                    }}
                  />
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Achievements Tab */}
        <TabsContent value="achievements" className="space-y-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {profileData.achievements.map((achievement) => (
              <Card
                key={achievement.id}
                className="bg-black/40 border-white/20 backdrop-blur-md hover:border-white/40 transition-all"
              >
                <CardContent className="p-4 text-center space-y-3">
                  <div className="text-3xl">{achievement.icon}</div>
                  <div>
                    <h3 className="font-semibold text-white">
                      {achievement.name}
                    </h3>
                    <p className="text-sm text-gray-400">
                      {achievement.description}
                    </p>
                  </div>
                  <div className="text-xs text-purple-400">
                    {formatDate(achievement.dateEarned)}
                  </div>
                  <Badge className="bg-yellow-500/20 text-yellow-400">
                    {achievement.category}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-6">
          <Card className="bg-black/40 border-white/20 backdrop-blur-md">
            <CardHeader>
              <CardTitle className="text-green-400">
                Cosmic Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Moon className="w-4 h-4 text-purple-400" />
                  <span>Lunar Notifications</span>
                </div>
                <input
                  type="checkbox"
                  checked={profileData.cosmicPreferences.lunarNotifications}
                  onChange={(e) =>
                    setProfileData((prev) => ({
                      ...prev,
                      cosmicPreferences: {
                        ...prev.cosmicPreferences,
                        lunarNotifications: e.target.checked,
                      },
                    }))
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Palette className="w-4 h-4 text-cyan-400" />
                  <span>Seasonal Theming</span>
                </div>
                <input
                  type="checkbox"
                  checked={profileData.cosmicPreferences.seasonalTheming}
                  onChange={(e) =>
                    setProfileData((prev) => ({
                      ...prev,
                      cosmicPreferences: {
                        ...prev.cosmicPreferences,
                        seasonalTheming: e.target.checked,
                      },
                    }))
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Bell className="w-4 h-4 text-orange-400" />
                  <span>Ritual Reminders</span>
                </div>
                <input
                  type="checkbox"
                  checked={profileData.cosmicPreferences.ritualReminders}
                  onChange={(e) =>
                    setProfileData((prev) => ({
                      ...prev,
                      cosmicPreferences: {
                        ...prev.cosmicPreferences,
                        ritualReminders: e.target.checked,
                      },
                    }))
                  }
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Privacy Tab */}
        <TabsContent value="privacy" className="space-y-6">
          <Card className="bg-black/40 border-white/20 backdrop-blur-md">
            <CardHeader>
              <CardTitle className="text-red-400">Privacy Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Profile Visibility</Label>
                <select
                  className="w-full mt-1 p-2 bg-black/20 border border-white/20 rounded-md text-white"
                  value={profileData.privacySettings.profileVisibility}
                  onChange={(e) =>
                    setProfileData((prev) => ({
                      ...prev,
                      privacySettings: {
                        ...prev.privacySettings,
                        profileVisibility: e.target.value as
                          | "public"
                          | "community"
                          | "private",
                      },
                    }))
                  }
                >
                  <option value="public">Public - Visible to everyone</option>
                  <option value="community">
                    Community - Visible to CIVICA members
                  </option>
                  <option value="private">Private - Only visible to you</option>
                </select>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span>Show Location</span>
                  <input
                    type="checkbox"
                    checked={profileData.privacySettings.showLocation}
                    onChange={(e) =>
                      setProfileData((prev) => ({
                        ...prev,
                        privacySettings: {
                          ...prev.privacySettings,
                          showLocation: e.target.checked,
                        },
                      }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <span>Show Statistics</span>
                  <input
                    type="checkbox"
                    checked={profileData.privacySettings.showStats}
                    onChange={(e) =>
                      setProfileData((prev) => ({
                        ...prev,
                        privacySettings: {
                          ...prev.privacySettings,
                          showStats: e.target.checked,
                        },
                      }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <span>Allow Messages</span>
                  <input
                    type="checkbox"
                    checked={profileData.privacySettings.allowMessages}
                    onChange={(e) =>
                      setProfileData((prev) => ({
                        ...prev,
                        privacySettings: {
                          ...prev.privacySettings,
                          allowMessages: e.target.checked,
                        },
                      }))
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserProfile;
