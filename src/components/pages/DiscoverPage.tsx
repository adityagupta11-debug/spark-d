import React, { useState, useRef, useEffect } from 'react';
import { MapPin, GraduationCap, X, Heart, Star, Filter, Settings, Info, Camera, MoreHorizontal, ChevronLeft, ChevronRight } from 'lucide-react';

interface DiscoverPageProps {
  userProfile: any;
}

// Enhanced mock profile data with more comprehensive information
const mockProfiles = [
  {
    id: 1,
    name: 'Emma',
    age: 20,
    major: 'Business Administration',
    year: 'Junior',
    distance: '0.5 mi',
    bio: 'Love hiking Camelback Mountain and trying new restaurants in Tempe! Always down for a study session at the MU or catching a Sun Devils game. 🌵',
    interests: ['Hiking', 'Sun Devils Sports', 'Photography', 'Coffee', 'Travel'],
    photos: [
      'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=600&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=600&fit=crop&crop=face'
    ],
    prompts: [
      { question: "My ideal first date", answer: "Hiking Camelback at sunrise followed by coffee at Cartel" },
      { question: "I'm looking for", answer: "Someone who loves adventure and good conversation" },
      { question: "My biggest fear", answer: "Running out of coffee during finals week" }
    ],
    verified: true,
    online: true,
    lastActive: '2 minutes ago'
  },
  {
    id: 2,
    name: 'Alex',
    age: 21,
    major: 'Computer Science',
    year: 'Senior',
    distance: '0.8 mi',
    bio: 'Tech enthusiast who loves gaming and rock climbing. Looking for someone to explore Phoenix with!',
    interests: ['Gaming', 'Rock Climbing', 'Technology', 'Coding', 'Board Games'],
    photos: [
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=600&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=600&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop&crop=face'
    ],
    prompts: [
      { question: "My ideal first date", answer: "Escape room followed by dinner at a local spot" },
      { question: "I'm looking for", answer: "Someone who shares my love for puzzles and adventure" },
      { question: "My biggest fear", answer: "Running out of storage space on my computer" }
    ],
    verified: false,
    online: false,
    lastActive: '1 hour ago'
  },
  {
    id: 3,
    name: 'Sarah',
    age: 19,
    major: 'Psychology',
    year: 'Sophomore',
    distance: '1.2 mi',
    bio: 'Psychology major who loves art, music, and deep conversations. Always up for coffee at the MU!',
    interests: ['Art', 'Music', 'Coffee', 'Psychology', 'Painting', 'Concerts'],
    photos: [
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=600&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=600&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=600&fit=crop&crop=face'
    ],
    prompts: [
      { question: "My ideal first date", answer: "Art museum visit followed by coffee and deep conversation" },
      { question: "I'm looking for", answer: "Someone who appreciates art and meaningful connections" },
      { question: "My biggest fear", answer: "Not making a difference in people's lives" }
    ],
    verified: true,
    online: true,
    lastActive: '5 minutes ago'
  }
];

