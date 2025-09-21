import { Link, NavLink, Outlet } from 'react-router-dom';
import sparkLogo from '../../assets/be0089ef2be8ba12e1e7b021047e4ab156b62992.png';
import { Button } from '../ui/button';
import { signOutUser } from '../../lib/auth';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-black relative">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black"></div>
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        <header className="bg-[#8B4B6B] px-6 py-4 shadow-md">
          <div className="flex items-center justify-between">
            <Link to="/app/discover" className="flex items-center space-x-3">
              <img src={sparkLogo} alt="Spark'd Logo" className="w-8 h-8" />
              <div>
                <h1 className="text-white font-medium">Sun Devil Match</h1>
                <p className="text-white/80 text-sm">ASU Dating & Date Planning</p>
              </div>
            </Link>
            <Button
              onClick={() => signOutUser().catch(console.error)}
              variant="outline"
              className="bg-transparent border-white/20 text-white hover:bg-white/10"
            >
              Sign Out
            </Button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto pb-20">{children ?? <Outlet />}</main>

        <nav className="fixed bottom-0 left-0 right-0 bg-black border-t border-gray-800">
          <div className="max-w-2xl mx-auto grid grid-cols-4">
            <TabLink to="/app/discover" label="Discover" icon="❤️" />
            <TabLink to="/app/matches" label="Matches" icon="👥" />
            <TabLink to="/app/profile" label="Profile" icon="👤" />
            <TabLink to="/app/settings" label="Settings" icon="⚙️" />
          </div>
        </nav>
      </div>
    </div>
  );
}

function TabLink({ to, label, icon }: { to: string; label: string; icon: string }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `px-6 py-3 flex flex-col items-center justify-center ${isActive ? 'text-white' : 'text-gray-400'}`
      }
    >
      <span className="text-lg leading-none">{icon}</span>
      <span className="text-xs mt-1">{label}</span>
    </NavLink>
  );
}

