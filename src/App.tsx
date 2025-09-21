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
      <div className="min-h-screen relative overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-br from-[#8B4B6B] via-[#2D1B69] to-black"></div>
        <div className="relative z-10 text-center">
          <div className="w-20 h-20 relative mb-8">
            <div className="absolute inset-0 border-4 border-[#ffc627]/20 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-[#ffc627] border-t-transparent rounded-full animate-spin"></div>
            <div className="absolute inset-2 bg-gradient-to-br from-[#ffc627] to-[#ffb000] rounded-full flex items-center justify-center">
              <span className="text-xl">🌵</span>
            </div>
          </div>
          <h2 className="text-white text-2xl font-bold mb-2">Loading Sun Devil Match...</h2>
          <p className="text-white/70 text-lg">Preparing your perfect match experience</p>
          <div className="flex justify-center mt-6">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-[#ffc627] rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-[#ffc627] rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
              <div className="w-2 h-2 bg-[#ffc627] rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show authenticated user dashboard
  if (user) {
    return <Dashboard user={user} userProfile={userProfile} onSignOut={handleSignOut} />;
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Modern Gradient Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#8B4B6B] via-[#2D1B69] to-black"></div>
        <img 
          src={campusImage} 
          alt="ASU Campus" 
          className="w-full h-full object-cover opacity-20 mix-blend-overlay"
        />
        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-[#ffc627]/10 via-transparent to-[#8B4B6B]/20 animate-pulse"></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Modern Header */}
        <div className="backdrop-blur-lg bg-white/10 border-b border-white/20 px-6 py-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-[#ffc627] to-[#ffb000] rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-2xl">🌵</span>
            </div>
            <div>
              <h1 className="text-white font-bold text-xl tracking-tight">Sun Devil Match</h1>
              <p className="text-white/80 text-sm font-medium">Connect • Discover • Spark</p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="px-6 py-16">
          <div className="max-w-lg mx-auto">
            {/* Welcome Section */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-6">
                <span className="text-[#ffc627] text-sm font-semibold">✨ Welcome to ASU's Premier Dating Platform</span>
              </div>
              <h1 className="text-white text-4xl font-bold mb-4 leading-tight">
                Find Your Perfect
                <span className="block bg-gradient-to-r from-[#ffc627] to-[#ffb000] bg-clip-text text-transparent">
                  Sun Devil Match
                </span>
              </h1>
              <p className="text-white/70 text-lg max-w-md mx-auto leading-relaxed">
                Connect with fellow Sun Devils, discover meaningful relationships, and explore campus together
              </p>
            </div>

            {/* Enhanced Form Container */}
            <div className="backdrop-blur-xl bg-white/10 rounded-3xl p-8 border border-white/20 shadow-2xl">
              {isSignUp ? <SignUpForm /> : <SignInForm onToggleMode={() => setIsSignUp(true)} />}
            </div>

            {/* Footer */}
            <div className="text-center mt-8">
              <p className="text-white/60 text-sm">
                {isSignUp ? (
                  <>
                    Already have an account?{' '}
                    <Button 
                      variant="link" 
                      className="text-[#ffc627] hover:text-[#ffb000] p-0 h-auto font-semibold transition-colors"
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
                      className="text-[#ffc627] hover:text-[#ffb000] p-0 h-auto font-semibold transition-colors"
                      onClick={() => setIsSignUp(true)}
                    >
                      Sign Up
                    </Button>
                  </>
                )}
              </p>
            </div>

            {/* Enhanced Verification Notice */}
            <div className="mt-8 p-6 bg-gradient-to-r from-[#ffc627]/20 to-[#ffb000]/20 backdrop-blur-sm border border-[#ffc627]/30 rounded-2xl">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-gradient-to-br from-[#ffc627] to-[#ffb000] rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                  <span className="text-black text-sm font-bold">✓</span>
                </div>
                <div>
                  <h4 className="text-[#ffc627] font-bold mb-2">ASU Student Verification</h4>
                  <p className="text-white/80 text-sm leading-relaxed">
                    Only verified ASU students can join Sun Devil Match. We'll send a verification 
                    email to your ASU address to confirm your student status and ensure a safe, 
                    authentic community.
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