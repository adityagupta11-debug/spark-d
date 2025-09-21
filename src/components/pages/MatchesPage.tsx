import React from 'react';
import { HeartCrack } from 'lucide-react';

export default function MatchesPage() {
  return (
    <div className="flex-1 flex items-center justify-center px-6 relative z-10">
      <div className="text-center max-w-md mx-auto">
        {/* Heart Icon with Animation */}
        <div className="mb-8">
          <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-2xl animate-pulse">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12 text-white">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          </div>
        </div>

        {/* Empty State Message */}
        <h2 className="text-white text-3xl font-bold mb-4 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
          No matches yet
        </h2>
        
        <p className="text-gray-300 text-lg leading-relaxed mb-8">
          Keep swiping to find your perfect Sun Devil match! The more you swipe, the better we get at finding compatible people for you.
        </p>

        {/* Call to Action */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
          <div className="text-2xl mb-3">💕</div>
          <h3 className="text-white font-semibold mb-2">Ready to start matching?</h3>
          <p className="text-gray-300 text-sm">
            Head to the Discover tab to start swiping through profiles of fellow Sun Devils!
          </p>
        </div>
      </div>
    </div>
  );
}