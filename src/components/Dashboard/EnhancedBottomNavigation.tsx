import { Heart, Users, User, Settings, Home } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  path: string;
  notifications?: number;
}

export function EnhancedBottomNavigation() {
  const location = useLocation();
  const navigate = useNavigate();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const navItems: NavItem[] = [
    {
      id: 'discover',
      label: 'Discover',
      icon: <Heart className="w-6 h-6" />,
      path: '/dashboard/discover'
    },
    {
      id: 'matches',
      label: 'Matches',
      icon: <Users className="w-6 h-6" />,
      path: '/dashboard/matches',
      notifications: 3
    },
    {
      id: 'profile',
      label: 'Profile',
      icon: <User className="w-6 h-6" />,
      path: '/dashboard/profile'
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: <Settings className="w-6 h-6" />,
      path: '/dashboard/settings'
    }
  ];

  return (
    <motion.div 
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-0 left-0 right-0 z-50"
    >
      {/* Glassmorphism Background */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-xl border-t border-white/10" />
      
      {/* Gradient Border Animation */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#8C2F39] to-transparent animate-gradient-x" />
      
      <div className="relative flex items-center justify-around py-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          
          return (
            <motion.button
              key={item.id}
              onClick={() => navigate(item.path)}
              onHoverStart={() => setHoveredItem(item.id)}
              onHoverEnd={() => setHoveredItem(null)}
              className="relative flex flex-col items-center justify-center py-2 px-4 min-w-[80px]"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Active Background */}
              <AnimatePresence>
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-gradient-to-br from-[#8C2F39] to-[#A63744] rounded-xl"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </AnimatePresence>

              {/* Hover Glow Effect */}
              <AnimatePresence>
                {hoveredItem === item.id && !isActive && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/10 rounded-xl"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                  />
                )}
              </AnimatePresence>

              {/* Icon Container */}
              <motion.div
                className="relative z-10"
                animate={{
                  rotate: isActive ? [0, -10, 10, -10, 0] : 0,
                  y: isActive ? -2 : 0
                }}
                transition={{ duration: 0.5 }}
              >
                {/* Notification Badge */}
                {item.notifications && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 min-w-[20px] h-5 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center"
                  >
                    <span className="text-white text-xs font-bold px-1">
                      {item.notifications}
                    </span>
                    <motion.div
                      className="absolute inset-0 bg-red-400 rounded-full"
                      animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                    />
                  </motion.div>
                )}
                
                {/* Icon with Color Animation */}
                <motion.div
                  animate={{
                    color: isActive ? '#FFFFFF' : hoveredItem === item.id ? '#FFC627' : '#9CA3AF'
                  }}
                  transition={{ duration: 0.2 }}
                >
                  {item.icon}
                </motion.div>
              </motion.div>

              {/* Label */}
              <motion.span 
                className={`relative z-10 text-xs mt-1 font-medium transition-all duration-200 ${
                  isActive 
                    ? 'text-white' 
                    : hoveredItem === item.id
                    ? 'text-yellow-400'
                    : 'text-gray-400'
                }`}
                animate={{
                  y: isActive ? -2 : 0,
                  scale: isActive ? 1.05 : 1
                }}
              >
                {item.label}
              </motion.span>

              {/* Active Indicator Dot */}
              <AnimatePresence>
                {isActive && (
                  <motion.div
                    className="absolute bottom-0 w-1 h-1 bg-white rounded-full"
                    initial={{ scale: 0, y: 10 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0, y: 10 }}
                  />
                )}
              </AnimatePresence>
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}