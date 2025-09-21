import React, { useMemo, useState } from 'react'
import { Button } from '../components/ui/button'
import { Badge } from '../components/ui/badge'

interface Candidate {
  id: string
  name: string
  age: number
  distance: string
  major: string
  year: string
  bio: string
  interests: string[]
}

export function Discover() {
  const seed: Candidate[] = useMemo(
    () => [
      {
        id: '1',
        name: 'Emma',
        age: 20,
        distance: '0.5 mi',
        major: 'Business Administration',
        year: 'Junior',
        bio:
          'Love hiking Camelback Mountain and trying new restaurants in Tempe! Always down for a study session at the MU or catching a Sun Devils game. 🌵',
        interests: ['Hiking', 'Sun Devils Sports', 'Photography', 'Foodie'],
      },
      {
        id: '2',
        name: 'Liam',
        age: 21,
        distance: '1.1 mi',
        major: 'Computer Science',
        year: 'Senior',
        bio: 'Building cool apps, coffee lover, and rec center regular. Let’s go to a game!',
        interests: ['Coding', 'Coffee', 'Gym', 'Basketball'],
      },
    ],
    [],
  )

  const [index, setIndex] = useState(0)
  const [likedIds, setLikedIds] = useState<string[]>([])

  const candidate = seed[index]

  const handleSkip = () => setIndex((i) => Math.min(i + 1, seed.length))
  const handleLike = () => {
    if (candidate) setLikedIds((ids) => [...ids, candidate.id])
    setIndex((i) => Math.min(i + 1, seed.length))
  }

  if (!candidate) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center">
        <div className="text-5xl mb-4">🎉</div>
        <h2 className="text-white text-2xl mb-2">You’re all caught up</h2>
        <p className="text-gray-400">We’ll let you know when there are more Sun Devils to discover.</p>
      </div>
    )
  }

  return (
    <div className="max-w-md mx-auto">
      <div className="bg-gray-900 rounded-2xl overflow-hidden border border-gray-800">
        <div className="h-80 bg-gray-800 flex items-center justify-center">
          <svg className="w-16 h-16 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <path d="m3 16 5-5 4 4 5-6 4 5" />
          </svg>
        </div>

        <div className="p-5">
          <div className="flex items-center gap-2 text-white text-2xl font-medium">
            <span>{candidate.name}, {candidate.age}</span>
            <span className="text-gray-400 text-base">•</span>
            <span className="text-gray-300 text-base">📍 {candidate.distance}</span>
          </div>
          <div className="text-gray-300 mt-2">🎓 {candidate.major} • {candidate.year}</div>

          <p className="text-gray-300 mt-4">{candidate.bio}</p>

          <div className="flex flex-wrap gap-2 mt-4">
            {candidate.interests.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="secondary">{tag}</Badge>
            ))}
            {candidate.interests.length > 3 && (
              <span className="text-sm text-gray-400 px-3 py-1 rounded-full border border-gray-700">+{candidate.interests.length - 3} more</span>
            )}
          </div>

          <div className="flex items-center justify-center gap-8 mt-6 pb-2">
            <ActionCircle ariaLabel="Skip" bgClass="bg-gray-900" borderClass="border-gray-700" onClick={handleSkip}>💔</ActionCircle>
            <ActionCircle ariaLabel="Like" bgClass="bg-yellow-600" borderClass="border-yellow-600" onClick={handleLike}>Ψφ</ActionCircle>
          </div>
        </div>
      </div>
      {likedIds.length > 0 && (
        <p className="text-gray-400 text-sm mt-3 text-center">Likes this session: {likedIds.length}</p>
      )}
    </div>
  )
}

function ActionCircle({ children, ariaLabel, bgClass, borderClass, onClick }: { children: React.ReactNode; ariaLabel: string; bgClass: string; borderClass: string; onClick: () => void }) {
  return (
    <button
      aria-label={ariaLabel}
      onClick={onClick}
      className={`w-20 h-20 rounded-full border ${borderClass} flex items-center justify-center text-3xl ${bgClass} hover:opacity-90 transition-all`}
    >
      <span className="select-none leading-none" aria-hidden>{children}</span>
    </button>
  )
}

