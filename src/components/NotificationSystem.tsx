// CIVICA 144 Sacred Notification System
// Real-time updates with sacred significance

import React, {
  useState,
  useEffect,
  createContext,
  useContext,
  ReactNode,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Bell,
  X,
  Check,
  Info,
  AlertTriangle,
  Heart,
  Sparkles,
  Users,
  BookOpen,
  Calendar,
  Zap,
  Star,
} from "lucide-react";

export interface SacredNotification {
  id: string;
  type:
    | "blessing"
    | "ritual"
    | "wisdom"
    | "community"
    | "system"
    | "warning"
    | "success";
  title: string;
  message: string;
  timestamp: Date;
  duration?: number; // Auto-dismiss time in ms
  action?: {
    label: string;
    handler: () => void;
  };
  sacred?: boolean;
  flourishValue?: number;
  priority?: "low" | "normal" | "high" | "urgent";
  source?: string;
  metadata?: Record<string, any>;
}

interface NotificationContextType {
  notifications: SacredNotification[];
  addNotification: (
    notification: Omit<SacredNotification, "id" | "timestamp">,
  ) => void;
  removeNotification: (id: string) => void;
  clearAll: () => void;
  markAsRead: (id: string) => void;
  getUnreadCount: () => number;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined,
);

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotifications must be used within NotificationProvider",
    );
  }
  return context;
};

