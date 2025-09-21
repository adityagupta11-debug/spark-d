import React from 'react';
import { HeartCrack } from 'lucide-react';

export default function MatchesPage() {
  return (
    <div className="flex-1 bg-black flex items-center justify-center px-6">
      <div className="text-center max-w-sm">
        {/* Broken Heart Icon */}
        <div className="mb-6">
          <div className="w-16 h-16 mx-auto mb-4 text-red-500">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              <path d="M8 2L16 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
        </div>

        {/* Empty State Message */}
        <h2 className="text-white text-2xl font-semibold mb-3">
          No matches yet
        </h2>
        
        <p className="text-gray-400 text-base leading-relaxed">
          Keep swiping to find your perfect match!
        </p>
      </div>
    </div>
  );
}