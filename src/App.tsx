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
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-asu-gold/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-asu-maroon/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="text-center relative z-10">
          <div className="relative mb-8">
            <div className="w-20 h-20 border-4 border-asu-gold border-t-transparent rounded-full animate-spin mx-auto"></div>
            <div className="absolute inset-0 w-20 h-20 border-4 border-transparent border-t-asu-maroon rounded-full animate-spin mx-auto" style={{ animationDirection: 'reverse', animationDuration: '0.8s' }}></div>
          </div>
          <h2 className="text-white text-2xl font-bold mb-2 gradient-text">Loading Sun Devil Match</h2>
          <p className="text-gray-300">Setting up your perfect match experience...</p>
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
      {/* Modern gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-asu-gold/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-1/2 right-0 w-[600px] h-[600px] bg-asu-maroon/5 rounded-full blur-3xl animate-pulse delay-700"></div>
          <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-1500"></div>
        </div>

        {/* Floating geometric shapes */}
        <div className="absolute top-20 right-20 w-32 h-32 border border-asu-gold/20 rotate-45 animate-float hover-glow"></div>
        <div className="absolute bottom-32 left-16 w-24 h-24 bg-asu-gold/10 rounded-full animate-pulse hover-lift"></div>
        <div className="absolute top-1/3 left-1/2 w-16 h-16 border border-purple-400/20 rotate-12 animate-spin hover-glow" style={{ animationDuration: '20s' }}></div>
        <div className="absolute top-1/4 left-1/3 w-20 h-20 bg-gradient-to-br from-asu-gold/10 to-transparent rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/3 right-1/3 w-12 h-12 border border-asu-maroon/20 rotate-45 animate-bounce hover-glow" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Background Image with modern overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={campusImage}
          alt="ASU Campus"
          className="w-full h-full object-cover opacity-20 blur-sm scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/30 to-slate-900/80"></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Modern Header */}
        <div className="glass-card px-6 py-4 mx-4 mt-4 rounded-2xl backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative hover-lift">
                <div className="w-12 h-12 bg-gradient-to-br from-asu-gold to-asu-maroon rounded-2xl flex items-center justify-center shadow-lg hover-glow">
                  <span className="text-2xl filter drop-shadow-sm animate-bounce-in">🌵</span>
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-white font-bold text-xl gradient-text">Sun Devil Match</h1>
                <p className="text-white/70 text-sm font-medium">ASU Dating & Date Planning</p>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-2 text-white/60 text-sm">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>2,847 Sun Devils Online</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="px-6 py-8 md:py-16">
          <div className="max-w-4xl mx-auto">
            {/* Hero Section */}
            <div className="text-center mb-16 animate-fade-in">
              <div className="mb-6">
                <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-4">
                  <span className="text-asu-gold">🏆</span>
                  <span className="text-white/80 text-sm font-medium">#1 ASU Dating App</span>
                </div>
                <h1 className="text-4xl md:text-6xl font-bold mb-6">
                  <span className="gradient-text">Find Your</span>
                  <br />
                  <span className="text-white">Perfect Match</span>
                </h1>
                <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                  Connect with <strong className="text-asu-gold">fellow Sun Devils</strong> and discover meaningful relationships on the ASU campus
                </p>
              </div>

              {/* Stats */}
              <div className="flex justify-center items-center space-x-8 mt-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-asu-gold">2,847+</div>
                  <div className="text-white/70 text-sm">Active Users</div>
                </div>
                <div className="w-px h-8 bg-white/20"></div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-asu-gold">1,200+</div>
                  <div className="text-white/70 text-sm">Matches Made</div>
                </div>
                <div className="w-px h-8 bg-white/20"></div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-asu-gold">4.9★</div>
                  <div className="text-white/70 text-sm">App Rating</div>
                </div>
              </div>
            </div>

            {/* Sign Up/Sign In Form */}
            <div className="glass-card rounded-3xl p-8 md:p-10 animate-slide-up shadow-glass">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-white mb-2">
                  {isSignUp ? 'Join Sun Devil Match' : 'Welcome Back'}
                </h2>
                <p className="text-gray-400">
                  {isSignUp
                    ? 'Create your account and start connecting'
                    : 'Sign in to continue your journey'
                  }
                </p>
              </div>
              {isSignUp ? <SignUpForm /> : <SignInForm onToggleMode={() => setIsSignUp(true)} />}
            </div>

            {/* Footer */}
            <div className="text-center mt-8 animate-fade-in">
              <div className="inline-flex items-center space-x-2 bg-white/5 backdrop-blur-sm rounded-full px-6 py-3">
                <p className="text-gray-300 text-sm">
                  {isSignUp ? (
                    <>
                      Already have an account?{' '}
                      <Button
                        variant="link"
                        className="text-asu-gold hover:text-asu-light-gold p-0 h-auto font-semibold"
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
                        className="text-asu-gold hover:text-asu-light-gold p-0 h-auto font-semibold"
                        onClick={() => setIsSignUp(true)}
                      >
                        Sign Up
                      </Button>
                    </>
                  )}
                </p>
              </div>
            </div>

            {/* ASU Verification Notice */}
            <div className="mt-12 glass-card rounded-2xl p-6 border border-asu-gold/20 animate-scale-in">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-asu-gold to-asu-light-gold rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                  <span className="text-slate-900 text-lg font-bold">🎓</span>
                </div>
                <div className="flex-1">
                  <h4 className="text-asu-gold font-bold text-lg mb-2">ASU Student Verification</h4>
                  <p className="text-gray-300 leading-relaxed">
                    <strong className="text-white">Exclusive to Sun Devils only!</strong> We'll send a verification
                    email to your ASU address to confirm your student status. This ensures a safe,
                    authentic community of ASU students.
                  </p>
                  <div className="mt-3 flex items-center space-x-4 text-sm text-gray-400">
                    <span className="flex items-center space-x-1">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      <span>Secure & Private</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <span className="w-2 h-2 bg-asu-gold rounded-full"></span>
                      <span>ASU Verified</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}