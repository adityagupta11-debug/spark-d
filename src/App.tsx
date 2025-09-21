import { useState } from 'react';
import campusImage from './assets/24b0ce647cc38b3904beeda35147b930b1688d81.png';
import sparkLogo from './assets/be0089ef2be8ba12e1e7b021047e4ab156b62992.png';
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
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-40 right-10 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
        </div>
        
        <div className="text-center relative z-10">
          <div className="w-20 h-20 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mx-auto mb-6 shadow-lg"></div>
          <div className="text-white text-2xl font-bold mb-2 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
            Loading Sun Devil Match...
          </div>
          <p className="text-gray-300 text-lg">Please wait while we set up your experience</p>
        </div>
      </div>
    );
  }

  // Show authenticated user dashboard
  if (user) {
    return <Dashboard user={user} userProfile={userProfile} onSignOut={handleSignOut} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 z-0">
        {/* Gradient Orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
        
        {/* Background Image with Enhanced Overlay */}
        <div className="absolute inset-0">
          <img 
            src={campusImage} 
            alt="ASU Campus" 
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-purple-900/80 to-slate-900/90"></div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600/90 to-pink-600/90 backdrop-blur-md px-6 py-6 shadow-2xl">
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
        <div className="px-6 py-16">
          <div className="max-w-2xl mx-auto">
            {/* Welcome Section */}
            <div className="text-center mb-16">
              <div className="mb-8">
                <h1 className="text-white text-5xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent leading-tight">
                  Find Your Perfect
                  <br />
                  <span className="text-yellow-400">Sun Devil Match</span>
                </h1>
                <p className="text-gray-300 text-xl max-w-lg mx-auto leading-relaxed">
                  Connect with fellow Sun Devils, discover meaningful relationships, and create unforgettable memories on campus
                </p>
              </div>
              
              {/* Feature Highlights */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <div className="text-3xl mb-3">💕</div>
                  <h3 className="text-white font-semibold mb-2">Smart Matching</h3>
                  <p className="text-gray-300 text-sm">AI-powered compatibility matching</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <div className="text-3xl mb-3">🎓</div>
                  <h3 className="text-white font-semibold mb-2">ASU Verified</h3>
                  <p className="text-gray-300 text-sm">Only verified ASU students</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <div className="text-3xl mb-3">🌵</div>
                  <h3 className="text-white font-semibold mb-2">Campus Life</h3>
                  <p className="text-gray-300 text-sm">Connect with your community</p>
                </div>
              </div>
            </div>

            {/* Sign Up/Sign In Form */}
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl">
              {isSignUp ? <SignUpForm /> : <SignInForm onToggleMode={() => setIsSignUp(true)} />}
            </div>

            {/* Footer */}
            <div className="text-center mt-8">
              <p className="text-gray-400 text-sm">
                {isSignUp ? (
                  <>
                    Already have an account?{' '}
                    <Button 
                      variant="link" 
                      className="text-yellow-400 hover:text-yellow-300 p-0 h-auto font-semibold"
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
                      className="text-yellow-400 hover:text-yellow-300 p-0 h-auto font-semibold"
                      onClick={() => setIsSignUp(true)}
                    >
                      Sign Up
                    </Button>
                  </>
                )}
              </p>
            </div>

            {/* ASU Verification Notice */}
            <div className="mt-8 p-6 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 backdrop-blur-sm border border-yellow-400/30 rounded-2xl">
              <div className="flex items-start space-x-4">
                <div className="w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 shadow-lg">
                  <span className="text-black text-sm font-bold">ⓘ</span>
                </div>
                <div>
                  <h4 className="text-yellow-300 font-semibold mb-2 text-lg">ASU Student Verification</h4>
                  <p className="text-yellow-100/90 text-sm leading-relaxed">
                    Only verified ASU students can join Sun Devil Match. We'll send a verification 
                    email to your ASU address to confirm your student status and ensure a safe, authentic community.
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