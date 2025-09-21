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
  Lock,
  Globe,
  Smartphone,
  CreditCard,
  Star,
  HelpCircle,
  MessageCircle,
  Settings as SettingsIcon,
  Moon,
  Sun,
  Vibrate,
  Volume2,
  MapPin,
  Filter,
  Users,
  Zap,
  Crown,
  Gift,
  Sparkles
} from 'lucide-react';

interface SettingsPageProps {
  user: any;
  userProfile: any;
  onSignOut: () => void;
}

export default function SettingsPage({ user, userProfile, onSignOut }: SettingsPageProps) {
  const [activeSection, setActiveSection] = useState('account');
  const [notifications, setNotifications] = useState({
    matches: true,
    messages: true,
    likes: false,
    superLikes: true,
    promotions: false
  });
  const [privacy, setPrivacy] = useState({
    showOnline: true,
    showDistance: true,
    showAge: true,
    showLastActive: false
  });
  const [discovery, setDiscovery] = useState({
    ageRange: [18, 25],
    maxDistance: 5,
    showMe: 'everyone',
    global: false
  });

  const toggleNotification = (key: string) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const togglePrivacy = (key: string) => {
    setPrivacy(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const sections = [
    { key: 'account', label: 'Account', icon: User },
    { key: 'discovery', label: 'Discovery', icon: Search },
    { key: 'notifications', label: 'Notifications', icon: Bell },
    { key: 'privacy', label: 'Privacy', icon: Shield },
    { key: 'premium', label: 'Premium', icon: Crown },
    { key: 'support', label: 'Support', icon: HelpCircle }
  ];

  return (
    <div className="flex-1 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 overflow-hidden">
      {/* Header */}
      <div className="bg-black/20 backdrop-blur-sm px-4 py-4 border-b border-white/10">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-white text-2xl font-bold">Settings</h1>
            <p className="text-gray-300 text-sm">Manage your Spark'd experience</p>
          </div>
          <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
            <SettingsIcon size={20} className="text-white" />
          </div>
        </div>
      </div>

      <div className="flex-1 flex">
        {/* Sidebar Navigation */}
        <div className="w-20 bg-black/10 backdrop-blur-sm border-r border-white/10 py-4">
          <div className="space-y-2">
            {sections.map((section) => {
              const IconComponent = section.icon;
              return (
                <button
                  key={section.key}
                  onClick={() => setActiveSection(section.key)}
                  className={`w-full p-3 rounded-xl mx-2 transition-all duration-300 ${
                    activeSection === section.key
                      ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white'
                      : 'text-gray-400 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <div className="flex flex-col items-center space-y-1">
                    <IconComponent size={20} />
                    <span className="text-xs">{section.label}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {activeSection === 'account' && (
            <div className="space-y-6">
              <h2 className="text-white text-xl font-bold mb-4">Account Settings</h2>
              
              {/* Profile Overview */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
                    <User size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-white text-lg font-semibold">
                      {user?.displayName || 'Your Name'}
                    </h3>
                    <p className="text-gray-300 text-sm">{user?.email}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <Star size={14} className="text-blue-400 fill-current" />
                      <span className="text-blue-400 text-sm">Verified</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-black/20 rounded-xl p-4">
                    <div className="flex items-center space-x-3">
                      <Mail size={18} className="text-gray-400" />
                      <div>
                        <p className="text-white font-medium">Email</p>
                        <p className="text-gray-300 text-sm">{user?.email || 'user@asu.edu'}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-black/20 rounded-xl p-4">
                    <div className="flex items-center space-x-3">
                      <Phone size={18} className="text-gray-400" />
                      <div>
                        <p className="text-white font-medium">Phone</p>
                        <div className="flex items-center space-x-2">
                          <p className="text-gray-300 text-sm">+1 (480) 555-0123</p>
                          <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">✓</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-3 mt-6">
                  <button className="flex-1 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white py-3 px-4 rounded-xl font-medium transition-all duration-300 transform hover:scale-105">
                    <Edit3 size={16} className="inline mr-2" />
                    Edit Profile
                  </button>
                  <button className="flex-1 bg-white/10 hover:bg-white/20 text-white py-3 px-4 rounded-xl font-medium transition-colors">
                    <Camera size={16} className="inline mr-2" />
                    Manage Photos
                  </button>
                </div>
              </div>

              {/* Account Actions */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <h3 className="text-white text-lg font-semibold mb-4">Account Management</h3>
                <div className="space-y-3">
                  {[
                    { icon: Lock, label: 'Change Password', description: 'Update your password' },
                    { icon: Smartphone, label: 'Two-Factor Authentication', description: 'Add extra security' },
                    { icon: CreditCard, label: 'Payment Methods', description: 'Manage subscriptions' },
                    { icon: Globe, label: 'Language & Region', description: 'English (US)' }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-black/20 rounded-xl hover:bg-black/30 transition-colors cursor-pointer">
                      <div className="flex items-center space-x-3">
                        <item.icon size={18} className="text-gray-400" />
                        <div>
                          <p className="text-white font-medium">{item.label}</p>
                          <p className="text-gray-300 text-sm">{item.description}</p>
                        </div>
                      </div>
                      <ChevronRight size={18} className="text-gray-400" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeSection === 'discovery' && (
            <div className="space-y-6">
              <h2 className="text-white text-xl font-bold mb-4">Discovery Preferences</h2>
              
              {/* Discovery Settings */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <h3 className="text-white text-lg font-semibold mb-4">Who You See</h3>
                
                {/* Age Range */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-white font-medium">Age Range</label>
                    <span className="text-gray-300">{discovery.ageRange[0]} - {discovery.ageRange[1]} years</span>
                  </div>
                  <div className="bg-black/20 rounded-xl p-4">
                    <input
                      type="range"
                      min="18"
                      max="30"
                      value={discovery.ageRange[1]}
                      onChange={(e) => setDiscovery(prev => ({ ...prev, ageRange: [prev.ageRange[0], parseInt(e.target.value)] }))}
                      className="w-full"
                    />
                  </div>
                </div>

                {/* Distance */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-white font-medium">Maximum Distance</label>
                    <span className="text-gray-300">{discovery.maxDistance} miles</span>
                  </div>
                  <div className="bg-black/20 rounded-xl p-4">
                    <input
                      type="range"
                      min="1"
                      max="50"
                      value={discovery.maxDistance}
                      onChange={(e) => setDiscovery(prev => ({ ...prev, maxDistance: parseInt(e.target.value) }))}
                      className="w-full"
                    />
                  </div>
                </div>

                {/* Show Me */}
                <div className="mb-6">
                  <label className="text-white font-medium mb-3 block">Show Me</label>
                  <div className="grid grid-cols-3 gap-3">
                    {['everyone', 'men', 'women'].map(option => (
                      <button
                        key={option}
                        onClick={() => setDiscovery(prev => ({ ...prev, showMe: option }))}
                        className={`p-3 rounded-xl text-sm font-medium transition-all duration-300 capitalize ${
                          discovery.showMe === option
                            ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white'
                            : 'bg-black/20 text-gray-300 hover:bg-black/30'
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Global Mode */}
                <div className="flex items-center justify-between p-3 bg-black/20 rounded-xl">
                  <div className="flex items-center space-x-3">
                    <Globe size={18} className="text-gray-400" />
                    <div>
                      <p className="text-white font-medium">Global Mode</p>
                      <p className="text-gray-300 text-sm">See people from around the world</p>
                    </div>
                  </div>
                  <button
                    onClick={() => togglePrivacy('global')}
                    className={`w-12 h-6 rounded-full transition-colors ${
                      discovery.global ? 'bg-gradient-to-r from-pink-500 to-purple-600' : 'bg-gray-600'
                    }`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                      discovery.global ? 'translate-x-6' : 'translate-x-0.5'
                    }`} />
                  </button>
                </div>
              </div>

              {/* Advanced Filters */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <h3 className="text-white text-lg font-semibold mb-4">Advanced Filters</h3>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: 'Education', value: 'College' },
                    { label: 'Height', value: 'Any' },
                    { label: 'Exercise', value: 'Active' },
                    { label: 'Drinking', value: 'Any' },
                    { label: 'Smoking', value: 'Never' },
                    { label: 'Kids', value: 'Any' }
                  ].map((filter, index) => (
                    <div key={index} className="bg-black/20 rounded-xl p-3">
                      <p className="text-gray-400 text-sm">{filter.label}</p>
                      <p className="text-white font-medium">{filter.value}</p>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-4 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white py-3 px-4 rounded-xl font-medium transition-all duration-300">
                  <Filter size={16} className="inline mr-2" />
                  Upgrade for More Filters
                </button>
              </div>
            </div>
          )}

          {activeSection === 'notifications' && (
            <div className="space-y-6">
              <h2 className="text-white text-xl font-bold mb-4">Notification Settings</h2>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <h3 className="text-white text-lg font-semibold mb-4">Push Notifications</h3>
                <div className="space-y-4">
                  {[
                    { key: 'matches', label: 'New Matches', description: 'When someone likes you back', icon: Heart },
                    { key: 'messages', label: 'Messages', description: 'New messages from matches', icon: MessageCircle },
                    { key: 'likes', label: 'Likes', description: 'When someone likes your profile', icon: Heart },
                    { key: 'superLikes', label: 'Super Likes', description: 'When someone super likes you', icon: Star },
                    { key: 'promotions', label: 'Promotions', description: 'Special offers and features', icon: Gift }
                  ].map(notification => (
                    <div key={notification.key} className="flex items-center justify-between p-3 bg-black/20 rounded-xl">
                      <div className="flex items-center space-x-3">
                        <notification.icon size={18} className="text-gray-400" />
                        <div>
                          <p className="text-white font-medium">{notification.label}</p>
                          <p className="text-gray-300 text-sm">{notification.description}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => toggleNotification(notification.key)}
                        className={`w-12 h-6 rounded-full transition-colors ${
                          notifications[notification.key] ? 'bg-gradient-to-r from-pink-500 to-purple-600' : 'bg-gray-600'
                        }`}
                      >
                        <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                          notifications[notification.key] ? 'translate-x-6' : 'translate-x-0.5'
                        }`} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Notification Schedule */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <h3 className="text-white text-lg font-semibold mb-4">Quiet Hours</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-black/20 rounded-xl">
                    <div className="flex items-center space-x-3">
                      <Moon size={18} className="text-gray-400" />
                      <div>
                        <p className="text-white font-medium">Do Not Disturb</p>
                        <p className="text-gray-300 text-sm">10:00 PM - 8:00 AM</p>
                      </div>
                    </div>
                    <ChevronRight size={18} className="text-gray-400" />
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-black/20 rounded-xl">
                    <div className="flex items-center space-x-3">
                      <Vibrate size={18} className="text-gray-400" />
                      <div>
                        <p className="text-white font-medium">Vibration</p>
                        <p className="text-gray-300 text-sm">Enabled</p>
                      </div>
                    </div>
                    <ChevronRight size={18} className="text-gray-400" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'privacy' && (
            <div className="space-y-6">
              <h2 className="text-white text-xl font-bold mb-4">Privacy & Safety</h2>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <h3 className="text-white text-lg font-semibold mb-4">Profile Visibility</h3>
                <div className="space-y-4">
                  {[
                    { key: 'showOnline', label: 'Show Online Status', description: 'Let matches see when you\'re active' },
                    { key: 'showDistance', label: 'Show Distance', description: 'Display your distance from others' },
                    { key: 'showAge', label: 'Show Age', description: 'Display your age on your profile' },
                    { key: 'showLastActive', label: 'Show Last Active', description: 'Let others see when you were last online' }
                  ].map(setting => (
                    <div key={setting.key} className="flex items-center justify-between p-3 bg-black/20 rounded-xl">
                      <div>
                        <p className="text-white font-medium">{setting.label}</p>
                        <p className="text-gray-300 text-sm">{setting.description}</p>
                      </div>
                      <button
                        onClick={() => togglePrivacy(setting.key)}
                        className={`w-12 h-6 rounded-full transition-colors ${
                          privacy[setting.key] ? 'bg-gradient-to-r from-pink-500 to-purple-600' : 'bg-gray-600'
                        }`}
                      >
                        <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                          privacy[setting.key] ? 'translate-x-6' : 'translate-x-0.5'
                        }`} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Safety Tools */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <h3 className="text-white text-lg font-semibold mb-4">Safety Tools</h3>
                <div className="space-y-3">
                  {[
                    { icon: Shield, label: 'Block & Report', description: 'Block users and report inappropriate behavior' },
                    { icon: Eye, label: 'Photo Verification', description: 'Verify your photos to build trust' },
                    { icon: Lock, label: 'Data & Privacy', description: 'Control how your data is used' },
                    { icon: HelpCircle, label: 'Safety Center', description: 'Tips and resources for safe dating' }
                  ].map((tool, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-black/20 rounded-xl hover:bg-black/30 transition-colors cursor-pointer">
                      <div className="flex items-center space-x-3">
                        <tool.icon size={18} className="text-gray-400" />
                        <div>
                          <p className="text-white font-medium">{tool.label}</p>
                          <p className="text-gray-300 text-sm">{tool.description}</p>
                        </div>
                      </div>
                      <ChevronRight size={18} className="text-gray-400" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeSection === 'premium' && (
            <div className="space-y-6">
              <h2 className="text-white text-xl font-bold mb-4">Spark'd Premium</h2>
              
              {/* Premium Status */}
              <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-2xl p-6 border border-yellow-500/30">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center">
                    <Crown size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-white text-lg font-semibold">Free Plan</h3>
                    <p className="text-gray-300 text-sm">Upgrade to unlock premium features</p>
                  </div>
                </div>
                
                <button className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white py-3 px-4 rounded-xl font-medium transition-all duration-300 transform hover:scale-105">
                  <Sparkles size={16} className="inline mr-2" />
                  Upgrade to Premium
                </button>
              </div>

              {/* Premium Features */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <h3 className="text-white text-lg font-semibold mb-4">Premium Features</h3>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { icon: '💖', title: 'Unlimited Likes', description: 'Like as many profiles as you want' },
                    { icon: '⭐', title: 'Super Likes', description: '5 Super Likes per day' },
                    { icon: '🔄', title: 'Rewind', description: 'Undo your last swipe' },
                    { icon: '🎯', title: 'Boost', description: 'Be a top profile for 30 minutes' },
                    { icon: '👀', title: 'See Who Likes You', description: 'View all your likes at once' },
                    { icon: '🌍', title: 'Passport', description: 'Swipe anywhere in the world' }
                  ].map((feature, index) => (
                    <div key={index} className="bg-black/20 rounded-xl p-4">
                      <div className="text-2xl mb-2">{feature.icon}</div>
                      <h4 className="text-white font-semibold mb-1">{feature.title}</h4>
                      <p className="text-gray-300 text-sm">{feature.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pricing */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <h3 className="text-white text-lg font-semibold mb-4">Choose Your Plan</h3>
                <div className="space-y-3">
                  {[
                    { duration: '1 Month', price: '$9.99', popular: false },
                    { duration: '6 Months', price: '$7.99/mo', popular: true, savings: 'Save 20%' },
                    { duration: '12 Months', price: '$5.99/mo', popular: false, savings: 'Save 40%' }
                  ].map((plan, index) => (
                    <div key={index} className={`p-4 rounded-xl border-2 transition-all duration-300 cursor-pointer ${
                      plan.popular 
                        ? 'border-gradient-to-r from-pink-500 to-purple-600 bg-gradient-to-r from-pink-500/20 to-purple-600/20' 
                        : 'border-white/20 bg-black/20 hover:border-white/30'
                    }`}>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="flex items-center space-x-2">
                            <p className="text-white font-medium">{plan.duration}</p>
                            {plan.popular && (
                              <span className="bg-gradient-to-r from-pink-500 to-purple-600 text-white text-xs px-2 py-1 rounded-full">
                                Most Popular
                              </span>
                            )}
                          </div>
                          {plan.savings && (
                            <p className="text-green-400 text-sm">{plan.savings}</p>
                          )}
                        </div>
                        <p className="text-white font-bold text-lg">{plan.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeSection === 'support' && (
            <div className="space-y-6">
              <h2 className="text-white text-xl font-bold mb-4">Help & Support</h2>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <h3 className="text-white text-lg font-semibold mb-4">Get Help</h3>
                <div className="space-y-3">
                  {[
                    { icon: HelpCircle, label: 'FAQ', description: 'Find answers to common questions' },
                    { icon: MessageCircle, label: 'Contact Support', description: 'Get help from our team' },
                    { icon: Star, label: 'Rate the App', description: 'Share your feedback' },
                    { icon: Gift, label: 'Refer Friends', description: 'Invite friends and earn rewards' }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-black/20 rounded-xl hover:bg-black/30 transition-colors cursor-pointer">
                      <div className="flex items-center space-x-3">
                        <item.icon size={18} className="text-gray-400" />
                        <div>
                          <p className="text-white font-medium">{item.label}</p>
                          <p className="text-gray-300 text-sm">{item.description}</p>
                        </div>
                      </div>
                      <ChevronRight size={18} className="text-gray-400" />
                    </div>
                  ))}
                </div>
              </div>

              {/* App Info */}
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <h3 className="text-white text-lg font-semibold mb-4">About</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Version</span>
                    <span className="text-white">2.1.0</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Last Updated</span>
                    <span className="text-white">Jan 15, 2024</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Terms of Service</span>
                    <ChevronRight size={18} className="text-gray-400" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Privacy Policy</span>
                    <ChevronRight size={18} className="text-gray-400" />
                  </div>
                </div>
              </div>

              {/* Sign Out */}
              <button
                onClick={onSignOut}
                className="w-full bg-red-600 hover:bg-red-700 text-white py-4 px-6 rounded-2xl flex items-center justify-center space-x-2 transition-all duration-300 transform hover:scale-105"
              >
                <LogOut size={20} />
                <span className="font-medium">Sign Out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}