import React, { useState } from 'react';
import { MapPin, GraduationCap, X, Heart, Star, MessageCircle, Info } from 'lucide-react';

interface DiscoverPageProps {
  userProfile: any;
}

// Enhanced mock profile data with more details
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
    prompts: [
      { question: "My ideal first date", answer: "Sunset hike followed by tacos and margaritas" },
      { question: "I'm looking for", answer: "Someone who can make me laugh and loves adventure" }
    ],
    verified: true,
    instagram: '@emma_asu',
    spotify: 'Connected'
  },
  {
    id: 2,
    name: 'Alex',
    age: 21,
    major: 'Computer Science',
    year: 'Senior',
    distance: '0.8 mi',
    bio: 'Tech enthusiast who loves gaming and rock climbing. Looking for someone to explore Phoenix with! Currently working on a startup idea.',
    interests: ['Gaming', 'Rock Climbing', 'Technology', 'Startups', 'Music'],
    photos: ['/api/placeholder/400/600'],
    prompts: [
      { question: "After work you'll find me", answer: "At the climbing gym or coding at a coffee shop" },
      { question: "Two truths and a lie", answer: "I've skydived, I can solve a Rubik's cube in under a minute, I hate pizza" }
    ],
    verified: false,
    instagram: '@alex_codes',
    spotify: 'Connected'
  },
  {
    id: 3,
    name: 'Sarah',
    age: 19,
    major: 'Psychology',
    year: 'Sophomore',
    distance: '1.2 mi',
    bio: 'Psychology major who loves art, music, and deep conversations. Always up for coffee at the MU! Let\'s explore downtown Phoenix art galleries together.',
    interests: ['Art', 'Music', 'Coffee', 'Reading', 'Yoga'],
    photos: ['/api/placeholder/400/600'],
    prompts: [
      { question: "My simple pleasures", answer: "Morning coffee, sunset yoga, and good conversations" },
      { question: "I geek out on", answer: "True crime podcasts and psychological thrillers" }
    ],
    verified: true,
    instagram: '@sarahh_psy',
    spotify: 'Connected'
  }
];

