import { useState, useEffect } from 'react';
import { MapPin, GraduationCap, Music, X, Heart, ChevronLeft, ChevronRight, Sparkles, Star, Info, Coffee, Film } from 'lucide-react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import Confetti from 'react-confetti';
import { toast, Toaster } from 'react-hot-toast';
import Tilt from 'react-parallax-tilt';
import { useSpring, animated } from '@react-spring/web';

interface Profile {
  id: string;
  name: string;
  age: number;
  distance: number;
  major: string;
  year: string;
  bio: string;
  interests: string[];
  photos: string[];
  musicTaste?: {
    platform: 'spotify' | 'apple';
    topArtists?: string[];
    topGenres?: string[];
    favoriteTrack?: string;
  };
  verificationBadges?: string[];
}

// Enhanced mock data
const mockProfiles: Profile[] = [
  {
    id: '1',
    name: 'Emma',
    age: 20,
    distance: 0.5,
    major: 'Business Administration',
    year: 'Junior',
    bio: 'Love hiking Camelback Mountain and trying new restaurants in Tempe! Always down for a study session at the MU or catching a Sun Devils game. 🌵',
    interests: ['Hiking', 'Sun Devils Sports', 'Photography', 'Coffee', 'Live Music'],
    photos: ['/api/placeholder/400/600'],
    musicTaste: {
      platform: 'spotify',
      topArtists: ['Taylor Swift', 'The Weeknd', 'Doja Cat'],
      topGenres: ['Pop', 'R&B', 'Indie'],
      favoriteTrack: 'Anti-Hero - Taylor Swift'
    },
    verificationBadges: ['ASU Verified', 'Photo Verified']
  },
  {
    id: '2',
    name: 'Jake',
    age: 21,
    distance: 1.2,
    major: 'Computer Science',
    year: 'Senior',
    bio: 'CS major who loves coding and coffee. You\'ll find me at Noble Library or playing volleyball at the SDFC. Let\'s grab boba at Tea Swirl! 🧋',
    interests: ['Coding', 'Volleyball', 'Gaming', 'Boba', 'Hiking'],
    photos: ['/api/placeholder/400/600'],
    musicTaste: {
      platform: 'apple',
      topArtists: ['Drake', 'Travis Scott', 'Metro Boomin'],
      topGenres: ['Hip Hop', 'Rap', 'Electronic'],
      favoriteTrack: 'First Person Shooter - Drake'
    },
    verificationBadges: ['ASU Verified']
  }
];

