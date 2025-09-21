import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, Users, MapPin, Music, Calendar, ChevronRight, Star } from 'lucide-react';
import { SignUpForm } from './SignUpForm';
import { SignInForm } from './SignInForm';
import { Button } from './ui/button';
import Tilt from 'react-parallax-tilt';

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
}

const features: Feature[] = [
  {
    icon: <Heart className="w-6 h-6" />,
    title: "Smart Matching",
    description: "AI-powered matching based on interests and music taste",
    color: "from-pink-500 to-red-500"
  },
  {
    icon: <Music className="w-6 h-6" />,
    title: "Music Compatibility",
    description: "Connect Spotify or Apple Music to find your vibe match",
    color: "from-green-500 to-emerald-500"
  },
  {
    icon: <MapPin className="w-6 h-6" />,
    title: "ASU Date Ideas",
    description: "Curated date spots around all ASU campuses",
    color: "from-blue-500 to-purple-500"
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "Verified Students",
    description: "Only real ASU students can join our community",
    color: "from-yellow-500 to-orange-500"
  }
];

const testimonials = [
  {
    name: "Sarah M.",
    year: "Junior",
    text: "Found my perfect study buddy who turned into something more! 💕",
    rating: 5
  },
  {
    name: "Mike D.",
    year: "Senior",
    text: "The music matching feature is amazing! We bonded over our playlists.",
    rating: 5
  },
  {
    name: "Emma L.",
    year: "Sophomore",
    text: "Love the date ideas! Discovered so many cool spots around campus.",
    rating: 5
  }
];

