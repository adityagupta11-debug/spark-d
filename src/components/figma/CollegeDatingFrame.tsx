import React from 'react';
import { Button } from '../ui/button';
import { Heart, MapPin, Calendar, Users, Star, MessageCircle } from 'lucide-react';

interface CollegeDatingFrameProps {
  className?: string;
}

export const CollegeDatingFrame: React.FC<CollegeDatingFrameProps> = ({ className = '' }) => {
  return (
    <div className={`max-w-md mx-auto bg-white rounded-2xl shadow-xl overflow-hidden ${className}`}>
      {/* Header Section */}
      <div className="bg-gradient-to-r from-red-800 to-red-900 text-white p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-2xl">🌵</span>
            </div>
            <div>
              <h1 className="text-xl font-semibold">Sun Devil Match</h1>
              <p className="text-sm text-yellow-100">ASU Dating & Date Planning</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
            <MessageCircle className="w-6 h-6" />
          </Button>
        </div>
        
        {/* Stats Row */}
        <div className="flex gap-4 text-center">
          <div className="flex-1">
            <div className="text-2xl font-bold">24</div>
            <div className="text-xs text-yellow-100">Matches</div>
          </div>
          <div className="flex-1">
            <div className="text-2xl font-bold">8</div>
            <div className="text-xs text-yellow-100">Dates Planned</div>
          </div>
          <div className="flex-1">
            <div className="text-2xl font-bold">4.8</div>
            <div className="text-xs text-yellow-100">Rating</div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        {/* Profile Card Preview */}
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 mb-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full -translate-y-10 translate-x-10 opacity-20"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                A
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Alex, 22</h3>
                <p className="text-sm text-gray-600">Computer Science • ASU</p>
              </div>
              <div className="ml-auto flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                <span className="text-sm font-medium">4.9</span>
              </div>
            </div>
            <p className="text-sm text-gray-700 mb-3">
              "Love hiking, coding, and trying new coffee shops. Looking for someone to explore Tempe with!"
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">Hiking</span>
              <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">Coffee</span>
              <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Coding</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mb-6">
          <Button 
            variant="outline" 
            className="flex-1 h-12 border-red-200 text-red-600 hover:bg-red-50"
          >
            <Heart className="w-5 h-5 mr-2" />
            Pass
          </Button>
          <Button 
            className="flex-1 h-12 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800"
          >
            <Heart className="w-5 h-5 mr-2 fill-current" />
            Like
          </Button>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3">
          <Button variant="outline" className="h-12 flex flex-col gap-1">
            <MapPin className="w-5 h-5" />
            <span className="text-xs">Nearby</span>
          </Button>
          <Button variant="outline" className="h-12 flex flex-col gap-1">
            <Calendar className="w-5 h-5" />
            <span className="text-xs">Plan Date</span>
          </Button>
        </div>

        {/* Recent Activity */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <h4 className="font-semibold text-gray-900 mb-3">Recent Activity</h4>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <Heart className="w-4 h-4 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">New match with Sarah!</p>
                <p className="text-xs text-gray-500">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <Calendar className="w-4 h-4 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">Date planned for Friday</p>
                <p className="text-xs text-gray-500">1 day ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation Preview */}
      <div className="bg-gray-50 px-6 py-4">
        <div className="flex justify-around">
          <Button variant="ghost" size="sm" className="flex flex-col gap-1 text-red-600">
            <Heart className="w-5 h-5" />
            <span className="text-xs">Discover</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex flex-col gap-1 text-gray-500">
            <Users className="w-5 h-5" />
            <span className="text-xs">Matches</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex flex-col gap-1 text-gray-500">
            <Calendar className="w-5 h-5" />
            <span className="text-xs">Dates</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex flex-col gap-1 text-gray-500">
            <MessageCircle className="w-5 h-5" />
            <span className="text-xs">Chat</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CollegeDatingFrame;