import React from 'react';
import { Button } from './ui/button';
import { Heart, Users, Calendar, Sparkles, ChevronRight, Star } from 'lucide-react';

interface LandingPageProps {
  onSignIn: () => void;
  onSignUp: () => void;
}

export function LandingPage({ onSignIn, onSignUp }: LandingPageProps) {
  const features = [
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Smart Matching",
      description: "AI-powered matching to find your perfect connection"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Real Connections",
      description: "Meet genuine people looking for meaningful relationships"
    },
    {
      icon: <Calendar className="w-6 h-6" />,
      title: "Date Planning",
      description: "Get personalized date ideas and plan memorable experiences"
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "Spark Moments",
      description: "Share special moments and build lasting memories"
    }
  ];

  const testimonials = [
    {
      name: "Sarah M.",
      rating: 5,
      text: "Found my perfect match in just 2 weeks! The date planning feature is amazing."
    },
    {
      name: "Alex K.",
      rating: 5,
      text: "Best dating app I've used. Real people, real connections."
    },
    {
      name: "Jordan T.",
      rating: 5,
      text: "Love the vibe! Finally a dating app that feels genuine."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-spark-900 to-black text-white overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-spark-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-sparkAccent-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-spark-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-float animation-delay-4000"></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <header className="p-6">
          <div className="max-w-6xl mx-auto flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-sparkAccent-400 to-spark-500 rounded-full flex items-center justify-center shadow-lg animate-pulse-glow">
                <span className="text-2xl">✨</span>
              </div>
              <h1 className="text-2xl font-bold">Spark'd</h1>
            </div>
            <div className="flex gap-3">
              <Button 
                onClick={onSignIn}
                variant="ghost" 
                className="text-white hover:bg-white/10"
              >
                Sign In
              </Button>
              <Button 
                onClick={onSignUp}
                className="bg-gradient-to-r from-spark-500 to-spark-600 hover:from-spark-600 hover:to-spark-700 text-white font-semibold px-6"
              >
                Get Started
              </Button>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="px-6 py-20 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="mb-6 inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
              <Star className="w-4 h-4 text-sparkAccent-400" />
              <span className="text-sm font-medium">Over 10,000 successful connections</span>
            </div>
            
            <h2 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-spark-200 to-sparkAccent-300 bg-clip-text text-transparent">
              Where Sparks Fly
            </h2>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-2xl mx-auto">
              Experience dating reimagined. Connect with genuine people, plan unforgettable dates, and create lasting memories.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={onSignUp}
                size="lg"
                className="bg-gradient-to-r from-spark-500 to-spark-600 hover:from-spark-600 hover:to-spark-700 text-white font-bold text-lg px-8 py-6 rounded-full shadow-2xl transform hover:scale-105 transition-all duration-200"
              >
                Start Your Journey
                <ChevronRight className="ml-2 w-5 h-5" />
              </Button>
              
              <Button 
                onClick={onSignIn}
                size="lg"
                variant="outline"
                className="border-2 border-spark-500 text-white hover:bg-spark-500/20 font-semibold text-lg px-8 py-6 rounded-full"
              >
                I Have an Account
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="px-6 py-20">
          <div className="max-w-6xl mx-auto">
            <h3 className="text-3xl font-bold text-center mb-12">Why Choose Spark'd?</h3>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 hover:scale-105"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-spark-500 to-sparkAccent-500 rounded-xl flex items-center justify-center mb-4">
                    {feature.icon}
                  </div>
                  <h4 className="text-lg font-semibold mb-2">{feature.title}</h4>
                  <p className="text-gray-400 text-sm">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="px-6 py-20">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold text-center mb-12">Love Stories Begin Here</h3>
            
            <div className="grid md:grid-cols-3 gap-6">
              {testimonials.map((testimonial, index) => (
                <div 
                  key={index}
                  className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
                >
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-sparkAccent-400 text-sparkAccent-400" />
                    ))}
                  </div>
                  <p className="text-gray-300 mb-4">"{testimonial.text}"</p>
                  <p className="text-sm font-semibold text-sparkAccent-400">— {testimonial.name}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-6 py-20 text-center">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-4xl font-bold mb-6">Ready to Find Your Spark?</h3>
            <p className="text-xl text-gray-300 mb-8">
              Join thousands who've found meaningful connections on Spark'd
            </p>
            <Button 
              onClick={onSignUp}
              size="lg"
              className="bg-gradient-to-r from-sparkAccent-500 to-spark-500 hover:from-sparkAccent-600 hover:to-spark-600 text-white font-bold text-lg px-10 py-6 rounded-full shadow-2xl transform hover:scale-105 transition-all duration-200"
            >
              Create Your Profile
              <Sparkles className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-white/10 px-6 py-8 mt-20">
          <div className="max-w-6xl mx-auto text-center">
            <p className="text-gray-400 text-sm">
              © 2024 Spark'd. All rights reserved. Made with ❤️ for connecting hearts.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}