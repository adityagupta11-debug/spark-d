import React from 'react';
import { Edit3, MapPin, GraduationCap } from 'lucide-react';

interface ProfilePageProps {
  user: any;
  userProfile: any;
}

export default function ProfilePage({ user, userProfile }: ProfilePageProps) {
  // Mock interests for now - in a real app this would come from userProfile
  const interests = userProfile?.interests || ['Sun Devils Sports', 'Study Groups', 'Campus Life'];

  return (
    <div className="flex-1 overflow-y-auto relative z-10">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600/90 to-pink-600/90 backdrop-blur-md px-6 py-6 flex items-center justify-between shadow-2xl">
        <h1 className="text-white text-2xl font-bold">Your Profile</h1>
        <button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-6 py-3 rounded-2xl flex items-center space-x-2 transition-all duration-200 shadow-lg hover:shadow-xl">
          <Edit3 size={18} />
          <span className="font-semibold">Edit</span>
        </button>
      </div>

      <div className="px-6 py-8">
        {/* Profile Photo */}
        <div className="relative mb-8">
          <div className="w-full h-80 bg-gradient-to-br from-purple-400 via-pink-400 to-blue-400 rounded-3xl overflow-hidden shadow-2xl">
            {/* Hot Air Balloon Scene - matching the Figma design */}
            <div className="w-full h-full bg-gradient-to-b from-blue-300 to-yellow-200 relative">
              {/* Mountains in background */}
              <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-yellow-600 to-yellow-400"></div>
              
              {/* Hot air balloon */}
              <div className="absolute top-20 left-1/2 transform -translate-x-1/2">
                <div className="w-20 h-24 relative">
                  {/* Balloon */}
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-red-500 via-yellow-500 to-green-500 border-4 border-white shadow-2xl">
                    <div className="w-full h-full rounded-full bg-gradient-to-br from-red-400 via-yellow-400 to-green-400 opacity-90"></div>
                  </div>
                  {/* Basket */}
                  <div className="absolute top-16 left-1/2 transform -translate-x-1/2 w-6 h-4 bg-yellow-800 rounded-sm shadow-lg"></div>
                  {/* Ropes */}
                  <div className="absolute top-14 left-1/3 w-px h-4 bg-gray-600"></div>
                  <div className="absolute top-14 right-1/3 w-px h-4 bg-gray-600"></div>
                </div>
              </div>
              
              {/* House */}
              <div className="absolute bottom-12 right-12">
                <div className="w-16 h-10 bg-yellow-600 rounded-t-lg shadow-lg"></div>
                <div className="w-16 h-8 bg-orange-600 shadow-lg"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Info Grid */}
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 mb-8 border border-white/20 shadow-2xl">
          <div className="grid grid-cols-2 gap-8">
            {/* Name */}
            <div>
              <h3 className="text-gray-300 text-sm font-semibold mb-3 uppercase tracking-wide">Name</h3>
              <p className="text-white text-xl font-bold">
                {userProfile?.firstName && userProfile?.lastName 
                  ? `${userProfile.firstName} ${userProfile.lastName}`
                  : user?.displayName || 'Your Name'
                }
              </p>
            </div>

            {/* Age */}
            <div>
              <h3 className="text-gray-300 text-sm font-semibold mb-3 uppercase tracking-wide">Age</h3>
              <p className="text-white text-xl font-bold">{userProfile?.age || '20'}</p>
            </div>

            {/* Major */}
            <div>
              <h3 className="text-gray-300 text-sm font-semibold mb-3 uppercase tracking-wide">Major</h3>
              <p className="text-white text-xl font-bold">{userProfile?.major || 'Your Major'}</p>
            </div>

            {/* Year */}
            <div>
              <h3 className="text-gray-300 text-sm font-semibold mb-3 uppercase tracking-wide">Year</h3>
              <p className="text-white text-xl font-bold capitalize">{userProfile?.year || 'Sophomore'}</p>
            </div>
          </div>
        </div>

        {/* Bio */}
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 mb-8 border border-white/20 shadow-2xl">
          <h3 className="text-gray-300 text-sm font-semibold mb-4 uppercase tracking-wide">Bio</h3>
          <p className="text-gray-200 leading-relaxed text-lg">
            {userProfile?.bio || "Tell other Sun Devils about yourself! What do you love about ASU? What are you looking for?"}
          </p>
        </div>

        {/* Interests */}
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl">
          <h3 className="text-gray-300 text-sm font-semibold mb-6 uppercase tracking-wide">Interests</h3>
          <div className="flex flex-wrap gap-3">
            {interests.map((interest, index) => (
              <span
                key={index}
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-full text-sm font-semibold shadow-lg"
              >
                {interest}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}