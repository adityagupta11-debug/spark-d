import { useDating } from '../contexts/DatingContext';

export default function Discover() {
  const { currentProfile, likeCurrent, passCurrent, currentIndex, profiles, resetDiscover } = useDating();

  if (!currentProfile) {
    return (
      <div className="px-6 py-12 max-w-2xl mx-auto text-center">
        <div className="text-3xl mb-4">💔</div>
        <h2 className="text-white text-2xl mb-2">No matches yet</h2>
        <p className="text-gray-400">Keep swiping to find your perfect Sun Devil match!</p>
        <button onClick={resetDiscover} className="mt-6 bg-yellow-600 hover:bg-yellow-700 text-black py-2 px-4 rounded-lg transition-colors">
          Restart Discover
        </button>
      </div>
    );
  }

  return (
    <div className="px-4 py-6 flex justify-center">
      <div className="w-full max-w-md">
        <div className="bg-gray-900 rounded-2xl overflow-hidden border border-gray-800">
          <div className="h-72 bg-gray-800 flex items-center justify-center text-gray-500">
            <div className="text-center">
              <div className="text-3xl mb-2">🖼️</div>
              <p>Photo placeholder</p>
            </div>
          </div>
          <div className="p-5 bg-gradient-to-b from-black/20 to-black/40">
            <div className="text-white text-2xl mb-1">
              {currentProfile.name}, {currentProfile.age}{' '}
              <span className="text-gray-400 text-base">📍 {currentProfile.distanceMi} mi</span>
            </div>
            <div className="text-gray-300 text-sm mb-4">🎓 {currentProfile.major} • {currentProfile.year}</div>

            <p className="text-gray-300 mb-4">{currentProfile.bio}</p>

            <div className="flex flex-wrap gap-2 mb-6">
              {currentProfile.interests.map((i) => (
                <span key={i} className="px-3 py-1 rounded-full bg-gray-800 text-gray-200 text-xs border border-gray-700">{i}</span>
              ))}
            </div>

            <div className="flex items-center justify-center gap-6 pb-4">
              <button
                aria-label="Pass"
                onClick={passCurrent}
                className="w-16 h-16 rounded-full border border-gray-700 text-gray-300 hover:bg-gray-800 transition-colors"
              >
                👎
              </button>
              <button
                aria-label="Like"
                onClick={likeCurrent}
                className="w-16 h-16 rounded-full border border-yellow-600 text-yellow-400 hover:bg-yellow-900/20 transition-colors"
              >
                👍
              </button>
            </div>

            <div className="text-center text-gray-500 text-xs pb-4">{currentIndex + 1} / {profiles.length}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