interface NotificationProviderProps {
  children: ReactNode;
  maxNotifications?: number;
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({
  children,
  maxNotifications = 5,
}) => {
  const [notifications, setNotifications] = useState<SacredNotification[]>([]);

  const addNotification = (
    notification: Omit<SacredNotification, "id" | "timestamp">,
  ) => {
    const newNotification: SacredNotification = {
      ...notification,
      id: `notification_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date(),
    };

    setNotifications((prev) => {
      const updated = [newNotification, ...prev];
      return updated.slice(0, maxNotifications);
    });

    // Auto-dismiss if duration is set
    if (notification.duration) {
      setTimeout(() => {
        removeNotification(newNotification.id);
      }, notification.duration);
    }
  };

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) =>
        n.id === id ? { ...n, metadata: { ...n.metadata, read: true } } : n,
      ),
    );
  };

  const getUnreadCount = () => {
    return notifications.filter((n) => !n.metadata?.read).length;
  };

  const contextValue: NotificationContextType = {
    notifications,
    addNotification,
    removeNotification,
    clearAll,
    markAsRead,
    getUnreadCount,
  };

  return (
    <NotificationContext.Provider value={contextValue}>
      {children}
    </NotificationContext.Provider>
  );
};

interface NotificationDisplayProps {
  position?:
    | "top-right"
    | "top-left"
    | "bottom-right"
    | "bottom-left"
    | "top-center";
  showBell?: boolean;
}

export const NotificationDisplay: React.FC<NotificationDisplayProps> = ({
  position = "top-right",
  showBell = true,
}) => {
  const {
    notifications,
    removeNotification,
    clearAll,
    markAsRead,
    getUnreadCount,
  } = useNotifications();
  const [showPanel, setShowPanel] = useState(false);

  const getPositionClasses = () => {
    switch (position) {
      case "top-left":
        return "top-4 left-4";
      case "bottom-right":
        return "bottom-4 right-4";
      case "bottom-left":
        return "bottom-4 left-4";
      case "top-center":
        return "top-4 left-1/2 transform -translate-x-1/2";
      default:
        return "top-4 right-4";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "blessing":
        return <Heart className="w-4 h-4" />;
      case "ritual":
        return <Sparkles className="w-4 h-4" />;
      case "wisdom":
        return <BookOpen className="w-4 h-4" />;
      case "community":
        return <Users className="w-4 h-4" />;
      case "system":
        return <Info className="w-4 h-4" />;
      case "warning":
        return <AlertTriangle className="w-4 h-4" />;
      case "success":
        return <Check className="w-4 h-4" />;
      default:
        return <Bell className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "blessing":
        return "from-pink-500 to-purple-500";
      case "ritual":
        return "from-purple-500 to-cyan-500";
      case "wisdom":
        return "from-yellow-500 to-orange-500";
      case "community":
        return "from-green-500 to-emerald-500";
      case "system":
        return "from-blue-500 to-cyan-500";
      case "warning":
        return "from-orange-500 to-red-500";
      case "success":
        return "from-green-500 to-emerald-500";
      default:
        return "from-gray-500 to-gray-600";
    }
  };

  const formatTime = (timestamp: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - timestamp.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays}d ago`;
  };

  return (
    <>
      {/* Bell Icon */}
      {showBell && (
        <div className="fixed top-4 right-20 z-50">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setShowPanel(!showPanel)}
            className="relative p-3 bg-black/40 backdrop-blur-md border border-white/20 rounded-full hover:border-white/40 transition-all"
          >
            <Bell className="w-5 h-5 text-cyan-400" />
            {getUnreadCount() > 0 && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-xs text-white font-bold"
              >
                {getUnreadCount()}
              </motion.div>
            )}
          </motion.button>
        </div>
      )}

      {/* Notification Panel */}
      <AnimatePresence>
        {showPanel && (
          <motion.div
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            className="fixed top-16 right-4 z-50 w-96"
          >
            <Card className="bg-black/90 border-white/20 backdrop-blur-md max-h-96 overflow-hidden">
              <div className="p-4 border-b border-white/20">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-cyan-400">
                    Sacred Notifications
                  </h3>
                  <div className="flex items-center space-x-2">
                    {notifications.length > 0 && (
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={clearAll}
                        className="text-xs text-gray-400 hover:text-white"
                      >
                        Clear All
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setShowPanel(false)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>

              <div className="max-h-80 overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="p-8 text-center">
                    <Star className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                    <p className="text-gray-400">No sacred messages</p>
                    <p className="text-sm text-gray-500">
                      Peace flows through the collective
                    </p>
                  </div>
                ) : (
                  notifications.map((notification) => (
                    <motion.div
                      key={notification.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: 300 }}
                      className="p-4 border-b border-white/10 hover:bg-white/5 transition-all"
                    >
                      <div className="flex items-start space-x-3">
                        <div
                          className={`w-8 h-8 rounded-full bg-gradient-to-r ${getTypeColor(notification.type)} flex items-center justify-center flex-shrink-0`}
                        >
                          {getTypeIcon(notification.type)}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <h4 className="font-medium text-white text-sm">
                              {notification.title}
                            </h4>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() =>
                                removeNotification(notification.id)
                              }
                              className="text-gray-400 hover:text-white p-1"
                            >
                              <X className="w-3 h-3" />
                            </Button>
                          </div>

                          <p className="text-sm text-gray-300 mt-1">
                            {notification.message}
                          </p>

                          <div className="flex items-center justify-between mt-2">
                            <span className="text-xs text-gray-400">
                              {formatTime(notification.timestamp)}
                            </span>

                            <div className="flex items-center space-x-2">
                              {notification.flourishValue && (
                                <Badge className="bg-yellow-500/20 text-yellow-400 text-xs">
                                  <Sparkles className="w-3 h-3 mr-1" />
                                  {notification.flourishValue}
                                </Badge>
                              )}

                              {notification.priority === "urgent" && (
                                <Badge className="bg-red-500/20 text-red-400 text-xs">
                                  Urgent
                                </Badge>
                              )}
                            </div>
                          </div>

                          {notification.action && (
                            <Button
                              size="sm"
                              onClick={() => {
                                notification.action!.handler();
                                removeNotification(notification.id);
                              }}
                              className="mt-2 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-xs"
                            >
                              {notification.action.label}
                            </Button>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Notifications */}
      <div className={`fixed ${getPositionClasses()} z-40 space-y-2 max-w-sm`}>
        <AnimatePresence>
          {notifications.slice(0, 3).map((notification) => (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, scale: 0.8, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{
                opacity: 0,
                scale: 0.8,
                x: position.includes("right") ? 300 : -300,
              }}
              className="cursor-pointer"
              onClick={() => markAsRead(notification.id)}
            >
              <Card className="bg-black/90 border-white/20 backdrop-blur-md hover:border-white/40 transition-all">
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <div
                      className={`w-6 h-6 rounded-full bg-gradient-to-r ${getTypeColor(notification.type)} flex items-center justify-center flex-shrink-0`}
                    >
                      {getTypeIcon(notification.type)}
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-white text-sm">
                        {notification.title}
                      </h4>
                      <p className="text-sm text-gray-300 mt-1">
                        {notification.message}
                      </p>

                      {notification.flourishValue && (
                        <Badge className="bg-yellow-500/20 text-yellow-400 text-xs mt-2">
                          <Sparkles className="w-3 h-3 mr-1" />+
                          {notification.flourishValue} Flourish
                        </Badge>
                      )}
                    </div>

                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeNotification(notification.id);
                      }}
                      className="text-gray-400 hover:text-white p-1"
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </>
  );
};

// Helper hook for common notification types
export const useSacredNotifications = () => {
  const { addNotification } = useNotifications();

  return {
    blessing: (message: string, flourishValue?: number) =>
      addNotification({
        type: "blessing",
        title: "✨ Sacred Blessing",
        message,
        flourishValue,
        duration: 5000,
        sacred: true,
      }),

    wisdom: (title: string, message: string) =>
      addNotification({
        type: "wisdom",
        title,
        message,
        duration: 8000,
        sacred: true,
      }),

    community: (
      message: string,
      action?: { label: string; handler: () => void },
    ) =>
      addNotification({
        type: "community",
        title: "👥 Community Update",
        message,
        action,
        duration: 6000,
      }),

    ritual: (
      title: string,
      message: string,
      action?: { label: string; handler: () => void },
    ) =>
      addNotification({
        type: "ritual",
        title,
        message,
        action,
        sacred: true,
      }),

    system: (message: string) =>
      addNotification({
        type: "system",
        title: "⚙️ System Update",
        message,
        duration: 4000,
      }),

    success: (message: string, flourishValue?: number) =>
      addNotification({
        type: "success",
        title: "✅ Success",
        message,
        flourishValue,
        duration: 4000,
      }),

    warning: (
      message: string,
      priority: "normal" | "high" | "urgent" = "normal",
    ) =>
      addNotification({
        type: "warning",
        title: "⚠️ Sacred Attention",
        message,
        priority,
        duration: priority === "urgent" ? 0 : 6000,
      }),
  };
};

// Default export for the provider (most commonly used)
export default NotificationProvider;
