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
      <div className="flex-1 flex items-center justify-center text-white relative">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-asu-gold/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-asu-maroon/10 rounded-full blur-3xl"></div>
        </div>
        <div className="text-center relative z-10 glass-card rounded-3xl p-12 border border-white/10 animate-fade-in">
          <div className="w-24 h-24 bg-gradient-to-br from-asu-gold to-asu-light-gold rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
            <span className="text-4xl">🌵</span>
          </div>
          <h2 className="text-3xl font-bold mb-3 gradient-text">No more profiles</h2>
          <p className="text-gray-300 text-lg mb-6">Check back later for more Sun Devils!</p>
          <div className="flex items-center justify-center space-x-2 text-asu-gold">
            <div className="w-2 h-2 bg-asu-gold rounded-full animate-pulse"></div>
            <span className="text-sm font-medium">Coming soon</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 px-4 py-6 flex flex-col relative">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-32 h-32 bg-asu-gold/5 rounded-full blur-2xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-purple-500/5 rounded-full blur-2xl"></div>
      </div>

      {/* Profile Card */}
      <div className="flex-1 max-w-sm mx-auto w-full relative z-10">
        <div className="glass-card rounded-3xl overflow-hidden shadow-glass h-full flex flex-col animate-scale-in border border-white/10">
          {/* Profile Image */}
          <div className="relative h-96 bg-gradient-to-br from-gray-800 to-gray-900">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                <div className="w-40 h-40 bg-gradient-to-br from-asu-gold/20 to-asu-maroon/20 rounded-full flex items-center justify-center border-4 border-white/20 shadow-lg">
                  <span className="text-6xl">👤</span>
                </div>
                <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center border-4 border-white shadow-lg">
                  <span className="text-white text-lg">📸</span>
                </div>
              </div>
            </div>

            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>

          {/* Profile Info */}
          <div className="flex-1 bg-gradient-to-b from-slate-900 to-black text-white p-6">
            {/* Name and Distance */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <h2 className="text-3xl font-bold gradient-text">{currentProfile.name}</h2>
                <div className="w-8 h-8 bg-asu-gold rounded-full flex items-center justify-center">
                  <span className="text-slate-900 text-sm font-bold">{currentProfile.age}</span>
                </div>
              </div>
              <div className="glass-card px-3 py-1 rounded-full">
                <div className="flex items-center text-white text-sm">
                  <MapPin size={14} className="mr-1" />
                  {currentProfile.distance}
                </div>
              </div>
            </div>

            {/* Major and Year */}
            <div className="flex items-center text-gray-300 mb-5">
              <div className="w-8 h-8 bg-gradient-to-br from-asu-gold to-asu-light-gold rounded-lg flex items-center justify-center mr-3">
                <GraduationCap size={16} className="text-slate-900" />
              </div>
              <div>
                <div className="font-semibold text-white">{currentProfile.major}</div>
                <div className="text-asu-gold text-sm">{currentProfile.year}</div>
              </div>
            </div>

            {/* Bio */}
            <div className="mb-6 p-4 bg-white/5 rounded-2xl border border-white/10">
              <p className="text-gray-300 leading-relaxed text-sm">
                {currentProfile.bio}
              </p>
            </div>

            {/* Interests */}
            <div className="mb-6">
              <h4 className="text-white font-semibold mb-3">Interests</h4>
              <div className="flex flex-wrap gap-2">
                {currentProfile.interests.map((interest, index) => (
                  <span
                    key={index}
                    className="glass-card bg-gradient-to-r from-asu-gold/20 to-asu-maroon/20 border border-asu-gold/30 text-white px-4 py-2 rounded-full text-sm font-medium hover:from-asu-gold/30 hover:to-asu-maroon/30 transition-all duration-200 cursor-pointer"
                  >
                    {interest}
                  </span>
                ))}
                {currentProfile.interests.length > 3 && (
                  <span className="glass-card bg-white/5 border border-white/10 text-gray-400 px-4 py-2 rounded-full text-sm font-medium">
                    +{currentProfile.interests.length - 3} more
                  </span>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center items-center space-x-8 pt-4">
              <button
                onClick={() => handleSwipe('left')}
                className="group w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-110 active:scale-95"
              >
                <X size={28} className="text-white group-hover:rotate-90 transition-transform duration-200" />
              </button>

              <div className="w-20 h-20 bg-gradient-to-br from-asu-gold to-asu-light-gold rounded-full flex items-center justify-center shadow-lg animate-pulse">
                <span className="text-slate-900 text-3xl">💕</span>
              </div>

              <button
                onClick={() => handleSwipe('right')}
                className="group w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-110 active:scale-95"
              >
                <span className="text-white text-2xl group-hover:scale-125 transition-transform duration-200">❤️</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Counter */}
      <div className="text-center mt-6 relative z-10">
        <div className="glass-card rounded-2xl px-6 py-3 inline-flex items-center space-x-3">
          <div className="flex space-x-2">
            {profiles.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentProfileIndex
                    ? 'bg-gradient-to-r from-asu-gold to-asu-light-gold shadow-lg scale-125'
                    : index < currentProfileIndex
                    ? 'bg-green-500'
                    : 'bg-white/20'
                }`}
              />
            ))}
          </div>
          <div className="w-px h-4 bg-white/20"></div>
          <p className="text-white font-medium">
            <span className="text-asu-gold">{currentProfileIndex + 1}</span>
            <span className="text-gray-400"> of </span>
            <span className="text-asu-gold">{profiles.length}</span>
          </p>
        </div>
      </div>
    </div>
  );
}