export default function DiscoverPage({ userProfile }: DiscoverPageProps) {
  const [currentProfileIndex, setCurrentProfileIndex] = useState(0);
  const [profiles, setProfiles] = useState(mockProfiles);
  const [imageIndex, setImageIndex] = useState(0);
  const [showDetails, setShowDetails] = useState(false);

  const currentProfile = profiles[currentProfileIndex];

  const handleSwipe = (direction: 'left' | 'right' | 'up') => {
    // Add animation class before changing profile
    const card = document.querySelector('.swipe-card-active');
    if (card) {
      card.classList.add(`swipe-${direction}`);
      setTimeout(() => {
        if (currentProfileIndex < profiles.length - 1) {
          setCurrentProfileIndex(currentProfileIndex + 1);
          setImageIndex(0);
          setShowDetails(false);
        } else {
          setCurrentProfileIndex(0);
        }
      }, 300);
    }
  };

  if (!currentProfile) {
    return (
      <div className="flex-1 flex items-center justify-center bg-black text-white">
        <div className="text-center">
          <div className="text-6xl mb-4">✨</div>
          <h2 className="text-2xl font-semibold mb-2">No more profiles</h2>
          <p className="text-gray-400">Check back later for more matches!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-black flex flex-col" style={{ paddingBottom: '80px' }}>
      {/* Main Content Area */}
      <div className="flex-1 relative px-4 py-4">
        {/* Profile Card Stack Effect */}
        <div className="absolute inset-x-4 top-8 h-[600px]">
          {/* Background cards for stack effect */}
          <div className="absolute inset-x-2 top-2 h-full bg-gray-900 rounded-3xl opacity-40"></div>
          <div className="absolute inset-x-1 top-1 h-full bg-gray-800 rounded-3xl opacity-60"></div>
        </div>

        {/* Main Profile Card */}
        <div className="relative h-[600px] swipe-card-active">
          <div className="swipe-card h-full rounded-3xl overflow-hidden relative">
            {/* Profile Image */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80">
              <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                <div className="text-6xl opacity-50">📷</div>
              </div>
            </div>

            {/* Top Bar */}
            <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-start z-10">
              <div className="flex gap-2">
                {[...Array(3)].map((_, i) => (
                  <div 
                    key={i}
                    className={`h-1 rounded-full transition-all ${
                      i === imageIndex ? 'w-8 bg-white' : 'w-8 bg-white/30'
                    }`}
                  />
                ))}
              </div>
              <button 
                onClick={() => setShowDetails(!showDetails)}
                className="bg-black/50 backdrop-blur-sm p-2 rounded-full"
              >
                <Info size={20} className="text-white" />
              </button>
            </div>

            {/* Profile Info Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
              {/* Basic Info */}
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <h2 className="text-3xl font-bold text-white">{currentProfile.name}, {currentProfile.age}</h2>
                  {currentProfile.verified && (
                    <div className="bg-blue-500 p-1 rounded-full">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"/>
                      </svg>
                    </div>
                  )}
                </div>
                
                <div className="flex items-center gap-4 text-white/80 text-sm mb-3">
                  <div className="flex items-center gap-1">
                    <GraduationCap size={16} />
                    <span>{currentProfile.major} • {currentProfile.year}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin size={16} />
                    <span>{currentProfile.distance}</span>
                  </div>
                </div>

                {/* Bio */}
                <p className="text-white/90 text-sm leading-relaxed mb-3">
                  {currentProfile.bio}
                </p>

                {/* Interests */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {currentProfile.interests.slice(0, 3).map((interest, index) => (
                    <span
                      key={index}
                      className="interest-tag"
                    >
                      {interest}
                    </span>
                  ))}
                  {currentProfile.interests.length > 3 && (
                    <span className="bg-gray-700/50 text-white px-3 py-1 rounded-full text-sm">
                      +{currentProfile.interests.length - 3} more
                    </span>
                  )}
                </div>

                {/* Prompts (shown when expanded) */}
                {showDetails && (
                  <div className="space-y-3 mb-4 animate-in fade-in slide-in-from-bottom-2">
                    {currentProfile.prompts.map((prompt, index) => (
                      <div key={index} className="bg-black/50 backdrop-blur-sm rounded-xl p-3">
                        <p className="text-white/60 text-xs mb-1">{prompt.question}</p>
                        <p className="text-white text-sm">{prompt.answer}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-4 z-20">
              <button
                onClick={() => handleSwipe('left')}
                className="action-button pass w-14 h-14 rounded-full flex items-center justify-center"
              >
                <X size={24} className="text-white" />
              </button>
              
              <button
                onClick={() => handleSwipe('up')}
                className="action-button superlike w-14 h-14 rounded-full flex items-center justify-center"
              >
                <Star size={24} className="text-white" />
              </button>
              
              <button
                onClick={() => handleSwipe('right')}
                className="action-button like w-14 h-14 rounded-full flex items-center justify-center"
              >
                <Heart size={24} className="text-white" />
              </button>
            </div>
          </div>
        </div>

        {/* Tips */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-6 text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <X size={14} /> Pass
          </div>
          <div className="flex items-center gap-1">
            <Star size={14} /> Super Like
          </div>
          <div className="flex items-center gap-1">
            <Heart size={14} /> Like
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes swipe-left {
          to {
            transform: translateX(-150%) rotate(-30deg);
            opacity: 0;
          }
        }
        @keyframes swipe-right {
          to {
            transform: translateX(150%) rotate(30deg);
            opacity: 0;
          }
        }
        @keyframes swipe-up {
          to {
            transform: translateY(-150%) scale(0.8);
            opacity: 0;
          }
        }
        .swipe-card-active.swipe-left {
          animation: swipe-left 0.3s ease-out forwards;
        }
        .swipe-card-active.swipe-right {
          animation: swipe-right 0.3s ease-out forwards;
        }
        .swipe-card-active.swipe-up {
          animation: swipe-up 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
}