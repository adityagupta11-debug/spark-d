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
    <div className="min-h-screen bg-gradient-to-br from-[#8B4B6B] via-[#2D1B69] to-black flex flex-col">
      {/* Enhanced Header */}
      <div className="backdrop-blur-lg bg-white/10 border-b border-white/20 px-6 py-4 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-[#ffc627] to-[#ffb000] rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-2xl">🌵</span>
            </div>
            <div>
              <h1 className="text-white font-bold text-xl tracking-tight">Sun Devil Match</h1>
              <p className="text-white/80 text-sm font-medium">Welcome back, {userProfile?.firstName || 'Sun Devil'}!</p>
            </div>
          </div>
          <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full border border-white/30 flex items-center justify-center">
            <User size={20} className="text-white" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        {renderContent()}
      </div>

      {/* Enhanced Bottom Navigation */}
      <div className="backdrop-blur-xl bg-black/40 border-t border-white/10 flex-shrink-0 px-2 py-2">
        <div className="flex bg-white/5 rounded-2xl p-1">
          <button
            onClick={() => setActiveTab('discover')}
            className={`flex-1 py-3 px-4 flex flex-col items-center space-y-1 rounded-xl transition-all duration-300 ${
              activeTab === 'discover' 
                ? 'bg-gradient-to-br from-[#ffc627] to-[#ffb000] text-black shadow-lg transform scale-105' 
                : 'text-white/70 hover:text-white hover:bg-white/10'
            }`}
          >
            <Heart size={22} />
            <span className="text-xs font-bold">Discover</span>
          </button>
          
          <button
            onClick={() => setActiveTab('matches')}
            className={`flex-1 py-3 px-4 flex flex-col items-center space-y-1 rounded-xl transition-all duration-300 ${
              activeTab === 'matches' 
                ? 'bg-gradient-to-br from-[#ffc627] to-[#ffb000] text-black shadow-lg transform scale-105' 
                : 'text-white/70 hover:text-white hover:bg-white/10'
            }`}
          >
            <Users size={22} />
            <span className="text-xs font-bold">Matches</span>
          </button>
          
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex-1 py-3 px-4 flex flex-col items-center space-y-1 rounded-xl transition-all duration-300 ${
              activeTab === 'profile' 
                ? 'bg-gradient-to-br from-[#ffc627] to-[#ffb000] text-black shadow-lg transform scale-105' 
                : 'text-white/70 hover:text-white hover:bg-white/10'
            }`}
          >
            <User size={22} />
            <span className="text-xs font-bold">Profile</span>
          </button>
          
          <button
            onClick={() => setActiveTab('settings')}
            className={`flex-1 py-3 px-4 flex flex-col items-center space-y-1 rounded-xl transition-all duration-300 ${
              activeTab === 'settings' 
                ? 'bg-gradient-to-br from-[#ffc627] to-[#ffb000] text-black shadow-lg transform scale-105' 
                : 'text-white/70 hover:text-white hover:bg-white/10'
            }`}
          >
            <Settings size={22} />
            <span className="text-xs font-bold">Settings</span>
          </button>
        </div>
      </div>
    </div>
  );
}