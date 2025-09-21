import { useState } from 'react';
import { SwipeScreen } from './components/SwipeScreen';
import { MatchesScreen } from './components/MatchesScreen';
import { DatePlanningScreen } from './components/DatePlanningScreen';
import { ProfileScreen } from './components/ProfileScreen';
import { SettingsScreen } from './components/SettingsScreen';
import DiscoverPage from './components/pages/DiscoverPage';
import MatchesPage from './components/pages/MatchesPage';
import ProfilePage from './components/pages/ProfilePage';
import SettingsPage from './components/pages/SettingsPage';
import { ThemeProvider } from './components/ThemeProvider';
import { Profile } from './components/ProfileCard';
import { Button } from './components/ui/button';
import { Heart, Users, User, Calendar, Settings } from 'lucide-react';

type Screen = 'swipe' | 'matches' | 'profile' | 'date-planning' | 'settings';

function AppContent() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('swipe');
  const [matches, setMatches] = useState<Profile[]>([]);
  const [selectedMatch, setSelectedMatch] = useState<Profile | null>(null);
  
  // Mock user data for the profile and settings pages
  const mockUser = {
    email: 'user@example.com',
    displayName: 'John Doe'
  };
  
  const mockUserProfile = {
    firstName: 'John',
    lastName: 'Doe',
    age: 21,
    major: 'Computer Science',
    year: 'junior',
    bio: 'Love coding, hiking, and meeting new people! Always up for a good conversation.',
    interests: ['Coding', 'Hiking', 'Music', 'Movies']
  };

  const handleMatch = (profile: Profile) => {
    setMatches(prev => {
      // Prevent duplicate matches by checking if profile already exists
      if (prev.some(match => match.id === profile.id)) {
        return prev;
      }
      return [...prev, profile];
    });
  };

  const handlePlanDate = (profile: Profile) => {
    setSelectedMatch(profile);
    setCurrentScreen('date-planning');
  };

  const handleBackFromDatePlanning = () => {
    setSelectedMatch(null);
    setCurrentScreen('matches');
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'swipe':
        return <DiscoverPage userProfile={mockUserProfile} onMatch={handleMatch} />;
      case 'matches':
        return matches.length > 0 ? <MatchesScreen matches={matches} onPlanDate={handlePlanDate} /> : <MatchesPage />;
      case 'profile':
        return <ProfilePage user={mockUser} userProfile={mockUserProfile} />;
      case 'settings':
        return <SettingsPage user={mockUser} userProfile={mockUserProfile} onSignOut={() => console.log('Sign out')} />;
      case 'date-planning':
        return (
          <DatePlanningScreen 
            selectedMatch={selectedMatch} 
            onBack={handleBackFromDatePlanning}
          />
        );
      default:
        return <DiscoverPage userProfile={mockUserProfile} onMatch={handleMatch} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4 shadow-lg">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              ✨
            </div>
            <div>
              <h1 className="text-lg">Spark'd</h1>
              <p className="text-xs text-yellow-100">Where Connections Ignite</p>
            </div>
          </div>
          {matches.length > 0 && currentScreen === 'swipe' && (
            <div className="bg-white/20 px-2 py-1 rounded-full text-xs">
              {matches.length} match{matches.length !== 1 ? 'es' : ''}
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-md mx-auto bg-background min-h-[calc(100vh-140px)] shadow-xl">
        {currentScreen !== 'date-planning' && renderScreen()}
        {currentScreen === 'date-planning' && renderScreen()}
      </div>

      {/* Bottom Navigation */}
      {currentScreen !== 'date-planning' && (
        <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border">
          <div className="max-w-md mx-auto flex">
            <Button
              variant={currentScreen === 'swipe' ? 'default' : 'ghost'}
              className="flex-1 rounded-none h-16 flex flex-col gap-1"
              onClick={() => setCurrentScreen('swipe')}
            >
              <Heart className="w-5 h-5" />
              <span className="text-xs">Discover</span>
            </Button>
            
            <Button
              variant={currentScreen === 'matches' ? 'default' : 'ghost'}
              className="flex-1 rounded-none h-16 flex flex-col gap-1 relative"
              onClick={() => setCurrentScreen('matches')}
            >
              <Users className="w-5 h-5" />
              <span className="text-xs">Matches</span>
              {matches.length > 0 && (
                <div className="absolute top-2 right-2 w-5 h-5 bg-pink-500 text-white rounded-full text-xs flex items-center justify-center">
                  {matches.length}
                </div>
              )}
            </Button>
            
            <Button
              variant={currentScreen === 'profile' ? 'default' : 'ghost'}
              className="flex-1 rounded-none h-16 flex flex-col gap-1"
              onClick={() => setCurrentScreen('profile')}
            >
              <User className="w-5 h-5" />
              <span className="text-xs">Profile</span>
            </Button>
            
            <Button
              variant={currentScreen === 'settings' ? 'default' : 'ghost'}
              className="flex-1 rounded-none h-16 flex flex-col gap-1"
              onClick={() => setCurrentScreen('settings')}
            >
              <Settings className="w-5 h-5" />
              <span className="text-xs">Settings</span>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}