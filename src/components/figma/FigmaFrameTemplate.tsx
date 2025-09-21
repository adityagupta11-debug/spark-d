import React from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { Heart, MessageCircle, Share, MoreHorizontal } from 'lucide-react';
import { ImageWithFallback } from './ImageWithFallback';

interface FigmaFrameTemplateProps {
  className?: string;
}

/**
 * FigmaFrameTemplate Component
 * 
 * This is a template component that demonstrates how to recreate a typical
 * college dating app frame from Figma using existing UI components.
 * 
 * Replace this template with the actual design from your Figma frame.
 * Use this as a reference for structure and styling approaches.
 */
export const FigmaFrameTemplate: React.FC<FigmaFrameTemplateProps> = ({ 
  className = "" 
}) => {
  return (
    <div className={`max-w-sm mx-auto bg-background ${className}`}>
      {/* Profile Card Template - Replace with your actual design */}
      <Card className="overflow-hidden shadow-lg">
        {/* Header Image */}
        <div className="relative h-64 bg-gradient-to-b from-red-100 to-red-50">
          <ImageWithFallback
            src="/api/placeholder/400/256"
            alt="Profile"
            className="w-full h-full object-cover"
          />
          
          {/* Overlay Content */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          
          {/* Top Actions */}
          <div className="absolute top-4 right-4 flex gap-2">
            <Button size="sm" variant="secondary" className="rounded-full w-10 h-10 p-0">
              <Share className="w-4 h-4" />
            </Button>
            <Button size="sm" variant="secondary" className="rounded-full w-10 h-10 p-0">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </div>
          
          {/* Bottom Info */}
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <div className="flex items-center gap-2 mb-2">
              <Avatar className="w-12 h-12 border-2 border-white">
                <AvatarImage src="/api/placeholder/48/48" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-lg font-semibold">Jane Doe</h3>
                <p className="text-sm text-gray-200">Computer Science, ASU</p>
              </div>
            </div>
            
            <div className="flex gap-2 mb-3">
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                Photography
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                Hiking
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                Coffee
              </Badge>
            </div>
          </div>
        </div>
        
        {/* Content Section */}
        <div className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm text-muted-foreground">Active now</span>
            </div>
            <span className="text-sm text-muted-foreground">2.3 miles away</span>
          </div>
          
          <p className="text-sm text-muted-foreground mb-4">
            "Love exploring new coffee shops around campus and hiking on weekends. 
            Always up for spontaneous adventures! 📸🌄☕"
          </p>
          
          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button variant="outline" className="flex-1" size="sm">
              <MessageCircle className="w-4 h-4 mr-2" />
              Message
            </Button>
            <Button 
              className="flex-1" 
              size="sm"
              style={{ backgroundColor: '#8C1D40' }}
            >
              <Heart className="w-4 h-4 mr-2" />
              Like
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default FigmaFrameTemplate;