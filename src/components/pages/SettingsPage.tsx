import React from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  Camera, 
  Edit3, 
  Search, 
  ChevronRight,
  LogOut,
  Shield
} from 'lucide-react';

interface SettingsPageProps {
  user: any;
  userProfile: any;
  onSignOut: () => void;
}

export default function SettingsPage({ user, userProfile, onSignOut }: SettingsPageProps) {
  return (
    <div className="flex-1 bg-black overflow-y-auto">
      {/* Header */}
      <div className="bg-[#8B4B6B] px-4 py-4">
        <div>
          <h1 className="text-white text-xl font-semibold">Settings</h1>
          <p className="text-white/80 text-sm">Manage your Spark’d experience</p>
        </div>
      </div>

      <div className="px-4 py-6">
        {/* Account Section */}
        <div className="bg-gray-900 rounded-2xl p-1 mb-6">
          <div className="p-5">
            <div className="flex items-center space-x-3 mb-6">
              <User size={20} className="text-gray-400" />
              <h2 className="text-white text-lg font-semibold">Account</h2>
            </div>

            {/* Email */}
            <div className="flex items-center justify-between py-4 border-b border-gray-800">
              <div className="flex items-center space-x-3">
                <Mail size={18} className="text-gray-400" />
                <div>
                  <p className="text-white font-medium">Email</p>
                  <p className="text-gray-400 text-sm">{user?.email || 'user@asu.edu'}</p>
                </div>
              </div>
              <ChevronRight size={18} className="text-gray-400" />
            </div>

            {/* Phone Number */}
            <div className="flex items-center justify-between py-4 border-b border-gray-800">
              <div className="flex items-center space-x-3">
                <Phone size={18} className="text-gray-400" />
                <div>
                  <p className="text-white font-medium">Phone Number</p>
                  <div className="flex items-center space-x-2">
                    <p className="text-gray-400 text-sm">+1 (480) 555-0123</p>
                    <span className="bg-green-600 text-white text-xs px-2 py-1 rounded-full">Verified</span>
                  </div>
                </div>
              </div>
              <ChevronRight size={18} className="text-gray-400" />
            </div>

            {/* Manage Photos */}
            <div className="flex items-center justify-between py-4 border-b border-gray-800">
              <div className="flex items-center space-x-3">
                <Camera size={18} className="text-gray-400" />
                <div>
                  <p className="text-white font-medium">Manage Photos</p>
                  <p className="text-gray-400 text-sm">Add, remove, or reorder your photos</p>
                </div>
              </div>
              <ChevronRight size={18} className="text-gray-400" />
            </div>

            {/* Edit Profile Info */}
            <div className="flex items-center justify-between py-4">
              <div className="flex items-center space-x-3">
                <Edit3 size={18} className="text-gray-400" />
                <div>
                  <p className="text-white font-medium">Edit Profile Info</p>
                  <p className="text-gray-400 text-sm">Update your bio, prompts, and details</p>
                </div>
              </div>
              <ChevronRight size={18} className="text-gray-400" />
            </div>
          </div>
        </div>

        {/* Discovery Preferences Section */}
        <div className="bg-gray-900 rounded-2xl p-1 mb-6">
          <div className="p-5">
            <div className="flex items-center space-x-3 mb-6">
              <Search size={20} className="text-gray-400" />
              <div>
                <h2 className="text-white text-lg font-semibold">Discovery Preferences</h2>
                <p className="text-gray-400 text-sm">Control who you see and who sees you</p>
              </div>
            </div>

            {/* Age Range */}
            <div className="flex items-center justify-between py-4 border-b border-gray-800">
              <div>
                <p className="text-white font-medium">Age Range</p>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-gray-400 text-sm">18 - 25</span>
                <ChevronRight size={18} className="text-gray-400" />
              </div>
            </div>

            {/* Distance */}
            <div className="flex items-center justify-between py-4 border-b border-gray-800">
              <div>
                <p className="text-white font-medium">Maximum Distance</p>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-gray-400 text-sm">5 miles</span>
                <ChevronRight size={18} className="text-gray-400" />
              </div>
            </div>

            {/* Show Me */}
            <div className="flex items-center justify-between py-4">
              <div>
                <p className="text-white font-medium">Show Me</p>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-gray-400 text-sm">Everyone</span>
                <ChevronRight size={18} className="text-gray-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Privacy & Safety */}
        <div className="bg-gray-900 rounded-2xl p-1 mb-6">
          <div className="p-5">
            <div className="flex items-center space-x-3 mb-4">
              <Shield size={20} className="text-gray-400" />
              <h2 className="text-white text-lg font-semibold">Privacy & Safety</h2>
            </div>

            <div className="flex items-center justify-between py-4 border-b border-gray-800">
              <p className="text-white font-medium">Block Contacts</p>
              <ChevronRight size={18} className="text-gray-400" />
            </div>

            <div className="flex items-center justify-between py-4">
              <p className="text-white font-medium">Safety Center</p>
              <ChevronRight size={18} className="text-gray-400" />
            </div>
          </div>
        </div>

        {/* Sign Out Button */}
        <button
          onClick={onSignOut}
          className="w-full bg-red-600 hover:bg-red-700 text-white py-4 px-6 rounded-2xl flex items-center justify-center space-x-2 transition-colors"
        >
          <LogOut size={20} />
          <span className="font-medium">Sign Out</span>
        </button>

        {/* App Version */}
        <div className="text-center mt-6">
          <p className="text-gray-500 text-sm">Spark’d v1.0.0</p>
        </div>
      </div>
    </div>
  );
}