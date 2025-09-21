import React, { useState } from 'react';
import { SignUpForm } from './components/SignUpForm';
import { SignInForm } from './components/SignInForm';
import { Button } from './components/ui/button';
import { useAuth } from './contexts/AuthContext';
import { signOutUser } from './lib/auth';
import Dashboard from './components/Dashboard';

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

  // Show authenticated user dashboard
  if (user) {
    return <Dashboard user={user} userProfile={userProfile} onSignOut={handleSignOut} />;
  }

  return (
    <div className="min-h-screen relative brand-gradient">
      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <div className="brand-header px-6 py-4 border-b border-white/10">
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
        <div className="px-6 py-12">
          <div className="max-w-2xl mx-auto">
            {/* Welcome Section */}
            <div className="text-center mb-12">
              <h1 className="text-white text-3xl mb-3">
                Welcome to Sun Devil Match
              </h1>
              <p className="text-gray-300 text-lg max-w-md mx-auto">
                Connect with fellow Sun Devils and discover your perfect match on campus
              </p>
            </div>

            {/* Sign Up/Sign In Form */}
            <div className="glass-card rounded-2xl p-8">
              {isSignUp ? <SignUpForm /> : <SignInForm onToggleMode={() => setIsSignUp(true)} />}
            </div>

            {/* Footer */}
            <div className="text-center mt-8">
              <p className="text-gray-300 text-sm">
                {isSignUp ? (
                  <>
                    Already have an account?{' '}
                    <Button 
                      variant="link" 
                      className="text-yellow-500 hover:text-yellow-400 p-0 h-auto"
                      onClick={() => setIsSignUp(false)}
                    >
                      Sign In
                    </Button>
                  </>
                ) : (
                  <>
                    Don't have an account?{' '}
                    <Button 
                      variant="link" 
                      className="text-yellow-500 hover:text-yellow-400 p-0 h-auto"
                      onClick={() => setIsSignUp(true)}
                    >
                      Sign Up
                    </Button>
                  </>
                )}
              </p>
            </div>

            {/* ASU Verification Notice */}
            <div className="mt-8 glass-card rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <div className="w-5 h-5 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-black text-xs">ⓘ</span>
                </div>
                <div>
                  <h4 className="text-yellow-400 font-medium mb-1">ASU Student Verification</h4>
                  <p className="text-yellow-200/80 text-sm">
                    Only verified ASU students can join Sun Devil Match. We'll send a verification 
                    email to your ASU address to confirm your student status.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}