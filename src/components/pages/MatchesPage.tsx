import React, { useState, useEffect } from 'react';
import { HeartCrack, Heart, MessageCircle, Star, MapPin, Clock, Filter, Search, Sparkles, Coffee, Calendar } from 'lucide-react';

// Mock matches data with comprehensive features
const mockMatches = [
  {
    id: 1,
    name: 'Emma',
    age: 20,
    photos: [
      'https://images.unsplash.com/photo-1494790108755-2616c6d35a6c?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=400&fit=crop'
    ],
    distance: '0.5 mi',
    matchedAt: '2024-01-15T10:30:00Z',
    lastMessage: 'Hey! Thanks for the match 😊',
    lastMessageTime: '2024-01-15T14:20:00Z',
    unreadCount: 2,
    interests: ['Hiking', 'Photography', 'Coffee'],
    verified: true,
    premium: false,
    major: 'Business Administration',
    mutualFriends: 3,
    compatibility: 92,
    isOnline: true,
    hasStory: true
  },
  {
    id: 2,
    name: 'Alex',
    age: 21,
    photos: [
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop'
    ],
    distance: '0.8 mi',
    matchedAt: '2024-01-14T16:45:00Z',
    lastMessage: 'Want to grab coffee sometime?',
    lastMessageTime: '2024-01-14T18:30:00Z',
    unreadCount: 0,
    interests: ['Gaming', 'Technology', 'Rock Climbing'],
    verified: true,
    premium: true,
    major: 'Computer Science',
    mutualFriends: 1,
    compatibility: 88,
    isOnline: false,
    hasStory: false
  },
  {
    id: 3,
    name: 'Sarah',
    age: 19,
    photos: [
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop'
    ],
    distance: '1.2 mi',
    matchedAt: '2024-01-13T09:15:00Z',
    lastMessage: 'Love your music taste!',
    lastMessageTime: '2024-01-13T11:45:00Z',
    unreadCount: 1,
    interests: ['Art', 'Music', 'Reading'],
    verified: false,
    premium: false,
    major: 'Psychology',
    mutualFriends: 0,
    compatibility: 85,
    isOnline: true,
    hasStory: true
  },
  {
    id: 4,
    name: 'Jordan',
    age: 22,
    photos: [
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop'
    ],
    distance: '2.1 mi',
    matchedAt: '2024-01-12T20:00:00Z',
    lastMessage: null,
    lastMessageTime: null,
    unreadCount: 0,
    interests: ['Sports', 'Fitness', 'Travel'],
    verified: true,
    premium: false,
    major: 'Kinesiology',
    mutualFriends: 2,
    compatibility: 90,
    isOnline: false,
    hasStory: false
  }
];

