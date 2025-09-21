import { Mail, Phone, Camera, FileText, Search, ChevronRight } from 'lucide-react';

interface SettingsPageProps {
  onSignOut: () => void;
}

export function SettingsPage({ onSignOut }: SettingsPageProps) {
  return (
    <div className="flex-1 bg-black p-2 sm:p-4 overflow-y-auto">
      <h1 className="text-white text-2xl font-bold mb-2">Settings</h1>
      <p className="text-gray-400 text-sm mb-6">Manage your Sun Devil Match experience</p>

      {/* Account Section */}
      <div className="bg-gray-800 rounded-xl p-4 mb-4">
        <div className="flex items-center mb-4">
          <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center mr-3">
            <div className="w-4 h-4 bg-white rounded-full"></div>
          </div>
          <h2 className="text-white text-lg font-medium">Account</h2>
        </div>

        <div className="space-y-4">
          {/* Email */}
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center">
              <Mail className="w-5 h-5 text-white mr-3" />
              <div>
                <p className="text-white text-sm">Email</p>
                <p className="text-gray-400 text-xs">user@asu.edu</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </div>

          {/* Phone Number */}
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center">
              <Phone className="w-5 h-5 text-white mr-3" />
              <div>
                <p className="text-white text-sm">Phone Number</p>
                <p className="text-gray-400 text-xs">+1 (480) 555-0123</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">Verified</span>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </div>
          </div>

          {/* Manage Photos */}
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center">
              <Camera className="w-5 h-5 text-white mr-3" />
              <div>
                <p className="text-white text-sm">Manage Photos</p>
                <p className="text-gray-400 text-xs">Add, remove, or reorder your photos</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </div>

          {/* Edit Profile Info */}
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center">
              <FileText className="w-5 h-5 text-white mr-3" />
              <div>
                <p className="text-white text-sm">Edit Profile Info</p>
                <p className="text-gray-400 text-xs">Update your bio, prompts, and details</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Discovery Preferences Section */}
      <div className="bg-gray-800 rounded-xl p-4 mb-4">
        <div className="flex items-center mb-4">
          <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center mr-3">
            <Search className="w-4 h-4 text-white" />
          </div>
          <div>
            <h2 className="text-white text-lg font-medium">Discovery Preferences</h2>
            <p className="text-gray-400 text-xs">Control who you see and who sees you</p>
          </div>
        </div>

        <div className="space-y-4">
          {/* Age Range */}
          <div className="flex items-center justify-between py-2">
            <p className="text-white text-sm">Age Range</p>
            <div className="flex items-center">
              <span className="text-gray-400 text-sm mr-2">18 - 25</span>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Sign Out Button */}
      <button
        onClick={onSignOut}
        className="w-full bg-red-600 hover:bg-red-700 text-white py-3 px-4 rounded-xl transition-colors"
      >
        Sign Out
      </button>
    </div>
  );
}