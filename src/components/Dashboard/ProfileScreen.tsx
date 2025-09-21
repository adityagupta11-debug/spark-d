import { useState } from 'react';
import { Edit2, Camera, Music, Link2, Check, X } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface MusicProfile {
  platform: 'spotify' | 'apple' | null;
  isConnected: boolean;
  username?: string;
  topArtists?: string[];
  topGenres?: string[];
  topTracks?: string[];
}

export function ProfileScreen() {
  const { user, userProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState({
    name: userProfile?.firstName || 'Your Name',
    age: userProfile?.age || 20,
    major: userProfile?.major || 'Your Major',
    year: userProfile?.year || 'Sophomore',
    bio: userProfile?.bio || 'Tell other Sun Devils about yourself! What do you love about ASU? What are you looking for?',
    interests: ['Sun Devils Sports', 'Study Groups', 'Campus Life', 'Hiking', 'Coffee']
  });

  const [musicProfile, setMusicProfile] = useState<MusicProfile>({
    platform: null,
    isConnected: false
  });

  const [showMusicConnect, setShowMusicConnect] = useState(false);

  const handleSaveProfile = () => {
    // Save profile logic here
    setIsEditing(false);
  };

  const handleConnectMusic = async (platform: 'spotify' | 'apple') => {
    // Mock music connection - in real app, this would use OAuth
    setMusicProfile({
      platform,
      isConnected: true,
      username: platform === 'spotify' ? 'sundevil_123' : 'sundevil@icloud.com',
      topArtists: ['Taylor Swift', 'The Weeknd', 'Drake'],
      topGenres: ['Pop', 'Hip Hop', 'Alternative'],
      topTracks: ['Anti-Hero', 'Blinding Lights', 'One Dance']
    });
    setShowMusicConnect(false);
  };

  const handleDisconnectMusic = () => {
    setMusicProfile({
      platform: null,
      isConnected: false
    });
  };

  return (
    <div className="px-4 py-4 pb-24">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-white text-2xl font-semibold">Your Profile</h1>
        <button
          onClick={() => isEditing ? handleSaveProfile() : setIsEditing(true)}
          className="flex items-center gap-2 px-4 py-2 bg-yellow-600 hover:bg-yellow-700 rounded-lg transition-colors"
        >
          {isEditing ? (
            <>
              <Check className="w-4 h-4 text-black" />
              <span className="text-black text-sm font-medium">Save</span>
            </>
          ) : (
            <>
              <Edit2 className="w-4 h-4 text-black" />
              <span className="text-black text-sm font-medium">Edit</span>
            </>
          )}
        </button>
      </div>

      {/* Profile Photo */}
      <div className="relative w-full h-64 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-6 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-white/30">
            <svg className="w-32 h-32" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
        {isEditing && (
          <button className="absolute bottom-4 right-4 p-3 bg-black/50 backdrop-blur rounded-full hover:bg-black/60 transition-colors">
            <Camera className="w-5 h-5 text-white" />
          </button>
        )}
      </div>

      {/* Basic Info */}
      <div className="bg-gray-900 rounded-xl p-4 mb-4 border border-gray-800">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-gray-400 text-sm">Name</label>
            {isEditing ? (
              <input
                type="text"
                value={editedProfile.name}
                onChange={(e) => setEditedProfile({...editedProfile, name: e.target.value})}
                className="w-full mt-1 px-3 py-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-yellow-500 focus:outline-none"
              />
            ) : (
              <p className="text-white mt-1">{editedProfile.name}</p>
            )}
          </div>
          <div>
            <label className="text-gray-400 text-sm">Age</label>
            {isEditing ? (
              <input
                type="number"
                value={editedProfile.age}
                onChange={(e) => setEditedProfile({...editedProfile, age: parseInt(e.target.value)})}
                className="w-full mt-1 px-3 py-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-yellow-500 focus:outline-none"
              />
            ) : (
              <p className="text-white mt-1">{editedProfile.age}</p>
            )}
          </div>
          <div>
            <label className="text-gray-400 text-sm">Major</label>
            {isEditing ? (
              <input
                type="text"
                value={editedProfile.major}
                onChange={(e) => setEditedProfile({...editedProfile, major: e.target.value})}
                className="w-full mt-1 px-3 py-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-yellow-500 focus:outline-none"
              />
            ) : (
              <p className="text-white mt-1">{editedProfile.major}</p>
            )}
          </div>
          <div>
            <label className="text-gray-400 text-sm">Year</label>
            {isEditing ? (
              <select
                value={editedProfile.year}
                onChange={(e) => setEditedProfile({...editedProfile, year: e.target.value})}
                className="w-full mt-1 px-3 py-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-yellow-500 focus:outline-none"
              >
                <option value="Freshman">Freshman</option>
                <option value="Sophomore">Sophomore</option>
                <option value="Junior">Junior</option>
                <option value="Senior">Senior</option>
                <option value="Graduate">Graduate</option>
              </select>
            ) : (
              <p className="text-white mt-1">{editedProfile.year}</p>
            )}
          </div>
        </div>
      </div>

      {/* Bio */}
      <div className="bg-gray-900 rounded-xl p-4 mb-4 border border-gray-800">
        <label className="text-gray-400 text-sm">Bio</label>
        {isEditing ? (
          <textarea
            value={editedProfile.bio}
            onChange={(e) => setEditedProfile({...editedProfile, bio: e.target.value})}
            rows={4}
            className="w-full mt-2 px-3 py-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-yellow-500 focus:outline-none resize-none"
            placeholder="Tell us about yourself..."
          />
        ) : (
          <p className="text-gray-300 mt-2">{editedProfile.bio}</p>
        )}
      </div>

      {/* Music Integration */}
      <div className="bg-gray-900 rounded-xl p-4 mb-4 border border-gray-800">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Music className="w-5 h-5 text-green-400" />
            <h3 className="text-white font-medium">Music Profile</h3>
          </div>
          {musicProfile.isConnected ? (
            <button
              onClick={handleDisconnectMusic}
              className="text-red-400 text-sm hover:text-red-300"
            >
              Disconnect
            </button>
          ) : (
            <button
              onClick={() => setShowMusicConnect(true)}
              className="flex items-center gap-1 text-green-400 text-sm hover:text-green-300"
            >
              <Link2 className="w-4 h-4" />
              Connect
            </button>
          )}
        </div>

        {musicProfile.isConnected ? (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-xs bg-green-500/20 text-green-300 px-2 py-1 rounded-full">
                {musicProfile.platform === 'spotify' ? 'Spotify' : 'Apple Music'} Connected
              </span>
              <span className="text-gray-400 text-sm">@{musicProfile.username}</span>
            </div>
            
            <div>
              <p className="text-gray-400 text-xs mb-2">Top Artists</p>
              <div className="flex flex-wrap gap-2">
                {musicProfile.topArtists?.map((artist) => (
                  <span key={artist} className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded-full">
                    {artist}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <p className="text-gray-400 text-xs mb-2">Favorite Genres</p>
              <div className="flex flex-wrap gap-2">
                {musicProfile.topGenres?.map((genre) => (
                  <span key={genre} className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded-full">
                    {genre}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <p className="text-gray-400 text-sm">
            Connect your music to find matches with similar taste! 🎵
          </p>
        )}
      </div>

      {/* Interests */}
      <div className="bg-gray-900 rounded-xl p-4 border border-gray-800">
        <h3 className="text-white font-medium mb-3">Interests</h3>
        <div className="flex flex-wrap gap-2">
          {editedProfile.interests.map((interest) => (
            <span
              key={interest}
              className="bg-[#8C2F39] text-white px-3 py-1.5 rounded-full text-sm flex items-center gap-1"
            >
              {interest}
              {isEditing && (
                <button
                  onClick={() => setEditedProfile({
                    ...editedProfile,
                    interests: editedProfile.interests.filter(i => i !== interest)
                  })}
                  className="ml-1"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </span>
          ))}
          {isEditing && (
            <button className="bg-gray-800 text-gray-400 px-3 py-1.5 rounded-full text-sm hover:bg-gray-700">
              + Add Interest
            </button>
          )}
        </div>
      </div>

      {/* Music Connection Modal */}
      {showMusicConnect && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 rounded-2xl p-6 max-w-sm w-full">
            <h3 className="text-white text-xl font-semibold mb-4">Connect Your Music</h3>
            <p className="text-gray-400 text-sm mb-6">
              Find matches based on your music taste! Connect your streaming service to discover people who vibe with your playlists.
            </p>
            
            <div className="space-y-3">
              <button
                onClick={() => handleConnectMusic('spotify')}
                className="w-full p-4 bg-green-600 hover:bg-green-700 rounded-xl transition-colors flex items-center justify-center gap-3"
              >
                <Music className="w-5 h-5 text-white" />
                <span className="text-white font-medium">Connect Spotify</span>
              </button>
              
              <button
                onClick={() => handleConnectMusic('apple')}
                className="w-full p-4 bg-gray-800 hover:bg-gray-700 rounded-xl transition-colors flex items-center justify-center gap-3"
              >
                <Music className="w-5 h-5 text-white" />
                <span className="text-white font-medium">Connect Apple Music</span>
              </button>
            </div>

            <button
              onClick={() => setShowMusicConnect(false)}
              className="w-full mt-4 p-3 text-gray-400 hover:text-white transition-colors"
            >
              Maybe Later
            </button>
          </div>
        </div>
      )}
    </div>
  );
}