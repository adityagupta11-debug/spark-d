import { useState } from 'react';
import { UserProfile } from '../../contexts/AuthContext';
import { Button } from '../ui/button';

interface ProfileScreenProps {
  userProfile: UserProfile | null;
}

export function ProfileScreen({ userProfile }: ProfileScreenProps) {
  const [isEditing, setIsEditing] = useState(false);

  // Default profile data if userProfile is null
  const defaultProfile = {
    firstName: 'Your',
    lastName: 'Name',
    age: 20,
    major: 'Your Major',
    year: 'Sophomore',
    bio: 'Tell other Sun Devils about yourself! What do you love about ASU? What are you looking for?',
    interests: ['Sun Devils Sports', 'Study Groups', 'Campus Life']
  };

  const profile = userProfile || defaultProfile;

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically save to Firebase
  };

  return (
    <div className="flex-1 bg-black p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-white text-2xl font-bold">Your Profile</h1>
        <Button
          onClick={isEditing ? handleSave : handleEdit}
          variant="outline"
          className="bg-gray-800 border-gray-600 text-white hover:bg-gray-700"
        >
          <span className="mr-2">✏️</span>
          {isEditing ? 'Save' : 'Edit'}
        </Button>
      </div>

      {/* Profile Card */}
      <div className="bg-gray-900 rounded-3xl overflow-hidden border border-gray-800">
        {/* Profile Image */}
        <div className="relative h-64 bg-gradient-to-br from-blue-400 to-blue-600">
          <img
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop&crop=face"
            alt="Profile"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/20"></div>
        </div>

        {/* Profile Info */}
        <div className="p-6">
          {/* Basic Info */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label className="text-gray-400 text-sm">Name</label>
              {isEditing ? (
                <input
                  type="text"
                  defaultValue={`${profile.firstName} ${profile.lastName}`}
                  className="w-full mt-1 p-2 bg-gray-800 border border-gray-600 rounded text-white"
                />
              ) : (
                <p className="text-white font-medium">{profile.firstName} {profile.lastName}</p>
              )}
            </div>

            <div>
              <label className="text-gray-400 text-sm">Age</label>
              {isEditing ? (
                <input
                  type="number"
                  defaultValue={profile.age}
                  className="w-full mt-1 p-2 bg-gray-800 border border-gray-600 rounded text-white"
                />
              ) : (
                <p className="text-white font-medium">{profile.age}</p>
              )}
            </div>

            <div>
              <label className="text-gray-400 text-sm">Major</label>
              {isEditing ? (
                <input
                  type="text"
                  defaultValue={profile.major}
                  className="w-full mt-1 p-2 bg-gray-800 border border-gray-600 rounded text-white"
                />
              ) : (
                <p className="text-white font-medium">{profile.major}</p>
              )}
            </div>

            <div>
              <label className="text-gray-400 text-sm">Year</label>
              {isEditing ? (
                <select
                  defaultValue={profile.year}
                  className="w-full mt-1 p-2 bg-gray-800 border border-gray-600 rounded text-white"
                >
                  <option value="Freshman">Freshman</option>
                  <option value="Sophomore">Sophomore</option>
                  <option value="Junior">Junior</option>
                  <option value="Senior">Senior</option>
                  <option value="Graduate">Graduate</option>
                </select>
              ) : (
                <p className="text-white font-medium capitalize">{profile.year}</p>
              )}
            </div>
          </div>

          {/* Bio */}
          <div className="mb-6">
            <label className="text-gray-400 text-sm">Bio</label>
            {isEditing ? (
              <textarea
                defaultValue={profile.bio}
                rows={4}
                className="w-full mt-1 p-3 bg-gray-800 border border-gray-600 rounded text-white resize-none"
                placeholder="Tell other Sun Devils about yourself! What do you love about ASU? What are you looking for?"
              />
            ) : (
              <p className="text-gray-300 mt-1 leading-relaxed">{profile.bio}</p>
            )}
          </div>

          {/* Interests */}
          <div>
            <label className="text-gray-400 text-sm">Interests</label>
            {isEditing ? (
              <div className="mt-2 space-y-2">
                <input
                  type="text"
                  placeholder="Add interests..."
                  className="w-full p-2 bg-gray-800 border border-gray-600 rounded text-white"
                />
                <div className="flex flex-wrap gap-2">
                  {profile.interests.map((interest, index) => (
                    <span
                      key={index}
                      className="bg-[#8B1538] text-white px-3 py-1 rounded-full text-sm"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex flex-wrap gap-2 mt-2">
                {profile.interests.map((interest, index) => (
                  <span
                    key={index}
                    className="bg-[#8B1538] text-white px-3 py-1 rounded-full text-sm"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}