export function EnhancedDiscoverScreen() {
  const [profiles, setProfiles] = useState<Profile[]>(mockProfiles);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [showMatch, setShowMatch] = useState(false);
  const [showSuperLike, setShowSuperLike] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const controls = useAnimation();
  
  const currentProfile = profiles[currentIndex];

  // Spring animation for card entrance
  const cardSpring = useSpring({
    from: { scale: 0.8, opacity: 0, rotateY: 180 },
    to: { scale: 1, opacity: 1, rotateY: 0 },
    config: { tension: 200, friction: 20 },
    reset: true,
  });

  // Play sound effect
  const playSound = (type: 'like' | 'pass' | 'match') => {
    // In a real app, you'd play actual sound files
    if (type === 'match') {
      toast.success('It\'s a match! 🎉', {
        duration: 4000,
        position: 'top-center',
        style: {
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          fontSize: '18px',
          padding: '16px',
        },
        icon: '💕',
      });
    }
  };

  const handleSwipe = async (swipeDirection: 'left' | 'right') => {
    // Haptic feedback (for mobile devices)
    if ('vibrate' in navigator) {
      navigator.vibrate(50);
    }

    if (swipeDirection === 'right') {
      // Simulate match randomly
      const isMatch = Math.random() > 0.5;
      if (isMatch) {
        setShowMatch(true);
        playSound('match');
        setTimeout(() => setShowMatch(false), 3000);
      } else {
        playSound('like');
        toast('Liked! 💖 Keep swiping to find your match!', {
          icon: '👍',
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          },
        });
      }
    } else {
      playSound('pass');
    }

    // Animate card exit
    await controls.start({
      x: swipeDirection === 'left' ? -window.innerWidth : window.innerWidth,
      rotate: swipeDirection === 'left' ? -30 : 30,
      opacity: 0,
      transition: { duration: 0.5 }
    });

    // Move to next profile
    if (currentIndex < profiles.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setCurrentPhotoIndex(0);
      setIsFlipped(false);
    } else {
      setCurrentIndex(0);
    }

    // Reset card position
    controls.set({ x: 0, rotate: 0, opacity: 1 });
  };

  const handleSuperLike = () => {
    setShowSuperLike(true);
    toast('Super Liked! ⭐ They\'ll definitely notice you!', {
      icon: '🌟',
      duration: 3000,
      style: {
        borderRadius: '10px',
        background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        color: '#fff',
      },
    });
    setTimeout(() => {
      setShowSuperLike(false);
      handleSwipe('right');
    }, 1500);
  };

  if (!currentProfile) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] px-4">
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="text-6xl mb-4"
        >
          😊
        </motion.div>
        <h2 className="text-white text-2xl font-semibold mb-2">No more profiles!</h2>
        <p className="text-gray-400 text-center">Check back later for more Sun Devils to match with!</p>
      </div>
    );
  }

  return (
    <>
      <Toaster />
      {showMatch && <Confetti width={window.innerWidth} height={window.innerHeight} />}
      
      <div className="relative min-h-[calc(100vh-140px)] flex items-center justify-center px-4">
        {/* Super Like Animation */}
        <AnimatePresence>
          {showSuperLike && (
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 3, rotate: 0, y: -100 }}
              exit={{ scale: 0, opacity: 0 }}
              className="absolute z-50 text-yellow-400"
            >
              <Star className="w-24 h-24 fill-yellow-400" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Profile Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentProfile.id}
            animate={controls}
            className="w-full max-w-md"
          >
            <Tilt
              tiltMaxAngleX={10}
              tiltMaxAngleY={10}
              perspective={1000}
              scale={1.02}
              transitionSpeed={2000}
              gyroscope={true}
            >
              <animated.div style={cardSpring}>
                <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-3xl overflow-hidden shadow-2xl border border-white/10">
                  {/* Glow Effect */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-pink-600 to-purple-600 rounded-3xl blur opacity-20 group-hover:opacity-30 transition duration-1000 group-hover:duration-200" />
                  
                  {/* Photo Section with Parallax */}
                  <div className="relative h-[500px] bg-gradient-to-b from-gray-700 to-gray-800 overflow-hidden">
                    {/* Verification Badges */}
                    {currentProfile.verificationBadges && (
                      <div className="absolute top-4 right-4 z-20 space-y-2">
                        {currentProfile.verificationBadges.map((badge) => (
                          <motion.div
                            key={badge}
                            initial={{ x: 100, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            className="bg-green-500/20 backdrop-blur-md border border-green-400/50 text-green-400 text-xs px-3 py-1 rounded-full flex items-center gap-1"
                          >
                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                            {badge}
                          </motion.div>
                        ))}
                      </div>
                    )}

                    {/* Photo Navigation with Progress Bar */}
                    {currentProfile.photos.length > 1 && (
                      <div className="absolute top-4 left-4 right-16 flex gap-1 z-20">
                        {currentProfile.photos.map((_, index) => (
                          <div
                            key={index}
                            className="h-1 flex-1 bg-white/20 rounded-full overflow-hidden"
                          >
                            <motion.div
                              className="h-full bg-white"
                              initial={{ width: "0%" }}
                              animate={{ width: index <= currentPhotoIndex ? "100%" : "0%" }}
                              transition={{ duration: 0.3 }}
                            />
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Interactive Photo Area */}
                    <div className="absolute inset-0 flex">
                      <button
                        onClick={() => currentPhotoIndex > 0 && setCurrentPhotoIndex(currentPhotoIndex - 1)}
                        className="w-1/2 h-full"
                      />
                      <button
                        onClick={() => currentPhotoIndex < currentProfile.photos.length - 1 && setCurrentPhotoIndex(currentPhotoIndex + 1)}
                        className="w-1/2 h-full"
                      />
                    </div>

                    {/* Photo Placeholder with Gradient Animation */}
                    <div className="w-full h-full bg-gradient-to-b from-gray-600 to-gray-700 flex items-center justify-center">
                      <motion.div
                        animate={{ 
                          background: [
                            'linear-gradient(0deg, #667eea 0%, #764ba2 100%)',
                            'linear-gradient(180deg, #667eea 0%, #764ba2 100%)',
                            'linear-gradient(360deg, #667eea 0%, #764ba2 100%)',
                          ]
                        }}
                        transition={{ repeat: Infinity, duration: 5 }}
                        className="w-full h-full flex items-center justify-center"
                      >
                        <svg className="w-32 h-32 text-white/20" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                        </svg>
                      </motion.div>
                    </div>

                    {/* Profile Info Overlay with Glassmorphism */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/90 to-transparent p-6 backdrop-blur-sm">
                      <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        <div className="flex items-baseline gap-3 mb-2">
                          <h2 className="text-white text-3xl font-bold">{currentProfile.name}, {currentProfile.age}</h2>
                          <motion.span
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ repeat: Infinity, duration: 2 }}
                            className="text-gray-300 text-sm flex items-center gap-1"
                          >
                            <MapPin className="w-4 h-4" />
                            {currentProfile.distance} mi
                          </motion.span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-300">
                          <GraduationCap className="w-4 h-4" />
                          <span className="text-sm">{currentProfile.major} • {currentProfile.year}</span>
                        </div>
                      </motion.div>
                    </div>
                  </div>

                  {/* Flip Card for More Info */}
                  <motion.div
                    className="p-6 space-y-4"
                    animate={{ rotateX: isFlipped ? 180 : 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    {/* Bio with Typewriter Effect */}
                    <p className="text-gray-300">{currentProfile.bio}</p>

                    {/* Music Taste with Animated Background */}
                    {currentProfile.musicTaste && (
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="bg-gradient-to-r from-green-900/30 via-green-800/30 to-green-900/30 rounded-xl p-4 border border-green-700/30 backdrop-blur-sm"
                      >
                        <div className="flex items-center gap-2 mb-3">
                          <Music className="w-5 h-5 text-green-400 animate-pulse" />
                          <span className="text-green-400 font-medium">Music Match</span>
                          <span className="text-xs bg-green-500/20 text-green-300 px-2 py-1 rounded-full">
                            {currentProfile.musicTaste.platform === 'spotify' ? 'Spotify' : 'Apple Music'}
                          </span>
                        </div>
                        <div className="space-y-2">
                          <motion.div
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="text-sm text-gray-300"
                          >
                            <span className="text-gray-400">Now Playing:</span> {currentProfile.musicTaste.favoriteTrack}
                          </motion.div>
                          <div className="flex flex-wrap gap-2">
                            {currentProfile.musicTaste.topGenres?.map((genre, index) => (
                              <motion.span
                                key={genre}
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.1 * index }}
                                whileHover={{ scale: 1.1 }}
                                className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded-full cursor-pointer hover:bg-gray-700"
                              >
                                {genre}
                              </motion.span>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* Interactive Interests */}
                    <div>
                      <h3 className="text-white font-medium mb-3">Interests</h3>
                      <div className="flex flex-wrap gap-2">
                        {currentProfile.interests.map((interest, index) => (
                          <motion.span
                            key={interest}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.05 * index }}
                            whileHover={{ scale: 1.1, rotate: [-1, 1, -1, 0] }}
                            className="bg-gradient-to-r from-gray-800 to-gray-700 text-gray-300 px-3 py-1.5 rounded-full text-sm cursor-pointer hover:from-[#8C2F39] hover:to-[#A63744] hover:text-white transition-all"
                          >
                            {interest}
                          </motion.span>
                        ))}
                      </div>
                    </div>

                    {/* Quick Date Ideas Preview */}
                    <div className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 rounded-xl p-3 border border-purple-700/30">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Sparkles className="w-4 h-4 text-purple-400" />
                          <span className="text-purple-400 text-sm font-medium">Perfect Date Ideas</span>
                        </div>
                        <div className="flex gap-2">
                          <Coffee className="w-4 h-4 text-gray-400" />
                          <Film className="w-4 h-4 text-gray-400" />
                          <MapPin className="w-4 h-4 text-gray-400" />
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Enhanced Action Buttons */}
                  <div className="flex items-center justify-center gap-4 p-6 pt-0">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleSwipe('left')}
                      className="group relative w-16 h-16 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-red-500 flex items-center justify-center hover:from-red-500/20 hover:to-red-600/20 transition-all shadow-lg"
                    >
                      <div className="absolute inset-0 rounded-full bg-red-500 opacity-0 group-hover:opacity-20 blur-xl transition-opacity" />
                      <X className="w-8 h-8 text-red-500 group-hover:rotate-90 transition-transform" />
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.1, rotate: 360 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={handleSuperLike}
                      className="group relative w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg"
                    >
                      <div className="absolute inset-0 rounded-full bg-blue-400 opacity-0 group-hover:opacity-30 blur-xl transition-opacity" />
                      <Star className="w-6 h-6 text-white fill-white" />
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleSwipe('right')}
                      className="group relative w-16 h-16 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-green-500 flex items-center justify-center hover:from-green-500/20 hover:to-green-600/20 transition-all shadow-lg"
                    >
                      <div className="absolute inset-0 rounded-full bg-green-500 opacity-0 group-hover:opacity-20 blur-xl transition-opacity" />
                      <Heart className="w-8 h-8 text-green-500 group-hover:fill-green-500 transition-all" />
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setIsFlipped(!isFlipped)}
                      className="group relative w-14 h-14 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-lg"
                    >
                      <Info className="w-6 h-6 text-white" />
                    </motion.button>
                  </div>
                </div>
              </animated.div>
            </Tilt>
          </motion.div>
        </AnimatePresence>

        {/* Swipe Hints */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-8">
          <motion.div
            animate={{ x: [-5, 5, -5] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="text-gray-500 text-sm flex items-center gap-2"
          >
            <X className="w-4 h-4 text-red-500" />
            <span>Pass</span>
          </motion.div>
          <motion.div
            animate={{ y: [-5, 5, -5] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="text-gray-500 text-sm flex items-center gap-2"
          >
            <Star className="w-4 h-4 text-blue-500" />
            <span>Super Like</span>
          </motion.div>
          <motion.div
            animate={{ x: [5, -5, 5] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="text-gray-500 text-sm flex items-center gap-2"
          >
            <Heart className="w-4 h-4 text-green-500" />
            <span>Like</span>
          </motion.div>
        </div>
      </div>
    </>
  );
}