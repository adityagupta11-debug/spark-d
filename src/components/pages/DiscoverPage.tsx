import React, { useState, useEffect } from 'react';
import { MapPin, GraduationCap, X, Heart, Star, Coffee, Calendar, Sparkles, ChevronLeft, ChevronRight, Info } from 'lucide-react';

interface DiscoverPageProps {
  userProfile: any;
}

// Mock profile data - in a real app this would come from your backend
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
    photos: ['/api/placeholder/400/600'],
    matchPercentage: 92,
    verified: true
  },
  {
    id: 2,
    name: 'Alex',
    age: 21,
    major: 'Computer Science',
    year: 'Senior',
    distance: '0.8 mi',
    bio: 'Tech enthusiast who loves gaming and rock climbing. Looking for someone to explore Phoenix with! Building the next big app and always up for hackathons.',
    interests: ['Gaming', 'Rock Climbing', 'Technology', 'Startups', 'Music'],
    photos: ['/api/placeholder/400/600'],
    matchPercentage: 87,
    verified: true
  },
  {
    id: 3,
    name: 'Sarah',
    age: 19,
    major: 'Psychology',
    year: 'Sophomore',
    distance: '1.2 mi',
    bio: 'Psychology major who loves art, music, and deep conversations. Always up for coffee at the MU! Looking for genuine connections and meaningful conversations.',
    interests: ['Art', 'Music', 'Coffee', 'Books', 'Yoga'],
    photos: ['/api/placeholder/400/600'],
    matchPercentage: 79,
    verified: true
  }
];

