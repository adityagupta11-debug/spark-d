import { useState } from 'react';
import { Heart, MessageCircle, MapPin, Calendar, Coffee, Film, Utensils, Dumbbell, Book, Music } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Match {
  id: string;
  name: string;
  age: number;
  major: string;
  photo: string;
  matchedAt: Date;
  lastMessage?: string;
  commonInterests: string[];
  musicCompatibility?: number;
}

interface DateIdea {
  id: string;
  title: string;
  location: string;
  description: string;
  category: 'food' | 'activity' | 'study' | 'entertainment' | 'sports';
  icon: React.ReactNode;
  distance: string;
  price: '$' | '$$' | '$$$' | 'Free';
}

const asuDateIdeas: DateIdea[] = [
  {
    id: '1',
    title: 'Coffee at Memorial Union',
    location: 'Memorial Union, Tempe Campus',
    description: 'Grab coffee at Starbucks and enjoy the view from the upper floors',
    category: 'food',
    icon: <Coffee className="w-5 h-5" />,
    distance: '0.3 mi',
    price: '$'
  },
  {
    id: '2',
    title: 'Sunset at "A" Mountain',
    location: 'Hayden Butte Preserve',
    description: 'Hike up for amazing sunset views of campus and the valley',
    category: 'activity',
    icon: <MapPin className="w-5 h-5" />,
    distance: '0.8 mi',
    price: 'Free'
  },
  {
    id: '3',
    title: 'Study Date at Noble Library',
    location: 'Noble Science Library',
    description: 'Find a quiet spot to study together with great resources',
    category: 'study',
    icon: <Book className="w-5 h-5" />,
    distance: '0.5 mi',
    price: 'Free'
  },
  {
    id: '4',
    title: 'Dinner at Postino Tempe',
    location: 'Mill Avenue',
    description: 'Wine, bruschetta, and great atmosphere on Mill Ave',
    category: 'food',
    icon: <Utensils className="w-5 h-5" />,
    distance: '1.2 mi',
    price: '$$'
  },
  {
    id: '5',
    title: 'Sun Devils Game',
    location: 'Sun Devil Stadium/Desert Financial Arena',
    description: 'Catch a football or basketball game together',
    category: 'sports',
    icon: <Dumbbell className="w-5 h-5" />,
    distance: '0.6 mi',
    price: '$$'
  },
  {
    id: '6',
    title: 'Movie at Harkins Tempe Marketplace',
    location: 'Tempe Marketplace',
    description: 'Latest movies in a comfortable theater with dining options nearby',
    category: 'entertainment',
    icon: <Film className="w-5 h-5" />,
    distance: '2.5 mi',
    price: '$$'
  },
  {
    id: '7',
    title: 'Boba at Tea Swirl',
    location: 'University Dr & Rural Rd',
    description: 'Popular boba spot near campus with tons of flavors',
    category: 'food',
    icon: <Coffee className="w-5 h-5" />,
    distance: '0.4 mi',
    price: '$'
  },
  {
    id: '8',
    title: 'Live Music at The Van Buren',
    location: 'Downtown Phoenix',
    description: 'Catch emerging artists and established acts at this venue',
    category: 'entertainment',
    icon: <Music className="w-5 h-5" />,
    distance: '8 mi',
    price: '$$$'
  }
];

// Mock matches for demonstration
const mockMatches: Match[] = [
  {
    id: '1',
    name: 'Emma',
    age: 20,
    major: 'Business Administration',
    photo: '/api/placeholder/100/100',
    matchedAt: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    lastMessage: "Hey! I'd love to grab coffee sometime 😊",
    commonInterests: ['Hiking', 'Photography', 'Coffee'],
    musicCompatibility: 85
  },
  {
    id: '2',
    name: 'Sophia',
    age: 19,
    major: 'Psychology',
    photo: '/api/placeholder/100/100',
    matchedAt: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    commonInterests: ['Reading', 'Coffee', 'Music'],
    musicCompatibility: 72
  }
];

