import { useState, useRef } from 'react';
import { MapPin, GraduationCap, X, Heart } from 'lucide-react';

interface UserProfile {
  firstName?: string;
  lastName?: string;
  age?: number;
  major?: string;
  year?: string;
  bio?: string;
  interests?: string[];
  location?: string;
}

interface DiscoverPageProps {
  userProfile?: UserProfile;
}

export function DiscoverPage({ userProfile }: DiscoverPageProps) {
  const [currentProfileIndex, setCurrentProfileIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Mock profile data - in a real app, this would come from an API
  const profiles = [
    {
      id: 1,
      name: "Emma",
      age: 20,
      major: "Business Administration",
      year: "Junior",
      location: "0.5 mi",
      bio: "Love hiking Camelback Mountain and trying new restaurants in Tempe! Always down for a study session at the MU or catching a Sun Devils game.",
      interests: ["Hiking", "Sun Devils Sports", "Photography"],
      image: "/api/placeholder/300/400"
    },
    {
      id: 2,
      name: "Alex",
      age: 22,
      major: "Computer Science",
      year: "Senior",
      location: "1.2 mi",
      bio: "Passionate about coding and coffee. Looking for someone to explore Phoenix with and maybe study together!",
      interests: ["Coding", "Coffee", "Gaming", "Movies"],
      image: "/api/placeholder/300/400"
    },
    {
      id: 3,
      name: "Jordan",
      age: 19,
      major: "Psychology",
      year: "Sophomore",
      location: "0.8 mi",
      bio: "Love reading, yoga, and trying new foods. Always up for a good conversation and campus adventures!",
      interests: ["Reading", "Yoga", "Food", "Campus Life"],
      image: "/api/placeholder/300/400"
    }
  ];

  const currentProfile = profiles[currentProfileIndex];

  const handlePass = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    
    // Add animation class
    if (cardRef.current) {
      cardRef.current.style.transform = 'translateX(-100%)';
      cardRef.current.style.opacity = '0';
    }
    
    setTimeout(() => {
      if (currentProfileIndex < profiles.length - 1) {
        setCurrentProfileIndex(currentProfileIndex + 1);
      } else {
        setCurrentProfileIndex(0); // Loop back to start
      }
      setIsAnimating(false);
      
      // Reset card position
      if (cardRef.current) {
        cardRef.current.style.transform = 'translateX(0)';
        cardRef.current.style.opacity = '1';
      }
    }, 300);
  };

  const handleLike = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    
    // Add animation class
    if (cardRef.current) {
      cardRef.current.style.transform = 'translateX(100%)';
      cardRef.current.style.opacity = '0';
    }
    
    setTimeout(() => {
      // In a real app, this would send a like to the backend
      console.log('Liked:', currentProfile.name);
      
      if (currentProfileIndex < profiles.length - 1) {
        setCurrentProfileIndex(currentProfileIndex + 1);
      } else {
        setCurrentProfileIndex(0); // Loop back to start
      }
      setIsAnimating(false);
      
      // Reset card position
      if (cardRef.current) {
        cardRef.current.style.transform = 'translateX(0)';
        cardRef.current.style.opacity = '1';
      }
    }, 300);
  };

  if (!currentProfile) {
    return (
      <div className="flex-1 bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">💔</div>
          <h2 className="text-white text-2xl font-bold mb-2">No more profiles</h2>
          <p className="text-gray-400">Check back later for new matches!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-black p-2 sm:p-4 flex flex-col">
      {/* Profile Card */}
      <div className="flex-1 flex items-center justify-center">
        <div 
          ref={cardRef}
          className="bg-gradient-to-b from-gray-300 to-gray-600 rounded-2xl w-full max-w-sm h-[400px] sm:h-[500px] relative overflow-hidden transition-all duration-300 ease-in-out"
        >
          {/* Profile Image Placeholder */}
          <div className="h-1/2 bg-gray-400 flex items-center justify-center">
            <div className="text-6xl">🏔️</div>
          </div>

          {/* Profile Info */}
          <div className="h-1/2 p-6 text-white">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-2xl font-bold">{currentProfile.name}, {currentProfile.age}</h3>
              <div className="flex items-center text-sm">
                <MapPin className="w-4 h-4 mr-1" />
                {currentProfile.location}
              </div>
            </div>

            <div className="flex items-center mb-3">
              <GraduationCap className="w-4 h-4 mr-2" />
              <span className="text-sm">{currentProfile.major} • {currentProfile.year}</span>
            </div>

            <p className="text-sm mb-4 leading-relaxed">
              {currentProfile.bio}
              <span className="ml-1">🌵</span>
            </p>

            {/* Interests */}
            <div className="flex flex-wrap gap-2 mb-6">
              {currentProfile.interests.slice(0, 3).map((interest, index) => (
                <span
                  key={index}
                  className="bg-gray-700 text-white px-3 py-1 rounded-full text-xs"
                >
                  {interest}
                </span>
              ))}
              {currentProfile.interests.length > 3 && (
                <span className="bg-gray-700 text-white px-3 py-1 rounded-full text-xs">
                  +{currentProfile.interests.length - 3} more
                </span>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-4">
            <button
              onClick={handlePass}
              disabled={isAnimating}
              className="w-14 h-14 sm:w-12 sm:h-12 bg-gray-700 border-2 border-[#8B1538] rounded-full flex items-center justify-center hover:bg-gray-600 hover:scale-110 active:scale-95 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed touch-target"
            >
              <X className="w-6 h-6 sm:w-6 sm:h-6 text-white" />
            </button>
            <button
              onClick={handleLike}
              disabled={isAnimating}
              className="w-14 h-14 sm:w-12 sm:h-12 bg-gray-700 border-2 border-yellow-500 rounded-full flex items-center justify-center hover:bg-gray-600 hover:scale-110 active:scale-95 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed touch-target"
            >
              <Heart className="w-6 h-6 sm:w-6 sm:h-6 text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}