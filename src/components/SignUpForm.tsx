import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { signUp } from '../lib/auth';
import { Alert, AlertDescription } from './ui/alert';

export function SignUpForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    age: '',
    major: '',
    year: '',
    bio: ''
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Validate passwords match
      if (formData.password !== formData.confirmPassword) {
        throw new Error('Passwords do not match');
      }

      // Validate password strength
      if (formData.password.length < 6) {
        throw new Error('Password must be at least 6 characters long');
      }

      // Validate required fields
      if (!formData.firstName || !formData.lastName || !formData.email || 
          !formData.password || !formData.age || !formData.major || !formData.year) {
        throw new Error('Please fill in all required fields');
      }

      // Validate ASU email
      if (!formData.email.endsWith('@asu.edu')) {
        throw new Error('Please use your ASU email address');
      }

      // Validate age
      const ageNum = parseInt(formData.age);
      if (ageNum < 18 || ageNum > 100) {
        throw new Error('Please enter a valid age (18-100)');
      }

      // Create user account
      await signUp(formData.email, formData.password, {
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        age: formData.age,
        major: formData.major.trim(),
        year: formData.year,
        bio: formData.bio.trim()
      });

      setSuccess(true);
    } catch (error: any) {
      setError(error.message || 'An error occurred during sign up');
    } finally {
      setIsLoading(false);
    }
  };

  // Show success message
  if (success) {
    return (
      <div className="w-full max-w-md mx-auto text-center animate-scale-in">
        <div className="glass-card rounded-3xl p-8 border border-green-500/20">
          <div className="relative mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-lg">
              <span className="text-3xl">🎉</span>
            </div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-asu-gold rounded-full flex items-center justify-center">
              <span className="text-slate-900 text-sm">✓</span>
            </div>
          </div>
          <h2 className="text-white text-2xl font-bold mb-3">Welcome to Sun Devil Match!</h2>
          <p className="text-gray-300 mb-4 leading-relaxed">
            We've sent a verification email to <strong className="text-asu-gold">{formData.email}</strong>.
            Click the link to activate your account and start connecting!
          </p>
          <div className="flex items-center justify-center space-x-2 text-green-400 text-sm">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <span>Check your ASU email inbox</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Error message */}
      {error && (
        <div className="mb-6 glass-card rounded-2xl p-4 border border-red-500/20 animate-slide-up">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-red-500/20 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-red-400 text-sm">⚠️</span>
            </div>
            <div>
              <h4 className="text-red-400 font-medium mb-1">Something went wrong</h4>
              <p className="text-red-200 text-sm">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Progress indicator */}
      <div className="flex justify-center mb-8">
        <div className="flex items-center space-x-3">
          {[1, 2, 3].map((step) => (
            <div key={step} className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                  step === currentStep
                    ? 'bg-gradient-to-br from-asu-gold to-asu-light-gold text-slate-900 shadow-lg'
                    : step < currentStep
                    ? 'bg-green-500 text-white'
                    : 'bg-white/10 text-gray-400'
                }`}
              >
                {step < currentStep ? (
                  <span className="text-sm">✓</span>
                ) : (
                  <span className="text-sm font-medium">{step}</span>
                )}
              </div>
              {step < 3 && (
                <div
                  className={`w-8 h-0.5 mx-2 transition-colors duration-300 ${
                    step < currentStep ? 'bg-green-500' : 'bg-gray-600'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {currentStep === 1 && (
          <div className="space-y-4">
            <div className="text-center mb-8 animate-fade-in">
              <div className="w-16 h-16 bg-gradient-to-br from-asu-gold to-asu-light-gold rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <span className="text-2xl">👋</span>
              </div>
              <h2 className="text-white text-2xl font-bold mb-2">Let's get started!</h2>
              <p className="text-gray-400">Tell us about yourself</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="animate-slide-up">
                <Label htmlFor="firstName" className="text-white font-medium mb-2 block">First Name</Label>
                <div className="relative">
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 rounded-xl h-12 focus:border-asu-gold focus:ring-asu-gold/20 transition-all duration-200"
                    placeholder="Enter first name"
                    required
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <span className="text-gray-400 text-sm">👤</span>
                  </div>
                </div>
              </div>
              <div className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
                <Label htmlFor="lastName" className="text-white font-medium mb-2 block">Last Name</Label>
                <div className="relative">
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 rounded-xl h-12 focus:border-asu-gold focus:ring-asu-gold/20 transition-all duration-200"
                    placeholder="Enter last name"
                    required
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <span className="text-gray-400 text-sm">👤</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <Label htmlFor="email" className="text-white font-medium mb-2 block">ASU Email</Label>
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 rounded-xl h-12 focus:border-asu-gold focus:ring-asu-gold/20 transition-all duration-200"
                  placeholder="yourname@asu.edu"
                  pattern=".*@asu\.edu$"
                  required
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <span className="text-asu-gold text-sm">🎓</span>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-2 flex items-center space-x-1">
                <span className="w-1 h-1 bg-asu-gold rounded-full"></span>
                <span>Must use your ASU email address</span>
              </p>
            </div>

            <div className="animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <Label htmlFor="password" className="text-white font-medium mb-2 block">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 rounded-xl h-12 focus:border-asu-gold focus:ring-asu-gold/20 transition-all duration-200"
                  placeholder="Create a secure password"
                  required
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <span className="text-gray-400 text-sm">🔒</span>
                </div>
              </div>
            </div>

            <div className="animate-slide-up" style={{ animationDelay: '0.4s' }}>
              <Label htmlFor="confirmPassword" className="text-white font-medium mb-2 block">Confirm Password</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 rounded-xl h-12 focus:border-asu-gold focus:ring-asu-gold/20 transition-all duration-200"
                  placeholder="Confirm your password"
                  required
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <span className="text-gray-400 text-sm">🔒</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <h2 className="text-white mb-2">Academic Info</h2>
              <p className="text-gray-400">Help us connect you with fellow Sun Devils</p>
            </div>

            <div>
              <Label htmlFor="age" className="text-white">Age</Label>
              <Select onValueChange={(value) => handleInputChange('age', value)}>
                <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                  <SelectValue placeholder="Select your age" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  {Array.from({ length: 13 }, (_, i) => i + 18).map(age => (
                    <SelectItem key={age} value={age.toString()} className="text-white hover:bg-gray-700">
                      {age}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="major" className="text-white">Major</Label>
              <Input
                id="major"
                value={formData.major}
                onChange={(e) => handleInputChange('major', e.target.value)}
                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                placeholder="e.g., Business Administration"
                required
              />
            </div>

            <div>
              <Label htmlFor="year" className="text-white">Year</Label>
              <Select onValueChange={(value) => handleInputChange('year', value)}>
                <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                  <SelectValue placeholder="Select your year" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  <SelectItem value="freshman" className="text-white hover:bg-gray-700">Freshman</SelectItem>
                  <SelectItem value="sophomore" className="text-white hover:bg-gray-700">Sophomore</SelectItem>
                  <SelectItem value="junior" className="text-white hover:bg-gray-700">Junior</SelectItem>
                  <SelectItem value="senior" className="text-white hover:bg-gray-700">Senior</SelectItem>
                  <SelectItem value="graduate" className="text-white hover:bg-gray-700">Graduate Student</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <h2 className="text-white mb-2">Tell us about yourself</h2>
              <p className="text-gray-400">What makes you unique?</p>
            </div>

            <div>
              <Label htmlFor="bio" className="text-white">Bio</Label>
              <Textarea
                id="bio"
                value={formData.bio}
                onChange={(e) => handleInputChange('bio', e.target.value)}
                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 min-h-[120px]"
                placeholder="Tell other Sun Devils about yourself! What do you love about ASU? What are you looking for?"
                maxLength={300}
              />
              <p className="text-xs text-gray-500 mt-1">{formData.bio.length}/300 characters</p>
            </div>

            <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
              <h4 className="text-white mb-2">Almost done! 🎉</h4>
              <p className="text-gray-400 text-sm">
                By creating an account, you agree to our Terms of Service and Privacy Policy. 
                We'll verify your ASU student status before activating your account.
              </p>
            </div>
          </div>
        )}

        {/* Navigation buttons */}
        <div className="flex justify-between items-center pt-6">
          {currentStep > 1 && (
            <Button
              type="button"
              onClick={handleBack}
              variant="outline"
              className="bg-white/5 border-white/20 text-gray-300 hover:bg-white/10 hover:border-white/30 rounded-xl h-12 px-6 transition-all duration-200"
            >
              ← Back
            </Button>
          )}

          <div className={currentStep === 1 ? 'ml-auto' : ''}>
            {currentStep < 3 ? (
              <Button
                type="button"
                onClick={handleNext}
                className="bg-gradient-to-r from-asu-gold to-asu-light-gold hover:from-asu-light-gold hover:to-asu-gold text-slate-900 font-semibold rounded-xl h-12 px-8 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
              >
                Continue →
              </Button>
            ) : (
              <Button
                type="submit"
                className="bg-gradient-to-r from-asu-gold to-asu-light-gold hover:from-asu-light-gold hover:to-asu-gold text-slate-900 font-semibold rounded-xl h-12 px-8 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-slate-900 border-t-transparent rounded-full animate-spin"></div>
                    <span>Creating Account...</span>
                  </div>
                ) : (
                  'Create Account ✨'
                )}
              </Button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}