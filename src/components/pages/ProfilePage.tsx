import React, { useState } from 'react';
import { Edit3, MapPin, GraduationCap, Camera, Plus, X, Instagram, Music, Shield, Award } from 'lucide-react';

interface ProfilePageProps {
  user: any;
  userProfile: any;
}

export default function ProfilePage({ user, userProfile }: ProfilePageProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [photos, setPhotos] = useState([
    { id: 1, url: '/api/placeholder/200/300', main: true },
    { id: 2, url: '/api/placeholder/200/300', main: false },
    { id: 3, url: null, main: false },
    { id: 4, url: null, main: false },
    { id: 5, url: null, main: false },
    { id: 6, url: null, main: false },
  ]);

  const interests = userProfile?.interests || [
    'Sun Devils Sports', 'Study Groups', 'Campus Life', 'Coffee', 'Hiking', 'Photography'
  ];

  const prompts = [
    { question: "My ideal first date", answer: "Sunset at Papago Park followed by dinner in Old Town" },
    { question: "I'm looking for", answer: "Someone genuine who loves adventure and deep conversations" },
    { question: "Two truths and a lie", answer: "I've been to 15 countries, I can cook amazing pasta, I hate coffee" }
  ];

  const stats = {
    likes: 127,
    superLikes: 12,
    matches: 23,
    profileViews: 342
  };

  return (
    <div className="flex-1 bg-black overflow-y-auto pb-20">
      {/* Header */}
      <div className="brand-header px-4 py-4 flex items-center justify-between sticky top-0 z-10">
        <h1 className="text-white text-xl font-semibold">Your Profile</h1>
        <button 
          onClick={() => setIsEditing(!isEditing)}
          className="bg-black/20 backdrop-blur-sm hover:bg-black/30 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
        >
          <Edit3 size={16} />
          <span>{isEditing ? 'Done' : 'Edit'}</span>
        </button>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* Photo Grid */}
        <div className="grid grid-cols-3 gap-2">
          {photos.map((photo, index) => (
            <div 
              key={photo.id}
              className={`relative aspect-[3/4] bg-gray-900 rounded-xl overflow-hidden ${
                index === 0 ? 'col-span-2 row-span-2' : ''
              }`}
            >
              {photo.url ? (
                <>
                  <div className="w-full h-full bg-gradient-to-b from-gray-700 to-gray-900 flex items-center justify-center">
                    <span className="text-4xl opacity-50">📷</span>
                  </div>
                  {isEditing && (
                    <button className="absolute top-2 right-2 bg-red-500 p-1 rounded-full">
                      <X size={16} className="text-white" />
                    </button>
                  )}
                  {photo.main && (
                    <div className="absolute bottom-2 left-2 bg-primary px-2 py-1 rounded-full">
                      <span className="text-white text-xs font-medium">Main</span>
                    </div>
                  )}
                </>
              ) : (
                <button className="w-full h-full flex items-center justify-center border-2 border-dashed border-gray-700 hover:border-primary transition-colors">
                  <Plus size={24} className="text-gray-500" />
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Profile Completeness */}
        <div className="profile-section p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-white font-medium">Profile Strength</h3>
            <span className="text-primary text-sm font-medium">75%</span>
          </div>
          <div className="w-full bg-gray-800 rounded-full h-2 mb-3">
            <div className="bg-gradient-to-r from-primary to-pink-500 h-2 rounded-full" style={{ width: '75%' }}></div>
          </div>
          <p className="text-gray-400 text-sm">Add more photos and prompts to complete your profile</p>
        </div>

        {/* Basic Info */}
        <div className="profile-section p-4">
          <h3 className="text-white font-medium mb-4">Basic Info</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Name</span>
              <span className="text-white">
                {userProfile?.firstName && userProfile?.lastName 
                  ? `${userProfile.firstName} ${userProfile.lastName}`
                  : user?.displayName || 'Your Name'
                }
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Age</span>
              <span className="text-white">{userProfile?.age || '20'}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Major</span>
              <span className="text-white">{userProfile?.major || 'Computer Science'}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Year</span>
              <span className="text-white capitalize">{userProfile?.year || 'Junior'}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Location</span>
              <span className="text-white flex items-center gap-1">
                <MapPin size={14} />
                Tempe, AZ
              </span>
            </div>
          </div>
        </div>

        {/* Bio */}
        <div className="profile-section p-4">
          <h3 className="text-white font-medium mb-3">Bio</h3>
          <p className="text-gray-300 leading-relaxed">
            {userProfile?.bio || "ASU junior studying Computer Science. Love hiking, trying new coffee shops, and Sun Devils games! Looking for someone to explore Phoenix with and share late-night study sessions. 🌵☀️"}
          </p>
          {isEditing && (
            <button className="text-primary text-sm mt-2">Edit bio</button>
          )}
        </div>

        {/* Prompts */}
        <div className="profile-section p-4">
          <h3 className="text-white font-medium mb-4">My Answers</h3>
          <div className="space-y-3">
            {prompts.map((prompt, index) => (
              <div key={index} className="bg-gray-900 rounded-xl p-3">
                <p className="text-gray-400 text-sm mb-1">{prompt.question}</p>
                <p className="text-white">{prompt.answer}</p>
                {isEditing && (
                  <button className="text-primary text-sm mt-2">Edit</button>
                )}
              </div>
            ))}
            {isEditing && (
              <button className="w-full py-2 border border-dashed border-gray-700 rounded-xl text-gray-400 hover:border-primary hover:text-primary transition-colors">
                + Add prompt
              </button>
            )}
          </div>
        </div>

        {/* Interests */}
        <div className="profile-section p-4">
          <h3 className="text-white font-medium mb-4">Interests</h3>
          <div className="flex flex-wrap gap-2">
            {interests.map((interest, index) => (
              <span key={index} className="interest-tag">
                {interest}
                {isEditing && (
                  <button className="ml-2">
                    <X size={12} />
                  </button>
                )}
              </span>
            ))}
            {isEditing && (
              <button className="bg-gray-800 text-gray-400 px-3 py-1 rounded-full text-sm hover:bg-gray-700 transition-colors">
                + Add
              </button>
            )}
          </div>
        </div>

        {/* Connected Accounts */}
        <div className="profile-section p-4">
          <h3 className="text-white font-medium mb-4">Connected Accounts</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Instagram className="text-pink-500" size={20} />
                <span className="text-white">Instagram</span>
              </div>
              <button className="text-primary text-sm">Connect</button>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Music className="text-green-500" size={20} />
                <span className="text-white">Spotify</span>
              </div>
              <span className="text-gray-400 text-sm">@yourspotify</span>
            </div>
          </div>
        </div>

        {/* Verification */}
        <div className="profile-section p-4">
          <h3 className="text-white font-medium mb-4">Verification</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Shield className="text-blue-500" size={20} />
                <div>
                  <p className="text-white">Photo Verification</p>
                  <p className="text-gray-400 text-xs">Prove you're real</p>
                </div>
              </div>
              <button className="bg-blue-500/20 text-blue-500 px-3 py-1 rounded-lg text-sm">
                Verify
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Award className="text-yellow-500" size={20} />
                <div>
                  <p className="text-white">ASU Student</p>
                  <p className="text-gray-400 text-xs">Verified with .edu email</p>
                </div>
              </div>
              <span className="text-green-500 text-sm">✓ Verified</span>
            </div>
          </div>
        </div>

        {/* Profile Stats */}
        <div className="profile-section p-4">
          <h3 className="text-white font-medium mb-4">Your Stats</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-900 rounded-xl p-3 text-center">
              <p className="text-2xl font-bold text-white">{stats.likes}</p>
              <p className="text-gray-400 text-sm">Likes</p>
            </div>
            <div className="bg-gray-900 rounded-xl p-3 text-center">
              <p className="text-2xl font-bold text-white">{stats.superLikes}</p>
              <p className="text-gray-400 text-sm">Super Likes</p>
            </div>
            <div className="bg-gray-900 rounded-xl p-3 text-center">
              <p className="text-2xl font-bold text-white">{stats.matches}</p>
              <p className="text-gray-400 text-sm">Matches</p>
            </div>
            <div className="bg-gray-900 rounded-xl p-3 text-center">
              <p className="text-2xl font-bold text-white">{stats.profileViews}</p>
              <p className="text-gray-400 text-sm">Profile Views</p>
            </div>
          </div>
        </div>

        {/* Boost Profile */}
        <div className="bg-gradient-to-br from-primary/20 to-purple-600/20 rounded-xl p-4">
          <h3 className="text-white font-medium mb-2">Boost Your Profile</h3>
          <p className="text-gray-300 text-sm mb-3">Be the top profile in your area for 30 minutes</p>
          <button className="w-full bg-gradient-to-r from-primary to-pink-500 text-white font-medium py-2 rounded-lg">
            Boost Now
          </button>
        </div>
      </div>
    </div>
  );
}