import React, { useState, useEffect } from 'react';
import { MapPin, GraduationCap, X, Heart, Star, Coffee, Camera, MoreHorizontal, Info, Sparkles } from 'lucide-react';

interface DiscoverPageProps {
  userProfile: any;
}

// Enhanced mock profile data with more comprehensive features
const mockProfiles = [
  {
    id: 1,
    name: 'Emma',
    age: 20,
    major: 'Business Administration',
    year: 'Junior',
    distance: '0.5 mi',
    bio: 'Love hiking Camelback Mountain and trying new restaurants in Tempe! Always down for a study session at the MU or catching a Sun Devils game. 🌵',
    interests: ['Hiking', 'Sun Devils Sports', 'Photography', 'Coffee', 'Travel', 'Music'],
    photos: [
      'https://images.unsplash.com/photo-1494790108755-2616c6d35a6c?w=400&h=600&fit=crop',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=600&fit=crop',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=600&fit=crop'
    ],
    verified: true,
    premium: false,
    lastActive: '2 hours ago',
    mutualFriends: 3,
    spotifyArtist: 'Taylor Swift',
    instagram: '@emma_asu',
    height: '5\'6"',
    zodiac: 'Gemini',
    education: 'Arizona State University',
    job: 'Marketing Intern',
    looking_for: 'Something serious',
    hometown: 'Phoenix, AZ'
  },
  {
    id: 2,
    name: 'Alex',
    age: 21,
    major: 'Computer Science',
    year: 'Senior',
    distance: '0.8 mi',
    bio: 'Tech enthusiast who loves gaming and rock climbing. Looking for someone to explore Phoenix with! Always up for late night coding sessions and weekend adventures.',
    interests: ['Gaming', 'Rock Climbing', 'Technology', 'Anime', 'Cooking', 'Fitness'],
    photos: [
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop',
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=600&fit=crop'
    ],
    verified: true,
    premium: true,
    lastActive: 'Active now',
    mutualFriends: 1,
    spotifyArtist: 'Daft Punk',
    instagram: '@alex_codes',
    height: '6\'1"',
    zodiac: 'Leo',
    education: 'Arizona State University',
    job: 'Software Engineer Intern',
    looking_for: 'Long-term dating',
    hometown: 'Tempe, AZ'
  },
  {
    id: 3,
    name: 'Sarah',
    age: 19,
    major: 'Psychology',
    year: 'Sophomore',
    distance: '1.2 mi',
    bio: 'Psychology major who loves art, music, and deep conversations. Always up for coffee at the MU! Passionate about mental health advocacy and creative expression.',
    interests: ['Art', 'Music', 'Coffee', 'Reading', 'Yoga', 'Volunteering'],
    photos: [
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=600&fit=crop',
      'https://images.unsplash.com/photo-1488716820095-cbe80883c496?w=400&h=600&fit=crop'
    ],
    verified: false,
    premium: false,
    lastActive: '1 day ago',
    mutualFriends: 0,
    spotifyArtist: 'Billie Eilish',
    instagram: '@sarah_creates',
    height: '5\'4"',
    zodiac: 'Pisces',
    education: 'Arizona State University',
    job: 'Student',
    looking_for: 'New friends',
    hometown: 'Scottsdale, AZ'
  }
];

