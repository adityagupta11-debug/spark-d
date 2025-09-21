import React, { useState } from 'react';
import { HeartCrack, MessageCircle, Video, Calendar, Search, Filter } from 'lucide-react';

interface Match {
  id: number;
  name: string;
  age: number;
  photo: string;
  lastMessage: string;
  lastMessageTime: string;
  unread: boolean;
  online: boolean;
  matchedDate: string;
  compatibility: number;
}

const mockMatches: Match[] = [
  {
    id: 1,
    name: 'Emma',
    age: 20,
    photo: '/api/placeholder/60/60',
    lastMessage: "That sounds amazing! When are you free?",
    lastMessageTime: '2m ago',
    unread: true,
    online: true,
    matchedDate: 'Today',
    compatibility: 92
  },
  {
    id: 2,
    name: 'Sarah',
    age: 19,
    photo: '/api/placeholder/60/60',
    lastMessage: "Haha yes! The coffee at MU is the best 😊",
    lastMessageTime: '1h ago',
    unread: false,
    online: true,
    matchedDate: 'Yesterday',
    compatibility: 87
  },
  {
    id: 3,
    name: 'Alex',
    age: 21,
    photo: '/api/placeholder/60/60',
    lastMessage: "Want to check out that new climbing gym?",
    lastMessageTime: '3h ago',
    unread: false,
    online: false,
    matchedDate: '2 days ago',
    compatibility: 85
  },
];

