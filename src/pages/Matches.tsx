import { useDating } from '../contexts/DatingContext';

export default function Matches() {
  const { matches } = useDating();

  if (matches.length === 0) {
    return (
      <div className="px-6 py-12 max-w-2xl mx-auto text-center">
        <div className="text-3xl mb-4">💔</div>
        <h2 className="text-white text-2xl mb-2">No matches yet</h2>
        <p className="text-gray-400">Keep swiping to find your perfect Sun Devil match!</p>
      </div>
    );
  }

  return (
    <div className="px-6 py-8 max-w-2xl mx-auto">
      <h2 className="text-white text-xl mb-4">Your Matches</h2>
      <div className="grid grid-cols-2 gap-4">
        {matches.map((m) => (
          <div key={m.id} className="bg-gray-900 rounded-lg border border-gray-800 p-4">
            <div className="h-28 bg-gray-800 rounded mb-3"></div>
            <div className="text-white font-medium">{m.name}, {m.age}</div>
            <div className="text-gray-400 text-sm">{m.major}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

