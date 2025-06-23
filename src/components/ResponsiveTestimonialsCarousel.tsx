import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ChevronLeft,
  ChevronRight,
  Star,
  Quote,
  Heart,
  ArrowRight,
  Play,
  Pause,
  ExternalLink,
} from "lucide-react";

interface Testimonial {
  id: string;
  name: string;
  title: string;
  company: string;
  content: string;
  rating: number;
  avatar?: string;
  projectType: string;
  outcome: string;
  timeframe: string;
  featured?: boolean;
  videoUrl?: string;
  linkUrl?: string;
}

interface ResponsiveTestimonialsCarouselProps {
  testimonials?: Testimonial[];
  autoPlay?: boolean;
  showRatings?: boolean;
  showProjectDetails?: boolean;
  variant?: "default" | "minimal" | "featured";
  className?: string;
}

const ResponsiveTestimonialsCarousel: React.FC<
  ResponsiveTestimonialsCarouselProps
> = ({
  testimonials: propTestimonials,
  autoPlay = true,
  showRatings = true,
  showProjectDetails = true,
  variant = "default",
  className = "",
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const defaultTestimonials: Testimonial[] = [
    {
      id: "1",
      name: "Dr. Sarah Chen",
      title: "CTO",
      company: "EcoTech Solutions",
      content:
        'The quantum-sacred architecture transformed our entire platform. Users report feeling more "at home" in our digital spaces. The 340% performance improvement was beyond our wildest expectations.',
      rating: 5,
      projectType: "Quantum-Sacred Architecture",
      outcome: "340% Performance Boost",
      timeframe: "4 weeks",
      featured: true,
    },
    {
      id: "2",
      name: "Maria Santos",
      title: "Director",
      company: "River Commons",
      content:
        "Our bioregional AI understands our watershed better than any previous system. It feels like having a digital elder who truly comprehends the land and community wisdom.",
      rating: 5,
      projectType: "Bioregional AI Training",
      outcome: "Cultural Integration Success",
      timeframe: "3 weeks",
      featured: false,
    },
    {
      id: "3",
      name: "Alex Rivera",
      title: "Lead Developer",
      company: "MindFlow Technologies",
      content:
        "The collective code review process caught patterns we never would have seen individually. Our code is now more elegant, effective, and truly serves consciousness.",
      rating: 5,
      projectType: "Collective Code Review",
      outcome: "95% Bug Reduction",
      timeframe: "2 weeks",
    },
    {
      id: "4",
      name: "Forest Williams",
      title: "Founder",
      company: "ReGen Collective",
      content:
        "Our regenerative platform doesn't just minimize harm—it actively heals our community and environment. The technology feels alive and responsive to our deepest values.",
      rating: 5,
      projectType: "Regenerative Systems Design",
      outcome: "Net Positive Impact",
      timeframe: "8 weeks",
      featured: true,
    },
    {
      id: "5",
      name: "Dr. Luna Starweaver",
      title: "Security Architect",
      company: "Cosmic Security Corp",
      content:
        "Sacred security feels like natural protection rather than barriers. Users love the seamless, consciousness-based access. We've achieved zero breaches with enhanced user experience.",
      rating: 5,
      projectType: "Sacred Security Protocols",
      outcome: "Zero Breach Record",
      timeframe: "6 weeks",
    },
    {
      id: "6",
      name: "Kai Thompson",
      title: "Product Manager",
      company: "Future Systems Inc",
      content:
        "Working with a ritual technologist changed our understanding of what technology can be. Every system now serves consciousness first, and the results speak for themselves.",
      rating: 5,
      projectType: "Consciousness-First Design",
      outcome: "User Satisfaction 98%",
      timeframe: "5 weeks",
    },
  ];

  const testimonials = propTestimonials || defaultTestimonials;

  // Touch handling for mobile
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextTestimonial();
    } else if (isRightSwipe) {
      prevTestimonial();
    }
  };

  // Navigation functions
  const nextTestimonial = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const prevTestimonial = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length,
    );
  };

  // Auto-play functionality
  useEffect(() => {
    if (isPlaying && testimonials.length > 1) {
      const interval = setInterval(nextTestimonial, 5000);
      return () => clearInterval(interval);
    }
  }, [isPlaying, nextTestimonial, testimonials.length]);

  const currentTestimonial = testimonials[currentIndex];

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center space-x-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < rating ? "text-yellow-400 fill-current" : "text-gray-600"
            }`}
          />
        ))}
      </div>
    );
  };

  if (variant === "minimal") {
    return (
      <div className={`${className}`}>
        <Card className="bg-black/40 border-purple-500/30 backdrop-blur-md">
          <CardContent className="p-6">
            <div className="text-center space-y-4">
              <Quote className="w-8 h-8 text-purple-400 mx-auto" />
              <p className="text-gray-300 italic leading-relaxed">
                "{currentTestimonial.content}"
              </p>
              <div>
                <p className="text-white font-semibold">
                  {currentTestimonial.name}
                </p>
                <p className="text-gray-400 text-sm">
                  {currentTestimonial.title}, {currentTestimonial.company}
                </p>
              </div>
              {showRatings && renderStars(currentTestimonial.rating)}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-2xl sm:text-3xl font-bold text-white">
            Client Testimonials
          </h3>
          <p className="text-gray-400 mt-1">
            Sacred technology transformations in action
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsPlaying(!isPlaying)}
            className="text-purple-400 hover:bg-purple-500/20 hidden sm:flex"
          >
            {isPlaying ? (
              <Pause className="w-4 h-4" />
            ) : (
              <Play className="w-4 h-4" />
            )}
          </Button>

          <div className="flex items-center space-x-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={prevTestimonial}
              className="text-purple-400 hover:bg-purple-500/20"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={nextTestimonial}
              className="text-purple-400 hover:bg-purple-500/20"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Main Carousel */}
      <div className="relative overflow-hidden rounded-lg">
        <div
          className="touch-pan-x"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -300 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <Card className="bg-black/40 border-purple-500/30 backdrop-blur-md overflow-hidden">
                {currentTestimonial.featured && (
                  <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 p-2">
                    <div className="flex items-center justify-center space-x-2">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-yellow-400 text-sm font-semibold">
                        Featured Success Story
                      </span>
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    </div>
                  </div>
                )}

                <CardContent className="p-6 sm:p-8">
                  <div className="grid lg:grid-cols-3 gap-6">
                    {/* Testimonial Content */}
                    <div className="lg:col-span-2 space-y-6">
                      <div className="relative">
                        <Quote className="absolute -top-2 -left-2 w-8 h-8 text-purple-400/50" />
                        <blockquote className="text-gray-200 text-lg leading-relaxed pl-6">
                          "{currentTestimonial.content}"
                        </blockquote>
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                        <div>
                          <h4 className="text-white font-bold text-lg">
                            {currentTestimonial.name}
                          </h4>
                          <p className="text-purple-400 font-medium">
                            {currentTestimonial.title}
                          </p>
                          <p className="text-gray-400 text-sm">
                            {currentTestimonial.company}
                          </p>
                        </div>

                        {showRatings && (
                          <div className="flex items-center space-x-2">
                            {renderStars(currentTestimonial.rating)}
                            <span className="text-gray-400 text-sm ml-2">
                              {currentTestimonial.rating}/5
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Project Details */}
                    {showProjectDetails && (
                      <div className="bg-black/20 rounded-lg p-4 space-y-4">
                        <h5 className="text-white font-semibold">
                          Project Details
                        </h5>

                        <div className="space-y-3">
                          <div>
                            <span className="text-gray-400 text-sm block">
                              Service Type
                            </span>
                            <Badge
                              variant="outline"
                              className="border-purple-500/30 text-purple-300 mt-1"
                            >
                              {currentTestimonial.projectType}
                            </Badge>
                          </div>

                          <div>
                            <span className="text-gray-400 text-sm block">
                              Key Outcome
                            </span>
                            <Badge
                              variant="outline"
                              className="border-green-500/30 text-green-300 mt-1"
                            >
                              {currentTestimonial.outcome}
                            </Badge>
                          </div>

                          <div>
                            <span className="text-gray-400 text-sm block">
                              Timeline
                            </span>
                            <Badge
                              variant="outline"
                              className="border-cyan-500/30 text-cyan-300 mt-1"
                            >
                              {currentTestimonial.timeframe}
                            </Badge>
                          </div>
                        </div>

                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full border-purple-500 text-purple-400 hover:bg-purple-500/20"
                          onClick={() =>
                            window.open(
                              "mailto:ritual@civica144.com?subject=Similar Project Inquiry",
                              "_blank",
                            )
                          }
                        >
                          Similar Project?
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Progress Indicators */}
      <div className="flex justify-center mt-6 space-x-2">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "bg-purple-400 w-8"
                : "bg-gray-600 hover:bg-gray-500"
            }`}
          />
        ))}
      </div>

      {/* Quick Navigation (Mobile) */}
      <div className="flex justify-center mt-4 space-x-2 sm:hidden">
        {testimonials.slice(0, 3).map((testimonial, index) => (
          <Button
            key={testimonial.id}
            variant="ghost"
            size="sm"
            onClick={() => setCurrentIndex(index)}
            className={`text-xs px-2 py-1 h-auto ${
              index === currentIndex
                ? "bg-purple-500/20 text-purple-300 border border-purple-500/30"
                : "text-gray-400 hover:text-white"
            }`}
          >
            {testimonial.name.split(" ")[0]}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default ResponsiveTestimonialsCarousel;