export default function MatchesPage() {
  const [matches, setMatches] = useState(mockMatches);
  const [activeTab, setActiveTab] = useState<'messages' | 'likes'>('messages');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const filteredMatches = matches.filter(match => 
    match.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const EmptyState = () => (
    <div className="flex-1 flex items-center justify-center px-6">
      <div className="text-center max-w-sm">
        <div className="mb-6">
          <div className="w-16 h-16 mx-auto mb-4 text-red-500">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              <path d="M8 2L16 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
        </div>
        <h2 className="text-white text-2xl font-semibold mb-3">
          {activeTab === 'messages' ? 'No matches yet' : 'No likes yet'}
        </h2>
        <p className="text-gray-400 text-base leading-relaxed">
          {activeTab === 'messages' 
            ? 'Keep swiping to find your perfect match!'
            : 'When someone likes you, they\'ll appear here'}
        </p>
      </div>
    </div>
  );

  return (
    <div className="flex-1 bg-black flex flex-col">
      {/* Header */}
      <div className="px-4 py-4 border-b border-gray-800">
        {/* Tabs */}
        <div className="flex gap-1 bg-gray-900 rounded-xl p-1 mb-4">
          <button
            onClick={() => setActiveTab('messages')}
            className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
              activeTab === 'messages'
                ? 'bg-primary text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Messages
            {matches.filter(m => m.unread).length > 0 && (
              <span className="ml-2 notification-badge">
                {matches.filter(m => m.unread).length}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('likes')}
            className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
              activeTab === 'likes'
                ? 'bg-primary text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Likes
            <span className="ml-2 text-xs opacity-60">(3)</span>
          </button>
        </div>

        {/* Search and Filter */}
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search matches..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-900 text-white pl-10 pr-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="bg-gray-900 text-white p-2 rounded-xl hover:bg-gray-800 transition-colors"
          >
            <Filter size={20} />
          </button>
        </div>

        {/* Filter Options */}
        {showFilters && (
          <div className="mt-3 flex gap-2 flex-wrap">
            <button className="bg-gray-900 text-white px-3 py-1 rounded-full text-sm hover:bg-primary transition-colors">
              Online Now
            </button>
            <button className="bg-gray-900 text-white px-3 py-1 rounded-full text-sm hover:bg-primary transition-colors">
              New Matches
            </button>
            <button className="bg-gray-900 text-white px-3 py-1 rounded-full text-sm hover:bg-primary transition-colors">
              Nearby
            </button>
          </div>
        )}
      </div>

      {/* Content */}
      {activeTab === 'messages' && filteredMatches.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="flex-1 overflow-y-auto">
          {activeTab === 'messages' ? (
            <div className="px-4 py-2">
              {/* New Matches Section */}
              {matches.some(m => m.matchedDate === 'Today') && (
                <div className="mb-4">
                  <h3 className="text-gray-400 text-sm font-medium mb-3">New Matches</h3>
                  <div className="flex gap-3 overflow-x-auto pb-2">
                    {matches.filter(m => m.matchedDate === 'Today').map(match => (
                      <div key={match.id} className="flex-shrink-0 text-center">
                        <div className="relative">
                          <div className="w-16 h-16 bg-gradient-to-br from-primary to-pink-600 rounded-full p-0.5">
                            <div className="w-full h-full bg-gray-700 rounded-full flex items-center justify-center">
                              <span className="text-2xl">👤</span>
                            </div>
                          </div>
                          {match.online && (
                            <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-black"></div>
                          )}
                        </div>
                        <p className="text-white text-xs mt-1">{match.name}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Messages List */}
              <div className="space-y-2">
                <h3 className="text-gray-400 text-sm font-medium mb-3">Messages</h3>
                {filteredMatches.map(match => (
                  <div
                    key={match.id}
                    className="match-card p-3 rounded-xl flex items-center gap-3 cursor-pointer"
                  >
                    {/* Avatar */}
                    <div className="relative">
                      <div className="w-14 h-14 bg-gray-700 rounded-full flex items-center justify-center">
                        <span className="text-2xl">👤</span>
                      </div>
                      {match.online && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-black"></div>
                      )}
                    </div>

                    {/* Message Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className={`font-medium ${match.unread ? 'text-white' : 'text-gray-300'}`}>
                          {match.name}, {match.age}
                        </h4>
                        <span className={`text-xs ${match.unread ? 'text-primary' : 'text-gray-500'}`}>
                          {match.lastMessageTime}
                        </span>
                      </div>
                      <p className={`text-sm truncate ${match.unread ? 'text-gray-300 font-medium' : 'text-gray-500'}`}>
                        {match.lastMessage}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      {match.unread && (
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* Likes Tab */
            <div className="px-4 py-4">
              <div className="bg-gradient-to-br from-primary/20 to-purple-600/20 rounded-xl p-4 mb-4">
                <h3 className="text-white font-medium mb-2">Upgrade to Gold</h3>
                <p className="text-gray-300 text-sm mb-3">See who likes you and match instantly!</p>
                <button className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-medium px-4 py-2 rounded-lg text-sm">
                  Upgrade Now
                </button>
              </div>

              {/* Blurred likes grid */}
              <div className="grid grid-cols-2 gap-3">
                {[1, 2, 3].map(i => (
                  <div key={i} className="relative">
                    <div className="aspect-[3/4] bg-gray-800 rounded-xl overflow-hidden">
                      <div className="w-full h-full bg-gradient-to-b from-gray-700 to-gray-900"></div>
                    </div>
                    <div className="absolute inset-0 backdrop-blur-xl rounded-xl flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-2">
                          <Heart className="text-primary" size={20} />
                        </div>
                        <p className="text-white text-xs font-medium">Someone liked you!</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Quick Actions Bar */}
      {filteredMatches.length > 0 && activeTab === 'messages' && (
        <div className="border-t border-gray-800 px-4 py-3 flex justify-around">
          <button className="flex flex-col items-center gap-1 text-gray-400 hover:text-white transition-colors">
            <Video size={20} />
            <span className="text-xs">Video Date</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-gray-400 hover:text-white transition-colors">
            <Calendar size={20} />
            <span className="text-xs">Plan Date</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-gray-400 hover:text-white transition-colors">
            <MessageCircle size={20} />
            <span className="text-xs">Quick Chat</span>
          </button>
        </div>
      )}
    </div>
  );
}