export default function MatchesPage() {
  const [matches, setMatches] = useState(mockMatches);
  const [filter, setFilter] = useState('all'); // all, new, messaged, online
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMatch, setSelectedMatch] = useState(null);

  const filteredMatches = matches.filter(match => {
    const matchesSearch = match.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    switch (filter) {
      case 'new':
        return matchesSearch && !match.lastMessage;
      case 'messaged':
        return matchesSearch && match.lastMessage;
      case 'online':
        return matchesSearch && match.isOnline;
      default:
        return matchesSearch;
    }
  }).sort((a, b) => {
    // Sort by unread messages first, then by last activity
    if (a.unreadCount > 0 && b.unreadCount === 0) return -1;
    if (a.unreadCount === 0 && b.unreadCount > 0) return 1;
    
    const aTime = new Date(a.lastMessageTime || a.matchedAt);
    const bTime = new Date(b.lastMessageTime || b.matchedAt);
    return bTime.getTime() - aTime.getTime();
  });

  const formatTimeAgo = (timestamp) => {
    if (!timestamp) return 'Just matched';
    
    const now = new Date();
    const time = new Date(timestamp);
    const diffInHours = Math.floor((now - time) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  if (matches.length === 0) {
    return (
      <div className="flex-1 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center px-6">
        <div className="text-center max-w-sm">
          {/* Animated Heart */}
          <div className="mb-6">
            <div className="w-20 h-20 mx-auto mb-4 text-pink-400 animate-pulse">
              <HeartCrack className="w-full h-full" />
            </div>
          </div>

          {/* Empty State Message */}
          <h2 className="text-white text-2xl font-semibold mb-3">
            No matches yet
          </h2>
          
          <p className="text-gray-300 text-base leading-relaxed mb-6">
            Keep swiping to find your perfect Sun Devil match! Your connections will appear here.
          </p>

          <button className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-3 rounded-full font-medium hover:shadow-lg transition-all duration-300 transform hover:scale-105">
            Start Swiping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 overflow-hidden">
      {/* Header */}
      <div className="bg-black/20 backdrop-blur-sm px-4 py-4 border-b border-white/10">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-white text-2xl font-bold">Matches</h1>
          <div className="flex items-center space-x-2">
            <div className="bg-pink-500 text-white text-xs px-2 py-1 rounded-full">
              {matches.reduce((sum, match) => sum + match.unreadCount, 0)} new
            </div>
            <button className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
              <Filter size={18} className="text-white" />
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search matches..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/10 backdrop-blur-sm text-white placeholder-gray-300 pl-10 pr-4 py-3 rounded-full border border-white/20 focus:border-pink-400 focus:outline-none transition-colors"
          />
        </div>

        {/* Filter Tabs */}
        <div className="flex space-x-2 mt-4">
          {[
            { key: 'all', label: 'All', count: matches.length },
            { key: 'new', label: 'New', count: matches.filter(m => !m.lastMessage).length },
            { key: 'messaged', label: 'Messaged', count: matches.filter(m => m.lastMessage).length },
            { key: 'online', label: 'Online', count: matches.filter(m => m.isOnline).length }
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                filter === tab.key
                  ? 'bg-pink-500 text-white'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
            >
              {tab.label} {tab.count > 0 && `(${tab.count})`}
            </button>
          ))}
        </div>
      </div>

      {/* Matches List */}
      <div className="flex-1 overflow-y-auto">
        {filteredMatches.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <Search size={48} className="mx-auto mb-4 text-gray-400" />
              <p className="text-gray-300">No matches found for "{searchQuery}"</p>
            </div>
          </div>
        ) : (
          <div className="space-y-2 p-4">
            {filteredMatches.map((match) => (
              <div
                key={match.id}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20 hover:bg-white/15 transition-all duration-300 cursor-pointer group"
                onClick={() => setSelectedMatch(match)}
              >
                <div className="flex items-center space-x-4">
                  {/* Profile Photo */}
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-300 ring-2 ring-white/20">
                      <img
                        src={match.photos[0]}
                        alt={match.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = `https://ui-avatars.com/api/?name=${match.name}&size=64&background=8B4B6B&color=fff`;
                        }}
                      />
                    </div>
                    
                    {/* Online Status */}
                    {match.isOnline && (
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white"></div>
                    )}
                    
                    {/* Story Ring */}
                    {match.hasStory && (
                      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 p-0.5">
                        <div className="w-full h-full rounded-full bg-white/10 backdrop-blur-sm"></div>
                      </div>
                    )}
                  </div>

                  {/* Match Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <h3 className="text-white font-semibold truncate">{match.name}, {match.age}</h3>
                      {match.verified && (
                        <Star size={14} className="text-blue-400 fill-current" />
                      )}
                      {match.premium && (
                        <Sparkles size={14} className="text-yellow-400" />
                      )}
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-300 mb-1">
                      <MapPin size={12} className="mr-1" />
                      <span>{match.distance}</span>
                      <span className="mx-2">•</span>
                      <span>{match.compatibility}% match</span>
                    </div>

                    {match.lastMessage ? (
                      <p className="text-gray-300 text-sm truncate">
                        {match.lastMessage}
                      </p>
                    ) : (
                      <p className="text-pink-400 text-sm">
                        Say hello! 👋
                      </p>
                    )}
                  </div>

                  {/* Right Side */}
                  <div className="flex flex-col items-end space-y-2">
                    <span className="text-xs text-gray-400">
                      {formatTimeAgo(match.lastMessageTime || match.matchedAt)}
                    </span>
                    
                    {match.unreadCount > 0 && (
                      <div className="w-6 h-6 bg-pink-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-bold">
                          {match.unreadCount}
                        </span>
                      </div>
                    )}

                    <div className="flex space-x-2">
                      <button className="w-8 h-8 bg-pink-500/20 rounded-full flex items-center justify-center hover:bg-pink-500/30 transition-colors group-hover:scale-110 transform duration-300">
                        <MessageCircle size={14} className="text-pink-400" />
                      </button>
                      <button className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center hover:bg-blue-500/30 transition-colors group-hover:scale-110 transform duration-300">
                        <Coffee size={14} className="text-blue-400" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Match Details Preview */}
                <div className="mt-3 pt-3 border-t border-white/10">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-xs text-gray-400">
                      <span>{match.major}</span>
                      {match.mutualFriends > 0 && (
                        <span>{match.mutualFriends} mutual friends</span>
                      )}
                    </div>
                    
                    <div className="flex space-x-1">
                      {match.interests.slice(0, 2).map((interest, index) => (
                        <span
                          key={index}
                          className="bg-white/10 text-gray-300 px-2 py-1 rounded-full text-xs"
                        >
                          {interest}
                        </span>
                      ))}
                      {match.interests.length > 2 && (
                        <span className="bg-white/10 text-gray-300 px-2 py-1 rounded-full text-xs">
                          +{match.interests.length - 2}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick Action Bar */}
      <div className="bg-black/30 backdrop-blur-sm px-4 py-3 border-t border-white/10">
        <div className="flex justify-center space-x-6">
          <button className="flex flex-col items-center space-y-1 text-gray-300 hover:text-white transition-colors">
            <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
              <Heart size={20} className="text-white" />
            </div>
            <span className="text-xs">Likes</span>
          </button>
          
          <button className="flex flex-col items-center space-y-1 text-gray-300 hover:text-white transition-colors">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
              <MessageCircle size={20} className="text-white" />
            </div>
            <span className="text-xs">Messages</span>
          </button>
          
          <button className="flex flex-col items-center space-y-1 text-gray-300 hover:text-white transition-colors">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-600 rounded-full flex items-center justify-center">
              <Calendar size={20} className="text-white" />
            </div>
            <span className="text-xs">Dates</span>
          </button>
        </div>
      </div>
    </div>
  );
}