export default function DiscoverPage({ userProfile }: DiscoverPageProps) {
  const [currentProfileIndex, setCurrentProfileIndex] = useState(0);
  const [profiles, setProfiles] = useState(mockProfiles);
  const [isAnimating, setIsAnimating] = useState(false);
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);

  const currentProfile = profiles[currentProfileIndex];

  const handleSwipe = (direction: 'left' | 'right') => {
    setIsAnimating(true);
    setSwipeDirection(direction);
    
    setTimeout(() => {
      if (currentProfileIndex < profiles.length - 1) {
        setCurrentProfileIndex(currentProfileIndex + 1);
      } else {
        setCurrentProfileIndex(0);
      }
      setIsAnimating(false);
      setSwipeDirection(null);
    }, 300);
  };

  const handleSuperLike = () => {
    // Handle super like action
    console.log('Super liked!');
    handleSwipe('right');
  };

  if (!currentProfile) {
    return (
      <div className="flex-1 flex items-center justify-center text-white p-4">
        <div className="text-center">
          <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
            <Heart className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-3xl font-bold mb-4">No more profiles</h2>
          <p className="text-white/60 mb-8">Check back later for more Sun Devils!</p>
          <button 
            onClick={() => setCurrentProfileIndex(0)}
            className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all"
          >
            Start Over
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col p-4 max-w-md mx-auto w-full">
      {/* Match Percentage Badge */}
      <div className="text-center mb-4">
        <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm rounded-full px-4 py-2">
          <Sparkles className="w-4 h-4 text-yellow-400" />
          <span className="text-white font-semibold">{currentProfile.matchPercentage}% Match</span>
        </div>
      </div>

      {/* Profile Card */}
      <div className={`flex-1 relative ${isAnimating ? 'pointer-events-none' : ''}`}>
        <div 
          className={`
            absolute inset-0 bg-gradient-to-br from-purple-900/50 to-pink-900/50 rounded-3xl overflow-hidden shadow-2xl
            transform transition-all duration-300 card-hover
            ${isAnimating && swipeDirection === 'left' ? '-translate-x-full rotate-12 opacity-0' : ''}
            ${isAnimating && swipeDirection === 'right' ? 'translate-x-full -rotate-12 opacity-0' : ''}
          `}
        >
          {/* Profile Image Section */}
          <div className="relative h-2/3 bg-gradient-to-br from-gray-800 to-gray-900">
            {/* Placeholder for image */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="w-32 h-32 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                  <Heart className="w-16 h-16 text-white" />
                </div>
                <p className="text-white/60">Photo placeholder</p>
              </div>
            </div>
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
            
            {/* Verified Badge */}
            {currentProfile.verified && (
              <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full flex items-center space-x-1 shadow-lg">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-xs font-semibold">Verified</span>
              </div>
            )}
            
            {/* Profile Info Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <div className="flex items-end justify-between">
                <div>
                  <h2 className="text-4xl font-bold text-white mb-2">
                    {currentProfile.name}, {currentProfile.age}
                  </h2>
                  <div className="flex items-center space-x-4 text-white/80">
                    <div className="flex items-center space-x-1">
                      <GraduationCap size={16} />
                      <span className="text-sm">{currentProfile.major}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MapPin size={16} />
                      <span className="text-sm">{currentProfile.distance}</span>
                    </div>
                  </div>
                </div>
                <button className="p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors">
                  <Info className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>
          </div>

          {/* Profile Details Section */}
          <div className="h-1/3 bg-gradient-to-br from-gray-900 to-black p-6 overflow-y-auto">
            {/* Bio */}
            <p className="text-white/80 text-sm mb-4 leading-relaxed">
              {currentProfile.bio}
            </p>

            {/* Interests */}
            <div className="flex flex-wrap gap-2">
              {currentProfile.interests.map((interest, index) => (
                <span
                  key={index}
                  className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium border border-white/10"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center items-center space-x-4 mt-6">
        <button
          onClick={() => handleSwipe('left')}
          className="w-14 h-14 bg-gray-800/50 backdrop-blur-sm hover:bg-red-500 rounded-full flex items-center justify-center transition-all transform hover:scale-110 hover:shadow-xl group"
        >
          <X size={24} className="text-white group-hover:scale-110 transition-transform" />
        </button>
        
        <button
          onClick={handleSuperLike}
          className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-full flex items-center justify-center transition-all transform hover:scale-110 hover:shadow-xl shadow-lg"
        >
          <Star size={28} className="text-white" fill="white" />
        </button>
        
        <button
          onClick={() => handleSwipe('right')}
          className="w-14 h-14 bg-gray-800/50 backdrop-blur-sm hover:bg-green-500 rounded-full flex items-center justify-center transition-all transform hover:scale-110 hover:shadow-xl group"
        >
          <Heart size={24} className="text-white group-hover:scale-110 transition-transform" />
        </button>
      </div>

      {/* Quick Actions */}
      <div className="flex justify-center space-x-6 mt-4">
        <button className="flex items-center space-x-2 text-white/60 hover:text-yellow-400 transition-colors">
          <Coffee size={18} />
          <span className="text-sm">Suggest Date</span>
        </button>
        <button className="flex items-center space-x-2 text-white/60 hover:text-yellow-400 transition-colors">
          <Calendar size={18} />
          <span className="text-sm">Schedule</span>
        </button>
      </div>

      {/* Profile Counter */}
      <div className="text-center mt-6">
        <div className="flex justify-center items-center space-x-4">
          <button 
            onClick={() => setCurrentProfileIndex(Math.max(0, currentProfileIndex - 1))}
            className="p-1 rounded-full hover:bg-white/10 transition-colors"
            disabled={currentProfileIndex === 0}
          >
            <ChevronLeft className="w-5 h-5 text-white/60" />
          </button>
          <div className="flex space-x-2">
            {profiles.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentProfileIndex 
                    ? 'bg-yellow-400 w-8' 
                    : 'bg-white/30'
                }`}
              />
            ))}
          </div>
          <button 
            onClick={() => handleSwipe('right')}
            className="p-1 rounded-full hover:bg-white/10 transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-white/60" />
          </button>
        </div>
      </div>
    </div>
  );
}