export default function DiscoverPage({ userProfile }: DiscoverPageProps) {
  const [currentProfileIndex, setCurrentProfileIndex] = useState(0);
  const [profiles, setProfiles] = useState(mockProfiles);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const [showProfileDetails, setShowProfileDetails] = useState(false);
  const [likedProfiles, setLikedProfiles] = useState<number[]>([]);
  const [passedProfiles, setPassedProfiles] = useState<number[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const currentProfile = profiles[currentProfileIndex];

  const handleSwipe = (direction: 'left' | 'right') => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    
    if (direction === 'right') {
      setLikedProfiles(prev => [...prev, currentProfile.id]);
    } else {
      setPassedProfiles(prev => [...prev, currentProfile.id]);
    }

    // Animate card out
    if (cardRef.current) {
      cardRef.current.style.transform = `translateX(${direction === 'right' ? '100%' : '-100%'})`;
      cardRef.current.style.opacity = '0';
    }

    setTimeout(() => {
      if (currentProfileIndex < profiles.length - 1) {
        setCurrentProfileIndex(currentProfileIndex + 1);
        setCurrentPhotoIndex(0);
      } else {
        setCurrentProfileIndex(0);
        setCurrentPhotoIndex(0);
      }
      
      // Reset card position
      if (cardRef.current) {
        cardRef.current.style.transform = 'translateX(0)';
        cardRef.current.style.opacity = '1';
      }
      
      setIsAnimating(false);
    }, 300);
  };

  const nextPhoto = () => {
    if (currentPhotoIndex < currentProfile.photos.length - 1) {
      setCurrentPhotoIndex(currentPhotoIndex + 1);
    }
  };

  const prevPhoto = () => {
    if (currentPhotoIndex > 0) {
      setCurrentPhotoIndex(currentPhotoIndex - 1);
    }
  };

  const handleSuperLike = () => {
    // Add super like functionality
    console.log('Super liked:', currentProfile.name);
    handleSwipe('right');
  };

  if (!currentProfile) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
        <div className="text-center max-w-md px-6">
          <div className="text-8xl mb-6">🌵</div>
          <h2 className="text-3xl font-bold mb-4">No more profiles</h2>
          <p className="text-gray-400 text-lg mb-8">Check back later for more Sun Devils!</p>
          <button 
            onClick={() => setCurrentProfileIndex(0)}
            className="bg-gradient-to-r from-[#8C1D40] to-[#FFC627] text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all"
          >
            Refresh Profiles
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-gradient-to-br from-gray-900 via-black to-gray-900 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 bg-black/50 backdrop-blur-sm">
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            <Filter size={20} className="text-white" />
          </button>
          <h1 className="text-xl font-bold text-white">Discover</h1>
        </div>
        <div className="flex items-center space-x-2">
          <button className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
            <Settings size={20} className="text-white" />
          </button>
        </div>
      </div>

      {/* Profile Card */}
      <div className="flex-1 px-4 py-6 flex justify-center">
        <div className="relative max-w-sm w-full">
          <div 
            ref={cardRef}
            className="bg-white rounded-3xl overflow-hidden shadow-2xl h-[600px] flex flex-col transition-all duration-300"
          >
            {/* Photo Gallery */}
            <div className="relative h-96 bg-gray-200 overflow-hidden">
              <img
                src={currentProfile.photos[currentPhotoIndex]}
                alt={`${currentProfile.name} photo ${currentPhotoIndex + 1}`}
                className="w-full h-full object-cover"
              />
              
              {/* Photo Navigation */}
              {currentProfile.photos.length > 1 && (
                <>
                  <button
                    onClick={prevPhoto}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-black/30 hover:bg-black/50 transition-colors"
                  >
                    <ChevronLeft size={20} className="text-white" />
                  </button>
                  <button
                    onClick={nextPhoto}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-black/30 hover:bg-black/50 transition-colors"
                  >
                    <ChevronRight size={20} className="text-white" />
                  </button>
                </>
              )}

              {/* Photo Indicators */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {currentProfile.photos.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full ${
                      index === currentPhotoIndex ? 'bg-white' : 'bg-white/50'
                    }`}
                  />
                ))}
              </div>

              {/* Online Status */}
              {currentProfile.online && (
                <div className="absolute top-4 right-4 flex items-center space-x-1 bg-green-500 text-white px-2 py-1 rounded-full text-xs">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                  <span>Online</span>
                </div>
              )}

              {/* Verification Badge */}
              {currentProfile.verified && (
                <div className="absolute top-4 left-4 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                  <Star size={14} className="text-white fill-white" />
                </div>
              )}

              {/* Gradient Overlay */}
              <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/60 to-transparent" />
            </div>

            {/* Profile Info */}
            <div className="flex-1 bg-black text-white p-6 flex flex-col">
              {/* Name, Age, and Distance */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <h2 className="text-2xl font-bold">{currentProfile.name}, {currentProfile.age}</h2>
                  {currentProfile.verified && (
                    <Star size={16} className="text-blue-400 fill-blue-400" />
                  )}
                </div>
                <div className="flex items-center text-gray-400 text-sm">
                  <MapPin size={16} className="mr-1" />
                  {currentProfile.distance}
                </div>
              </div>

              {/* Major and Year */}
              <div className="flex items-center text-gray-300 mb-4">
                <GraduationCap size={16} className="mr-2" />
                <span>{currentProfile.major} • {currentProfile.year}</span>
              </div>

              {/* Bio */}
              <p className="text-gray-300 text-sm mb-4 leading-relaxed line-clamp-3">
                {currentProfile.bio}
              </p>

              {/* Prompts */}
              {showProfileDetails && (
                <div className="mb-4 space-y-3">
                  {currentProfile.prompts.map((prompt, index) => (
                    <div key={index} className="bg-gray-800 rounded-lg p-3">
                      <p className="text-gray-400 text-xs mb-1">{prompt.question}</p>
                      <p className="text-white text-sm">{prompt.answer}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Interests */}
              <div className="flex flex-wrap gap-2 mb-6">
                {currentProfile.interests.slice(0, 4).map((interest, index) => (
                  <span
                    key={index}
                    className="bg-gradient-to-r from-[#8C1D40] to-[#FFC627] text-white px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {interest}
                  </span>
                ))}
                {currentProfile.interests.length > 4 && (
                  <span className="bg-gray-700 text-white px-3 py-1 rounded-full text-sm">
                    +{currentProfile.interests.length - 4} more
                  </span>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex justify-center space-x-6 mt-auto">
                <button
                  onClick={() => handleSwipe('left')}
                  className="w-14 h-14 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center transition-all hover:scale-105 shadow-lg"
                >
                  <X size={24} className="text-white" />
                </button>
                
                <button
                  onClick={handleSuperLike}
                  className="w-12 h-12 bg-blue-500 hover:bg-blue-600 rounded-full flex items-center justify-center transition-all hover:scale-105 shadow-lg"
                >
                  <Star size={20} className="text-white fill-white" />
                </button>
                
                <button
                  onClick={() => handleSwipe('right')}
                  className="w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center transition-all hover:scale-105 shadow-lg"
                >
                  <Heart size={24} className="text-white fill-white" />
                </button>
              </div>
            </div>
          </div>

          {/* Profile Details Toggle */}
          <button
            onClick={() => setShowProfileDetails(!showProfileDetails)}
            className="absolute bottom-4 right-4 p-3 bg-black/50 hover:bg-black/70 rounded-full transition-colors"
          >
            <Info size={20} className="text-white" />
          </button>
        </div>
      </div>

      {/* Profile Counter */}
      <div className="text-center pb-6">
        <div className="flex justify-center space-x-2 mb-2">
          {profiles.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentProfileIndex ? 'bg-[#FFC627]' : 'bg-gray-600'
              }`}
            />
          ))}
        </div>
        <p className="text-gray-400 text-sm">
          {currentProfileIndex + 1} of {profiles.length}
        </p>
      </div>

      {/* Filters Modal */}
      {showFilters && (
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 m-4 max-w-sm w-full">
            <h3 className="text-xl font-bold mb-4">Discovery Filters</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Age Range</label>
                <div className="flex items-center space-x-2">
                  <input type="number" placeholder="18" className="w-20 p-2 border rounded" />
                  <span>-</span>
                  <input type="number" placeholder="25" className="w-20 p-2 border rounded" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Distance</label>
                <select className="w-full p-2 border rounded">
                  <option>5 miles</option>
                  <option>10 miles</option>
                  <option>25 miles</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Year in School</label>
                <div className="flex flex-wrap gap-2">
                  {['Freshman', 'Sophomore', 'Junior', 'Senior', 'Graduate'].map(year => (
                    <button key={year} className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                      {year}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex space-x-3 mt-6">
              <button 
                onClick={() => setShowFilters(false)}
                className="flex-1 py-2 px-4 bg-gray-200 text-gray-800 rounded-lg font-medium"
              >
                Cancel
              </button>
              <button 
                onClick={() => setShowFilters(false)}
                className="flex-1 py-2 px-4 bg-[#8C1D40] text-white rounded-lg font-medium"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}