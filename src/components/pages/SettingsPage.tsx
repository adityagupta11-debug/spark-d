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
  Eye,
  Heart,
  Star,
  Crown,
  Zap,
  Settings,
  HelpCircle,
  Info,
  Moon,
  Sun,
  Volume2,
  VolumeX,
  MapPin,
  Calendar,
  Lock,
  Key,
  Trash2,
  Download,
  Upload,
  Share2,
  Copy,
  ExternalLink,
  Check,
  X,
  Plus,
  Minus,
  Sliders,
  Filter,
  Globe,
  Wifi,
  WifiOff,
  Battery,
  BatteryLow,
  Signal,
  SignalZero
} from 'lucide-react';

interface SettingsPageProps {
  user: any;
  userProfile: any;
  onSignOut: () => void;
}

export default function SettingsPage({ user, userProfile, onSignOut }: SettingsPageProps) {
  const [activeSection, setActiveSection] = useState<'account' | 'discovery' | 'privacy' | 'notifications' | 'premium' | 'about'>('account');
  const [notifications, setNotifications] = useState({
    newMatches: true,
    messages: true,
    likes: true,
    superLikes: true,
    marketing: false,
    push: true,
    email: true,
    sms: false
  });
  const [discoverySettings, setDiscoverySettings] = useState({
    ageMin: 18,
    ageMax: 25,
    maxDistance: 5,
    showMe: 'everyone',
    showAge: true,
    showDistance: true
  });
  const [privacySettings, setPrivacySettings] = useState({
    showOnlineStatus: true,
    showLastSeen: true,
    showReadReceipts: true,
    allowScreenshots: false,
    dataUsage: 'standard'
  });

  const handleNotificationToggle = (key: string) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleDiscoveryChange = (key: string, value: any) => {
    setDiscoverySettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handlePrivacyChange = (key: string, value: any) => {
    setPrivacySettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const sections = [
    { key: 'account', label: 'Account', icon: User },
    { key: 'discovery', label: 'Discovery', icon: Search },
    { key: 'privacy', label: 'Privacy', icon: Shield },
    { key: 'notifications', label: 'Notifications', icon: Bell },
    { key: 'premium', label: 'Premium', icon: Crown },
    { key: 'about', label: 'About', icon: Info }
  ];

  const renderAccountSection = () => (
    <div className="space-y-6">
      {/* Profile Overview */}
      <div className="bg-gray-800/50 rounded-2xl p-6">
        <div className="flex items-center space-x-4 mb-4">
          <img
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
            alt="Profile"
            className="w-16 h-16 rounded-full object-cover"
          />
          <div>
            <h3 className="text-white font-semibold text-lg">Alex Johnson</h3>
            <p className="text-gray-400 text-sm">Verified Student</p>
            <div className="flex items-center space-x-2 mt-1">
              <Star size={14} className="text-blue-400 fill-blue-400" />
              <span className="text-blue-400 text-xs">Verified</span>
            </div>
          </div>
        </div>
        <button className="w-full bg-gradient-to-r from-[#8C1D40] to-[#FFC627] text-white py-2 rounded-xl font-medium">
          Edit Profile
        </button>
      </div>

      {/* Account Settings */}
      <div className="bg-gray-800/50 rounded-2xl p-1">
        <div className="p-5">
          <h3 className="text-white font-semibold mb-4">Account Information</h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-gray-700">
              <div className="flex items-center space-x-3">
                <Mail size={18} className="text-gray-400" />
                <div>
                  <p className="text-white font-medium">Email</p>
                  <p className="text-gray-400 text-sm">{user?.email || 'alex.johnson@asu.edu'}</p>
                </div>
              </div>
              <ChevronRight size={18} className="text-gray-400" />
            </div>

            <div className="flex items-center justify-between py-3 border-b border-gray-700">
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

            <div className="flex items-center justify-between py-3 border-b border-gray-700">
              <div className="flex items-center space-x-3">
                <Lock size={18} className="text-gray-400" />
                <div>
                  <p className="text-white font-medium">Password</p>
                  <p className="text-gray-400 text-sm">Last changed 3 months ago</p>
                </div>
              </div>
              <ChevronRight size={18} className="text-gray-400" />
            </div>

            <div className="flex items-center justify-between py-3">
              <div className="flex items-center space-x-3">
                <Trash2 size={18} className="text-red-400" />
                <div>
                  <p className="text-red-400 font-medium">Delete Account</p>
                  <p className="text-gray-400 text-sm">Permanently delete your account</p>
                </div>
              </div>
              <ChevronRight size={18} className="text-gray-400" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderDiscoverySection = () => (
    <div className="space-y-6">
      <div className="bg-gray-800/50 rounded-2xl p-6">
        <h3 className="text-white font-semibold mb-4">Discovery Preferences</h3>
        
        <div className="space-y-6">
          {/* Age Range */}
          <div>
            <label className="block text-white font-medium mb-3">Age Range</label>
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <label className="block text-gray-400 text-sm mb-1">Min Age</label>
                <input
                  type="number"
                  value={discoverySettings.ageMin}
                  onChange={(e) => handleDiscoveryChange('ageMin', parseInt(e.target.value))}
                  className="w-full bg-gray-700 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8C1D40]"
                  min="18"
                  max="99"
                />
              </div>
              <div className="flex-1">
                <label className="block text-gray-400 text-sm mb-1">Max Age</label>
                <input
                  type="number"
                  value={discoverySettings.ageMax}
                  onChange={(e) => handleDiscoveryChange('ageMax', parseInt(e.target.value))}
                  className="w-full bg-gray-700 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8C1D40]"
                  min="18"
                  max="99"
                />
              </div>
            </div>
          </div>

          {/* Distance */}
          <div>
            <label className="block text-white font-medium mb-3">Maximum Distance</label>
            <div className="flex items-center space-x-4">
              <input
                type="range"
                min="1"
                max="100"
                value={discoverySettings.maxDistance}
                onChange={(e) => handleDiscoveryChange('maxDistance', parseInt(e.target.value))}
                className="flex-1"
              />
              <span className="text-white font-medium w-16 text-right">{discoverySettings.maxDistance} miles</span>
            </div>
          </div>

          {/* Show Me */}
          <div>
            <label className="block text-white font-medium mb-3">Show Me</label>
            <div className="space-y-2">
              {[
                { value: 'everyone', label: 'Everyone' },
                { value: 'women', label: 'Women' },
                { value: 'men', label: 'Men' },
                { value: 'non-binary', label: 'Non-binary' }
              ].map(option => (
                <label key={option.value} className="flex items-center space-x-3">
                  <input
                    type="radio"
                    name="showMe"
                    value={option.value}
                    checked={discoverySettings.showMe === option.value}
                    onChange={(e) => handleDiscoveryChange('showMe', e.target.value)}
                    className="w-4 h-4 text-[#8C1D40] bg-gray-700 border-gray-600 focus:ring-[#8C1D40]"
                  />
                  <span className="text-white">{option.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPrivacySection = () => (
    <div className="space-y-6">
      <div className="bg-gray-800/50 rounded-2xl p-6">
        <h3 className="text-white font-semibold mb-4">Privacy Settings</h3>
        
        <div className="space-y-4">
          {[
            { key: 'showOnlineStatus', label: 'Show Online Status', description: 'Let others see when you\'re online' },
            { key: 'showLastSeen', label: 'Show Last Seen', description: 'Show when you were last active' },
            { key: 'showReadReceipts', label: 'Read Receipts', description: 'Show when you\'ve read messages' },
            { key: 'allowScreenshots', label: 'Allow Screenshots', description: 'Let others take screenshots of your profile' }
          ].map(setting => (
            <div key={setting.key} className="flex items-center justify-between py-3 border-b border-gray-700 last:border-b-0">
              <div>
                <p className="text-white font-medium">{setting.label}</p>
                <p className="text-gray-400 text-sm">{setting.description}</p>
              </div>
              <button
                onClick={() => handlePrivacyChange(setting.key, !privacySettings[setting.key as keyof typeof privacySettings])}
                className={`w-12 h-6 rounded-full transition-colors ${
                  privacySettings[setting.key as keyof typeof privacySettings] 
                    ? 'bg-[#8C1D40]' 
                    : 'bg-gray-600'
                }`}
              >
                <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                  privacySettings[setting.key as keyof typeof privacySettings] 
                    ? 'translate-x-6' 
                    : 'translate-x-0.5'
                }`} />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gray-800/50 rounded-2xl p-6">
        <h3 className="text-white font-semibold mb-4">Data & Privacy</h3>
        
        <div className="space-y-4">
          <button className="w-full flex items-center justify-between py-3 text-left">
            <div>
              <p className="text-white font-medium">Download My Data</p>
              <p className="text-gray-400 text-sm">Get a copy of your data</p>
            </div>
            <Download size={18} className="text-gray-400" />
          </button>
          
          <button className="w-full flex items-center justify-between py-3 text-left">
            <div>
              <p className="text-white font-medium">Blocked Users</p>
              <p className="text-gray-400 text-sm">Manage blocked contacts</p>
            </div>
            <ChevronRight size={18} className="text-gray-400" />
          </button>
        </div>
      </div>
    </div>
  );

  const renderNotificationsSection = () => (
    <div className="space-y-6">
      <div className="bg-gray-800/50 rounded-2xl p-6">
        <h3 className="text-white font-semibold mb-4">Notification Preferences</h3>
        
        <div className="space-y-4">
          {[
            { key: 'newMatches', label: 'New Matches', description: 'When someone likes you back' },
            { key: 'messages', label: 'Messages', description: 'When you receive a new message' },
            { key: 'likes', label: 'Likes', description: 'When someone likes your profile' },
            { key: 'superLikes', label: 'Super Likes', description: 'When someone super likes you' },
            { key: 'marketing', label: 'Marketing', description: 'Promotional emails and updates' }
          ].map(notification => (
            <div key={notification.key} className="flex items-center justify-between py-3 border-b border-gray-700 last:border-b-0">
              <div>
                <p className="text-white font-medium">{notification.label}</p>
                <p className="text-gray-400 text-sm">{notification.description}</p>
              </div>
              <button
                onClick={() => handleNotificationToggle(notification.key)}
                className={`w-12 h-6 rounded-full transition-colors ${
                  notifications[notification.key as keyof typeof notifications] 
                    ? 'bg-[#8C1D40]' 
                    : 'bg-gray-600'
                }`}
              >
                <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                  notifications[notification.key as keyof typeof notifications] 
                    ? 'translate-x-6' 
                    : 'translate-x-0.5'
                }`} />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gray-800/50 rounded-2xl p-6">
        <h3 className="text-white font-semibold mb-4">Notification Methods</h3>
        
        <div className="space-y-4">
          {[
            { key: 'push', label: 'Push Notifications', description: 'Notifications on your device' },
            { key: 'email', label: 'Email', description: 'Email notifications' },
            { key: 'sms', label: 'SMS', description: 'Text message notifications' }
          ].map(method => (
            <div key={method.key} className="flex items-center justify-between py-3 border-b border-gray-700 last:border-b-0">
              <div>
                <p className="text-white font-medium">{method.label}</p>
                <p className="text-gray-400 text-sm">{method.description}</p>
              </div>
              <button
                onClick={() => handleNotificationToggle(method.key)}
                className={`w-12 h-6 rounded-full transition-colors ${
                  notifications[method.key as keyof typeof notifications] 
                    ? 'bg-[#8C1D40]' 
                    : 'bg-gray-600'
                }`}
              >
                <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                  notifications[method.key as keyof typeof notifications] 
                    ? 'translate-x-6' 
                    : 'translate-x-0.5'
                }`} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderPremiumSection = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-yellow-400/20 to-yellow-600/20 border border-yellow-400/30 rounded-2xl p-6">
        <div className="flex items-center space-x-3 mb-4">
          <Crown size={24} className="text-yellow-400 fill-yellow-400" />
          <h3 className="text-white font-semibold text-lg">Premium Features</h3>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Zap size={20} className="text-yellow-400" />
              <div>
                <p className="text-white font-medium">Profile Boost</p>
                <p className="text-gray-400 text-sm">1 remaining this month</p>
              </div>
            </div>
            <button className="bg-yellow-400 text-black px-4 py-2 rounded-lg font-medium">
              Use Boost
            </button>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Star size={20} className="text-yellow-400" />
              <div>
                <p className="text-white font-medium">Super Likes</p>
                <p className="text-gray-400 text-sm">3 remaining today</p>
              </div>
            </div>
            <button className="bg-yellow-400 text-black px-4 py-2 rounded-lg font-medium">
              Get More
            </button>
          </div>
        </div>
      </div>

      <div className="bg-gray-800/50 rounded-2xl p-6">
        <h3 className="text-white font-semibold mb-4">Upgrade to Premium</h3>
        
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <Check size={20} className="text-green-400" />
            <span className="text-white">Unlimited likes</span>
          </div>
          <div className="flex items-center space-x-3">
            <Check size={20} className="text-green-400" />
            <span className="text-white">See who liked you</span>
          </div>
          <div className="flex items-center space-x-3">
            <Check size={20} className="text-green-400" />
            <span className="text-white">Advanced filters</span>
          </div>
          <div className="flex items-center space-x-3">
            <Check size={20} className="text-green-400" />
            <span className="text-white">Profile boost</span>
          </div>
        </div>
        
        <button className="w-full bg-gradient-to-r from-[#8C1D40] to-[#FFC627] text-white py-3 rounded-xl font-semibold mt-6">
          Upgrade Now - $9.99/month
        </button>
      </div>
    </div>
  );

  const renderAboutSection = () => (
    <div className="space-y-6">
      <div className="bg-gray-800/50 rounded-2xl p-6">
        <h3 className="text-white font-semibold mb-4">App Information</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-400">Version</span>
            <span className="text-white">1.0.0</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-400">Build</span>
            <span className="text-white">2024.01.15</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-400">Last Updated</span>
            <span className="text-white">2 days ago</span>
          </div>
        </div>
      </div>

      <div className="bg-gray-800/50 rounded-2xl p-6">
        <h3 className="text-white font-semibold mb-4">Support</h3>
        
        <div className="space-y-4">
          <button className="w-full flex items-center justify-between py-3 text-left">
            <div className="flex items-center space-x-3">
              <HelpCircle size={18} className="text-gray-400" />
              <span className="text-white">Help Center</span>
            </div>
            <ChevronRight size={18} className="text-gray-400" />
          </button>
          
          <button className="w-full flex items-center justify-between py-3 text-left">
            <div className="flex items-center space-x-3">
              <Mail size={18} className="text-gray-400" />
              <span className="text-white">Contact Support</span>
            </div>
            <ChevronRight size={18} className="text-gray-400" />
          </button>
          
          <button className="w-full flex items-center justify-between py-3 text-left">
            <div className="flex items-center space-x-3">
              <ExternalLink size={18} className="text-gray-400" />
              <span className="text-white">Privacy Policy</span>
            </div>
            <ChevronRight size={18} className="text-gray-400" />
          </button>
          
          <button className="w-full flex items-center justify-between py-3 text-left">
            <div className="flex items-center space-x-3">
              <ExternalLink size={18} className="text-gray-400" />
              <span className="text-white">Terms of Service</span>
            </div>
            <ChevronRight size={18} className="text-gray-400" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex-1 bg-gradient-to-br from-gray-900 via-black to-gray-900 flex">
      {/* Sidebar */}
      <div className="w-64 bg-black/50 backdrop-blur-sm p-4 border-r border-gray-800">
        <div className="mb-6">
          <h1 className="text-white text-xl font-semibold">Settings</h1>
          <p className="text-gray-400 text-sm">Manage your Spark'd experience</p>
        </div>
        
        <div className="space-y-2">
          {sections.map(section => (
            <button
              key={section.key}
              onClick={() => setActiveSection(section.key as any)}
              className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg transition-colors ${
                activeSection === section.key
                  ? 'bg-gradient-to-r from-[#8C1D40] to-[#FFC627] text-white'
                  : 'text-gray-400 hover:text-white hover:bg-white/10'
              }`}
            >
              <section.icon size={20} />
              <span className="font-medium">{section.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-6">
          {activeSection === 'account' && renderAccountSection()}
          {activeSection === 'discovery' && renderDiscoverySection()}
          {activeSection === 'privacy' && renderPrivacySection()}
          {activeSection === 'notifications' && renderNotificationsSection()}
          {activeSection === 'premium' && renderPremiumSection()}
          {activeSection === 'about' && renderAboutSection()}
        </div>
      </div>

      {/* Sign Out Button - Fixed at bottom */}
      <div className="absolute bottom-6 right-6">
        <button
          onClick={onSignOut}
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl flex items-center space-x-2 transition-colors shadow-lg"
        >
          <LogOut size={20} />
          <span className="font-medium">Sign Out</span>
        </button>
      </div>
    </div>
  );
}