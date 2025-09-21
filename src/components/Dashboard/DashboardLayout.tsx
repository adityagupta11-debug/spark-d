import { Outlet } from 'react-router-dom';
import { BottomNavigation } from './BottomNavigation';
import { Cactus } from 'lucide-react';

export function DashboardLayout() {
  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <div className="bg-[#8C2F39] px-4 py-3 sticky top-0 z-40">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-[#6B2331] rounded-full flex items-center justify-center">
            <Cactus className="w-6 h-6 text-green-400" />
          </div>
          <div>
            <h1 className="text-white font-semibold text-lg">Sun Devil Match</h1>
            <p className="text-white/80 text-xs">ASU Dating & Date Planning</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="pb-20">
        <Outlet />
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
}