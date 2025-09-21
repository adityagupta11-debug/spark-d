import React from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { 
  Heart, 
  MessageCircle, 
  MapPin, 
  GraduationCap,
  Camera,
  Coffee,
  Mountain
} from 'lucide-react';
import { ImageWithFallback } from './ImageWithFallback';

interface CollegeDatingFrameProps {
  className?: string;
}

/**
 * CollegeDatingFrame Component
 * 
 * This component represents the imported Figma frame for the College Dating App.
 * 
 * INSTRUCTIONS FOR REPLACEMENT:
 * 1. Use a Figma plugin (UI2CODE.AI, Figma to React, etc.) to export your frame
 * 2. Replace this entire component with the generated code
 * 3. Adapt the generated code to use existing UI components
 * 4. Maintain the ASU color scheme (#8C1D40, #FFC627)
 * 5. Ensure responsive design and accessibility
 * 
 * This is currently a placeholder that demonstrates the structure and styling
 * approach you should use for your actual Figma import.
 */
export const CollegeDatingFrame: React.FC<CollegeDatingFrameProps> = ({ 
  className = "" 
}) => {
  return (
    <div className={`w-full max-w-sm mx-auto ${className}`}>
      <Card className="overflow-hidden shadow-xl border-0 bg-gradient-to-b from-white to-gray-50">
        {/* Main Profile Image */}
        <div className="relative h-80 bg-gradient-to-br from-red-100 via-red-50 to-yellow-50">
          <ImageWithFallback
            src="/api/placeholder/400/320"
            alt="College student profile"
            className="w-full h-full object-cover"
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
          
          {/* Status Indicator */}
          <div className="absolute top-4 left-4">
            <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs font-medium text-gray-700">Online</span>
            </div>
          </div>
          
          {/* Distance Badge */}
          <div className="absolute top-4 right-4">
            <div className="bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
              <div className="flex items-center gap-1">
                <MapPin className="w-3 h-3 text-gray-600" />
                <span className="text-xs font-medium text-gray-700">1.2 mi</span>
              </div>
            </div>
          </div>
          
          {/* Profile Info Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <div className="flex items-end gap-3 mb-4">
              <Avatar className="w-16 h-16 border-3 border-white shadow-lg">
                <AvatarImage src="/api/placeholder/64/64" alt="Profile" />
                <AvatarFallback className="bg-gradient-to-br from-red-500 to-red-600 text-white text-lg font-bold">
                  AS
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1 text-white">
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="text-2xl font-bold drop-shadow-lg">Alex Smith</h2>
                  <span className="text-lg text-yellow-300">22</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-200">
                  <GraduationCap className="w-4 h-4" />
                  <span>Computer Science • ASU</span>
                </div>
              </div>
            </div>
            
            {/* Interest Tags */}
            <div className="flex flex-wrap gap-2">
              <Badge 
                variant="secondary" 
                className="bg-white/20 text-white border-white/30 backdrop-blur-sm hover:bg-white/30 transition-colors"
              >
                <Camera className="w-3 h-3 mr-1" />
                Photography
              </Badge>
              <Badge 
                variant="secondary" 
                className="bg-white/20 text-white border-white/30 backdrop-blur-sm hover:bg-white/30 transition-colors"
              >
                <Mountain className="w-3 h-3 mr-1" />
                Hiking
              </Badge>
              <Badge 
                variant="secondary" 
                className="bg-white/20 text-white border-white/30 backdrop-blur-sm hover:bg-white/30 transition-colors"
              >
                <Coffee className="w-3 h-3 mr-1" />
                Coffee
              </Badge>
            </div>
          </div>
        </div>
        
        {/* Bio Section */}
        <div className="p-6 space-y-4">
          <div className="text-center">
            <p className="text-gray-700 leading-relaxed">
              "Love capturing moments and exploring Arizona's beautiful landscapes. 
              Always down for a good conversation over coffee! ☕📸🌵"
            </p>
          </div>
          
          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            <Button 
              variant="outline" 
              className="flex-1 border-gray-300 hover:border-gray-400 transition-colors"
              size="lg"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Message
            </Button>
            
            <Button 
              className="flex-1 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
              style={{ 
                backgroundColor: '#8C1D40',
                background: 'linear-gradient(135deg, #8C1D40 0%, #7A1936 100%)'
              }}
              size="lg"
            >
              <Heart className="w-4 h-4 mr-2" />
              Like
            </Button>
          </div>
        </div>
      </Card>
      
      {/* Replacement Instructions */}
      <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <p className="text-sm text-yellow-800">
          <strong>🎨 Replace this component:</strong> This is a placeholder. 
          Use the Figma import guide in <code>figma-import-guide.md</code> to 
          replace this with your actual Figma design.
        </p>
      </div>
    </div>
  );
};

export default CollegeDatingFrame;