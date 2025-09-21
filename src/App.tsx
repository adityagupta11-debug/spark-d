import { useState, useEffect } from 'react';
import campusImage from './assets/24b0ce647cc38b3904beeda35147b930b1688d81.png';
import sparkLogo from './assets/be0089ef2be8ba12e1e7b021047e4ab156b62992.png';
import { SignUpForm } from './components/SignUpForm';
import { SignInForm } from './components/SignInForm';
import { Button } from './components/ui/button';
import { useAuth } from './contexts/AuthContext';
import { signOutUser } from './lib/auth';
import Dashboard from './components/Dashboard';
import { Heart, Users, Sparkles, MapPin, Calendar, Shield } from 'lucide-react';

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
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-800 to-red-900 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Heart className="w-8 h-8 text-yellow-400 animate-pulse" />
            </div>
          </div>
          <div className="mt-6">
            <h2 className="text-white text-2xl font-bold mb-2">Loading Sun Devil Match</h2>
            <p className="text-white/70">Preparing your dating experience...</p>
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
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-pink-800 to-red-900 animate-gradient-shift" 
             style={{ backgroundSize: '400% 400%', animation: 'gradient-shift 15s ease infinite' }}></div>
        <img 
          src={campusImage} 
          alt="ASU Campus" 
          className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-overlay"
        />
        {/* Floating Particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-yellow-400 rounded-full opacity-30"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float ${10 + Math.random() * 20}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 5}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Modern Header */}
        <header className="glass-dark border-b border-white/10">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg animate-pulse-glow">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-white font-bold text-xl">Sun Devil Match</h1>
                  <p className="text-yellow-400 text-sm font-medium">ASU's Premier Dating Platform</p>
                </div>
              </div>
              <div className="hidden md:flex items-center space-x-6">
                <div className="flex items-center space-x-2 text-white/80">
                  <Users className="w-5 h-5" />
                  <span className="text-sm">5,000+ Active Students</span>
                </div>
                <div className="flex items-center space-x-2 text-white/80">
                  <Shield className="w-5 h-5" />
                  <span className="text-sm">Verified ASU Only</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="container mx-auto px-6 py-12">
          <div className="max-w-6xl mx-auto">
            {/* Hero Section */}
            <div className="text-center mb-16 animate-slide-up">
              <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
                <Sparkles className="w-4 h-4 text-yellow-400" />
                <span className="text-yellow-400 text-sm font-medium">Exclusive for ASU Students</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight">
                Find Your
                <span className="block gradient-text-asu">Perfect Match</span>
                at ASU
              </h1>
              <p className="text-xl text-white/80 max-w-2xl mx-auto mb-8">
                Join thousands of Sun Devils already connecting, dating, and building meaningful relationships on campus.
              </p>
              
              {/* Feature Pills */}
              <div className="flex flex-wrap justify-center gap-4 mb-12">
                <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                  <MapPin className="w-4 h-4 text-yellow-400" />
                  <span className="text-white text-sm">Campus-based matching</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                  <Calendar className="w-4 h-4 text-yellow-400" />
                  <span className="text-white text-sm">Date planning features</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                  <Shield className="w-4 h-4 text-yellow-400" />
                  <span className="text-white text-sm">Safe & verified</span>
                </div>
              </div>
            </div>

            {/* Sign Up/Sign In Form Card */}
            <div className="max-w-2xl mx-auto">
              <div className="glass-dark rounded-3xl p-8 md:p-10 shadow-2xl border border-white/10 card-hover">
                {isSignUp ? <SignUpForm /> : <SignInForm onToggleMode={() => setIsSignUp(true)} />}
              </div>

              {/* Toggle Footer */}
              <div className="text-center mt-8">
                <p className="text-white/60">
                  {isSignUp ? (
                    <>
                      Already have an account?{' '}
                      <Button 
                        variant="link" 
                        className="text-yellow-400 hover:text-yellow-300 font-semibold p-0 h-auto underline-offset-4 hover:underline"
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
                        className="text-yellow-400 hover:text-yellow-300 font-semibold p-0 h-auto underline-offset-4 hover:underline"
                        onClick={() => setIsSignUp(true)}
                      >
                        Sign Up
                      </Button>
                    </>
                  )}
                </p>
              </div>

              {/* ASU Verification Notice - Modernized */}
              <div className="mt-8 glass rounded-2xl p-6 border border-yellow-400/20">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                    <Shield className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold mb-2">ASU Student Verification Required</h4>
                    <p className="text-white/70 text-sm leading-relaxed">
                      Sun Devil Match is exclusively for ASU students. We verify your student status through 
                      your official ASU email to ensure a safe, authentic community.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Section */}
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="glass rounded-2xl p-6 text-center card-hover">
                <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <div className="text-3xl font-bold text-white mb-2">500+</div>
                <div className="text-white/70 text-sm">Successful Matches</div>
              </div>
              <div className="glass rounded-2xl p-6 text-center card-hover">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div className="text-3xl font-bold text-white mb-2">5,000+</div>
                <div className="text-white/70 text-sm">Active Students</div>
              </div>
              <div className="glass rounded-2xl p-6 text-center card-hover">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div className="text-3xl font-bold text-white mb-2">4</div>
                <div className="text-white/70 text-sm">ASU Campuses</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}