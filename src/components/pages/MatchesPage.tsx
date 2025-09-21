import React, { useState } from 'react';
import { Heart, MessageCircle, Star, MoreHorizontal, Search, Filter, Phone, Video, Send, Smile, Camera, Image, X, Check, Clock, MapPin } from 'lucide-react';

interface Match {
  id: number;
  name: string;
  age: number;
  major: string;
  year: string;
  distance: string;
  photos: string[];
  lastMessage?: string;
  lastMessageTime?: string;
  unreadCount?: number;
  isOnline: boolean;
  verified: boolean;
  isSuperLike?: boolean;
  matchDate: string;
}

// Mock matches data
const mockMatches: Match[] = [
  {
    id: 1,
    name: 'Emma',
    age: 20,
    major: 'Business Administration',
    year: 'Junior',
    distance: '0.5 mi',
    photos: ['https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=600&fit=crop&crop=face'],
    lastMessage: 'Hey! How was your day?',
    lastMessageTime: '2m',
    unreadCount: 2,
    isOnline: true,
    verified: true,
    isSuperLike: true,
    matchDate: '2024-01-15'
  },
  {
    id: 2,
    name: 'Alex',
    age: 21,
    major: 'Computer Science',
    year: 'Senior',
    distance: '0.8 mi',
    photos: ['https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=600&fit=crop&crop=face'],
    lastMessage: 'Want to grab coffee sometime?',
    lastMessageTime: '1h',
    unreadCount: 0,
    isOnline: false,
    verified: false,
    matchDate: '2024-01-14'
  },
  {
    id: 3,
    name: 'Sarah',
    age: 19,
    major: 'Psychology',
    year: 'Sophomore',
    distance: '1.2 mi',
    photos: ['https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=600&fit=crop&crop=face'],
    lastMessage: 'Thanks for the great conversation!',
    lastMessageTime: '3h',
    unreadCount: 0,
    isOnline: true,
    verified: true,
    matchDate: '2024-01-13'
  },
  {
    id: 4,
    name: 'Jordan',
    age: 22,
    major: 'Engineering',
    year: 'Graduate',
    distance: '2.1 mi',
    photos: ['https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=600&fit=crop&crop=face'],
    lastMessage: 'See you tomorrow!',
    lastMessageTime: '1d',
    unreadCount: 1,
    isOnline: false,
    verified: true,
    matchDate: '2024-01-12'
  }
];

