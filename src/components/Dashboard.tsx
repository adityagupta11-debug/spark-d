import React, { useState } from 'react';
// @ts-ignore - local environment may not resolve lucide-react types
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
    <div className="min-h-screen brand-gradient flex flex-col">
      {/* Header */}
      <div className="brand-header px-4 py-4 flex-shrink-0 border-b border-white/10">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
            <span className="text-white text-lg">🌵</span>
          </div>
          <div>
            <h1 className="text-white font-semibold text-lg">Sun Devil Match</h1>
            <p className="text-white/80 text-sm">ASU Dating & Date Planning</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        {renderContent()}
      </div>

      {/* Bottom Navigation */}
      <div className="bg-black/60 glass-card border-t border-white/10 flex-shrink-0">
        <div className="flex">
          <button
            onClick={() => setActiveTab('discover')}
            className={`flex-1 py-4 px-2 flex flex-col items-center space-y-1 transition-colors ${
              activeTab === 'discover' 
                ? 'brand-active' 
                : 'text-gray-300 hover:text-white'
            }`}
          >
            <Heart size={24} />
            <span className="text-xs font-medium">Discover</span>
          </button>
          
          <button
            onClick={() => setActiveTab('matches')}
            className={`flex-1 py-4 px-2 flex flex-col items-center space-y-1 transition-colors ${
              activeTab === 'matches' 
                ? 'brand-active' 
                : 'text-gray-300 hover:text-white'
            }`}
          >
            <Users size={24} />
            <span className="text-xs font-medium">Matches</span>
          </button>
          
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex-1 py-4 px-2 flex flex-col items-center space-y-1 transition-colors ${
              activeTab === 'profile' 
                ? 'brand-active' 
                : 'text-gray-300 hover:text-white'
            }`}
          >
            <User size={24} />
            <span className="text-xs font-medium">Profile</span>
          </button>
          
          <button
            onClick={() => setActiveTab('settings')}
            className={`flex-1 py-4 px-2 flex flex-col items-center space-y-1 transition-colors ${
              activeTab === 'settings' 
                ? 'brand-active' 
                : 'text-gray-300 hover:text-white'
            }`}
          >
            <Settings size={24} />
            <span className="text-xs font-medium">Settings</span>
          </button>
        </div>
      </div>
    </div>
  );
}