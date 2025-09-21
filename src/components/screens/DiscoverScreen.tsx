import { useState } from 'react';
import { UserProfile } from '../../contexts/AuthContext';
import { Button } from '../ui/button';

interface DiscoverScreenProps {
  userProfile: UserProfile | null;
}

interface UserCard {
  id: string;
  name: string;
  age: number;
  major: string;
  year: string;
  distance: string;
  bio: string;
  interests: string[];
  image: string;
}

const mockUsers: UserCard[] = [
  {
    id: '1',
    name: 'Emma',
    age: 20,
    major: 'Business Administration',
    year: 'Junior',
    distance: '0.5 mi',
    bio: 'Love hiking Camelback Mountain and trying new restaurants in Tempe! Always down for a study session at the MU or catching a Sun Devils game.',
    interests: ['Hiking', 'Sun Devils Sports', 'Photography'],
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face'
  },
  {
    id: '2',
    name: 'Sarah',
    age: 21,
    major: 'Computer Science',
    year: 'Junior',
    distance: '0.3 mi',
    bio: 'Coffee enthusiast ☕ and coding wizard 💻 Looking for someone to debug life with. Love late night study sessions and weekend adventures!',
    interests: ['Coffee', 'Coding', 'Photography'],
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face'
  },
  {
    id: '3',
    name: 'Alex',
    age: 19,
    major: 'Engineering',
    year: 'Sophomore',
    distance: '0.7 mi',
    bio: 'Mechanical Engineering student who loves building things and exploring Arizona. Always up for a hike or trying new food spots!',
    interests: ['Engineering', 'Hiking', 'Food'],
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face'
  }
];

export function DiscoverScreen({ userProfile }: DiscoverScreenProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [likedUsers, setLikedUsers] = useState<string[]>([]);

  const currentUser = mockUsers[currentIndex];

  const handleLike = () => {
    setLikedUsers(prev => [...prev, currentUser.id]);
    nextCard();
  };

  const handlePass = () => {
    nextCard();
  };

  const nextCard = () => {
    if (currentIndex < mockUsers.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const handleSwipe = (direction: 'left' | 'right') => {
    if (direction === 'right') {
      handleLike();
    } else {
      handlePass();
    }
  };

  if (!currentUser) {
    return (
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="text-center">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-white text-2xl mb-2">No more profiles!</h2>
          <p className="text-gray-400">Check back later for new matches</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-black p-4">
      {/* Current Card */}
      <div className="relative max-w-sm mx-auto h-[600px] mb-8">
        <div
          className="absolute inset-0 bg-white rounded-3xl overflow-hidden shadow-2xl cursor-pointer transform transition-transform duration-300 hover:scale-105"
          onTouchEnd={(e) => {
            const card = e.currentTarget;
            const rect = card.getBoundingClientRect();
            const endX = e.changedTouches[0].clientX;
            const centerX = rect.left + rect.width / 2;
            const threshold = 50;

            if (endX < centerX - threshold) {
              handleSwipe('left');
            } else if (endX > centerX + threshold) {
              handleSwipe('right');
            }
          }}
        >
          {/* Image */}
          <div className="relative h-3/4 bg-gray-200">
            <img
              src={currentUser.image}
              alt={currentUser.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 right-4 bg-black/50 text-white px-2 py-1 rounded-full text-sm">
              📷
            </div>
          </div>

          {/* Info */}
          <div className="p-6 bg-white">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-2xl font-bold text-gray-900">
                {currentUser.name}, {currentUser.age}
              </h2>
              <div className="text-gray-500">
                👋 {currentUser.distance}
              </div>
            </div>

            <div className="flex items-center text-gray-600 mb-4">
              <span className="mr-2">🎓</span>
              <span>{currentUser.major} • {currentUser.year}</span>
            </div>

            <p className="text-gray-700 mb-4 leading-relaxed">
              {currentUser.bio}
            </p>

            {/* Interests */}
            <div className="flex flex-wrap gap-2">
              {currentUser.interests.map((interest, index) => (
                <span
                  key={index}
                  className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                >
                  {interest}
                </span>
              ))}
              <span className="text-gray-400 text-sm px-3 py-1">
                +2 more
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center space-x-8">
        <button
          onClick={handlePass}
          className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform border-4 border-red-500"
        >
          <span className="text-2xl">❌</span>
        </button>

        <button
          onClick={handleLike}
          className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform border-4 border-green-500"
        >
          <span className="text-2xl">💚</span>
        </button>
      </div>

      {/* Instructions */}
      <div className="text-center mt-8 text-gray-400 text-sm">
        <p>Swipe right to like • Swipe left to pass</p>
      </div>
    </div>
  );
}