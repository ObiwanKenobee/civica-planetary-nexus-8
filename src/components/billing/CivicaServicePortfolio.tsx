import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Sparkles,
  Clock,
  CheckCircle,
  Plus,
  Minus,
  ShoppingCart,
  CreditCard,
  Globe,
  Heart,
  Gift,
  Coins,
  Star,
  ArrowRight,
  Shield,
  Zap,
  Users,
  Leaf,
  Infinity,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  civicaServices,
  servicePackages,
  CIVICA_BILLING_PLANS,
  type CivicaService,
  type ServicePackage,
} from "@/data/billingPlans";

interface ServiceCartItem {
  serviceId: string;
  addOns: string[];
  customizations?: string;
}

interface PaymentOption {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  enabled: boolean;
  fee?: string;
}

const CivicaServicePortfolio: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState("services");
  const [cart, setCart] = useState<ServiceCartItem[]>([]);
  const [showPayment, setShowPayment] = useState(false);
  const [selectedService, setSelectedService] = useState<CivicaService | null>(
    null,
  );
  const [selectedPackage, setSelectedPackage] = useState<ServicePackage | null>(
    null,
  );
  const [showServiceDetails, setShowServiceDetails] = useState(false);
  const [currency, setCurrency] = useState<"USD" | "NGN" | "EUR" | "FLOURISH">(
    "USD",
  );

  const paymentOptions: PaymentOption[] = [
    {
      id: "paystack",
      name: "Paystack",
      icon: <CreditCard className="w-5 h-5" />,
      description: "Cards, Bank Transfer, Mobile Money",
      enabled: true,
      fee: "2.9%",
    },
    {
      id: "paypal",
      name: "PayPal",
      icon: <Globe className="w-5 h-5" />,
      description: "Global payment solution",
      enabled: true,
      fee: "3.4%",
    },
    {
      id: "flourish",
      name: "Flourish Tokens",
      icon: <Sparkles className="w-5 h-5" />,
      description: "Sacred economy currency",
      enabled: true,
      fee: "No fees",
    },
    {
      id: "barter",
      name: "Sacred Barter",
      icon: <Heart className="w-5 h-5" />,
      description: "Skills, wisdom, or offerings",
      enabled: true,
      fee: "Reciprocal",
    },
  ];

  const addToCart = (serviceId: string) => {
    setCart((prev) => [...prev, { serviceId, addOns: [] }]);
  };

  const removeFromCart = (serviceId: string) => {
    setCart((prev) => prev.filter((item) => item.serviceId !== serviceId));
  };

  const isInCart = (serviceId: string) => {
    return cart.some((item) => item.serviceId === serviceId);
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => {
      const service = civicaServices.find((s) => s.id === item.serviceId);
      const addOnTotal = item.addOns.reduce((addOnSum, addOnId) => {
        const addOn = service?.addOns.find((a) => a.id === addOnId);
        return addOnSum + (addOn?.price || 0);
      }, 0);
      return total + (service?.basePrice || 0) + addOnTotal;
    }, 0);
  };

  const convertPrice = (price: number) => {
    switch (currency) {
      case "NGN":
        return Math.round(price * 461); // Approximate USD to NGN
      case "EUR":
        return Math.round(price * 0.85); // Approximate USD to EUR
      case "FLOURISH":
        return Math.round(price * 5); // 1 USD = 5 Flourish
      default:
        return price;
    }
  };

  const getCurrencySymbol = () => {
    switch (currency) {
      case "NGN":
        return "₦";
      case "EUR":
        return "€";
      case "FLOURISH":
        return "✧";
      default:
        return "$";
    }
  };

  const ServiceCard: React.FC<{ service: CivicaService }> = ({ service }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      className="group"
    >
      <Card className="h-full bg-gradient-to-br from-slate-900/50 to-purple-900/50 border-white/20 backdrop-blur-md hover:border-cyan-400/50 transition-all duration-300">
        <CardHeader className="pb-4">
          <div className="flex items-start justify-between mb-3">
            <div className="text-3xl">{service.icon}</div>
            <Badge variant="outline" className="text-xs">
              {service.deliveryTime}
            </Badge>
          </div>
          <CardTitle className="text-lg text-white group-hover:text-cyan-400 transition-colors">
            {service.name}
          </CardTitle>
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-cyan-400">
              {getCurrencySymbol()}
              {convertPrice(service.basePrice).toLocaleString()}
            </div>
            {service.flourishPrice && currency === "FLOURISH" && (
              <div className="text-sm text-purple-400">
                ✧{service.flourishPrice} Flourish
              </div>
            )}
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <p className="text-sm text-gray-300 leading-relaxed">
            {service.description}
          </p>

          {/* Includes */}
          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-cyan-400">Includes:</h4>
            <div className="space-y-1">
              {service.includes.slice(0, 3).map((item, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-2 text-xs"
                >
                  <CheckCircle className="w-3 h-3 text-green-400 flex-shrink-0" />
                  <span className="text-gray-300">{item}</span>
                </div>
              ))}
              {service.includes.length > 3 && (
                <div className="text-xs text-gray-400">
                  +{service.includes.length - 3} more included...
                </div>
              )}
            </div>
          </div>

          {/* Add-ons */}
          {service.addOns.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-purple-400">
                Add-ons available:
              </h4>
              <div className="space-y-1">
                {service.addOns.slice(0, 2).map((addOn) => (
                  <div
                    key={addOn.id}
                    className="flex items-center justify-between text-xs"
                  >
                    <span className="text-gray-300">{addOn.name}</span>
                    <span className="text-yellow-400">
                      +{getCurrencySymbol()}
                      {convertPrice(addOn.price)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Payment Options */}
          <div className="flex items-center justify-center space-x-2 pt-2 border-t border-white/10">
            {service.paystackEnabled && (
              <div className="flex items-center space-x-1 text-xs text-blue-400">
                <CreditCard className="w-3 h-3" />
                <span>Paystack</span>
              </div>
            )}
            {service.paypalEnabled && (
              <div className="flex items-center space-x-1 text-xs text-yellow-400">
                <Globe className="w-3 h-3" />
                <span>PayPal</span>
              </div>
            )}
            {service.flourishPrice && (
              <div className="flex items-center space-x-1 text-xs text-purple-400">
                <Sparkles className="w-3 h-3" />
                <span>Flourish</span>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="space-y-2 pt-2">
            <Button
              onClick={() => {
                setSelectedService(service);
                setShowServiceDetails(true);
              }}
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
              size="sm"
            >
              <Zap className="w-4 h-4 mr-2" />
              View Details
            </Button>

            <div className="flex space-x-2">
              <Button
                onClick={() =>
                  isInCart(service.id)
                    ? removeFromCart(service.id)
                    : addToCart(service.id)
                }
                variant={isInCart(service.id) ? "destructive" : "outline"}
                className="flex-1"
                size="sm"
              >
                {isInCart(service.id) ? (
                  <>
                    <Minus className="w-3 h-3 mr-1" />
                    Remove
                  </>
                ) : (
                  <>
                    <Plus className="w-3 h-3 mr-1" />
                    Add to Cart
                  </>
                )}
              </Button>

              <Button
                onClick={() => {
                  if (!isInCart(service.id)) addToCart(service.id);
                  setShowPayment(true);
                }}
                className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                size="sm"
              >
                <ShoppingCart className="w-3 h-3 mr-1" />
                Buy Now
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

  const PackageCard: React.FC<{ pkg: ServicePackage }> = ({ pkg }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      className="group"
    >
      <Card
        className={`h-full transition-all duration-300 ${
          pkg.popular
            ? "bg-gradient-to-br from-purple-500/30 to-pink-500/30 border-purple-400 ring-2 ring-purple-400/50"
            : "bg-gradient-to-br from-slate-900/50 to-blue-900/50 border-white/20 hover:border-cyan-400/50"
        } backdrop-blur-md`}
      >
        {pkg.popular && (
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
            <Badge className="bg-gradient-to-r from-purple-500 to-pink-500">
              <Star className="w-3 h-3 mr-1" />
              Most Popular
            </Badge>
          </div>
        )}

        <CardHeader className="pb-4">
          <div className="flex items-start justify-between mb-3">
            <div className="text-3xl">{pkg.icon}</div>
            <Badge
              variant="outline"
              className="text-green-400 border-green-400"
            >
              Save {getCurrencySymbol()}
              {convertPrice(pkg.savings)}
            </Badge>
          </div>
          <CardTitle className="text-lg text-white group-hover:text-cyan-400 transition-colors">
            {pkg.name}
          </CardTitle>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <div className="text-2xl font-bold text-cyan-400">
                {getCurrencySymbol()}
                {convertPrice(pkg.packagePrice).toLocaleString()}
              </div>
              <div className="text-sm text-gray-400 line-through">
                {getCurrencySymbol()}
                {convertPrice(pkg.originalPrice).toLocaleString()}
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <p className="text-sm text-gray-300 leading-relaxed">
            {pkg.description}
          </p>

          {/* Included Services */}
          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-purple-400">
              Package Includes:
            </h4>
            <div className="space-y-2">
              {pkg.services.map((serviceId) => {
                const service = civicaServices.find((s) => s.id === serviceId);
                return service ? (
                  <div
                    key={serviceId}
                    className="flex items-center justify-between p-2 bg-black/20 rounded"
                  >
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">{service.icon}</span>
                      <span className="text-xs text-gray-300">
                        {service.name}
                      </span>
                    </div>
                    <span className="text-xs text-cyan-400">
                      {getCurrencySymbol()}
                      {convertPrice(service.basePrice)}
                    </span>
                  </div>
                ) : null;
              })}
            </div>
          </div>

          {/* Action Button */}
          <Button
            onClick={() => {
              setSelectedPackage(pkg);
              setShowPayment(true);
            }}
            className={`w-full ${
              pkg.popular
                ? "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                : "bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
            }`}
          >
            <Gift className="w-4 h-4 mr-2" />
            Get Package Deal
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent"
        >
          CIVICA-Aligned Billing Portfolio
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xl text-gray-300"
        >
          Powered by Paystack + PayPal + Flourish Integration
        </motion.p>

        {/* Currency Selector */}
        <div className="flex items-center justify-center space-x-2">
          <span className="text-sm text-gray-400">Currency:</span>
          <div className="flex rounded-lg overflow-hidden border border-white/20">
            {(["USD", "NGN", "EUR", "FLOURISH"] as const).map((curr) => (
              <button
                key={curr}
                onClick={() => setCurrency(curr)}
                className={`px-3 py-1 text-xs transition-colors ${
                  currency === curr
                    ? "bg-cyan-500 text-white"
                    : "bg-black/20 text-gray-400 hover:text-white"
                }`}
              >
                {curr === "FLOURISH" ? "✧ FLOURISH" : curr}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Payment Methods Info */}
      <Card className="bg-gradient-to-r from-green-500/20 to-blue-500/20 border-green-400/20 backdrop-blur-md">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-green-400 mb-4 flex items-center">
            <Shield className="w-5 h-5 mr-2" />
            Secure Payment Options
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {paymentOptions.map((option) => (
              <div
                key={option.id}
                className="flex items-center space-x-3 p-3 bg-black/20 rounded-lg"
              >
                <div className="text-cyan-400">{option.icon}</div>
                <div>
                  <div className="font-semibold text-white text-sm">
                    {option.name}
                  </div>
                  <div className="text-xs text-gray-400">
                    {option.description}
                  </div>
                  <div className="text-xs text-green-400">{option.fee}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Shopping Cart */}
      {cart.length > 0 && (
        <Card className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-400/20 backdrop-blur-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-purple-400 flex items-center">
                <ShoppingCart className="w-5 h-5 mr-2" />
                Sacred Cart ({cart.length} items)
              </h3>
              <div className="text-xl font-bold text-cyan-400">
                Total: {getCurrencySymbol()}
                {convertPrice(getCartTotal()).toLocaleString()}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {cart.map((item) => {
                const service = civicaServices.find(
                  (s) => s.id === item.serviceId,
                );
                return service ? (
                  <div
                    key={item.serviceId}
                    className="flex items-center justify-between p-3 bg-black/20 rounded-lg"
                  >
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">{service.icon}</span>
                      <span className="text-sm text-white">{service.name}</span>
                    </div>
                    <Button
                      onClick={() => removeFromCart(item.serviceId)}
                      variant="ghost"
                      size="sm"
                      className="text-red-400 hover:text-red-300"
                    >
                      <Minus className="w-3 h-3" />
                    </Button>
                  </div>
                ) : null;
              })}
            </div>
            <div className="flex justify-end mt-4">
              <Button
                onClick={() => setShowPayment(true)}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              >
                <CreditCard className="w-4 h-4 mr-2" />
                Proceed to Sacred Payment
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Services and Packages */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-3 bg-black/40 border border-white/20">
          <TabsTrigger
            value="services"
            className="data-[state=active]:bg-purple-500/50"
          >
            <Zap className="w-4 h-4 mr-2" />
            Core Services
          </TabsTrigger>
          <TabsTrigger
            value="packages"
            className="data-[state=active]:bg-cyan-500/50"
          >
            <Gift className="w-4 h-4 mr-2" />
            Package Bundles
          </TabsTrigger>
          <TabsTrigger
            value="custom"
            className="data-[state=active]:bg-green-500/50"
          >
            <Infinity className="w-4 h-4 mr-2" />
            Custom Solutions
          </TabsTrigger>
        </TabsList>

        <TabsContent value="services" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {civicaServices.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="packages" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {servicePackages.map((pkg) => (
              <PackageCard key={pkg.id} pkg={pkg} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="custom" className="space-y-6">
          <Card className="bg-gradient-to-br from-slate-900/50 to-purple-900/50 border-white/20 backdrop-blur-md">
            <CardContent className="p-8 text-center space-y-6">
              <div className="text-6xl">🛡️</div>
              <h3 className="text-2xl font-bold text-cyan-400">
                Enterprise & Custom Solutions
              </h3>
              <p className="text-gray-300 max-w-2xl mx-auto">
                For organizations requiring tailored CIVICA integration, custom
                DAO architectures, or enterprise-scale regenerative systems.
                Starting at $5,000 for comprehensive engagements.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
                <div className="p-4 bg-black/20 rounded-lg">
                  <h4 className="font-semibold text-purple-400 mb-2">
                    Custom DAO Development
                  </h4>
                  <p className="text-sm text-gray-300">
                    End-to-end governance systems with ritual integration
                  </p>
                </div>
                <div className="p-4 bg-black/20 rounded-lg">
                  <h4 className="font-semibold text-cyan-400 mb-2">
                    Enterprise Platform Integration
                  </h4>
                  <p className="text-sm text-gray-300">
                    CIVICA APIs and white-label solutions
                  </p>
                </div>
                <div className="p-4 bg-black/20 rounded-lg">
                  <h4 className="font-semibold text-green-400 mb-2">
                    Bioregional System Design
                  </h4>
                  <p className="text-sm text-gray-300">
                    Territory-specific regenerative frameworks
                  </p>
                </div>
                <div className="p-4 bg-black/20 rounded-lg">
                  <h4 className="font-semibold text-yellow-400 mb-2">
                    Strategic Partnership
                  </h4>
                  <p className="text-sm text-gray-300">
                    Long-term collaboration and co-creation
                  </p>
                </div>
              </div>
              <Button
                onClick={() => setShowPayment(true)}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                size="lg"
              >
                <Users className="w-5 h-5 mr-2" />
                Schedule Enterprise Consultation
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Service Details Modal */}
      <Dialog open={showServiceDetails} onOpenChange={setShowServiceDetails}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 border-white/20">
          {selectedService && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center space-x-3 text-cyan-400">
                  <span className="text-2xl">{selectedService.icon}</span>
                  <span>{selectedService.name}</span>
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">
                        Service Description
                      </h3>
                      <p className="text-gray-300">
                        {selectedService.description}
                      </p>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-cyan-400 mb-2">
                        What's Included
                      </h3>
                      <div className="space-y-2">
                        {selectedService.includes.map((item, index) => (
                          <div
                            key={index}
                            className="flex items-start space-x-2"
                          >
                            <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                            <span className="text-sm text-gray-300">
                              {item}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 bg-black/20 rounded-lg">
                      <h3 className="text-lg font-semibold text-purple-400 mb-2">
                        Investment
                      </h3>
                      <div className="text-3xl font-bold text-cyan-400 mb-1">
                        {getCurrencySymbol()}
                        {convertPrice(
                          selectedService.basePrice,
                        ).toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-400">
                        Delivery: {selectedService.deliveryTime}
                      </div>
                    </div>

                    {selectedService.addOns.length > 0 && (
                      <div>
                        <h3 className="text-lg font-semibold text-yellow-400 mb-2">
                          Available Add-ons
                        </h3>
                        <div className="space-y-2">
                          {selectedService.addOns.map((addOn) => (
                            <div
                              key={addOn.id}
                              className="flex items-center justify-between p-3 bg-black/20 rounded"
                            >
                              <div>
                                <div className="font-semibold text-white text-sm">
                                  {addOn.name}
                                </div>
                                <div className="text-xs text-gray-400">
                                  {addOn.description}
                                </div>
                              </div>
                              <div className="text-yellow-400 font-semibold">
                                +{getCurrencySymbol()}
                                {convertPrice(addOn.price)}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {selectedService.sacredBarterOptions && (
                      <div>
                        <h3 className="text-lg font-semibold text-green-400 mb-2">
                          Sacred Barter Options
                        </h3>
                        <div className="space-y-1">
                          {selectedService.sacredBarterOptions.map(
                            (option, index) => (
                              <div
                                key={index}
                                className="flex items-center space-x-2"
                              >
                                <Heart className="w-3 h-3 text-green-400" />
                                <span className="text-sm text-gray-300">
                                  {option}
                                </span>
                              </div>
                            ),
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button
                    onClick={() => {
                      if (!isInCart(selectedService.id))
                        addToCart(selectedService.id);
                      setShowServiceDetails(false);
                      setShowPayment(true);
                    }}
                    className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Begin Sacred Investment
                  </Button>
                  <Button
                    onClick={() => {
                      if (!isInCart(selectedService.id))
                        addToCart(selectedService.id);
                    }}
                    variant="outline"
                    className="border-cyan-400 text-cyan-400 hover:bg-cyan-400/20"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add to Cart
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Payment Modal - Placeholder for now */}
      <Dialog open={showPayment} onOpenChange={setShowPayment}>
        <DialogContent className="max-w-2xl bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 border-white/20">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2 text-cyan-400">
              <Shield className="w-5 h-5" />
              <span>Sacred Payment Portal</span>
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            <div className="text-center">
              <div className="text-4xl mb-2">🔮</div>
              <h3 className="text-xl font-bold text-white mb-2">
                Payment Integration Active
              </h3>
              <p className="text-gray-300">
                Paystack and PayPal integration is ready. This would connect to
                the secure payment forms for processing transactions with full
                fraud protection and sacred blessing protocols.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {paymentOptions.map((option) => (
                <Button
                  key={option.id}
                  variant="outline"
                  className="h-20 flex-col space-y-2 border-white/20 hover:bg-white/5"
                  disabled={!option.enabled}
                >
                  {option.icon}
                  <span className="text-sm">{option.name}</span>
                  <span className="text-xs text-gray-400">{option.fee}</span>
                </Button>
              ))}
            </div>

            <div className="text-center text-sm text-gray-400">
              All payments are secured with military-grade encryption and
              blessed through sacred protocols.
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CivicaServicePortfolio;
