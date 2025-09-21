import { Heart, Users, User, Settings } from 'lucide-react';

interface BottomNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function BottomNavigation({ activeTab, onTabChange }: BottomNavigationProps) {
  const tabs = [
    { id: 'discover', label: 'Discover', icon: Heart },
    { id: 'matches', label: 'Matches', icon: Users },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="bg-[#8B1538] px-4 py-2 flex-shrink-0">
      <div className="flex justify-around">
        {tabs.map(({ id, label, icon: Icon }) => {
          const isActive = activeTab === id;
          return (
            <button
              key={id}
              onClick={() => onTabChange(id)}
              className={`flex flex-col items-center py-3 px-4 rounded-lg transition-colors touch-target ${
                isActive
                  ? 'bg-[#8B1538] text-white'
                  : 'text-white/70 hover:text-white active:bg-white/10'
              }`}
            >
              <Icon className="w-5 h-5 mb-1" />
              <span className="text-xs font-medium">{label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}