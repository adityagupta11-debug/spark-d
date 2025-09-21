import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  Camera, 
  Edit3, 
  Search, 
  ChevronRight,
  LogOut,
  Shield,
  Bell,
  Heart,
  Eye,
  Globe,
  HelpCircle,
  Star,
  CreditCard,
  Zap,
  ToggleLeft,
  ToggleRight,
  Lock,
  Trash2
} from 'lucide-react';

interface SettingsPageProps {
  user: any;
  userProfile: any;
  onSignOut: () => void;
}

export default function SettingsPage({ user, userProfile, onSignOut }: SettingsPageProps) {
  const [notifications, setNotifications] = useState({
    messages: true,
    matches: true,
    likes: true,
    superLikes: true,
    reminders: false
  });

  const [privacy, setPrivacy] = useState({
    showDistance: true,
    showActiveStatus: true,
    readReceipts: true,
    showAge: true
  });

  const [discovery, setDiscovery] = useState({
    showMe: 'Everyone',
    ageRange: [18, 25],
    distance: 10,
    onlyVerified: false,
    globalMode: false
  });

  const ToggleSwitch = ({ enabled, onChange }: { enabled: boolean; onChange: () => void }) => (
    <button onClick={onChange} className="text-gray-400">
      {enabled ? <ToggleRight className="text-primary" size={24} /> : <ToggleLeft size={24} />}
    </button>
  );

  return (
    <div className="flex-1 bg-black overflow-y-auto pb-20">
      {/* Header */}
      <div className="brand-header px-4 py-4 sticky top-0 z-10">
        <div>
          <h1 className="text-white text-xl font-semibold">Settings</h1>
          <p className="text-white/80 text-sm">Manage your Spark'd experience</p>
        </div>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* Premium Section */}
        <div className="bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 rounded-2xl p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="bg-yellow-500 p-2 rounded-full">
                <Star className="text-black" size={20} />
              </div>
              <div>
                <h3 className="text-white font-medium">Spark'd Gold</h3>
                <p className="text-gray-300 text-sm">See who likes you & more!</p>
              </div>
            </div>
            <ChevronRight className="text-gray-400" size={20} />
          </div>
          <button className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-medium py-2 rounded-lg">
            Upgrade Now
          </button>
        </div>

        {/* Account Section */}
        <div className="profile-section p-1">
          <div className="p-4">
            <div className="flex items-center gap-3 mb-4">
              <User size={20} className="text-gray-400" />
              <h2 className="text-white text-lg font-semibold">Account</h2>
            </div>

            <div className="space-y-1">
              {/* Email */}
              <button className="settings-item w-full flex items-center justify-between py-3">
                <div className="flex items-center gap-3">
                  <Mail size={18} className="text-gray-400" />
                  <div className="text-left">
                    <p className="text-white font-medium">Email</p>
                    <p className="text-gray-400 text-sm">{user?.email || 'user@asu.edu'}</p>
                  </div>
                </div>
                <ChevronRight size={18} className="text-gray-400" />
              </button>

              {/* Phone */}
              <button className="settings-item w-full flex items-center justify-between py-3">
                <div className="flex items-center gap-3">
                  <Phone size={18} className="text-gray-400" />
                  <div className="text-left">
                    <p className="text-white font-medium">Phone Number</p>
                    <div className="flex items-center gap-2">
                      <p className="text-gray-400 text-sm">+1 (480) 555-0123</p>
                      <span className="bg-green-600 text-white text-xs px-2 py-0.5 rounded-full">Verified</span>
                    </div>
                  </div>
                </div>
                <ChevronRight size={18} className="text-gray-400" />
              </button>

              {/* Manage Photos */}
              <button className="settings-item w-full flex items-center justify-between py-3">
                <div className="flex items-center gap-3">
                  <Camera size={18} className="text-gray-400" />
                  <div className="text-left">
                    <p className="text-white font-medium">Manage Photos</p>
                    <p className="text-gray-400 text-sm">Add, remove, or reorder</p>
                  </div>
                </div>
                <ChevronRight size={18} className="text-gray-400" />
              </button>

              {/* Edit Profile */}
              <button className="settings-item w-full flex items-center justify-between py-3">
                <div className="flex items-center gap-3">
                  <Edit3 size={18} className="text-gray-400" />
                  <div className="text-left">
                    <p className="text-white font-medium">Edit Profile Info</p>
                    <p className="text-gray-400 text-sm">Bio, prompts, and details</p>
                  </div>
                </div>
                <ChevronRight size={18} className="text-gray-400" />
              </button>
            </div>
          </div>
        </div>

        {/* Discovery Preferences */}
        <div className="profile-section p-1">
          <div className="p-4">
            <div className="flex items-center gap-3 mb-4">
              <Search size={20} className="text-gray-400" />
              <div>
                <h2 className="text-white text-lg font-semibold">Discovery Preferences</h2>
                <p className="text-gray-400 text-sm">Control who you see and who sees you</p>
              </div>
            </div>

            <div className="space-y-1">
              {/* Show Me */}
              <div className="settings-item flex items-center justify-between py-3">
                <p className="text-white font-medium">Show Me</p>
                <div className="flex items-center gap-2">
                  <span className="text-gray-400 text-sm">{discovery.showMe}</span>
                  <ChevronRight size={18} className="text-gray-400" />
                </div>
              </div>

              {/* Age Range */}
              <div className="settings-item flex items-center justify-between py-3">
                <p className="text-white font-medium">Age Range</p>
                <div className="flex items-center gap-2">
                  <span className="text-gray-400 text-sm">{discovery.ageRange[0]} - {discovery.ageRange[1]}</span>
                  <ChevronRight size={18} className="text-gray-400" />
                </div>
              </div>

              {/* Distance */}
              <div className="settings-item flex items-center justify-between py-3">
                <p className="text-white font-medium">Maximum Distance</p>
                <div className="flex items-center gap-2">
                  <span className="text-gray-400 text-sm">{discovery.distance} miles</span>
                  <ChevronRight size={18} className="text-gray-400" />
                </div>
              </div>

              {/* Only Verified */}
              <div className="settings-item flex items-center justify-between py-3">
                <div>
                  <p className="text-white font-medium">Only Show Verified</p>
                  <p className="text-gray-400 text-xs">See only verified profiles</p>
                </div>
                <ToggleSwitch 
                  enabled={discovery.onlyVerified} 
                  onChange={() => setDiscovery({...discovery, onlyVerified: !discovery.onlyVerified})}
                />
              </div>

              {/* Global Mode */}
              <div className="settings-item flex items-center justify-between py-3">
                <div className="flex items-center gap-3">
                  <Globe size={18} className="text-gray-400" />
                  <div>
                    <p className="text-white font-medium">Global Mode</p>
                    <p className="text-gray-400 text-xs">Match with people anywhere</p>
                  </div>
                </div>
                <ToggleSwitch 
                  enabled={discovery.globalMode} 
                  onChange={() => setDiscovery({...discovery, globalMode: !discovery.globalMode})}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="profile-section p-1">
          <div className="p-4">
            <div className="flex items-center gap-3 mb-4">
              <Bell size={20} className="text-gray-400" />
              <h2 className="text-white text-lg font-semibold">Notifications</h2>
            </div>

            <div className="space-y-1">
              <div className="settings-item flex items-center justify-between py-3">
                <p className="text-white font-medium">New Messages</p>
                <ToggleSwitch 
                  enabled={notifications.messages} 
                  onChange={() => setNotifications({...notifications, messages: !notifications.messages})}
                />
              </div>
              <div className="settings-item flex items-center justify-between py-3">
                <p className="text-white font-medium">New Matches</p>
                <ToggleSwitch 
                  enabled={notifications.matches} 
                  onChange={() => setNotifications({...notifications, matches: !notifications.matches})}
                />
              </div>
              <div className="settings-item flex items-center justify-between py-3">
                <p className="text-white font-medium">Likes</p>
                <ToggleSwitch 
                  enabled={notifications.likes} 
                  onChange={() => setNotifications({...notifications, likes: !notifications.likes})}
                />
              </div>
              <div className="settings-item flex items-center justify-between py-3">
                <p className="text-white font-medium">Super Likes</p>
                <ToggleSwitch 
                  enabled={notifications.superLikes} 
                  onChange={() => setNotifications({...notifications, superLikes: !notifications.superLikes})}
                />
              </div>
              <div className="settings-item flex items-center justify-between py-3">
                <p className="text-white font-medium">Reminders</p>
                <ToggleSwitch 
                  enabled={notifications.reminders} 
                  onChange={() => setNotifications({...notifications, reminders: !notifications.reminders})}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Privacy & Safety */}
        <div className="profile-section p-1">
          <div className="p-4">
            <div className="flex items-center gap-3 mb-4">
              <Shield size={20} className="text-gray-400" />
              <h2 className="text-white text-lg font-semibold">Privacy & Safety</h2>
            </div>

            <div className="space-y-1">
              {/* Show Distance */}
              <div className="settings-item flex items-center justify-between py-3">
                <div>
                  <p className="text-white font-medium">Show My Distance</p>
                  <p className="text-gray-400 text-xs">Display distance on profile</p>
                </div>
                <ToggleSwitch 
                  enabled={privacy.showDistance} 
                  onChange={() => setPrivacy({...privacy, showDistance: !privacy.showDistance})}
                />
              </div>

              {/* Active Status */}
              <div className="settings-item flex items-center justify-between py-3">
                <div>
                  <p className="text-white font-medium">Show Active Status</p>
                  <p className="text-gray-400 text-xs">Let matches see when you're active</p>
                </div>
                <ToggleSwitch 
                  enabled={privacy.showActiveStatus} 
                  onChange={() => setPrivacy({...privacy, showActiveStatus: !privacy.showActiveStatus})}
                />
              </div>

              {/* Read Receipts */}
              <div className="settings-item flex items-center justify-between py-3">
                <div>
                  <p className="text-white font-medium">Read Receipts</p>
                  <p className="text-gray-400 text-xs">Show when you've read messages</p>
                </div>
                <ToggleSwitch 
                  enabled={privacy.readReceipts} 
                  onChange={() => setPrivacy({...privacy, readReceipts: !privacy.readReceipts})}
                />
              </div>

              {/* Block Contacts */}
              <button className="settings-item w-full flex items-center justify-between py-3">
                <div className="flex items-center gap-3">
                  <Lock size={18} className="text-gray-400" />
                  <p className="text-white font-medium">Block Contacts</p>
                </div>
                <ChevronRight size={18} className="text-gray-400" />
              </button>

              {/* Safety Center */}
              <button className="settings-item w-full flex items-center justify-between py-3">
                <div className="flex items-center gap-3">
                  <Shield size={18} className="text-gray-400" />
                  <p className="text-white font-medium">Safety Center</p>
                </div>
                <ChevronRight size={18} className="text-gray-400" />
              </button>
            </div>
          </div>
        </div>

        {/* Payment & Subscription */}
        <div className="profile-section p-1">
          <div className="p-4">
            <div className="flex items-center gap-3 mb-4">
              <CreditCard size={20} className="text-gray-400" />
              <h2 className="text-white text-lg font-semibold">Payment & Subscription</h2>
            </div>

            <div className="space-y-1">
              <button className="settings-item w-full flex items-center justify-between py-3">
                <div className="flex items-center gap-3">
                  <Star size={18} className="text-yellow-500" />
                  <div className="text-left">
                    <p className="text-white font-medium">Manage Subscription</p>
                    <p className="text-gray-400 text-sm">Free Plan</p>
                  </div>
                </div>
                <ChevronRight size={18} className="text-gray-400" />
              </button>

              <button className="settings-item w-full flex items-center justify-between py-3">
                <div className="flex items-center gap-3">
                  <Zap size={18} className="text-purple-500" />
                  <p className="text-white font-medium">Get Boosts</p>
                </div>
                <ChevronRight size={18} className="text-gray-400" />
              </button>

              <button className="settings-item w-full flex items-center justify-between py-3">
                <div className="flex items-center gap-3">
                  <Heart size={18} className="text-blue-500" />
                  <p className="text-white font-medium">Get Super Likes</p>
                </div>
                <ChevronRight size={18} className="text-gray-400" />
              </button>
            </div>
          </div>
        </div>

        {/* Support */}
        <div className="profile-section p-1">
          <div className="p-4">
            <div className="flex items-center gap-3 mb-4">
              <HelpCircle size={20} className="text-gray-400" />
              <h2 className="text-white text-lg font-semibold">Support</h2>
            </div>

            <div className="space-y-1">
              <button className="settings-item w-full flex items-center justify-between py-3">
                <p className="text-white font-medium">Help Center</p>
                <ChevronRight size={18} className="text-gray-400" />
              </button>
              <button className="settings-item w-full flex items-center justify-between py-3">
                <p className="text-white font-medium">Contact Us</p>
                <ChevronRight size={18} className="text-gray-400" />
              </button>
              <button className="settings-item w-full flex items-center justify-between py-3">
                <p className="text-white font-medium">Terms of Service</p>
                <ChevronRight size={18} className="text-gray-400" />
              </button>
              <button className="settings-item w-full flex items-center justify-between py-3">
                <p className="text-white font-medium">Privacy Policy</p>
                <ChevronRight size={18} className="text-gray-400" />
              </button>
            </div>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="space-y-3">
          {/* Pause Account */}
          <button className="w-full bg-gray-900 hover:bg-gray-800 text-white py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-colors">
            <Eye size={20} />
            <span className="font-medium">Pause My Account</span>
          </button>

          {/* Delete Account */}
          <button className="w-full bg-red-600/20 hover:bg-red-600/30 text-red-500 py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-colors">
            <Trash2 size={20} />
            <span className="font-medium">Delete Account</span>
          </button>

          {/* Sign Out */}
          <button
            onClick={onSignOut}
            className="w-full bg-gray-900 hover:bg-gray-800 text-white py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-colors"
          >
            <LogOut size={20} />
            <span className="font-medium">Sign Out</span>
          </button>
        </div>

        {/* App Version */}
        <div className="text-center py-4">
          <p className="text-gray-500 text-sm">Spark'd v1.0.0</p>
          <p className="text-gray-600 text-xs mt-1">Made with ❤️ at ASU</p>
        </div>
      </div>
    </div>
  );
}