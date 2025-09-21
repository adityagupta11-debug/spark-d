import React from 'react';
import { Edit3, MapPin, GraduationCap } from 'lucide-react';

interface ProfilePageProps {
  user: any;
  userProfile: any;
}

export default function ProfilePage({ user, userProfile }: ProfilePageProps) {
  // Mock interests for now - in a real app this would come from userProfile
  const interests = userProfile?.interests || ['Sports', 'Study Groups', 'Social Life'];

  return (
    <div className="flex-1 bg-black overflow-y-auto">
      {/* Header */}
      <div className="bg-[#8B4B6B] px-4 py-4 flex items-center justify-between">
        <h1 className="text-white text-xl font-semibold">Your Profile</h1>
        <button className="bg-black/20 hover:bg-black/30 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
          <Edit3 size={16} />
          <span>Edit</span>
        </button>
      </div>

      <div className="px-4 py-6">
        {/* Profile Photo */}
        <div className="relative mb-6">
          <div className="w-full h-64 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 rounded-2xl overflow-hidden">
            {/* Hot Air Balloon Scene - matching the Figma design */}
            <div className="w-full h-full bg-gradient-to-b from-blue-300 to-yellow-200 relative">
              {/* Mountains in background */}
              <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-yellow-600 to-yellow-400"></div>
              
              {/* Hot air balloon */}
              <div className="absolute top-16 left-1/2 transform -translate-x-1/2">
                <div className="w-16 h-20 relative">
                  {/* Balloon */}
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-red-500 via-yellow-500 to-green-500 border-2 border-white shadow-lg">
                    <div className="w-full h-full rounded-full bg-gradient-to-br from-red-400 via-yellow-400 to-green-400 opacity-80"></div>
                  </div>
                  {/* Basket */}
                  <div className="absolute top-14 left-1/2 transform -translate-x-1/2 w-4 h-3 bg-yellow-800 rounded-sm"></div>
                  {/* Ropes */}
                  <div className="absolute top-12 left-1/4 w-px h-3 bg-gray-600"></div>
                  <div className="absolute top-12 right-1/4 w-px h-3 bg-gray-600"></div>
                </div>
              </div>
              
              {/* House */}
              <div className="absolute bottom-8 right-8">
                <div className="w-12 h-8 bg-yellow-600 rounded-t-lg"></div>
                <div className="w-12 h-6 bg-orange-600"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Info Grid */}
        <div className="bg-gray-900 rounded-2xl p-6 mb-6">
          <div className="grid grid-cols-2 gap-6">
            {/* Name */}
            <div>
              <h3 className="text-gray-400 text-sm font-medium mb-1">Name</h3>
              <p className="text-white text-lg">
                {userProfile?.firstName && userProfile?.lastName 
                  ? `${userProfile.firstName} ${userProfile.lastName}`
                  : user?.displayName || 'Your Name'
                }
              </p>
            </div>

            {/* Age */}
            <div>
              <h3 className="text-gray-400 text-sm font-medium mb-1">Age</h3>
              <p className="text-white text-lg">{userProfile?.age || '20'}</p>
            </div>

            {/* Major */}
            <div>
              <h3 className="text-gray-400 text-sm font-medium mb-1">Major</h3>
              <p className="text-white text-lg">{userProfile?.major || 'Your Major'}</p>
            </div>

            {/* Year */}
            <div>
              <h3 className="text-gray-400 text-sm font-medium mb-1">Year</h3>
              <p className="text-white text-lg capitalize">{userProfile?.year || 'Sophomore'}</p>
            </div>
          </div>
        </div>

        {/* Bio */}
        <div className="bg-gray-900 rounded-2xl p-6 mb-6">
          <h3 className="text-gray-400 text-sm font-medium mb-3">Bio</h3>
          <p className="text-gray-300 leading-relaxed">
            {userProfile?.bio || "Tell others about yourself! What do you love? What are you looking for?"}
          </p>
        </div>

        {/* Interests */}
        <div className="bg-gray-900 rounded-2xl p-6">
          <h3 className="text-gray-400 text-sm font-medium mb-4">Interests</h3>
          <div className="flex flex-wrap gap-2">
            {interests.map((interest, index) => (
              <span
                key={index}
                className="bg-[#8B4B6B] text-white px-4 py-2 rounded-full text-sm font-medium"
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