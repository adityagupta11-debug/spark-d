import React, { useState } from 'react';
// @ts-ignore - Vite handles asset imports
import campusImage from './assets/24b0ce647cc38b3904beeda35147b930b1688d81.png';
// @ts-ignore - Vite handles asset imports
import sparkLogo from './assets/be0089ef2be8ba12e1e7b021047e4ab156b62992.png';
import { SignUpForm } from './components/SignUpForm';
import { SignInForm } from './components/SignInForm';
import { Button } from './components/ui/button';
import { useAuth } from './contexts/AuthContext';
import { signOutUser } from './lib/auth';
import { Dashboard } from './dashboard/Dashboard';

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
    return (
      <Dashboard
        onSignOut={handleSignOut}
        appLogo={sparkLogo}
        backdropImage={campusImage}
        userProfile={userProfile}
        displayName={user.displayName || ''}
      />
    );
  }

  return (
    <div className="min-h-screen bg-black relative">
      {/* Background Image with Blur */}
      <div className="absolute inset-0 z-0">
        <img 
          src={campusImage} 
          alt="ASU Campus" 
          className="w-full h-full object-cover blur-sm"
        />
        <div className="absolute inset-0 bg-black/75"></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <div className="bg-[#8B4B6B] px-6 py-4">
          <div className="flex items-center space-x-3">
            <img 
              src={sparkLogo} 
              alt="Spark'd Logo" 
              className="w-8 h-8"
            />
            <div>
              <h1 className="text-white font-medium">Spark'd</h1>
              <p className="text-white/80 text-sm">Where the Devil dates</p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="px-6 py-12">
          <div className="max-w-2xl mx-auto">
            {/* Welcome Section */}
            <div className="text-center mb-12">
              <h1 className="text-white text-3xl mb-4">
                Welcome to Spark'd
              </h1>
              <p className="text-gray-400 text-lg max-w-md mx-auto">
                Connect with fellow Sun Devils and discover your perfect match on campus
              </p>
            </div>

            {/* Sign Up/Sign In Form */}
            <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800">
              {isSignUp ? <SignUpForm /> : <SignInForm onToggleMode={() => setIsSignUp(true)} />}
            </div>

            {/* Footer */}
            <div className="text-center mt-8">
              <p className="text-gray-500 text-sm">
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
            <div className="mt-8 p-4 bg-yellow-900/20 border border-yellow-700/30 rounded-lg">
              <div className="flex items-start space-x-3">
                <div className="w-5 h-5 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-black text-xs">ⓘ</span>
                </div>
                <div>
                  <h4 className="text-yellow-400 font-medium mb-1">ASU Student Verification</h4>
                  <p className="text-yellow-200/80 text-sm">
                    Only verified ASU students can join Spark'd. We'll send a verification 
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