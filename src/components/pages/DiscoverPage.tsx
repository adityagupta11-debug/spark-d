import React, { useState } from 'react';
import { MapPin, GraduationCap, X, Heart } from 'lucide-react';

interface DiscoverPageProps {
  userProfile: any;
  onMatch?: (profile: any) => void;
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
    bio: 'Love hiking and trying new restaurants! Always down for a study session or catching a game with friends. 🌟',
    interests: ['Hiking', 'Sports', 'Photography'],
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
    bio: 'Psychology major who loves art, music, and deep conversations. Always up for coffee and great chats!',
    interests: ['Art', 'Music', 'Coffee'],
    photos: ['/api/placeholder/400/600']
  }
];

export default function DiscoverPage({ userProfile, onMatch }: DiscoverPageProps) {
  const [currentProfileIndex, setCurrentProfileIndex] = useState(0);
  const [profiles, setProfiles] = useState(mockProfiles);

  const currentProfile = profiles[currentProfileIndex];

  const handleSwipe = (direction: 'left' | 'right') => {
    if (direction === 'right' && Math.random() > 0.7 && onMatch) {
      // 30% chance of match
      onMatch({
        id: currentProfile.id.toString(),
        name: currentProfile.name,
        age: currentProfile.age,
        major: currentProfile.major,
        year: currentProfile.year,
        bio: currentProfile.bio,
        photos: currentProfile.photos,
        interests: currentProfile.interests,
        distance: parseFloat(currentProfile.distance)
      });
    }
    
    if (currentProfileIndex < profiles.length - 1) {
      setCurrentProfileIndex(currentProfileIndex + 1);
    } else {
      // Reset to first profile or show "no more profiles" message
      setCurrentProfileIndex(0);
    }
  };

  if (!currentProfile) {
    return (
      <div className="flex-1 flex items-center justify-center bg-black text-white">
        <div className="text-center">
          <div className="text-6xl mb-4">✨</div>
          <h2 className="text-2xl font-semibold mb-2">No more profiles</h2>
          <p className="text-gray-400">Check back later for more connections!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-black px-4 py-6 flex flex-col">
      {/* Profile Card */}
      <div className="flex-1 max-w-sm mx-auto w-full">
        <div className="bg-white rounded-3xl overflow-hidden shadow-2xl h-full flex flex-col">
          {/* Profile Image */}
          <div className="relative h-96 bg-gray-200">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-32 h-32 bg-gray-300 rounded-full flex items-center justify-center">
                <span className="text-4xl text-gray-500">📷</span>
              </div>
            </div>
          </div>

          {/* Profile Info */}
          <div className="flex-1 bg-black text-white p-6">
            {/* Name and Distance */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <h2 className="text-2xl font-bold">{currentProfile.name}, {currentProfile.age}</h2>
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
            <p className="text-gray-300 text-sm mb-4 leading-relaxed">
              {currentProfile.bio}
            </p>

            {/* Interests */}
            <div className="flex flex-wrap gap-2 mb-6">
              {currentProfile.interests.map((interest, index) => (
                <span
                  key={index}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm"
                >
                  {interest}
                </span>
              ))}
              {currentProfile.interests.length > 3 && (
                <span className="bg-gray-700 text-white px-3 py-1 rounded-full text-sm">
                  +{currentProfile.interests.length - 3} more
                </span>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center space-x-6">
              <button
                onClick={() => handleSwipe('left')}
                className="w-14 h-14 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center transition-colors"
              >
                <X size={24} className="text-white" />
              </button>
              
              <button
                onClick={() => handleSwipe('right')}
                className="w-14 h-14 bg-yellow-500 hover:bg-yellow-600 rounded-full flex items-center justify-center transition-colors"
              >
                <span className="text-white text-2xl">🍴</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Counter */}
      <div className="text-center mt-4">
        <div className="flex justify-center space-x-2">
          {profiles.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full ${
                index === currentProfileIndex ? 'bg-pink-500' : 'bg-gray-600'
              }`}
            />
          ))}
        </div>
        <p className="text-gray-400 text-sm mt-2">
          {currentProfileIndex + 1} of {profiles.length}
        </p>
      </div>
    </div>
  );
}