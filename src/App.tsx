import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import campusImage from './assets/24b0ce647cc38b3904beeda35147b930b1688d81.png';
import sparkLogo from './assets/be0089ef2be8ba12e1e7b021047e4ab156b62992.png';
import { SignUpForm } from './components/SignUpForm';
import { SignInForm } from './components/SignInForm';
import { Button } from './components/ui/button';
import { useAuth } from './contexts/AuthContext';
import { signOutUser } from './lib/auth';
import { EnhancedDashboardLayout } from './components/Dashboard/EnhancedDashboardLayout';
import { EnhancedDiscoverScreen } from './components/Dashboard/EnhancedDiscoverScreen';
import { MatchesScreen } from './components/Dashboard/MatchesScreen';
import { ProfileScreen } from './components/Dashboard/ProfileScreen';
import { SettingsScreen } from './components/Dashboard/SettingsScreen';
import { EnhancedLanding } from './components/EnhancedLanding';

export default function App() {
  const [isSignUp, setIsSignUp] = useState(true);
  const { user, userProfile, loading } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOutUser();
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <div className="text-white text-xl">Loading Spark'd...</div>
          <p className="text-gray-400 mt-2">Please wait while we set up your experience</p>
        </div>
      </div>
    );
  }

  // Show authenticated user dashboard with routing
  if (user) {
    return (
      <Router>
        <Routes>
          <Route path="/dashboard" element={<EnhancedDashboardLayout />}>
            <Route index element={<Navigate to="/dashboard/discover" replace />} />
            <Route path="discover" element={<EnhancedDiscoverScreen />} />
            <Route path="matches" element={<MatchesScreen />} />
            <Route path="profile" element={<ProfileScreen />} />
            <Route path="settings" element={<SettingsScreen />} />
          </Route>
          <Route path="*" element={<Navigate to="/dashboard/discover" replace />} />
        </Routes>
      </Router>
    );
  }

  return <EnhancedLanding onAuth={() => {}} />;
}