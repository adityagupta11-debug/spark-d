import React, { useState, useEffect } from 'react';
import { Heart, Users, User, Settings, Sparkles, MessageCircle } from 'lucide-react';
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
  const [unreadMatches, setUnreadMatches] = useState(3);
  const [hasNewLikes, setHasNewLikes] = useState(true);

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

  useEffect(() => {
    // Clear notifications when viewing matches
    if (activeTab === 'matches') {
      setTimeout(() => {
        setUnreadMatches(0);
        setHasNewLikes(false);
      }, 1000);
    }
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-black flex flex-col">
      {/* Header - Only show on discover page */}
      {activeTab === 'discover' && (
        <div className="brand-header px-4 py-3 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg">
                <Sparkles className="text-white" size={20} />
              </div>
              <div>
                <h1 className="text-white font-bold text-lg tracking-tight">Spark'd</h1>
                <p className="text-white/70 text-xs">Find your spark at ASU</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {hasNewLikes && (
                <div className="bg-primary/20 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1">
                  <Heart className="text-primary" size={14} />
                  <span className="text-primary text-xs font-medium">3 new likes</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        {renderContent()}
      </div>

      {/* Bottom Navigation */}
      <div className="bottom-nav flex-shrink-0 safe-area-bottom">
        <div className="flex items-center justify-around px-2">
          <button
            onClick={() => setActiveTab('discover')}
            className={`flex-1 py-3 px-2 flex flex-col items-center gap-1 transition-all ${
              activeTab === 'discover' 
                ? 'active-tab scale-110' 
                : 'text-gray-500 hover:text-gray-300'
            }`}
          >
            <div className="relative">
              <Heart 
                size={24} 
                className={activeTab === 'discover' ? 'fill-current' : ''}
              />
            </div>
            <span className="text-[10px] font-medium">Discover</span>
          </button>
          
          <button
            onClick={() => setActiveTab('matches')}
            className={`flex-1 py-3 px-2 flex flex-col items-center gap-1 transition-all relative ${
              activeTab === 'matches' 
                ? 'active-tab scale-110' 
                : 'text-gray-500 hover:text-gray-300'
            }`}
          >
            <div className="relative">
              <MessageCircle 
                size={24} 
                className={activeTab === 'matches' ? 'fill-current' : ''}
              />
              {unreadMatches > 0 && (
                <div className="absolute -top-1 -right-1 bg-primary text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {unreadMatches}
                </div>
              )}
            </div>
            <span className="text-[10px] font-medium">Matches</span>
          </button>
          
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex-1 py-3 px-2 flex flex-col items-center gap-1 transition-all ${
              activeTab === 'profile' 
                ? 'active-tab scale-110' 
                : 'text-gray-500 hover:text-gray-300'
            }`}
          >
            <div className="relative">
              <User 
                size={24} 
                className={activeTab === 'profile' ? 'fill-current' : ''}
              />
            </div>
            <span className="text-[10px] font-medium">Profile</span>
          </button>
          
          <button
            onClick={() => setActiveTab('settings')}
            className={`flex-1 py-3 px-2 flex flex-col items-center gap-1 transition-all ${
              activeTab === 'settings' 
                ? 'active-tab scale-110' 
                : 'text-gray-500 hover:text-gray-300'
            }`}
          >
            <div className="relative">
              <Settings 
                size={24} 
                className={activeTab === 'settings' ? '' : ''}
              />
            </div>
            <span className="text-[10px] font-medium">Settings</span>
          </button>
        </div>
      </div>

      <style jsx>{`
        .safe-area-bottom {
          padding-bottom: env(safe-area-inset-bottom, 0);
        }
      `}</style>
    </div>
  );
}