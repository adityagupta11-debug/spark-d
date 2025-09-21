import { useState } from 'react';
import { MapPin, GraduationCap, Music, X, Heart, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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
}

// Mock data for demonstration
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
    }
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
    }
  },
  {
    id: '3',
    name: 'Sophia',
    age: 19,
    distance: 0.8,
    major: 'Psychology',
    year: 'Sophomore',
    bio: 'Psychology major with a passion for understanding people. Love sunset walks around Tempe Town Lake and studying at Hayden Library! 📚',
    interests: ['Reading', 'Yoga', 'Coffee', 'Art', 'Music Festivals'],
    photos: ['/api/placeholder/400/600'],
    musicTaste: {
      platform: 'spotify',
      topArtists: ['Lana Del Rey', 'Arctic Monkeys', 'The 1975'],
      topGenres: ['Alternative', 'Indie Rock', 'Dream Pop'],
      favoriteTrack: 'Young and Beautiful - Lana Del Rey'
    }
  }
];

export function DiscoverScreen() {
  const [profiles, setProfiles] = useState<Profile[]>(mockProfiles);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [direction, setDirection] = useState<'left' | 'right' | null>(null);

  const currentProfile = profiles[currentIndex];

  const handleSwipe = (swipeDirection: 'left' | 'right') => {
    setDirection(swipeDirection);
    setTimeout(() => {
      if (currentIndex < profiles.length - 1) {
        setCurrentIndex(currentIndex + 1);
        setCurrentPhotoIndex(0);
      } else {
        // Reset or load more profiles
        setCurrentIndex(0);
      }
      setDirection(null);
    }, 300);
  };

  const handleNextPhoto = () => {
    if (currentProfile && currentPhotoIndex < currentProfile.photos.length - 1) {
      setCurrentPhotoIndex(currentPhotoIndex + 1);
    }
  };

  const handlePrevPhoto = () => {
    if (currentPhotoIndex > 0) {
      setCurrentPhotoIndex(currentPhotoIndex - 1);
    }
  };

  if (!currentProfile) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] px-4">
        <div className="text-6xl mb-4">😊</div>
        <h2 className="text-white text-2xl font-semibold mb-2">No more profiles!</h2>
        <p className="text-gray-400 text-center">Check back later for more Sun Devils to match with!</p>
      </div>
    );
  }

  return (
    <div className="relative min-h-[calc(100vh-140px)]">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentProfile.id}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ 
            scale: 1, 
            opacity: 1,
            x: direction === 'left' ? -300 : direction === 'right' ? 300 : 0,
            rotate: direction === 'left' ? -30 : direction === 'right' ? 30 : 0
          }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="mx-4 mt-4"
        >
          <div className="relative bg-gray-900 rounded-2xl overflow-hidden max-w-md mx-auto">
            {/* Photo Section */}
            <div className="relative h-[500px] bg-gradient-to-b from-gray-700 to-gray-800">
              {/* Photo Navigation Dots */}
              {currentProfile.photos.length > 1 && (
                <div className="absolute top-4 left-0 right-0 flex justify-center gap-1 z-20">
                  {currentProfile.photos.map((_, index) => (
                    <div
                      key={index}
                      className={`h-1 w-12 rounded-full transition-colors ${
                        index === currentPhotoIndex ? 'bg-white' : 'bg-white/40'
                      }`}
                    />
                  ))}
                </div>
              )}

              {/* Photo Navigation Buttons */}
              {currentProfile.photos.length > 1 && (
                <>
                  <button
                    onClick={handlePrevPhoto}
                    className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/20 text-white z-20"
                    disabled={currentPhotoIndex === 0}
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={handleNextPhoto}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/20 text-white z-20"
                    disabled={currentPhotoIndex === currentProfile.photos.length - 1}
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}

              {/* Placeholder for photo */}
              <div className="w-full h-full bg-gradient-to-b from-gray-600 to-gray-700 flex items-center justify-center">
                <div className="text-gray-500">
                  <svg className="w-32 h-32" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>

              {/* Profile Info Overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent p-6">
                <div className="flex items-baseline gap-3 mb-2">
                  <h2 className="text-white text-3xl font-semibold">{currentProfile.name}, {currentProfile.age}</h2>
                  <span className="text-gray-300 text-sm flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {currentProfile.distance} mi
                  </span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <GraduationCap className="w-4 h-4" />
                  <span className="text-sm">{currentProfile.major} • {currentProfile.year}</span>
                </div>
              </div>
            </div>

            {/* Bio and Details */}
            <div className="p-6 space-y-4">
              <p className="text-gray-300">{currentProfile.bio}</p>

              {/* Music Taste Section */}
              {currentProfile.musicTaste && (
                <div className="bg-gradient-to-r from-green-900/20 to-green-800/20 rounded-lg p-4 border border-green-700/30">
                  <div className="flex items-center gap-2 mb-3">
                    <Music className="w-5 h-5 text-green-400" />
                    <span className="text-green-400 font-medium">Music Match</span>
                    <span className="text-xs bg-green-500/20 text-green-300 px-2 py-1 rounded-full">
                      {currentProfile.musicTaste.platform === 'spotify' ? 'Spotify' : 'Apple Music'}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm text-gray-300">
                      <span className="text-gray-400">Favorite:</span> {currentProfile.musicTaste.favoriteTrack}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {currentProfile.musicTaste.topGenres?.map((genre) => (
                        <span key={genre} className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded-full">
                          {genre}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Interests */}
              <div>
                <h3 className="text-white font-medium mb-3">Interests</h3>
                <div className="flex flex-wrap gap-2">
                  {currentProfile.interests.map((interest) => (
                    <span
                      key={interest}
                      className="bg-gray-800 text-gray-300 px-3 py-1.5 rounded-full text-sm"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-center gap-4 p-6 pt-0">
              <button
                onClick={() => handleSwipe('left')}
                className="w-16 h-16 rounded-full bg-gray-800 border-2 border-red-500 flex items-center justify-center hover:bg-red-500/20 transition-colors"
              >
                <X className="w-8 h-8 text-red-500" />
              </button>
              <button
                onClick={() => handleSwipe('right')}
                className="w-16 h-16 rounded-full bg-gray-800 border-2 border-yellow-500 flex items-center justify-center hover:bg-yellow-500/20 transition-colors"
              >
                <Heart className="w-8 h-8 text-yellow-500" />
              </button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}