import { Outlet, useLocation } from 'react-router-dom';
import { EnhancedBottomNavigation } from './EnhancedBottomNavigation';
import { Cactus, Sparkles, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import Particles from 'react-particles';
import { loadSlim } from 'tsparticles-slim';
import type { Container, Engine } from 'tsparticles-engine';
import { useCallback } from 'react';

export function EnhancedDashboardLayout() {
  const location = useLocation();
  const [isLoaded, setIsLoaded] = useState(false);
  const [floatingHearts, setFloatingHearts] = useState<number[]>([]);

  useEffect(() => {
    setIsLoaded(true);
    // Generate random floating hearts
    const interval = setInterval(() => {
      setFloatingHearts(prev => [...prev, Date.now()]);
      setTimeout(() => {
        setFloatingHearts(prev => prev.slice(1));
      }, 5000);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  const particlesLoaded = useCallback(async (container: Container | undefined) => {
    console.log('Particles loaded', container);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-600/20 via-purple-600/20 to-yellow-600/20 animate-gradient-xy" />
      </div>

      {/* Particle Background */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        className="absolute inset-0"
        options={{
          background: {
            color: {
              value: "transparent",
            },
          },
          fpsLimit: 120,
          interactivity: {
            events: {
              onClick: {
                enable: true,
                mode: "push",
              },
              onHover: {
                enable: true,
                mode: "repulse",
              },
              resize: true,
            },
            modes: {
              push: {
                quantity: 4,
              },
              repulse: {
                distance: 100,
                duration: 0.4,
              },
            },
          },
          particles: {
            color: {
              value: ["#8C2F39", "#FFC627", "#FF6B6B"],
            },
            links: {
              color: "#8C2F39",
              distance: 150,
              enable: true,
              opacity: 0.2,
              width: 1,
            },
            collisions: {
              enable: false,
            },
            move: {
              direction: "none",
              enable: true,
              outModes: {
                default: "bounce",
              },
              random: false,
              speed: 1,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                area: 800,
              },
              value: 40,
            },
            opacity: {
              value: 0.3,
            },
            shape: {
              type: "circle",
            },
            size: {
              value: { min: 1, max: 3 },
            },
          },
          detectRetina: true,
        }}
      />

      {/* Floating Hearts Animation */}
      <AnimatePresence>
        {floatingHearts.map((id) => (
          <motion.div
            key={id}
            className="absolute pointer-events-none"
            initial={{ 
              x: Math.random() * window.innerWidth,
              y: window.innerHeight + 50,
              rotate: Math.random() * 360
            }}
            animate={{ 
              y: -50,
              x: Math.random() * window.innerWidth,
              rotate: Math.random() * 360
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 5, ease: "easeOut" }}
          >
            <Heart className="w-8 h-8 text-pink-500/30 fill-pink-500/20" />
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Enhanced Header with Glassmorphism */}
      <motion.div 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100 }}
        className="bg-gradient-to-r from-[#8C2F39] via-[#A63744] to-[#8C2F39] px-4 py-3 sticky top-0 z-40 backdrop-blur-xl bg-opacity-90 border-b border-white/10 shadow-2xl"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <motion.div 
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.5 }}
              className="w-12 h-12 bg-gradient-to-br from-[#6B2331] to-[#8C2F39] rounded-full flex items-center justify-center shadow-lg border border-white/20"
            >
              <Cactus className="w-7 h-7 text-green-400 drop-shadow-glow" />
            </motion.div>
            <div>
              <h1 className="text-white font-bold text-xl flex items-center gap-2">
                Sun Devil Match
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 3 }}
                >
                  <Sparkles className="w-5 h-5 text-yellow-400" />
                </motion.div>
              </h1>
              <p className="text-white/90 text-xs font-light">ASU Dating & Date Planning</p>
            </div>
          </div>
          
          {/* Live Status Indicator */}
          <div className="flex items-center gap-2">
            <div className="relative">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
              <div className="absolute inset-0 w-3 h-3 bg-green-400 rounded-full animate-ping" />
            </div>
            <span className="text-white/80 text-xs">Online</span>
          </div>
        </div>
      </motion.div>

      {/* Main Content with Page Transitions */}
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className="pb-20 relative z-10"
        >
          <Outlet />
        </motion.div>
      </AnimatePresence>

      {/* Enhanced Bottom Navigation */}
      <EnhancedBottomNavigation />
    </div>
  );
}