import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

export type DiscoverProfile = {
  id: string;
  name: string;
  age: number;
  distanceMi: number;
  major: string;
  year: string;
  bio: string;
  interests: string[];
  photoUrl?: string;
};

type DatingContextValue = {
  profiles: DiscoverProfile[];
  currentIndex: number;
  currentProfile: DiscoverProfile | null;
  likeCurrent: () => void;
  passCurrent: () => void;
  matches: DiscoverProfile[];
  resetDiscover: () => void;
};

const DatingContext = createContext<DatingContextValue | undefined>(undefined);

const defaultProfiles: DiscoverProfile[] = [
  {
    id: 'emma',
    name: 'Emma',
    age: 20,
    distanceMi: 0.5,
    major: 'Business Administration',
    year: 'Junior',
    bio: "Love hiking Camelback Mountain and trying new restaurants in Tempe! Always down for a study session at the MU or catching a Sun Devils game.",
    interests: ['Hiking', 'Sun Devils Sports', 'Photography'],
  },
  {
    id: 'noah',
    name: 'Noah',
    age: 21,
    distanceMi: 1.2,
    major: 'Computer Science',
    year: 'Senior',
    bio: 'Building side projects, coffee at Cartel, and pickup basketball at the SDFC.',
    interests: ['Hackathons', 'Coffee', 'Basketball'],
  },
  {
    id: 'maya',
    name: 'Maya',
    age: 19,
    distanceMi: 0.3,
    major: 'Psychology',
    year: 'Sophomore',
    bio: 'Book club, art museum trips, and late-night In-N-Out runs.',
    interests: ['Reading', 'Art', 'Foodie'],
  },
];

export function DatingProvider({ children }: { children: React.ReactNode }) {
  const [profiles] = useState<DiscoverProfile[]>(defaultProfiles);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [matches, setMatches] = useState<DiscoverProfile[]>(() => {
    try {
      const raw = localStorage.getItem('sdm_matches');
      return raw ? (JSON.parse(raw) as DiscoverProfile[]) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('sdm_matches', JSON.stringify(matches));
    } catch {}
  }, [matches]);

  const currentProfile = useMemo(() => {
    return currentIndex < profiles.length ? profiles[currentIndex] : null;
  }, [currentIndex, profiles]);

  const likeCurrent = useCallback(() => {
    if (!currentProfile) return;
    // For demo: a like is an instant match
    setMatches((prev) => (prev.find((m) => m.id === currentProfile.id) ? prev : [...prev, currentProfile]));
    setCurrentIndex((i) => i + 1);
  }, [currentProfile]);

  const passCurrent = useCallback(() => {
    setCurrentIndex((i) => i + 1);
  }, []);

  const resetDiscover = useCallback(() => {
    setCurrentIndex(0);
  }, []);

  const value: DatingContextValue = {
    profiles,
    currentIndex,
    currentProfile,
    likeCurrent,
    passCurrent,
    matches,
    resetDiscover,
  };

  return <DatingContext.Provider value={value}>{children}</DatingContext.Provider>;
}

export function useDating() {
  const ctx = useContext(DatingContext);
  if (!ctx) throw new Error('useDating must be used within a DatingProvider');
  return ctx;
}

