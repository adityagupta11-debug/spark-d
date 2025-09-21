import { useState } from 'react';
import { UserProfile } from '../../contexts/AuthContext';
import { Button } from '../ui/button';

interface SettingsScreenProps {
  userProfile: UserProfile | null;
}

export function SettingsScreen({ userProfile }: SettingsScreenProps) {
  const [ageRange, setAgeRange] = useState([18, 25]);
  const [showMe, setShowMe] = useState('everyone');

  return (
    <div className="flex-1 bg-black p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-white text-2xl font-bold mb-2">Settings</h1>
        <p className="text-gray-400">Manage your Sun Devil Match experience</p>
      </div>

      {/* Account Section */}
      <div className="bg-gray-900 rounded-2xl p-6 mb-6 border border-gray-800">
        <div className="flex items-center mb-6">
          <span className="text-2xl mr-3">👤</span>
          <h2 className="text-white text-xl font-semibold">Account</h2>
        </div>

        <div className="space-y-4">
          {/* Email */}
          <div className="flex items-center justify-between py-3 border-b border-gray-800">
            <div className="flex items-center">
              <span className="text-gray-400 mr-3">✉️</span>
              <div>
                <p className="text-white font-medium">Email</p>
                <p className="text-gray-500 text-sm">user@asu.edu</p>
              </div>
            </div>
            <span className="text-gray-500">›</span>
          </div>

          {/* Phone Number */}
          <div className="flex items-center justify-between py-3 border-b border-gray-800">
            <div className="flex items-center">
              <span className="text-gray-400 mr-3">📱</span>
              <div>
                <p className="text-white font-medium">Phone Number</p>
                <p className="text-gray-500 text-sm">+1 (480) 555-0123</p>
              </div>
            </div>
            <div className="flex items-center">
              <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs mr-2">Verified</span>
              <span className="text-gray-500">›</span>
            </div>
          </div>

          {/* Manage Photos */}
          <div className="flex items-center justify-between py-3 border-b border-gray-800">
            <div className="flex items-center">
              <span className="text-gray-400 mr-3">📷</span>
              <div>
                <p className="text-white font-medium">Manage Photos</p>
                <p className="text-gray-500 text-sm">Add, remove, or reorder your photos</p>
              </div>
            </div>
            <span className="text-gray-500">›</span>
          </div>

          {/* Edit Profile Info */}
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center">
              <span className="text-gray-400 mr-3">✏️</span>
              <div>
                <p className="text-white font-medium">Edit Profile Info</p>
                <p className="text-gray-500 text-sm">Update your bio, prompts, and details</p>
              </div>
            </div>
            <span className="text-gray-500">›</span>
          </div>
        </div>
      </div>

      {/* Discovery Preferences */}
      <div className="bg-gray-900 rounded-2xl p-6 mb-6 border border-gray-800">
        <div className="flex items-center mb-6">
          <span className="text-2xl mr-3">🔍</span>
          <h2 className="text-white text-xl font-semibold">Discovery Preferences</h2>
        </div>
        <p className="text-gray-400 mb-6">Control who you see and who sees you</p>

        <div className="space-y-6">
          {/* Age Range */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-white font-medium">Age Range</label>
              <span className="text-gray-300">{ageRange[0]} - {ageRange[1]}</span>
            </div>
            <div className="flex items-center space-x-4">
              <input
                type="range"
                min="18"
                max="35"
                value={ageRange[0]}
                onChange={(e) => setAgeRange([parseInt(e.target.value), ageRange[1]])}
                className="flex-1"
              />
              <input
                type="range"
                min="18"
                max="35"
                value={ageRange[1]}
                onChange={(e) => setAgeRange([ageRange[0], parseInt(e.target.value)])}
                className="flex-1"
              />
            </div>
          </div>

          {/* Show Me */}
          <div>
            <label className="text-white font-medium mb-3 block">Show Me</label>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  value="everyone"
                  checked={showMe === 'everyone'}
                  onChange={(e) => setShowMe(e.target.value)}
                  className="mr-3"
                />
                <span className="text-gray-300">Everyone</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="women"
                  checked={showMe === 'women'}
                  onChange={(e) => setShowMe(e.target.value)}
                  className="mr-3"
                />
                <span className="text-gray-300">Women</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="men"
                  checked={showMe === 'men'}
                  onChange={(e) => setShowMe(e.target.value)}
                  className="mr-3"
                />
                <span className="text-gray-300">Men</span>
              </label>
            </div>
          </div>

          {/* Distance Preference */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-white font-medium">Maximum Distance</label>
              <span className="text-gray-300">50 miles</span>
            </div>
            <input
              type="range"
              min="1"
              max="100"
              defaultValue="50"
              className="w-full"
            />
          </div>
        </div>
      </div>

      {/* Additional Options */}
      <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
        <div className="space-y-4">
          <button className="w-full flex items-center justify-between py-3 text-left">
            <div className="flex items-center">
              <span className="text-gray-400 mr-3">🔔</span>
              <div>
                <p className="text-white font-medium">Notifications</p>
                <p className="text-gray-500 text-sm">Manage your notification preferences</p>
              </div>
            </div>
            <span className="text-gray-500">›</span>
          </button>

          <button className="w-full flex items-center justify-between py-3 text-left">
            <div className="flex items-center">
              <span className="text-gray-400 mr-3">🔒</span>
              <div>
                <p className="text-white font-medium">Privacy & Safety</p>
                <p className="text-gray-500 text-sm">Control your privacy settings</p>
              </div>
            </div>
            <span className="text-gray-500">›</span>
          </button>

          <button className="w-full flex items-center justify-between py-3 text-left">
            <div className="flex items-center">
              <span className="text-gray-400 mr-3">💬</span>
              <div>
                <p className="text-white font-medium">Help & Support</p>
                <p className="text-gray-500 text-sm">Get help or contact support</p>
              </div>
            </div>
            <span className="text-gray-500">›</span>
          </button>
        </div>
      </div>
    </div>
  );
}