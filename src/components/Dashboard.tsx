import React, { useState } from 'react';
import { Heart, Users, User, Settings, MapPin, GraduationCap } from 'lucide-react';
import DiscoverPage from './pages/DiscoverPage';
import MatchesPage from './pages/MatchesPage';
import ProfilePage from './pages/ProfilePage';
import SettingsPage from './pages/SettingsPage';

type TabType = 'discover' | 'matches' | 'profile' | 'settings';

interface DashboardProps {
  user: any;
  userProfile: any;
  onSignOut: () => void;
}

export default function Dashboard({ user, userProfile, onSignOut }: DashboardProps) {
  const [activeTab, setActiveTab] = useState<TabType>('discover');

  const renderContent = () => {
    switch (activeTab) {
      case 'discover':
        return <DiscoverPage userProfile={userProfile} />;
      case 'matches':
        return <MatchesPage />;
      case 'profile':
        return <ProfilePage user={user} userProfile={userProfile} />;
      case 'settings':
        return <SettingsPage user={user} userProfile={userProfile} onSignOut={onSignOut} />;
      default:
        return <DiscoverPage userProfile={userProfile} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800 flex flex-col relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-asu-gold/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-asu-maroon/5 rounded-full blur-3xl"></div>
      </div>

      {/* Modern Header */}
      <div className="glass-card px-4 py-4 mx-4 mt-4 rounded-2xl backdrop-blur-xl flex-shrink-0 relative z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-asu-gold to-asu-maroon rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-2xl filter drop-shadow-sm">🌵</span>
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
            </div>
            <div>
              <h1 className="text-white font-bold text-xl gradient-text">Sun Devil Match</h1>
              <p className="text-white/70 text-sm font-medium">ASU Dating & Date Planning</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-2 text-white/60 text-sm">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>Online</span>
            </div>
            <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center cursor-pointer hover:bg-white/20 transition-colors">
              <span className="text-white text-sm">👤</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        {renderContent()}
      </div>

      {/* Modern Bottom Navigation */}
      <div className="glass-card mx-4 mb-4 rounded-2xl backdrop-blur-xl border border-white/10 flex-shrink-0 relative z-10">
        <div className="flex">
          <button
            onClick={() => setActiveTab('discover')}
            className={`flex-1 py-4 px-2 flex flex-col items-center space-y-2 transition-all duration-300 rounded-2xl mx-1 my-1 ${
              activeTab === 'discover'
                ? 'bg-gradient-to-br from-asu-gold to-asu-light-gold text-slate-900 shadow-lg transform scale-105'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <div className={`p-2 rounded-xl transition-all duration-300 ${
              activeTab === 'discover' ? 'bg-white/20' : 'bg-white/5'
            }`}>
              <Heart size={20} />
            </div>
            <span className="text-xs font-semibold">Discover</span>
          </button>

          <button
            onClick={() => setActiveTab('matches')}
            className={`flex-1 py-4 px-2 flex flex-col items-center space-y-2 transition-all duration-300 rounded-2xl mx-1 my-1 ${
              activeTab === 'matches'
                ? 'bg-gradient-to-br from-asu-gold to-asu-light-gold text-slate-900 shadow-lg transform scale-105'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <div className={`p-2 rounded-xl transition-all duration-300 ${
              activeTab === 'matches' ? 'bg-white/20' : 'bg-white/5'
            }`}>
              <Users size={20} />
            </div>
            <span className="text-xs font-semibold">Matches</span>
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`flex-1 py-4 px-2 flex flex-col items-center space-y-2 transition-all duration-300 rounded-2xl mx-1 my-1 ${
              activeTab === 'profile'
                ? 'bg-gradient-to-br from-asu-gold to-asu-light-gold text-slate-900 shadow-lg transform scale-105'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <div className={`p-2 rounded-xl transition-all duration-300 ${
              activeTab === 'profile' ? 'bg-white/20' : 'bg-white/5'
            }`}>
              <User size={20} />
            </div>
            <span className="text-xs font-semibold">Profile</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`flex-1 py-4 px-2 flex flex-col items-center space-y-2 transition-all duration-300 rounded-2xl mx-1 my-1 ${
              activeTab === 'settings'
                ? 'bg-gradient-to-br from-asu-gold to-asu-light-gold text-slate-900 shadow-lg transform scale-105'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <div className={`p-2 rounded-xl transition-all duration-300 ${
              activeTab === 'settings' ? 'bg-white/20' : 'bg-white/5'
            }`}>
              <Settings size={20} />
            </div>
            <span className="text-xs font-semibold">Settings</span>
          </button>
        </div>
      </div>
    </div>
  );
}