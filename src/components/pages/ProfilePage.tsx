import React, { useState } from 'react';
import { Edit3, MapPin, GraduationCap, Camera, Star, Plus, X, Check, Heart, MessageCircle, Share, MoreHorizontal, Settings, Crown, Zap, Shield, Award } from 'lucide-react';

interface ProfilePageProps {
  user: any;
  userProfile: any;
}

export default function ProfilePage({ user, userProfile }: ProfilePageProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState<'photos' | 'prompts' | 'interests'>('photos');
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);

  // Enhanced mock data
  const profileData = {
    firstName: userProfile?.firstName || 'Alex',
    lastName: userProfile?.lastName || 'Johnson',
    age: userProfile?.age || 20,
    major: userProfile?.major || 'Computer Science',
    year: userProfile?.year || 'Junior',
    bio: userProfile?.bio || "Computer Science student who loves coding, hiking, and trying new coffee shops around Tempe. Always down for a study session or exploring Phoenix! 🌵",
    photos: [
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=600&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=600&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop&crop=face'
    ],
    prompts: [
      { question: "My ideal first date", answer: "Hiking Camelback at sunrise followed by coffee at Cartel" },
      { question: "I'm looking for", answer: "Someone who shares my love for adventure and good conversation" },
      { question: "My biggest fear", answer: "Running out of coffee during finals week" },
      { question: "My most irrational fear", answer: "Spiders in my code" },
      { question: "The way to my heart", answer: "Good music and great food" }
    ],
    interests: ['Coding', 'Hiking', 'Coffee', 'Photography', 'Sun Devils Sports', 'Gaming', 'Travel', 'Music'],
    verified: true,
    premium: true,
    superLikes: 3,
    boost: 1
  };

  const handleEditProfile = () => {
    setIsEditing(!isEditing);
  };

  const handleAddPhoto = () => {
    // In a real app, this would open a photo picker
    console.log('Add photo clicked');
  };

  const handleRemovePhoto = (index: number) => {
    // In a real app, this would remove the photo from the backend
    console.log('Remove photo at index:', index);
  };

  const handleReorderPhotos = (fromIndex: number, toIndex: number) => {
    // In a real app, this would reorder photos in the backend
    console.log('Reorder photos from', fromIndex, 'to', toIndex);
  };

  return (
    <div className="flex-1 bg-gradient-to-br from-gray-900 via-black to-gray-900 overflow-y-auto">
      {/* Header */}
      <div className="bg-black/50 backdrop-blur-sm px-4 py-4 flex items-center justify-between">
        <h1 className="text-white text-xl font-semibold">Your Profile</h1>
        <div className="flex items-center space-x-2">
          <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <Settings size={20} className="text-white" />
          </button>
          <button 
            onClick={handleEditProfile}
            className="bg-gradient-to-r from-[#8C1D40] to-[#FFC627] hover:shadow-lg text-white px-4 py-2 rounded-full flex items-center space-x-2 transition-all"
          >
            <Edit3 size={16} />
            <span>{isEditing ? 'Save' : 'Edit'}</span>
          </button>
        </div>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* Profile Header */}
        <div className="bg-gray-800/50 rounded-2xl p-6">
          <div className="flex items-start space-x-4">
            {/* Profile Photo */}
            <div className="relative">
              <img
                src={profileData.photos[0]}
                alt="Profile"
                className="w-20 h-20 rounded-full object-cover border-4 border-gradient-to-r from-[#8C1D40] to-[#FFC627]"
              />
              {profileData.verified && (
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center border-2 border-black">
                  <Star size={12} className="text-white fill-white" />
                </div>
              )}
            </div>

            {/* Profile Info */}
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <h2 className="text-2xl font-bold text-white">
                  {profileData.firstName} {profileData.lastName}, {profileData.age}
                </h2>
                {profileData.verified && (
                  <Star size={20} className="text-blue-400 fill-blue-400" />
                )}
                {profileData.premium && (
                  <Crown size={20} className="text-yellow-400 fill-yellow-400" />
                )}
              </div>
              
              <div className="flex items-center text-gray-300 mb-2">
                <GraduationCap size={16} className="mr-2" />
                <span>{profileData.major} • {profileData.year}</span>
              </div>
              
              <div className="flex items-center text-gray-400 text-sm">
                <MapPin size={14} className="mr-1" />
                <span>Tempe, AZ</span>
              </div>
            </div>

            {/* Premium Badge */}
            {profileData.premium && (
              <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-3 py-1 rounded-full text-xs font-bold">
                PREMIUM
              </div>
            )}
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-gray-800/50 rounded-xl p-4 text-center">
            <Heart size={24} className="text-red-400 mx-auto mb-2" />
            <p className="text-white font-bold text-lg">24</p>
            <p className="text-gray-400 text-xs">Likes</p>
          </div>
          <div className="bg-gray-800/50 rounded-xl p-4 text-center">
            <MessageCircle size={24} className="text-blue-400 mx-auto mb-2" />
            <p className="text-white font-bold text-lg">8</p>
            <p className="text-gray-400 text-xs">Matches</p>
          </div>
          <div className="bg-gray-800/50 rounded-xl p-4 text-center">
            <Star size={24} className="text-yellow-400 mx-auto mb-2" />
            <p className="text-white font-bold text-lg">{profileData.superLikes}</p>
            <p className="text-gray-400 text-xs">Super Likes</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 bg-gray-800 p-1 rounded-lg">
          {[
            { key: 'photos', label: 'Photos', count: profileData.photos.length },
            { key: 'prompts', label: 'Prompts', count: profileData.prompts.length },
            { key: 'interests', label: 'Interests', count: profileData.interests.length }
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                activeTab === tab.key
                  ? 'bg-gradient-to-r from-[#8C1D40] to-[#FFC627] text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'photos' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-white font-semibold">Your Photos</h3>
              <button 
                onClick={handleAddPhoto}
                className="bg-gradient-to-r from-[#8C1D40] to-[#FFC627] text-white px-4 py-2 rounded-full text-sm font-medium flex items-center space-x-2"
              >
                <Plus size={16} />
                <span>Add Photo</span>
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {profileData.photos.map((photo, index) => (
                <div key={index} className="relative group">
                  <img
                    src={photo}
                    alt={`Photo ${index + 1}`}
                    className="w-full h-48 rounded-xl object-cover"
                    onClick={() => {
                      setSelectedPhotoIndex(index);
                      setShowPhotoModal(true);
                    }}
                  />
                  {isEditing && (
                    <button
                      onClick={() => handleRemovePhoto(index)}
                      className="absolute top-2 right-2 p-1 bg-red-500 hover:bg-red-600 rounded-full transition-colors"
                    >
                      <X size={16} className="text-white" />
                    </button>
                  )}
                  {index === 0 && (
                    <div className="absolute bottom-2 left-2 bg-black/50 text-white px-2 py-1 rounded-full text-xs font-medium">
                      Main Photo
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'prompts' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-white font-semibold">Your Prompts</h3>
              <button className="bg-gradient-to-r from-[#8C1D40] to-[#FFC627] text-white px-4 py-2 rounded-full text-sm font-medium flex items-center space-x-2">
                <Plus size={16} />
                <span>Add Prompt</span>
              </button>
            </div>
            
            <div className="space-y-4">
              {profileData.prompts.map((prompt, index) => (
                <div key={index} className="bg-gray-800/50 rounded-xl p-4">
                  <p className="text-gray-400 text-sm mb-2">{prompt.question}</p>
                  <p className="text-white">{prompt.answer}</p>
                  {isEditing && (
                    <div className="flex justify-end mt-3 space-x-2">
                      <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
                        <Edit3 size={16} className="text-gray-400" />
                      </button>
                      <button className="p-2 hover:bg-red-500/20 rounded-full transition-colors">
                        <X size={16} className="text-red-400" />
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'interests' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-white font-semibold">Your Interests</h3>
              <button className="bg-gradient-to-r from-[#8C1D40] to-[#FFC627] text-white px-4 py-2 rounded-full text-sm font-medium flex items-center space-x-2">
                <Plus size={16} />
                <span>Add Interest</span>
              </button>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {profileData.interests.map((interest, index) => (
                <div key={index} className="relative group">
                  <span className="bg-gradient-to-r from-[#8C1D40] to-[#FFC627] text-white px-4 py-2 rounded-full text-sm font-medium">
                    {interest}
                  </span>
                  {isEditing && (
                    <button
                      onClick={() => console.log('Remove interest:', interest)}
                      className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center transition-colors"
                    >
                      <X size={12} className="text-white" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bio Section */}
        <div className="bg-gray-800/50 rounded-2xl p-6">
          <h3 className="text-white font-semibold mb-3">About Me</h3>
          <p className="text-gray-300 leading-relaxed">
            {profileData.bio}
          </p>
          {isEditing && (
            <button className="mt-3 text-[#FFC627] text-sm font-medium hover:underline">
              Edit Bio
            </button>
          )}
        </div>

        {/* Premium Features */}
        {profileData.premium && (
          <div className="bg-gradient-to-r from-yellow-400/20 to-yellow-600/20 border border-yellow-400/30 rounded-2xl p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Crown size={20} className="text-yellow-400 fill-yellow-400" />
              <h3 className="text-white font-semibold">Premium Features</h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Zap size={16} className="text-yellow-400" />
                <span className="text-white text-sm">Boost: {profileData.boost} remaining</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star size={16} className="text-yellow-400" />
                <span className="text-white text-sm">Super Likes: {profileData.superLikes}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield size={16} className="text-yellow-400" />
                <span className="text-white text-sm">Advanced Filters</span>
              </div>
              <div className="flex items-center space-x-2">
                <Award size={16} className="text-yellow-400" />
                <span className="text-white text-sm">Priority Likes</span>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex space-x-3">
          <button className="flex-1 bg-gradient-to-r from-[#8C1D40] to-[#FFC627] text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all">
            Boost Profile
          </button>
          <button className="flex-1 bg-gray-800 text-white py-3 rounded-xl font-semibold hover:bg-gray-700 transition-colors">
            Share Profile
          </button>
        </div>
      </div>

      {/* Photo Modal */}
      {showPhotoModal && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="relative max-w-lg w-full mx-4">
            <button
              onClick={() => setShowPhotoModal(false)}
              className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/70 rounded-full transition-colors z-10"
            >
              <X size={20} className="text-white" />
            </button>
            <img
              src={profileData.photos[selectedPhotoIndex]}
              alt="Profile photo"
              className="w-full h-96 object-cover rounded-2xl"
            />
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {profileData.photos.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full ${
                    index === selectedPhotoIndex ? 'bg-white' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}