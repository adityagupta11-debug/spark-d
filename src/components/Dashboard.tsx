import React, { useState, useEffect } from 'react';
import { Heart, Users, User, Settings, MapPin, GraduationCap, Sparkles, Bell, TrendingUp } from 'lucide-react';
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-pink-900 flex flex-col">
      {/* Modern Header with Glassmorphism */}
      <header className="glass-dark border-b border-white/10 flex-shrink-0">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg animate-pulse-glow">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-white font-bold text-lg">Sun Devil Match</h1>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <p className="text-green-400 text-sm">Online Now</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button className="relative p-2 rounded-full glass hover:bg-white/10 transition-colors">
                <Bell className="w-5 h-5 text-white" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <button className="p-2 rounded-full glass hover:bg-white/10 transition-colors">
                <TrendingUp className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content with Background */}
      <div className="flex-1 overflow-hidden relative">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>
        </div>
        <div className="relative z-10 h-full">
          {renderContent()}
        </div>
      </div>

      {/* Modern Bottom Navigation with Glassmorphism */}
      <nav className="glass-dark border-t border-white/10 flex-shrink-0">
        <div className="flex">
          <button
            onClick={() => setActiveTab('discover')}
            className={`relative flex-1 py-4 px-2 flex flex-col items-center space-y-1 transition-all duration-300 ${
              activeTab === 'discover' 
                ? 'text-yellow-400' 
                : 'text-white/60 hover:text-white'
            }`}
          >
            {activeTab === 'discover' && (
              <div className="absolute inset-0 bg-gradient-to-t from-yellow-400/20 to-transparent"></div>
            )}
            <Heart 
              size={24} 
              className={activeTab === 'discover' ? 'fill-yellow-400' : ''}
            />
            <span className="text-xs font-medium">Discover</span>
            {activeTab === 'discover' && (
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-yellow-400 rounded-full"></div>
            )}
          </button>
          
          <button
            onClick={() => setActiveTab('matches')}
            className={`relative flex-1 py-4 px-2 flex flex-col items-center space-y-1 transition-all duration-300 ${
              activeTab === 'matches' 
                ? 'text-yellow-400' 
                : 'text-white/60 hover:text-white'
            }`}
          >
            {activeTab === 'matches' && (
              <div className="absolute inset-0 bg-gradient-to-t from-yellow-400/20 to-transparent"></div>
            )}
            <Users 
              size={24}
              className={activeTab === 'matches' ? 'fill-yellow-400' : ''}
            />
            <span className="text-xs font-medium">Matches</span>
            {activeTab === 'matches' && (
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-yellow-400 rounded-full"></div>
            )}
          </button>
          
          <button
            onClick={() => setActiveTab('profile')}
            className={`relative flex-1 py-4 px-2 flex flex-col items-center space-y-1 transition-all duration-300 ${
              activeTab === 'profile' 
                ? 'text-yellow-400' 
                : 'text-white/60 hover:text-white'
            }`}
          >
            {activeTab === 'profile' && (
              <div className="absolute inset-0 bg-gradient-to-t from-yellow-400/20 to-transparent"></div>
            )}
            <User 
              size={24}
              className={activeTab === 'profile' ? 'fill-yellow-400' : ''}
            />
            <span className="text-xs font-medium">Profile</span>
            {activeTab === 'profile' && (
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-yellow-400 rounded-full"></div>
            )}
          </button>
          
          <button
            onClick={() => setActiveTab('settings')}
            className={`relative flex-1 py-4 px-2 flex flex-col items-center space-y-1 transition-all duration-300 ${
              activeTab === 'settings' 
                ? 'text-yellow-400' 
                : 'text-white/60 hover:text-white'
            }`}
          >
            {activeTab === 'settings' && (
              <div className="absolute inset-0 bg-gradient-to-t from-yellow-400/20 to-transparent"></div>
            )}
            <Settings 
              size={24}
              className={activeTab === 'settings' ? 'fill-yellow-400' : ''}
            />
            <span className="text-xs font-medium">Settings</span>
            {activeTab === 'settings' && (
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-yellow-400 rounded-full"></div>
            )}
          </button>
        </div>
      </nav>
    </div>
  );
}