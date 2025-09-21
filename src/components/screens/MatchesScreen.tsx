export function MatchesScreen() {
  return (
    <div className="flex-1 bg-black flex items-center justify-center p-6">
      <div className="text-center max-w-md">
        {/* Broken Heart Icon */}
        <div className="mb-8">
          <div className="text-8xl mb-4">💔</div>
        </div>

        {/* Title */}
        <h1 className="text-white text-3xl font-bold mb-4">
          No matches yet
        </h1>

        {/* Subtitle */}
        <p className="text-gray-400 text-lg leading-relaxed">
          Keep swiping to find your perfect Sun Devil match!
        </p>

        {/* Encouraging text */}
        <div className="mt-8 text-gray-500 text-sm">
          <p>Don't worry, great matches take time.</p>
          <p>Your perfect Sun Devil is out there! 🌵</p>
        </div>
      </div>
    </div>
  );
}