import { useState } from 'react';
import campusImage from './assets/24b0ce647cc38b3904beeda35147b930b1688d81.png';
import sparkLogo from './assets/be0089ef2be8ba12e1e7b021047e4ab156b62992.png';
import { SignUpForm } from './components/SignUpForm';
import { SignInForm } from './components/SignInForm';
import { Button } from './components/ui/button';
import { useAuth } from './contexts/AuthContext';
import { signOutUser } from './lib/auth';

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
            <div className="flex items-center justify-between">
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
              <Button
                onClick={handleSignOut}
                variant="outline"
                className="bg-transparent border-white/20 text-white hover:bg-white/10"
              >
                Sign Out
              </Button>
            </div>
          </div>

          {/* Main Content */}
          <div className="px-6 py-12">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h1 className="text-white text-3xl mb-4">
                  Welcome back, {userProfile?.firstName || user.displayName}!
                </h1>
                <p className="text-gray-400 text-lg mb-8">
                  Ready to find your perfect match?
                </p>
              </div>

              {/* Dashboard Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Profile Card */}
                <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
                  <h3 className="text-white text-xl mb-4">Your Profile</h3>
                  <div className="space-y-3">
                    <div>
                      <span className="text-gray-400 text-sm">Name:</span>
                      <p className="text-white">{userProfile?.firstName} {userProfile?.lastName}</p>
                    </div>
                    <div>
                      <span className="text-gray-400 text-sm">Major:</span>
                      <p className="text-white">{userProfile?.major}</p>
                    </div>
                    <div>
                      <span className="text-gray-400 text-sm">Year:</span>
                      <p className="text-white capitalize">{userProfile?.year}</p>
                    </div>
                    <div>
                      <span className="text-gray-400 text-sm">Age:</span>
                      <p className="text-white">{userProfile?.age}</p>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
                  <h3 className="text-white text-xl mb-4">Quick Actions</h3>
                  <div className="space-y-3">
                    <button className="w-full bg-yellow-600 hover:bg-yellow-700 text-black py-2 px-4 rounded-lg transition-colors">
                      Browse Matches
                    </button>
                    <button className="w-full bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-lg transition-colors">
                      Edit Profile
                    </button>
                    <button className="w-full bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-lg transition-colors">
                      View Messages
                    </button>
                  </div>
                </div>

                {/* Stats Card */}
                <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
                  <h3 className="text-white text-xl mb-4">Your Stats</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Profile Views:</span>
                      <span className="text-white">0</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Matches:</span>
                      <span className="text-white">0</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Messages:</span>
                      <span className="text-white">0</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bio Section */}
              {userProfile?.bio && (
                <div className="mt-8 bg-gray-900 rounded-2xl p-6 border border-gray-800">
                  <h3 className="text-white text-xl mb-4">About You</h3>
                  <p className="text-gray-300">{userProfile.bio}</p>
                </div>
              )}

              {/* Coming Soon Notice */}
              <div className="mt-8 bg-yellow-900/20 border border-yellow-700/30 rounded-lg p-6">
                <div className="flex items-start space-x-3">
                  <div className="w-5 h-5 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-black text-xs">🚀</span>
                  </div>
                  <div>
                    <h4 className="text-yellow-400 font-medium mb-1">More Features Coming Soon!</h4>
                    <p className="text-yellow-200/80 text-sm">
                      We're working hard to bring you the best dating experience. 
                      Stay tuned for features like advanced matching, video calls, and more!
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