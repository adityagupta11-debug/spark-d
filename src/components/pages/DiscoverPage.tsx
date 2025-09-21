import React, { useState } from 'react';
import { MapPin, GraduationCap, X, Heart } from 'lucide-react';

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
    interests: ['Hiking', 'Sun Devils Sports', 'Photography'],
    photos: ['/api/placeholder/400/600'] // Placeholder for now
  },
  {
    id: 2,
    name: 'Alex',
    age: 21,
    major: 'Computer Science',
    year: 'Senior',
    distance: '0.8 mi',
    bio: 'Tech enthusiast who loves gaming and rock climbing. Looking for someone to explore Phoenix with!',
    interests: ['Gaming', 'Rock Climbing', 'Technology'],
    photos: ['/api/placeholder/400/600']
  },
  {
    id: 3,
    name: 'Sarah',
    age: 19,
    major: 'Psychology',
    year: 'Sophomore',
    distance: '1.2 mi',
    bio: 'Psychology major who loves art, music, and deep conversations. Always up for coffee at the MU!',
    interests: ['Art', 'Music', 'Coffee'],
    photos: ['/api/placeholder/400/600']
  }
];

export default function DiscoverPage({ userProfile }: DiscoverPageProps) {
  const [currentProfileIndex, setCurrentProfileIndex] = useState(0);
  const [profiles, setProfiles] = useState(mockProfiles);

  const currentProfile = profiles[currentProfileIndex];

  const handleSwipe = (direction: 'left' | 'right') => {
    if (currentProfileIndex < profiles.length - 1) {
      setCurrentProfileIndex(currentProfileIndex + 1);
    } else {
      // Reset to first profile or show "no more profiles" message
      setCurrentProfileIndex(0);
    }
  };

  if (!currentProfile) {
    return (
      <div className="flex-1 flex items-center justify-center text-white relative z-10">
        <div className="text-center max-w-sm mx-auto px-6">
          <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl">
            <span className="text-4xl">🌵</span>
          </div>
          <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
            No more profiles
          </h2>
          <p className="text-gray-300 text-lg leading-relaxed">
            Check back later for more Sun Devils! We're constantly adding new members to our community.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 px-4 py-6 flex flex-col relative z-10">
      {/* Profile Card */}
      <div className="flex-1 max-w-sm mx-auto w-full">
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl h-full flex flex-col border border-white/20">
          {/* Profile Image */}
          <div className="relative h-96 bg-gradient-to-br from-purple-400 via-pink-400 to-blue-400">
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-32 h-32 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center shadow-2xl border-4 border-white/30">
                <span className="text-4xl">👤</span>
              </div>
            </div>
            {/* Distance Badge */}
            <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1 flex items-center text-white text-sm">
              <MapPin size={14} className="mr-1" />
              {currentProfile.distance}
            </div>
          </div>

          {/* Profile Info */}
          <div className="flex-1 bg-slate-900/80 backdrop-blur-sm text-white p-6">
            {/* Name and Age */}
            <div className="mb-4">
              <h2 className="text-3xl font-bold mb-1 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                {currentProfile.name}, {currentProfile.age}
              </h2>
            </div>

            {/* Major and Year */}
            <div className="flex items-center text-gray-300 mb-4 bg-white/5 rounded-xl p-3 backdrop-blur-sm">
              <GraduationCap size={18} className="mr-3 text-yellow-400" />
              <span className="font-medium">{currentProfile.major} • {currentProfile.year}</span>
            </div>

            {/* Bio */}
            <div className="mb-6">
              <p className="text-gray-200 text-sm leading-relaxed">
                {currentProfile.bio}
              </p>
            </div>

            {/* Interests */}
            <div className="flex flex-wrap gap-2 mb-8">
              {currentProfile.interests.map((interest, index) => (
                <span
                  key={index}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg"
                >
                  {interest}
                </span>
              ))}
              {currentProfile.interests.length > 3 && (
                <span className="bg-white/10 text-white px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm">
                  +{currentProfile.interests.length - 3} more
                </span>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center space-x-8">
              <button
                onClick={() => handleSwipe('left')}
                className="w-16 h-16 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 rounded-full flex items-center justify-center transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-110"
              >
                <X size={28} className="text-white" />
              </button>
              
              <button
                onClick={() => handleSwipe('right')}
                className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 rounded-full flex items-center justify-center transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-110"
              >
                <span className="text-white text-3xl">💕</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Counter */}
      <div className="text-center mt-6">
        <div className="flex justify-center space-x-3 mb-3">
          {profiles.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentProfileIndex 
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg scale-110' 
                  : 'bg-white/30'
              }`}
            />
          ))}
        </div>
        <p className="text-gray-300 text-sm font-medium">
          {currentProfileIndex + 1} of {profiles.length}
        </p>
      </div>
    </div>
  );
}