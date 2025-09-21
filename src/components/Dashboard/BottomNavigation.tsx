import { Heart, Users, User, Settings } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  path: string;
}

export function BottomNavigation() {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems: NavItem[] = [
    {
      id: 'discover',
      label: 'Discover',
      icon: <Heart className="w-6 h-6" />,
      path: '/dashboard/discover'
    },
    {
      id: 'matches',
      label: 'Matches',
      icon: <Users className="w-6 h-6" />,
      path: '/dashboard/matches'
    },
    {
      id: 'profile',
      label: 'Profile',
      icon: <User className="w-6 h-6" />,
      path: '/dashboard/profile'
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: <Settings className="w-6 h-6" />,
      path: '/dashboard/settings'
    }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black border-t border-gray-800 z-50">
      <div className="flex items-center justify-around py-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.id}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center justify-center py-2 px-4 transition-colors ${
                isActive 
                  ? 'text-white bg-[#8C2F39] rounded-lg' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {item.icon}
              <span className="text-xs mt-1">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}