import React, { useState, useEffect } from 'react';
import { Heart, Users, User, Settings, Bell, Sparkles, Zap, Star } from 'lucide-react';
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
  const [notifications, setNotifications] = useState(3);
  const [newMatches, setNewMatches] = useState(2);
  const [isOnline, setIsOnline] = useState(true);

  // Mock real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate notifications
      if (Math.random() > 0.7) {
        setNotifications(prev => prev + 1);
      }
      // Simulate new matches
      if (Math.random() > 0.9) {
        setNewMatches(prev => prev + 1);
      }
    }, 30000); // Every 30 seconds

    return () => clearInterval(interval);
  }, []);

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

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    
    // Clear notifications when viewing relevant tabs
    if (tab === 'matches' && newMatches > 0) {
      setNewMatches(0);
    }
    if (tab === 'settings' && notifications > 0) {
      setNotifications(0);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex flex-col relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 bg-pink-500/10 rounded-full blur-xl animate-float"></div>
        <div className="absolute top-20 right-20 w-40 h-40 bg-purple-500/10 rounded-full blur-xl animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-20 left-20 w-36 h-36 bg-blue-500/10 rounded-full blur-xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-10 right-10 w-28 h-28 bg-indigo-500/10 rounded-full blur-xl animate-float" style={{ animationDelay: '0.5s' }}></div>
      </div>

      {/* Enhanced Header */}
      <div className="relative z-10 bg-black/20 backdrop-blur-sm px-4 py-4 border-b border-white/10 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg animate-pulse-glow">
              <Sparkles size={20} className="text-white" />
            </div>
            <div>
              <h1 className="text-white font-bold text-xl gradient-text">Spark'd</h1>
              <p className="text-gray-300 text-sm">Find your perfect match ✨</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {/* Online Status */}
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${isOnline ? 'bg-green-500' : 'bg-gray-400'} animate-pulse`}></div>
              <span className="text-gray-300 text-sm">{isOnline ? 'Online' : 'Offline'}</span>
            </div>

            {/* Notifications */}
            <div className="relative">
              <button className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-300 transform hover:scale-110">
                <Bell size={18} className="text-white" />
              </button>
              {notifications > 0 && (
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center animate-bounce">
                  <span className="text-white text-xs font-bold">{notifications > 9 ? '9+' : notifications}</span>
                </div>
              )}
            </div>

            {/* Premium Badge */}
            <div className="bg-gradient-to-r from-yellow-500 to-orange-500 px-3 py-1 rounded-full">
              <div className="flex items-center space-x-1">
                <Star size={12} className="text-white" />
                <span className="text-white text-xs font-bold">FREE</span>
              </div>
            </div>
          </div>
        </div>

        {/* User Welcome Message */}
        <div className="mt-3 text-center">
          <p className="text-gray-300 text-sm">
            Welcome back, {user?.displayName?.split(' ')[0] || 'Sun Devil'}! 
            {activeTab === 'discover' && ' Ready to find your spark?'}
            {activeTab === 'matches' && ' Check out your connections!'}
            {activeTab === 'profile' && ' Your profile looks amazing!'}
            {activeTab === 'settings' && ' Customize your experience!'}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden relative z-10">
        {renderContent()}
      </div>

      {/* Enhanced Bottom Navigation */}
      <div className="relative z-10 bg-black/30 backdrop-blur-sm border-t border-white/10 flex-shrink-0">
        <div className="flex relative">
          {/* Active Tab Indicator */}
          <div 
            className="absolute top-0 h-1 bg-gradient-to-r from-pink-500 to-purple-600 transition-all duration-300 ease-in-out"
            style={{
              left: `${['discover', 'matches', 'profile', 'settings'].indexOf(activeTab) * 25}%`,
              width: '25%'
            }}
          />

          <button
            onClick={() => handleTabChange('discover')}
            className={`flex-1 py-4 px-2 flex flex-col items-center space-y-1 transition-all duration-300 transform ${
              activeTab === 'discover' 
                ? 'text-white scale-110' 
                : 'text-gray-400 hover:text-white hover:scale-105'
            }`}
          >
            <div className="relative">
              <Heart size={24} className={activeTab === 'discover' ? 'fill-current' : ''} />
              {activeTab === 'discover' && (
                <div className="absolute -inset-2 bg-gradient-to-r from-pink-500/20 to-purple-600/20 rounded-full animate-pulse"></div>
              )}
            </div>
            <span className="text-xs font-medium">Discover</span>
          </button>
          
          <button
            onClick={() => handleTabChange('matches')}
            className={`flex-1 py-4 px-2 flex flex-col items-center space-y-1 transition-all duration-300 transform relative ${
              activeTab === 'matches' 
                ? 'text-white scale-110' 
                : 'text-gray-400 hover:text-white hover:scale-105'
            }`}
          >
            <div className="relative">
              <Users size={24} />
              {newMatches > 0 && (
                <div className="absolute -top-2 -right-2 w-5 h-5 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center animate-bounce">
                  <span className="text-white text-xs font-bold">{newMatches}</span>
                </div>
              )}
              {activeTab === 'matches' && (
                <div className="absolute -inset-2 bg-gradient-to-r from-pink-500/20 to-purple-600/20 rounded-full animate-pulse"></div>
              )}
            </div>
            <span className="text-xs font-medium">Matches</span>
          </button>
          
          <button
            onClick={() => handleTabChange('profile')}
            className={`flex-1 py-4 px-2 flex flex-col items-center space-y-1 transition-all duration-300 transform ${
              activeTab === 'profile' 
                ? 'text-white scale-110' 
                : 'text-gray-400 hover:text-white hover:scale-105'
            }`}
          >
            <div className="relative">
              <User size={24} />
              {activeTab === 'profile' && (
                <div className="absolute -inset-2 bg-gradient-to-r from-pink-500/20 to-purple-600/20 rounded-full animate-pulse"></div>
              )}
            </div>
            <span className="text-xs font-medium">Profile</span>
          </button>
          
          <button
            onClick={() => handleTabChange('settings')}
            className={`flex-1 py-4 px-2 flex flex-col items-center space-y-1 transition-all duration-300 transform ${
              activeTab === 'settings' 
                ? 'text-white scale-110' 
                : 'text-gray-400 hover:text-white hover:scale-105'
            }`}
          >
            <div className="relative">
              <Settings size={24} />
              {activeTab === 'settings' && (
                <div className="absolute -inset-2 bg-gradient-to-r from-pink-500/20 to-purple-600/20 rounded-full animate-pulse"></div>
              )}
            </div>
            <span className="text-xs font-medium">Settings</span>
          </button>
        </div>

        {/* Quick Action Floating Button */}
        <div className="absolute -top-8 right-6">
          <button 
            className="w-14 h-14 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 flex items-center justify-center animate-pulse-glow"
            onClick={() => {
              // Quick action based on current tab
              if (activeTab === 'discover') {
                // Trigger boost or super like
                console.log('Boost activated!');
              } else if (activeTab === 'matches') {
                // Quick message
                console.log('Quick message!');
              }
            }}
          >
            {activeTab === 'discover' && <Zap size={24} className="text-white" />}
            {activeTab === 'matches' && <Heart size={24} className="text-white fill-current" />}
            {activeTab === 'profile' && <Sparkles size={24} className="text-white" />}
            {activeTab === 'settings' && <Star size={24} className="text-white" />}
          </button>
        </div>
      </div>
    </div>
  );
}