export function EnhancedLanding({ onAuth }: { onAuth: () => void }) {
  const [isSignUp, setIsSignUp] = useState(true);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [floatingElements, setFloatingElements] = useState<number[]>([]);

  useEffect(() => {
    // Auto-rotate testimonials
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);

    // Generate floating elements
    const floatInterval = setInterval(() => {
      setFloatingElements(prev => [...prev, Date.now()]);
      setTimeout(() => {
        setFloatingElements(prev => prev.slice(1));
      }, 10000);
    }, 3000);

    return () => {
      clearInterval(interval);
      clearInterval(floatInterval);
    };
  }, []);

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#8C2F39]/20 via-purple-900/20 to-black animate-gradient-xy" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
      </div>

      {/* Floating Elements */}
      <AnimatePresence>
        {floatingElements.map((id) => (
          <motion.div
            key={id}
            className="absolute pointer-events-none"
            initial={{ 
              x: Math.random() * window.innerWidth,
              y: window.innerHeight + 100,
              rotate: 0
            }}
            animate={{ 
              y: -100,
              rotate: 360,
              x: Math.random() * window.innerWidth
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 10, ease: "linear" }}
          >
            <div className="text-4xl opacity-20">
              {Math.random() > 0.5 ? '💕' : '⭐'}
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Main Content */}
      <div className="relative z-10">
        {/* Hero Header */}
        <motion.div 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-r from-[#8C2F39] via-[#A63744] to-[#8C2F39] px-6 py-6 backdrop-blur-xl bg-opacity-90 border-b border-white/10"
        >
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="w-14 h-14 bg-gradient-to-br from-[#6B2331] to-[#8C2F39] rounded-full flex items-center justify-center shadow-2xl border border-white/20"
              >
                <Heart className="w-8 h-8 text-white drop-shadow-glow-pink" />
              </motion.div>
              <div>
                <h1 className="text-white font-bold text-2xl flex items-center gap-2">
                  Sun Devil Match
                  <Sparkles className="w-6 h-6 text-yellow-400 animate-pulse" />
                </h1>
                <p className="text-white/90 text-sm">Where Sun Devils Find Love</p>
              </div>
            </div>
            
            <div className="hidden md:flex items-center gap-6">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="text-white/80 hover:text-white cursor-pointer"
              >
                About
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="text-white/80 hover:text-white cursor-pointer"
              >
                Features
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="text-white/80 hover:text-white cursor-pointer"
              >
                Safety
              </motion.div>
            </div>
          </div>
        </motion.div>

        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Hero Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h2 className="text-5xl lg:text-6xl font-bold text-white mb-6">
                Find Your
                <span className="block gradient-text">Perfect Match</span>
                at ASU
              </h2>
              
              <p className="text-gray-300 text-lg mb-8">
                Join thousands of Sun Devils who've found love, friendship, and unforgettable 
                connections. With music matching, verified profiles, and curated date ideas 
                around campus.
              </p>

              {/* Feature Pills */}
              <div className="flex flex-wrap gap-3 mb-8">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 px-4 py-2 rounded-full"
                >
                  <span className="text-green-400 text-sm">🎵 Music Matching</span>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 px-4 py-2 rounded-full"
                >
                  <span className="text-purple-400 text-sm">📍 Campus Date Ideas</span>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 px-4 py-2 rounded-full"
                >
                  <span className="text-yellow-400 text-sm">✓ ASU Verified</span>
                </motion.div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-center"
                >
                  <div className="text-3xl font-bold text-white">10K+</div>
                  <div className="text-gray-400 text-sm">Active Users</div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-center"
                >
                  <div className="text-3xl font-bold text-white">500+</div>
                  <div className="text-gray-400 text-sm">Daily Matches</div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="text-center"
                >
                  <div className="text-3xl font-bold text-white">4.8⭐</div>
                  <div className="text-gray-400 text-sm">App Rating</div>
                </motion.div>
              </div>

              {/* Testimonials Carousel */}
              <div className="bg-gradient-to-r from-gray-900/50 to-gray-800/50 rounded-2xl p-6 backdrop-blur-sm border border-white/10">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTestimonial}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold">
                        {testimonials[activeTestimonial].name[0]}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-white font-medium">
                            {testimonials[activeTestimonial].name}
                          </span>
                          <span className="text-gray-400 text-sm">
                            • {testimonials[activeTestimonial].year}
                          </span>
                          <div className="flex gap-1 ml-auto">
                            {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                            ))}
                          </div>
                        </div>
                        <p className="text-gray-300 italic">
                          "{testimonials[activeTestimonial].text}"
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
                
                {/* Testimonial Indicators */}
                <div className="flex justify-center gap-2 mt-4">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveTestimonial(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === activeTestimonial 
                          ? 'w-8 bg-yellow-400' 
                          : 'bg-gray-600 hover:bg-gray-500'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right Side - Auth Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <Tilt
                tiltMaxAngleX={5}
                tiltMaxAngleY={5}
                perspective={1000}
                scale={1.02}
                transitionSpeed={2000}
              >
                <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-3xl p-8 border border-white/10 shadow-2xl">
                  {/* Form Tabs */}
                  <div className="flex gap-2 mb-6">
                    <button
                      onClick={() => setIsSignUp(true)}
                      className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all ${
                        isSignUp
                          ? 'bg-gradient-to-r from-[#8C2F39] to-[#A63744] text-white shadow-lg'
                          : 'bg-gray-800 text-gray-400 hover:text-white'
                      }`}
                    >
                      Sign Up
                    </button>
                    <button
                      onClick={() => setIsSignUp(false)}
                      className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all ${
                        !isSignUp
                          ? 'bg-gradient-to-r from-[#8C2F39] to-[#A63744] text-white shadow-lg'
                          : 'bg-gray-800 text-gray-400 hover:text-white'
                      }`}
                    >
                      Sign In
                    </button>
                  </div>

                  {/* Form Content */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={isSignUp ? 'signup' : 'signin'}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      {isSignUp ? <SignUpForm /> : <SignInForm onToggleMode={() => setIsSignUp(true)} />}
                    </motion.div>
                  </AnimatePresence>

                  {/* ASU Verification Badge */}
                  <div className="mt-6 p-4 bg-gradient-to-r from-yellow-900/20 to-orange-900/20 border border-yellow-700/30 rounded-xl">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-black text-sm">✓</span>
                      </div>
                      <div>
                        <h4 className="text-yellow-400 font-medium mb-1">ASU Student Verification</h4>
                        <p className="text-yellow-200/80 text-xs">
                          Only verified ASU students can join. We'll send a verification 
                          email to your @asu.edu address.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Tilt>
            </motion.div>
          </div>

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-20 grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 rounded-2xl p-6 border border-white/10 backdrop-blur-sm hover:border-white/20 transition-all"
              >
                <div className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center text-white mb-4`}>
                  {feature.icon}
                </div>
                <h3 className="text-white font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}