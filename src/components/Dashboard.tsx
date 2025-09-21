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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600/90 to-pink-600/90 backdrop-blur-md px-6 py-6 flex-shrink-0 shadow-2xl relative z-10">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg">
            <span className="text-white text-2xl">🌵</span>
          </div>
          <div>
            <h1 className="text-white font-bold text-2xl tracking-tight">Sun Devil Match</h1>
            <p className="text-white/90 text-sm font-medium">ASU Dating & Date Planning</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden relative z-10">
        {renderContent()}
      </div>

      {/* Bottom Navigation */}
      <div className="bg-slate-900/80 backdrop-blur-xl border-t border-white/10 flex-shrink-0 relative z-10">
        <div className="flex">
          <button
            onClick={() => setActiveTab('discover')}
            className={`flex-1 py-4 px-2 flex flex-col items-center space-y-1 transition-all duration-300 ${
              activeTab === 'discover' 
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg' 
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Heart size={24} className={`transition-transform duration-200 ${activeTab === 'discover' ? 'scale-110' : ''}`} />
            <span className="text-xs font-semibold">Discover</span>
          </button>
          
          <button
            onClick={() => setActiveTab('matches')}
            className={`flex-1 py-4 px-2 flex flex-col items-center space-y-1 transition-all duration-300 ${
              activeTab === 'matches' 
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg' 
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Users size={24} className={`transition-transform duration-200 ${activeTab === 'matches' ? 'scale-110' : ''}`} />
            <span className="text-xs font-semibold">Matches</span>
          </button>
          
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex-1 py-4 px-2 flex flex-col items-center space-y-1 transition-all duration-300 ${
              activeTab === 'profile' 
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg' 
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <User size={24} className={`transition-transform duration-200 ${activeTab === 'profile' ? 'scale-110' : ''}`} />
            <span className="text-xs font-semibold">Profile</span>
          </button>
          
          <button
            onClick={() => setActiveTab('settings')}
            className={`flex-1 py-4 px-2 flex flex-col items-center space-y-1 transition-all duration-300 ${
              activeTab === 'settings' 
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg' 
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Settings size={24} className={`transition-transform duration-200 ${activeTab === 'settings' ? 'scale-110' : ''}`} />
            <span className="text-xs font-semibold">Settings</span>
          </button>
        </div>
      </div>
    </div>
  );
}