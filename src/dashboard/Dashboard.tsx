import React, { useState } from 'react'
import { Button } from '../components/ui/button'
import { useAuth } from '../contexts/AuthContext'
import { Discover } from './Discover'
import { Matches } from './Matches'
import { Profile } from './Profile'
import { Settings } from './Settings'

type TabKey = 'discover' | 'matches' | 'profile' | 'settings'

interface DashboardProps {
  onSignOut: () => Promise<void>
  appLogo: string
  backdropImage: string
  userProfile: any
  displayName: string
}

export function Dashboard({ onSignOut, appLogo, backdropImage, userProfile, displayName }: DashboardProps) {
  const [active, setActive] = useState<TabKey>('discover')
  const { user } = useAuth()

  return (
    <div className="min-h-screen bg-black relative overflow-x-hidden">
      <div className="absolute inset-0 z-0">
        <img src={backdropImage} alt="ASU Campus" className="w-full h-full object-cover blur-sm" />
        <div className="absolute inset-0 bg-black/75" />
      </div>

      <div className="relative z-10 min-h-screen flex flex-col">
        <header className="bg-[#8B4B6B] px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img src={appLogo} alt="Spark'd" className="w-8 h-8" />
              <div>
                <h1 className="text-white font-medium">Sun Devil Match</h1>
                <p className="text-white/80 text-sm">ASU Dating & Date Planning</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="hidden md:block text-white/80 text-sm">{displayName || user?.email}</span>
              <Button onClick={onSignOut} variant="outline" className="bg-transparent border-white/20 text-white hover:bg-white/10">Sign Out</Button>
            </div>
          </div>
        </header>

        <main className="flex-1 px-4 sm:px-6 py-6">
          {active === 'discover' && <Discover />}
          {active === 'matches' && <Matches />}
          {active === 'profile' && <Profile profile={userProfile} />}
          {active === 'settings' && <Settings />}
        </main>

        <nav aria-label="Bottom tabs" className="sticky bottom-0 left-0 right-0 bg-black/70 backdrop-blur-md border-t border-gray-800">
          <ul className="grid grid-cols-4">
            <li>
              <TabButton label="Discover" icon="❤️" active={active === 'discover'} onClick={() => setActive('discover')} />
            </li>
            <li>
              <TabButton label="Matches" icon="👥" active={active === 'matches'} onClick={() => setActive('matches')} />
            </li>
            <li>
              <TabButton label="Profile" icon="👤" active={active === 'profile'} onClick={() => setActive('profile')} />
            </li>
            <li>
              <TabButton label="Settings" icon="⚙️" active={active === 'settings'} onClick={() => setActive('settings')} />
            </li>
          </ul>
        </nav>
      </div>
    </div>
  )
}

function TabButton({ label, icon, active, onClick }: { label: string; icon: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex flex-col items-center justify-center py-3 ${active ? 'text-white' : 'text-gray-400'} hover:text-white transition-all`}
    >
      <span className="text-xl leading-none" aria-hidden>{icon}</span>
      <span className="text-xs mt-1">{label}</span>
    </button>
  )
}

