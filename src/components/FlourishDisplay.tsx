import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, TrendingUp, Gift, Coins } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useBilling } from "@/hooks/useBilling";
import { useNavigate } from "react-router-dom";

interface FlourishDisplayProps {
  compact?: boolean;
  showDetails?: boolean;
}

const FlourishDisplay = ({
  compact = false,
  showDetails = false,
}: FlourishDisplayProps) => {
  const navigate = useNavigate();
  const { flourishAccount, generateFlourish } = useBilling();
  const [showBreakdown, setShowBreakdown] = useState(false);

  const handleClick = () => {
    if (compact) {
      navigate("/billing?tab=flourish");
    } else {
      setShowBreakdown(!showBreakdown);
    }
  };

  if (compact) {
    return (
      <Button
        variant="outline"
        size="sm"
        onClick={handleClick}
        className="border-yellow-400 text-yellow-400 hover:bg-yellow-400/20"
      >
        <Sparkles className="w-4 h-4 mr-2" />
        {flourishAccount.balance.total} Flourish
      </Button>
    );
  }

  return (
    <div className="space-y-2">
      <Button
        variant="ghost"
        onClick={handleClick}
        className="w-full justify-between p-4 h-auto bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-400/30 hover:border-yellow-400/50"
      >
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-yellow-400 to-orange-400 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div className="text-left">
            <div className="font-semibold text-yellow-400">
              {flourishAccount.balance.total} Flourish
            </div>
            <div className="text-xs text-gray-400">Sacred currency balance</div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Badge
            variant="outline"
            className="text-xs border-green-400 text-green-400"
          >
            +{flourishAccount.generationRate}/month
          </Badge>
          <TrendingUp className="w-4 h-4 text-green-400" />
        </div>
      </Button>

      <AnimatePresence>
        {showBreakdown && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <Card className="bg-black/20 border-yellow-400/20">
              <CardContent className="p-4 space-y-3">
                <div className="text-sm font-semibold text-yellow-400 mb-2">
                  Flourish Breakdown:
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-blue-400">Wisdom:</span>
                    <span>{flourishAccount.balance.wisdom}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-green-400">Regeneration:</span>
                    <span>{flourishAccount.balance.regeneration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-purple-400">Harmony:</span>
                    <span>{flourishAccount.balance.harmony}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-pink-400">Creativity:</span>
                    <span>{flourishAccount.balance.creativity}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-orange-400">Service:</span>
                    <span>{flourishAccount.balance.service}</span>
                  </div>
                </div>

                <div className="border-t border-yellow-400/20 pt-2 space-y-2">
                  <div className="text-xs text-gray-400">
                    Recent Activities:
                  </div>
                  {flourishAccount.transactions
                    .slice(0, 3)
                    .map((transaction) => (
                      <div
                        key={transaction.id}
                        className="flex items-center justify-between text-xs"
                      >
                        <span className="text-gray-300">
                          {transaction.description}
                        </span>
                        <span
                          className={`font-semibold ${
                            transaction.type === "earned"
                              ? "text-green-400"
                              : "text-red-400"
                          }`}
                        >
                          {transaction.type === "earned" ? "+" : "-"}
                          {transaction.amount.total}
                        </span>
                      </div>
                    ))}
                </div>

                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => navigate("/billing?tab=flourish")}
                    className="flex-1 border-yellow-400/30 text-yellow-400 hover:bg-yellow-400/10"
                  >
                    <Coins className="w-3 h-3 mr-1" />
                    Manage
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      // Simulate earning Flourish for viewing balance
                      generateFlourish("balance_check", {
                        wisdom: 1,
                        total: 1,
                      });
                    }}
                    className="flex-1 border-green-400/30 text-green-400 hover:bg-green-400/10"
                  >
                    <Gift className="w-3 h-3 mr-1" />
                    Earn More
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FlourishDisplay;
