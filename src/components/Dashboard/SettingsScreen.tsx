import { useState } from 'react';
import { ChevronRight, Mail, Phone, Camera, User, Search, Bell, Shield, LogOut, Music, MapPin } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { signOutUser } from '../../lib/auth';

interface DiscoveryPreferences {
  ageRange: { min: number; max: number };
  maxDistance: number;
  showMe: 'everyone' | 'men' | 'women';
  musicMatchImportance: 'low' | 'medium' | 'high';
  campusPreference: 'tempe' | 'downtown' | 'west' | 'polytechnic' | 'all';
}

export function SettingsScreen() {
  const { user, userProfile } = useAuth();
  const [preferences, setPreferences] = useState<DiscoveryPreferences>({
    ageRange: { min: 18, max: 25 },
    maxDistance: 10,
    showMe: 'everyone',
    musicMatchImportance: 'medium',
    campusPreference: 'tempe'
  });

  const [notifications, setNotifications] = useState({
    newMatches: true,
    messages: true,
    dateReminders: true,
    campusEvents: false
  });

  const handleSignOut = async () => {
    try {
      await signOutUser();
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  const campusOptions = [
    { value: 'tempe', label: 'Tempe' },
    { value: 'downtown', label: 'Downtown Phoenix' },
    { value: 'west', label: 'West' },
    { value: 'polytechnic', label: 'Polytechnic' },
    { value: 'all', label: 'All Campuses' }
  ];

  return (
    <div className="px-4 py-4 pb-24">
      <h1 className="text-white text-2xl font-semibold mb-2">Settings</h1>
      <p className="text-gray-400 text-sm mb-6">Manage your Sun Devil Match experience</p>

      {/* Account Section */}
      <div className="bg-gray-900 rounded-xl p-4 mb-4 border border-gray-800">
        <h2 className="text-white font-medium mb-4 flex items-center gap-2">
          <User className="w-5 h-5" />
          Account
        </h2>
        
        <div className="space-y-3">
          <button className="w-full flex items-center justify-between p-3 hover:bg-gray-800 rounded-lg transition-colors">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-gray-400" />
              <div className="text-left">
                <p className="text-white text-sm">Email</p>
                <p className="text-gray-400 text-xs">{user?.email || 'user@asu.edu'}</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>

          <button className="w-full flex items-center justify-between p-3 hover:bg-gray-800 rounded-lg transition-colors">
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-gray-400" />
              <div className="text-left">
                <p className="text-white text-sm">Phone Number</p>
                <p className="text-gray-400 text-xs">+1 (480) 555-0123</p>
              </div>
            </div>
            <span className="bg-green-500/20 text-green-400 text-xs px-2 py-1 rounded-full">Verified</span>
          </button>

          <button className="w-full flex items-center justify-between p-3 hover:bg-gray-800 rounded-lg transition-colors">
            <div className="flex items-center gap-3">
              <Camera className="w-5 h-5 text-gray-400" />
              <div className="text-left">
                <p className="text-white text-sm">Manage Photos</p>
                <p className="text-gray-400 text-xs">Add, remove, or reorder your photos</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>

          <button className="w-full flex items-center justify-between p-3 hover:bg-gray-800 rounded-lg transition-colors">
            <div className="flex items-center gap-3">
              <User className="w-5 h-5 text-gray-400" />
              <div className="text-left">
                <p className="text-white text-sm">Edit Profile Info</p>
                <p className="text-gray-400 text-xs">Update your bio, prompts, and details</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>
        </div>
      </div>

      {/* Discovery Preferences */}
      <div className="bg-gray-900 rounded-xl p-4 mb-4 border border-gray-800">
        <h2 className="text-white font-medium mb-4 flex items-center gap-2">
          <Search className="w-5 h-5" />
          Discovery Preferences
        </h2>
        <p className="text-gray-400 text-sm mb-4">Control who you see and who sees you</p>
        
        <div className="space-y-4">
          <div>
            <label className="text-gray-300 text-sm mb-2 block">Age Range</label>
            <div className="flex items-center gap-3">
              <input
                type="range"
                min="18"
                max="30"
                value={preferences.ageRange.min}
                onChange={(e) => setPreferences({
                  ...preferences,
                  ageRange: { ...preferences.ageRange, min: parseInt(e.target.value) }
                })}
                className="flex-1"
              />
              <span className="text-white text-sm w-20 text-right">
                {preferences.ageRange.min} - {preferences.ageRange.max}
              </span>
            </div>
          </div>

          <div>
            <label className="text-gray-300 text-sm mb-2 block">Maximum Distance</label>
            <div className="flex items-center gap-3">
              <input
                type="range"
                min="1"
                max="50"
                value={preferences.maxDistance}
                onChange={(e) => setPreferences({
                  ...preferences,
                  maxDistance: parseInt(e.target.value)
                })}
                className="flex-1"
              />
              <span className="text-white text-sm w-20 text-right">{preferences.maxDistance} mi</span>
            </div>
          </div>

          <div>
            <label className="text-gray-300 text-sm mb-2 block flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Campus Preference
            </label>
            <select
              value={preferences.campusPreference}
              onChange={(e) => setPreferences({
                ...preferences,
                campusPreference: e.target.value as any
              })}
              className="w-full px-3 py-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-yellow-500 focus:outline-none"
            >
              {campusOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-gray-300 text-sm mb-2 block flex items-center gap-2">
              <Music className="w-4 h-4" />
              Music Match Importance
            </label>
            <div className="flex gap-2">
              {['low', 'medium', 'high'].map((level) => (
                <button
                  key={level}
                  onClick={() => setPreferences({
                    ...preferences,
                    musicMatchImportance: level as any
                  })}
                  className={`flex-1 py-2 px-3 rounded-lg capitalize transition-colors ${
                    preferences.musicMatchImportance === level
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-gray-300 text-sm mb-2 block">Show Me</label>
            <div className="flex gap-2">
              {['everyone', 'men', 'women'].map((option) => (
                <button
                  key={option}
                  onClick={() => setPreferences({
                    ...preferences,
                    showMe: option as any
                  })}
                  className={`flex-1 py-2 px-3 rounded-lg capitalize transition-colors ${
                    preferences.showMe === option
                      ? 'bg-yellow-600 text-black'
                      : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-gray-900 rounded-xl p-4 mb-4 border border-gray-800">
        <h2 className="text-white font-medium mb-4 flex items-center gap-2">
          <Bell className="w-5 h-5" />
          Notifications
        </h2>
        
        <div className="space-y-3">
          {Object.entries(notifications).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between">
              <span className="text-gray-300 text-sm capitalize">
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </span>
              <button
                onClick={() => setNotifications({ ...notifications, [key]: !value })}
                className={`w-12 h-6 rounded-full transition-colors ${
                  value ? 'bg-yellow-600' : 'bg-gray-700'
                }`}
              >
                <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                  value ? 'translate-x-6' : 'translate-x-0.5'
                }`} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Privacy & Safety */}
      <div className="bg-gray-900 rounded-xl p-4 mb-4 border border-gray-800">
        <h2 className="text-white font-medium mb-4 flex items-center gap-2">
          <Shield className="w-5 h-5" />
          Privacy & Safety
        </h2>
        
        <div className="space-y-3">
          <button className="w-full flex items-center justify-between p-3 hover:bg-gray-800 rounded-lg transition-colors">
            <span className="text-gray-300 text-sm">Block List</span>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>
          <button className="w-full flex items-center justify-between p-3 hover:bg-gray-800 rounded-lg transition-colors">
            <span className="text-gray-300 text-sm">Safety Center</span>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>
          <button className="w-full flex items-center justify-between p-3 hover:bg-gray-800 rounded-lg transition-colors">
            <span className="text-gray-300 text-sm">Community Guidelines</span>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>
        </div>
      </div>

      {/* Sign Out */}
      <button
        onClick={handleSignOut}
        className="w-full bg-red-600/20 hover:bg-red-600/30 text-red-400 py-3 rounded-xl transition-colors flex items-center justify-center gap-2 border border-red-600/30"
      >
        <LogOut className="w-5 h-5" />
        <span className="font-medium">Sign Out</span>
      </button>

      {/* App Version */}
      <p className="text-center text-gray-500 text-xs mt-6">
        Sun Devil Match v1.0.0
      </p>
    </div>
  );
}