export default function MatchesPage() {
  const [matches, setMatches] = useState<Match[]>(mockMatches);
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [messageText, setMessageText] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'unread' | 'superlikes'>('all');

  const filteredMatches = matches.filter(match => {
    const matchesSearch = match.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         match.major.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeTab === 'unread') return match.unreadCount && match.unreadCount > 0;
    if (activeTab === 'superlikes') return match.isSuperLike;
    return matchesSearch;
  });

  const handleSendMessage = () => {
    if (messageText.trim() && selectedMatch) {
      // In a real app, this would send the message to the backend
      console.log(`Sending message to ${selectedMatch.name}: ${messageText}`);
      setMessageText('');
    }
  };

  const formatMatchDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString();
  };

  if (selectedMatch) {
    return (
      <div className="flex-1 bg-gradient-to-br from-gray-900 via-black to-gray-900 flex flex-col">
        {/* Chat Header */}
        <div className="bg-black/50 backdrop-blur-sm px-4 py-4 flex items-center justify-between border-b border-gray-800">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setSelectedMatch(null)}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <X size={20} className="text-white" />
            </button>
            <div className="relative">
              <img
                src={selectedMatch.photos[0]}
                alt={selectedMatch.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              {selectedMatch.isOnline && (
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-black" />
              )}
            </div>
            <div>
              <h3 className="text-white font-semibold flex items-center space-x-1">
                <span>{selectedMatch.name}</span>
                {selectedMatch.verified && <Star size={14} className="text-blue-400 fill-blue-400" />}
              </h3>
              <p className="text-gray-400 text-sm">
                {selectedMatch.isOnline ? 'Online' : `Last seen ${selectedMatch.lastMessageTime} ago`}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
              <Phone size={20} className="text-white" />
            </button>
            <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
              <Video size={20} className="text-white" />
            </button>
            <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
              <MoreHorizontal size={20} className="text-white" />
            </button>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* Match notification */}
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-[#8C1D40] to-[#FFC627] text-white px-4 py-2 rounded-full text-sm font-medium">
              <Heart size={16} className="fill-white" />
              <span>You and {selectedMatch.name} liked each other!</span>
            </div>
            <p className="text-gray-400 text-xs mt-2">{formatMatchDate(selectedMatch.matchDate)}</p>
          </div>

          {/* Sample messages */}
          <div className="space-y-4">
            <div className="flex justify-start">
              <div className="bg-gray-800 text-white px-4 py-2 rounded-2xl rounded-bl-md max-w-xs">
                <p>Hey! How's it going?</p>
                <p className="text-xs text-gray-400 mt-1">2:30 PM</p>
              </div>
            </div>
            <div className="flex justify-end">
              <div className="bg-gradient-to-r from-[#8C1D40] to-[#FFC627] text-white px-4 py-2 rounded-2xl rounded-br-md max-w-xs">
                <p>Great! Just finished my classes for the day</p>
                <p className="text-xs text-white/70 mt-1">2:32 PM</p>
              </div>
            </div>
            <div className="flex justify-start">
              <div className="bg-gray-800 text-white px-4 py-2 rounded-2xl rounded-bl-md max-w-xs">
                <p>Nice! What are you studying?</p>
                <p className="text-xs text-gray-400 mt-1">2:33 PM</p>
              </div>
            </div>
          </div>
        </div>

        {/* Message Input */}
        <div className="bg-black/50 backdrop-blur-sm p-4 border-t border-gray-800">
          <div className="flex items-center space-x-3">
            <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
              <Camera size={20} className="text-white" />
            </button>
            <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
              <Image size={20} className="text-white" />
            </button>
            <div className="flex-1 relative">
              <input
                type="text"
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                placeholder="Type a message..."
                className="w-full bg-gray-800 text-white px-4 py-3 rounded-full pr-12 focus:outline-none focus:ring-2 focus:ring-[#8C1D40]"
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 hover:bg-white/10 rounded-full transition-colors">
                <Smile size={20} className="text-white" />
              </button>
            </div>
            <button
              onClick={handleSendMessage}
              disabled={!messageText.trim()}
              className="p-3 bg-gradient-to-r from-[#8C1D40] to-[#FFC627] rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all"
            >
              <Send size={20} className="text-white" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-gradient-to-br from-gray-900 via-black to-gray-900 flex flex-col">
      {/* Header */}
      <div className="bg-black/50 backdrop-blur-sm px-4 py-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-white">Matches</h1>
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <Filter size={20} className="text-white" />
            </button>
            <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
              <Search size={20} className="text-white" />
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative mb-4">
          <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search matches..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-gray-800 text-white pl-10 pr-4 py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-[#8C1D40]"
          />
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 bg-gray-800 p-1 rounded-lg">
          {[
            { key: 'all', label: 'All', count: matches.length },
            { key: 'unread', label: 'Unread', count: matches.filter(m => m.unreadCount && m.unreadCount > 0).length },
            { key: 'superlikes', label: 'Super Likes', count: matches.filter(m => m.isSuperLike).length }
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                activeTab === tab.key
                  ? 'bg-gradient-to-r from-[#8C1D40] to-[#FFC627] text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>
      </div>

      {/* Matches List */}
      <div className="flex-1 overflow-y-auto">
        {filteredMatches.length === 0 ? (
          <div className="flex-1 flex items-center justify-center px-6">
            <div className="text-center max-w-sm">
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-[#8C1D40] to-[#FFC627] rounded-full flex items-center justify-center">
                <Heart size={32} className="text-white fill-white" />
              </div>
              <h2 className="text-white text-2xl font-semibold mb-3">
                {activeTab === 'unread' ? 'No unread messages' : 
                 activeTab === 'superlikes' ? 'No super likes yet' : 'No matches yet'}
              </h2>
              <p className="text-gray-400 text-base leading-relaxed">
                {activeTab === 'unread' ? 'All caught up! Check back later for new messages.' :
                 activeTab === 'superlikes' ? 'Super like someone to see them here!' :
                 'Keep swiping to find your perfect Sun Devil match!'}
              </p>
            </div>
          </div>
        ) : (
          <div className="px-4 py-2 space-y-2">
            {filteredMatches.map((match) => (
              <div
                key={match.id}
                onClick={() => setSelectedMatch(match)}
                className="bg-gray-800/50 hover:bg-gray-800/70 rounded-2xl p-4 cursor-pointer transition-all hover:scale-[1.02]"
              >
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <img
                      src={match.photos[0]}
                      alt={match.name}
                      className="w-14 h-14 rounded-full object-cover"
                    />
                    {match.isOnline && (
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-black" />
                    )}
                    {match.isSuperLike && (
                      <div className="absolute -top-1 -right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                        <Star size={12} className="text-white fill-white" />
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="text-white font-semibold flex items-center space-x-1">
                        <span className="truncate">{match.name}, {match.age}</span>
                        {match.verified && <Star size={14} className="text-blue-400 fill-blue-400 flex-shrink-0" />}
                      </h3>
                      <div className="flex items-center space-x-2">
                        {match.unreadCount && match.unreadCount > 0 && (
                          <div className="bg-gradient-to-r from-[#8C1D40] to-[#FFC627] text-white text-xs font-bold px-2 py-1 rounded-full min-w-[20px] text-center">
                            {match.unreadCount}
                          </div>
                        )}
                        <span className="text-gray-400 text-xs">{match.lastMessageTime}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2 mb-1">
                      <GraduationCap size={12} className="text-gray-400" />
                      <span className="text-gray-400 text-sm">{match.major} • {match.year}</span>
                      <MapPin size={12} className="text-gray-400 ml-2" />
                      <span className="text-gray-400 text-sm">{match.distance}</span>
                    </div>
                    
                    {match.lastMessage && (
                      <p className="text-gray-300 text-sm truncate">{match.lastMessage}</p>
                    )}
                  </div>
                  
                  <div className="flex flex-col items-end space-y-1">
                    <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
                      <MessageCircle size={16} className="text-gray-400" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Filters Modal */}
      {showFilters && (
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 m-4 max-w-sm w-full">
            <h3 className="text-xl font-bold mb-4">Filter Matches</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Sort by</label>
                <select className="w-full p-2 border rounded">
                  <option>Most recent</option>
                  <option>Unread first</option>
                  <option>Alphabetical</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Show only</label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-sm">Unread messages</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-sm">Super likes</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-sm">Online now</span>
                  </label>
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