export default function DiscoverPage({ userProfile }: DiscoverPageProps) {
  const [currentProfileIndex, setCurrentProfileIndex] = useState(0);
  const [profiles, setProfiles] = useState(mockProfiles);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [showDetails, setShowDetails] = useState(false);
  const [cardAnimation, setCardAnimation] = useState('');

  const currentProfile = profiles[currentProfileIndex];

  useEffect(() => {
    setCurrentPhotoIndex(0);
    setShowDetails(false);
  }, [currentProfileIndex]);

  const handleSwipe = (direction: 'left' | 'right') => {
    setCardAnimation(direction === 'left' ? 'swipe-left' : 'swipe-right');
    
    setTimeout(() => {
      if (currentProfileIndex < profiles.length - 1) {
        setCurrentProfileIndex(currentProfileIndex + 1);
      } else {
        setCurrentProfileIndex(0);
      }
      setCardAnimation('');
    }, 300);
  };

  const nextPhoto = () => {
    if (currentProfile && currentPhotoIndex < currentProfile.photos.length - 1) {
      setCurrentPhotoIndex(currentPhotoIndex + 1);
    }
  };

  const prevPhoto = () => {
    if (currentPhotoIndex > 0) {
      setCurrentPhotoIndex(currentPhotoIndex - 1);
    }
  };

  if (!currentProfile) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white">
        <div className="text-center">
          <div className="text-6xl mb-4">🌟</div>
          <h2 className="text-2xl font-semibold mb-2">You're all caught up!</h2>
          <p className="text-gray-300">Check back later for more Sun Devils!</p>
          <button 
            onClick={() => setCurrentProfileIndex(0)}
            className="mt-4 px-6 py-2 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full text-white font-medium hover:shadow-lg transition-all duration-300"
          >
            Browse Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 px-4 py-6 flex flex-col relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-pink-500/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-blue-500/10 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-purple-500/10 rounded-full blur-xl animate-pulse delay-500"></div>
      </div>

      {/* Main Card Container */}
      <div className="flex-1 max-w-sm mx-auto w-full relative z-10">
        <div className={`bg-white rounded-3xl overflow-hidden shadow-2xl h-full flex flex-col transform transition-all duration-300 ${cardAnimation === 'swipe-left' ? '-translate-x-full rotate-12 opacity-0' : cardAnimation === 'swipe-right' ? 'translate-x-full -rotate-12 opacity-0' : 'translate-x-0 rotate-0 opacity-100'}`}>
          
          {/* Profile Images Section */}
          <div className="relative h-[400px] bg-gray-200 overflow-hidden">
            {/* Photo Navigation Indicators */}
            <div className="absolute top-4 left-4 right-4 flex space-x-2 z-20">
              {currentProfile.photos.map((_, index) => (
                <div
                  key={index}
                  className={`flex-1 h-1 rounded-full transition-all duration-300 ${
                    index === currentPhotoIndex ? 'bg-white' : 'bg-white/30'
                  }`}
                />
              ))}
            </div>

            {/* Status Indicators */}
            <div className="absolute top-4 right-4 flex items-center space-x-2 z-20">
              {currentProfile.verified && (
                <div className="bg-blue-500 rounded-full p-1">
                  <Star size={12} className="text-white fill-current" />
                </div>
              )}
              {currentProfile.premium && (
                <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full p-1">
                  <Sparkles size={12} className="text-white" />
                </div>
              )}
            </div>

            {/* Photo Navigation Areas */}
            <button 
              onClick={prevPhoto}
              className="absolute left-0 top-0 w-1/2 h-full z-10 flex items-center justify-start pl-4 opacity-0 hover:opacity-100 transition-opacity"
              disabled={currentPhotoIndex === 0}
            >
              <div className="w-8 h-8 bg-black/50 rounded-full flex items-center justify-center">
                <span className="text-white text-sm">‹</span>
              </div>
            </button>

            <button 
              onClick={nextPhoto}
              className="absolute right-0 top-0 w-1/2 h-full z-10 flex items-center justify-end pr-4 opacity-0 hover:opacity-100 transition-opacity"
              disabled={currentPhotoIndex === currentProfile.photos.length - 1}
            >
              <div className="w-8 h-8 bg-black/50 rounded-full flex items-center justify-center">
                <span className="text-white text-sm">›</span>
              </div>
            </button>

            {/* Main Photo */}
            <img 
              src={currentProfile.photos[currentPhotoIndex]} 
              alt={`${currentProfile.name} photo ${currentPhotoIndex + 1}`}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = `https://ui-avatars.com/api/?name=${currentProfile.name}&size=400&background=8B4B6B&color=fff`;
              }}
            />

            {/* Gradient Overlay */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

            {/* Quick Info Overlay */}
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">{currentProfile.name}, {currentProfile.age}</h2>
                  <div className="flex items-center text-sm opacity-90">
                    <MapPin size={14} className="mr-1" />
                    {currentProfile.distance} • {currentProfile.lastActive}
                  </div>
                </div>
                <button
                  onClick={() => setShowDetails(!showDetails)}
                  className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                >
                  <Info size={18} className="text-white" />
                </button>
              </div>
            </div>
          </div>

          {/* Profile Details Section */}
          <div className={`flex-1 bg-white text-gray-900 transition-all duration-300 overflow-hidden ${showDetails ? 'max-h-96' : 'max-h-48'}`}>
            <div className="p-6 space-y-4">
              {/* Basic Info */}
              <div className="flex items-center justify-between">
                <div className="flex items-center text-gray-600">
                  <GraduationCap size={16} className="mr-2" />
                  <span className="text-sm">{currentProfile.major} • {currentProfile.year}</span>
                </div>
                {currentProfile.mutualFriends > 0 && (
                  <div className="text-xs text-purple-600 bg-purple-100 px-2 py-1 rounded-full">
                    {currentProfile.mutualFriends} mutual friends
                  </div>
                )}
              </div>

              {/* Bio */}
              <p className="text-gray-700 text-sm leading-relaxed">
                {currentProfile.bio}
              </p>

              {/* Interests */}
              <div className="flex flex-wrap gap-2">
                {currentProfile.interests.slice(0, showDetails ? currentProfile.interests.length : 4).map((interest, index) => (
                  <span
                    key={index}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-medium"
                  >
                    {interest}
                  </span>
                ))}
                {!showDetails && currentProfile.interests.length > 4 && (
                  <span className="bg-gray-200 text-gray-600 px-3 py-1 rounded-full text-xs">
                    +{currentProfile.interests.length - 4} more
                  </span>
                )}
              </div>

              {/* Extended Details */}
              {showDetails && (
                <div className="space-y-3 pt-4 border-t border-gray-200">
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="text-gray-500">Height:</span>
                      <p className="font-medium">{currentProfile.height}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Zodiac:</span>
                      <p className="font-medium">{currentProfile.zodiac}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Looking for:</span>
                      <p className="font-medium">{currentProfile.looking_for}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">From:</span>
                      <p className="font-medium">{currentProfile.hometown}</p>
                    </div>
                  </div>
                  
                  {currentProfile.spotifyArtist && (
                    <div className="bg-green-50 p-3 rounded-lg">
                      <div className="flex items-center text-green-700">
                        <span className="text-sm">🎵 Recently played: </span>
                        <span className="font-medium ml-1">{currentProfile.spotifyArtist}</span>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex justify-center space-x-4 pt-4">
                <button
                  onClick={() => handleSwipe('left')}
                  className="w-16 h-16 bg-gradient-to-br from-red-400 to-red-600 hover:from-red-500 hover:to-red-700 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-xl"
                >
                  <X size={28} className="text-white" />
                </button>
                
                <button
                  onClick={() => {/* Handle super like */}}
                  className="w-14 h-14 bg-gradient-to-br from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-xl"
                >
                  <Star size={24} className="text-white" />
                </button>
                
                <button
                  onClick={() => handleSwipe('right')}
                  className="w-16 h-16 bg-gradient-to-br from-pink-400 to-pink-600 hover:from-pink-500 hover:to-pink-700 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-xl"
                >
                  <Heart size={28} className="text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Navigation */}
      <div className="text-center mt-6 relative z-10">
        <div className="flex justify-center space-x-2 mb-2">
          {profiles.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentProfileIndex 
                  ? 'bg-white w-6' 
                  : 'bg-white/50'
              }`}
            />
          ))}
        </div>
        <p className="text-white/70 text-sm">
          {currentProfileIndex + 1} of {profiles.length}
        </p>
      </div>
    </div>
  );
}