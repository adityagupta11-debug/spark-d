import { useState } from 'react';
import { ProfileCard, Profile } from './ProfileCard';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles } from 'lucide-react';

interface SwipeScreenProps {
  onMatch: (profile: Profile) => void;
}

// Mock profiles for ASU students
const mockProfiles: Profile[] = [
  {
    id: '1',
    name: 'Emma',
    age: 20,
    major: 'Business Administration',
    year: 'Junior',
    bio: 'Love hiking Camelback Mountain and trying new restaurants in Tempe! Always down for a study session at the MU or catching a Sun Devils game. 🌵',
    photos: ['https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400'],
    interests: ['Hiking', 'Sun Devils Sports', 'Photography', 'Coffee', 'Business'],
    distance: 0.5
  },
  {
    id: '2',
    name: 'Jake',
    age: 21,
    major: 'Computer Science',
    year: 'Senior',
    bio: 'Tech enthusiast and rock climbing addict. Building the next big app between classes. Let\'s grab boba in Tempe Town Lake area! 🧗‍♂️',
    photos: ['https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400'],
    interests: ['Rock Climbing', 'Coding', 'Gaming', 'Boba', 'Startups'],
    distance: 1.2
  },
  {
    id: '3',
    name: 'Sophia',
    age: 19,
    major: 'Psychology',
    year: 'Sophomore',
    bio: 'Passionate about mental health advocacy and desert photography. Love exploring Old Town Scottsdale and Phoenix art scene. Looking for genuine connections! 🎨',
    photos: ['https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400'],
    interests: ['Psychology', 'Art', 'Photography', 'Yoga', 'Advocacy'],
    distance: 2.1
  },
  {
    id: '4',
    name: 'Alex',
    age: 22,
    major: 'Engineering',
    year: 'Senior',
    bio: 'Mechanical engineer who loves working on cars and mountain biking South Mountain trails. Always up for late night In-N-Out runs! 🚗',
    photos: ['https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400'],
    interests: ['Mountain Biking', 'Cars', 'Engineering', 'Mechanics', 'Outdoors'],
    distance: 0.8
  },
  {
    id: '5',
    name: 'Maya',
    age: 20,
    major: 'Journalism',
    year: 'Junior',
    bio: 'Aspiring journalist covering ASU events for The State Press. Love live music at venues like Crescent Ballroom and exploring downtown Phoenix! 📰',
    photos: ['https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400'],
    interests: ['Journalism', 'Live Music', 'Writing', 'Events', 'Phoenix'],
    distance: 1.5
  }
];

export function SwipeScreen({ onMatch }: SwipeScreenProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showMatch, setShowMatch] = useState<Profile | null>(null);

  const currentProfile = mockProfiles[currentIndex];

  const handleSwipe = (direction: 'left' | 'right') => {
    if (direction === 'right' && Math.random() > 0.7) {
      // 30% chance of match
      setShowMatch(currentProfile);
      onMatch(currentProfile);
    }

    setTimeout(() => {
      setCurrentIndex(prev => (prev + 1) % mockProfiles.length);
      setShowMatch(null);
    }, showMatch ? 2000 : 0);
  };

  if (!currentProfile) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-6">
        <Sparkles className="w-16 h-16 text-primary mb-4" />
        <h2 className="text-xl mb-2">No more profiles!</h2>
        <p className="text-muted-foreground text-center">Check back later for more matches!</p>
      </div>
    );
  }

  return (
    <div className="relative h-full p-4">
      <AnimatePresence mode="wait">
        {showMatch ? (
          <motion.div
            key="match"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="flex flex-col items-center justify-center h-full"
          >
            <div className="text-white rounded-2xl p-8 text-center max-w-sm" style={{background: 'linear-gradient(to right, #8C1D40, #7A1936)'}}>
              <div className="text-6xl mb-4">🍽️</div>
              <h2 className="text-2xl mb-2">It's a Match! 🎉</h2>
              <p>You and {showMatch.name} both forked up!</p>
              <p className="text-sm mt-2 opacity-90">Time to plan the perfect date!</p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key={currentProfile.id}
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="flex items-center justify-center h-full"
          >
            <ProfileCard profile={currentProfile} onSwipe={handleSwipe} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}