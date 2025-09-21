import React, { useState } from 'react';
import { Edit3, MapPin, GraduationCap, Camera, Star, Heart, Eye, Settings, Share, MoreHorizontal, Plus, Sparkles, Trophy, Music, Calendar } from 'lucide-react';

interface ProfilePageProps {
  user: any;
  userProfile: any;
}

export default function ProfilePage({ user, userProfile }: ProfilePageProps) {
  const [activeTab, setActiveTab] = useState('about');
  const [isEditing, setIsEditing] = useState(false);

  // Enhanced mock data for comprehensive profile
  const profileData = {
    photos: [
      'https://images.unsplash.com/photo-1494790108755-2616c6d35a6c?w=400&h=600&fit=crop',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=600&fit=crop',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=600&fit=crop'
    ],
    name: userProfile?.firstName && userProfile?.lastName 
      ? `${userProfile.firstName} ${userProfile.lastName}`
      : user?.displayName || 'Your Name',
    age: userProfile?.age || 20,
    major: userProfile?.major || 'Business Administration',
    year: userProfile?.year || 'Junior',
    bio: userProfile?.bio || "Love hiking Camelback Mountain and trying new restaurants in Tempe! Always down for a study session at the MU or catching a Sun Devils game. 🌵",
    interests: userProfile?.interests || ['Hiking', 'Sun Devils Sports', 'Photography', 'Coffee', 'Travel', 'Music'],
    verified: true,
    premium: false,
    height: '5\'6"',
    zodiac: 'Gemini',
    hometown: 'Phoenix, AZ',
    job: 'Marketing Intern',
    education: 'Arizona State University',
    looking_for: 'Something serious',
    relationship_type: 'Monogamous',
    drinking: 'Socially',
    smoking: 'Never',
    exercise: 'Regularly',
    pets: 'Dog lover',
    languages: ['English', 'Spanish'],
    instagram: '@yourhandle',
    spotify: 'Taylor Swift',
    profileViews: 127,
    likes: 89,
    matches: 23,
    responseRate: 95
  };

  const achievements = [
    { icon: '🏆', title: 'Profile Completeness', description: '100% Complete', color: 'bg-yellow-500' },
    { icon: '⭐', title: 'Verified Profile', description: 'Identity Verified', color: 'bg-blue-500' },
    { icon: '💬', title: 'Great Conversationalist', description: '95% Response Rate', color: 'bg-green-500' },
    { icon: '📸', title: 'Photo Verified', description: 'Real Photos Confirmed', color: 'bg-purple-500' }
  ];

  const recentActivity = [
    { type: 'match', message: 'New match with Alex!', time: '2 hours ago' },
    { type: 'like', message: 'Someone liked your photo', time: '4 hours ago' },
    { type: 'view', message: '5 people viewed your profile', time: '1 day ago' },
    { type: 'message', message: 'New message from Emma', time: '2 days ago' }
  ];

  return (
    <div className="flex-1 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 overflow-y-auto">
      {/* Header */}
      <div className="bg-black/20 backdrop-blur-sm px-4 py-4 border-b border-white/10">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-white text-2xl font-bold">Your Profile</h1>
            <p className="text-gray-300 text-sm">Make your profile shine ✨</p>
          </div>
          <div className="flex items-center space-x-2">
            <button className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors">
              <Share size={18} className="text-white" />
            </button>
            <button 
              onClick={() => setIsEditing(!isEditing)}
              className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-4 py-2 rounded-full flex items-center space-x-2 transition-all duration-300 transform hover:scale-105"
            >
              <Edit3 size={16} />
              <span>{isEditing ? 'Save' : 'Edit'}</span>
            </button>
          </div>
        </div>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* Profile Stats */}
        <div className="grid grid-cols-4 gap-4">
          {[
            { label: 'Views', value: profileData.profileViews, color: 'from-blue-500 to-cyan-500' },
            { label: 'Likes', value: profileData.likes, color: 'from-pink-500 to-rose-500' },
            { label: 'Matches', value: profileData.matches, color: 'from-purple-500 to-indigo-500' },
            { label: 'Response', value: `${profileData.responseRate}%`, color: 'from-green-500 to-emerald-500' }
          ].map((stat, index) => (
            <div key={index} className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
              <div className={`w-8 h-8 bg-gradient-to-r ${stat.color} rounded-full flex items-center justify-center mb-2`}>
                <Eye size={16} className="text-white" />
              </div>
              <p className="text-white font-bold text-lg">{stat.value}</p>
              <p className="text-gray-300 text-xs">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Main Profile Card */}
        <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 border border-white/20">
          {/* Profile Photos */}
          <div className="relative mb-6">
            <div className="grid grid-cols-3 gap-3">
              {profileData.photos.map((photo, index) => (
                <div key={index} className="relative">
                  <img
                    src={photo}
                    alt={`Profile ${index + 1}`}
                    className="w-full h-32 object-cover rounded-2xl"
                    onError={(e) => {
                      e.currentTarget.src = `https://ui-avatars.com/api/?name=${profileData.name}&size=400&background=8B4B6B&color=fff`;
                    }}
                  />
                  {index === 0 && (
                    <div className="absolute top-2 right-2 flex space-x-1">
                      {profileData.verified && (
                        <div className="bg-blue-500 rounded-full p-1">
                          <Star size={12} className="text-white fill-current" />
                        </div>
                      )}
                      {profileData.premium && (
                        <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full p-1">
                          <Sparkles size={12} className="text-white" />
                        </div>
                      )}
                    </div>
                  )}
                  {isEditing && (
                    <div className="absolute inset-0 bg-black/50 rounded-2xl flex items-center justify-center">
                      <Camera size={24} className="text-white" />
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            {isEditing && (
              <button className="absolute bottom-2 right-2 w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
                <Plus size={20} className="text-white" />
              </button>
            )}
          </div>

          {/* Basic Info */}
          <div className="text-center mb-6">
            <h2 className="text-white text-3xl font-bold mb-2">{profileData.name}, {profileData.age}</h2>
            <div className="flex items-center justify-center text-gray-300 mb-3">
              <GraduationCap size={16} className="mr-2" />
              <span>{profileData.major} • {profileData.year}</span>
            </div>
            <div className="flex items-center justify-center text-gray-300">
              <MapPin size={16} className="mr-2" />
              <span>{profileData.hometown}</span>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex space-x-2 mb-6 bg-black/20 rounded-full p-1">
            {[
              { key: 'about', label: 'About', icon: '👤' },
              { key: 'details', label: 'Details', icon: '📋' },
              { key: 'activity', label: 'Activity', icon: '📈' },
              { key: 'achievements', label: 'Badges', icon: '🏆' }
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex-1 py-3 px-4 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeTab === tab.key
                    ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="space-y-6">
            {activeTab === 'about' && (
              <>
                {/* Bio */}
                <div>
                  <h3 className="text-white text-lg font-semibold mb-3">About Me</h3>
                  <p className="text-gray-300 leading-relaxed">
                    {profileData.bio}
                  </p>
                </div>

                {/* Interests */}
                <div>
                  <h3 className="text-white text-lg font-semibold mb-3">Interests</h3>
                  <div className="flex flex-wrap gap-2">
                    {profileData.interests.map((interest, index) => (
                      <span
                        key={index}
                        className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-medium"
                      >
                        {interest}
                      </span>
                    ))}
                    {isEditing && (
                      <button className="border-2 border-dashed border-gray-400 text-gray-400 px-4 py-2 rounded-full text-sm hover:border-white hover:text-white transition-colors">
                        + Add Interest
                      </button>
                    )}
                  </div>
                </div>

                {/* Social Connections */}
                <div>
                  <h3 className="text-white text-lg font-semibold mb-3">Connect</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-xl border border-pink-500/30">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                          <span className="text-white text-sm">📷</span>
                        </div>
                        <div>
                          <p className="text-white font-medium">Instagram</p>
                          <p className="text-gray-300 text-sm">{profileData.instagram}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-xl border border-green-500/30">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                          <Music size={16} className="text-white" />
                        </div>
                        <div>
                          <p className="text-white font-medium">Spotify</p>
                          <p className="text-gray-300 text-sm">Recently: {profileData.spotify}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {activeTab === 'details' && (
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Height', value: profileData.height },
                  { label: 'Zodiac', value: profileData.zodiac },
                  { label: 'Looking for', value: profileData.looking_for },
                  { label: 'Relationship', value: profileData.relationship_type },
                  { label: 'Drinking', value: profileData.drinking },
                  { label: 'Smoking', value: profileData.smoking },
                  { label: 'Exercise', value: profileData.exercise },
                  { label: 'Pets', value: profileData.pets },
                  { label: 'Languages', value: profileData.languages.join(', ') },
                  { label: 'Job', value: profileData.job }
                ].map((detail, index) => (
                  <div key={index} className="bg-black/20 rounded-xl p-4">
                    <p className="text-gray-400 text-sm mb-1">{detail.label}</p>
                    <p className="text-white font-medium">{detail.value}</p>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'activity' && (
              <div className="space-y-4">
                <h3 className="text-white text-lg font-semibold">Recent Activity</h3>
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center space-x-4 p-3 bg-black/20 rounded-xl">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      activity.type === 'match' ? 'bg-pink-500' :
                      activity.type === 'like' ? 'bg-red-500' :
                      activity.type === 'view' ? 'bg-blue-500' : 'bg-green-500'
                    }`}>
                      {activity.type === 'match' && <Heart size={16} className="text-white" />}
                      {activity.type === 'like' && <Heart size={16} className="text-white" />}
                      {activity.type === 'view' && <Eye size={16} className="text-white" />}
                      {activity.type === 'message' && <span className="text-white text-sm">💬</span>}
                    </div>
                    <div className="flex-1">
                      <p className="text-white">{activity.message}</p>
                      <p className="text-gray-400 text-sm">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'achievements' && (
              <div className="grid grid-cols-2 gap-4">
                {achievements.map((achievement, index) => (
                  <div key={index} className="bg-black/20 rounded-xl p-4 text-center">
                    <div className={`w-12 h-12 ${achievement.color} rounded-full flex items-center justify-center mx-auto mb-3`}>
                      <span className="text-2xl">{achievement.icon}</span>
                    </div>
                    <h4 className="text-white font-semibold mb-1">{achievement.title}</h4>
                    <p className="text-gray-300 text-sm">{achievement.description}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Profile Tips */}
        {!isEditing && (
          <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-2xl p-4 border border-yellow-500/30">
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                <Sparkles size={16} className="text-white" />
              </div>
              <div>
                <h3 className="text-white font-semibold mb-1">Profile Tip</h3>
                <p className="text-gray-300 text-sm">
                  Add more photos and complete your profile details to get 3x more matches! 
                  Profiles with 6+ photos get 40% more likes.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}