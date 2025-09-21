import { Edit, MapPin, GraduationCap } from 'lucide-react';

interface UserProfile {
  firstName?: string;
  lastName?: string;
  age?: number;
  major?: string;
  year?: string;
  bio?: string;
  interests?: string[];
  location?: string;
}

interface ProfilePageProps {
  userProfile?: UserProfile;
}

export function ProfilePage({ userProfile }: ProfilePageProps) {
  return (
    <div className="flex-1 bg-black p-2 sm:p-4 overflow-y-auto">
      {/* Profile Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-white text-2xl font-bold">Your Profile</h1>
        <button className="flex items-center space-x-2 bg-transparent border border-white text-white px-4 py-2 rounded-lg hover:bg-white/10 transition-colors">
          <Edit className="w-4 h-4" />
          <span>Edit</span>
        </button>
      </div>

      {/* Profile Picture */}
      <div className="mb-6">
        <div className="w-full h-64 bg-gradient-to-br from-red-400 via-orange-400 to-yellow-400 rounded-xl relative overflow-hidden">
          {/* Hot air balloon placeholder */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-6xl">🎈</div>
          </div>
          {/* Landscape elements */}
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-green-600 to-green-400"></div>
          <div className="absolute bottom-4 left-4 text-2xl">🌵</div>
          <div className="absolute bottom-4 right-4 text-2xl">🏔️</div>
        </div>
      </div>

      {/* Profile Details */}
      <div className="space-y-4 mb-6">
        <div className="flex justify-between">
          <div>
            <p className="text-gray-400 text-sm">Name</p>
            <p className="text-white">{userProfile?.firstName} {userProfile?.lastName || 'Your Name'}</p>
          </div>
          <div>
            <p className="text-gray-400 text-sm">Age</p>
            <p className="text-white">{userProfile?.age || '20'}</p>
          </div>
        </div>

        <div className="flex justify-between">
          <div>
            <p className="text-gray-400 text-sm">Major</p>
            <p className="text-white">{userProfile?.major || 'Your Major'}</p>
          </div>
          <div>
            <p className="text-gray-400 text-sm">Year</p>
            <p className="text-white capitalize">{userProfile?.year || 'Sophomore'}</p>
          </div>
        </div>
      </div>

      {/* Bio Section */}
      <div className="mb-6">
        <h3 className="text-white text-lg font-medium mb-2">Bio</h3>
        <p className="text-gray-300 text-sm">
          {userProfile?.bio || 'Tell other Sun Devils about yourself! What do you love about ASU? What are you looking for?'}
        </p>
      </div>

      {/* Interests Section */}
      <div>
        <h3 className="text-white text-lg font-medium mb-3">Interests</h3>
        <div className="flex flex-wrap gap-2">
          {userProfile?.interests?.length ? (
            userProfile.interests.map((interest, index) => (
              <span
                key={index}
                className="bg-[#8B1538] text-white px-3 py-1 rounded-full text-sm"
              >
                {interest}
              </span>
            ))
          ) : (
            <>
              <span className="bg-[#8B1538] text-white px-3 py-1 rounded-full text-sm">
                Sun Devils Sports
              </span>
              <span className="bg-[#8B1538] text-white px-3 py-1 rounded-full text-sm">
                Study Groups
              </span>
              <span className="bg-[#8B1538] text-white px-3 py-1 rounded-full text-sm">
                Campus Life
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}