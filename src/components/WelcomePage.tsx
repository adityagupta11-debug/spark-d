import { useState } from 'react';
import { SignInForm } from './SignInForm';
import { SignUpForm } from './SignUpForm';
import { Button } from './ui/button';
import { Heart, Users, Shield, Sparkles, ChevronRight, MapPin, Calendar, GraduationCap } from 'lucide-react';

export function WelcomePage() {
  const [mode, setMode] = useState<'welcome' | 'sign-in' | 'sign-up'>('welcome');

  // Welcome/Landing Screen
  if (mode === 'welcome') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-900 via-purple-900 to-indigo-900 text-white overflow-hidden relative">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute top-40 left-40 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative z-10 flex flex-col min-h-screen">
          {/* Header */}
          <div className="px-6 pt-8 pb-4">
            <div className="flex items-center justify-center gap-3">
              <div className="w-14 h-14 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-2xl">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                  Spark'd
                </h1>
                <p className="text-sm text-white/80">ASU Dating & Connections</p>
              </div>
            </div>
          </div>

          {/* Hero Section */}
          <div className="flex-1 px-6 py-8 flex flex-col items-center justify-center max-w-md mx-auto w-full">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4 leading-tight">
                Find Your Perfect
                <span className="block bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                  Sun Devil Match
                </span>
              </h2>
              <p className="text-lg text-white/80 leading-relaxed">
                Connect with fellow ASU students who share your interests, values, and campus experiences
              </p>
            </div>

            {/* Feature Cards */}
            <div className="grid grid-cols-2 gap-4 mb-10 w-full">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-red-500 rounded-xl flex items-center justify-center mb-3">
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-semibold mb-1">Smart Matching</h3>
                <p className="text-sm text-white/70">AI-powered compatibility based on interests & goals</p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mb-3">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-semibold mb-1">Verified Students</h3>
                <p className="text-sm text-white/70">Only ASU students with .edu emails</p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-teal-500 rounded-xl flex items-center justify-center mb-3">
                  <Calendar className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-semibold mb-1">Date Planning</h3>
                <p className="text-sm text-white/70">Discover perfect spots around Tempe campus</p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center mb-3">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-semibold mb-1">Campus Events</h3>
                <p className="text-sm text-white/70">Meet at ASU events & activities</p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="space-y-3 w-full">
              <Button
                onClick={() => setMode('sign-up')}
                className="w-full h-14 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-semibold text-lg rounded-2xl shadow-xl transform transition hover:scale-105"
              >
                Get Started
                <ChevronRight className="ml-2 w-5 h-5" />
              </Button>
              
              <Button
                onClick={() => setMode('sign-in')}
                variant="outline"
                className="w-full h-14 bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 font-semibold text-lg rounded-2xl"
              >
                I already have an account
              </Button>
            </div>
          </div>

          {/* Bottom Stats */}
          <div className="px-6 pb-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
              <div className="flex justify-around text-center">
                <div>
                  <div className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                    5,000+
                  </div>
                  <div className="text-xs text-white/70">Active Students</div>
                </div>
                <div className="w-px bg-white/20"></div>
                <div>
                  <div className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                    89%
                  </div>
                  <div className="text-xs text-white/70">Match Rate</div>
                </div>
                <div className="w-px bg-white/20"></div>
                <div>
                  <div className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                    4.8★
                  </div>
                  <div className="text-xs text-white/70">App Rating</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Sign In Screen
  if (mode === 'sign-in') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-900 via-purple-900 to-indigo-900 text-white px-4 py-8 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        </div>

        <div className="relative z-10 max-w-md mx-auto">
          {/* Back Button */}
          <Button
            variant="ghost"
            onClick={() => setMode('welcome')}
            className="mb-6 text-white hover:bg-white/10"
          >
            ← Back
          </Button>

          {/* Logo */}
          <div className="flex items-center justify-center gap-3 mb-12">
            <div className="w-14 h-14 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-2xl">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                Spark'd
              </h1>
              <p className="text-sm text-white/80">Welcome back, Sun Devil!</p>
            </div>
          </div>

          {/* Sign In Form Container */}
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-2xl">
            <SignInForm onToggleMode={() => setMode('sign-up')} />
          </div>

          {/* Alternative Action */}
          <div className="text-center mt-8">
            <p className="text-white/60 mb-2">New to Spark'd?</p>
            <Button 
              variant="link" 
              className="text-yellow-400 hover:text-yellow-300 font-semibold"
              onClick={() => setMode('sign-up')}
            >
              Create your account →
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Sign Up Screen
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-900 via-purple-900 to-indigo-900 text-white px-4 py-8 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 max-w-md mx-auto">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => setMode('welcome')}
          className="mb-6 text-white hover:bg-white/10"
        >
          ← Back
        </Button>

        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-14 h-14 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-2xl">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              Spark'd
            </h1>
            <p className="text-sm text-white/80">Join the Sun Devil community</p>
          </div>
        </div>

        {/* Benefits Banner */}
        <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 backdrop-blur-sm rounded-2xl p-4 mb-6 border border-yellow-500/30">
          <div className="flex items-center gap-3">
            <GraduationCap className="w-6 h-6 text-yellow-400" />
            <div>
              <p className="font-semibold text-yellow-400">Exclusive for ASU Students</p>
              <p className="text-sm text-white/80">Verify with your @asu.edu email</p>
            </div>
          </div>
        </div>

        {/* Sign Up Form Container */}
        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-2xl">
          <SignUpForm />
        </div>

        {/* Alternative Action */}
        <div className="text-center mt-8">
          <p className="text-white/60 mb-2">Already have an account?</p>
          <Button 
            variant="link" 
            className="text-yellow-400 hover:text-yellow-300 font-semibold"
            onClick={() => setMode('sign-in')}
          >
            Sign in instead →
          </Button>
        </div>
      </div>
    </div>
  );
}