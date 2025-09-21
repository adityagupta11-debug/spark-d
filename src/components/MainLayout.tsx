import { useState } from 'react';
import { User } from 'firebase/auth';
import { UserProfile } from '../contexts/AuthContext';
import { DiscoverScreen } from './screens/DiscoverScreen';
import { MatchesScreen } from './screens/MatchesScreen';
import { ProfileScreen } from './screens/ProfileScreen';
import { SettingsScreen } from './screens/SettingsScreen';
import { Button } from './ui/button';
import sparkLogo from '../assets/be0089ef2be8ba12e1e7b021047e4ab156b62992.png';

interface MainLayoutProps {
  user: User;
  userProfile: UserProfile | null;
  onSignOut: () => void;
}

export function MainLayout({ user, userProfile, onSignOut }: MainLayoutProps) {
  const [currentScreen, setCurrentScreen] = useState<'discover' | 'matches' | 'profile' | 'settings'>('discover');

  const navigationItems = [
    { id: 'discover' as const, label: 'Discover', icon: '💖' },
    { id: 'matches' as const, label: 'Matches', icon: '💕' },
    { id: 'profile' as const, label: 'Profile', icon: '👤' },
    { id: 'settings' as const, label: 'Settings', icon: '⚙️' },
  ];

  const renderCurrentScreen = () => {
    switch (currentScreen) {
      case 'discover':
        return <DiscoverScreen userProfile={userProfile} />;
      case 'matches':
        return <MatchesScreen />;
      case 'profile':
        return <ProfileScreen userProfile={userProfile} />;
      case 'settings':
        return <SettingsScreen userProfile={userProfile} />;
      default:
        return <DiscoverScreen userProfile={userProfile} />;
    }
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <div className="bg-[#8B1538] px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-white text-lg">🌵</span>
            </div>
            <div>
              <h1 className="text-white font-medium">Sun Devil Match</h1>
              <p className="text-white/80 text-sm">ASU Dating & Date Planning</p>
            </div>
          </div>
          <Button
            onClick={onSignOut}
            variant="outline"
            className="bg-transparent border-white/20 text-white hover:bg-white/10"
          >
            Sign Out
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        {renderCurrentScreen()}
      </div>

      {/* Bottom Navigation */}
      <div className="bg-gray-900 border-t border-gray-800">
        <div className="flex justify-around py-2">
          {navigationItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setCurrentScreen(item.id)}
              className={`flex flex-col items-center py-2 px-4 rounded-lg transition-colors ${
                currentScreen === item.id
                  ? 'bg-[#8B1538] text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <span className="text-xl mb-1">{item.icon}</span>
              <span className="text-xs">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}