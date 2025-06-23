import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Shield,
  Clock,
  RotateCcw,
  Heart,
  Globe,
  Sparkles,
  CheckCircle,
  AlertTriangle,
  Info,
  Star,
  Leaf,
  Users,
} from "lucide-react";

const SacredPaymentTerms: React.FC = () => {
  const terms = [
    {
      icon: <Heart className="w-5 h-5" />,
      title: "Consent-based Billing",
      description:
        "All services include ritual briefing and opt-in contract scroll",
      color: "text-pink-400",
    },
    {
      icon: <Clock className="w-5 h-5" />,
      title: "Delivery Cycle",
      description: "Standard is 5–10 days unless retainer-based",
      color: "text-blue-400",
    },
    {
      icon: <Shield className="w-5 h-5" />,
      title: "Invoicing",
      description:
        'Via Paystack or PayPal, optional poetic "ritual receipt" PDF',
      color: "text-green-400",
    },
    {
      icon: <RotateCcw className="w-5 h-5" />,
      title: "Revisions",
      description:
        "1–2 included per scroll or ritual, more available at +$55 each",
      color: "text-yellow-400",
    },
    {
      icon: <Star className="w-5 h-5" />,
      title: "Refunds",
      description:
        "Full refund offered if alignment is not felt within 3 days of contract scroll",
      color: "text-purple-400",
    },
  ];

  const paymentMethods = [
    {
      name: "Paystack",
      description: "Ideal for Africa-based payments",
      features: ["Cards", "Bank Transfers", "Mobile Money", "USSD"],
      supports: "One-time or recurring via API or hosted pages",
      icon: "💳",
      color: "bg-blue-500/20 border-blue-400/20",
    },
    {
      name: "PayPal",
      description: "Global accessibility",
      features: [
        "PayPal.Me links",
        "Direct invoices",
        "Auto-renewing subscriptions",
      ],
      supports: "Client invoicing and freelance payments",
      icon: "🌍",
      color: "bg-yellow-500/20 border-yellow-400/20",
    },
  ];

  const flourishOptions = [
    {
      mode: "Flourish Credit",
      icon: "🔁",
      description: "Accept Flourish tokens in lieu of fiat",
      conditions: "Convert internally or track for reciprocity",
      color: "text-cyan-400",
    },
    {
      mode: "Blessing Mode",
      icon: "🙏",
      description: 'Users can "Bless" your service',
      conditions: "Non-financial offering, testimonial, or invitation",
      color: "text-purple-400",
    },
    {
      mode: "Sacred Barter",
      icon: "🕊️",
      description: "Accept aligned skills or offerings",
      conditions: "From creators, builders, or land stewards",
      color: "text-green-400",
    },
    {
      mode: "Sliding Scale Ritual Access",
      icon: "📜",
      description: "Ceremonies or group scroll-forging workshops",
      conditions: "Allows regenerative equity",
      color: "text-orange-400",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
          Sacred Terms & Access Details
        </h2>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto">
          Transparent, consent-based billing aligned with regenerative
          principles and global justice
        </p>
      </div>

      {/* Core Terms */}
      <Card className="bg-gradient-to-br from-slate-900/50 to-purple-900/50 border-white/20 backdrop-blur-md">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-cyan-400">
            <Shield className="w-6 h-6" />
            <span>Sacred Billing Principles</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {terms.map((term, index) => (
              <div key={index} className="space-y-3">
                <div className={`flex items-center space-x-2 ${term.color}`}>
                  {term.icon}
                  <h3 className="font-semibold">{term.title}</h3>
                </div>
                <p className="text-sm text-gray-300 leading-relaxed">
                  {term.description}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Payment Methods */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {paymentMethods.map((method, index) => (
          <Card
            key={index}
            className={`${method.color} backdrop-blur-md border`}
          >
            <CardHeader>
              <CardTitle className="flex items-center space-x-3 text-white">
                <span className="text-2xl">{method.icon}</span>
                <div>
                  <div>{method.name}</div>
                  <div className="text-sm font-normal text-gray-300">
                    {method.description}
                  </div>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold text-white mb-2">Accepts:</h4>
                <div className="flex flex-wrap gap-2">
                  {method.features.map((feature, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-white mb-1">Supports:</h4>
                <p className="text-sm text-gray-300">{method.supports}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Flourish & Alternative Payment Options */}
      <Card className="bg-gradient-to-br from-green-500/20 to-purple-500/20 border-green-400/20 backdrop-blur-md">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-green-400">
            <Sparkles className="w-6 h-6" />
            <span>Flourish + Non-Fiat Payment Options</span>
            <Badge className="bg-purple-500/20 text-purple-400 border-purple-400/50">
              Sacred Economy Layer
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {flourishOptions.map((option, index) => (
              <div key={index} className="p-4 bg-black/20 rounded-lg space-y-3">
                <div className={`flex items-center space-x-3 ${option.color}`}>
                  <span className="text-2xl">{option.icon}</span>
                  <h3 className="font-semibold">{option.mode}</h3>
                </div>
                <p className="text-sm text-gray-300">{option.description}</p>
                <div className="text-xs text-gray-400 bg-black/20 p-2 rounded">
                  <strong>Conditions:</strong> {option.conditions}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Global Justice Pricing */}
      <Card className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border-blue-400/20 backdrop-blur-md">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-blue-400">
            <Globe className="w-6 h-6" />
            <span>Global Justice Pricing</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-300">
            All services adapt to local economic realities, ensuring sacred
            technology serves all beings regardless of geographic location or
            economic circumstances.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-green-500/10 border border-green-400/20 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Leaf className="w-4 h-4 text-green-400" />
                <span className="font-semibold text-green-400">
                  Global South
                </span>
              </div>
              <div className="text-2xl font-bold text-green-400 mb-1">
                75% off
              </div>
              <p className="text-xs text-gray-300">
                Supporting emerging consciousness
              </p>
            </div>

            <div className="p-4 bg-yellow-500/10 border border-yellow-400/20 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Users className="w-4 h-4 text-yellow-400" />
                <span className="font-semibold text-yellow-400">
                  Emerging Economies
                </span>
              </div>
              <div className="text-2xl font-bold text-yellow-400 mb-1">
                40% off
              </div>
              <p className="text-xs text-gray-300">
                Bridging economic transitions
              </p>
            </div>

            <div className="p-4 bg-purple-500/10 border border-purple-400/20 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Heart className="w-4 h-4 text-purple-400" />
                <span className="font-semibold text-purple-400">
                  Indigenous Communities
                </span>
              </div>
              <div className="text-2xl font-bold text-purple-400 mb-1">
                90% off
              </div>
              <p className="text-xs text-gray-300">Honoring ancestral wisdom</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sacred Guarantee */}
      <Card className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-purple-400/20 backdrop-blur-md">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-purple-400">
            <Star className="w-6 h-6" />
            <span>Sacred Technology Guarantee</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h3 className="font-semibold text-cyan-400 flex items-center space-x-2">
                <CheckCircle className="w-4 h-4" />
                <span>Our Sacred Promise</span>
              </h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>All services align with regenerative principles</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Wisdom-first approach to every engagement</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Community and planetary wellbeing prioritized</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Transparent and consent-based processes</span>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold text-orange-400 flex items-center space-x-2">
                <AlertTriangle className="w-4 h-4" />
                <span>Important Notes</span>
              </h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-start space-x-2">
                  <Info className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                  <span>
                    All prices include sacred blessing and intention setting
                  </span>
                </li>
                <li className="flex items-start space-x-2">
                  <Info className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                  <span>
                    Rush services available for +50% with 48-hour delivery
                  </span>
                </li>
                <li className="flex items-start space-x-2">
                  <Info className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                  <span>All contracts include ritual completion ceremony</span>
                </li>
                <li className="flex items-start space-x-2">
                  <Info className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                  <span>
                    Partial Flourish payment accepted for all services
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SacredPaymentTerms;
