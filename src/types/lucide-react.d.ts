declare module 'lucide-react' {
  import * as React from 'react';
  export interface IconProps extends React.SVGProps<SVGSVGElement> {
    color?: string;
    size?: number | string;
    absoluteStrokeWidth?: boolean;
  }

  export const Heart: React.FC<IconProps>;
  export const Users: React.FC<IconProps>;
  export const User: React.FC<IconProps>;
  export const Settings: React.FC<IconProps>;
  export const MapPin: React.FC<IconProps>;
  export const GraduationCap: React.FC<IconProps>;
  export const X: React.FC<IconProps>;
  export const HeartCrack: React.FC<IconProps>;
  export const Edit3: React.FC<IconProps>;
  export const Mail: React.FC<IconProps>;
  export const Phone: React.FC<IconProps>;
  export const Camera: React.FC<IconProps>;
  export const Search: React.FC<IconProps>;
  export const ChevronRight: React.FC<IconProps>;
  export const LogOut: React.FC<IconProps>;
  export const Shield: React.FC<IconProps>;
}