export function MatchesScreen() {
  const [matches, setMatches] = useState<Match[]>(mockMatches);
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  const [showDateIdeas, setShowDateIdeas] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const getTimeAgo = (date: Date) => {
    const minutes = Math.floor((Date.now() - date.getTime()) / 60000);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  const filteredDateIdeas = selectedCategory === 'all' 
    ? asuDateIdeas 
    : asuDateIdeas.filter(idea => idea.category === selectedCategory);

  const categories = [
    { id: 'all', label: 'All', icon: '🎯' },
    { id: 'food', label: 'Food & Drinks', icon: '🍽️' },
    { id: 'activity', label: 'Activities', icon: '🎨' },
    { id: 'study', label: 'Study', icon: '📚' },
    { id: 'entertainment', label: 'Entertainment', icon: '🎬' },
    { id: 'sports', label: 'Sports', icon: '🏈' }
  ];

  if (matches.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] px-4">
        <div className="text-6xl mb-4">💔</div>
        <h2 className="text-white text-2xl font-semibold mb-2">No matches yet</h2>
        <p className="text-gray-400 text-center">Keep swiping to find your perfect Sun Devil match!</p>
      </div>
    );
  }

  return (
    <div className="px-4 py-4">
      <h1 className="text-white text-2xl font-semibold mb-4">Your Matches</h1>
      
      {/* Matches List */}
      <div className="space-y-3 mb-6">
        {matches.map((match) => (
          <motion.div
            key={match.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-900 rounded-xl p-4 border border-gray-800"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-yellow-400 to-red-500 flex items-center justify-center">
                    <span className="text-2xl">👤</span>
                  </div>
                  {match.musicCompatibility && match.musicCompatibility > 70 && (
                    <div className="absolute -top-1 -right-1 bg-green-500 rounded-full p-1">
                      <Music className="w-3 h-3 text-white" />
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="text-white font-medium">{match.name}, {match.age}</h3>
                  <p className="text-gray-400 text-sm">{match.major}</p>
                  <p className="text-gray-500 text-xs">Matched {getTimeAgo(match.matchedAt)}</p>
                  {match.musicCompatibility && (
                    <p className="text-green-400 text-xs mt-1">🎵 {match.musicCompatibility}% music match</p>
                  )}
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setSelectedMatch(match);
                    setShowDateIdeas(true);
                  }}
                  className="p-2 bg-yellow-600 hover:bg-yellow-700 rounded-lg transition-colors"
                >
                  <Calendar className="w-5 h-5 text-black" />
                </button>
                <button className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors">
                  <MessageCircle className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>
            {match.lastMessage && (
              <div className="mt-3 p-2 bg-gray-800 rounded-lg">
                <p className="text-gray-300 text-sm">{match.lastMessage}</p>
              </div>
            )}
            {match.commonInterests.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {match.commonInterests.map((interest) => (
                  <span key={interest} className="text-xs bg-gray-800 text-gray-400 px-2 py-1 rounded-full">
                    {interest}
                  </span>
                ))}
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Date Ideas Modal */}
      <AnimatePresence>
        {showDateIdeas && selectedMatch && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-50 flex items-end"
            onClick={() => setShowDateIdeas(false)}
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25 }}
              className="bg-gray-900 rounded-t-3xl w-full max-h-[80vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="p-4 border-b border-gray-800">
                <div className="w-12 h-1 bg-gray-600 rounded-full mx-auto mb-4" />
                <h2 className="text-white text-xl font-semibold text-center">
                  Date Ideas with {selectedMatch.name}
                </h2>
                <p className="text-gray-400 text-sm text-center mt-1">
                  Discover fun activities around ASU campus
                </p>
              </div>

              {/* Categories */}
              <div className="px-4 py-3 flex gap-2 overflow-x-auto no-scrollbar border-b border-gray-800">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`flex items-center gap-1 px-3 py-1.5 rounded-full whitespace-nowrap transition-colors ${
                      selectedCategory === cat.id
                        ? 'bg-yellow-600 text-black'
                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    }`}
                  >
                    <span>{cat.icon}</span>
                    <span className="text-sm">{cat.label}</span>
                  </button>
                ))}
              </div>

              {/* Date Ideas List */}
              <div className="overflow-y-auto max-h-[50vh] p-4 space-y-3">
                {filteredDateIdeas.map((idea) => (
                  <motion.div
                    key={idea.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-gray-800 rounded-xl p-4 hover:bg-gray-750 transition-colors cursor-pointer"
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-gray-700 rounded-lg">
                        {idea.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-white font-medium">{idea.title}</h3>
                        <p className="text-gray-400 text-sm mt-1">{idea.description}</p>
                        <div className="flex items-center gap-3 mt-2">
                          <span className="text-xs text-gray-500 flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {idea.location}
                          </span>
                          <span className="text-xs text-gray-500">{idea.distance}</span>
                          <span className="text-xs text-yellow-400">{idea.price}</span>
                        </div>
                      </div>
                      <button className="p-2 bg-yellow-600 hover:bg-yellow-700 rounded-lg transition-colors">
                        <Heart className="w-4 h-4 text-black" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}