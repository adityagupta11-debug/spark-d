import { motion } from 'motion/react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { MapPin, GraduationCap, Utensils } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export interface Profile {
  id: string;
  name: string;
  age: number;
  major: string;
  year: string;
  bio: string;
  photos: string[];
  interests: string[];
  distance: number;
}

interface ProfileCardProps {
  profile: Profile;
  onSwipe: (direction: 'left' | 'right') => void;
}

export function ProfileCard({ profile, onSwipe }: ProfileCardProps) {
  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.95, opacity: 0 }}
      className="w-full max-w-sm mx-auto"
    >
      <Card className="overflow-hidden bg-card shadow-xl">
        <div className="relative h-96">
          <ImageWithFallback
            src={profile.photos[0]}
            alt={profile.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60" />
          <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
            <div className="flex items-center gap-2 mb-2">
              <h2 className="text-2xl">{profile.name}, {profile.age}</h2>
              <div className="flex items-center gap-1 text-sm">
                <MapPin className="w-4 h-4" />
                {profile.distance} mi
              </div>
            </div>
            <div className="flex items-center gap-2 mb-3">
              <GraduationCap className="w-4 h-4" />
              <span className="text-sm">{profile.major} • {profile.year}</span>
            </div>
          </div>
        </div>
        
        <div className="p-4">
          <p className="text-sm text-muted-foreground mb-3 line-clamp-3">{profile.bio}</p>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {profile.interests.slice(0, 3).map((interest) => (
              <Badge key={interest} variant="secondary" className="text-xs">
                {interest}
              </Badge>
            ))}
            {profile.interests.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{profile.interests.length - 3} more
              </Badge>
            )}
          </div>
          
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => onSwipe('left')}
              className="flex items-center justify-center w-14 h-14 rounded-full border-2 border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground transition-colors"
              title="Fork Down - Pass"
            >
              <Utensils className="w-6 h-6 rotate-180" />
            </button>
            <button
              onClick={() => onSwipe('right')}
              className="flex items-center justify-center w-14 h-14 rounded-full border-2 text-white transition-colors"
              style={{borderColor: '#FFC627', color: '#FFC627', backgroundColor: 'transparent'}}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#FFC627';
                e.currentTarget.style.color = '#8C1D40';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = '#FFC627';
              }}
              title="Fork Up - Like"
            >
              <Utensils className="w-6 h-6" />
            </button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}